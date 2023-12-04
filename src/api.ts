import OpenAI from "openai";

// Models
import { openaiModelsMap, openaiMessage, models } from "./models/models";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const gptCompletion = async (messages: any[], model: models) => {
  const gptResponse = await openai.chat.completions.create({
    model: openaiModelsMap[model],
    messages: messages,
    max_tokens: 300,
  });
  return gptResponse;
}