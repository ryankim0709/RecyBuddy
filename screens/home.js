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
		<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
			<View style={styles.container}>
				<Image
					source={require("../photos/homeLight.png")}
					style={{ alignSelf: "center", marginTop: "20%" }}
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
		marginTop: 10,
		justifyContent: "center",
	},
	gameButton: {
		width: (Dimensions.get("window").width * 7) / 10,
		height: (Dimensions.get("window").height * 1) / 10,
		backgroundColor: "#b5e48c",
		justifyContent: "center",
		borderRadius: 10,
	},
	gameText: {
		textAlign: "center",
		fontWeight: "bold",
		alignItems: "center",
		fontSize: 30,
	},
});
