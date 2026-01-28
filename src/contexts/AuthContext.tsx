import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, mockUsers, mockUserProfiles } from '../lib/mockData';

interface AuthContextType {
  user: { id: string; email: string } | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  const signIn = async (email: string, password: string) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { error: new Error('Invalid email or password') };
    }

    const profile = mockUserProfiles.find((p) => p.id === foundUser.id);

    setUser({ id: foundUser.id, email: foundUser.email });
    setUserProfile(profile || null);

    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
