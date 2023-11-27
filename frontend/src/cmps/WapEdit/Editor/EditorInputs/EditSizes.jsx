import { useState } from 'react'

const inputSettings = [
  { name: 'width', type: 'number', suffix: 'px', min: 0 },
  { name: 'height', type: 'number', suffix: 'px', min: 0 },
  { name: 'opacity', type: 'number', min: 0, max: 1, step: 0.1 },
  { name: 'rotate', type: 'number', suffix: 'deg' },
]

export function EditSizes({ cmp, updateComponent }) {
  const { info } = cmp

  const [styles, setStyles] = useState({
    width: info?.computedStyle?.width || '0px',
    height: info?.computedStyle?.height || '0px',
    opacity: info?.computedStyle?.opacity || '1',
    rotate: info?.computedStyle?.rotate === 'none' ? '0' : cmp?.info?.computedStyle?.rotate || '0',
  })

  function handleInputChange(name, value) {
    setStyles({ ...styles, [name]: value })
    updateComponent('style', name, value)
  }

  return (
    <div className='edit-sizes-input-container flex direction-column' data-drag-cancel>
      {inputSettings.map(({ name, type, min, max, step, suffix }) => (
        <div key={name} className='input-section flex align-center space-between'>
          <h5>{name.charAt(0).toUpperCase() + name.slice(1)}</h5>
          <input
            id={name}
            min={min}
            max={max}
            type={type}
            name={name}
            step={step}
            className='edit-sizes-input'
            value={parseFloat(styles[name])}
            onChange={e => handleInputChange(name, e.target.value + (suffix || ''))}
          />
        </div>
      ))}
    </div>
  )
}
