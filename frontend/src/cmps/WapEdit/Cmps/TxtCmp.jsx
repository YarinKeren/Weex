export function TxtCmp({ cmp }) {
  const { info, style, className } = cmp

  return (
    <p style={style} className={className}>
      {info.txt}
    </p>
  )
}
