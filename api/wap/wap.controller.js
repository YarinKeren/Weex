import { wapService } from './wap.service.js'
import { logger } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'

export async function getWaps(req, res) {
  try {
    logger.debug('Getting Waps:', req.query)
    // const filterBy = {
    //   txt: req.query.txt || '',
    //   pageIdx: req.query.pageIdx,
    // }
    const waps = await wapService.query(filterBy)
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
    res.json(wap)
  } catch (err) {
    logger.error('Failed to get wap(controller-getById)', err)
    res.status(400).send({ err: 'Failed to get wap' })
  }
}

export async function addWap(req, res) {
  const { loggedinUser } = req

  try {
    const wap = req.body
    wap.owner = loggedinUser
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
  const { loggedinUser } = req
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

// export async function addCarMsg(req, res) {
//   const { loggedinUser } = req
//   try {
//     const carId = req.params.id
//     const msg = {
//       txt: req.body.txt,
//       by: loggedinUser,
//     }
//     const savedMsg = await carService.addCarMsg(carId, msg)
//     res.json(savedMsg)
//   } catch (err) {
//     logger.error('Failed to update car', err)
//     res.status(400).send({ err: 'Failed to update car' })
//   }
// }

// export async function removeCarMsg(req, res) {
//   const { loggedinUser } = req
//   try {
//     const carId = req.params.id
//     const { msgId } = req.params

//     const removedId = await carService.removeCarMsg(carId, msgId)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove car msg', err)
//     res.status(400).send({ err: 'Failed to remove car msg' })
//   }
// }
