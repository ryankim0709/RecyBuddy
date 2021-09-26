import{createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import GameScreen from '../screens/gameScreen'
import DrawerNavigator from "./drawerNavigator";
import gameOptions from '../screens/gameOptions';
import SummaryScreen from '../screens/summaryScreen';
import React from 'react'

const Stack = createStackNavigator()

export default function GameStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{headerShown:true}}>
                <Stack.Screen name = "Game Options" component = {gameOptions}/>
                <Stack.Screen name = "Game" component = {GameScreen}/>
                <Stack.Screen name = "Summary Screen" component = {SummaryScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}