// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: { event: "test/hello.world" } },
  async ({ event, step }) => {

    await step.sleep("fetching", "10s");
    await step.sleep("transcribe", "10s");
    await step.sleep("sending to ai", "10s");

    await step.run("create-workflow", ()=>{
        return prisma.workFlow.create({
            data:{
                name: "Workflow-from-inngest"
            }
        })
    })
  }
);