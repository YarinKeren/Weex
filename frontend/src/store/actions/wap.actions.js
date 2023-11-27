import { store } from '../store.js'
import { utilService } from '../../services/util.service.js'
import { wapService } from '../../services/wap.service.local.js'

import { ADD_WAP, SET_WAP, SET_WAPS, UPDATE_WAP, REMOVE_WAP } from '../reducers/wap.reducer.js'

import { cloneDeep } from 'lodash'
import toast from 'react-hot-toast'

export async function loadWap(wapId = null, wapUrl = null) {
  try {
    let loadedWap
    if (wapId) loadedWap = await wapService.getById(wapId)
    else if (wapUrl) loadedWap = await wapService.getByUrl(wapUrl)
    await setWap(loadedWap)
  } catch (error) {
    console.error('Failed to fetch WAP:', error)
  }
}

export async function loadWaps() {
  try {
    const waps = await wapService.query()
    // For demo purposes only
    const wapsForDemo = waps.filter(wap => wap?.owner?.fullname === 'Admin')

    store.dispatch({
      type: SET_WAPS,
      waps: wapsForDemo,
    })
  } catch (err) {
    console.error('Cannot load waps', err)
    throw err
  }
}

export async function addWap(wap) {
  try {
    const savedWap = await wapService.save(wap)
    store.dispatch({ type: ADD_WAP, wap: savedWap })
    return savedWap
  } catch (err) {
    console.error('Cannot add wap', err)
    throw err
  }
}

export async function removeWap(wapId) {
  try {
    await wapService.remove(wapId)
    store.dispatch({ type: REMOVE_WAP, wapId })
    toast("Aaaaaaand it's gone.", { icon: '😮' })
  } catch (err) {
    console.error('Cannot remove wap', err)
    throw err
  }
}

export async function updateWap(wap) {
  // OPTIMISTIC APPROACH
  store.dispatch({ type: UPDATE_WAP, wap })
  try {
    await wapService.save(wap)
  } catch (err) {
    console.error('Cannot update wap', err)
    toast.error('Cannot update wap')
    throw err
  }
}

export function moveCmp(wap, cmps, sourceIdx, destinationIdx) {
  const [reorderedItem] = cmps.splice(sourceIdx, 1)
  cmps.splice(destinationIdx, 0, reorderedItem)
  updateWap({ ...wap, cmps: cmps })
}

async function _getCmpById(cmpId) {
  const cmpModules = wapService.getCmpModules()
  const loadedCmp = cmpModules
    .map(type => {
      const foundCmp = type.cmps?.find(cmp => cmp._id === cmpId)
      return foundCmp !== undefined ? foundCmp : null
    })
    .find(cmp => cmp !== null)
  return loadedCmp
}

export async function addCmp(wap, cmpId, destinationIdx) {
  let cmpToAdd = await _getCmpById(cmpId)
  const newCmpToAdd = cloneDeep(cmpToAdd)
  newCmpToAdd._id = utilService.makeId()

  let updatedCmps
  if (destinationIdx === 0) updatedCmps = [newCmpToAdd, ...wap.cmps]
  else if (destinationIdx === wap.cmps.length) updatedCmps = [...wap.cmps, newCmpToAdd]
  else {
    updatedCmps = [...wap.cmps.slice(0, destinationIdx), newCmpToAdd, ...wap.cmps.slice(destinationIdx)]
  }
  updateWap({ ...wap, cmps: updatedCmps })
}

export async function setWap(wap) {
  try {
    store.dispatch({ type: SET_WAP, wap })
  } catch (err) {
    console.error('Cannot save wap in wap.action', err)
    throw err
  }
}

export async function publishWap(wapUrl, { dashboard: { wapsStats } }) {
  try {
    const wap = await wapService.getByUrl(wapUrl)
    wap.isPublished = true
    await wapService.save(wap)

    const wapIndex = wapsStats.inProgress.findIndex(wap => wap._id === wapId)
    if (wapIndex === -1) {
      console.error("Not this user's wap")
      return
    }

    const wapToPublish = wapsStats.inProgress[wapIndex]
    wapToPublish.isPublished = true

    wapsStats.published.push(wapToPublish)
    wapsStats.inProgress.splice(wapIndex, 1)
  } catch (err) {}
}

export async function handleUndoRedo(actionName) {
  const currentWap = store.getState().wapModule.present.wap
  try {
    let updatedWap = cloneDeep(currentWap)

    toast.promise(
      wapService.save(updatedWap),
      {
        loading: actionName,
        success: 'Saved!',
        error: 'Cannot save wap',
      },
      {
        icon: '🔁',
      }
    )
  } catch (err) {
    toast.error('Cannot update wap')
    console.error('Cannot update wap:', err)
  }
}

export function getEmptyWap() {
  return wapService.getEmptyWap()
}
