import { store } from '../store.js'
import { userService } from '../../services/user.service.js'
import { socketService } from '../../services/socket.service.js'

import toast from 'react-hot-toast'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer.js'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer.js'

export async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START })
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.error('UserActions: err in loadUsers', err)
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

export async function removeUser(userId) {
  try {
    await userService.remove(userId)
    store.dispatch({ type: REMOVE_USER, userId })
  } catch (err) {
    console.error('UserActions: err in removeUser', err)
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    if (!user) return Promise.reject('Wrong credentials')
    store.dispatch({
      type: SET_USER,
      user,
    })
    socketService.login(user)
    return user
  } catch (err) {
    console.error('Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({
      type: SET_USER,
      user,
    })
    socketService.login(user)
    return user
  } catch (err) {
    console.error('Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({
      type: SET_USER,
      user: null,
    })
    socketService.logout()
  } catch (err) {
    console.error('Cannot logout', err)
    throw err
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_WATCHED_USER, user })
    toast("Let's analyze", { icon: '📊' })
  } catch (err) {
    toast.error('Cannot load user')
    console.error('Cannot load user', err)
  }
}

export async function updateUser(user) {
  //OPTIMISTIC APPROACH
  store.dispatch({ type: SET_USER, user: user })

  try {
    await userService.update(user)
  } catch (err) {
    toast.error('Cannot update user')
    console.error('Cannot update user', err)
  }
}

export function getTasksData({ dashboard: { tasks } }) {
  return Object.keys(tasks).reduce((acc, columnName) => {
    acc[columnName] = tasks[columnName].items.length
    return acc
  }, {})
}

// export function getUserWapsData(user, waps) {
//   const userWaps = waps.filter(wap => wap.owner?._id === user._id)

//   return userWaps.reduce(
//     (acc, wap) => {
//       if (wap.isPublished) acc.published += 1
//       else acc.inProgress += 1
//       return acc
//     },
//     { published: 0, inProgress: 0 }
//   )
// }
