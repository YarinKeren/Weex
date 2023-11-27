import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
}

const BASE_URL = 'user/'

// _createUsers()

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // const user = await storageService.get('user', _id)
  // const updatedUser = await storageService.put('user', user)
  const updatedUser = await httpService.put(`user/${user._id}`, { user })

  // // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
  return updatedUser
}

async function login(userCred) {
  try {
    // const users = await storageService.query('user')
    // const users = await httpService.get('user')
    const user = await httpService.post('auth/login', userCred)
    // const user = users.find(user => user.email === userCred.email && user.password === userCred.password)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
      setLoggedinUser(user)
      return user
      // return saveLocalUser(user)
    } else {
      console.error('user not found !')
      return null
    }
  } catch (err) {
    console.error('Error logging in', err)
    throw err
  }
}

async function signup(userCred) {
  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  userCred.dashboard = { tasks: _getEmptyTasks(), wapsStats: { published: [], inProgress: [] } }
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function logout() {
  // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    email: user.email,
    password: user.password,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    dashboard: user.dashboard,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function setLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

// async function _createUsers() {
//   let users = await httpService.get('user')
//   if (!users || !users.length) {
//     users = [
//       {
//         fullname: 'Guest',
//         email: 'guest',
//         password: 'guest',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//       },
//       {
//         fullname: 'Admin',
//         email: 'admin',
//         password: 'admin',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//       },
//     ]
//   }
//   for (let i = 0; i < users.length; i++) {
//     await signup(users[i])
//   }
//   return users
// }

function _getEmptyTasks() {
  // Used for new users, generates empty tasks columns
  return {
    todo: {
      id: utilService.makeId(),
      title: 'To Do',
      items: [],
      name: 'todo',
    },
    'in-progress': {
      id: utilService.makeId(),
      title: 'In Progress',
      items: [],
      name: 'in-progress',
    },
    done: {
      id: utilService.makeId(),
      title: 'Done',
      items: [],
      name: 'done',
    },
  }
}
