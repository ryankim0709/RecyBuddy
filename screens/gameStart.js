import * as React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";

export default function gameStart({ navigation }) {
	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
			style={{ backgroundColor: "#D0F1DD" }}
		>
			<TouchableOpacity
				style={styles.gameButton}
				onPress={() => {
					navigation.navigate("Options", { mode: "learn" });
				}}
			>
				<Text style={styles.gameText}>Learn</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.gameButton}
				onPress={() => {
					navigation.navigate("Options", { mode: "challenge" });
				}}
			>
				<Text style={styles.gameText}>Challenge</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	contianer: {
		flex: 1,
		alignItems: "center",
		marginTop: 10,
		justifyContent: "center",
	},
	gameButton: {
		width: (Dimensions.get("window").width * 7) / 10,
		height: (Dimensions.get("window").height * 1) / 10,
		backgroundColor: "#09B44D",
		justifyContent: "center",
		borderRadius: 10,
		marginTop: 10,
	},
	gameText: {
		textAlign: "center",
		fontWeight: "bold",
		alignItems: "center",
		fontSize: 30,
		color: "#F6F6F6",
	},
});
