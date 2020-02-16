import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import {Button} from 'native-base';
import RNLocation from 'react-native-location';

import { addLocation, getLocations } from '../api/LocationsApi'

export default class Biker extends React.Component {
  state = {
    transmitting: false,
    lat: 37.78825, //null,
    lng: -122.4324, //null,
    speed: 0,
    heading: 0,
  }
  
  onLocationsReceived = locationList => {
    console.log(locationList)
  };

  componentDidMount() {
    getLocations(onLocationsReceived);

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
            console.log('location')
            console.log(locations)
            this.setState({
              lat: locations[0].latitude,
              lng: locations[0].longitude
            }, )//this.mergeCoords)
        })
      }
    })  
  }

  onSendLocation = () => {
    console.log('start sending location')
    addLocation({
      lat: this.state.lat,
      lng: this.state.lng,
    })
  }

  render() {
    return(
        <View style={styles.screen}>
          <Button
            full 
            style={styles.buttonText} 
            onPress={() => this.onSendLocation()}>
            <Text>Start Sending Location</Text>
          </Button> 
        </View>
    );
  }
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: "center",
    },
    buttonText: {
      marginBottom: 90,
      height: 70,
      marginHorizontal: '20%',
      justifyContent: 'center',
    }
});