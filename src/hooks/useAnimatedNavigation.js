import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useAnimatedNavigation() {
	const { pathname } = useLocation();
	const [pathStack, setPathStack] = useState(["/"]);

	useEffect(() => {
		setPathStack((prevStack) => {
			const newStack = [...prevStack];
			const stackTop = newStack[newStack.length - 1];

			if (pathname === "/") return ["/"];

			if (pathname !== stackTop) {
				if (!newStack.includes(pathname)) {
					newStack.push(pathname);
				} else {
					const index = newStack.indexOf(pathname);
					return newStack.slice(0, index + 1);
				}
			}

			return newStack;
		});
	}, [pathname]);

	const getAnimationVariants = () => {
		const stackTop = pathStack[pathStack.length - 1];
		if (pathname === stackTop) return pageVariantsRight;
		else if (pathStack.includes(pathname)) return pageVariantsLeft;
		return pageVariantsRight;
	};

	return getAnimationVariants;
}

const pageVariantsLeft = {
	initial: { opacity: 1, x: "-100%" },
	animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
	exit: { opacity: 1, x: "0%", transition: { type: "spring", stiffness: 200, damping: 20 } },
};

const pageVariantsRight = {
	initial: { opacity: 1, x: "100%" },
	animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
	exit: { opacity: 1, x: "0%", transition: { type: "spring", stiffness: 200, damping: 20 } },
};