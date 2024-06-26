import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = "https://taskmanager-self-gamma.vercel.app";


export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TaskManager",
  description: "Gestionnaire de tâche pour noob",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="">
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
