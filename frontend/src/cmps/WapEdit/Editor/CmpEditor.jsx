import { useSelector } from 'react-redux'
import { useState, useCallback } from 'react'
import { deleteCmp, updateCmp } from '../../../store/actions/cmp-editor.actions'

import { debounce } from 'lodash'
import Draggable from 'react-draggable'

import { Tooltip } from '@mui/material'
import { DynamicInputs } from './DynamicInputs'
import { Close, DeleteOutlineOutlined, Remove, Add } from '@mui/icons-material'

export function CmpEditor({ wap, isCmpEditorOpen, setIsCmpEditorOpen, position, setActiveCmpId, editorLayoutRef }) {
  const tabs = ['General', 'Appearance', 'Layout']
  const [currTab, setCurrTab] = useState('General')
  const currCmp = useSelector(storeState => storeState.cmpEditorModule.cmp)
  const [isMinimized, setIsMinimized] = useState(false)
  const MinMaxBtn = isMinimized ? Add : Remove

  const debouncedUpdateComponent = useCallback(
    debounce(async (partToUpdate, property, value) => {
      try {
        let updatedPart = { ...currCmp[partToUpdate], [property]: value }
        await updateCmp(wap, { ...currCmp, [partToUpdate]: updatedPart }, editorLayoutRef)
      } catch (err) {
        console.error(`Failed to update ${property} in cmp:`, err)
      }
    }, 200),
    [currCmp, wap]
  )

  function onDeleteCmp() {
    deleteCmp(wap, currCmp)
    setIsCmpEditorOpen(false)
  }

  function onCloseEditor() {
    setActiveCmpId(null)
    setCurrTab('General')
    setIsCmpEditorOpen(false)
  }

  if (!isCmpEditorOpen) return null

  return (
    <Draggable cancel='[data-drag-cancel]'>
      <div className='cmp-editor' style={{ left: `${position.x}px`, top: `${position.y - 120}px` }}>
        <div className='cmp-editor-header flex align-center justify-center'>
          <div className='header-left-side flex align-center gap-10'>
            <h3>{currCmp?.type.toUpperCase()}</h3>
            <Tooltip title={`Delete ${currCmp?.type}`} placement='top'>
              <DeleteOutlineOutlined className='delete-btn c-pointer' onClick={onDeleteCmp} />
            </Tooltip>
          </div>
          <div className='header-right-side flext align-center gap-10'>
            <MinMaxBtn className='min-max-btn' onClick={() => setIsMinimized(!isMinimized)} />
            <Close onClick={onCloseEditor} className='close-btn' data-drag-cancel />
          </div>
        </div>
        {!isMinimized && (
          <>
            <ul className='tabs'>
              {tabs.map(tab => (
                <li key={tab} className={`tab ${currTab === tab ? 'active' : ''}`} onClick={() => setCurrTab(tab)}>
                  {tab}
                </li>
              ))}
            </ul>
            <div className='cmp-editor-content'>
              <DynamicInputs
                cmp={currCmp}
                key={currCmp._id}
                currTab={currTab}
                updateComponent={debouncedUpdateComponent}
              />
            </div>
          </>
        )}
      </div>
    </Draggable>
  )
}
