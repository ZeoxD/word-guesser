import axios from "axios";
import config from "../../config/env";

const headers = {
	"Content-Type": "application/json",
	"App-Version": "1.0.0", // Custom app version (if needed)
	"Language": navigator.language, // User's browser language
};

// Detect Platform in Modern Browsers
if (navigator.userAgentData) {
	headers["Platform"] = navigator.userAgentData.platform; // Windows, macOS, Android, etc.
} else {
	// Fallback for older browsers
	headers["Platform"] = /Windows/.test(navigator.userAgent) ? "Windows" :
		/Mac/.test(navigator.userAgent) ? "macOS" :
		/Linux/.test(navigator.userAgent) ? "Linux" :
		"Unknown";
}

const axiosInstance = axios.create({
	baseURL: config.API_URL,
	timeout: 10000,
	headers,
});

export default axiosInstance;
