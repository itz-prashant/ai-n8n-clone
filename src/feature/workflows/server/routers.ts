import { PAGINATION } from "@/config/constants";
import { NodeType } from "@/generated/prisma";
import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trps/init";
import { generateSlug } from "random-word-slugs";
import type { Node, Edge } from "@xyflow/react";
import * as z from "zod";

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(({ ctx }) => {
    return prisma.workFlow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
        nodes:{
          create: {
            type: NodeType.INITIAL,
            positon: {x:0, y: 0},
            name: NodeType.INITIAL
          }
        }
      },
    });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.workFlow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return prisma.workFlow.update({
        where: { id: input.id, userId: ctx.auth.user.id },
        data: { name: input.name },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await prisma.workFlow.findUniqueOrThrow({
        where: { id: input.id, userId: ctx.auth.user.id },
        include:{nodes: true, connections:true}
      });

      // Transform server nodes to react-flow compatible nodes
      const nodes: Node[]= workflow.nodes.map((node)=>({
        id: node.id,
        type: node.type,
        position: node.positon as {x: number, y:number},
        data: (node.data as Record<string, unknown>) || {}
      }))

      // transfrom server connection to react flow compatible
       const edges: Edge[] = workflow.connections.map((connection)=>({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.tomNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput
       }))

       return{
          id: workflow.id,
          name: workflow.name,
          nodes,
          edges
       }
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const [items, totalCount] = await Promise.all([

          prisma.workFlow.findMany({
            skip:(page-1) * pageSize,
            take: pageSize,
            where: { 
              userId: ctx.auth.user.id,
              name:{
                contains: search,
                mode: "insensitive"
              } 
            },
            orderBy:{
              updatedAt: 'desc'
            }
          }),

          prisma.workFlow.count({
            where:{
              userId: ctx.auth.user.id,
              name:{
                contains: search,
                mode: "insensitive"
              } 
            }
          })

      ]);
      const totalPages = Math.ceil(totalCount/pageSize)
      const hasNextPage = page < totalPages
      const hasPreviousPage = page > 1

      return {
        items: items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    }),
});
