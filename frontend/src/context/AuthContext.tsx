import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/auth";
interface UserProfile {
  uid: string;
  email: string;
  role: "user" | "admin";
  onboarded: boolean;
}
interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Fetch the role from your backend
          const token = await firebaseUser.getIdToken();
          const response = await fetch("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);