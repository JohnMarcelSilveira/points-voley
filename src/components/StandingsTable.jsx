export function StandingsTable({ title, rows, qualifyCount = 2, compact = false }) {
  const qualifiedLabel = `Os ${qualifyCount} primeiros avançam para a segunda fase`;

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <header className="bg-slate-900 px-4 py-3">
        <h2 className="text-sm font-bold tracking-wide text-white uppercase">{title}</h2>
      </header>

      <div className="border-b border-slate-100 px-4 py-2 text-[11px] text-slate-500 md:text-xs">
        {qualifiedLabel}
      </div>

      <div className="md:hidden">
        <table className="w-full table-fixed text-left text-[10px]">
          <thead className="bg-slate-50 text-[9px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-7 px-1.5 py-1.5">#</th>
              <th className="px-1.5 py-1.5">Time</th>
              <th className="w-8 px-1.5 py-1.5 text-center">V</th>
              <th className="w-8 px-1.5 py-1.5 text-center">D</th>
              <th className="w-10 px-1.5 py-1.5 text-center">Pts</th>
              <th className="w-12 px-1.5 py-1.5 text-center">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-slate-500">
                  Nenhum jogo neste grupo ainda.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const qualified = index < qualifyCount;
                const setDiffLabel = row.setDiff > 0 ? `+${row.setDiff}` : row.setDiff;

                return (
                  <tr key={row.team} className={`border-t border-slate-100 ${qualified ? "bg-emerald-50/40" : "bg-white"}`}>
                    <td className="px-1.5 py-1.5 font-bold text-slate-700">{index + 1}</td>
                    <td className="truncate px-1.5 py-1.5 font-medium text-slate-900">{row.team}</td>
                    <td className="px-1.5 py-1.5 text-center font-bold text-slate-900">{row.wins}</td>
                    <td className="px-1.5 py-1.5 text-center font-bold text-slate-900">{row.losses}</td>
                    <td className="px-1.5 py-1.5 text-center font-bold text-slate-900">{row.points}</td>
                    <td className={`px-1.5 py-1.5 text-center font-bold ${row.setDiff >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                      {setDiffLabel}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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
