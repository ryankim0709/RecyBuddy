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
import answers from "../answers";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import InfoModal from "../infoModal";

const GameScreen = ({ navigation, route }) => {
	const pan = useState(new Animated.ValueXY())[0];
	//item names and names
	const images = items;

	const ans = answers;
	const mode = route.params.mode;
	//num items to play with and type of game mode
	var numItems = route.params.num;

	var len = images.length; //number of elements
	var index1 = 0; //temp index
	var percent1 = 0; //temp percent
	var corr = 0; //temp
	var incorr = 0;
	var seen = [];
	var percentAdd = 1 / numItems;

	const [correct, setCorrect] = useState(0);
	const [incorrect, setIncorrect] = useState(0);
	const [index, setIndex] = useState(Math.floor(Math.random() * 100) % len);
	index1 = index;
	seen = [];
	seen.push(index1);
	const [percent, setPercent] = useState(0);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const [modalIndex, setModalIndex] = useState(0);
	const [modalGivenImage, setModalGivenImage] = useState("");
	const [modalActualImage, setModalActualImage] = useState("");
	const [given, setGiven] = useState("");

	//initialize game
	function initGame() {
		console.log("INIT GAME");
		index1 = 0;
		percent1 = 0;
		corr = 0;
		incorr = 0;
		seen = [];

		setCorrect(0);
		setIncorrect(0);
		setModalIndex(0);
		setModalGivenImage("");
		setModalActualImage("");
		setGiven("");
		setModalIsVisible(false);
		setIndex(Math.floor(Math.random() * 100) % len);

		setPercent(0);
		console.log("FINISHED INIT");
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
				var answer = ans[index1];

				if (answer === "landfill") {
					setModalActualImage(require("../photos/landfillBin.png"));
				} else if (answer === "recyclable") {
					setModalActualImage(require("../photos/recycleBin.png"));
				} else {
					setModalActualImage(require("../photos/compostBin.png"));
				}
				setModalIndex(index1);
				if (pan.y._value >= 180) {
					if (pan.x._value >= 73) {
						setGiven("landfill");
						setModalGivenImage(require("../photos/landfillBin.png"));
						if (answer == "landfill") {
							corr++;
							setCorrect(corr);
						} else {
							incorr++;
							setIncorrect(incorr);
						}
					} else if (pan.x._value <= -73) {
						setGiven("compostable");
						setModalGivenImage(require("../photos/compostBin.png"));
						if (answer == "compostable") {
							corr++;
							setCorrect(corr);
						} else {
							incorr++;
							setIncorrect(incorr);
						}
					} else {
						setGiven("recyclable");
						setModalGivenImage(require("../photos/recycleBin.png"));
						if (answer == "recyclable") {
							corr++;
							setCorrect(corr);
						} else {
							incorr++;
							setIncorrect(incorr);
						}
					}

					if (
						percent1 > percentAdd * (numItems - 2) === false &&
						mode === "learn"
					) {
						changeModal();
					}

					percent1 = percent1 + percentAdd;
					setPercent(percent1);
					if (percent1 > percentAdd * (numItems - 1)) {
						await initGame();
						navigation.navigate("Summary Screen", {
							num: numItems,
							mode: mode,
						});
					} else {
						index1 = Math.floor(Math.random() * 100) % len;
						while (seen.indexOf(index1) >= 0) {
							index1 = Math.floor(Math.random() * 100) % len;
						}
						seen.push(index1);
						console.log("SEEN: " + seen);
						console.log("INDEX: " + index1);
						setIndex(index1);
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
					height={20}
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
							marginBottom: 20,
							borderRadius: 100,
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
						<View style={styles.modal}>
							<InfoModal
								image={images[modalIndex]}
								actual={ans[modalIndex]}
								given={given}
								givenImage={modalGivenImage}
								actualImage={modalActualImage}
							/>
						</View>
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
						source={require("../photos/compostBin.png")}
					/>
					<Image
						style={styles.bins}
						source={require("../photos/recycleBin.png")}
					/>
					<Image
						style={styles.bins}
						source={require("../photos/landfillBin.png")}
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
		borderRadius: 10,
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
	modal: {
		flex: 1,
		justifyContent: "center",
		alignSelf: "center",
		marginBottom: "20%",
	},
});
