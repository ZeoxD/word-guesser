const ENV = process.env.REACT_APP_API_URL || "development";

const config = {
	development: {
		API_URL: process.env.REACT_APP_API_URL || "https://cors-anywhere.herokuapp.com/https://random-word-api.herokuapp.com/",
		// API_URL: process.env.REACT_APP_API_URL || "https://api.allorigins.win/raw?url=https://random-word-api.vercel.app/",
		// API_URL: process.env.REACT_APP_API_URL || "https://api.allorigins.win/raw?url=https%3A%2F%2Frandom-word-api.vercel.app",
		ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "true",
	},
	production: {
		API_URL:
			process.env.REACT_APP_API_URL || "https://cors-anywhere.herokuapp.com/https://random-word-api.herokuapp.com/",
		ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "false",
	},
};

export default config[ENV];
