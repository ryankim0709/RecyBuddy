import React from "react";
import { View, Text, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TextScan from "./screens/textScan";
import HomeScreen from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/drawerNavigator";
import { registerRootComponent } from "expo";
import StackNavigator from "./navigation/stackNavigator";

export default class App extends React.Component {
	render() {
		return <StackNavigator style={{ backGroundColor: "black" }} />;
	}
}
