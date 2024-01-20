import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseApp from "../../lib/firebase";

export interface AuthContextProps {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const firebaseAuth = getAuth(firebaseApp);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // load current user to context
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    // listen for auth state changes
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    setUser(credential.user);
  };

  const signIn = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    setUser(credential.user);
  };

  const signOut = async () => {
    await firebaseAuth.signOut();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
