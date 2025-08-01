import Blocco1 from "./Blocco1";

export default function ReportTemplate({ assetName, ticker, reportDate, screenshot, blocco1Data }) {
  return (
    <main className="px-2 max-w-4xl mx-auto">
      {/* Header asset */}
      <section className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-5 mb-4 bg-white rounded-xl shadow-inner border border-slate-200">
        <div className="flex-1 flex flex-col items-start">
          <div className="text-xs uppercase text-slate-400 tracking-wide mb-1">Asset</div>
          <div className="font-bold text-lg sm:text-2xl text-sky-900 mb-1">
            {assetName} <span className="font-semibold text-slate-500 ml-1">| {ticker}</span>
          </div>
          <div className="text-xs text-slate-500">
            Data report: <span className="font-semibold text-slate-700">{reportDate}</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={screenshot} alt={`Screenshot ${ticker} Chart`} className="max-h-32 rounded-lg shadow border border-slate-200" loading="lazy" />
        </div>
      </section>
      {/* Tab-bar, solo Blocco 1 */}
      <nav className="w-full flex overflow-x-auto tabs-scroll space-x-1 px-2 pb-1" style={{ scrollbarWidth: 'thin' }}>
        <button className="tab-btn active px-4 py-2 rounded-t-lg font-semibold text-slate-800 bg-white border border-b-0 border-slate-200"
          data-tab="blocco1">Blocco 1 – Identificativi & Contesto</button>
      </nav>
      {/* Blocchi */}
      <div className="my-8">
        <Blocco1 data={blocco1Data} />
      </div>
      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 py-4 mb-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="text-xs font-bold text-blue-900 mb-1">Disclaimer — Nota operativa</h3>
        <div className="text-xs text-blue-900 leading-relaxed">
          Questo report nasce per aiutarti a ragionare sulle tue scelte, non come consulenza personalizzata. <br />
          Usiamo dati pubblici e fonti serie, ma ricorda che nessun modello può prevedere il futuro. Se vuoi agire, chiedi sempre il parere di un professionista abilitato.<br />
          Tradelia AI non riceve alcuna retrocessione dai broker menzionati qui sotto: li segnaliamo perché possono essere utili, non perché ci pagano.
        </div>
      </section>
      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-5 flex flex-col gap-3 sm:flex-row sm:gap-6 items-stretch justify-between bg-white rounded-xl border border-slate-200 shadow-inner mb-8">
        {/* ...tutte le CTA fisse come sopra... */}
      </section>
    </main>
  );
}
