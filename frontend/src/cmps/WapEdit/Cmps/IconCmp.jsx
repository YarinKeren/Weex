import {
  Speed,
  LinkedIn,
  Instagram,
  FacebookOutlined,
  Twitter,
  DirectionsCarOutlined,
  BatteryChargingFullOutlined,
} from '@mui/icons-material'

const iconMapping = {
  facebook: FacebookOutlined,
  instagram: Instagram,
  linkedin: LinkedIn,
  twitter: Twitter,
  speed: Speed,
  energy: BatteryChargingFullOutlined,
  car: DirectionsCarOutlined,
}

export function IconCmp({ cmp }) {
  const { info, style, className } = cmp
  const { iconName, href } = info
  const IconComponent = iconMapping[iconName]

  function handleClick(ev) {
    ev.preventDefault()
    const validUrl = ensureValidProtocol(href)
    window.open(validUrl, '_blank')
  }

  function ensureValidProtocol(url) {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    else return `https://${url}`
  }

  return <IconComponent style={style} className={className} onClick={handleClick} />
}
