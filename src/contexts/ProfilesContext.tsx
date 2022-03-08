import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push, onValue, update, remove } from 'firebase/database';

import { useAuth } from '@/hooks/auth';
import { db } from '@/services/firebase';

const LOCAL_STORAGE_KEY = '@reactflix:currentProfile';

type ProfileContextProviderProps = {
   children: ReactNode;
};

type Profile = {
   id: string;
   name: string;
   avatar: string;
};

type ProfileFormData = {
   name: string;
   avatar: string;
};

type ProfileContextType = {
   createProfile: (formData: ProfileFormData) => Promise<void>;
   currentProfile: Profile;
   deleteProfile: (profileId: string) => Promise<void>;
   loading: boolean;
   profiles: Profile[];
   selectProfile: (profileId: string) => void;
   updateProfile: (
      profileId: string,
      formData: ProfileFormData
   ) => Promise<void>;
};

export const ProfileContext = createContext({} as ProfileContextType);

export function ProfileContextProvider({
   children,
}: ProfileContextProviderProps) {
   const navigate = useNavigate();
   const { user } = useAuth();

   const [loading, setLoading] = useState(true);
   const [profiles, setProfiles] = useState<Profile[]>([]);
   const [currentProfile, setCurrentProfile] = useState<Profile>(() => {
      const storedProfileId = localStorage.getItem(LOCAL_STORAGE_KEY);

      const profileEncountered = profiles.find(
         (profile) => profile.id === storedProfileId
      );

      if (profileEncountered) return profileEncountered;

      return {} as Profile;
   });

   useEffect(() => {
      if (!currentProfile.id) navigate('/browse');
   }, [currentProfile]);

   useEffect(() => {
      if (user) {
         onValue(
            ref(db, 'user-profiles/' + user.id),
            (snapshot) => {
               if (snapshot.val()) {
                  const parsedProfiles = Object.entries(snapshot.val()).map(
                     ([key, value]: any) => {
                        return {
                           id: key,
                           name: value.name,
                           avatar: value.avatar,
                        };
                     }
                  );
                  setProfiles(parsedProfiles);
               }
               setLoading(false);
            },
            { onlyOnce: true }
         );
      }

      return () => {
         setCurrentProfile({} as Profile);
         setProfiles([]);
      };
   }, [user]);

   const createProfile = useCallback(
      async (formData: ProfileFormData) => {
         // prevent user create more than 4 profiles
         if (profiles.length >= 4) return;
         try {
            const { name, avatar } = formData;

            const newProfileId = push(ref(db, 'user-profiles/' + user?.id), {
               name,
               avatar,
            }).key;

            if (newProfileId) {
               const newProfile = {
                  id: newProfileId,
                  name,
                  avatar,
               };

               setProfiles([...profiles, newProfile]);
               navigate(-1);
            }
         } catch (e) {
            console.error(e);
         }
      },
      [user, profiles]
   );

   const selectProfile = (profileId: string) => {
      const profileEncountered = profiles.find(
         (profile) => profile.id === profileId
      );

      if (profileEncountered) {
         setCurrentProfile(profileEncountered);
         localStorage.setItem(LOCAL_STORAGE_KEY, profileEncountered.id);

         navigate('/explore');
      }
   };

   const updateProfile = useCallback(
      async (profileId: string, formData: ProfileFormData) => {
         try {
            const profileExists = profiles
               .map((profile) => profile.id)
               .includes(profileId);

            if (profileExists) {
               let updates: any = {};
               updates['/user-profiles/' + user?.id + '/' + profileId] =
                  formData;

               await update(ref(db), updates);

               const profileUpdated = {
                  id: profileId,
                  ...formData,
               };

               const filteredProfiles = profiles.filter(
                  (profile) => profile.id !== profileId
               );

               setProfiles([...filteredProfiles, profileUpdated]);
            }
         } catch (_) {
            new Error('Não foi possível atualizar o perfil. :(');
         }
      },
      [user, profiles]
   );

   const deleteProfile = useCallback(
      async (profileId: string) => {
         setLoading(true);

         await remove(ref(db, `/user-profiles/${user?.id}/${profileId}`))
            .then(() => {
               const filteredProfiles = profiles.filter(
                  (profile) => profile.id !== profileId
               );
               setProfiles(filteredProfiles);
            })
            .catch((_) => {
               new Error('Não foi possível deletar o perfil :(');
            })
            .finally(() => setLoading(false));
      },
      [profiles]
   );

   return (
      <ProfileContext.Provider
         value={{
            createProfile,
            currentProfile,
            deleteProfile,
            loading,
            profiles,
            selectProfile,
            updateProfile,
         }}
      >
         {children}
      </ProfileContext.Provider>
   );
}
