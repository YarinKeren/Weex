import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../../frontend/src/services/util.service.js'

const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken,
}

async function login(email, password) {
  logger.debug(`auth.service - login with email: ${email}`)

  const user = await userService.getByEmail(email)
  if (!user) return Promise.reject('Invalid email or password')
  // TODO: un-comment for real login
  // const match = await bcrypt.compare(password, user.password)
  // if (!match) return Promise.reject('Invalid email or password')

  delete user.password
  user._id = user._id.toString()
  return user
}

async function signup({ email, password, fullname, imgUrl, dashboard }) {
  const saltRounds = 10

  logger.debug(`auth.service - signup with email: ${email}, fullname: ${fullname}`)
  if (!password || !fullname) return Promise.reject('Missing required signup information')

  const userExist = await userService.getByEmail(email)
  if (userExist) return Promise.reject('Email already taken')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ email, password: hash, fullname, imgUrl, dashboard })
}

function getLoginToken(user) {
  const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin, score: user.score }
  return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    // console.log('Invalid login token')
  }
  return null
}

// Signup fake users - DO NOT DELETE - for testing
// ;(async () => {
//   await signup({
//     fullname: 'Guest',
//     email: 'guest',
//     password: 'guest',
//     imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//     dashboard: { tasks: _getEmptyTasks(), wapsStats: { published: [], inProgress: [] } },
//   })
//   await signup({
//     fullname: 'Admin',
//     email: 'admin',
//     password: 'admin',
//     imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//     dashboard: { tasks: _getEmptyTasks(), wapsStats: { published: [], inProgress: [] } },
//   })
// })()

// function _getEmptyTasks() {
//   // Used for new users, generates empty tasks columns
//   return {
//     todo: {
//       id: utilService.makeId(),
//       title: 'To Do',
//       items: [],
//       name: 'todo',
//     },
//     'in-progress': {
//       id: utilService.makeId(),
//       title: 'In Progress',
//       items: [],
//       name: 'in-progress',
//     },
//     done: {
//       id: utilService.makeId(),
//       title: 'Done',
//       items: [],
//       name: 'done',
//     },
//   }
// }
