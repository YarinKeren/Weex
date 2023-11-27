import { useState } from 'react'

import {
  Speed,
  LinkedIn,
  Instagram,
  FacebookOutlined,
  DirectionsCarOutlined,
  BatteryChargingFullOutlined,
  Twitter,
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

export function IconInput({ cmp, updateComponent }) {
  const [href, setHref] = useState(cmp.info?.href || '')
  return (
    <div className='flex direction-column gap-10'>
      <div className='link-input-container flex align-center space-between' data-drag-cancel>
        <input
          type='url'
          value={href}
          className='link-input'
          placeholder='Enter link..'
          onChange={({ target: { value } }) => setHref(value)}
        />
        <button className='icon-url-input' onClick={() => updateComponent('info', 'href', href)}>
          Add
        </button>
      </div>
      <div className='icon-input-container flex align-center space-between' data-drag-cancel>
        <h5>Icon</h5>
        <div className='icon-input flex align-center space-between'>
          {Object.keys(iconMapping).map(iconName => {
            const IconComponent = iconMapping[iconName]
            return (
              <div key={iconName} className='icon' onClick={() => updateComponent('info', 'iconName', iconName)}>
                <IconComponent />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
