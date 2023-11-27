import { useHover } from '../../../hooks/useHover'

export function ImgCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { imgUrl, alt } = info
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <img
      src={imgUrl}
      style={style}
      {...hoverHandlers}
      alt={alt || 'image'}
      className={computedClassName}
      onClick={ev => handleElClick(ev, cmp)}
    />
  )
}
