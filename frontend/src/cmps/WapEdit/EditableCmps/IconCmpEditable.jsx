import { useHover } from '../../../hooks/useHover'

import {
  Speed,
  LinkedIn,
  Instagram,
  Twitter,
  FacebookOutlined,
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

export function IconCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { iconName } = info
  const { hoverHandlers, isHovered } = useHover()
  const IconComponent = iconMapping[iconName]
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  return (
    <IconComponent
      style={style}
      {...hoverHandlers}
      className={computedClassName}
      onClick={ev => handleElClick(ev, cmp)}
    />
  )
}
