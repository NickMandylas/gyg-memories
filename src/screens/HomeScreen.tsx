import React from "react";
import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/pichiavo-mural.png")}
				style={[styles.box, { flex: 1, overflow: "hidden" }]}
			>
				<View style={{ backgroundColor: "#E14179", width: "100%" }}>
					<Text
						style={{
							fontFamily: "KronaOne_400Regular",
							fontSize: 12,
							color: "#fff",
							textAlign: "center",
							paddingVertical: 2,
						}}
					>
						Interactive Mural Viewer
					</Text>
				</View>
			</ImageBackground>
			<View style={[styles.box, { flex: 5 }]}></View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#eee",
		flex: 1,
	},
	box: {
		marginHorizontal: 30,
		marginTop: 10,
		borderColor: "#0C0F39",
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 20,
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center",
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
	sub: {
		fontFamily: "Inter_300Light",
		fontSize: 11.5,
		letterSpacing: -0.25,
		color: "#0C0F39",
		textAlign: "center",
		paddingHorizontal: 35,
		marginTop: 20,
	},
	hr: {
		width: "80%",
		borderBottomColor: "#0C0F39",
		borderBottomWidth: 1,
		marginVertical: 35,
	},
});
