import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, ThunkAppDispatch } from "./";

export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook to enable asynchronous app dispatch.
 */
export const useThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
