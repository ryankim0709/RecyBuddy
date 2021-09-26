import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import AudioScan from "../screens/audioScan";
import TextScan from "../screens/textScan";
import PhotoScan from "../screens/photoScan";
import React from "react";
import {Image} from 'react-native'
import { Ionicons } from "@expo/vector-icons"; 

export default class ScanTabs extends React.Component {
    render() {
        return(
            <AppContainer/>
        )
    }
}
const TabNavigator = createBottomTabNavigator({
    Audio: {screen:AudioScan},
    Text: {screen:TextScan},
    Photo: {screen:PhotoScan}
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
      }
    })
  }
  );

const AppContainer = createAppContainer(TabNavigator)