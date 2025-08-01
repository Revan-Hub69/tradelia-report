const tooltips = {
  ticker: "Sigla ufficiale Nasdaq.",
  isin: "Codice internazionale di identificazione.",
  exchange: "Mercato principale di quotazione.",
  mic: "Market Identifier Code ufficiale.",
  società: "Nome legale completo.",
  settore: "Settore secondo GICS.",
  industria: "Sottosettore GICS.",
  indice_primario: "Principale indice di appartenenza.",
  indice_secondario: "Ulteriore indice significativo.",
  prezzo_attuale: "Ultimo prezzo validato, ritardo max 24h.",
  var_24h: "Performance su base 24 ore.",
  var_7gg: "Performance ultimi 7 giorni.",
  var_30gg: "Performance ultimi 30 giorni.",
  prezzo_minmax_52w: "Range minimo-massimo ultimi 12 mesi.",
  target_medio: "Target medio degli analisti (30gg).",
  rating_analisti: "Consenso medio e rating analisti aggiornati.",
  market_cap: "Capitalizzazione di mercato aggiornata.",
  numero_azioni: "Azioni totali (ultimo filing).",
  free_float: "Percentuale di azioni realmente flottanti."
};
const statusToColor = {
  positivo: "text-green-600",
  warning: "text-yellow-600",
  negativo: "text-red-600",
  neutro: "text-slate-700"
};
const labels = {
  ticker: "Ticker",
  isin: "ISIN",
  exchange: "Exchange",
  mic: "MIC",
  società: "Società",
  settore: "Settore",
  industria: "Industria",
  indice_primario: "Indice Primario",
  indice_secondario: "Indice Secondario",
  prezzo_attuale: "Prezzo Attuale",
  var_24h: "Variazione 24h",
  var_7gg: "Variazione 7gg",
  var_30gg: "Variazione 30gg",
  prezzo_minmax_52w: "Prezzo Min/Max 52 settimane",
  target_medio: "Prezzo Target Medio Analisti",
  rating_analisti: "Rating Analisti",
  market_cap: "Market Cap",
  numero_azioni: "Numero Azioni Totali",
  free_float: "Free Float"
};

export default function Blocco1({ data }) {
  return (
    <section id="blocco1" className="card-blocco transition-all duration-150 bg-white rounded-2xl border border-slate-200 shadow-inner my-8">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
        Blocco 1 – Identificativi &amp; Contesto
        <span className="tooltip ml-1">
          {/* Lucide info SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 text-slate-400 hover:text-blue-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
            <line x1="12" y1="16" x2="12" y2="12" strokeWidth="1.5"/>
            <circle cx="12" cy="8" r="1" strokeWidth="1.5"/>
          </svg>
          <span className="tooltip-text">
            <span className="tooltip-title">Descrizione</span>
            Dati identificativi, di scenario e validazione istituzionale di base.
          </span>
        </span>
      </h2>
      <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-800">
        {Object.entries(data).map(([key, { value, status }]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="font-semibold">{labels[key] || key}:</span>
            <span className={`${statusToColor[status]} font-bold`}>{value}</span>
            <span className="tooltip ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="1"/>
              </svg>
              <span className="tooltip-text">
                <span className="tooltip-title">{labels[key] || key}</span>
                {tooltips[key] || "Info metrica"}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-7 text-slate-800 text-sm leading-relaxed border-t pt-4">
        <strong>Commento Tradelia AI:</strong><br />
        {/* Qui puoi passare commento dal json, oppure fisso */}
        Dati identificativi, prezzi e variazioni su base istituzionale. Validazione positiva su tutti i dati principali.
      </div>
    </section>
  );
}
