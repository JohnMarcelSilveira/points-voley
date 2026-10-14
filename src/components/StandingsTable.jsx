export function StandingsTable({ title, rows }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <header className="bg-slate-900 px-4 py-3">
        <h2 className="text-sm font-bold tracking-wide text-white uppercase">{title}</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
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
              rows.map((row, index) => (
                <tr key={row.team} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-bold text-orange-600">{index + 1}</td>
                  <td className="px-3 py-2 font-medium">{row.team}</td>
                  <td className="px-3 py-2">{row.wins}</td>
                  <td className="px-3 py-2">{row.losses}</td>
                  <td className="px-3 py-2 font-bold">{row.points}</td>
                  <td className="px-3 py-2">{row.setDiff > 0 ? `+${row.setDiff}` : row.setDiff}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
