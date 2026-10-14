import { useEffect, useMemo, useState } from "react";

const CATEGORIES = ["Feminino", "Masculino"];
const GROUPS = ["A", "B"];

export function AdminDashboard({
  user,
  onLogout,
  onBack,
  teams,
  matches,
  seeding,
  onSeed,
  onSaveTeams,
}) {
  const [draftTeams, setDraftTeams] = useState([]);

  useEffect(() => {
    setDraftTeams(teams ?? []);
  }, [teams]);

  const grouped = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        groups: GROUPS.map((group) => ({
          group,
          teams: draftTeams.filter(
            (team) => team.category === category && team.group === group,
          ),
        })),
      })),
    [draftTeams],
  );

  function updateTeamName(teamId, value) {
    setDraftTeams((current) =>
      current.map((team) =>
        team.id === teamId ? { ...team, name: value } : team,
      ),
    );
  }

  async function handleSave() {
    if (!onSaveTeams) return;
    await onSaveTeams(draftTeams);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-300">
              Administração
            </p>
            <h1 className="text-xl font-black">Painel de torneio</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-400"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-600">Usuário</p>
            <p className="font-bold text-slate-900">{user.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={seeding}
              onClick={onSeed}
              className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700 disabled:opacity-60"
            >
              {seeding ? "Populando..." : "Popular Banco"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500"
            >
              Salvar times
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Times</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{draftTeams.length}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Jogos</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{matches?.length ?? 0}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Permissão</p>
            <p className="mt-2 text-lg font-black text-sky-700">Administrador</p>
          </div>
        </div>

        <div className="grid gap-5">
          {grouped.map(({ category, groups }) => (
            <section key={category} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-4 text-xl font-black text-slate-900">{category}</h2>

              <div className="grid gap-4 lg:grid-cols-2">
                {groups.map(({ group, teams: groupTeams }) => (
                  <div key={`${category}-${group}`} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                    <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                      Chave {group}
                    </h3>

                    <div className="grid gap-2">
                      {groupTeams.length === 0 ? (
                        <p className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500">
                          Nenhum time cadastrado
                        </p>
                      ) : (
                        groupTeams.map((team) => (
                          <label
                            key={team.id}
                            className="grid gap-1 text-sm font-medium text-slate-700"
                          >
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                              Nome do time
                            </span>
                            <input
                              value={team.name ?? ""}
                              onChange={(event) => updateTeamName(team.id, event.target.value)}
                              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-0 focus:border-sky-500"
                            />
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
