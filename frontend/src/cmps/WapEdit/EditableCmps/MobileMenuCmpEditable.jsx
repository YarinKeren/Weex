import { Menu, Close } from '@mui/icons-material'
import { useState } from 'react'
import { useHover } from '../../../hooks/useHover'
import { DynamicCmpEditable } from './DynamicCmpEditable'

export function MobileMenuCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { style, className, cmps, _id } = cmp
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${
    activeCmpId === _id ? 'active-cmp' : ''
  }`.trim()

  return (
    <div
      style={style}
      {...hoverHandlers}
      onClick={(ev) => handleElClick(ev, cmp)}
      className={computedClassName}>
      <button className='mobile-menu-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <Close /> : <Menu />}
      </button>
      {isMenuOpen && (
        <div className='mobile-menu-container'>
          {cmps.map((nestedCmp) => (
            <DynamicCmpEditable
              cmp={nestedCmp}
              key={nestedCmp._id}
              activeCmpId={activeCmpId}
              handleElClick={handleElClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
