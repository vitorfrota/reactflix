import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import { ref, push, onValue, update, remove } from 'firebase/database';
import {
   getStorage,
   ref as storageRef,
   listAll,
   getDownloadURL,
} from 'firebase/storage';

import { useAuth } from '@/hooks/auth';
import { db } from '@/services/firebase';
import { useNavigate } from 'react-router-dom';

type ProfileContextProviderProps = {
   children: ReactNode;
};

type Avatar = {
   id: number;
   path: string;
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
   avatars: Avatar[];
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

   const [avatars, setAvatars] = useState<Avatar[]>([]);
   const [loading, setLoading] = useState(true);

   const [profiles, setProfiles] = useState<Profile[]>([]);
   const [currentProfile, setCurrentProfile] = useState<Profile>({} as Profile);

   useEffect(() => {
      const storage = getStorage();

      const avatarsListRef = storageRef(storage, 'avatars/');

      listAll(avatarsListRef)
         .then((res) => {
            res.items.forEach((itemRef, index) => {
               getDownloadURL(storageRef(storage, itemRef.fullPath)).then(
                  (url) => {
                     setAvatars((state) => {
                        return [...state, { id: index, path: url }];
                     });
                  }
               );
            });
         })
         .catch((error) => {
            console.log('Erro em nosso sistema :(');
         });
   }, []);

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
   }, [user]);

   useEffect(() => {
      const currentProfileId = localStorage.getItem(
         '@reactflix:currentProfile'
      );

      if (!currentProfileId) navigate('/browse');

      if (profiles.length > 0) {
         const profileEncountered = profiles.find(
            (profile) => profile.id === currentProfileId
         );

         if (profileEncountered) {
            setCurrentProfile(profileEncountered);
         }
      }
   }, [profiles]);

   const createProfile = useCallback(
      async (formData: ProfileFormData) => {
         // prevent user create more than 4 profiles
         if (profiles.length >= 4) return;
         try {
            const { name, avatar } = formData;

            const key = push(ref(db, 'user-profiles/' + user?.id), {
               name,
               avatar,
            }).key;

            if (key) {
               const newProfile = {
                  id: key,
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

      if (!!profileEncountered) {
         setCurrentProfile(profileEncountered);

         localStorage.setItem(
            '@reactflix:currentProfile',
            profileEncountered.id
         );
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
         remove(ref(db, `/user-profiles/${user?.id}/${profileId}`))
            .then(() => {
               const filteredProfiles = profiles.filter(
                  (profile) => profile.id !== profileId
               );

               setProfiles(filteredProfiles);
            })
            .catch((_) => {
               new Error('Não foi possível deletar o perfil :(');
            });
      },
      [profiles]
   );

   return (
      <ProfileContext.Provider
         value={{
            avatars,
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
