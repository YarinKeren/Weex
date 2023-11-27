import io from 'socket.io-client'
import { userService } from './user.service'
import { utilService } from './util.service'

export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'

export const SOCKET_EMIT_OWNER_MSG = 'owner-msg'
export const SOCKET_EVENT_OWNER_ADD_MSG = 'owner-add-msg'
export const SOCKET_EMIT_GUEST_MSG = 'guest-msg'
export const SOCKET_EVENT_GUEST_ADD_MSG = 'guest-add-msg'

export const SOCKET_EMIT_SEND_SCHEDULE = 'send-schedule'

export const SOCKET_EMIT_ADD_LEAD = 'add-lead'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        let id
        if (!user) id = utilService.makeId()
        else user._id = user._id.toString()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
    getSocketId() {
      return socket.id
    },
  }
  return socketService
}
