import { wapService } from './wap.service.js'
import { logger } from '../../services/logger.service.js'

export async function getWaps(req, res) {
  try {
    logger.debug('Getting Waps:')
    const waps = await wapService.query()
    res.json(waps)
  } catch (err) {
    logger.error('Failed to get waps(controller-getWaps)', err)
    res.status(400).send({ err: 'Failed to get waps' })
  }
}

export async function getWapById(req, res) {
  try {
    const wapId = req.params.id
    const wap = await wapService.getById(wapId)

    // For demo purposes only
    delete wap._id
    delete wap.owner
    const demoWap = await wapService.add(wap)

    res.json(demoWap)
  } catch (err) {
    logger.error('Failed to get wap(controller-getById)', err)
    res.status(400).send({ err: 'Failed to get wap' })
  }
}

export async function getWapByUrl(req, res) {
  try {
    const wapUrl = req.params.url
    const wap = await wapService.getByUrl(wapUrl)
    res.json(wap)
  } catch (err) {
    logger.error('Failed to get wap(controller-getByUrl)', err)
    res.status(400).send({ err: 'Failed to get wap' })
  }
}

export async function addWap(req, res) {
  try {
    const wap = req.body
    const addedWap = await wapService.add(wap)
    // socketService.broadcast({ type: 'wap-added', data: addedWap, userId: loggedinUser._id })
    res.json(addedWap)
  } catch (err) {
    logger.error('Failed to add wap(controller-addWap)', err)
    res.status(400).send({ err: 'Failed to add wap' })
  }
}

export async function updateWap(req, res) {
  try {
    const wap = req.body
    const updatedWap = await wapService.update(wap)
    res.json(updatedWap)
  } catch (err) {
    logger.error('Failed to update wap(controller-updateWap)', err)
    res.status(400).send({ err: 'Failed to update wap' })
  }
}

export async function removeWap(req, res) {
  try {
    const wapId = req.params.id
    const removedId = await wapService.remove(wapId)
    // socketService.broadcast({ type: 'wap-removed', data: wapId, userId: loggedinUser._id })
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove wap(controller-removeWap)', err)
    res.status(400).send({ err: 'Failed to remove wap' })
  }
}
