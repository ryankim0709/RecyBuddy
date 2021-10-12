import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GameScreen from "../screens/gameScreen";
import DrawerNavigator from "./drawerNavigator";
import gameOptions from "../screens/gameOptions";
import SummaryScreen from "../screens/summaryScreen";
import React from "react";

const Stack = createStackNavigator();

export default function StackNavigator() {
	return (
		<NavigationContainer style={{ backgroundColor: "#00FF00" }}>
			<Stack.Navigator
				initialRouteName="Mode"
				screenOptions={{ headerShown: true }}
			>
				<Stack.Screen
					name="Mode"
					component={DrawerNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Options"
					component={gameOptions}
					options={{
						headerStyle: { backgroundColor: "#09B44D" },
						headerTitleStyle: { color: "#F6F6F6", fontWeight: "bold" },
						headerBackTitleStyle: { color: "#F6F6F6", fontWeight: "bold" },
					}}
				/>
				<Stack.Screen
					name="Game"
					component={GameScreen}
					options={{
						headerStyle: { backgroundColor: "#09B44D" },
						headerTitleStyle: { color: "#F6F6F6", fontWeight: "bold" },
						headerBackTitleStyle: { color: "#F6F6F6", fontWeight: "bold" },
					}}
				/>
				<Stack.Screen
					name="Summary Screen"
					component={SummaryScreen}
					options={{
						headerStyle: { backgroundColor: "#09B44D" },
						headerTitleStyle: { color: "#F6F6F6", fontWeight: "bold" },
						headerBackTitleStyle: { color: "#F6F6F6", fontWeight: "bold" },
						headerLeft: null,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
