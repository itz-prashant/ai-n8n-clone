"use client"
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trps/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkFlows.queryOptions())

  const create = useMutation(trpc.createWorkFlow.mutationOptions({
    onSuccess: ()=>{
      toast.success("Job Queued")
    }
  }))

  const testAi = useMutation(trpc.testAi.mutationOptions())

  // await requireAuth()

  return (
    <div className="min-h-screen min-w-screen flex flex-col  items-center justify-center">
      Protected server component
      <div>
        {JSON.stringify(data)}
      </div>
      <Button disabled={testAi.isPending} onClick={()=> testAi.mutate()}>
        Test Ai
      </Button>
      <Button disabled={create.isPending} onClick={()=> create.mutate()}>
        Create Workflow
      </Button>
    </div>
  );
}

 export default Page;