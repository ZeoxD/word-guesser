import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const View = ({ style, children, ...props }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
};

export const ScrollView = ({
	horizontal = true,
	onEndReachedThreshold = 0,
	onEndReached = () => {},
	showsVerticalScrollIndicator = true,
	showsHorizontalScrollIndicator = true,
	style,
	children,
	...props
}) => {
	const scrollRef = useRef(null);
	const [endReached, setEndReached] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (
				!endReached &&
				scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
					scrollRef.current.scrollHeight - scrollRef.current.scrollHeight * onEndReachedThreshold
			) {
				console.log("Scrollbar reached near bottom");
				setEndReached(true);
			}
		};

		const scroll = scrollRef.current;
		scroll.addEventListener("scroll", handleScroll);

		return () => scroll.removeEventListener("scroll", handleScroll);
	}, [endReached]);

	useEffect(() => {
		if (endReached) {
			const resetEndReached = () => {
				onEndReached();
				setEndReached(false);
			};

			resetEndReached();
		}
	}, [endReached]);

	return (
		<div
			ref={scrollRef}
			className={"no-scrollbar"}
			style={{
				display: "flex",
				flexDirection: horizontal ? "row" : "column",
				overflowX: horizontal ? "auto" : "hidden",
				overflowY: horizontal ? "hidden" : "auto",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
};

export const Text = ({ style, children, ...props }) => {
	return (
		<p style={style} {...props}>
			{children}
		</p>
	);
};

export const TextInput = ({
	value,
	defaultValue,
	placeholder,
	placeholderTextColor,
	editable = true,
	keyboardType = "text",
	maxLength,
	secureTextEntry = false,
	autoFocus = false,
	textAlign,
	onChangeText,
	onFocus,
	onBlur,
	onKeyPress,
	onSubmitEditing,
	style,
	...props
}) => {
	return (
		<input
			type={secureTextEntry ? "password" : keyboardType === "numeric" ? "number" : "text"}
			value={value}
			defaultValue={defaultValue}
			placeholder={placeholder}
			style={{
				outline: "none",
				border: "1px solid #ccc",
				fontSize: "1rem",
				padding: "8px 14px",
				borderRadius: "4px",
				textAlign: textAlign,
				color: placeholderTextColor || "inherit",
				opacity: editable ? 1 : 0.5,
				pointerEvents: editable ? "auto" : "none",
				...style,
			}}
			disabled={!editable}
			maxLength={maxLength}
			autoFocus={autoFocus}
			onChange={(e) => onChangeText && onChangeText(e.target.value)}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={(e) => {
				if (onKeyPress) onKeyPress(e);
				if (onSubmitEditing && e.key === "Enter") onSubmitEditing(e);
			}}
			{...props}
		/>
	);
};

export function TouchableOpacity({ children, onPress, onClick, style }) {
	const [isPressed, setIsPressed] = useState(false);
	return (
		<div
			onTouchStart={() => setIsPressed(true)}
			onTouchEnd={() => setIsPressed(false)}
			onTouchCancel={() => setIsPressed(false)}
			onClick={onPress || onClick}
			style={{
				...style,
				display: "flex",
				flexDirection: "column",
				WebkitTapHighlightColor: "transparent",
				opacity: isPressed ? 0.4 : 1,
				transition: "opacity 0.2s",
				cursor: "pointer",
				outline: "none",
			}}
		>
			{children}
		</div>
	);
}

export const Image = ({ source, alt = "", style, resizeMode = "cover", ...props }) => {
	const imageSrc = typeof source === "string" ? source : source?.uri || "";

	const objectFitMap = {
		contain: "contain",
		cover: "cover",
		stretch: "fill",
		center: "none",
		repeat: "repeat",
	};

	return (
		<img
			src={imageSrc}
			alt={alt}
			style={{
				...style,
				objectFit: objectFitMap[resizeMode],
			}}
			{...props}
		/>
	);
};

export const ToastWeb = {
	show: (message) =>
		toast.custom((t) => (
			<View
				style={{
					maxWidth: "20rem",
					backgroundColor: "#252525",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
					borderRadius: "100px",
					overflow: "hidden",
					pointerEvents: "auto",
					flexDirection: "row",
					animation: t.visible ? "enter 0.3s" : "leave 0.3s",
					ring: "1px solid rgba(0, 0, 0, 0.05)",
				}}
			>
				<View style={{ flex: "1 1 0%", flexDirection: "row", padding: "0.4rem" }}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View style={{ flexShrink: 0 }}>
							<Image
								style={{
									height: "1.36rem",
									width: "1.36rem",
									borderRadius: "9999px",
									backgroundColor: "#fff",
									padding: 4,
									marginLeft: "0.14rem",
								}}
								src={require("../../assets/logo.png")}
								alt="word-guesser-logo"
							/>
						</View>
						<View style={{ marginLeft: "0.85rem", flex: "1 1 0%", marginRight: 14 }}>
							<Text
								style={{
									fontSize: "0.875rem",
									fontWeight: 500,
									color: "#fff",
								}}
							>
								{message}
							</Text>
						</View>
					</View>
				</View>
			</View>
		)),
};
