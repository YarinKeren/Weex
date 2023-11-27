import { useState } from 'react'

export function PlaceholderInput({ cmp, updateComponent }) {
  const [editInputValue, setEditInputValue] = useState(cmp.info.placeholder)

  function handleEditInputChange({ target: { value } }) {
    setEditInputValue(value)
    updateComponent('info', 'placeholder', value)
  }

  return (
    <div className='text-input-container flex-column' data-drag-cancel>
      <div className='flex align-center space-between'>
        <h5>Placeholder</h5>
        <input
          type='text'
          id='editTextInput'
          name='editTextInput'
          value={editInputValue}
          className='text-input'
          onChange={handleEditInputChange}
        />
      </div>
    </div>
  )
}
