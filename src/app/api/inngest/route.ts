import { inngest } from "@/ingest/client";
import { executeAi } from "@/ingest/function";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    executeAi
  ],
});