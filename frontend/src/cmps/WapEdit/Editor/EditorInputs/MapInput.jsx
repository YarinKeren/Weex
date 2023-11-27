import { useState } from 'react'

import { locService } from '../../../../services/location.service'

export function MapInput({ cmp, updateComponent }) {
  const { info } = cmp
  const [geoLoc, setGeoLoc] = useState('')
  const [mapZoom, setMapZoom] = useState(parseFloat(info.zoom) || 0)
  const [lat, setLat] = useState(info.location.latitude)
  const [lng, setLng] = useState(info.location.longitude)

  function handleLatChange({ target: { value } }) {
    const newLat = parseFloat(value)
    setLat(newLat)
    updateComponent('info', 'location', { latitude: newLat, longitude: lng })
  }

  function handleLngChange({ target: { value } }) {
    const newLng = parseFloat(value)
    setLng(newLng)
    updateComponent('info', 'location', { latitude: lat, longitude: newLng })
  }

  async function onPinTo() {
    try {
      const newLoc = await locService.getLatLng(geoLoc)
      updateComponent('info', 'location', { latitude: newLoc.lat, longitude: newLoc.lng })
    } catch (err) {
      console.error('Cannot get location', err)
    }
  }

  function handleZoomChange({ target: { value } }) {
    const newZoom = parseFloat(value)
    setMapZoom(newZoom)
    updateComponent('info', 'zoom', value)
  }

  return (
    <div className='map-input-container flex direction-column gap-10'>
      <div className='link-input-container flex  align-center space-between' data-drag-cancel>
        <input
          type='text'
          value={geoLoc}
          className='link-input'
          placeholder='Pin to location..'
          onChange={({ target: { value } }) => setGeoLoc(value)}
        />
        <button className='link-url-input' onClick={onPinTo}>
          Pin Map
        </button>
      </div>
      <div className='zoom-input-container flex align-center space-between' data-drag-cancel>
        <h5>Map Zoom</h5>
        <input
          min={0}
          max={20}
          id='zoom'
          name='zoom'
          type='number'
          value={mapZoom}
          className='zoom-input'
          onChange={handleZoomChange}
        />
      </div>
      <div className='flex align-center space-between' data-drag-cancel>
        <h5>Latitude</h5>
        <input
          type='text'
          id='latitudeInput'
          name='latitudeInput'
          value={lat}
          className='text-input'
          onChange={handleLatChange}
        />
      </div>
      <div className='flex align-center space-between' data-drag-cancel>
        <h5>Longitude</h5>
        <input
          type='text'
          id='longitudeInput'
          name='longitudeInput'
          value={lng}
          className='text-input'
          onChange={handleLngChange}
        />
      </div>
    </div>
  )
}
