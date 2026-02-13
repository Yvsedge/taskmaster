import { useEffect, useState } from 'react'
import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

export default function App() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setInitializing(false);
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (initializing) return <div className="bg-black h-screen text-white flex items-center justify-center font-mono">Initializing Pokedex...</div>;

  return user ? <MainScreen /> : <LoginScreen />;
}
