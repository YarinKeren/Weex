import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { utilService } from '../../../services/util.service'
import { updateWap } from '../../../store/actions/wap.actions'
import { socketService, SOCKET_EMIT_OWNER_MSG } from '../../../services/socket.service'

import { Avatar } from '@mui/material'
import { Send } from '@mui/icons-material'

export function Chat({}) {
  const [msgTxt, setMsgTxt] = useState('')
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const [msgs, setMsgs] = useState(wap.msgs || [])

  const [currContact, setCurrContact] = useState({
    from: wap?.msgs ? Object.keys(wap.msgs)[0] : '',
    msgs: wap?.msgs ? wap.msgs[Object.keys(wap.msgs)[0]] : [],
  })

  useEffect(() => {
    setMsgs(wap.msgs)
    socketService.off('guest-add-msg')
    socketService.on('guest-add-msg', guestMsg => {
      const currGuestId = guestMsg[0]
      if (!wap.msgs[currGuestId]) {
        wap.msgs = { [currGuestId]: guestMsg[1], ...wap.msgs }
        wap.msgs[currGuestId] = [guestMsg[1]]
      } else {
        wap.msgs[currGuestId] = [...wap.msgs[currGuestId], guestMsg[1]]
      }
      setCurrContact(prevContact => ({ ...prevContact, msgs: wap.msgs[currGuestId] }))
      setMsgs({ ...wap.msgs })
    })
  }, [])

  async function onSend() {
    socketService.emit(SOCKET_EMIT_OWNER_MSG, { ownerMsg: msgTxt, to: currContact.from.slice(5) })
    currContact.msgs.push({ by: 'owner', txt: `${msgTxt}`, date: new Date().getTime() })
    setMsgs(prev => ({ ...prev }))
    await updateWap(wap)
    setMsgTxt('')
  }

  return (
    <div className='messages-dashboard '>
      <div className='last-messages info-box info-box-rows chat-contacts'>
        <div className='list-item-preview preview-header'>
          <h4>Users</h4>
        </div>
        <div className='contacts-menu'>
          {Object.keys(msgs || {}).map((sender, idx) => (
            <article
              key={idx}
              className={`list-item-preview chat-item  ${currContact.from === sender ? 'active' : ''}`}
            >
              <div className={`item`} key={sender} onClick={() => setCurrContact({ from: sender, msgs: msgs[sender] })}>
                <div className='user-avatar'>
                  <Avatar sx={{ width: 32, height: 32 }} />
                </div>
                <span className='user-name'>{sender}</span>
                <div className='message-body'>
                  <p>{msgs[sender]?.at(-1)?.txt || 'No messages'}</p>
                </div>
                <div className='time-ago flex'>{utilService.formatTimeAgo(msgs[sender]?.at(-1)?.date)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className='chat'>
        <div className='chat-layout'>
          <div className='contact bar'>
            <div className='user-avatar'>
              <Avatar />
            </div>
            <div className='wrapper'>
              <div className='name'>{currContact.from}</div>
              <div className='seen'>
                {currContact.msgs && !isNaN(utilService.formatTimeAgo(currContact.msgs.at(-1)?.date))
                  ? utilService.formatTimeAgo(currContact.msgs.at(-1).date)
                  : 'No Messages'}
              </div>
            </div>
          </div>
          <div className='messages' id='chat'>
            {currContact.msgs && (
              <div className='time'>
                {currContact.msgs && !isNaN(utilService.formatTimeAgo(currContact.msgs.at(-1)?.date))
                  ? utilService.formatTimeAgo(currContact.msgs.at(-1).date)
                  : 'No Messages'}
              </div>
            )}
            {currContact.msgs?.map((msg, idx) => {
              return (
                <p className={`${msg?.by} message`} key={idx}>
                  {msg?.txt}
                </p>
              )
            })}
          </div>
        </div>
        <div className='msg-input'>
          <input
            type='text'
            value={msgTxt}
            placeholder='Type your message here..'
            onChange={({ target: { value } }) => setMsgTxt(value)}
          />
          <Send className='send-btn' onClick={onSend} />
        </div>
      </div>
    </div>
  )
}
