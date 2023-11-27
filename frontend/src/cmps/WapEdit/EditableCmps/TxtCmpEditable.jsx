import { useHover } from '../../../hooks/useHover'

export function TxtCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <p style={style} onClick={ev => handleElClick(ev, cmp)} className={computedClassName} {...hoverHandlers}>
      {info.txt}
    </p>
  )
}
