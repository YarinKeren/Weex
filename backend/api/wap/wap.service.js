import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

export const wapService = {
  add,
  query,
  update,
  remove,
  getById,
  getByUrl,
}

async function query() {
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

async function getByUrl(wapUrl) {
  try {
    const collection = await dbService.getCollection('wap')
    const wap = collection.findOne({ wapUrl })
    return wap
  } catch (err) {
    logger.error(`while finding wap ${wapUrl}(service-getByUrl)`, err)
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
