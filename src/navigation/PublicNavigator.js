import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "../pages/Home";
import { useAnimatedNavigation } from "../hooks/useAnimatedNavigation";

export default function PublicNavigator({ windowSize }) {
	const getAnimationVariants = useAnimatedNavigation();
	const animationVariants = getAnimationVariants();

	return (
		<div style={{ flex: 1, marginLeft: windowSize.width >= 1024 ? "80px" : 0 }}>
			<Routes>
				<Route
					index
					element={
						<motion.div
							key="giveaways"
							initial="initial"
							animate="animate"
							exit="exit"
							variants={animationVariants}
							style={{ height: "inherit", width: "inherit" }}
						>
							<Home windowSize={windowSize} />
						</motion.div>
					}
				/>
			</Routes>
		</div>
	);
}
