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
  onLogout,
  matches,
  loading,
  error,
  savingId,
  seeding,
  onSeed,
  onSave,
}) {
  const [category, setCategory] = useState("Feminino");
  const [groupFilter, setGroupFilter] = useState("all");
  const isAdmin = Boolean(user);

  const categoryMatches = useMemo(
    () => matches.filter((match) => match.category === category),
    [matches, category],
  );

  const visibleMatches = useMemo(() => {
    const filtered =
      groupFilter === "all"
        ? categoryMatches
        : categoryMatches.filter((match) => match.group === groupFilter);

    return [...filtered].sort((a, b) => String(a.id).localeCompare(String(b.id), "pt-BR"));
  }, [categoryMatches, groupFilter]);

  const standingsA = useMemo(
    () => computeStandings(categoryMatches, "A"),
    [categoryMatches],
  );
  const standingsB = useMemo(
    () => computeStandings(categoryMatches, "B"),
    [categoryMatches],
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

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 pb-3">
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

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-slate-900">Jogos · {category}</h2>
            <div className="flex flex-wrap gap-2">
              {[
                ["all", "Todos"],
                ["A", "Chave A"],
                ["B", "Chave B"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGroupFilter(value)}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
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
            <div className="mb-4 flex justify-end">
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
            <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          {loading ? (
            <p className="text-slate-600">Carregando jogos...</p>
          ) : visibleMatches.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
              <p className="text-slate-600">
                Nenhum jogo da categoria {category} no Firestore. Use Popular Banco
                para criar os 40 jogos.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
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

        <aside className="grid content-start gap-4">
          <StandingsTable title={`${category} — Chave A`} rows={standingsA} />
          <StandingsTable title={`${category} — Chave B`} rows={standingsB} />
          <p className="text-xs text-slate-500">
            Critérios: vitórias, saldo de pontos nos sets e confronto direto. A
            tabela é calculada no app a cada atualização dos jogos.
          </p>
        </aside>
      </main>
    </div>
  );
}
