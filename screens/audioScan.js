import React, {useState, useEffect} from 'react';
import { Text, Button, View, Permission, Permissions, ScrollView } from 'react-native';
import Voice from 'react-native-voice';
import InfoCard from '../infoCard';
import {Audio} from 'expo-av'
import db from '../config'

const AudioScan = () => {
  const [isRecord, setIsRecord] = React.useState(false);
  const [text, setText] = React.useState('');
  const [facts, setFacts] = React.useState([])

  const buttonLabel = isRecord ? 'Stop' : 'Start';
  const voiceLabel = text
    ? text
    : isRecord
    ? 'Say something...'
    : 'press Start button';
  
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
    return (
        <ScrollView contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text>{voiceLabel}</Text>
          <Button onPress={_onRecordVoice} title={buttonLabel} /> 
          <Button onPress = {__classify} title = "Classify"/>
          <InfoCard object = {text} facts = {facts}/>
        </ScrollView>
      );
  
};

export default AudioScan;