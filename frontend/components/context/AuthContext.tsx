import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseApp from "../../lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";

export interface AuthContextProps {
  user?: User;
  username?: string;
  isUsernameLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUsername: (username: string) => void;
  refetchUsername: () => Promise<QueryObserverResult<any, Error>>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const firebaseAuth = getAuth(firebaseApp);

async function getUsername(userId: string) {
  const response = await fetch(`${BACKEND_URL}/api/users/${userId}`);
  const data = await response.json();
  console.log(data);
  if (!data.username) {
    throw new Error("Username not found");
  }
  return data.username;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState<string>();

  const {
    data: backendUsername,
    isLoading: isUsernameLoading,
    refetch,
  } = useQuery({
    queryKey: ["username", user?.uid],
    queryFn: () => getUsername(user.uid),
    enabled: user !== undefined,
  });

  useEffect(() => {
    // load current user to context
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    // listen for auth state changes
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setUsername((await AsyncStorage.getItem("username")) ?? undefined);
      } else {
        setUser(undefined);
        setUsername(undefined);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (
      user !== undefined &&
      username === undefined &&
      backendUsername !== undefined
    ) {
      console.info("Setting username from backend");
      setUsername(backendUsername);
    }
  }, [user, username, backendUsername]);

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

  const updateUsername = async (username: string) => {
    AsyncStorage.setItem("username", username);
    setUsername(username);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isUsernameLoading,
        user,
        username,
        setUsername: updateUsername,
        refetchUsername: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
