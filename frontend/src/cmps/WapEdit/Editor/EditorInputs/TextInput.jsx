import { useState } from 'react'
import { aiService } from '../../../../services/ai.service'

import { Tooltip } from '../../../Tooltip'
import { AutoAwesomeOutlined, AutoGraphOutlined } from '@mui/icons-material'

export function TextInput({ cmp, updateComponent }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [promptInputValue, setPromptInputValue] = useState('')
  const [editInputValue, setEditInputValue] = useState(cmp.info.txt)

  function handleEditInputChange({ target: { value } }) {
    setEditInputValue(value)
    updateComponent('info', 'txt', value)
  }

  function handlePromptInputChange({ target: { value } }) {
    setPromptInputValue(value)
  }

  async function handleGenerateText() {
    if (!promptInputValue) return
    setIsGenerating(true)
    const generatedText = await aiService.generateText(promptInputValue)
    setEditInputValue(generatedText)
    updateComponent('info', 'txt', generatedText)
    setPromptInputValue('')
    setIsGenerating(false)
  }

  return (
    <div className='text-input-container flex-column' data-drag-cancel>
      <div className='generate-text-input flex align-center space-between'>
        <h5>AI</h5>
        <input
          type='text'
          id='promptInput'
          name='promptInput'
          value={promptInputValue}
          className='text-input-generate'
          onChange={handlePromptInputChange}
          disabled={isGenerating}
          placeholder='Enter your prompt..'
        />
        <button onClick={handleGenerateText} disabled={isGenerating || !promptInputValue} className='btn-generate'>
          {isGenerating ? (
            <AutoGraphOutlined className={`btn-magic-generating ${isGenerating ? 'active' : ''}`} />
          ) : (
            <Tooltip title='Generate with AI' placement='top'>
              <AutoAwesomeOutlined className='btn-magic' />
            </Tooltip>
          )}
        </button>
      </div>
      <div className='flex align-center space-between'>
        <h5>Text</h5>
        <input
          type='text'
          id='editTextInput'
          name='editTextInput'
          value={editInputValue}
          className='text-input'
          onChange={handleEditInputChange}
          disabled={isGenerating}
        />
      </div>
    </div>
  )
}
