export function generateBloccoHTML(idBlocco, labelBlocco, jsonDati, tooltips, statusToClass) {
  const rows = Object.entries(jsonDati).map(([key, { valore, status }]) => {
    const tooltip = tooltips[key];
    const classe = statusToClass[status] || "text-slate-700 font-bold";
    return `
      <div class="flex items-center gap-2">
        <span class="font-semibold">${tooltip?.title || key}:</span>
        <span class="${classe}">${valore}</span>
        ${
          tooltip
            ? `<span class="tooltip ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="1"/>
                </svg>
                <span class="tooltip-text"><span class="tooltip-title">${tooltip.title}</span>
                  ${tooltip.text}<br><span class="tooltip-fonti">Fonte: Tradelia AI</span>
                </span>
              </span>`
            : ""
        }
      </div>`;
  });

  return `
    <section id="${idBlocco}" class="card-blocco transition-all duration-150 bg-white rounded-2xl border border-slate-200 shadow-inner my-8">
      <h2 class="text-base sm:text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
        ${labelBlocco}
        <span class="tooltip ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 text-slate-400 hover:text-blue-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" stroke-width="1.5"/>
            <line x1="12" y1="16" x2="12" y2="12" stroke-width="1.5"/>
            <circle cx="12" cy="8" r="1" stroke-width="1.5"/>
          </svg>
          <span class="tooltip-text"><span class="tooltip-title">Descrizione</span>
            Dati del blocco generati da JSON.<br>
            <span class="tooltip-fonti">Fonte: Tradelia AI</span>
          </span>
        </span>
      </h2>
      <div class="flex flex-col gap-2 text-xs sm:text-sm text-slate-800">
        ${rows.join("\n")}
      </div>
    </section>
  `;
}
