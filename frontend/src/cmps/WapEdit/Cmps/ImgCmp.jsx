export function ImgCmp({ cmp }) {
  const { info, style, className } = cmp
  const { imgUrl, alt } = info

  return <img src={imgUrl} style={style} alt={alt || 'image'} className={className} />
}
