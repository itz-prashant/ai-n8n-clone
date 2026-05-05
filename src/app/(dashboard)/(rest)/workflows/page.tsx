import { WorkFlowContainer, WorkflowsError, WorkFlowsList, WorkflowsLoading } from "@/feature/workflows/components/workflows"
import { workflowsParamsLoader } from "@/feature/workflows/server/params-loader"
import { prefetchWorkflows } from "@/feature/workflows/server/prefetch"
import { HydrateClient } from "@/trps/server"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import {ErrorBoundary} from "react-error-boundary"

type Props = {
  searchParams : Promise<SearchParams>
}

const page = async ({searchParams}:Props) => {

  const params = await workflowsParamsLoader(searchParams)

  prefetchWorkflows(params)

  return (
    <WorkFlowContainer>
      <HydrateClient>
      <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkFlowsList />
          </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkFlowContainer>
  )
}

export default page
