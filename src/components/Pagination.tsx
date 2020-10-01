import React from "react";
import {
	StyleSheet,
	View,
	Text,
	StyleProp,
	ViewStyle,
	TextStyle,
} from "react-native";

interface PaginationProps {
	active: number;
	total: number;
	paginatorStyle?: StyleProp<ViewStyle>;
	paginationDotStyle?: StyleProp<ViewStyle>;
	paginationTextStyle?: StyleProp<TextStyle>;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
	let pagination: JSX.Element[] = [];

	for (var i = 0; i < props.total; i++) {
		pagination.push(
			<View
				style={[
					props.active === i ? styles.paginatorDotActive : styles.paginatorDot,
					props.paginationDotStyle,
				]}
				key={i}
			>
				<Text
					style={[
						props.active === i
							? styles.paginatorDotActiveText
							: styles.paginatorDotText,
						props.paginationTextStyle,
					]}
					key={i}
				>
					{i + 1}
				</Text>
			</View>
		);
	}

	return (
		<View style={[props.paginatorStyle, styles.paginator]}>{pagination}</View>
	);
};

const styles = StyleSheet.create({
	paginator: {
		position: "relative",
		bottom: 0,
		left: 0,
		right: 0,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	paginatorDot: {
		width: 22,
		height: 22,
		backgroundColor: "#BFB8B3",
		borderRadius: 11,
		marginHorizontal: 5,
		marginTop: 40,
		paddingTop: 6,
	},
	paginatorDotText: {
		textAlign: "center",
		color: "#fff",
		fontFamily: "KronaOne_400Regular",
		fontSize: 7,
	},
	paginatorDotActive: {
		width: 30,
		height: 30,
		backgroundColor: "#0C0F39",
		borderRadius: 15,
		marginHorizontal: 5,
		marginTop: 40,
		paddingTop: 8,
	},
	paginatorDotActiveText: {
		textAlign: "center",
		color: "#fff",
		fontFamily: "KronaOne_400Regular",
		fontSize: 10,
	},
});
