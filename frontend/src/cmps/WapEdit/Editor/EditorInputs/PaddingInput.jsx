import { useState } from 'react'

export function PaddingInput({ cmp, updateComponent }) {
  const [padding, setPadding] = useState(cmp?.info?.computedStyle?.padding || 0)

  function handlePaddingChange({ target: { value } }) {
    setPadding(value)
    updateComponent('style', 'padding', value + 'px')
  }

  return (
    <div className='padding-input-container flex align-center space-between' data-drag-cancel>
      <h5>Padding</h5>
      <input
        min={0}
        max={50}
        id='padding'
        type='number'
        name='padding'
        className='padding-input'
        onChange={handlePaddingChange}
        value={padding.split('px')[0]}
      />
    </div>
  )
}
