export function StandingsTable({ title, rows, qualifyCount = 2, compact = false }) {
  const qualifiedLabel = `Os ${qualifyCount} primeiros avançam para a segunda fase`;

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <header className="bg-slate-900 px-4 py-3">
        <h2 className="text-sm font-bold tracking-wide text-white uppercase">{title}</h2>
      </header>

      <div className="border-b border-slate-100 px-4 py-3 text-xs text-slate-500">
        {qualifiedLabel}
      </div>

      <div className={`grid gap-2 px-4 py-3 ${compact ? "md:hidden" : "md:hidden"}`}>
        {rows.length === 0 ? (
          <div className="py-4 text-center text-slate-500">Nenhum jogo neste grupo ainda.</div>
        ) : (
          rows.slice(0, compact ? 4 : rows.length).map((row, index) => {
            const qualified = index < qualifyCount;
            const setDiffLabel = row.setDiff > 0 ? `+${row.setDiff}` : row.setDiff;

            return (
              <article
                key={row.team}
                className={`rounded-2xl border p-3 ${qualified ? "border-emerald-200 bg-emerald-50/70" : "border-slate-200 bg-white"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${index < qualifyCount ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                        {index + 1}
                      </span>
                      <h3 className="truncate text-sm font-semibold text-slate-900">{row.team}</h3>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {qualified ? "Classificado" : "Em disputa"}
                    </p>
                  </div>

                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${qualified ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {qualified ? "Top 2" : ""}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs text-slate-500">
                  <div className="rounded-xl bg-slate-50 px-2 py-2">
                    <div className="text-[10px] uppercase tracking-wide">V</div>
                    <div className="font-bold text-slate-900">{row.wins}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2 py-2">
                    <div className="text-[10px] uppercase tracking-wide">D</div>
                    <div className="font-bold text-slate-900">{row.losses}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2 py-2">
                    <div className="text-[10px] uppercase tracking-wide">Pts</div>
                    <div className="font-bold text-slate-900">{row.points}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2 py-2">
                    <div className="text-[10px] uppercase tracking-wide">Saldo</div>
                    <div className={`font-bold ${row.setDiff >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                      {setDiffLabel}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="hidden min-w-full text-left text-sm md:table">
          <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Dupla</th>
              <th className="px-3 py-2">V</th>
              <th className="px-3 py-2">D</th>
              <th className="px-3 py-2">Pts</th>
              <th className="px-3 py-2">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                  Nenhum jogo neste grupo ainda.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const qualified = index < qualifyCount;

                return (
                <tr key={row.team} className={`border-t border-slate-100 ${qualified ? "bg-emerald-50/40" : ""}`}>
                  <td className="px-3 py-2 font-bold text-orange-600">{index + 1}</td>
                  <td className="px-3 py-2 font-medium">{row.team}</td>
                  <td className="px-3 py-2">{row.wins}</td>
                  <td className="px-3 py-2">{row.losses}</td>
                  <td className="px-3 py-2 font-bold">{row.points}</td>
                  <td className="px-3 py-2">{row.setDiff > 0 ? `+${row.setDiff}` : row.setDiff}</td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
