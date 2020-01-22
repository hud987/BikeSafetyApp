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

export default function BikerOrDriver() {
    return(

          <MapView
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
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      //backgroundColor: 'blue'
    },
});