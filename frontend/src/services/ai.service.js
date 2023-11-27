import { httpService } from './http.service'

export const aiService = {
  generateText,
  generateImage,
}

function generateText(userPrompt) {
  return httpService.get(`ai/text/${userPrompt}`)
}

function generateImage(userPrompt) {
  return httpService.get(`ai/image/${userPrompt}`)
}
