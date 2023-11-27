import { useHover } from '../../../hooks/useHover'

export function InputCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { type, placeholder } = info
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <input
      type={type}
      style={style}
      {...hoverHandlers}
      className={computedClassName}
      placeholder={placeholder}
      onClick={ev => handleElClick(ev, cmp)}
      // onChange={ev => handleChange(ev, name)}
    />
  )
}
