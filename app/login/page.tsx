import Link from "next/link";
import LoginClient from "../../components/LoginClient";
import "../login/login.css"

interface LoginProps {
  searchParams: { message: string };
}

export default function Login({ searchParams }: LoginProps) {
  return (
    <div className="login-container">
      <div className="">
        <LoginClient />
        {searchParams?.message && <p className="">{searchParams.message}</p>}
      </div>
      <Link href="/" className="back-button hover:text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Revenir à l'accueil
      </Link>
    </div>
  );
}
