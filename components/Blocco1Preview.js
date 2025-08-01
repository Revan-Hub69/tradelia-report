// components/Blocco1.js

const statusToClass = {
  positivo: "text-green-600",
  negativo: "text-red-600",
  warning: "text-yellow-600",
  neutro: "text-slate-700"
};

function renderTooltip() {
  return (
    <span className="tooltip ml-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 text-slate-400 hover:text-blue-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
        <line x1="12" y1="16" x2="12" y2="12" strokeWidth="1.5"/>
        <circle cx="12" cy="8" r="1" strokeWidth="1.5"/>
      </svg>
      <span className="tooltip-text">
        <span className="tooltip-title">
          Dato istituzionale validato, vedi fonti ufficiali.
        </span>
      </span>
    </span>
  );
}

export default function Blocco1({
  ticker, isin, exchange, mic, company, sector, industry,
  index_primary, index_secondary, price_current,
  var_24h, var_7d, var_30d, price_minmax_52w,
  target_price, rating, market_cap, shares_out, free_float,
  comment
}) {
  return (
    <section id="blocco1" className="card-blocco bg-white rounded-2xl border border-slate-200 shadow-inner my-8 p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        Blocco 1 – Identificativi &amp; Contesto
      </h2>
      <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-800">
        {[
          ["Ticker", ticker],
          ["ISIN", isin],
          ["Exchange", exchange],
          ["MIC", mic],
          ["Società", company],
          ["Settore", sector],
          ["Industria / Sottosettore", industry],
          ["Indice Primario", index_primary],
          ["Indice Secondario", index_secondary],
          ["Prezzo Attuale", price_current],
          ["Variazione 24h (%)", var_24h],
          ["Variazione 7gg (%)", var_7d],
          ["Variazione 30gg (%)", var_30d],
          ["Prezzo Min/Max 52 settimane", price_minmax_52w],
          ["Prezzo Target Medio Analisti", target_price],
          ["Rating Analisti", rating],
          ["Market Cap", market_cap],
          ["Numero Azioni Totali", shares_out],
          ["Free Float (%)", free_float]
        ].map(([label, field], i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-semibold">{label}:</span>
            <span className={statusToClass[field.status]}>{field.value}</span>
            {renderTooltip()}
          </div>
        ))}
      </div>
      <div className="mt-7 text-slate-800 text-sm leading-relaxed border-t pt-4">
        <strong>Commento Tradelia AI:</strong><br />
        {comment}
      </div>
    </section>
  );
}
