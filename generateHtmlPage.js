export function generateHtmlPage({
  blocchiHtml = [],
  tabLabels = [],
  titoloAsset = "Titolo Sconosciuto",
  ticker = "TCKR",
  dataReport = "01/01/2025",
  immagineChart = "https://via.placeholder.com/400x200"
}) {
  const tabButtons = tabLabels.map((label, i) => {
    const id = `blocco${i + 1}`;
    return `<button class="tab-btn px-4 py-2 rounded-t-lg font-semibold text-slate-800 bg-white border border-b-0 border-slate-200" data-tab="${id}">
      ${label}
    </button>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TRADELIA • AI — Report Azionario</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #f1f5f9 url('https://www.transparenttextures.com/patterns/cubes.png');
      background-size: 280px;
      color: #0f172a;
      margin: 0; padding: 0;
    }
    ::-webkit-scrollbar { height: 8px; width: 10px; background: #e0e7ef; border-radius: 10px;}
    ::-webkit-scrollbar-thumb { background: #70a7e8; border-radius: 10px;}
    .tabs-scroll::-webkit-scrollbar { height: 8px; background: #e0e7ef;}
    .tabs-scroll::-webkit-scrollbar-thumb { background: #70a7e8; }
    .tab-btn { transition: background 0.17s, color 0.13s; }
    .tab-btn:hover, .tab-btn.active { background: #e0e7ef; color: #0369a1; }
    .card-blocco:hover { background: #f7fafc; box-shadow: 0 2px 16px 0 rgba(50,120,200,0.07);}
    .tooltip { position: relative; display: inline-block; cursor: pointer; z-index: 2; }
    .tooltip .tooltip-text {
      display: none;
      position: fixed;
      left: 50%; top: 53vh;
      transform: translate(-50%, -50%);
      background: #222e3a;
      color: #fff;
      min-width: 210px;
      max-width: 340px;
      font-size: 13px;
      border-radius: 9px;
      padding: 14px 18px;
      box-shadow: 0 4px 24px 0 rgba(35,70,120,0.15);
      z-index: 90;
      line-height: 1.55;
      pointer-events: none;
      opacity: 0; transition: opacity 0.17s;
    }
    .tooltip:hover .tooltip-text, .tooltip:focus-within .tooltip-text {
      display: block; pointer-events: all; opacity: 1;
    }
    .tooltip .tooltip-title { font-weight: 700; color: #60a5fa; margin-bottom: 5px; }
    .tooltip .tooltip-fonti { color: #dbeafe; font-size: 12px; margin-top: 10px; }
    @media (max-width: 700px) {
      .tabs-scroll { overflow-x: auto; }
      .tab-btn { min-width: 170px; font-size: 13px; }
      .card-blocco { padding: 1.1rem 0.7rem;}
      .tooltip .tooltip-text { min-width: 160px; max-width: 90vw; font-size: 13px; padding: 10px 9px; }
    }
    @media (min-width: 640px) {
      .card-blocco { padding: 2.2rem 2.5rem;}
    }
  </style>
</head>
<body>
  <header class="sticky top-0 z-50 bg-white shadow-md w-full px-4 sm:px-6 py-2 flex justify-between items-center mb-6 border-b border-slate-200">
    <a href="https://tradelia.org/index.html" class="text-xl sm:text-2xl font-extrabold tracking-tight text-sky-900 hover:opacity-90 transition">
      <span class="text-slate-900">TRADELIA</span><span class="text-blue-600 animate-pulse">•AI</span>
    </a>
    <a href="https://tradelia.org/archivio.html" class="text-sm text-blue-700 font-medium hover:underline">Archivio Storico</a>
  </header>

  <main class="px-2 max-w-4xl mx-auto">

    <!-- Intestazione asset -->
    <section class="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-5 mb-4 bg-white rounded-xl shadow-inner border border-slate-200">
      <div class="flex-1 flex flex-col items-start">
        <div class="text-xs uppercase text-slate-400 tracking-wide mb-1">Asset</div>
        <div class="font-bold text-lg sm:text-2xl text-sky-900 mb-1">${titoloAsset} <span class="font-semibold text-slate-500 ml-1">| ${ticker}</span></div>
        <div class="text-xs text-slate-500">Data report: <span class="font-semibold text-slate-700">${dataReport}</span></div>
      </div>
      <div class="flex-1 flex justify-center items-center">
        <img src="${immagineChart}" alt="Screenshot Chart" class="max-h-32 rounded-lg shadow border border-slate-200" loading="lazy">
      </div>
    </section>

    <!-- Tab bar -->
    <nav class="w-full flex overflow-x-auto tabs-scroll space-x-1 px-2 pb-1">
      ${tabButtons}
    </nav>

    <!-- Blocchi dinamici -->
    ${blocchiHtml.join("\n")}

    <!-- Sezione CTA broker -->
    <section class="mt-16 mb-10 border-t pt-6">
      <h3 class="text-sm sm:text-base font-semibold text-slate-800 mb-3">Broker compatibili con le strategie indicate:</h3>
      <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
        <li><a href="https://www.tradelia.org/Freedom24.html" class="text-blue-700 hover:underline">Freedom24</a> – ETF, azioni reali, opzioni quotate</li>
        <li><a href="https://www.tradelia.org/Exante.html" class="text-blue-700 hover:underline">EXANTE</a> – Futures, margine DMA, overlay professionali</li>
        <li><a href="https://www.tradelia.org/AvaTrade.html" class="text-blue-700 hover:underline">AvaOptions</a> – Strategie opzioni plain vanilla</li>
        <li><a href="https://www.tradelia.org/Pepperstone.html" class="text-blue-700 hover:underline">Pepperstone</a> – CFD a spread contenuto su azioni/indici</li>
        <li><a href="https://www.tradelia.org/NAGA.html" class="text-blue-700 hover:underline">NAGA</a> – Copytrading, trading azioni semplificato</li>
      </ul>
    </section>

    <!-- Disclaimer legale -->
    <section class="text-xs text-slate-500 mt-8 mb-16 leading-relaxed">
      <p class="mb-3"><strong>Disclaimer:</strong> Il presente documento è generato da <strong>Tradelia AI</strong> con finalità esclusivamente informative ed educative. Non costituisce in alcun modo consulenza finanziaria personalizzata, sollecitazione all’investimento o raccomandazione operativa. I contenuti sono frutto di analisi algoritmica automatizzata basata su fonti ritenute affidabili, ma non viene garantita la loro accuratezza, completezza o tempestività. Tradelia AI declina ogni responsabilità per eventuali perdite derivanti dall’uso improprio delle informazioni contenute.</p>
      <p>Si raccomanda di consultare sempre un <strong>consulente finanziario abilitato</strong> prima di assumere qualsiasi decisione operativa. Le operazioni su strumenti finanziari, in particolare derivati e strumenti a leva, comportano un rischio elevato e non sono adatte a tutti gli investitori.</p>
    </section>

  </main>
</body>
</html>`;
}
