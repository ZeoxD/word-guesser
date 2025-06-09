import axios from "axios";
import config from "../../config/env";

const headers = {
	"Content-Type": "application/json",
	"App-Version": "1.0.0",
	// Origin: "http://localhost:3000",
	Language: navigator.language,
};

if (navigator.userAgentData) {
	headers["Platform"] = navigator.userAgentData.platform;
} else {
	headers["Platform"] = /Windows/.test(navigator.userAgent)
		? "Windows"
		: /Mac/.test(navigator.userAgent)
		? "macOS"
		: /Linux/.test(navigator.userAgent)
		? "Linux"
		: "Unknown";
}

const axiosInstance = axios.create({
	baseURL: config.API_URL,
	timeout: 10000,
	headers,
});

export default axiosInstance;
