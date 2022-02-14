import Axios from "axios";

import { ENDPOINT } from "./endpoint";
import { ModeUploadFile } from "./types";

/**
 * Returns only HTTP headers. Useful to know Content-Type and Content-Length without downloading the file.
 * Especially if upload has OneShot option enabled.
 * @param param0
 * @returns
 */
export const getFileHeaders = ({ mode, uploadId, fileId, fileName }: ModeUploadFile) => {
	return Axios.head(`${ENDPOINT}/${mode}/${uploadId}/${fileId}/${fileName}`);
};

/**
 * Download file. Filename MUST match. A browser, might try to display the file if it's a jpeg for example.
 * You may try to force download with ?dl=1 in url.
 */
export const downloadFile = ({
	mode,
	uploadId,
	fileId,
	fileName,
	force = false,
}: ModeUploadFile & { force?: boolean }) => {
	return Axios.get(`${ENDPOINT}/${mode}/${uploadId}/${fileId}/${fileName}`, {
		responseType: "blob",
		params: { dl: force ? 1 : undefined },
	});
};

/**
 * Download uploaded files in a zip archive. :filename: must end with .zip
 * @param param0
 * @returns
 */
export const downloadArchive = ({ uploadId, fileId }: { uploadId: string; fileId: string }) => {
	// do some client-side validation
	if (!fileId.endsWith(".zip")) {
		throw new Error("fileId must end with .zip");
	}
	return Axios.get(`${ENDPOINT}/archive/${uploadId}/${fileId}`, { responseType: "blob" });
};

/**
 * Delete file. Upload MUST have "removable" option enabled.
 * @param param0
 * @returns
 */
export const deleteFile = ({ mode, uploadId, fileId, fileName }: ModeUploadFile) => {
	return Axios.delete(`${ENDPOINT}/${mode}/${uploadId}/${fileId}/${fileName}`);
};

export const getQrcode = ({ url, size }: { url: string; size: number }) => {
	if (size > 1000) {
		throw new Error("size must be <= 10000");
	}
	return Axios.get(`${ENDPOINT}/qrcode?url=${url}&size=${size}`);
};
