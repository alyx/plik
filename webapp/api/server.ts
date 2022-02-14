import Axios from "axios";

import { ENDPOINT } from "./endpoint";

/**
 * Show plik server version, and some build information (build host, date, git revision,...)
 * @returns
 */
export const getVersion = () => {
	return Axios.get<{ version: string }>(`${ENDPOINT}/version`).then(res => res.data);
};

/**
 * Show plik server configuration (ttl values, max file size, ...)
 * @returns
 */
export const getConfig = () => {
	return Axios.get(`${ENDPOINT}/config`);
};
