import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Image,
	useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pagination } from "../components/Pagination";
import { useNavigation } from "@react-navigation/native";

interface WelcomeScreenProps {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = (props) => {
	const windowDimensions = useWindowDimensions();

	const [currentIndex, setCurrentIndex] = useState(0);
	const navigation = useNavigation();

	const handleScroll = useCallback(
		(event) => {
			const x = event.nativeEvent.contentOffset.x;
			const xw = x / windowDimensions.width;
			const index = Math.round(xw);

			if (index !== currentIndex && index >= 0 && index < 4) {
				setCurrentIndex(index);
			}
		},
		[windowDimensions, currentIndex]
	);

	const pages = [
		<View style={styles.container}>
			<View style={styles.box}>
				<Image
					source={require("../assets/open-doodles-loving.png")}
					resizeMode={"contain"}
					style={{ maxHeight: 105, marginBottom: 45 }}
				/>
				<Text style={styles.h1}>Remember</Text>
				<Text style={styles.p}>
					Ask thoughtful prompts to preserve memories.
				</Text>
				<Pagination active={0} total={3} paginatorStyle={{ marginTop: 30 }} />
			</View>
			<StatusBar style="auto" />
		</View>,
		<View style={styles.container}>
			<View style={styles.box}>
				<Image
					source={require("../assets/open-doodles-selfie.png")}
					resizeMode={"contain"}
					style={{ maxHeight: 120, marginBottom: 30 }}
				/>
				<Text style={styles.h1}>Capture</Text>
				<Text style={styles.p}>
					Record & store your favourite memories in short clips.
				</Text>
				<Pagination active={1} total={3} paginatorStyle={{ marginTop: 30 }} />
			</View>
			<StatusBar style="auto" />
		</View>,
		<View style={styles.container}>
			<View style={styles.box}>
				<Image
					source={require("../assets/open-doodles-ice-cream.png")}
					resizeMode={"contain"}
					style={{ maxHeight: 120, marginBottom: 30 }}
				/>
				<Text style={styles.h1}>Share</Text>
				<Text style={styles.p}>
					Make memories live forever and share them with friends & family.
				</Text>
				<Pagination active={2} total={3} paginatorStyle={{ marginTop: 20 }} />
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate("Authentication");
					}}
				>
					<Text style={styles.buttonText}>START</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</View>,
	];

	return (
		<View style={styles.container}>
			<ScrollView
				pagingEnabled={true}
				horizontal={true}
				scrollEventThrottle={16}
				onScroll={handleScroll}
				showsHorizontalScrollIndicator={false}
			>
				{pages.map((page, index) => (
					<View
						key={index}
						style={{
							width: windowDimensions.width,
						}}
					>
						{page}
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
	box: {
		marginVertical: 60,
		marginHorizontal: 30,
		borderColor: "#0C0F39",
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 20,
		flex: 1,
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	bottom: {
		width: "100%",
		justifyContent: "flex-end",
		position: "absolute",
		bottom: 100,
	},
	top: {
		width: "100%",
		justifyContent: "flex-start",
		position: "absolute",
		top: 50,
	},
	button: {
		marginHorizontal: 70,
		backgroundColor: "#0C0F39",
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		paddingVertical: 20,
		fontFamily: "Inter_500Medium",
		fontSize: 13,
	},
	h1: {
		fontFamily: "KronaOne_400Regular",
		fontSize: 35,
		color: "#0C0F39",
		letterSpacing: -4.25,
	},
	p: {
		fontFamily: "Inter_500Medium",
		fontSize: 11.5,
		letterSpacing: -0.25,
		color: "#0C0F39",
		textAlign: "center",
		paddingHorizontal: 35,
		marginTop: 5,
	},
});
