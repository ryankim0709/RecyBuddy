import React, {useState, useEffect} from 'react';
import { Text, Button, View, Permission, Permissions, ScrollView, ActivityIndicator } from 'react-native';
import Voice from 'react-native-voice';
import InfoCard from '../infoCard';
import {Audio} from 'expo-av'
import db from '../config'

const AudioScan = () => {
  const [isRecord, setIsRecord] = React.useState(false);
  const [text, setText] = React.useState('');
  const [facts, setFacts] = React.useState([])
  const [isReal, setIsReal] = React.useState(false)

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

  const buttonLabel = isRecord ? 'Stop' : 'Start';
  const voiceLabel = text
    ? text
    : isRecord
    ? 'Say something...'
    : 'Press start and say an object(e.x computer)';
  
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
    <ScrollView contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size = "large" style = {{marginTop:"10%"}}/>
    </ScrollView>
  }
  else {
    return (
        <ScrollView contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text>{voiceLabel}</Text>
          <Button onPress={_onRecordVoice} title={buttonLabel} /> 
          <Button onPress = {__classify} title = "Classify"/>
          <InfoCard object = {text} facts = {facts} valid = {isReal}/>
        </ScrollView>
      );
    }
};

export default AudioScan;