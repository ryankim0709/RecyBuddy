import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import db from "./config";

export default class InfoCard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var object = this.props.object;
		var facts = this.props.facts;
		var valid = this.props.valid;
		if (object == "--" || object == "" || object == null || valid === false) {
			db.ref("Reports").remove();
			return <View style={styles.container}></View>;
		} else {
			if (facts[0] === undefined) {
				return (
					<View style={styles.container}>
						<Image
							source={require("./photos/oops.png")}
							style={{
								width: 200,
								height: 200,
								borderRadius: 10,
							}}
						/>
						<Text style={styles.text}>
							Sorry! {object} is not in our database! The creater has been
							notified and will review "{object}"
						</Text>
					</View>
				);
			} else {
				var type = facts[0];

				if (type == "C") {
					path = require("./photos/compostBin.png");
				} else if (type == "R") {
					path = require("./photos/recycleBin.png");
				} else if (type == "H") {
					path = require("./photos/hazard.jpg");
				} else {
					path = require("./photos/landfillBin.png");
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
		alignItems: "center",
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
		textAlign: "center",
	},
});
