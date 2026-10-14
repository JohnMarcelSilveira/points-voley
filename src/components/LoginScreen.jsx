export function LoginScreen({ onLogin, error, configured }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-sky-200 via-amber-50 to-orange-100 px-4">
      <section className="w-full max-w-md rounded-3xl bg-white/90 p-8 text-center shadow-xl ring-1 ring-orange-100">
        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Torneio ao vivo
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Copa de Vôlei</h1>
        <p className="mt-3 text-slate-600">
          Entre com o Google para registrar placares e acompanhar a classificação
          na beira da quadra.
        </p>
        <button
          type="button"
          onClick={onLogin}
          className="mt-8 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Entrar com Google
        </button>
        {!configured && (
          <p className="mt-4 text-sm text-amber-700">
            Firebase ainda não está configurado neste ambiente. Verifique as variáveis
            VITE_FIREBASE_*.
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </section>
    </main>
  );
}
