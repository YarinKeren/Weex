export function BtnCmp({ cmp }) {
  const { style, className, info } = cmp

  return (
    <button href={info.href} className={className} style={style}>
      {info.txt}
    </button>
  )
}
