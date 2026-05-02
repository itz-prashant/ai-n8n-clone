import { WorkFlowContainer, WorkFlowsList } from "@/feature/workflows/components/workflows"
import { prefetchWorkflows } from "@/feature/workflows/server/prefetch"
import { HydrateClient } from "@/trps/server"
import { Suspense } from "react"
import {ErrorBoundary} from "react-error-boundary"

const page = () => {

  prefetchWorkflows()

  return (
    <WorkFlowContainer>
      <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading</p>}>
            <WorkFlowsList />
          </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkFlowContainer>
  )
}

export default page
