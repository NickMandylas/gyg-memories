import React, { useEffect, useRef, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	Button,
} from "react-native";
import { Camera } from "expo-camera";
import { auth } from "../components/Firebase/firebase";

interface RecordScreenProps {}

export const RecordScreen: React.FC<RecordScreenProps> = ({}) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [recording, setRecording] = useState<boolean>(false);

	const camera = useRef<Camera>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

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
					<TouchableWithoutFeedback
						onPress={async () => {
							setRecording(!recording);
							await camera.current?.takePictureAsync();
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
					</TouchableWithoutFeedback>
				</View>
				<Button title="Logout" onPress={() => auth().signOut()} />
			</View>
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
