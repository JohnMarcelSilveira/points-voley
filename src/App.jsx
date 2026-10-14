import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { useAuth } from "./hooks/useAuth";
import { useMatches } from "./hooks/useMatches";

export default function App() {
  const { user, role, loading, error, login, logout, configured } = useAuth();
  const matchesState = useMatches(user);
  const [showAdminScreen, setShowAdminScreen] = useState(false);

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

  if (role === "admin" && showAdminScreen) {
    return (
      <AdminDashboard
        user={user}
        onLogout={logout}
        onBack={() => setShowAdminScreen(false)}
        teams={matchesState.teams}
        matches={matchesState.matches}
        seeding={matchesState.seeding}
        error={matchesState.error}
        onSeed={matchesState.seedMatches}
        onSaveTeams={matchesState.saveTeams}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      role={role}
      onLogout={logout}
      matches={matchesState.matches}
      teams={matchesState.teams}
      loading={matchesState.loading}
      error={matchesState.error}
      savingId={matchesState.savingId}
      seeding={matchesState.seeding}
      onSeed={matchesState.seedMatches}
      onSave={matchesState.saveScore}
      onSaveTeams={matchesState.saveTeams}
      onOpenAdmin={() => setShowAdminScreen(true)}
    />
  );
}
