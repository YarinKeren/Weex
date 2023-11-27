import { useState } from 'react'
import { useHover } from '../../../hooks/useHover'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

export function MapCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const [map, setMap] = useState(null)
  const { info, style, className, _id } = cmp
  const { markers, zoom } = info
  const { latitude, longitude } = info.location
  const { hoverHandlers, isHovered } = useHover()
  const center = { lat: latitude, lng: longitude }
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCBoB8p0a3vxQDnLLTTr4adJxGdF-PXRP8',
  })

  function onLoad(mapInstance) {
    mapInstance.panTo(center)
    setMap(mapInstance)
  }

  function onUnmount() {
    setMap(null)
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading map...</div>

  return (
    <div style={style} className={computedClassName} {...hoverHandlers} onClick={ev => handleElClick(ev, cmp)}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        zoom={parseFloat(zoom) || 15}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        className={className}
      >
        {map && <Marker position={{ lat: latitude, lng: longitude }} map={map} title={info.name} />}
      </GoogleMap>
    </div>
  )
}
