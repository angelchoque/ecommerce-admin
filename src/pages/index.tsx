import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <button
          onClick={() => {
            signIn("google");
          }}
        >
          Entrar
        </button>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi {session.user?.name}
    </main>
  );
}
