import React, { useCallback } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface useStatusBarProps {
	style: StatusBarStyle;
	animated?: boolean;
}

const useStatusBar = ({ style, animated = true }: useStatusBarProps) => {
	useFocusEffect(
		useCallback(() => {
			StatusBar.setBarStyle(style, animated);
		}, [])
	);
};

export default useStatusBar;
