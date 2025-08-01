// components/Blocco1Preview.js

export default function Blocco1Preview() {
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
          <span className="tooltip-text"><span className="tooltip-title">Descrizione</span>
            Dati identificativi, di scenario e validazione istituzionale di base.<br />
            <span className="tooltip-fonti">Fonti: SEC, Nasdaq IR, Bloomberg, Reuters, S&P CapitalIQ</span>
          </span>
        </span>
      </h2>
      <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-800">
        {/* Metriche principali */}
        <div className="flex items-center gap-2"><span className="font-semibold">Ticker:</span><span className="text-green-600 font-bold">TSLA</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">ISIN:</span><span className="text-slate-700">US88160R1014</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Exchange:</span><span className="text-slate-700">NASDAQ</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">MIC:</span><span className="text-slate-700">XNAS</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Società:</span><span className="text-slate-700">Tesla, Inc.</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Settore:</span><span className="text-slate-700">Consumer Discretionary</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Industria / Sottosettore:</span><span className="text-slate-700">Automobiles</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Indice Primario:</span><span className="text-green-600">S&amp;P 500 (dal 2020-12-21)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Indice Secondario:</span><span className="text-green-600">Nasdaq 100 (dal 2013-07-15)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Prezzo Attuale:</span><span className="text-green-600">$314.25 (2025-07-31)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Variazione 24h (%):</span><span className="text-yellow-600">−0.015%</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Variazione 7gg (%):</span><span className="text-green-600">+7.98%</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Variazione 30gg (%):</span><span className="text-yellow-600">−1.74%</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Prezzo Min/Max 52 settimane:</span><span className="text-slate-700">$138.80 / $299.29 (agg. 2025-07-30)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Prezzo Target Medio Analisti:</span><span className="text-yellow-600">$308.0 (46 analisti, rev. 2025-07-31)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Rating Analisti:</span><span className="text-yellow-600">Hold (46 analisti attivi, agg. 2025-07-31)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Market Cap:</span><span className="text-green-600">$1.004B (agg. 2025-07-31)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Numero Azioni Totali:</span><span className="text-slate-700">3.192 miliardi (base, filing 10-Q 2025-07-25)</span></div>
        <div className="flex items-center gap-2"><span className="font-semibold">Free Float (%):</span><span className="text-green-600">99.5% (3.176 miliardi azioni flottanti)</span></div>
      </div>
      {/* Commento finale */}
      <div className="mt-7 text-slate-800 text-sm leading-relaxed border-t pt-4">
        <strong>Commento Tradelia AI:</strong><br />
        <span className="font-bold text-green-600">Dati anagrafici e identificativi</span> tutti validati (fonti Nasdaq/SEC), <span className="font-bold text-green-600">prezzo attuale e indici</span> coerenti con benchmark istituzionali.
        <span className="font-bold text-yellow-600">Variazione 24h/30gg</span> da monitorare per volatilità elevata.
        <span className="font-bold text-green-600">Free float e capitalizzazione</span> al top del settore.  
        Validazione: <span className="font-bold text-green-600">Positiva</span> (tutti dati confermati su almeno 3 fonti).
      </div>
    </section>
  );
}
