"use client";

import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useCreateWorkFlow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useRouter } from "next/navigation";

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

export const WorkFlowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    return(
        <EntityContainer
            header={<WorkFlowsHeader />}
            search={<></>}
            pagination={<></>}
        >
            {children}
        </EntityContainer>
    )
};
