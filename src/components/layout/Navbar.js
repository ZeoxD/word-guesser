import { Link, useLocation } from "react-router-dom";
import { Image, Text, TouchableOpacity, View } from "./react-web";
import { RiHome6Line, RiHome6Fill } from "react-icons/ri";

export default function Navbar({ windowSize }) {
	const location = useLocation();
	const { pathname } = location;

	return (
		<div
			style={{
				position: "absolute",
				top: windowSize.width >= 1024 ? "0px" : "auto",
				bottom: windowSize.width >= 1024 ? "auto" : 0,
				left: 0,
				height: windowSize.width >= 1024 ? "calc(100%)" : "80px",
				width: windowSize.width >= 1024 ? "80px" : "100%",
				backgroundColor: "#fff",
				borderTopLeftRadius: windowSize.width >= 1024 ? 0 : 20,
				borderTopRightRadius: windowSize.width >= 1024 ? 0 : 20,
				boxShadow: windowSize.width >= 1024 ? "0px 2px 4px lightgray" : "-1px -1px 4px lightgray",
				flexDirection: windowSize.width >= 1024 ? "column" : "row",
				display: pathname === "/login" ? "none" : "flex",
				justifyContent: windowSize.width >= 1024 ? "flex-start" : "center",
				alignContent: "center",
				overflow: "hidden",
				zIndex: 10,
			}}
		>
			<View
				style={{
					display: windowSize.width >= 1024 ? "flex" : "none",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					paddingTop: 12,
					paddingBottom: 6,
				}}
			>
				<Image
					source={require("../../assets/text-logo.png")}
					alt="company-logo"
					style={{
						height: 34,
						width: 40,
						borderRadius: 10,
						backgroundColor: "#fff",
						padding: 12,
						boxShadow: "1px 1px 2px lightgray",
						objectFit: "contain",
					}}
				/>
			</View>
			<TouchableOpacity
				style={{
					flex: windowSize.width >= 1024 ? 0 : 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					paddingTop: windowSize.width >= 1024 ? 10 : 0,
					paddingBottom: windowSize.width >= 1024 ? 10 : 6,
				}}
			>
				<Link
					to="/"
					style={{
						textDecoration: "none",
						color: "#000",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }}>
						{pathname === "/" ? (
							<RiHome6Fill style={{ height: 26, width: 26, color: "#3f3f69" }} />
						) : (
							<RiHome6Line style={{ height: 26, width: 26, color: "#555" }} />
						)}
					</View>
					<Text style={{ fontSize: "0.6rem", userSelect: "none", color: pathname === "/" ? "blue" : "#555" }}>
						Home
					</Text>
				</Link>
			</TouchableOpacity>
		</div>
	);
}
