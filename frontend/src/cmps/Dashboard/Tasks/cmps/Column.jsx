import { TaskCard } from './TaskCard'

import { Add } from '@mui/icons-material'
import { Droppable } from 'react-beautiful-dnd'

export function Column({ columnId, column, onDeleteTask, handleAddButtonClick }) {
  return (
    <Droppable droppableId={columnId}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps} className='task-column'>
          <span className='column-title'>{column.title}</span>
          <div className='task-cards-container'>
            {column.items.map((item, index) => (
              <TaskCard key={item.id} item={item} index={index} onDeleteTask={onDeleteTask} />
            ))}
          </div>
          {provided.placeholder}
          <div className='add-task flex align-center' onClick={() => handleAddButtonClick(column)}>
            <Add className='add-icon' /> Add a card
          </div>
        </div>
      )}
    </Droppable>
  )
}
