export function LinkCmp({ cmp }) {
  const { className, style, info } = cmp

  return (
    <a href={info.href} target='_blank' style={style} className={className}>
      {info.txt}
    </a>
  )
}
