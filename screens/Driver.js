import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNLocation from 'react-native-location';
import Geolocation from 'react-native-geolocation-service';
import Polyline from '@mapbox/polyline'

export default class BikerOrDriver extends React.Component {
  state = {
    ready: false,
    lat: null,
    lng: null,
    speed: 0,
    heading: 0,
    error: null,
    desLat: 37.885874,
    desLng: -122.506447

  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maxAge: 60*60
    }
    this.setState({ready: false, error: null})
    
    RNLocation.configure({
      distanceFilter: 0
    })
    console.log('did mount')
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
        if (granted) {
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
            console.log('locations')
            console.log('location')
            this.setState({
              lat: locations[0].latitude,
              lng: locations[0].longitude
            }, this.mergeCoords)
        })
      }
    })  
  }

  geoSuccess = (position) => {
    this.setState({
      ready: true,
      where: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        speed: position.coords.speed,
        heading: position.coords.heading}
    })
  }

  geoFailure = (err) => {
    this.setState({error: err.message})
  }

  mergeCoords = () => {
    console.log('merging coords')
    console.log('lat')
    console.log(this.state.lat)
    console.log('lng')
    console.log(this.state.lng)
    lat = this.state.lat
    lng = this.state.lng
    desLat = this.state.desLat
    desLng = this.state.desLng

    const hasStartAndEnd = lat != null && desLat != null
    if (hasStartAndEnd) {
      const concatStart = `${lat},${lng}`
      const concatEnd = `${desLat},${desLng}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    console.log('getting directions')
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyAQ6JZnM-5sMY9Za63OUKE2fNvRQy_h9CY`)
      console.log('resp')
      const respJson = await resp.json()
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points)
      const coords = points.map(point => {
        return {
          latitude : point[0],
          longitude : point[1]
        }
      })
      
      this.setState({ coords },console.log(this.state.coords))
    } catch(error) {
      console.log('error: ' + error)
    }
  }

  render() {
    return(
      <MapView
        showsUserLocation
        style={styles.screen}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Polyline 
          strokeWidth = {2}
          strokeColor = {'red'}
          coordinates = {this.state.coords}
        />
      </MapView>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //backgroundColor: 'blue'
  },
});