import { Editor, EditorError, EditorLoading } from "@/feature/editor/components/editor";
import EditorHeader from "@/feature/editor/components/editor-header";
import { prefetchWorkFlow } from "@/feature/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trps/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  await requireAuth();

  const { workflowId } = await params;

  prefetchWorkFlow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
        <EditorHeader workflowId={workflowId}/>
          <main className="flex-1">
            <Editor workflowId={workflowId}/>
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default page;
