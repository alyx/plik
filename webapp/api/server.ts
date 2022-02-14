import Axios from "axios";

/**
 * Show plik server version, and some build information (build host, date, git revision,...)
 * @returns
 */
export const getVersion = () => {
	return Axios.get("/version");
};

/**
 * Show plik server configuration (ttl values, max file size, ...)
 * @returns
 */
export const getConfig = () => {
	return Axios.get("/config");
};
