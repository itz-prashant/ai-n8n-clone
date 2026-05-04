
import { useTRPC } from "@/trps/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useWorkFlowsParams } from "./use-workflows-params"


export const useSuspenseWorkflows = ()=>{
    const trpc = useTRPC()

    const [params] = useWorkFlowsParams()

    return useSuspenseQuery(trpc.workFlows.getMany.queryOptions(params))
}

export const useCreateWorkFlow = ()=>{
    const queryClient = useQueryClient()
    const trpc = useTRPC()

    return useMutation(trpc.workFlows.create.mutationOptions({
        onSuccess:(data)=>{
            toast.success(`Workflow ${data.name} created`)
            queryClient.invalidateQueries(
                trpc.workFlows.getMany.queryOptions({})
            );
        },
        onError: (error)=>{
            toast.error(`Failed to create workflow: ${error.message}`)
        }
    }))
}