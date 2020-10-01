import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";

import WelcomeScreen from "../screens/WelcomeScreen";
import AuthScreen from "../screens/AuthScreen";

import FollowTransition from "../utils/followTransition";

const Stack = createStackNavigator();

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AuthStack() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
			<Stack.Screen
				name="Authentication"
				component={AuthScreen}
				options={{
					gestureEnabled: false,
					cardStyleInterpolator: FollowTransition,
					gestureDirection: "horizontal",
					gestureResponseDistance: {
						horizontal: SCREEN_WIDTH,
					},
				}}
			/>
		</Stack.Navigator>
	);
}
