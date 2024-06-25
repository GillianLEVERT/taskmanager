"use client";

import { createClient } from "@/utils/supabase/client";
import "../app/login/login.css"


export default function LoginClient() {
  const supabase = createClient();

  const signInWithGithub = async () => {
    console.log("signInWithGithub called");

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      console.error("Error during GitHub sign-in:", error);
      window.location.href = "/login?message=Could not authenticate with GitHub";
    } else {
      console.log("GitHub sign-in initiated:", data);

    }
  };

  return (
    <button
      type="button"
      onClick={signInWithGithub}
      className="login-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="logo-github"
      >
        <path d="M12 1C5.925 1 1 5.925 1 12c0 4.867 3.163 8.986 7.579 10.436.55.102.748-.238.748-.53 0-.261-.01-1.135-.015-2.059-3.085.563-3.732-1.313-3.732-1.313-.501-1.273-1.223-1.613-1.223-1.613-.998-.683.076-.669.076-.669 1.104.078 1.684 1.133 1.684 1.133.98 1.682 2.57 1.196 3.194.914.098-.71.384-1.196.699-1.47-2.464-.28-5.053-1.233-5.053-5.486 0-1.212.434-2.203 1.144-2.978-.115-.28-.496-1.409.108-2.939 0 0 .933-.297 3.06 1.14.887-.247 1.839-.37 2.784-.375.946.005 1.898.128 2.785.375 2.126-1.437 3.058-1.14 3.058-1.14.605 1.53.224 2.66.109 2.939.71.775 1.144 1.766 1.144 2.978 0 4.263-2.594 5.202-5.066 5.478.395.34.746 1.009.746 2.033 0 1.469-.014 2.656-.014 3.015 0 .293.197.636.754.529C19.839 20.985 23 16.867 23 12c0-6.075-4.925-11-11-11z"></path>
      </svg>
      Connexion avec GitHub
    </button>
  );
}
