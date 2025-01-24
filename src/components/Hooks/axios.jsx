import axios from "axios";
import ls from "localstorage-slim";

let token = ls.get("Pilar9_Admin_Token");

const Instance = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
	headers: {
		Authorization: token,
	},
});

export default Instance;

// Do this after login
// axios.defaults.headers.Authorization = token
