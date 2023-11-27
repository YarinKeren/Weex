import { GithubPicker } from 'react-color'

export function BorderColorInput({ updateComponent }) {
  return (
    <div className='border-color-picker-container flex align-center space-between' data-drag-cancel>
      <h5>Border Color</h5>

      <GithubPicker
        triangle={'hide'}
        onChange={ev => updateComponent('style', 'border', `2px solid ${ev.hex}`)}
        colors={['#000000', '#008463', '#7f2275', '#674fe6', '#faad4d', '#df3131', '#9359f5', '#e0e0e0']}
      />
    </div>
  )
}
