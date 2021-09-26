import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements'
import * as Progress from 'react-native-progress'
import db from '../config'
import items from '../list';
import itemName from '../itemName';

const GameScreen = ({navigation, route}) => {
  //how to randomize. Get input from database and push everything into an array
  const pan = useState(new Animated.ValueXY())[0];
  const images = items;
  const answers = itemName;

  var numItems = route.params.num
  var type = route.params.type


  var len = answers.length
  var index1 = 0
  var percent1 = 0
  var corr = 0;
  var incorr = 0;
  var seen = []
  var percentAdd = 1/numItems

  var sec = 0;
  var min = 0;
  var hour = 0;

  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0)
  const [time, setTime] = useState("")

  const[go, setGo] = useState(type === "challenge")
  if(go === true) {
    console.log("THIS IS A CHALLENGE")
    setInterval(incrementOne,1000)
    setGo(false)
  }

  function incrementOne() {
    console.log("INCREMENTING")
    sec ++;
    if(sec === 60) {
      console.log("HERE")
      sec = 0;
      min ++;

      if(min === 60) {
        min = 0;
        hour ++;
      }
    }

    var time = hour + ":" + min + ":" + sec;
    console.log("TIME: "+time)
    setTime(time)
  }

  function check(object) {
    var word = object
    var facts = []
    db.ref(word+'/').on('value', data => {
      var useData = data.val()
      for(var fact in useData) {
        facts.push(useData[fact])
      }
    })
    return facts[0]
  }

  function initGame() {
    index1 = 0
    percent1 = 0
    corr = 0;
    incorr = 0;
    seen = []

   setCorrect(0)
    setIncorrect(0)
    setIndex(0)
    setPercent(0)
  }

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
      },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: async () => {
        var object = answers[index1]
        var answer = check(object)
        if (pan.y._value >= 180) {
          if (pan.x._value >= 81) {
            if (answer == 'recyclable') {
              corr ++
              setCorrect(corr)
              //Alert.alert('Correct!');
            } else {
              //Alert.alert('Incorrect!');
              incorr ++;
              setIncorrect(incorr)
            }
          } else if (pan.x._value <= -81) {
            //Alert.alert('In compost');
            if (answer == 'compostable') {
              //Alert.alert('Correct!');
              corr ++
              setCorrect(corr)
            } else {
              //Alert.alert('Incorrect!');
              incorr ++;
              setIncorrect(incorr)
            }
          } else {
            //Alert.alert('In landfill');
            if (answer == 'landfill') {
              //Alert.alert('Correct!');
              corr ++
              setCorrect(corr)
            } else {
             //Alert.alert('Incorrect!');
             incorr ++;
              setIncorrect(incorr)
            }
          }
          
          index1 = Math.floor(Math.random()*100) % len
          while(seen.indexOf(index1) >= 0) {
            index1 = Math.floor(Math.random()*100) % len
          }

          seen.push(index1)
          setIndex(index1)

          percent1 = percent1+percentAdd
          setPercent(percent1)

          if(percent1 > percentAdd * (numItems - 1)) {
            navigation.navigate("Summary Screen", {num: numItems})
            initGame()
          }

          Animated.timing(pan, {
            toValue: {
              x: 2 / Dimensions.get('window').height,
              y: 2 / Dimensions.get('window').width,
            },
            duration: 500,
            useNativeDriver: false,
          }).start();
          
        } else {
          Animated.timing(pan, {
            toValue: {
              x: 2 / Dimensions.get('window').height,
              y: 2 / Dimensions.get('window').width,
            },
            duration: 1000,
            useNativeDriver: false,
          }).start();
        }
        pan.flattenOffset();
      },
    })
  )[0];

  return (
    <View style={styles.container}>
      <Progress.Bar progress={percent} width={Dimensions.get('window').width * 4/5} style = {{position:'absolute', top:50}}/>
      <Animated.Image
        source={images[index]}
        style={[
          {
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignSelf: 'center',
            transform: [
              {
                translateX: pan.x,
              },
              { translateY: pan.y },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      />

      <Text>Correct: {correct} Incorrect: {incorrect}</Text>
      <Text>TIME: {time}</Text>

      <View style={styles.binContainer}>
        <Image style={styles.bins} source={require('../photos/bins.png')} />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  binContainer: {
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  bins: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height * 1) / 4,
    opacity: 0.5,
  },
});
