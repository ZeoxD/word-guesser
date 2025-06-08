import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import PublicNavigator from "./PublicNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateProfileDetails, updateUser } from "../store/userSlice";

const RootNavigator = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const dispatch = useDispatch();
	const user = useSelector(getUser);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const profileDetails = JSON.parse(localStorage.getItem("profileDetails"));
		dispatch(updateUser(user));
		dispatch(updateProfileDetails(profileDetails));
	}, []);

	const handleResize = useCallback(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	useEffect(() => {
		const resizeListener = () => {
			clearTimeout(window._resizeTimeout);
			window._resizeTimeout = setTimeout(handleResize, 200);
		};

		window.addEventListener("resize", resizeListener);
		return () => window.removeEventListener("resize", resizeListener);
	}, [handleResize]);

	return (
		<Router>
			<div
				style={{
					position: "relative",
					height: "100dvh",
					width: windowSize.width >= 1024 ? "100vw" : "100vw",
					overflow: "hidden",
				}}
			>
				<Navbar windowSize={windowSize} />
				<PublicNavigator windowSize={windowSize} />
				<Toaster position="bottom-center" reverseOrder={true} />
			</div>
		</Router>
	);
};

export default RootNavigator;
