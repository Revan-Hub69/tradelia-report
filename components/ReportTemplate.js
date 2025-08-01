const tabLabels = [
  "Identificativi & Contesto",
  "Multipli & Valutazione Intrinseca",
  "Fondamentali Aziendali",
  "Dividendi & Buyback",
  "Performance & Rischio",
  "Microstruttura & Market",
  "Derivati & Opzioni",
  "Tecnica & Correlazioni",
  "Proprietà, ESG & Governance",
  "Cluster Strategico AI",
  "Eventi & Macro",
  "Dati Alternativi & Retail",
  "Cluster Tradelia Ai",
  "Simulazioni Operative"
];

export default function ReportTemplate({
  assetName,
  ticker,
  reportDate,
  screenshot,
  children,
}) {
  return (
    <main className="px-2 max-w-4xl mx-auto">
      {/* Header */}
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

      {/* Tab-bar fissa */}
      <nav className="w-full flex overflow-x-auto tabs-scroll space-x-1 px-2 pb-1" style={{ scrollbarWidth: 'thin' }}>
        {tabLabels.map((label, i) => (
          <button
            key={i}
            className={`tab-btn px-4 py-2 rounded-t-lg font-semibold text-slate-800 bg-white border border-b-0 border-slate-200${i === 0 ? ' active' : ''}`}
            data-tab={`blocco${i + 1}`}
            type="button"
            disabled
          >
            {`Blocco ${i + 1} – ${label}`}
          </button>
        ))}
      </nav>

      {/* Blocchi preview */}
      <div className="my-8">{children}</div>

      {/* Disclaimer istituzionale-amichevole */}
      <section className="max-w-4xl mx-auto px-4 py-4 mb-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="text-xs font-bold text-blue-900 mb-1">Disclaimer — Nota operativa</h3>
        <div className="text-xs text-blue-900 leading-relaxed">
          Questo report nasce per aiutarti a ragionare sulle tue scelte, non come consulenza personalizzata. <br />
          Usiamo dati pubblici e fonti serie, ma ricorda che nessun modello può prevedere il futuro. Se vuoi agire, chiedi sempre il parere di un professionista abilitato.<br />
          Tradelia AI non riceve alcuna retrocessione dai broker menzionati qui sotto: li segnaliamo perché possono essere utili, non perché ci pagano.
        </div>
      </section>

      {/* CTA FISSE */}
      <section className="max-w-4xl mx-auto px-4 py-5 flex flex-col gap-3 sm:flex-row sm:gap-6 items-stretch justify-between bg-white rounded-xl border border-slate-200 shadow-inner mb-8">
        <div className="flex-1 flex flex-col items-start gap-2">
          <a href="https://tradelia.org/Exante.html" target="_blank" className="px-4 py-2 rounded-lg border bg-slate-50 hover:bg-blue-50 text-base text-blue-800 font-semibold shadow transition mb-1">Exante</a>
          <div className="text-xs text-slate-600 mb-2">Broker DMA istituzionale per derivati, azioni, ETF, trading swing e accesso diretto a futures e opzioni reali.</div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-2">
          <a href="https://tradelia.org/Freedom24.html" target="_blank" className="px-4 py-2 rounded-lg border bg-slate-50 hover:bg-blue-50 text-base text-blue-800 font-semibold shadow transition mb-1">Freedom24</a>
          <div className="text-xs text-slate-600 mb-2">Intermediario UE regolamentato per azioni, ETF, opzioni semplici e IPO; ideale per buy & hold e gestione liquidi.</div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-2">
          <a href="https://tradelia.org/Pepperstone.html" target="_blank" className="px-4 py-2 rounded-lg border bg-slate-50 hover:bg-blue-50 text-base text-blue-800 font-semibold shadow transition mb-1">Pepperstone</a>
          <div className="text-xs text-slate-600 mb-2">CFD su indici, azioni, materie prime e forex con commissioni basse e piattaforme avanzate (cTrader, MT4/5, TradingView).</div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-2">
          <a href="https://tradelia.org/Naga.html" target="_blank" className="px-4 py-2 rounded-lg border bg-slate-50 hover:bg-blue-50 text-base text-blue-800 font-semibold shadow transition mb-1">Naga</a>
          <div className="text-xs text-slate-600 mb-2">Social trading su azioni reali, community attiva. <span className="font-semibold text-yellow-600">Attenzione: i CFD vanno evitati da chi cerca solo azioni reali.</span></div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-2">
          <a href="https://tradelia.org/eToro.html" target="_blank" className="px-4 py-2 rounded-lg border bg-slate-50 hover:bg-blue-50 text-base text-blue-800 font-semibold shadow transition mb-1">eToro</a>
          <div className="text-xs text-slate-600 mb-2">Azioni USA reali a costo zero, ETF, crypto, social trading. <span className="font-semibold text-yellow-600">Attenzione: i CFD comportano rischi elevati e vanno usati con cautela.</span></div>
        </div>
      </section>
    </main>
  );
}
