import Axios from "axios";

import { ENDPOINT } from "./endpoint";

interface UploadParams {
	oneshot?: boolean;
	stream?: boolean;
	removable?: boolean;
	ttl: number;
	login?: string;
	password?: string;
	files: {
		fileName: string;
		fileSize: number;
		fileType: string;
		reference: string;
	}[];
}

/**
 * Get and create upload
 * @param params
 * @returns
 */
export const createAndUpload = (params: UploadParams) => {
	return Axios.post<{
		id: string;
		uploadToken: string;
		files: { id: string }[];
	}>(`${ENDPOINT}/upload`, params);
};

/**
 * Get upload metadata (files list, upload date, ttl,...)
 * @param id
 * @returns
 */
export const getUploadMeta = (id: string) => {
	return Axios.get(`${ENDPOINT}/upload/${id}`);
};

interface UploadOneParams {
	mode: string;
	uploadId: string;
	fileId: string;
	fileName: string;
	uploadToken: string;
	url: string;
}

/**
 * Request body must be a multipart request with a part named "file" containing file data.
 * @param param0
 * @returns
 */
export const uploadFileWithMode = async ({
	mode,
	uploadId,
	fileId,
	fileName,
	url,
	uploadToken,
}: UploadOneParams) => {
	const blob = await fetch(url).then(r => r.blob());
	// create multipart upload
	const data = new FormData();
	data.append("Content-Disposition", "form-data");
	data.append("name", "file");
	data.append("filename", fileName);
	data.append("Content-Type", blob.type);

	return Axios.post(`${ENDPOINT}/${mode}/${uploadId}/${fileId}/${fileName}`, blob, {
		headers: {
			"Content-Type": "multipart/form-data",
			"X-Upload-Token": uploadToken,
		},
	});
};

/**
 * Same as `uploadFileWithMode` without passing file id, won't work for stream mode.
 * @param uploadId
 * @returns
 */
export const uploadFile = (uploadId: string) => {
	return Axios.post(`${ENDPOINT}/file/${uploadId}`);
};

/**
 * Quick mode, automatically create an upload with default parameters and add the file to it.
 */
export const uploadQuick = () => {
	return Axios.post(`${ENDPOINT}/`);
};
