export const setItem = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error("Error setting item:", error);
	}
};

export const getItem = (key) => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		console.error("Error getting item:", error);
	}
};

export const removeItem = (key) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error("Error removing item:", error);
	}
};
