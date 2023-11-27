import { httpService } from './http.service'

export const locService = {
  getLatLng,
}

function getLatLng(geoSearchKey) {
  return httpService.get(`loc/${geoSearchKey}`)
}
