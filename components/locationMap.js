import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function LocationMap({lat, lng}) {
  const containerStyle = {
	width: '400px',
	height: '400px'
	};
	
	const center = {
	lat: lat,
	lng: lng
	};

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
		<Marker position={{lat: lat, lng: lng}} />
		</>
      </GoogleMap>
  ) : <></>
}

export default React.memo(LocationMap)