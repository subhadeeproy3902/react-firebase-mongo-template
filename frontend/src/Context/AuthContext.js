// AuthContext.js
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newRandomAvatar = getDefaultAvatar();
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: newRandomAvatar,
    });
    return userCredential;
  }

  function logout() {
    return signOut(auth);
  }

  const [isSigningIn, setIsSigningIn] = useState(false);

  async function googleSignUp() {
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await updateProfile(user, { photoURL: user.photoURL });
      setIsSigningIn(false);
    } catch (error) {
      setIsSigningIn(false);
    }
  }
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, login, signup, logout, googleSignUp, isSigningIn };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

function getDefaultAvatar() {
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomString = Array.from(
      { length: 10 },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
    return randomString;
  };
  const randomString = generateRandomString();
  return `https://robohash.org/${randomString}.png`;
}