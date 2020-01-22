import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button
} from "react-native";

export default function BikerOrDriver() {
    return(
        <View style={styles.screen}>
          <Text>Biker Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'red'
    },
});