import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	View,
	Linking,
	Alert,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import db from "../config";
import InfoCard from "../infoCard";
import { Ionicons } from "@expo/vector-icons";

const API_KEY = "AIzaSyCI1Ekex-K9RtT5vNoTgYKvVNi8hZJfkzg";
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
	const body = {
		requests: [
			{
				image: {
					content: image,
				},
				features: [
					{
						type: "LABEL_DETECTION",
						maxResults: 1,
					},
				],
			},
		],
	};

	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const result = await response.json();
	console.log("callGoogleVisionAsync -> result", result);

	return result.responses[0].labelAnnotations[0].description;
}

export default function PhotoScan() {
	const [image, setImage] = React.useState(null);
	const [status, setStatus] = React.useState(null);
	const [permissions, setPermissions] = React.useState(cameraReady());
	const [facts, setFacts] = React.useState([]);
	const [isReal, setIsReal] = React.useState(false);

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

	async function cameraReady() {
		let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
		permissionResult = permissionResult.granted === true;
		setPermissions(permissionResult);
		return permissionResult;
	}

	const classify = async () => {
		if (status != null) {
			setIsReal(true);
			setFacts([]);
			var word = status;
			word = word.toLocaleLowerCase();
			var facts = [];
			db.ref(word + "/").on("value", (data) => {
				var useData = data.val();
				for (var fact in useData) {
					facts.push(useData[fact]);
				}
			});
			setFacts(facts);
		}
	};

	const askPermissionsAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			Alert.alert(
				"Camera permission required",
				"Camera permissions is required for the app",
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
			return;
		} else {
			setPermissions(true);
		}
	};

	const takePictureAsync = async () => {
		const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
			base64: true,
		});

		if (!cancelled) {
			setImage(uri);
			setStatus("Loading...");
			try {
				const result = await callGoogleVisionAsync(base64);
				await setStatus(result);
				classify();
			} catch (error) {
				setStatus(`Error: ${error.message}`);
			}
		} else {
			setImage(null);
			setStatus(null);
		}
		await setIsReal(false);
	};

	if (!init) {
		return (
			<ScrollView style={{ backgroundColor: "#DF1DD" }}>
				<View style={styles.container}>
					<ActivityIndicator
						size="large"
						style={{ marginTop: "10%" }}
						color="#09B44D"
					/>
				</View>
			</ScrollView>
		);
	} else {
		return (
			<ScrollView style={{ backgroundColor: "#D0F1DD" }}>
				{permissions === false ? (
					<View style={styles.container}>
						<TouchableOpacity
							onPress={askPermissionsAsync}
							style={styles.permissions}
						>
							<Text style={[styles.permissionText, { marginTop: 15 }]}>
								Enable camera permissions
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<>
						<View style={styles.container}>
							<TouchableOpacity
								onPress={takePictureAsync}
								style={styles.actionButton}
							>
								<Ionicons
									name={"camera"}
									size={35}
									style={{ color: "#F6F6F6" }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={classify} style={styles.actionButton}>
								<Ionicons
									name={"search-outline"}
									size={35}
									style={{ color: "#F6F6F6" }}
								/>
							</TouchableOpacity>
							{image && <Image style={styles.image} source={{ uri: image }} />}
							{status && <Text style={styles.object}>{status}</Text>}

							<InfoCard object={status} facts={facts} valid={isReal} />
						</View>
					</>
				)}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 10,
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 10,
	},
	text: {
		margin: 5,
	},
	actionButton: {
		width: "60%",
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
		fontSize: 30,
		color: "#262626",
	},
	permissions: {
		width: "70%",
		height: 50,
		backgroundColor: "#09B44D",
		alignSelf: "center",
		borderRadius: 10,
		textAlign: "center",
	},
	permissionText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#F6F6F6",
		textAlign: "center",
	},
});
