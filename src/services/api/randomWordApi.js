import axiosInstance from "./axiosConfig";
import endpoints from "./endpoints";

export const fetchRandomWord = async () => {
	const { data } = await axiosInstance.get(endpoints.word.random);

	console.log(data);

	return data;
};
