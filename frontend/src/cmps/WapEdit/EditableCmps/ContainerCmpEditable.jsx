import { useHover } from '../../../hooks/useHover'
import { DynamicCmpEditable } from './DynamicCmpEditable'

export function ContainerCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { style, className, cmps, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <div style={style} {...hoverHandlers} onClick={ev => handleElClick(ev, cmp)} className={computedClassName}>
      {cmps.map(nestedCmp => (
        <DynamicCmpEditable
          cmp={nestedCmp}
          key={nestedCmp._id}
          activeCmpId={activeCmpId}
          handleElClick={handleElClick}
        />
      ))}
    </div>
  )
}
