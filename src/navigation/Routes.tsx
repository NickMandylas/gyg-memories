import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { auth } from "../components/Firebase/firebase";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthUserContext } from "./AuthUserProvider";
import { ActivityIndicator, View } from "react-native";

export default function Routes() {
	const { user, setUser }: any = useContext(AuthUserContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(async (authUser) => {
			try {
				await (authUser ? setUser(authUser) : setUser(null));
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		});

		return subscriber;
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			{user ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
