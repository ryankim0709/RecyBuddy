import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Switch,
	ScrollView,
	TouchableOpacity,
	Touchable,
	Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function about() {
	return (
		<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
			<View style={styles.container}>
				<Text style={styles.whyText}>The mission: Recycle Right!</Text>
				<Text style={styles.whyText}>Why: Recycle Right!</Text>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => {
						Linking.openURL("https://github.com/ryankim0709/RecyCool.git");
					}}
				>
					<Ionicons name={"logo-github"} size={30} />
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	buttons: {
		width: 100,
		height: 100,
		marginTop: "138%",
		marginLeft: "105%",
	},
	whyText: {
		fontWeight: "bold",
		color: "#262626",
		fontSize: 25,
	},
});
