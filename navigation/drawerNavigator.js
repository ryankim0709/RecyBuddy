import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import TextScan from '../screens/textScan'
import PhotoScan from '../screens/photoScan'
import AudioScan from '../screens/audioScan'
import GameScreen from '../screens/gameScreen'
import HomeScreen from '../screens/home'
import ScanTabs from './bottomtabNavigator'
import gameOptions from '../screens/gameOptions'
import gameStart from '../screens/gameStart'
import settings from '../screens/settings'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return(
            <Drawer.Navigator screenOptions = {{
                headerShown:true, 
                drawerActiveBackgroundColor: "#09B44D", 
                drawerActiveTintColor: "#F6F6F6", 
                drawerInactiveTintColor: "#262626",
                drawerContentContainerStyle: styles.container,
                drawerItemStyle: styles.item,
                drawerLabelStyle: styles.text
                
                }}>
                <Drawer.Screen name = "Home" component = {HomeScreen} options = {{
                    headerStyle: {
                        backgroundColor: "#09B44D"
                    }, 
                    headerTintColor: '#F6F6F6', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                        fontSize: 20
                    }}}/>
                <Drawer.Screen name = "Scan" component = {ScanTabs} options = {{
                    headerStyle: {
                        backgroundColor: "#09B44D"
                    }, 
                    headerTintColor: '#F6F6F6', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                        fontSize: 20
                    }}}/>
                <Drawer.Screen name = "Game" component = {gameStart} options = {{
                    headerStyle: {
                        backgroundColor: "#09B44D"
                    }, 
                    headerTintColor: '#F6F6F6', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                        fontSize: 20
                    }}}/>
                <Drawer.Screen name = "Settings" component = {settings} options = {{
                    headerStyle: {
                        backgroundColor: "#09B44D"
                    }, 
                    headerTintColor: '#F6F6F6', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                        fontSize: 20
                    }}}/>
            </Drawer.Navigator>


    )
}

export default DrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex:1,
        textAlign: 'center',
        fontWeight:'bold',
        backgroundColor: "#D0F1DD"
    },
    item: {
        fontWeight: 'bold',
        fontSize: 15
    },
    text: {
        fontWeight:'bold',
        fontSize: 18
    }
})