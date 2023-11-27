import { useState } from 'react'

export function BorderRadiusInput({ cmp, updateComponent }) {
  const [borderRadius, setBorderRadius] = useState(cmp?.info?.computedStyle?.borderRadius || 0)

  function handleRadiusChange({ target: { value } }) {
    setBorderRadius(value)
    updateComponent('style', 'borderRadius', value + 'px')
  }

  return (
    <div className='border-radius-input-container flex align-center space-between' data-drag-cancel>
      <h5>Border Radius</h5>
      <input
        type='number'
        id='borderRadius'
        name='borderRadius'
        min={0}
        max={50}
        value={borderRadius.split('px')[0]}
        onChange={handleRadiusChange}
        className='border-radius-input'
      />
    </div>
  )
}
