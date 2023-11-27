import { DynamicCmp } from './DynamicCmp'

export function ContainerCmp({ cmp }) {
  const { style, className, cmps } = cmp

  return (
    <div style={style} className={className}>
      {cmps.map(nestedCmp => (
        <DynamicCmp cmp={nestedCmp} key={nestedCmp._id} />
      ))}
    </div>
  )
}
