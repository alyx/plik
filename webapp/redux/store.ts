import {
	Action,
	combineReducers,
	configureStore,
	Middleware,
	ThunkDispatch,
} from "@reduxjs/toolkit";

const reducer = combineReducers({});

export const createStore = ({
	preloadedState,
	middleware,
}: {
	preloadedState?: Partial<RootState>;
	middleware?: Middleware<any, RootState>[];
}) =>
	configureStore({
		reducer,
		preloadedState,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware ?? []),
	});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
