import firebase from 'react-native-firebase';
import { SnapshotViewIOS } from 'react-native';

export function addLocation(location, success) {
  firebase.firestore().collection('Locations').add({
    lat: location.lat,
    lng: location.lng,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then((data) => addComplete(data))
  .catch((error) => console.log(error));
}

export async function getLocations(locationsRetreived){

  var locationList = [];
  var data = await firebase.firestore().collection('Locations').orderBy('createdAt').get()

  snapshot.forEach((doc) => {
    locationList.push(doc.data());
  })

  locationsRetreived(locationList)
}