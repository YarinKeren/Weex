import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const wapService = {
  remove,
  query,
  getById,
  add,
  update,
}

async function query(filterBy = { txt: '' }) {
  try {
    const collection = await dbService.getCollection('wap')
    const waps = await collection.find().toArray()

    return waps
  } catch (err) {
    logger.error('Cannot find waps(service-query)', err)
    throw err
  }
}

async function getById(wapId) {
  try {
    const collection = await dbService.getCollection('wap')
    const wap = collection.findOne({ _id: ObjectId(wapId) })
    return wap
  } catch (err) {
    logger.error(`while finding wap ${wapId}(service-getById)`, err)
    throw err
  }
}

async function remove(wapId) {
  try {
    const collection = await dbService.getCollection('wap')
    await collection.deleteOne({ _id: ObjectId(wapId) })
    return wapId
  } catch (err) {
    logger.error(`cannot remove wap ${wapId}`, err)
    throw err
  }
}

async function add(wap) {
  try {
    console.log('wap', wap)
    const collection = await dbService.getCollection('wap')
    await collection.insertOne(wap)
    return wap
  } catch (err) {
    logger.error('cannot insert wap', err)
    throw err
  }
}

async function update(wap) {
  try {
    // const wapToSave = {
    //   vendor: wap.vendor,
    //   price: wap.price,
    // }
    const wapToUpdate = { ...wap }
    delete wapToUpdate._id

    const collection = await dbService.getCollection('wap')
    await collection.updateOne({ _id: ObjectId(wap._id) }, { $set: wapToUpdate })
    return wap
  } catch (err) {
    logger.error(`cannot update wap ${wap._id}`, err)
    throw err
  }
}

// async function addCarMsg(carId, msg) {
//   try {
//     msg.id = utilService.makeId()
//     const collection = await dbService.getCollection('car')
//     await collection.updateOne({ _id: ObjectId(carId) }, { $push: { msgs: msg } })
//     return msg
//   } catch (err) {
//     logger.error(`cannot add car msg ${carId}`, err)
//     throw err
//   }
// }

// async function removeCarMsg(carId, msgId) {
//   try {
//     const collection = await dbService.getCollection('car')
//     await collection.updateOne({ _id: ObjectId(carId) }, { $pull: { msgs: { id: msgId } } })
//     return msgId
//   } catch (err) {
//     logger.error(`cannot add car msg ${carId}`, err)
//     throw err
//   }
// }
