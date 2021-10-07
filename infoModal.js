import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import items from "./list";

export default function InfoModal(props) {
	var image = props.image;
	var thing = props.name;
	var given = props.given;
	var actual = props.actual;
	var givenImage = props.givenImage;
	var actualImage = props.actualImage;

	if (thing.charAt(thing.length - 1) !== "s") {
		thing = thing + "s";
		thing = thing.charAt(0).toUpperCase() + thing.slice(1);
	}

	if (given === actual) {
		return (
			<View style={styles.container}>
				<Image
					source={require("./photos/goodJob.jpg")}
					style={styles.goodImage}
				/>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Image
					source={image}
					style={{ resizeMode: "cover", width: "60%", height: "35%" }}
				/>
				<Image
					source={actualImage}
					style={{ width: "80%", height: "70%", marginTop: 10 }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D0F1D8",
		width: (Dimensions.get("window").width * 7) / 10,
		height: (Dimensions.get("window").height * 1) / 2,
		alignItems: "center",
		//borderWidth: 1,
		borderColor: "#09B44D",
		borderRadius: 10,
	},
	goodImage: {
		width: "100%",
		height: "70%",
		borderRadius: 10,
	},
	congratulateText: {
		marginTop: 10,
		fontWeight: "bold",
		fontSize: 25,
		color: "#09B44D",
	},
});
