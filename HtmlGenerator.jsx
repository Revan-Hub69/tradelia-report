"use client";

import React, { useState } from "react";
import { generateHtmlPage } from "@/utils/generateHtmlPage";
import { generateBloccoHTML } from "@/utils/generateBloccoHTML";
import { tabLabels } from "@/constants/tabLabels";
import { statusToClass } from "@/constants/statusToClass";
import { tooltips } from "@/constants/tooltipsAll";

export default function HtmlGenerator() {
  const [jsonData, setJsonData] = useState({});
  const [htmlFinale, setHtmlFinale] = useState("");

  const handleJsonUpload = (event, bloccoKey) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        setJsonData((prev) => ({ ...prev, [bloccoKey]: parsed }));
      } catch (err) {
        alert("Errore nel parsing JSON del blocco " + bloccoKey);
      }
    };
    reader.readAsText(file);
  };

  const generaReport = async () => {
    const blocchiHtml = await Promise.all(
      tabLabels.map(async (label, index) => {
        const key = `blocco${index + 1}`;
        const json = jsonData[key];
        if (!json) return `<section><p>Manca il JSON per ${label}</p></section>`;
        return await generateBloccoHTML(json, index + 1, label, tooltips[key], statusToClass);
      })
    );

    const html = generateHtmlPage({
      blocchiHtml,
      tabLabels,
      titoloAsset: jsonData.blocco1?.titoloAsset || "Titolo Sconosciuto",
      ticker: jsonData.blocco1?.ticker || "N/A",
      dataReport: jsonData.blocco1?.dataReport || "01/08/2025",
      immagineChart: jsonData.blocco1?.immagineChart || "https://via.placeholder.com/400x200"
    });

    setHtmlFinale(html);
  };

  const scaricaHtml = () => {
    const blob = new Blob([htmlFinale], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report-tradelia.html";
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-xl font-bold text-slate-800 mb-4">Generatore Report Tradelia AI</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tabLabels.map((label, index) => {
          const key = `blocco${index + 1}`;
          return (
            <div key={key} className="text-sm">
              <label className="block font-medium text-slate-700 mb-1">{label}</label>
              <input
                type="file"
                accept="application/JSON"
                onChange={(e) => handleJsonUpload(e, key)}
                className="block w-full text-xs border border-slate-300 px-2 py-1 rounded-md"
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={generaReport}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded shadow"
        >
          Genera HTML completo
        </button>
        {htmlFinale && (
          <button
            onClick={scaricaHtml}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Scarica HTML
          </button>
        )}
      </div>

      {htmlFinale && (
        <textarea
          className="w-full h-[80vh] p-4 font-mono text-xs bg-slate-100 border border-slate-300 rounded-md"
          value={htmlFinale}
          readOnly
        />
      )}
    </div>
  );
}
