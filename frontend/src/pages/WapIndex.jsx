import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { updateUser } from '../store/actions/user.actions.js'
import { loadWaps, addWap, getEmptyWap } from '../store/actions/wap.actions.js'

import toast from 'react-hot-toast'
import { Loader } from '../cmps/Loader.jsx'
import { WapList } from '../cmps/WapList.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { CreateWapModal } from '../cmps/Modals/CreateWapModal.jsx'

export function WapIndex() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const waps = useSelector(storeState => storeState.wapModule.present.waps)
  const user = useSelector(storeState => storeState.userModule.user)

  useEffect(() => {
    async function fetchWaps() {
      await loadWaps()
      setIsLoading(false)
    }
    fetchWaps()
  }, [])

  function onCreateWap() {
    setIsModalOpen(true)
  }

  async function handleCreateWap(ev) {
    ev.preventDefault()
    setIsModalOpen(false)
    const data = new FormData(ev.currentTarget)
    try {
      const wap = getEmptyWap()
      wap.owner = user
      wap.name = data.get('wapName')
      wap.description = data.get('wapDescription')
      const savedWap = await addWap(wap)

      if (user) {
        user.dashboard.wapsStats.inProgress.push(savedWap)
        updateUser(user)
      }

      navigate(`/edit/${savedWap._id}`)
      toast("Let's get to work", { icon: '💻' })
    } catch (err) {
      toast.error('Cannot add WAP')
      console.error('Cannot add WAP', err)
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className='wap-index'>
      <AppHeader />
      <h3 className='wap-index-header'>Seamless Design. Ready-to-Use Templates.</h3>
      <WapList waps={waps} onCreateWap={onCreateWap} />
      {isModalOpen && (
        <CreateWapModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleCreateWap={handleCreateWap} />
      )}
    </div>
  )
}
