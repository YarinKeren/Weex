import { httpService } from './http.service.js'
import { cmpModules } from '../data/data-objects/cmp-modules.js'
import { themeModules } from '../data/data-objects/theme-modules.js'

export const wapService = {
  save,
  query,
  remove,
  getById,
  getByUrl,
  getEmptyWap,
  getWapTheme,
  getCmpModules,
  replaceCmpInWap,
  getThemeModules,
  deleteCmpFromWap,
}

const BASE_URL = 'wap/'

function query() {
  return httpService.get(BASE_URL)
}

function getById(wapId) {
  return httpService.get(BASE_URL + wapId)
}

function getByUrl(wapUrl) {
  return httpService.get(BASE_URL + 'url/' + wapUrl)
}

function save(wap) {
  if (wap._id) return httpService.put(BASE_URL + wap._id, wap)
  else return httpService.post(BASE_URL, wap)
}

function remove(wapId) {
  return httpService.delete(BASE_URL + wapId)
}

function replaceCmpInWap(targetCmp, { cmps }) {
  if (!cmps) return
  const cmpIndex = cmps.findIndex(childCmp => childCmp._id === targetCmp._id)
  if (cmpIndex !== -1) cmps.splice(cmpIndex, 1, targetCmp)
  else cmps.forEach(childCmp => replaceCmpInWap(targetCmp, childCmp))
}

function deleteCmpFromWap(cmpToDelete, { cmps }) {
  if (!cmps) return
  const cmpIndex = cmps.findIndex(childCmp => childCmp._id === cmpToDelete._id)
  if (cmpIndex !== -1) cmps.splice(cmpIndex, 1)
  else cmps.forEach(childCmp => deleteCmpFromWap(cmpToDelete, childCmp))
}

function getEmptyWap() {
  return {
    name: '',
    imgUrl: '',
    cmps: [],
    owner: '',
    isPublished: false,
  }
}

function getCmpModules() {
  return cmpModules
}

function getThemeModules() {
  return themeModules
}

function getWapTheme(wap) {
  const wapTheme = wap.originalTheme
  return wapTheme
}
