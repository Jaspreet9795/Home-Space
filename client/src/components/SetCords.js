import React, { useEffect, useState } from 'react'
// import Geocode from 'react-geocode'
import GoogleMapReact from 'google-map-react'




export default function SetCords ({ service }) {
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const key = 'AIzaSyBPKfdOLp_oaeo4RAB7AvcWSquYBQZws6k'
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${service.user.address},+${service.user.state},+${service.user.zip}&key=${key}`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'OK') {
          console.log('Cordinates' + JSON.stringify(res))
          setLat(res.results[0].geometry.location.lat)
          setLon(res.results[0].geometry.location.lng)
        } else if (res.status === 'ZERO_RESULTS') {
          alert(
            'Unable to process this location. Please revise location fields and try submitting again.'
          )
        }
      })
  },[lat, lon])

  console.log('This is the map check 1' + JSON.stringify(service))
  console.log('check M1' + JSON.stringify(service.user.address))
  console.log('lat '+lat+' lon '+lon)
  


//   let userInfo = {
//     center: {
//       lat: lat,
//       lng: lon
//     },
//     zoom: 10
//   }

  const renderMarker = (map, maps) => {
    let marker = new maps.Marker({
      position: {lat: lat, lng: lon},
      map,
      title: 'User Location'
    })
    return marker;
  };

  return (
      <div>

        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: key }}
            center={{lat: lat, lng: lon}}
            zoom={10}
            yesIWantToUseGoogleMapApiInternals= {true}
            onGoogleApiLoaded={({ map, maps }) => {
              renderMarker(map, maps)
            }}
          >
          </GoogleMapReact>
        </div>
      </div>
    )
}
