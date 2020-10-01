import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";

import RecordScreen from "../screens/RecordScreen";

import FollowTransition from "../utils/followTransition";

const Stack = createStackNavigator();

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AppStack() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen
				name="Record"
				component={RecordScreen}
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
