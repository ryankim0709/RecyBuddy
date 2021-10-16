import React, { useState, useEffect } from "react";
import {
	Text,
	Button,
	View,
	ScrollView,
	ActivityIndicator,
	Alert,
	Linking,
	TouchableOpacity,
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

	const [micPerms, setmicPerms] = React.useState(false);
	const [speechRec, setSpeechRec] = React.useState(false);

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

	const voiceLabel = text ? text : isRecord ? "Say something..." : "";

	const _onSpeechStart = () => {
		//console.log("onSpeechStart");
		setText("");
	};
	const _onSpeechEnd = () => {
		//console.log("onSpeechEnd");
	};
	const _onSpeechResults = (event) => {
		//console.log("onSpeechResults");
		setText(event.value[0]);
	};
	const _onSpeechError = (event) => {
		//console.log("_onSpeechError");
		//console.log(event.error);
	};

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
		console.log(isRecord);
		setIsReal(false);
		setFacts([]);
		if (isRecord) {
			Voice.stop();
		} else {
			Voice.start("en-US");
			setIsReal(false);
		}
		setIsRecord(!isRecord);
		//setIsReal(false);
	};

	useEffect(() => {
		//console.log("Here");
		Voice.onSpeechStart = _onSpeechStart;
		Voice.onSpeechEnd = _onSpeechEnd;
		Voice.onSpeechResults = _onSpeechResults;
		Voice.onSpeechError = _onSpeechError;

		return () => {
			Voice.destroy().then(Voice.removeAllListeners);
		};
	}, []);

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
	} else if (!speechRec || !micPerms) {
		return (
			<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.permissionBox}
						onPress={() => {
							Alert.alert(
								"Microphone and Speech recognition permission required",
								"Microphone and Speech recognition permissions is required to record",
								[
									{
										text: "Settings",
										onPress: () => Linking.openURL("app-settings:"),
										style: "cancel",
									},
									{
										text: "Cancel",
									},
								]
							);
						}}
					>
						<Text style={styles.permissionText}>
							Enable microphone and speech recognition permissions
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
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
								size={35}
								style={{ color: "#F6F6F6" }}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={_classify} style={styles.actionButton}>
							<Ionicons
								name={"search-outline"}
								size={35}
								style={{ color: "#F6F6F6" }}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.object}>{voiceLabel}</Text>
					<InfoCard object={text} facts={facts} valid={isReal} />
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
		marginTop: 20,
	},
	actionButton: {
		width: "45%",
		height: 40,
		margin: 5,
		justifyContent: "center",
		backgroundColor: "#09B44D",
		borderRadius: 10,
		flexDirection: "row",
	},
	buttonText: {
		textAlign: "center",
		color: "#F6F6F6",
		fontWeight: "bold",
		fontSize: 25,
	},
	object: {
		fontWeight: "bold",
		fontSize: 25,
		color: "#09B44D",
	},
	permissionBox: {
		width: "70%",
		backgroundColor: "#09B44D",
		height: 75,
		borderRadius: 10,
	},
	permissionText: {
		color: "#F6F6F6",
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default AudioScan;
