"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import "../app/login/login.css";

export default function AuthButtonClient() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setDisplayName(user.user_metadata.full_name || user.email);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          setDisplayName(
            session.user.user_metadata.full_name || session.user.email
          );
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setDisplayName(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  console.log("User object:", user);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return user ? (
    <div className="login-container">
      Salut {displayName || user.email} et bienvenue.
      <Link href="/task" className="btn-primary">Accéder à vos tâches</Link>
      <button onClick={signOut} className="btn-secondary">
        Se déconnecter
      </button>
    </div>
  ) : (
    <div className="login-container">
      Veuillez vous connecter pour gérer vos tâches.
      <Link href="/login" className="btn-primary">
        Se connecter
      </Link>
    </div>
  );
}
