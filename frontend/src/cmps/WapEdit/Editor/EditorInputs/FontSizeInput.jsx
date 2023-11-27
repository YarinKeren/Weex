import { useState } from 'react'

export function FontSizeInput({ cmp, updateComponent }) {
  const [fontSize, setFontSize] = useState(cmp?.info?.computedStyle?.fontSize || 0)

  function handleSizeChange({ target: { value } }) {
    setFontSize(value)
    updateComponent('style', 'fontSize', value + 'px')
  }

  return (
    <div className='font-size-input-container flex align-center space-between' data-drag-cancel>
      <h5>Font Size</h5>
      <input
        min={0}
        max={72}
        id='fontSize'
        type='number'
        name='fontSize'
        onChange={handleSizeChange}
        value={fontSize.split('px')[0]}
        className='font-size-input'
      />
    </div>
  )
}
