import { inngest } from '@/ingest/client';
import { createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
// import { TRPCError } from '@trpc/server';
// import {generateText} from 'ai'
// import { google } from '@ai-sdk/google';


export const appRouter = createTRPCRouter({
  testAi: premiumProcedure
    .mutation(async ()=>{
      await inngest.send({
        name: "execute/ai"
      })

      return {success: true, message:"text generated" }
    }),
  getWorkFlows: protectedProcedure
    .query(() => {
     return prisma.workFlow.findMany();
    }),
  createWorkFlow: protectedProcedure
    .mutation(async ()=>{
      await inngest.send({
        name: "test/hello.world",
        data:{
          email: 'ab@gmail.com'
        }
      })


      return {success: true, message: "Job queued"}
    })  
});

// export type definition of API
export type AppRouter = typeof appRouter;