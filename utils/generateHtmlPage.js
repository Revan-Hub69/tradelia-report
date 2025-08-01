export function generateHtmlPage({ blocchiHtml, tabLabels, titoloAsset, ticker, dataReport, immagineChart }) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titoloAsset} (${ticker}) – Report Tradelia AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Inter', sans-serif; background: #f1f5f9; color: #0f172a; }
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="bg-slate-100">
  <header class="max-w-4xl mx-auto mt-8 px-4">
    <h1 class="text-2xl font-bold text-slate-900 mb-2">${titoloAsset} <span class="text-slate-500">(${ticker})</span></h1>
    <p class="text-sm text-slate-600 mb-4">Data Report: ${dataReport}</p>
    <img src="${immagineChart}" alt="Grafico" class="w-full rounded shadow mb-6" />
  </header>

  ${blocchiHtml.join("\n")}

  <footer class="max-w-4xl mx-auto mt-12 mb-6 px-4 text-xs text-slate-500">
    <p class="mb-2">Disclaimer: Le analisi presenti in questo report hanno scopo educativo e informativo. Nessuna delle informazioni fornite costituisce sollecitazione all'investimento o consulenza finanziaria personalizzata.</p>
    <p>© ${new Date().getFullYear()} Tradelia AI – Tutti i diritti riservati.</p>
  </footer>
</body>
</html>`;
}
