import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useDragDrop } from '../hooks/useDragDrop'
import { loadWap, removeWap, updateWap } from '../store/actions/wap.actions'

import toast from 'react-hot-toast'
import { DragDropContext } from 'react-beautiful-dnd'

import { Loader } from '../cmps/Loader'
import { TopTools } from '../cmps/WapEdit/UI/TopTools'
import { LeftSidebar } from '../cmps/WapEdit/UI/LeftSidebar'
import { EditSection } from '../cmps/WapEdit/UI/EditSection'
import { SecondaryHeader } from '../cmps/SecondaryHeader'

export function WapEdit() {
  const { wapId } = useParams()
  const navigate = useNavigate()
  const editorLayoutRef = useRef(null)
  const { state: locationState } = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [isLeftToolsOpen, setIsLeftToolsOpen] = useState(false)
  const [draggedItemWidth, setDraggedItemWidth] = useState(null)
  const [prevModuleOpened, setPrevModuleOpened] = useState(null)
  const [isModuleToolsOpen, setIsModuleToolsOpen] = useState(false)
  const [activeDeviceType, setActiveDeviceType] = useState(locationState?.deviceType || 'monitor')
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const handleOnDragEnd = useDragDrop(wap, wapId)

  useEffect(() => {
    async function fetchWap() {
      await loadWap(wapId)
      setIsLoading(false)
    }
    if (wapId) {
      fetchWap()
    }
  }, [wapId])

  async function onDeleteWap() {
    try {
      await removeWap(wapId)
      navigate('/wap')
    } catch (error) {
      console.error('Failed to delete WAP:', error)
      toast.error('Failed to delete WAP')
    }
  }

  function toggleLeftTools() {
    setIsLeftToolsOpen(!isLeftToolsOpen)
    if (isModuleToolsOpen) setIsModuleToolsOpen(false)
  }

  function onThemeSelect(selectedTheme) {
    const theme = selectedTheme
    const updatedWap = { ...wap, theme }
    updateWap(updatedWap)
  }

  function handleDraggedItemWidth(width) {
    setDraggedItemWidth(width)
  }

  if (isLoading) return <Loader />

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <SecondaryHeader />
      <TopTools
        wapId={wapId}
        onDeleteWap={onDeleteWap}
        toggleLeftTools={toggleLeftTools}
        isLeftToolsOpen={isLeftToolsOpen}
        activeDeviceType={activeDeviceType}
        setActiveDeviceType={setActiveDeviceType}
        setPrevModuleOpened={setPrevModuleOpened}
      />

      <div className='editor'>
        <div className='editor-area-layout'>
          <LeftSidebar
            onThemeSelect={onThemeSelect}
            toggleLeftTools={toggleLeftTools}
            isLeftToolsOpen={isLeftToolsOpen}
            draggedItemWidth={draggedItemWidth}
            prevModuleOpened={prevModuleOpened}
            isModuleToolsOpen={isModuleToolsOpen}
            setIsLeftToolsOpen={setIsLeftToolsOpen}
            setPrevModuleOpened={setPrevModuleOpened}
            setIsModuleToolsOpen={setIsModuleToolsOpen}
          />

          <EditSection
            wap={wap}
            editorLayoutRef={editorLayoutRef}
            activeDeviceType={activeDeviceType}
            handleDraggedItemWidth={handleDraggedItemWidth}
          />
        </div>
      </div>
    </DragDropContext>
  )
}
