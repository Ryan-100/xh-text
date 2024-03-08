import httpClient from "./constant/HttpClient";
export * from "./constant/ApiRoutes";

const controller = async (endpoint, ...data) => {
	try {
		const api = endpoint.split(":");
		const client = httpClient[api[0]](api[1], ...data);
		const response = await client;
		return response;
	} catch (error) {
		const errorMessage =
			error.response?.data?.message?.[0] ||
			error.message ||
			"Something went wrong";
		error.message = errorMessage;
		return Promise.reject(error);
	}
};

export default controller;
