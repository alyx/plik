import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SerializableFile {
	name: string;
	size: number;
	type: string;
	url: string;
}

export interface UploadConfig {
	destructOnDownload: boolean;
	streaming: boolean;
	removable: boolean;
	passwordProtected: boolean;
	password: "";
	comment: "";
}

interface UploadState {
	files: SerializableFile[];
	config: UploadConfig;
}

export const upload = createSlice({
	name: "upload",
	reducers: {
		addFiles: (state, action: PayloadAction<SerializableFile[]>) => {
			state.files.push(...action.payload);
		},
		updateConfig: (state, action: PayloadAction<UploadConfig>) => {
			state.config = action.payload;
		},
	},
	initialState: { files: [], config: {} } as UploadState,
});

export const { addFiles, updateConfig } = upload.actions;
