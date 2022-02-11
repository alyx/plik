import {
	Action, combineReducers, configureStore, Middleware, ThunkDispatch
} from "@reduxjs/toolkit";

import { upload } from "./slices/upload";

const reducer = combineReducers({
	upload: upload.reducer,
});

export const createStore = ({ middleware }: { middleware?: Middleware<any, RootState>[] }) =>
	configureStore({
		reducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware ?? []),
	});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
