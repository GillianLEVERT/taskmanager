import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";


export default async function Index() {
  const canInitSupabaseClient = (): boolean => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <nav className="navbar">
      <h1>TaskManager</h1>
      {isSupabaseConnected && <AuthButton />}
    </nav>
  );
}
