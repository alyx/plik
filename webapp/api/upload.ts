import Axios from "axios";

interface UploadParams {
	oneshot: boolean;
	stream: boolean;
	removable: boolean;
	ttl: number;
	login: string;
	password: string;
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
export const getAndCreate = (params: UploadParams) => {
	return Axios.post<{
		id: string;
		uploadToken: string;
	}>("/upload", params);
};

/**
 * Get upload metadata (files list, upload date, ttl,...)
 * @param id
 * @returns
 */
export const getUploadMeta = (id: string) => {
	return Axios.get(`/upload/${id}`);
};

interface UploadOneParams {
	mode: string;
	uploadId: string;
	fileId: string;
	fileName: string;
}

/**
 * Request body must be a multipart request with a part named "file" containing file data.
 * @param param0
 * @returns
 */
export const uploadFileWithMode = ({ mode, uploadId, fileId, fileName }: UploadOneParams) => {
	return Axios.post(`/${mode}/${uploadId}/${fileId}/${fileName}`);
};

/**
 * Same as `uploadFileWithMode` without passing file id, won't work for stream mode.
 * @param uploadId
 * @returns
 */
export const uploadFile = (uploadId: string) => {
	return Axios.post(`/file/${uploadId}`);
};

/**
 * Quick mode, automatically create an upload with default parameters and add the file to it.
 */
export const uploadQuick = () => {
	return Axios.post("/");
};
