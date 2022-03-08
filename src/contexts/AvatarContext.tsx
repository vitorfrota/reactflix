import { createContext, ReactNode, useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

type AvatarContextProviderProps = {
   children: ReactNode;
};

export type Avatar = {
   id: number;
   path: string;
};

type AvatarContextType = {
   avatars: Avatar[];
   error: boolean;
   loading: boolean;
};

export const AvatarContext = createContext({} as AvatarContextType);

export function AvatarContextProvider({
   children,
}: AvatarContextProviderProps) {
   const [avatars, setAvatars] = useState<Avatar[]>([]);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const storage = getStorage();

      const avatarsListRef = ref(storage, 'avatars/');

      listAll(avatarsListRef)
         .then((res) => {
            res.items.forEach((avatarRef, index) => {
               getDownloadURL(ref(storage, avatarRef.fullPath)).then((url) => {
                  setAvatars((state) => {
                     return [...state, { id: index, path: url }];
                  });
               });
            });
         })
         .catch(() => setError(true))
         .finally(() => setLoading(false));
   }, []);

   return (
      <AvatarContext.Provider
         value={{
            avatars,
            error,
            loading,
         }}
      >
         {children}
      </AvatarContext.Provider>
   );
}
