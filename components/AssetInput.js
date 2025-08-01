import { useState } from "react";

/**
 * Form per inserimento dati asset di testata report.
 * Al submit chiama onSubmit (passato da index.js) con i 4 dati asset.
 */
export default function AssetInput({ onSubmit }) {
  const [assetName, setAssetName] = useState("");
  const [ticker, setTicker] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [screenshot, setScreenshot] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ assetName, ticker, reportDate, screenshot });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 mb-8 px-6 py-5 bg-white rounded-xl border border-slate-200 shadow">
      <h2 className="text-lg font-bold mb-4 text-slate-800">Dati Asset Report</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome Asset</label>
          <input type="text" value={assetName} onChange={e => setAssetName(e.target.value)} required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 text-slate-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ticker</label>
          <input type="text" value={ticker} onChange={e => setTicker(e.target.value)} required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 text-slate-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Data Report</label>
          <input type="date" value={reportDate} onChange={e => setReportDate(e.target.value)} required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 text-slate-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Screenshot (URL immagine)</label>
          <input type="url" value={screenshot} onChange={e => setScreenshot(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 text-slate-800" placeholder="https://..." />
        </div>
        <button type="submit"
          className="mt-2 w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded transition">
          Prosegui e genera Report
        </button>
      </div>
    </form>
  );
}
