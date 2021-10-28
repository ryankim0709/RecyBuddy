import React from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";

export default function SummaryScreen({ navigation, route }) {
	const numItems = route.params.num;
	const mode = route.params.mode;
	const corr = route.params.correct;
	const incorr = route.params.incorrect;

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			style={{ backgroundColor: "#D0F1DD" }}
		>
			<View style={styles.navOptions}>
				<TouchableOpacity
					style={styles.playAgain}
					onPress={() => {
						navigation.navigate("Game", { num: numItems, mode: mode });
					}}
				>
					<Text style={styles.againText}>Play Again</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.playAgain}
					onPress={() => {
						navigation.navigate("Mode");
					}}
				>
					<Text style={styles.againText}>Go Home</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{ justifyContent: "center", alignItems: "center", flex: 0.8 }}
			>
				<Text style={styles.infoText}>Correct: {corr}</Text>
				<Text style={styles.infoText}>Incorrect: {incorr}</Text>
				<Text style={styles.infoText}>
					Accuracy: {(corr / (corr + incorr)) * 100}%
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		backgroundColor: "#D0F1DD",
	},
	playAgain: {
		backgroundColor: "#09B44D",
		width: "45%",
		height: (Dimensions.get("window").height * 3) / 46,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: (Dimensions.get("window").width * 5) / 414,
	},
	againText: {
		fontWeight: "bold",
		textAlign: "center",
		alignSelf: "center",
		fontSize: (Dimensions.get("window").width * 10) / 207,
		color: "#F6F6F6",
	},
	navOptions: {
		flexDirection: "row",
		marginTop: (Dimensions.get("window").height * 5) / 368,
		alignItems: "center",
		alignSelf: "center",
	},
	infoText: {
		textAlign: "center",
		marginTop: (Dimensions.get("window").width * 5) / 368,
		fontWeight: "bold",
		fontSize: (Dimensions.get("window").width * 25) / 414,
		color: "#09B44D",
	},
});
