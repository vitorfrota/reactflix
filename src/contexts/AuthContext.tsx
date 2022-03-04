import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import { useLocation } from 'react-router-dom';
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
   errorMessage: string | null;
   loading: boolean;
   isLogged: boolean;
   signInWithGoogle: () => Promise<void>;
   signInWithEmail: (formData: Signin) => Promise<void>;
   signOut: () => void;
   user: User | undefined;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
   const location = useLocation();

   const [isLogged, setIsLogged] = useState(() => {
      return Boolean(localStorage.getItem('@reactflix:isLogged') || '');
   });
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const [user, setUser] = useState<User>({} as User);

   useEffect(() => {
      const { pathname } = location;

      if (pathname !== '/signin') {
         setErrorMessage(null);
      }
   }, [location.pathname]);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
            setUser(_getUser(user));
            setIsLogged(true);
            localStorage.setItem(
               '@reactflix:isLogged',
               JSON.stringify(user.uid)
            );
         }
      });
      return () => unsubscribe();
   }, []);

   const signInWithGoogle = useCallback(async () => {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider).then(
         ({ user }) => user && setUser(_getUser(user))
      );
   }, []);

   const signInWithEmail = useCallback(async (formData: Signin) => {
      const { email, password } = formData;

      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            if (user) {
               setUser(_getUser(user));
               setErrorMessage(null);
            }
         })
         .catch(() =>
            setErrorMessage('E-mail e/ou senha incorretos. Tente novamente.')
         )
         .finally(() => setLoading(false));
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
      await signOutGoogle(auth)
         .then(() => {
            setUser({} as User);
            localStorage.clear();
         })
         .finally(() => setIsLogged(false));
   }, []);

   return (
      <AuthContext.Provider
         value={{
            errorMessage,
            isLogged,
            loading,
            signInWithGoogle,
            signInWithEmail,
            signOut,
            user,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}
