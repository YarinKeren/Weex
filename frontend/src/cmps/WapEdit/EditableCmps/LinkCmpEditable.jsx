import { useHover } from '../../../hooks/useHover'

export function LinkCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  function handleClick(ev) {
    ev.preventDefault()
    handleElClick(ev, cmp)
  }

  return (
    <a
      style={style}
      target='_blank'
      href={info.href}
      {...hoverHandlers}
      onClick={handleClick}
      className={computedClassName}
    >
      {info.txt}
    </a>
  )
}
