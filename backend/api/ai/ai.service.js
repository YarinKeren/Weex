import { logger } from '../../services/logger.service.js'

export const aiService = {
  generateText,
  generateImage,
}

const OPENAI_API_KEY = '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'

async function generateText(userPrompt) {
  try {
    const data = await _callOpenAI('engines/text-davinci-002/completions', {
      prompt: userPrompt,
      max_tokens: 50,
    })
    const generatedText = data.choices[0].text.trim()
    return generatedText
  } catch (err) {
    logger.error('Cannot find geolocation(service-getGeoLocation)', err)
    throw err
  }
}

async function generateImage(userPrompt) {
  try {
    const data = await _callOpenAI('images/generations', {
      prompt: userPrompt,
    })
    const generatedImageUrl = data.data[0].url
    return generatedImageUrl
  } catch (err) {
    logger.error('Cannot find geolocation(service-getGeoLocation)', err)
    throw err
  }
}

async function _callOpenAI(endpoint, payload) {
  try {
    const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(`Error: ${data.error?.message || 'An error occurred'}`)
    }

    return data
  } catch (error) {
    console.error(`Error with OpenAI ${endpoint} call:`, error)
    throw error
  }
}
