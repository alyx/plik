import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UploadConfig {
	destructOnDownload: boolean;
	streaming: boolean;
	removable: boolean;
	passwordProtected: boolean;
	password: "";
}

interface UploadState {
	files: string[];
	config: UploadConfig;
}

export const upload = createSlice({
	name: "upload",
	reducers: {
		addFiles: (state, action: PayloadAction<string[]>) => {
			state.files = action.payload;
		},
		updateConfig: (state, action: PayloadAction<UploadConfig>) => {
			state.config = action.payload;
		},
	},
	initialState: { files: [], config: {} } as UploadState,
});

export const { addFiles, updateConfig } = upload.actions;
