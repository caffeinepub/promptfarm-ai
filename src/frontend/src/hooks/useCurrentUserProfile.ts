import { useGetCallerUserProfile } from './useQueries';

export function useCurrentUserProfile() {
  return useGetCallerUserProfile();
}
