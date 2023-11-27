import { useHover } from '../../../hooks/useHover'

export function TitleCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <h1 style={style} onClick={ev => handleElClick(ev, cmp)} className={computedClassName} {...hoverHandlers}>
      {info.txt || info.h1}
    </h1>
  )
}
