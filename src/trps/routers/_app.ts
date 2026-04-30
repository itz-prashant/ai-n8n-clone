import { inngest } from '@/ingest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
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