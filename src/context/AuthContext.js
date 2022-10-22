import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../utils/firebase/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(); //first we dont get anything once login, we see authenticated user

  useEffect(() => {
    //we create this to check user is there or not for that we pass onAuth...(firebasefunction)
    const unsub = onAuthStateChanged(auth, (user) => {
      //pass auth and user. if user is there then setUser to user.
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
