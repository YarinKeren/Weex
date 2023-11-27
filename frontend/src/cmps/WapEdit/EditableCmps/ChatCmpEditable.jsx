import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { updateWap } from '../../../store/actions/wap.actions'
import { SOCKET_EMIT_GUEST_MSG, SOCKET_EVENT_OWNER_ADD_MSG, socketService } from '../../../services/socket.service'

import { useHover } from '../../../hooks/useHover'

import { Avatar } from '@mui/material'
import { ChatOutlined, Send } from '@mui/icons-material'

export function ChatCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const [msg, setMsg] = useState('')
  const { style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  let [msgs, setMsgs] = useState([])
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  // Here we listen to .on(owner-send-msg) - adding msg to guest chat
  useEffect(() => {
    socketService.off(SOCKET_EVENT_OWNER_ADD_MSG)
    socketService.on(SOCKET_EVENT_OWNER_ADD_MSG, ownerMsg => {
      setMsgs(prevMsgs => [...prevMsgs, ownerMsg])
    })
  }, [])

  function handleChange(ev) {
    const value = ev.target.value
    setMsg(value)
  }

  async function onSend() {
    const currGuest = `guest${socketService.getSocketId()}`
    socketService.emit(SOCKET_EMIT_GUEST_MSG, {
      guestMsg: [currGuest, msg],
      to: wap.owner._id,
    })
    if (!msgs || !msgs.length) {
      wap.msgs = { [currGuest]: [], ...wap.msgs }
      msgs = wap.msgs[currGuest]
    }

    const newMessage = { by: 'customer', txt: msg, date: new Date().getTime() }
    setMsgs(prevMsgs => [...prevMsgs, newMessage])
    msgs.push(newMessage)

    setMsg('')
    await updateWap(wap)
    setMsgs(msgs)
  }

  return (
    <div
      style={style}
      {...hoverHandlers}
      className={computedClassName}
      onSubmit={ev => ev.preventDefault()}
      onClick={ev => handleElClick(ev, cmp)}
    >
      <ChatOutlined
        style={style}
        spellCheck='false'
        {...hoverHandlers}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={'btn-open-chat'}
      />

      {isChatOpen && (
        <div className='chat-container flex direction-column space-between'>
          <div className='chat-header flex align-center'>
            {/* <SupportAgentOutlined className='agent-icon' /> */}
            <Avatar
              className='agent-icon'
              src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698319736/vrwoccshru7dm0kg3v7c.jpg'
            />

            <h3>Support</h3>
          </div>
          <div className='chat-body'>
            <div className='messages messages flex direction-column'>
              <p className={`owner message`}>How may I assist you today ?</p>
              {msgs?.map((msg, idx) => {
                return (
                  <p className={`${msg.by} message`} key={idx}>
                    {msg.txt}
                  </p>
                )
              })}
            </div>
          </div>
          <div className='chat-input flex align-center'>
            <input
              value={msg}
              name='chatInput'
              {...hoverHandlers}
              className='chat-input'
              onChange={handleChange}
              placeholder='Type your message here...'
            ></input>
            <Send onClick={onSend} className='btn-send' />
          </div>
        </div>
      )}
    </div>
  )
}
