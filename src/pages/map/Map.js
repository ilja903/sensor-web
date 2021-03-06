import React, { Component } from 'react'
import _ from 'lodash'
import logo from './../../logo.svg'
import './Map.css'
import objectify from 'geoposition-to-object'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  let markers = props.markers;
  return <GoogleMap
    defaultZoom={12}
    defaultCenter={markers.length > 0 && markers[0].geo ? { lat: markers[0].geo.latitude, lng: markers[0].geo.longitude } : { lat: 0, lng: 0 }} >
    {
      markers.map(marker => {
        if (marker.geo) {
          return <Marker position={{ lat: marker.geo.latitude, lng: marker.geo.longitude }} >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
              123
            </InfoWindow>}
          </Marker>
        }
      })
    }
  </GoogleMap>
}
))


class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {}
    const self = this;

    fetch('http://localhost:3001/').then(function (response) {
      return response.json();
    }).then(function (response) {
      self.setState(() => { return { sensorData: response } })
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Browser spypage</h1>
        </header>
        <div className="App-intro">
          <div className="block-of-api">
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `75vh` }} />}
              markers={this.state.sensorData || []}
              mapElement={<div style={{ height: `100%` }} />}>
            </MyMapComponent>
          </div>
        </div>
      </div>
    )
  }
}

export default Map
