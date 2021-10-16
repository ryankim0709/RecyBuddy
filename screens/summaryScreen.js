import React from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
} from "react-native";

export default function SummaryScreen({ navigation, route }) {
	const numItems = route.params.num;
	const mode = route.params.mode;
	const corr = route.params.correct;
	const incorr = route.params.incorrect;
	console.log(numItems + " " + incorr);

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
			<Text style={styles.infoText}>Correct: {corr}</Text>
			<Text style={styles.infoText}>Incorrect: {incorr}</Text>
			<Text style={styles.infoText}>
				Accuracy: {(corr / (corr + incorr)) * 100}%
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		//alignItems:'center',
		backgroundColor: "#D0F1DD",
	},
	playAgain: {
		backgroundColor: "#09B44D",
		width: "45%",
		height: 48,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 5,
	},
	againText: {
		fontWeight: "bold",
		textAlign: "center",
		alignSelf: "center",
		fontSize: 20,
		color: "#F6F6F6",
	},
	navOptions: {
		flexDirection: "row",
		marginTop: 10,
		alignItems: "center",
		alignSelf: "center",
	},
	infoText: {
		textAlign: "center",
		marginTop: 10,
		fontWeight: "bold",
		fontSize: 25,
		color: "#262626",
	},
});
