import { logger } from '../../services/logger.service.js'

export const locService = {
  getGeoLocation,
}

async function getGeoLocation(geokey) {
  try {
    const GEOLOC_API_KEY = 'AIzaSyCBoB8p0a3vxQDnLLTTr4adJxGdF-PXRP8'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${geokey}&key=${GEOLOC_API_KEY}`
    const res = await fetch(url)
    const geoCodeObj = await res.json()
    return geoCodeObj.results[0].geometry.location
  } catch (err) {
    logger.error('Cannot find geolocation(service-getGeoLocation)', err)
    throw err
  }
}
