import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { utilService } from '../../../services/util.service'
import { updateUser } from '../../../store/actions/user.actions'

import toast from 'react-hot-toast'
import { DragDropContext } from 'react-beautiful-dnd'

import { Column } from './cmps/Column'
import { AddTaskModal } from './cmps/AddTaskModal'

export function Tasks() {
  const user = useSelector(storeState => storeState.userModule.user)
  const [columns, setColumns] = useState(user?.dashboard?.tasks || [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeColumn, setActiveColumn] = useState(null)

  useEffect(() => {
    try {
      const updatedUser = { ...user, dashboard: { ...user.dashboard, tasks: columns } }
      updateUser(updatedUser)
    } catch (err) {
      console.error('Could not update user (tasks)', err)
    }
  }, [columns])

  function handleAddButtonClick(column) {
    setActiveColumn(column)
    setIsModalOpen(true)
  }

  function onDragEnd(result) {
    const { source, destination } = result
    if (!destination) return

    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = Array.from(sourceColumn.items)
    const [removed] = sourceItems.splice(source.index, 1)

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      })
    } else {
      const destItems = Array.from(destColumn.items)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    }
  }

  function onAddTask(ev, columnName) {
    try {
      ev.preventDefault()
      setIsModalOpen(false)
      const data = new FormData(ev.currentTarget)

      const newTask = {
        id: utilService.makeId(),
        task: data.get('taskContent'),
        dueDate: Date.now(),
        assignedTo: data.get('assignedTo'),
      }

      setColumns(prevColumns => {
        const updatedColumn = { ...prevColumns[columnName] }
        updatedColumn.items = [newTask, ...updatedColumn.items]
        return {
          ...prevColumns,
          [columnName]: updatedColumn,
        }
      })

      toast.success("Task added, Let's get to work!")
    } catch (err) {
      toast.error('Could not add task')
      console.error('Could not add task', err)
    }
  }

  function onDeleteTask(taskId) {
    try {
      setColumns(prevColumns => {
        const updatedColumns = { ...prevColumns }

        for (let colId in updatedColumns) {
          const taskIndex = updatedColumns[colId].items.findIndex(item => item.id === taskId)
          if (taskIndex !== -1) {
            updatedColumns[colId].items = [
              ...updatedColumns[colId].items.slice(0, taskIndex),
              ...updatedColumns[colId].items.slice(taskIndex + 1),
            ]
            break
          }
        }

        return updatedColumns
      })
      toast('One step closer!', { icon: '🗑️' })
    } catch (err) {
      toast.error('Could not delete task')
      console.error('Could not delete task', err)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='tasks'>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            column={column}
            columnId={columnId}
            onAddTask={onAddTask}
            isModalOpen={isModalOpen}
            onDeleteTask={onDeleteTask}
            setIsModalOpen={setIsModalOpen}
            handleAddButtonClick={handleAddButtonClick}
          />
        ))}
      </div>
      <AddTaskModal
        onAddTask={onAddTask}
        column={activeColumn}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </DragDropContext>
  )
}
