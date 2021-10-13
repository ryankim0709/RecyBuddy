import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

export default class InfoCard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var object = this.props.object;
		var facts = this.props.facts;
		var valid = this.props.valid;
		if (object == "--" || object == "" || object == null || valid === false) {
			return <View style={styles.container}></View>;
		} else {
			if (facts[0] === undefined) {
				return (
					<View style={styles.container}>
						<Text style={styles.text}>NOT FOUND</Text>
					</View>
				);
			} else {
				var type = facts[0];
				var im = facts[1];

				if (type == "compostable") {
					path = require("./photos/compostBin.png");
					message = "green bin";
				} else if (type == "recyclable") {
					path = require("./photos/recycleBin.png");
					message = "blue bin";
				}

				return (
					<View style={styles.container}>
						<Image source={path} style={styles.symbol} />
					</View>
				);
			}
		}
	}
}

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		marginTop: 10,
	},
	symbol: {
		width: 250,
		height: 250,
		alignSelf: "center",
		borderRadius: 10,
	},
	text: {
		fontWeight: "bold",
		fontSize: 25,
		color: "#262626",
	},
});
