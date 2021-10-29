import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import AudioScan from "../screens/audioScan";
import TextScan from "../screens/textScan";
import PhotoScan from "../screens/photoScan";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { View, Dimensions } from "react-native";

export default class ScanTabs extends React.Component {
	render() {
		return <AppCont />;
	}
}
const TabNavigator = createBottomTabNavigator(
	{
		Text: { screen: TextScan },
		Photo: { screen: PhotoScan },
		Audio: { screen: AudioScan },
	},
	{
		initialRouteName: "Text",
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: () => {
				const routeName = navigation.state.routeName;
				if (routeName === "Audio") {
					return (
						<Ionicons
							name="mic"
							size={(Dimensions.get("window").width * 5) / 69}
						/>
					);
				} else if (routeName === "Text") {
					return (
						<Ionicons
							name="text"
							size={(Dimensions.get("window").width * 5) / 69}
						/>
					);
				} else {
					return (
						<Ionicons
							name="image"
							size={(Dimensions.get("window").width * 5) / 69}
						/>
					);
				}
			},
		}),
	}
);

const MetTab = createMaterialBottomTabNavigator(
	{
		Text: {
			screen: TextScan,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Ionicons
							name={"text"}
							size={(Dimensions.get("window").width * 25) / 414}
						/>
					</View>
				),
				activeColor: "#09B44D",
				size: 20,
			},
		},
		Photo: {
			screen: PhotoScan,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Ionicons
							name={"camera"}
							size={(Dimensions.get("window").width * 25) / 414}
						/>
					</View>
				),
				activeColor: "#09B44D",
			},
		},
		Audio: {
			screen: AudioScan,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Ionicons
							name={"mic"}
							size={(Dimensions.get("window").width * 25) / 414}
						/>
					</View>
				),
				activeColor: "#09B44D",
			},
		},
	},
	{
		barStyle: { backgroundColor: "#D0F1DD", height: "10%" },
	},
	{
		BottomTabnavigatorConfig: {
			style: { fontSize: (Dimensions.get("window").width * 10) / 207 },
		},
	}
);

const AppCont = createAppContainer(MetTab);
