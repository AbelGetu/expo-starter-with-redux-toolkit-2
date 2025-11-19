import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch, PersistedRootState } from '../index';

// For components that need access to the full state (including persisted parts)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// For components that need to access the auth state specifically
export const useAuth = () => {
  const auth = useSelector((state: PersistedRootState) => state.auth);
  return auth;
};