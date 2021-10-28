import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	Linking,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import db from "./config";

export default class InfoCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
		};
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
						<Image
							source={require("./photos/oops.png")}
							style={{
								width: 200,
								height: 200,
								borderRadius: 10,
							}}
						/>
						<TouchableOpacity
							style={styles.text}
							onPress={() => {
								Linking.openURL(
									`mailto:pristineaiforall@gmail.com?subject=${object} New Item&body=please add ${object}`
								);
							}}
						>
							<Text style={styles.text}>
								Sorry! {object} is not in our database! Send an email to
								pristineaiforall@gmail.com
							</Text>
						</TouchableOpacity>
					</View>
				);
			} else {
				var type = facts[0];
				var title = "";
				if (type == "C") {
					title = "Compostable";
					path = require("./photos/compostBin.png");
				} else if (type == "R") {
					title = "Recyclable";
					path = require("./photos/recycleBin.png");
				} else if (type == "H") {
					title = "Hazardous";
					path = require("./photos/hazard.jpg");
				} else if (type == "E") {
					title = "E-waste";
					path = require("./photos/ewaste.png");
				} else {
					title = "Landfill";
					path = require("./photos/landfillBin.png");
				}

				return (
					<View style={styles.container}>
						<Image source={path} style={styles.symbol} />
						<Text style={styles.text}>{title}</Text>
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
		justifyContent: "center",
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
		color: "#09B44D",
		textAlign: "center",
	},
});
