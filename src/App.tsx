import {
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_800ExtraBold,
	Inter_900Black,
} from "@expo-google-fonts/inter";
import { KronaOne_400Regular } from "@expo-google-fonts/krona-one";
import { AppLoading, registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet } from "react-native";
import AppStack from "./navigation/index";

const App: React.FC = () => {
	let [fontsLoaded] = useFonts({
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_800ExtraBold,
		Inter_900Black,
		KronaOne_400Regular,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return <AppStack />;
};

registerRootComponent(App);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
