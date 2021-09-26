import React from 'react'
import { View, Text, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import{ createBottomTabNavigator } from 'react-navigation-tabs'
import TextScan from './screens/textScan'
import HomeScreen from './screens/home'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './navigation/drawerNavigator'
import { registerRootComponent } from 'expo';
import StackNavigator from './navigation/stackNavigator'
import Modal from './modal'

export default class App extends React.Component {
  render() {
    return(
      // <NavigationContainer>
      //   <DrawerNavigator/>
      // </NavigationContainer>
      <StackNavigator/>
      //<Modal/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Scan:{screen:TextScan},
  Home:{screen:HomeScreen}
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: () => {
      const routeName = navigation.state.routeName

      if(routeName == "Home") {
        return(
          <Image source = {require('./photos/house.jpg')} style = {{width:40, height:30}}/>
        )
      }
      else if(routeName == "TextScan") {
        return(
          <Image source = {require('./photos/recycle.png')} style = {{width:40, height:30}}/>
        )
      }
    }
  })
})

const AppContainer = createAppContainer(TabNavigator)
registerRootComponent(DrawerNavigator);