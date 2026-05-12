import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/feature/executuions/components/http-request/node";
import { ManualTriggerNode } from "@/feature/trigger/components/manual-trigger/node";
import { NodeType } from "@/generated/prisma";
import { NodeTypes } from "@xyflow/react";

export const nodeComponent = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.HTTP_REQUEST] : HttpRequestNode,
    [NodeType.MANUAL_TRIGGER] : ManualTriggerNode
,
} as const satisfies NodeTypes

export type registerNodeType = keyof typeof nodeComponent;