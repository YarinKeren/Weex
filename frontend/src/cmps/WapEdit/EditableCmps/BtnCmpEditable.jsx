import { useHover } from '../../../hooks/useHover'

export function BtnCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <button style={style} {...hoverHandlers} className={computedClassName} onClick={ev => handleElClick(ev, cmp)}>
      {info.txt}
    </button>
  )
}
