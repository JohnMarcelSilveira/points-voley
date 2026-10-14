import { useEffect, useState } from "react";

export function MatchCard({ match, onSave, saving }) {
  const [score1, setScore1] = useState(match.score1 ?? 0);
  const [score2, setScore2] = useState(match.score2 ?? 0);

  useEffect(() => {
    setScore1(match.score1 ?? 0);
    setScore2(match.score2 ?? 0);
  }, [match.score1, match.score2]);

  const finished = Boolean(match.isFinished);

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-800">
          Chave {match.group}
        </span>
        <span
          className={`text-xs font-semibold ${finished ? "text-emerald-600" : "text-amber-600"}`}
        >
          {finished ? "Encerrado" : "Aguardando"}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <p className="text-sm font-semibold text-slate-800">{match.team1}</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={score1}
            onChange={(event) => setScore1(event.target.value)}
            className="h-12 w-14 rounded-xl border border-slate-300 text-center text-lg font-black"
            aria-label={`Placar de ${match.team1}`}
          />
          <span className="font-black text-slate-400">x</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={score2}
            onChange={(event) => setScore2(event.target.value)}
            className="h-12 w-14 rounded-xl border border-slate-300 text-center text-lg font-black"
            aria-label={`Placar de ${match.team2}`}
          />
        </div>
        <p className="text-right text-sm font-semibold text-slate-800">{match.team2}</p>
      </div>

      <button
        type="button"
        disabled={saving}
        onClick={() => onSave(match.id, score1, score2)}
        className="mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60"
      >
        {saving ? "Salvando..." : "Salvar"}
      </button>

      {match.updatedBy && (
        <p className="mt-2 text-center text-xs text-slate-400">
          Atualizado por {match.updatedBy}
        </p>
      )}
    </article>
  );
}
