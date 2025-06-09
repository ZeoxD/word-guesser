import { Image, Text, TextInput, TouchableOpacity, View, ToastWeb, ScrollView } from "../components/layout/react-web";
import React, { useRef, useEffect, useState } from "react";
import { fetchRandomWord } from "../services/api/randomWordApi";

export default function Home() {
	const [alphabets, setAlphabets] = useState([
		{ letter: "A", isPressed: false },
		{ letter: "B", isPressed: false },
		{ letter: "C", isPressed: false },
		{ letter: "D", isPressed: false },
		{ letter: "E", isPressed: false },
		{ letter: "F", isPressed: false },
		{ letter: "G", isPressed: false },
		{ letter: "H", isPressed: false },
		{ letter: "I", isPressed: false },
		{ letter: "J", isPressed: false },
		{ letter: "K", isPressed: false },
		{ letter: "L", isPressed: false },
		{ letter: "M", isPressed: false },
		{ letter: "N", isPressed: false },
		{ letter: "O", isPressed: false },
		{ letter: "P", isPressed: false },
		{ letter: "Q", isPressed: false },
		{ letter: "R", isPressed: false },
		{ letter: "S", isPressed: false },
		{ letter: "T", isPressed: false },
		{ letter: "U", isPressed: false },
		{ letter: "V", isPressed: false },
		{ letter: "W", isPressed: false },
		{ letter: "X", isPressed: false },
		{ letter: "Y", isPressed: false },
		{ letter: "Z", isPressed: false },
	]);
	const [chosenLetters, setChosenLetters] = useState([]);
	const [guessWord, setGuessWord] = useState([]);
	const [hasGuessed, setHasGuessed] = useState(false);
	const [attemptLog, setAttemptLog] = useState([]);
	const scrollRef = useRef(null);

	useEffect(() => {
		const fetchWord = async () => {
			try {
				let word = "";
				do {
					const response = await fetchRandomWord();
					word = response[0];
				} while (word.length < 7 || word.length > 10);
				setGuessWord([...word.split("")]);
			} catch (error) {
				console.log(error);
				setGuessWord([..."applebees".split("")]);
			}
		};

		fetchWord();
	}, []);

	const handleKeyPress = (letter) => {
		if (chosenLetters.includes(letter.toLowerCase())) return;

		const newChosenLetters = [...chosenLetters, letter.toLowerCase()];
		const remaining = getRemainingLettersCount(guessWord, newChosenLetters);

		setChosenLetters(newChosenLetters);
		setAlphabets((prev) => prev.map((value) => (value.letter === letter ? { ...value, isPressed: true } : value)));

		setAttemptLog((prev) => [...prev, { attempt: prev.length + 1, letter: letter.toUpperCase(), remaining }]);
	};

	const hasPlayerGuessed = (word1, word2) => {
		const chosenSet = new Set(word1);
		const guessSet = new Set(word2);

		if (chosenSet.size === 0) return false;

		for (let letter of guessSet) {
			if (!chosenSet.has(letter)) {
				return false;
			}
		}
		return true;
	};

	const getRemainingLettersCount = (guessWord, chosenLetters) => {
		let count = 0;
		const chosenSet = new Set(chosenLetters);

		for (let letter of guessWord) {
			if (chosenSet.has(letter)) {
				count++;
			}
		}
		return guessWord.length - count;
	};

	useEffect(() => {
		setHasGuessed(hasPlayerGuessed(chosenLetters, guessWord));
	}, [chosenLetters]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [attemptLog]);

	return (
		<View
			style={{
				height: "98vh",
				width: "inherit",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "row",
			}}
		>
			<View>
				<Text style={{ fontSize: "1.2rem", fontWeight: "500" }}>Guess the following word</Text>
				<View
					style={{
						height: "120px",
						width: "800px",
						flexDirection: "row",
						gap: 4,
						alignItems: "center",
					}}
				>
					{guessWord.map((val, index) => (
						<View
							key={index}
							style={{
								height: "64px",
								width: "64px",
								backgroundColor: "gold",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 14,
							}}
						>
							<Text
								style={{
									fontWeight: "500",
									fontSize: "1.25rem",
									color: chosenLetters.includes(val) ? "#000" : "gold",
								}}
							>
								{val.toUpperCase()}
							</Text>
						</View>
					))}
				</View>
				<Text style={{ fontSize: "1.2rem", fontWeight: "500" }}>
					Choose a letter that can be used in the above word.
				</Text>
				<View
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(9, 72px)",
						rowGap: "4px",
						columnGap: "6px",
					}}
				>
					{alphabets.map((val, index) => (
						<TouchableOpacity
							key={index}
							onPress={hasGuessed ? null : () => handleKeyPress(val.letter)}
							style={{
								height: "72px",
								width: "72px",
								justifyContent: "center",
								alignItems: "center",
								border: "1px solid #ddd",
								backgroundColor: val.isPressed ? "#aaa" : "#efedf6",
							}}
						>
							<Text style={{ fontWeight: "600", fontSize: "1.4rem", color: val.isPressed ? "#fff" : "#000" }}>
								{val.letter}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{hasGuessed && guessWord.length > 0 && (
					<View
						style={{
							height: "72px",
							width: "88%",
							backgroundColor: "green",
							borderRadius: 20,
							marginTop: 32,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontSize: "1.2rem", fontWeight: "500", color: "#fff" }}>
							Congrats! You guessed {guessWord.join("").toUpperCase()} in {chosenLetters.length} attempts.
						</Text>
					</View>
				)}
			</View>
			<View ref={scrollRef} style={{ height: "500px", width: "400px", overflowY: "auto" }}>
				<View
					style={{
						backgroundColor: "darkblue",
						flexDirection: "row",
						minHeight: "60px",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: "#fff",
							width: "40%",
							textAlign: "center",
						}}
					>
						Attempts
					</Text>
					<Text style={{ color: "#fff", width: "60%", textAlign: "center" }}>Remaining Characters</Text>
				</View>
				{chosenLetters.length < 1 && (
					<View
						style={{
							backgroundColor: "#F0F6FB",
							flexDirection: "row",
							minHeight: "60px",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: "#000",
								width: "40%",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							0
						</Text>
						<Text style={{ color: "#000", width: "60%", textAlign: "center", fontWeight: "500" }}>
							{guessWord.length}
						</Text>
					</View>
				)}
				{attemptLog.map((log, index) => (
					<View
						key={log.attempt + index}
						style={{
							backgroundColor: "#F0F6FB",
							flexDirection: "row",
							minHeight: "60px",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: "#000",
								width: "40%",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							{log.attempt}
						</Text>
						<Text style={{ color: "#000", width: "60%", textAlign: "center", fontWeight: "500" }}>{log.remaining}</Text>
					</View>
				))}
			</View>
		</View>
	);
}
