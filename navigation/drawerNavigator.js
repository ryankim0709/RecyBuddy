import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import TextScan from '../screens/textScan'
import PhotoScan from '../screens/photoScan'
import AudioScan from '../screens/audioScan'
import GameScreen from '../screens/gameScreen'
import HomeScreen from '../screens/home'
import ScanTabs from './bottomtabNavigator'
import gameOptions from '../screens/gameOptions'
import StackNavigator from './stackNavigator'
import gameStart from '../screens/gameStart'


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator screenOptions = {{headerShown:true}}>
            <Drawer.Screen name = "Home" component = {HomeScreen}/>
            <Drawer.Screen name = "Scan" component = {ScanTabs}/>
            <Drawer.Screen name = "Game" component = {gameStart}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;