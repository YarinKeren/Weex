import { useState } from 'react'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

export function MapCmp({ cmp }) {
  const [map, setMap] = useState(null)
  const { info, style, className } = cmp
  const { latitude, longitude } = info.location
  const center = { lat: latitude, lng: longitude }

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

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading map...</div>
  }

  return (
    <div style={style} className={className}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        zoom={15}
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
