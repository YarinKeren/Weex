import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateWap } from '../../../store/actions/wap.actions'
import { SOCKET_EMIT_GUEST_MSG, SOCKET_EVENT_OWNER_ADD_MSG, socketService } from '../../../services/socket.service'

import { Avatar } from '@mui/material'
import { ChatOutlined, Send } from '@mui/icons-material'

export function ChatCmp({ cmp }) {
  const [msg, setMsg] = useState('')
  const { style, className, _id } = cmp
  const [isChatOpen, setIsChatOpen] = useState(false)
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  let [msgs, setMsgs] = useState([])

  // Here we listen to .on(owner-send-msg) - adding msg to guest chat
  useEffect(() => {
    socketService.off(SOCKET_EVENT_OWNER_ADD_MSG)
    socketService.on(SOCKET_EVENT_OWNER_ADD_MSG, async ownerMsg => {
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
    <div style={style} className={className} onSubmit={ev => ev.preventDefault()}>
      <ChatOutlined
        style={style}
        spellCheck='false'
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
            <div className='messages flex direction-column'>
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
