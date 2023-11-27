const options = [
  { value: 0, label: 'None' },
  { value: '5', label: 'Light' },
  { value: '10', label: 'Medium' },
  { value: '15', label: 'Strong' },
]

export function BoxShadowInput({ updateComponent }) {
  return (
    <div className='box-shadow-input-container flex align-center space-between' data-drag-cancel>
      <h5>Box Shadow</h5>
      <select
        className='box-shadow-input'
        onChange={({ target: { value } }) => updateComponent('style', 'boxShadow', `0px 0px ${value}px #000000`)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
