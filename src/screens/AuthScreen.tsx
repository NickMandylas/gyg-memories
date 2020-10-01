import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	Alert,
} from "react-native";
import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import { auth } from "../components/Firebase/firebase";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

interface AuthScreenProps {}

export const AuthScreen: React.FC<AuthScreenProps> = ({}) => {
	const [request, response, promptAsync] = Facebook.useAuthRequest({
		responseType: ResponseType.Token,
		clientId: "800134777405567",
		redirectUri: "https://auth.expo.io/@nickmandylas/gyg-memories",
		scopes: ["public_profile", "email"],
	});

	React.useEffect(() => {
		if (response?.type === "success") {
			const { access_token } = response.params;
			const credential = auth.FacebookAuthProvider.credential(access_token);
			auth().signInWithCredential(credential);
		}
	}, [response]);

	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Image
					source={require("../assets/open-doodles-roller-skating.png")}
					resizeMode={"contain"}
					style={{ maxHeight: 115, marginBottom: 35 }}
				/>
				<Text style={styles.h1}>Last thing...</Text>
				<Text style={[styles.p]}>
					We're going need you to sign-up or log-in to join our movement!
				</Text>
				<View style={styles.hr} />
				<View style={styles.authentication}>
					<TouchableOpacity
						onPress={() => promptAsync({ useProxy: true })}
						disabled={!request}
						style={[styles.button, { backgroundColor: "#3b5998" }]}
					>
						<Entypo name="facebook-with-circle" size={30} color="white" />
						<Text style={[styles.buttonText, { marginLeft: 10 }]}>
							FACEBOOK
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Alert.alert("Error", "Feature not implemented.")}
						disabled={!request}
						style={[
							styles.button,
							{ backgroundColor: "#000000", marginTop: 10 },
						]}
					>
						<MaterialCommunityIcons name="apple" size={30} color="white" />
						<Text style={[styles.buttonText, { marginLeft: 7 }]}>APPLE</Text>
					</TouchableOpacity>
					<Text style={styles.sub}>
						By signing up you accept Greek Youth Generator Inc's Terms of
						Service and Privacy Policy.
					</Text>
				</View>
			</View>
		</View>
	);
};

export default AuthScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#eee",
		flex: 1,
	},
	box: {
		marginVertical: 60,
		marginHorizontal: 30,
		borderColor: "#0C0F39",
		borderWidth: 1,
		flex: 1,
		borderStyle: "solid",
		borderRadius: 20,
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center",
	},
	authentication: {
		width: "100%",
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
