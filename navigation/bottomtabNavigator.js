import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import AudioScan from "../screens/audioScan";
import TextScan from "../screens/textScan";
import PhotoScan from "../screens/photoScan";
import React from "react";
import {Image} from 'react-native'
import { Ionicons } from "@expo/vector-icons"; 
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {View} from 'react-native'

export default class ScanTabs extends React.Component {
    render() {
        return(
            //<AppContainer/>
            <AppCont/>
        )
    }
}
const TabNavigator = createBottomTabNavigator({
    Text: {screen:TextScan},
    Photo: {screen:PhotoScan},
    Audio: {screen:AudioScan}
  },
  {
    initialRouteName:'Text'
  },
   {
     defaultNavigationOptions: ({navigation})=>({
       tabBarIcon: ()=>{
         const routeName = navigation.state.routeName;
        //console.log(routeName)
        if(routeName === "Audio"){
          return(
            <Ionicons
                name = 'mic'
                size = {30}
                />
          )
        }
        else if(routeName === "Text"){
          return(
            <Ionicons
                name = 'text'
                size = {30}
            />
          )
        }
        else {
            return(
                <Ionicons
                    name = "image"
                    size = {30}
                />
            )
        }
      },
    })
  }
);

const AppContainer = createAppContainer(TabNavigator)

const MetTab = createMaterialBottomTabNavigator(
  {
    Text: {
      screen:TextScan,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Ionicons name = {'text'} size = {25}/>
          </View>
        ),
        activeColor: "#09B44D"
      },
    },
    Photo: {
      screen: PhotoScan,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Ionicons name = {'camera'} size = {25}/>
          </View>
        ),
        activeColor: "#09B44D",
        
      }
    },
    Audio: {
      screen:AudioScan,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Ionicons name = {'mic'} size = {25}/>
          </View>
        ),
        activeColor: "#09B44D"
      }
    }
  },
  {
    barStyle: {backgroundColor: "#D0F1DD", height: "10%", },
  }
)

const AppCont = createAppContainer(MetTab)