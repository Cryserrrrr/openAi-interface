export enum models {
  GPT4 = 'GPT-4',
  GPT3 = 'GPT-3',
  GPTVision = 'GPT-Vision',
  TextToSpeech = 'Text-To-Speech',
  SpeechToText = 'Speech-To-Text',
  DallE3 = 'Dall-E 3',
}

export type Message = {
  text: string,
  isUser: boolean,
  model: models | null,
  image?: string | null,
}

export interface Theme {
  primary: string,
  darkPrimary: string,
  background: string,
  text: string,
  unselected: string,
}

export enum openaiModels {
  GPT3 = 'gpt-3.5-turbo-1106',
  GPT4 = 'gpt-4-1106-preview',
  GPTVision = 'gpt-4-vision-preview',
  TextToSpeech = 'tts-1',
  SpeechToText = 'whisper-1',
  DallE3 = 'dall-e-3',
}

export const openaiModelsMap = {
  [models.GPT4]: openaiModels.GPT4,
  [models.GPT3]: openaiModels.GPT3,
  [models.GPTVision]: openaiModels.GPTVision,
  [models.TextToSpeech]: openaiModels.TextToSpeech,
  [models.SpeechToText]: openaiModels.SpeechToText,
  [models.DallE3]: openaiModels.DallE3,
}

export interface openaiMessageGPT {
  role: string,
  content: string,
}

export interface openaicontentVision {
  type: string,
  text?: string,
  image_url?: {
    url: string,
  }
}

export interface openaiMessageVision {
  role: string,
  content: openaicontentVision[],
}

export type openaiMessage = openaiMessageGPT | openaiMessageVision;