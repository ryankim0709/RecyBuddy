import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/home";
import ScanTabs from "./bottomtabNavigator";
import gameStart from "../screens/gameStart";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: true,
				drawerActiveBackgroundColor: "#09B44D",
				drawerActiveTintColor: "#F6F6F6",
				drawerInactiveTintColor: "#262626",
				drawerContentContainerStyle: styles.container,
				drawerItemStyle: styles.item,
				drawerLabelStyle: styles.text,
			}}
		>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerStyle: {
						backgroundColor: "#09B44D",
					},
					headerTintColor: "#F6F6F6",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: (Dimensions.get("window").width * 10) / 207,
					},
					drawerIcon: ({ focused, size }) => (
						<Ionicons
							name="home"
							size={size}
							color={focused ? "#F6F6F6" : "#262626"}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="Scan"
				component={ScanTabs}
				options={{
					headerStyle: {
						backgroundColor: "#09B44D",
					},
					headerTintColor: "#F6F6F6",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: (Dimensions.get("window").width * 10) / 207,
					},
					drawerIcon: ({ focused, size }) => (
						<Ionicons
							name="scan"
							size={size}
							color={focused ? "#F6F6F6" : "#262626"}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="Game"
				component={gameStart}
				options={{
					headerStyle: {
						backgroundColor: "#09B44D",
					},
					headerTintColor: "#F6F6F6",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: (Dimensions.get("window").width * 10) / 207,
					},
					drawerIcon: ({ focused, size }) => (
						<Ionicons
							name="game-controller"
							size={size}
							color={focused ? "#F6F6F6" : "#262626"}
						/>
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: "center",
		fontWeight: "bold",
		backgroundColor: "#D0F1DD",
	},
	item: {
		fontWeight: "bold",
		fontSize: (Dimensions.get("window").width * 5) / 138,
	},
	text: {
		fontWeight: "bold",
		fontSize: (Dimensions.get("window").width * 1) / 23,
	},
});
