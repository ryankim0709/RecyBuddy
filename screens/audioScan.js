import React, {useState, useEffect} from 'react';
import { Text, Button, View, ScrollView, ActivityIndicator, Alert, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import{check, PERMISSIONS, RESULTS} from 'react-native-permissions'
import Voice from 'react-native-voice';
import InfoCard from '../infoCard';
import {Audio} from 'expo-av'
import db from '../config'
import { Ionicons } from '@expo/vector-icons';

const AudioScan = () => {
  const [isRecord, setIsRecord] = React.useState(false);
  const [text, setText] = React.useState('');
  const [facts, setFacts] = React.useState([])
  const [isReal, setIsReal] = React.useState(false)
  const [init, setInit] = React.useState(false);

  const [micPerms, setmicPerms] = React.useState(false)
  const [speechRec, setSpeechRec] = React.useState(false)
  
  check(PERMISSIONS.IOS.MICROPHONE)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          setmicPerms(false)
          break;
        case RESULTS.DENIED:
          setmicPerms(false)
          break;
        case RESULTS.LIMITED:
          setmicPerms(false)
          break;
        case RESULTS.GRANTED:
          setmicPerms(true)
          break;
        case RESULTS.BLOCKED:
          setmicPerms(false)
          break;
      }
    })

    check(PERMISSIONS.IOS.SPEECH_RECOGNITION)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          setSpeechRec(false)
          break;
        case RESULTS.DENIED:
          setSpeechRec(false)
          break;
        case RESULTS.LIMITED:
          setSpeechRec(false)
          break;
        case RESULTS.GRANTED:
          setSpeechRec(true)
          break;
        case RESULTS.BLOCKED:
          setSpeechRec(false)
          break;
      }
    })
  
  if(!init) {
    test = []
    db.ref('/').on('value', data => {
      for(var fact in data.val()) {
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

  const buttonLabel = isRecord ? 'Stop' : 'Speak';
  const voiceLabel = text
    ? text
    : isRecord
    ? 'Say something...'
    : '';
  
  const __classify = () => {
    var word = text.toLocaleLowerCase()
    var facts = []
    db.ref(word+'/').on('value', data => {
      var useData = data.val()
      for(var fact in useData) {
        facts.push(useData[fact])
      }
    })
    setFacts(facts)
    setIsReal(true)
  }
  const _onSpeechStart = () => {
    console.log('onSpeechStart');
    setText('');
  };
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };
  const _onSpeechResults = (event) => {
    console.log('onSpeechResults');
    setText(event.value[0]);
  };
  const _onSpeechError = (event) => {
    console.log('_onSpeechError');
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    setFacts([])
    setIsReal(false)
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }
    setIsRecord(!isRecord);
  };

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  if(!init) {
    return(
      <ScrollView contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: "#D0F1DD"}}>
        <ActivityIndicator size = "large" style = {{marginTop:"10%"}}/>
      </ScrollView>
    )
  }

  else if(!speechRec || !micPerms) {
    return(
      <View style = {{backgroundColor: "#D0F1DD"}}>
        <Button onPress={ () => {
        Alert.alert(
          "Microphone and Speech recognition permission required",
          "Microphone and Speech recognition permissions is required for the app",
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
        )}
      } title = "Enable speech recognition and microphone permissions!" /> 
      </View>
    )
  }
  else {
    return (
        <ScrollView contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: "#D0F1DD"}} style = {{backgroundColor: "#D0F1DD"}}>
          <Text style = {styles.object}>{voiceLabel}</Text>
          <TouchableOpacity onPress = {_onRecordVoice} style = {styles.actionButton}>
            <Ionicons name = {"mic"} size = {35} style = {{color: "#F6F6F6"}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {__classify} style = {styles.actionButton}>
            <Ionicons name = {"search-outline"} size = {35} style = {{color: "#F6F6F6"}}/>
          </TouchableOpacity>

          <InfoCard object = {text} facts = {facts} valid = {isReal}/>
        </ScrollView>
      );
    }
};

const styles = StyleSheet.create({
  actionButton: {
    width:"70%",
    height:40,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: "#09B44D",
    borderRadius: 10,
    flexDirection: 'row'
  },
  buttonText: {
    textAlign: 'center',
    color: "#F6F6F6",
    fontWeight: 'bold',
    fontSize: 25
  },
  object: {
    fontWeight: 'bold',
    fontSize: 30,
    color: "#262626"
  }
})

export default AudioScan;