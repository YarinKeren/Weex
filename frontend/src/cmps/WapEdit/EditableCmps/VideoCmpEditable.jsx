import { useHover } from '../../../hooks/useHover'

export function VideoCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  function handleClick(ev) {
    ev.preventDefault()
    handleElClick(ev, cmp)
  }

  return (
    <div style={style} {...hoverHandlers} onClick={handleClick} className={computedClassName}>
      <video height={'100%'} src={info.src} controls={info.controls} autoPlay={info.autoplay} loop={info.loop}></video>
    </div>
  )
}
