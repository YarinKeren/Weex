import { logger } from '../../services/logger.service.js'
import { locService } from './loc.service.js'

export async function getGeoLocation(req, res) {
  try {
    const { geokey } = req.params
    const location = await locService.getGeoLocation(geokey)
    res.json(location)
  } catch (err) {
    logger.error('Failed to get geoloc(controller-getGeoLocation)', err)
    res.status(400).send({ err: 'Failed to get wap' })
  }
}
