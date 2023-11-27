export function InputCmp({ cmp, handleChange }) {
  const { className, style, info } = cmp
  const { type, placeholder, name } = info

  return (
    <input
      type={type}
      style={style}
      className={className}
      placeholder={placeholder}
      onChange={ev => handleChange(ev, name)}
    />
  )
}
