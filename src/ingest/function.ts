// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {generateText} from 'ai'
import * as Sentry from '@sentry/nextjs'

const google  = createGoogleGenerativeAI()

export const executeAi = inngest.createFunction(
  { id: "execute-ai", triggers: { event: "execute/ai" } },
  async ({ event, step }) => {

    Sentry.logger.info("user trigger test log", {'log_user': 'sentry_test'})

    console.log("Something is missing")
    console.error("Something error ")

    const {steps} = await step.ai.wrap(
        "gemni-generate-text",
        generateText,
        {
            model: google("gemini-2.5-flash"),
            system: "You are a heplful assistant",
            prompt: "What is 5 +2 ?",
             experimental_telemetry: {
                isEnabled: true,
                recordInputs: true,
                recordOutputs: true,
              },
        }
    )
    return steps;
  }
);