import { useState } from 'react'
import { useHover } from '../../../hooks/useHover'

import { InputCmpEditable } from './InputCmpEditable'
import { DynamicCmpEditable } from './DynamicCmpEditable'

export function FormCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { className, style, cmps, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  const componentMap = {
    txt: DynamicCmpEditable,
    btn: DynamicCmpEditable,
    title: DynamicCmpEditable,
    input: InputCmpEditable,
  }

  return (
    <form style={style} className={computedClassName} {...hoverHandlers} onSubmit={ev => ev.preventDefault()}>
      {cmps.map(nestedCmp => {
        const CmpToRender = componentMap[nestedCmp.type]
        return (
          <CmpToRender cmp={nestedCmp} key={nestedCmp._id} activeCmpId={activeCmpId} handleElClick={handleElClick} />
        )
      })}
    </form>
  )
}
