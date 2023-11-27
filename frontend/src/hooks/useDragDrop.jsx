import { useCallback } from 'react'
import { addCmp, moveCmp } from '../store/actions/wap.actions'

export function useDragDrop(wap, wapId) {
  const handleOnDragEnd = useCallback(
    result => {
      if (!result.destination) return

      const { source, destination } = result
      if (source.droppableId === 'left-tools' && destination.droppableId === 'left-tools') return
      const cmps = Array.from(wap.cmps)

      if (source.droppableId === 'left-tools' && destination.droppableId === 'editor-layout') {
        // Add component to layout
        const cmpId = result.draggableId.split('-')[1]
        addCmp(wap, cmpId, destination.index)
      } else {
        // Move component within layout
        moveCmp(wap, cmps, source.index, destination.index)
      }
    },
    [wap, wapId]
  )

  return handleOnDragEnd
}
