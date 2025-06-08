const ENV = process.env.REACT_APP_API_URL || "development"

const config = {
	development: {
		API_URL: process.env.REACT_APP_API_URL || "https://cors-anywhere.herokuapp.com/https://random-word-api.herokuapp.com/",
		ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "true",
	},
	production: {
		API_URL: process.env.REACT_APP_API_URL  || "https://cors-anywhere.herokuapp.com/https://random-word-api.herokuapp.com/",
		ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "false",
	},
};

export default config[ENV];
