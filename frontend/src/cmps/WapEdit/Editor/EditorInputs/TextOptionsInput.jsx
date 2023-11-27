import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatAlignLeftOutlined,
  FormatUnderlinedOutlined,
  FormatAlignRightOutlined,
  FormatAlignCenterOutlined,
} from '@mui/icons-material'

export function TextOptionsInput({ cmp, updateComponent }) {
  const { style } = cmp

  function toggleStyle(attribute, value1, value2) {
    updateComponent('style', attribute, style[attribute] === value1 ? value2 : value1)
  }

  return (
    <div className='text-options-input-container flex align-center space-around'>
      <div className='text-format-inputs flex align-center space-between' data-drag-cancel>
        <FormatBoldOutlined onClick={() => toggleStyle('fontWeight', 'bolder', 'normal')} className='icon' />
        <FormatItalicOutlined onClick={() => toggleStyle('fontStyle', 'italic', 'normal')} className='icon' />
        <FormatUnderlinedOutlined onClick={() => toggleStyle('textDecoration', 'underline', 'none')} className='icon' />
      </div>
      <div className='text-alignment-inputs flex align-center space-between' data-drag-cancel>
        <FormatAlignLeftOutlined onClick={() => toggleStyle('textAlign', 'start', 'end')} className='icon' />
        <FormatAlignCenterOutlined onClick={() => toggleStyle('textAlign', 'center', 'start')} className='icon' />
        <FormatAlignRightOutlined onClick={() => toggleStyle('textAlign', 'end', 'start')} className='icon' />
      </div>
    </div>
  )
}
