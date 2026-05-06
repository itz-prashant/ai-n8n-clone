import { prefetch,trpc } from "@/trps/server";
import type { inferInput } from "@trpc/tanstack-react-query";


type Input = inferInput<typeof trpc.workFlows.getMany>

export const prefetchWorkflows = (params:Input)=>{
    return prefetch(trpc.workFlows.getMany.queryOptions(params))
}

export const prefetchWorkFlow = (id:string)=>{
    return prefetch(trpc.workFlows.getOne.queryOptions({id}))
}