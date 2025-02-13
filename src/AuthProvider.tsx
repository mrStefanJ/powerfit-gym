import { createContext, useState, useEffect } from "react";
import { User } from "./types/User";
import { auth } from "./firebase/configuration";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext<{
  user: User | null;
  register: (newUser: User) => Promise<{ success: boolean; message: string }>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logOut: () => void;
}>({
  user: null,
  register: async () => ({ success: false, message: "" }),
  login: async () => ({ success: false, message: "" }),
  logOut: () => {},
});

const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for logged-in user in localStorage on initial load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          firstName: "",
          lastName: "",
          email: currentUser.email || "",
          password: "",
          birthDate: "",
          gender: "",
          image: "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Register a new user
  const register = async (newUser: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      setUser({ ...newUser, id: userCredential.user.uid });
      return { success: true, message: "User registered successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };
  // Login user
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Login successful" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };
  // Logout
  const logOut = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
