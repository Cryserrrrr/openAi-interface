import { Message, models, openaiMessage, openaiMessageVision, openaiMessageGPT } from '@/models/models';
import { gptCompletion } from '@/api';

export const sendRequest = async (
  inputValue: string,
  messages: Message[],
  model: models,
  setInputValue: (value: string) => void,
  setMessages: (value: Message[]) => void,
  abortRequest: boolean,
  setAbortRequest: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  image?: string | null,
  setImage?: (value: string | null) => void,
) => {
  if (inputValue === '') return;
  const tempMessages = [...messages];
  tempMessages.push({
    text: inputValue,
    isUser: true,
    model: model,
    image: image && model === models.GPTVision ? image : null,
  })
  const openaiMessages: openaiMessage[] = []
    tempMessages.forEach(message => {
      if (message.image && model === models.GPTVision) {
        openaiMessages.push({
          content: [
            {
              type: 'text',
              text: message.text,
            },
            {
              type: 'image_url',
              image_url: {
                url: message.image || '',
              }
            }
          ],
          role: message.isUser ? 'user' : 'assistant',
        })
      } else {
        openaiMessages.push({
          content: message.text,
          role: message.isUser ? 'user' : 'assistant',
        })
      }
    })
  setImage && setImage(null);
  setInputValue('');
  tempMessages.push({
    text: '',
    isUser: false,
    model: model,
  })
  setMessages(tempMessages);
  gptCompletion(openaiMessages, model, tempMessages, setMessages, abortRequest, setAbortRequest, setLoading);
}  