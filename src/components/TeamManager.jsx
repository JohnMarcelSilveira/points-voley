import { useEffect, useMemo, useState } from "react";

export function TeamManager({ teams, onSave, onClose }) {
  const [drafts, setDrafts] = useState(teams);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDrafts(teams);
  }, [teams]);

  const grouped = useMemo(() => {
    const groupedTeams = {};

    drafts.forEach((team) => {
      const key = `${team.category} / ${team.group}`;
      if (!groupedTeams[key]) {
        groupedTeams[key] = [];
      }
      groupedTeams[key].push(team);
    });

    return Object.entries(groupedTeams).sort(([left], [right]) => left.localeCompare(right, "pt-BR"));
  }, [drafts]);

  function updateTeam(teamId, value) {
    setDrafts((current) =>
      current.map((team) => (team.id === teamId ? { ...team, name: value } : team)),
    );
  }

  async function handleSave() {
    setSaving(true);
    await onSave(drafts);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-10">
      <div className="w-full max-w-4xl rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-200">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Times</p>
            <h2 className="text-xl font-black text-slate-900">Gerenciar equipes</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
          >
            Fechar
          </button>
        </div>

        <div className="grid gap-4">
          {grouped.map(([label, items]) => (
            <section key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-600">
                {label}
              </h3>
              <div className="grid gap-2">
                {items.map((team) => (
                  <label
                    key={team.id}
                    className="grid gap-1 text-sm font-medium text-slate-700 md:grid-cols-[minmax(0,1fr)_120px] md:items-center"
                  >
                    <input
                      value={team.name ?? ""}
                      onChange={(event) => updateTeam(team.id, event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-0 focus:border-sky-500"
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {team.group}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-black text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar times"}
          </button>
        </div>
      </div>
    </div>
  );
}
