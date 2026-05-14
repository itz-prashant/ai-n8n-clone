import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";


export const executeWorkflow = inngest.createFunction(
  {id: "execute-workflow", triggers: {event: "workflows/execute.workflow"}},
  async ({event, step})=>{
    const workflowId = event.data.workflowId

    if(!workflowId){
      throw new NonRetriableError("Workflow Id is missing")
    }
    const sortedNodes = await step.run("prepare-workflow", async()=>{
      const workflow = await prisma.workFlow.findFirstOrThrow({
        where:{
          id: workflowId
        },
        include:{
          nodes: true,
          connections: true
        }
      })

      return topologicalSort(workflow.nodes, workflow.connections)
    })
    return {sortedNodes}
  }
);