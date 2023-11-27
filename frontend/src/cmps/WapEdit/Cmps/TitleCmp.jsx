export function TitleCmp({ cmp }) {
  const { style, className, info } = cmp

  return (
    <h1 style={style} className={className}>
      {info.txt}
    </h1>
  )
}
