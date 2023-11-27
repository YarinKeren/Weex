import { useState } from 'react'

export function MarginInput({ cmp, updateComponent }) {
  const [margin, setMargin] = useState(cmp?.info?.computedStyle?.margin || 0)

  function handleMarginChange({ target: { value } }) {
    setMargin(value)
    updateComponent('style', 'margin', value + 'px')
  }

  return (
    <div className='margin-input-container flex align-center space-between' data-drag-cancel>
      <h5>Margin</h5>
      <input
        min={0}
        max={50}
        id='margin'
        type='number'
        name='margin'
        onChange={handleMarginChange}
        className='margin-input'
        value={margin.split('px')[0]}
      />
    </div>
  )
}
