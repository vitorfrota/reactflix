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
   createUserWithEmailAndPassword,
   updateProfile,
} from 'firebase/auth';

import { auth } from '@/services/firebase';

type AuthContextProviderProps = {
   children: ReactNode;
};

type User = {
   id: string;
   name: string;
   email: string | null;
   avatar: string;
};

type Signin = {
   email: string;
   password: string;
};

type Signup = {
   name: string;
   email: string;
   password: string;
   cpassword: string;
};

type AuthContextType = {
   user: User | undefined;
   createUser: (formData: Signup) => Promise<void>;
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
   const [user, setUser] = useState<User | undefined>();

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
            const { uid } = user;
            setUser(_getUser(user));

            setIsLogged(true);
            localStorage.setItem('@habitio:isLogged', JSON.stringify(uid));
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
            throw new Error('E-mail ou senha incorreto');
         });
   }, []);

   const createUser = useCallback(async (formData: Signup) => {
      const { name, email, password } = formData;

      await createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            const { currentUser } = auth;

            if (currentUser) {
               updateProfile(currentUser, {
                  displayName: name,
                  photoURL: '',
               }).catch((_) => {
                  throw new Error('Houve um problema na criação da conta');
               });
            }

            if (user) {
               setUser(_getUser(user));
            }
         })
         .catch((_) => {
            throw new Error('Houve um problema na criação da conta');
         });
   }, []);

   const _getUser = useCallback((user: any) => {
      const { displayName, photoURL, uid, email } = user;

      const userData: User = {
         id: uid,
         name: displayName || '',
         email,
         avatar: photoURL || '',
      };
      return userData;
   }, []);

   const signOut = useCallback(async () => {
      await signOutGoogle(auth).then(() => {
         setUser(undefined);
         localStorage.removeItem('@reactflix:isLogged');
         setIsLogged(false);
      });
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            createUser,
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
