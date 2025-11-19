import { serve } from "@upstash/workflow/express";

export const workflowRouter = serve({
  baseUrl: QSTASH_URL,
  token: QSTASH_token,
});
