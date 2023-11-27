
export function VideoCmp({ cmp }) {
  const { info, style, className } = cmp
  const { src, controls, autoplay, loop } = info

  return (
    <div className={className}>
      <video src={src} controls={controls} autoplay={autoplay} loop={loop} style={style}></video>
    </div>
  )
}
