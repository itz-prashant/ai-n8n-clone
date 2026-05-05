"use client";

import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useCreateWorkFlow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EmptyView, EnityItem, EntityContainer, EntityHeader, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useRouter } from "next/navigation";
import { useWorkFlowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type { WorkFlow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";
import {formatDistanceToNow} from 'date-fns'

export const WorkFlowsList = () => {
  const workFlows = useSuspenseWorkflows();

  return <div>
    <EntityList 
      items={workFlows.data.items}
      getKey={(workflow)=> workflow.id}
      renderItem={(workflow)=> <WorkflowItem data={workflow}/>}
      emptyView={<WorkflowsEmpty />}
      />
  </div>;
};

export const WorkFlowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter()
    const createWorkFlow = useCreateWorkFlow()
    const {handleError, modal} = useUpgradeModal()

    const handleCreate = ()=>[
        createWorkFlow.mutate(undefined, {
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
            onError:(error)=>{
                handleError(error)
            }
        })
    ]

  return (
    <>
    {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkFlow.isPending}
      />
    </>
  );
};

export const WorkflowSearch = ()=>{
  const [params ,setParams ] = useWorkFlowsParams()
  const {searchValue, onSearchChange} = useEntitySearch({
    params,
    setParams
  })
  return (
    <EntitySearch 
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflow"
    />
  )
}

export const WorkflowPagination = ()=>{
  const workflows = useSuspenseWorkflows()
  const [params, setParams] = useWorkFlowsParams()
  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page)=>{setParams({...params, page})}}
    />
  )
}


export const WorkFlowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    return(
        <EntityContainer
            header={<WorkFlowsHeader />}
            search={<WorkflowSearch />}
            pagination={<WorkflowPagination />}
        >
            {children}
        </EntityContainer>
    )
};


export const WorkflowsLoading = ()=>{
  return <LoadingView message="Loading workflows...."/>
}

export const WorkflowsError = ()=>{
  return <ErrorView message="Error loading workflows"/>
}

export const WorkflowsEmpty = ()=>{
  const router = useRouter()
  const craeteWorkflow = useCreateWorkFlow()
  const {handleError, modal} = useUpgradeModal()

   const handleCreate = ()=>{
        craeteWorkflow.mutate(undefined, {
            onError:(error)=>{
                handleError(error)
            },
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
        })}
    

  return (
    <>
    {modal}
      <EmptyView 
      onNew={handleCreate}
        message="You haven't created any workflow yet. Get started by creating your workflow"
      />
    </>
  )
}

export const WorkflowItem = ({
  data
}: {data: WorkFlow})=>{
  const removeWorkflow = useRemoveWorkflow()
  const handleRemoveWorkflow = ()=>{
    removeWorkflow.mutate({id:data.id})
  }

  return (
    <EnityItem 
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, {addSuffix: true})}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground"/>
        </div>
      }
      onRemove={handleRemoveWorkflow}
      isRemoving={removeWorkflow.isPending}
    />
  )
}