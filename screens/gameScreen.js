import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Animated,
	Text,
	StyleSheet,
	PanResponder,
	Dimensions,
	Image,
	ActivityIndicator,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import * as Progress from "react-native-progress";
import db from "../config";
import items from "../list";
import itemName from "../itemName";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import InfoCard from "../infoCard";

const GameScreen = ({ navigation, route }) => {
	const pan = useState(new Animated.ValueXY())[0];
	//item names and names
	const images = items;
	const names = itemName;
	//num items to play with and type of game mode
	var numItems = route.params.num;

	var len = names.length; //number of elements
	var index1 = 0; //temp index
	var percent1 = 0; //temp percent
	var corr = 0; //temp
	var incorr = 0;
	var seen = [];
	var percentAdd = 1 / numItems;

	var sec = 0;
	var min = 0;
	var hour = 0;

	const [correct, setCorrect] = useState(0);
	const [incorrect, setIncorrect] = useState(0);
	const [index, setIndex] = useState(Math.floor(Math.random() * 100) % len);
	index1 = index;
	const [percent, setPercent] = useState(0);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	//return the answer for a given object
	function check(object) {
		var word = object;
		var facts = [];
		db.ref(word + "/").on("value", (data) => {
			var useData = data.val();
			for (var fact in useData) {
				facts.push(useData[fact]);
			}
		});
		return facts[1];
	}

	//initialize game
	function initGame() {
		index1 = 0;
		percent1 = 0;
		corr = 0;
		incorr = 0;
		seen = [];
		sec = 0;
		min = 0;
		hour = 0;

		setCorrect(0);
		setIncorrect(0);
		setPercent(0);
	}

	const [init, setInit] = React.useState(false);

	if (!init) {
		test = [];
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
		setInit(true);
	}

	//create panResponder
	const panResponder = useState(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				//move image
				pan.setOffset({ x: pan.x._value, y: pan.y._value });
			},
			onPanResponderMove: (_, gesture) => {
				//set image value
				pan.x.setValue(gesture.dx);
				pan.y.setValue(gesture.dy);
			},
			onPanResponderRelease: async () => {
				// on release
				var object = names[index1];
				var answer = check(object);
				if (pan.y._value >= 180) {
					if (pan.x._value >= 73) {
						if (answer == "landfill") {
							corr++;
							setCorrect(corr);
						} else {
							incorr++;
							setIncorrect(incorr);
						}
					} else if (pan.x._value <= -73) {
						if (answer == "compostable") {
							corr++;
							setCorrect(corr);
						} else {
							incorr++;
							setIncorrect(incorr);
						}
					} else {
						if (answer == "recyclable") {
							corr++;
							setCorrect(corr);
						} else {
							incorr++;
							setIncorrect(incorr);
						}

						if (percent1 > percentAdd * (numItems - 2) === false) {
							changeModal();
						}
					}

					index1 = Math.floor(Math.random() * 100) % len;
					while (seen.indexOf(index1) >= 0) {
						index1 = Math.floor(Math.random() * 100) % len;
					}

					seen.push(index1);
					setIndex(index1);

					percent1 = percent1 + percentAdd;
					setPercent(percent1);
					//console.log("PERCENT: "+percent1)
					if (percent1 > percentAdd * (numItems - 1)) {
						navigation.navigate("Summary Screen", { num: numItems });
						initGame();
					}

					Animated.timing(pan, {
						toValue: {
							x: 2 / Dimensions.get("window").height,
							y: 2 / Dimensions.get("window").width,
						},
						duration: 500,
						useNativeDriver: false,
					}).start();
				} else {
					Animated.timing(pan, {
						toValue: {
							x: 2 / Dimensions.get("window").height,
							y: 2 / Dimensions.get("window").width,
						},
						duration: 1000,
						useNativeDriver: false,
					}).start();
				}
				pan.flattenOffset();
			},
		})
	)[0];

	function changeModal() {
		setModalIsVisible(!modalIsVisible);
	}

	if (!init) {
		return (
			<ScrollView
				contentContainerStyle={styles.container}
				style={{ backgroundColor: "#DF1DD" }}
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
			<View style={styles.container}>
				<Progress.Bar
					progress={percent}
					width={(Dimensions.get("window").width * 4) / 5}
					style={{
						position: "absolute",
						top: 50,
						borderColor: "#09B44D",
					}}
					color={"#09B44D"}
				/>
				<Animated.Image
					source={images[index]}
					style={[
						{
							width: 150,
							height: 150,
							justifyContent: "center",
							alignSelf: "center",
							transform: [
								{
									translateX: pan.x,
								},
								{ translateY: pan.y },
							],
						},
					]}
					{...panResponder.panHandlers}
				/>
				<Modal
					animationType={"slide"}
					transparent={true}
					visible={modalIsVisible}
					onRequestClose={() => {}}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							changeModal();
						}}
					>
						<View
							style={{ width: 100, height: 100, backgroundColor: "red" }}
						></View>
					</TouchableWithoutFeedback>
				</Modal>
				<View style={styles.count}>
					<Ionicons
						name={"checkmark-outline"}
						size={55}
						style={{ color: "#09B44D" }}
					/>
					<Text style={[styles.countText, { color: "#09B44D" }]}>
						: {correct}
					</Text>
					<Ionicons name={"close"} size={55} style={{ color: "red" }} />
					<Text style={[styles.countText, { color: "red" }]}>
						: {incorrect}
					</Text>
				</View>

				<View style={styles.binContainer}>
					<Image
						style={styles.bins}
						source={require("../photos/unnamed-1.png")}
					/>
					<Image
						style={styles.bins}
						source={require("../photos/unnamed-2.png")}
					/>
					<Image
						style={styles.bins}
						source={require("../photos/unnamed.png")}
					/>
				</View>
			</View>
		);
	}
};

export default GameScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#D0F1DD",
	},
	binContainer: {
		flex: 1,
		flexDirection: "row",
		position: "absolute",
		bottom: 0,
	},
	bins: {
		width: Dimensions.get("window").width / 3,
		height: (Dimensions.get("window").height * 1) / 4,
		opacity: 0.5,
	},
	count: {
		flexDirection: "row",
		marginTop: 10,
	},
	countText: {
		fontSize: 40,
		fontWeight: "600",
		marginTop: 5,
	},
});
