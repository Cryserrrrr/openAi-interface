import OpenAI from "openai";

// Models
import { openaiModelsMap, openaiMessage, models, Message } from "./models/models";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const gptCompletion = async (openaiMessages: any[], model: models, messages: Message[], setMessages: (value: Message[]) => void,) => {
  const gptResponse = await openai.chat.completions.create({
    model: openaiModelsMap[model],
    messages: openaiMessages,
    stream: true,
    max_tokens: 1000,
  });

  for await (const message of gptResponse) {
    const tempMessages = [...messages];
    tempMessages[tempMessages.length - 1].text += message.choices[0]?.delta?.content || '';
    setMessages(tempMessages);
  }
  return gptResponse;
}