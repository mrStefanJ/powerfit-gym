import React, { createContext, useState, useEffect } from "react";
import { User } from "./types/User";
  
  const AuthContext = createContext<{
    user: User | null;
    register: (newUser: User) => { success: boolean; message: string };
    login: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => { success: boolean; message: string };
    logOut: () => void;
  }>({
    user: null,
    register: () => ({ success: false, message: '' }),
    login: () => ({ success: false, message: '' }),
    logOut: () => {},
  });
  

const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);

  // Check for logged-in user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (newUser: any) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("gymRegisteredUsers") || "[]"
    );
    const userExists = registeredUsers.some(
      (user: any) => user.email === newUser.email
    );

    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    registeredUsers.push(newUser);
    localStorage.setItem("gymRegisteredUsers", JSON.stringify(registeredUsers));
    return { success: true, message: "User registered successfully" };
  };

  const login = ({ email, password }: { email: string; password: string }) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("gymRegisteredUsers") || "[]"
    );
    const foundUser = registeredUsers.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return { success: true, message: "Login successful" };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
