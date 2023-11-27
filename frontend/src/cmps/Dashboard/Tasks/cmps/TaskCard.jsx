import React from 'react'

import { Draggable } from 'react-beautiful-dnd'

import { Tooltip } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'

export function TaskCard({ item, index, onDeleteTask }) {
  const { id, task, assignedTo } = item
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className='task-card'>
            <p className='task-title'>{task}</p>
            <div className='secondary-details flex justify-center'>
              <div className='assigned-to flex align-center'>
                <p>Assigned To:</p>
                <p className='assignee-name'>{assignedTo}</p>
                <Tooltip title='Delete Task'>
                  <DeleteOutline className='delete-icon' onClick={() => onDeleteTask(id)} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
