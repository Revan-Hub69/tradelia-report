export async function generateBloccoHTML(json, numeroBlocco, titoloBlocco, tooltips, statusToClass) {
  if (!json || typeof json !== "object") return `<section><p>Dati mancanti</p></section>`;

  const righe = Object.entries(json)
    .filter(([k]) => k !== "titoloAsset" && k !== "ticker" && k !== "dataReport" && k !== "immagineChart")
    .map(([metrica, valore]) => {
      const stato = valore?.stato || "neutro";
      const testo = valore?.valore || "—";
      const classe = statusToClass[stato] || "text-slate-700";
      return `
        <div class="flex justify-between border-b py-1 text-sm">
          <span class="font-medium text-slate-700">${metrica}</span>
          <span class="${classe}">${testo}</span>
        </div>`;
    })
    .join("");

  return `
    <section id="blocco${numeroBlocco}" class="max-w-4xl mx-auto my-6 px-4 py-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 class="text-base sm:text-lg font-semibold text-slate-800 mb-4">Blocco ${numeroBlocco} – ${titoloBlocco}</h3>
      ${righe}
    </section>`;
}
