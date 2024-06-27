"use client";

import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
import "./signup.css"

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setError('Vérifier votre email pour valider votre compte.');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Création de votre compte.</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />
        <button
          type="submit"
          className="signup-button"
        >
          Créer son compte
        </button>
      </form>
      {error && <p className="signup-error">{error}</p>}
      <p className="signup-login-link">
        Vous avez déjà un compte ?{' '}
        <Link href="/login" >
          Se connecter
        </Link>
      </p>
    </div>
  );
}