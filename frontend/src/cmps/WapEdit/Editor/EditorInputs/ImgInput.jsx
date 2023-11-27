import { useState } from 'react'
import { aiService } from '../../../../services/ai.service'
import { uploadService } from '../../../../services/upload.service'

import toast from 'react-hot-toast'
import { Tooltip } from '../../../Tooltip'
import { AutoAwesomeOutlined, AutoGraphOutlined } from '@mui/icons-material'

export function ImgInput({ cmp, updateComponent }) {
  const [imgUrl, setImgUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  async function onImgInput(event) {
    try {
      toast.promise(uploadService.uploadItem(event), {
        loading: 'Uploading image...',
        success: uploadedImg => {
          updateComponent('info', 'imgUrl', uploadedImg)
          return 'Image uploaded successfully'
        },
        error: err => {
          console.error("Can't upload image: ", err)
          return "Can't upload image 😢"
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function handleGenerateImage() {
    if (!prompt) return
    setIsGenerating(true)
    const generatedImageUrl = await aiService.generateImage(prompt)
    setImgUrl(generatedImageUrl)
    updateComponent('info', 'imgUrl', generatedImageUrl)
    setPrompt('')
    setIsGenerating(false)
  }

  return (
    <div className='img-input-container flex direction-column' data-drag-cancel>
      <div className='generate-img-input flex align-center space-between'>
        <h5>AI</h5>
        <input
          type='text'
          value={prompt}
          disabled={isGenerating}
          className='img-prompt-input'
          placeholder='Use your imagination..'
          onChange={({ target: { value } }) => setPrompt(value)}
        />
        <button
          onClick={handleGenerateImage}
          disabled={isGenerating || !prompt}
          className='flex align-center justify-center btn-generate'
        >
          {isGenerating ? (
            <AutoGraphOutlined className={`btn-magic-generating ${isGenerating ? 'active' : ''}`} />
          ) : (
            <Tooltip title='Generate with AI' placement='top'>
              <AutoAwesomeOutlined className='btn-magic' />
            </Tooltip>
          )}
        </button>
      </div>
      <div className='link-input flex align-center space-between'>
        <h5>URL</h5>
        <input
          type='url'
          value={imgUrl}
          className='img-link-input'
          placeholder='Enter image link..'
          onChange={({ target: { value } }) => setImgUrl(value)}
        />
        <button className='img-url-input' onClick={() => updateComponent('info', 'imgUrl', imgUrl)}>
          Add
        </button>
      </div>

      <div className='upload-input flex direction-column align-center justify-center'>
        <img src={cmp.info?.imgUrl} alt={cmp?.className} className='img-preview' />
        <label htmlFor='img-uploader' className='img-upload-btn'>
          Upload image
        </label>
        <input type='file' id='img-uploader' hidden onChange={onImgInput} />
      </div>
    </div>
  )
}
