import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Alert,
	Platform,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config.js";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import InfoCard from "../infoCard.js";

export default class TextScan extends React.Component {
	constructor() {
		super();
		this.state = {
			object: "",
			facts: [],
			cardObject: "--",
			cardFacts: [],
			clear: false,
			initialized: false,
		};
	}

	componentDidMount = () => {
		var test;
		db.ref("/").on("value", (data) => {
			for (var fact in data.val()) {
				db.ref(fact + "/").on("value", (data2) => {
					var useData = data2.val();
					for (var fact2 in useData) {
						test = useData[fact2];
					}
				});
			}
		});
		this.setState({ initialized: true });
	};
	classifyObject = () => {
		var word = this.state.object.toLocaleLowerCase();
		db.ref(word + "/").on("value", (data) => {
			var useData = data.val();
			for (var fact in useData) {
				this.state.facts.push(useData[fact]);
			}
		});
		this.update();
	};

	update = async () => {
		var object = this.state.object;
		var fact = this.state.facts;
		this.setState({ cardObject: object, cardFacts: fact });
		this.setState({ object: "--", facts: [], clear: true });
	};

	classifyObject1 = () => {
		var word = this.state.object.toLocaleLowerCase();
		db.ref(word + "/").on("value", (data) => {
			var useData = data.val();
			for (var fact in useData) {
				this.state.facts.push(useData[fact]);
			}
		});
		this.update1();
	};

	update1 = async () => {
		var object = this.state.object;
		var fact = this.state.facts;
		this.setState({ cardObject: object, cardFacts: fact });
		this.setState({ object: "", facts: [] });
	};
	render() {
		if (!this.state.initialized) {
			return (
				<ScrollView
					style={{ backgroundColor: "#D0F1DD" }}
					contentContainerStyle={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator
						size="large"
						style={{ marginTop: "10%" }}
						color="#09B44D"
					/>
				</ScrollView>
			);
		} else {
			return (
				<ScrollView
					contentContainerStyle={styles.container}
					style={{ backgroundColor: "#D0F1DD" }}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={{ flex: 1 }}
					>
						{/*We Make our header*/}

						{/*We make our text input box*/}
						<TouchableWithoutFeedback
							onPress={Keyboard.dismiss}
							accessible={false}
						>
							<View
								style={{
									flexDirection: "row",
									alignContent: "center",
									justifyContent: "center",
								}}
							>
								<TextInput
									multiline={true}
									style={styles.scanBox}
									placeholder="Type Here"
									onChangeText={(text) => {
										if (this.state.clear) {
											text = "";
											this.setState({ clear: false });
										}
										this.setState({ object: text });
									}}
									onSubmitEditing={this.classifyObject}
									value={this.state.object}
								/>
								<TouchableOpacity onPress={this.classifyObject1}>
									<Ionicons
										name={"search"}
										size={50}
										style={{ marginTop: 100, color: "#09B44D" }}
									/>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>

						<InfoCard
							object={this.state.cardObject}
							facts={this.state.cardFacts}
							valid={true}
						/>
					</KeyboardAvoidingView>
				</ScrollView>
			);
		}
	}
}

const styles = StyleSheet.create({
	//style for the container
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		backgroundColor: "#D0F1DD",
	},
	//style for the box where we input
	scanBox: {
		marginTop: 100,
		width: "80%",
		height: 40,
		justifyContent: "center",
		alignSelf: "center",
		textAlign: "center",
		borderColor: "#09B44D",
		borderRadius: 10,
		backgroundColor: "#F6F6F6",
		borderWidth: 1.5,
		alignItems: "center",
	},
	//style for the button we click to search
	searchButton: {
		alignSelf: "center",
		width: "40%",
		height: 30,
		marginTop: 30,
		marginBottom: 30,
	},
	//style for the searchButton text
	searchText: {
		alignSelf: "center",
		fontWeight: "bold",
		padding: 7,
	},
});
