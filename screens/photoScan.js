import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, Image, StyleSheet, Text, View, Linking, Alert, ScrollView } from 'react-native';
import db from '../config'
import InfoCard from '../infoCard';

const API_KEY = 'AIzaSyCI1Ekex-K9RtT5vNoTgYKvVNi8hZJfkzg';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log('callGoogleVisionAsync -> result', result);

  return result.responses[0].labelAnnotations[0].description;
}

export default function PhotoScan() {

  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const [facts, setFacts] = React.useState([])

  const [init, setInit] = React.useState(false);

  if(!init) {
    test = []
    db.ref('/').on('value', data => {
      console.log(data.val())
      for(var fact in data.val()) {
          console.log("NAME: "+fact)
          db.ref(fact+"/").on('value', data2 => {
              var useData = data2.val()

              for(var fact2 in useData) {
                  test = useData[fact2]
                }
            })
          }
        })
      setInit(true)
  }

  const classify = async () => {
    setFacts([])
    var word = status.toLocaleLowerCase()
    var facts = []
    db.ref(word+'/').on('value', data => {
      var useData = data.val()
      for(var fact in useData) {
        facts.push(useData[fact])
      }
    })
    setFacts(facts)
  }
  
  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Camera permission required",
        "Camera permissions is required for the app",
        [
          {
            text:"Settings",
            onPress: () => Linking.openURL('app-settings:'),
            style: 'cancel'
          },
          {
            text:'Cancel'
          }
        ]
      )
      return;
    } else {
      setPermissions(true);
    }
  };

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus('Loading...');
      try {
        const result = await callGoogleVisionAsync(base64);
        await setStatus(result);
        classify()
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle = {styles.container}>
      {permissions === false ? (
        <Button onPress={askPermissionsAsync} title="Ask permissions" />
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          {status && <Text style={styles.text}>{status}</Text>}
          <Button onPress={takePictureAsync} title="Take a Picture" />
          <Button onPress={classify} title="Classify" />
          <InfoCard object = {status} facts = {facts} valid = {true}/>
        </>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});
