const options = [
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Oswald', label: 'Oswald' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'OpenSans', label: 'OpenSans' },
]

export function FontFamilyInput({ updateComponent }) {
  return (
    <div className='font-family-input-container flex align-center space-between' data-drag-cancel>
      <h5>Font Family</h5>
      <select
        className='font-family-input'
        onChange={({ target: { value } }) => updateComponent('style', 'fontFamily', value)}
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
