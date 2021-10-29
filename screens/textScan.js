import React from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	ScrollView,
	Dimensions,
} from "react-native";
import db from "../config.js";
import { Ionicons } from "@expo/vector-icons";
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
		while (word.charAt(word.length - 1) === " ") {
			word = word.substring(0, word.length - 1);
		}

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
		this.setState({ facts: [] });
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
				<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={{ flex: 1 }}
					>
						<TouchableWithoutFeedback
							onPress={Keyboard.dismiss}
							accessible={false}
						>
							<View
								style={{
									flexDirection: "row",
									alignContent: "center",
									justifyContent: "center",
									marginTop: (Dimensions.get("window").height * 5) / 184,
								}}
							>
								<TextInput
									style={styles.scanBox}
									placeholder="Type Here"
									clearButtonMode="while-editing"
									placeholderTextColor="#F6F6F6"
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
								<TouchableOpacity onPress={this.classifyObject}>
									<Ionicons
										name={"search"}
										size={(Dimensions.get("window").width * 25) / 207}
										style={{ color: "#09B44D" }}
									/>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
						<View style={styles.container}>
							<InfoCard
								object={this.state.cardObject}
								facts={this.state.cardFacts}
							/>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: (Dimensions.get("window").height * 5) / 768,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "30%",
	},
	scanBox: {
		width: "60%",
		height: (Dimensions.get("window").height * 5) / 92,
		textAlign: "center",
		borderColor: "#09B44D",
		borderRadius: 10,
		backgroundColor: "#09B44D",
		borderWidth: 1.5,
		alignItems: "center",
		marginLeft: (Dimensions.get("window").width * 5) / 46,
		color: "#F6F6F6",
		fontSize: (Dimensions.get("window").width * 25) / 414,
		fontWeight: "bold",
	},
	searchButton: {
		alignSelf: "center",
		width: (Dimensions.get("window").width * 2) / 5,
		height: (Dimensions.get("window").height * 15) / 368,
		marginTop: (Dimensions.get("window").height * 15) / 368,
		marginBottom: (Dimensions.get("window").height * 15) / 368,
	},
	searchText: {
		alignSelf: "center",
		fontWeight: "bold",
		padding: (Dimensions.get("window").width * 7) / 414,
	},
});
