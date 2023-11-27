import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../../store/actions/user.actions'
import { handleUndoRedo, publishWap, updateWap } from '../../../store/actions/wap.actions'

import toast from 'react-hot-toast'
import { ActionCreators as UndoRedoAction } from 'redux-undo'

import { Button, Tooltip } from '@mui/material'
import { Add, Undo, Redo, Delete, Monitor, PhoneIphone, TabletOutlined, ChatBubbleOutline } from '@mui/icons-material'
import { PublishModal } from '../../Modals/PublishModal'
import { useState } from 'react'

export function TopTools({
  onDeleteWap,
  toggleLeftTools,
  isLeftToolsOpen,
  activeDeviceType,
  setActiveDeviceType,
  setPrevModuleOpened,
}) {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useSelector(storeState => storeState.userModule.user)
  const wap = useSelector(storeState => storeState.wapModule.present.wap)

  function handleUndo() {
    dispatch(UndoRedoAction.undo())
    handleUndoRedo('Undoing...')
  }

  function handleRedo() {
    dispatch(UndoRedoAction.redo())
    handleUndoRedo('Redoing...')
  }

  function handlePublishClick(ev) {
    if (!user) {
      toast.error('Please login to publish', { id: 'publish' })
      return
    }
    setIsModalOpen(true)
  }

  async function onPublishWap(ev) {
    ev.preventDefault()
    setIsModalOpen(false)
    const data = new FormData(ev.currentTarget)
    try {
      const wapUrl = data.get('wapName')
      await updateWap({ ...wap, wapUrl })
      await publishWap(wapUrl, user)
      await updateUser(user)

      setTimeout(() => {
        window.open(`/${wapUrl}`, '_blank')
      }, 20)
      toast("We're live!", { icon: '🚀' })
    } catch (err) {
      toast.error('Cannot publish WAP')
      console.error('Cannot publish WAP:', err)
    }
  }

  function handleClose() {
    toggleLeftTools()
    setPrevModuleOpened(null)
  }

  const deviceIcons = [
    { title: 'Desktop', icon: Monitor, type: 'monitor' },
    { title: 'Tablet', icon: TabletOutlined, type: 'tablet' },
    { title: 'Mobile', icon: PhoneIphone, type: 'phone' },
  ]

  const optionIcons = [
    { title: 'Delete Wap', icon: Delete, action: onDeleteWap },
    { title: 'Undo', icon: Undo, action: handleUndo },
    { title: 'Redo', icon: Redo, action: handleRedo },
    { title: 'Chat', icon: ChatBubbleOutline },
  ]

  return (
    <header className='top-tools'>
      <ul>
        <li className='add-icon-container'>
          <Tooltip title={isLeftToolsOpen ? 'Close Menu' : 'Open Menu'}>
            <Add onClick={handleClose} className={`add-icon ${isLeftToolsOpen ? 'open' : ''}`} />
          </Tooltip>
        </li>
      </ul>
      <ul>
        <li className='icons responsive-icons'>
          {deviceIcons.map(({ title, icon: Icon, type }) => (
            <Tooltip key={type} title={title}>
              <Icon onClick={() => setActiveDeviceType(type)} className={activeDeviceType === type ? 'active' : ''} />
            </Tooltip>
          ))}
        </li>
      </ul>
      <ul>
        <li className='icons options-left-icons'>
          {optionIcons.map(({ title, icon: Icon, action }) => (
            <Tooltip key={title} title={title}>
              <Icon onClick={action} />
            </Tooltip>
          ))}
        </li>
      </ul>
      <ul className='publish-container'>
        <Button variant='contained' className='btn btn-publish' onClick={handlePublishClick}>
          Publish
        </Button>
      </ul>
      {isModalOpen && (
        <PublishModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onPublishWap={onPublishWap} />
      )}
    </header>
  )
}
