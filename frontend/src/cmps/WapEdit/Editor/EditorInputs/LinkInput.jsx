import { useState } from 'react'

export function LinkInput({ cmp, updateComponent }) {
  const [href, setHref] = useState(cmp.info?.href || '')

  return (
    <div className='link-input-container flex align-center space-between' data-drag-cancel>
      <input
        type='url'
        value={href}
        className='link-input'
        placeholder='Enter link..'
        onChange={({ target: { value } }) => setHref(value)}
      />
      <button className='link-url-input' onClick={() => updateComponent('info', 'href', href)}>
        Add
      </button>
    </div>
  )
}
