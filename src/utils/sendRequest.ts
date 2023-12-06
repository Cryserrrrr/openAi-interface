import { Message, models, openaiMessage } from '@/types/types';
import { gptCompletion } from '@/api';

export const sendRequest = (
  inputValue: string,
  messages: Message[],
  model: models,
  setInputValue: (value: string) => void,
  setMessages: (value: Message[]) => void,
  abortRequest: boolean,
  setAbortRequest: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  images?: string[] | null,
  setImages?: (value: string[]) => void,
) => {
  if (inputValue === '') return;

  const tempMessages = [...messages];
  tempMessages.push({
    text: inputValue,
    isUser: true,
    model: model,
    image: images && model === models.GPTVision ? images : null,
  })

  let openaiMessages: openaiMessage[] = []

  tempMessages.forEach(message => {
    if (message.image && model === models.GPTVision) {
      openaiMessages.push({
        content: [
          {
            type: 'text',
            text: message.text,
          },
        ],
        role: message.isUser ? 'user' : 'assistant',
      })
    } else {
      openaiMessages.push({
        content: message.text,
        role: message.isUser ? 'user' : 'assistant',
      })
    }
    message.image?.forEach(image => {
      // @ts-expect-error
      openaiMessages[openaiMessages.length - 1].content.push({
        type: 'image_url',
        image_url: {
          url: image,
        }
      })
    })
  })

  setImages && setImages([]);
  setInputValue('');

  tempMessages.push({
    text: '',
    isUser: false,
    model: model,
  })
  setMessages(tempMessages);
  limitToken(openaiMessages, model)

  gptCompletion(
    openaiMessages,
    model,
    tempMessages,
    setMessages,
    abortRequest,
    setAbortRequest,
    setLoading
  );
}

const limitToken = (openaiMessages: openaiMessage[], model: models) => {

  if (model === models.GPT3 || model === models.GPT4 || model === models.GPTVision) {
    let totalToken = 0;
    for (let i = openaiMessages.length - 1; i > 0 ; --i) {
      const message = openaiMessages[i];
      if (message.content && typeof message.content === 'string') {
        totalToken += (message.content as string).length / 4;
      } else if (message.content && typeof message.content === 'object' && message.content[0].type === 'text') {
        totalToken += (message.content[0].text as string).length / 4;
      }
    }
    if (totalToken > 1000) {
      let totalToken = 0;
      for (let i = openaiMessages.length - 1; i > 0 ; --i) {
        const message = openaiMessages[i];
        totalToken += (message.content as string).length / 4;
        if (totalToken > 1000) {
          openaiMessages.splice(0, i);
          break;
        }
      }
    }
  }


}