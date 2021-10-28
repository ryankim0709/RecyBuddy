import * as React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ScrollView,
	Image,
} from "react-native";

export default function HomeScreen({ navigation }) {
	return (
		<ScrollView
			style={{
				backgroundColor: "#D0F1DD",
				borderRadius: 10,
				borderColor: "black",
				flex: 1,
			}}
		>
			<View style={styles.container}>
				<View style={styles.navContainer}>
					<TouchableOpacity
						style={styles.navButton}
						onPress={() => {
							navigation.navigate("Scan");
						}}
					>
						<Text style={styles.buttonText}>Scan</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.navButton}
						onPress={() => {
							navigation.navigate("Game");
						}}
					>
						<Text style={styles.buttonText}>Play Game</Text>
					</TouchableOpacity>
				</View>
				<Image
					source={require("../photos/homeBold.png")}
					style={styles.imageIcon}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	contianer: {
		flex: 1,
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "#D0F1DD",
		marginTop: (Dimensions.get("window").height * 5) / 368,
		justifyContent: "center",
	},
	gameButton: {
		width: (Dimensions.get("window").width * 7) / 10,
		height: (Dimensions.get("window").width * 1) / 10,
		backgroundColor: "#b5e48c",
		justifyContent: "center",
		borderRadius: 10,
	},
	navButton: {
		width: (Dimensions.get("window").width * 9) / 20,
		height: (Dimensions.get("window").height * 5) / 92,
		backgroundColor: "#09B44D",
		borderRadius: 10,
		marginLeft: (Dimensions.get("window").width * 5) / 414,
		marginRight: (Dimensions.get("window").width * 5) / 414,
	},
	navContainer: {
		marginTop: (Dimensions.get("window").height * 5) / 368,
		flexDirection: "row",
		alignSelf: "center",
		textAlign: "center",
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: (Dimensions.get("window").height * 25) / 736,
		color: "#F6F6F6",
		textAlign: "center",
		marginTop: (Dimensions.get("window").height * 3) / 736,
	},
	imageIcon: {
		alignSelf: "center",
		marginTop: "20%",
		width: "100%",
	},
});
