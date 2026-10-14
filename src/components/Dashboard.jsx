import { useMemo, useState } from "react";
import { MatchCard } from "./MatchCard";
import { StandingsTable } from "./StandingsTable";
import { computeStandings } from "../lib/standings";

const CATEGORIES = [
  { id: "Feminino", label: "Feminino", hint: "Manhã" },
  { id: "Masculino", label: "Masculino", hint: "Tarde" },
];

export function Dashboard({
  user,
  role,
  onLogout,
  matches,
  teams,
  loading,
  error,
  savingId,
  seeding,
  onSeed,
  onSave,
  onOpenAdmin,
}) {
  const [category, setCategory] = useState("Feminino");
  const [groupFilter, setGroupFilter] = useState("all");
  const [standingsGroup, setStandingsGroup] = useState("A");
  const isAdmin = role === "admin";

  const teamMap = useMemo(
    () => new Map((teams ?? []).map((team) => [team.id, team])),
    [teams],
  );

  const categoryMatches = useMemo(
    () =>
      (matches ?? []).map((match) => ({
        ...match,
        team1:
          teamMap.get(match.team1Id)?.name ??
          match.team1Name ??
          match.team1 ??
          "Equipe",
        team2:
          teamMap.get(match.team2Id)?.name ??
          match.team2Name ??
          match.team2 ??
          "Equipe",
      })),
    [matches, teamMap],
  );

  const filteredMatches = useMemo(
    () => categoryMatches.filter((match) => match.category === category),
    [categoryMatches, category],
  );

  const visibleMatches = useMemo(() => {
    const filtered =
      groupFilter === "all"
        ? filteredMatches
        : filteredMatches.filter((match) => match.group === groupFilter);

    return [...filtered].sort((a, b) => String(a.id).localeCompare(String(b.id), "pt-BR"));
  }, [filteredMatches, groupFilter]);

  const standingsA = useMemo(
    () => computeStandings(filteredMatches, "A", teamMap),
    [filteredMatches, teamMap],
  );
  const standingsB = useMemo(
    () => computeStandings(filteredMatches, "B", teamMap),
    [filteredMatches, teamMap],
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-100 to-amber-50">
      <header className="sticky top-0 z-10 border-b border-white/60 bg-slate-900/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs tracking-widest text-orange-300 uppercase">Ao vivo</p>
            <h1 className="text-lg font-black">Copa de Vôlei</h1>
          </div>

          <div className="text-right">
            <p className="max-w-40 truncate text-xs text-slate-300">{user.email}</p>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs font-semibold text-orange-300 hover:text-white"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 pb-4">
          {CATEGORIES.map((item) => {
            const active = category === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={`rounded-2xl px-3 py-2 text-center transition ${
                  active
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                <span className="block text-sm font-black">{item.label}</span>
                <span className="block text-[11px] font-medium opacity-80">{item.hint}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-4 px-3 py-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-4 lg:py-6">
        <aside className="grid content-start gap-2 lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-2 md:hidden">
            {[
              ["A", "Chave A"],
              ["B", "Chave B"],
            ].map(([value, label]) => {
              const active = standingsGroup === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStandingsGroup(value)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-bold ${
                    active ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="md:hidden">
            <StandingsTable
              title={`${category} — Chave ${standingsGroup}`}
              rows={standingsGroup === "A" ? standingsA : standingsB}
              compact
            />
          </div>

          <div className="hidden md:grid md:gap-3">
            <StandingsTable title={`${category} — Chave A`} rows={standingsA} />
            <StandingsTable title={`${category} — Chave B`} rows={standingsB} />
          </div>

          <p className="text-[11px] leading-4 text-slate-500">
            Os 2 primeiros de cada chave avançam. Critérios: vitórias, saldo e confronto direto.
          </p>
        </aside>

        <section>
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-black text-slate-900 sm:text-xl">Jogos · {category}</h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                ["all", "Todos"],
                ["A", "Chave A"],
                ["B", "Chave B"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGroupFilter(value)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    groupFilter === value
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {isAdmin && (
            <div className="mb-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="rounded-xl bg-sky-700 px-3 py-2 text-xs font-bold text-white hover:bg-sky-600"
              >
                Painel Admin
              </button>
              <button
                type="button"
                disabled={seeding}
                onClick={onSeed}
                className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {seeding ? "Populando..." : "Popular Banco"}
              </button>
            </div>
          )}

          {error && (
            <p className="mb-4 rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-slate-600">Carregando jogos...</p>
          ) : visibleMatches.length === 0 ? (
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200">
              <p className="text-slate-600">Nenhum jogo da categoria {category} ainda. Gere os jogos para começar.</p>
            </div>
          ) : (
            <div className="grid gap-2">
              {visibleMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  saving={savingId === match.id}
                  onSave={onSave}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
