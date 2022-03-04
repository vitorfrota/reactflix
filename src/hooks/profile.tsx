import { useContext } from 'react';
import { ProfileContext } from '@/contexts/ProfilesContext';

export function useProfile() {
   const value = useContext(ProfileContext);

   return value;
}
