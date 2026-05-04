"use client";

import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useCreateWorkFlow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useRouter } from "next/navigation";
import { useWorkFlowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkFlowsList = () => {
  const workFlows = useSuspenseWorkflows();

  return <div>
    <p>{JSON.stringify(workFlows?.data, null, 2)}</p>
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
