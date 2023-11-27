import { Menu, Close } from '@mui/icons-material'
import { useState } from 'react'
import { DynamicCmp } from './DynamicCmp'

export function MobileMenuCmp({ cmp }) {
  const { style, className, cmps } = cmp
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div style={style} className={className}>
      <button className='mobile-menu-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <Close /> : <Menu />}
      </button>
      {isMenuOpen && (
        <div className='mobile-menu-container'>
          {cmps.map((nestedCmp) => (
            <DynamicCmp cmp={nestedCmp} key={nestedCmp._id} />
          ))}
        </div>
      )}
    </div>
  )
}
