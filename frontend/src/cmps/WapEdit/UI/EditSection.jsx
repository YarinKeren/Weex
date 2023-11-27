import { useEffect, useState } from 'react'
import { setCmp } from '../../../store/actions/cmp-editor.actions'

import { CmpEditor } from '../Editor/CmpEditor'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DynamicCmpEditable } from '../EditableCmps/DynamicCmpEditable'

export function EditSection({ wap, activeDeviceType, handleDraggedItemWidth, editorLayoutRef }) {
  const [activeCmpId, setActiveCmpId] = useState(null)
  const [isCmpEditorOpen, setIsCmpEditorOpen] = useState(false)
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const editorLayoutElement = editorLayoutRef.current
    if (editorLayoutElement) {
      const resizeObserver = new ResizeObserver(() => {
        handleDraggedItemWidth(editorLayoutElement.offsetWidth)
      })
      resizeObserver.observe(editorLayoutElement)
      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  function getEditorLayoutClassName() {
    const classNames = {
      monitor: 'pc-edit-layout',
      tablet: 'tablet-edit-layout',
      phone: 'mobile-edit-layout',
    }
    return classNames[activeDeviceType] || 'pc-edit-layout'
  }

  function handleElClick(ev, cmp) {
    ev.stopPropagation()
    const offset = 10
    let positionX, positionY
    const clickedEl = ev.currentTarget
    const modalSize = { width: 300, height: 300 }
    const { scrollX, scrollY, innerWidth, innerHeight } = window
    const { left, top, width, height } = clickedEl.getBoundingClientRect()

    if (cmp.type === 'container' || cmp.type === 'video') {
      positionX = left + width / 2 - modalSize.width / 2 + scrollX
      positionY = top + height / 2 - modalSize.height / 2 + scrollY + 150
      positionX = Math.max(offset, Math.min(positionX, innerWidth - modalSize.width - offset)) + scrollX
      positionY = Math.max(offset, Math.min(positionY, innerHeight - modalSize.height - offset)) + scrollY
    } else {
      positionX = left + width + offset + scrollX
      positionY = top + offset + scrollY
      if (positionX + modalSize.width > innerWidth) positionX = left - modalSize.width - offset + scrollX
      positionY = Math.max(offset + scrollY, positionY)
      if (positionY + modalSize.height > innerHeight) positionY = innerHeight - modalSize.height - offset + scrollY
    }

    setActiveCmpId(cmp._id)
    setCmp({ ...cmp, info: { ...cmp.info, computedStyle: window.getComputedStyle(clickedEl) } })
    setEditorPosition({ x: positionX, y: positionY })
    setIsCmpEditorOpen(true)
  }

  return (
    <Droppable droppableId='editor-layout'>
      {provided => (
        <main className='wap-editor'>
          <CmpEditor
            wap={wap}
            position={editorPosition}
            setActiveCmpId={setActiveCmpId}
            editorLayoutRef={editorLayoutRef}
            isCmpEditorOpen={isCmpEditorOpen}
            setEditorPosition={setEditorPosition}
            setIsCmpEditorOpen={setIsCmpEditorOpen}
          />
          <section
            className={`editor-layout ${getEditorLayoutClassName() ? getEditorLayoutClassName() : 'pc-edit-layout'}`}
            {...provided.droppableProps}
            ref={el => {
              editorLayoutRef.current = el
              provided.innerRef(el)
            }}
          >
            {wap.cmps?.map((cmp, index) => {
              return (
                <Draggable key={cmp._id} draggableId={cmp._id} index={index}>
                  {provided => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={wap.theme || cmp.theme}
                    >
                      <DynamicCmpEditable
                        cmp={cmp}
                        activeCmpId={activeCmpId}
                        handleElClick={handleElClick}
                        setActiveCmpId={setActiveCmpId}
                        setEditorPosition={setEditorPosition}
                        setIsCmpEditorOpen={setIsCmpEditorOpen}
                      />
                    </li>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </section>
        </main>
      )}
    </Droppable>
  )
}
