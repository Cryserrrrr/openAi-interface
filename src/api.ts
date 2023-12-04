import OpenAI from "openai";

// Models
import { openaiModelsMap, openaiMessage, models, Message } from "./models/models";
import { abort } from "process";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const gptCompletion = async (
  openaiMessages: any[],
  model: models,
  messages: Message[],
  setMessages: (value: Message[]) => void,
  abortRequest: boolean,
  setAbortRequest: (value: boolean) => void,
  setLoading: (value: boolean) => void,
) => {
  setLoading(true);
  const gptResponse = await openai.chat.completions.create({
    model: openaiModelsMap[model],
    messages: openaiMessages,
    stream: true,
    max_tokens: 300,
  });

  for await (const message of gptResponse) {
    if (abortRequest) abort();
    const tempMessages = [...messages];
    tempMessages[tempMessages.length - 1].text += message.choices[0]?.delta?.content || '';
    setMessages(tempMessages);
  }
  setAbortRequest(false);
  setLoading(false);
  return gptResponse;
}