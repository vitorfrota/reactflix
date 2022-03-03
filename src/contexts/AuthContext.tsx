import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import {
   GoogleAuthProvider,
   signInWithPopup,
   signInWithEmailAndPassword,
   signOut as signOutGoogle,
} from 'firebase/auth';

import { auth } from '@/services/firebase';

type AuthContextProviderProps = {
   children: ReactNode;
};

type User = {
   id: string;
   name: string;
   email: string | null;
   emailVerified: boolean;
   avatar: string;
};

type Signin = {
   email: string;
   password: string;
};

type AuthContextType = {
   user: User | undefined;
   isLogged: boolean;
   signInWithGoogle: () => Promise<void>;
   signInWithEmail: (formData: Signin) => Promise<void>;
   signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
   const [isLogged, setIsLogged] = useState(() => {
      return Boolean(localStorage.getItem('@reactflix:isLogged') || '');
   });
   const [user, setUser] = useState<User>({} as User);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
            const { uid } = user;
            setUser(_getUser(user));

            setIsLogged(true);
            localStorage.setItem('@reactflix:isLogged', JSON.stringify(uid));
         }
      });
      return () => {
         unsubscribe();
      };
   }, []);

   const signInWithGoogle = useCallback(async () => {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider).then(({ user }) => {
         if (user) {
            setUser(_getUser(user));
         }
      });
   }, []);

   const signInWithEmail = useCallback(async (formData: Signin) => {
      const { email, password } = formData;

      await signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            if (user) {
               setUser(_getUser(user));
            }
         })
         .catch((_) => {
            throw new Error('E-mail e/ou senha incorretos');
         });
   }, []);

   const _getUser = useCallback((user: any) => {
      const { displayName, photoURL, uid, email, emailVerified } = user;

      const userData: User = {
         id: uid,
         name: displayName || '',
         email,
         avatar: photoURL || '',
         emailVerified: emailVerified,
      };
      return userData;
   }, []);

   const signOut = useCallback(async () => {
      await signOutGoogle(auth).then(() => {
         setUser({} as User);
         localStorage.removeItem('@reactflix:isLogged');
         setIsLogged(false);
      });
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            isLogged,
            signInWithGoogle,
            signInWithEmail,
            signOut,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}
