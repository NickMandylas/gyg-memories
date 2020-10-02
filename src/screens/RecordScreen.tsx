import { Camera } from "expo-camera";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
	Alert,
	Button,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { auth } from "../components/Firebase/firebase";

interface RecordScreenProps {}

const RecordScreen: React.FC<RecordScreenProps> = ({}) => {
	const camera = useRef<Camera>(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	// Permissions Logic
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			await MediaLibrary.requestPermissionsAsync();
			setHasPermission(status === "granted");
			console.log(seconds);
		})();
	}, []);

	// Timer Logic
	const [seconds, setSeconds] = useState<number>(0);
	const [recording, setRecording] = useState<boolean>(false);
	useEffect(() => {
		// countdownTimer();
		let interval: NodeJS.Timeout | null = null;
		if (recording) {
			interval = setInterval(() => {
				setSeconds((seconds) => seconds + 1);
			}, 1000);
		} else if (!recording && seconds !== 0) {
			clearInterval(interval!);
		}

		console.log(seconds);
		return () => clearInterval(interval!);
	}, [seconds, recording]);

	// Camera & Recording Logic
	const [video, setVideo] = useState<string>("");
	useEffect(() => {
		(async () => {
			if (video) {
				if (seconds <= 5) {
					Alert.alert("Too Short!", "Video needs to be longer than 5 seconds.");
				} else {
					await MediaLibrary.saveToLibraryAsync(video);
				}
				setVideo("");
				setSeconds(0);
			}
		})();
	}, [video, seconds]);

	const onRecordVideo = async (camera: RefObject<Camera>) => {
		if (camera.current) {
			setRecording(!recording);
			await Haptics.impactAsync();
			const video = await camera.current!.recordAsync({
				maxDuration: 30,
				quality: "1080p",
			});
			setVideo(video.uri);
		}
	};

	// if (hasPermission === null) {
	// 	return <View />;
	// }
	// if (hasPermission === false) {
	// 	return <Text>No access to camera</Text>;
	// }

	return (
		<SafeAreaView style={styles.container}>
			<Text style={[styles.h2, { marginTop: 30, marginBottom: 25 }]}>
				Ask <Text style={{ fontFamily: "Inter_500Medium" }}>the prompt</Text> to
				your loved one.
			</Text>
			<View style={[styles.box]}>
				<Camera
					style={{ width: "100%", height: "100%" }}
					type={type}
					ref={camera}
				/>
			</View>
			<Text style={styles.h1}>
				What's your most memorable experience from Melbourne?
			</Text>
			<View
				style={{
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 30,
				}}
			>
				<View
					style={{
						borderColor: "#0C0F39",
						borderWidth: 1,
						height: 80,
						width: 80,
						borderRadius: 40,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Pressable
						disabled={recording}
						onPressIn={async () => {
							onRecordVideo(camera);
						}}
						onPressOut={async () => {
							setRecording(!recording);
							camera.current!.stopRecording();
							await Haptics.impactAsync();
						}}
					>
						<View
							style={{
								backgroundColor: recording === false ? "#0C0F39" : "#FF7E36",
								height: 60,
								width: 60,
								borderRadius: 30,
							}}
						/>
					</Pressable>
				</View>
				<Button title="Logout" onPress={() => auth().signOut()} />
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

export default RecordScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#eee",
		flex: 1,
	},
	box: {
		maxHeight: 400,
		marginHorizontal: 30,
		borderColor: "#0C0F39",
		borderWidth: 1.5,
		flex: 1,
		borderStyle: "solid",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		borderRadius: 20,
	},
	button: {
		marginHorizontal: 35,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		paddingVertical: 20,
		fontFamily: "Inter_500Medium",
		fontSize: 13,
	},
	h1: {
		fontFamily: "Inter_500Medium",
		fontSize: 20,
		color: "#0C0F39",
		letterSpacing: -1.25,
		textAlign: "center",
		marginHorizontal: 20,
		marginTop: 30,
	},
	h2: {
		fontFamily: "Inter_300Light",
		fontSize: 15,
		letterSpacing: -0.25,
		color: "#0C0F39",
		textAlign: "center",
		paddingHorizontal: 35,
		marginTop: 5,
	},
});
