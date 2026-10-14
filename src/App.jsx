import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useMatches } from "./hooks/useMatches";

export default function App() {
  const { user, loading, error, login, logout, configured } = useAuth();
  const matchesState = useMatches(user);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-100 text-slate-700">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={login} error={error} configured={configured} />;
  }

  return (
    <Dashboard
      user={user}
      onLogout={logout}
      matches={matchesState.matches}
      loading={matchesState.loading}
      error={matchesState.error}
      savingId={matchesState.savingId}
      seeding={matchesState.seeding}
      onSeed={matchesState.seedMatches}
      onSave={matchesState.saveScore}
    />
  );
}
