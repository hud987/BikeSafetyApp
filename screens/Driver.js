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

export default class BikerOrDriver extends React.Component {
  state = {
    ready: false,
    where: {
      lat: null,
      lng: null,
      speed: 0,
      heading: 0,
    },
    error: null,
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maxAge: 60*60
    }
    this.setState({ready: false, error: null})

    RNLocation.configure({
      distanceFilter: 5.0
    })

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
        if (granted) {
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {})
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
      />
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //backgroundColor: 'blue'
  },
});