import React from "react";
import "./App.css";
import RootNavigator from "./navigation/RootNavigator";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
	return (
		<Provider store={store}>
			<RootNavigator />
		</Provider>
	);
}
