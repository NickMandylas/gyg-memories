import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Dimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import RecordScreen from "../screens/RecordScreen";
import FollowTransition from "../utils/followTransition";

const Stack = createStackNavigator();

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AppStack() {
	return (
		<Stack.Navigator headerMode="none" initialRouteName="Record">
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen
				name="Record"
				component={RecordScreen}
				options={{
					gestureEnabled: true,
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
