import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Alert,
	Linking,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
} from "react-native";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import Voice from "react-native-voice";
import InfoCard from "../infoCard";
import db from "../config";
import { Ionicons } from "@expo/vector-icons";

const AudioScan = () => {
	const [isRecord, setIsRecord] = React.useState(false);
	const [text, setText] = React.useState("");
	const [facts, setFacts] = React.useState([]);
	const [isReal, setIsReal] = React.useState(false);
	const [init, setInit] = React.useState(false);
	const [isFirst, setIsFirst] = React.useState(true);

	const [micPerms, setmicPerms] = React.useState(null);
	const [speechRec, setSpeechRec] = React.useState(null);

	const voiceLabel = text ? text : isRecord ? "Say something..." : "";

	const _onSpeechStart = () => {
		setText("");
	};
	const _onSpeechEnd = () => {};
	const _onSpeechResults = (event) => {
		setText(event.value[0]);
	};
	const _onSpeechError = (event) => {};

	const _classify = () => {
		var word = text.toLocaleLowerCase();
		var facts = [];
		db.ref(word + "/").on("value", (data) => {
			var useData = data.val();
			for (var fact in useData) {
				facts.push(useData[fact]);
			}
		});
		setFacts(facts);
		setIsReal(true);

		if (isRecord) {
			Voice.stop();
			setIsRecord(false);
		}
	};

	const _onRecordVoice = () => {
		if (
			(micPerms === false || speechRec === false) &&
			!isRecord &&
			isFirst === false
		) {
			setIsFirst(false);
			Alert.alert(
				"Permission Required",
				"Please enable Microphone and Speech-Recognition permissions",
				[
					{
						text: "Settings",
						onPress: () => Linking.openSettings(),
						style: "cancel",
					},
					{ text: "Ok" },
				]
			);
		} else {
			if (isFirst) {
				setIsFirst(false);
			}
			try {
				setIsReal(false);
				setFacts([]);
				if (isRecord) {
					Voice.stop();
				} else {
					Voice.start("en-US");
					setIsReal(false);
				}
				setIsRecord(!isRecord);
			} catch (error) {
				if (!micPerms || !speechRec) {
					useEffect();
				}
			}
		}
	};

	useEffect(() => {
		Voice.onSpeechStart = _onSpeechStart;
		Voice.onSpeechEnd = _onSpeechEnd;
		Voice.onSpeechResults = _onSpeechResults;
		Voice.onSpeechError = _onSpeechError;

		return () => {
			Voice.destroy().then(Voice.removeAllListeners);
		};
	}, []);
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

	check(PERMISSIONS.IOS.MICROPHONE).then((result) => {
		switch (result) {
			case RESULTS.UNAVAILABLE:
				setmicPerms(false);
				break;
			case RESULTS.DENIED:
				setmicPerms(false);
				break;
			case RESULTS.LIMITED:
				setmicPerms(false);
				break;
			case RESULTS.GRANTED:
				setmicPerms(true);
				break;
			case RESULTS.BLOCKED:
				setmicPerms(false);
				break;
		}
	});

	check(PERMISSIONS.IOS.SPEECH_RECOGNITION).then((result) => {
		switch (result) {
			case RESULTS.UNAVAILABLE:
				setSpeechRec(false);
				break;
			case RESULTS.DENIED:
				setSpeechRec(false);
				break;
			case RESULTS.LIMITED:
				setSpeechRec(false);
				break;
			case RESULTS.GRANTED:
				setSpeechRec(true);
				break;
			case RESULTS.BLOCKED:
				setSpeechRec(false);
				break;
		}
	});

	if (!init) {
		return (
			<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
				<ActivityIndicator
					size="large"
					style={{ marginTop: "10%" }}
					color="#09B44D"
				/>
			</ScrollView>
		);
		// } else if (
		// 	micPerms != null &&
		// 	speechRec != null &&
		// 	init &&
		// 	(!speechRec || !micPerms)
		// ) {
		// 	return (
		// 		<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
		// 			<View style={styles.container}>
		// 				<TouchableOpacity
		// 					style={styles.permissionBox}
		// 					onPress={() => {
		// 						Alert.alert(
		// 							"Microphone and Speech recognition permission required",
		// 							"Microphone and Speech recognition permissions is required to record",
		// 							[
		// 								{
		// 									text: "Settings",
		// 									onPress: () => openSettings(),
		// 									style: "cancel",
		// 								},
		// 								{
		// 									text: "Cancel",
		// 								},
		// 							]
		// 						);
		// 					}}
		// 				>
		// 					<Text style={styles.permissionText}>
		// 						Enable microphone and speech recognition permissions
		// 					</Text>
		// 				</TouchableOpacity>
		// 			</View>
		// 		</ScrollView>
		// 	);
	} else {
		return (
			<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
				<View style={styles.container}>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={_onRecordVoice}
							style={styles.actionButton}
						>
							<Ionicons
								name={isRecord ? "mic-off" : "mic"}
								size={(Dimensions.get("window").width * 35) / 414}
								style={{ color: "#F6F6F6" }}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={_classify} style={styles.actionButton}>
							<Ionicons
								name={"search-outline"}
								size={(Dimensions.get("window").width * 35) / 414}
								style={{ color: "#F6F6F6" }}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.object}>{voiceLabel}</Text>
					<View style={{ marginTop: "30%" }}>
						<InfoCard object={text} facts={facts} valid={isReal} />
					</View>
				</View>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: (Dimensions.get("window").height * 5) / 184,
	},
	actionButton: {
		width: "45%",
		height: (Dimensions.get("window").height * 5) / 92,
		margin: (Dimensions.get("window").width * 5) / 414,
		justifyContent: "center",
		backgroundColor: "#09B44D",
		borderRadius: 10,
		flexDirection: "row",
	},
	buttonText: {
		textAlign: "center",
		color: "#F6F6F6",
		fontWeight: "bold",
		fontSize: (Dimensions.get("window").width * 25) / 414,
	},
	object: {
		fontWeight: "bold",
		fontSize: (Dimensions.get("window").width * 25) / 414,
		color: "#09B44D",
	},
	permissionBox: {
		width: "70%",
		backgroundColor: "#09B44D",
		height: (Dimensions.get("window").height * 75) / 736,
		borderRadius: 10,
	},
	permissionText: {
		color: "#F6F6F6",
		fontSize: (Dimensions.get("window").width * 10) / 207,
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default AudioScan;
