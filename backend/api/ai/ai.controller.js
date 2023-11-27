import { logger } from '../../services/logger.service.js'
import { aiService } from './ai.service.js'

export async function generateText(req, res) {
  try {
    const { prompt } = req.params
    const generatedText = await aiService.generateText(prompt)
    res.json(generatedText)
  } catch (err) {
    logger.error('Failed to get geoloc(controller-getGeoLocation)', err)
    res.status(400).send({ err: 'Failed to get wap' })
  }
}

export async function generateImage(req, res) {
  try {
    const { prompt } = req.params
    const generatedText = await aiService.generateImage(prompt)
    res.json(generatedText)
  } catch (err) {
    logger.error('Failed to get geoloc(controller-getGeoLocation)', err)
    res.status(400).send({ err: 'Failed to get wap' })
  }
}
