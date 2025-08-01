import { useState } from "react";
import ReportTemplate from "../components/ReportTemplate";
import Blocco1 from "../components/Blocco1";
// Importa qui altri blocchi se vuoi, esempio: Blocco2, Blocco3...

const NUM_BLOCCHI = 14;

export default function Dashboard() {
  const [jsonInputs, setJsonInputs] = useState(Array(NUM_BLOCCHI).fill(""));
  const [blocchi, setBlocchi] = useState(null);
  const [assetName, setAssetName] = useState("");
  const [ticker, setTicker] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [screenshot, setScreenshot] = useState("");

  function handleChange(idx, value) {
    const arr = [...jsonInputs];
    arr[idx] = value;
    setJsonInputs(arr);
  }

  function generaReport() {
    // Parsing blocchi JSON → componenti
    const _blocchi = [];

    for (let i = 0; i < NUM_BLOCCHI; i++) {
      if (jsonInputs[i].trim()) {
        try {
          const data = JSON.parse(jsonInputs[i]);
          // SOLO BLOCCO1: esempio (aggiungi qui altri blocchi)
          if (i === 0) _blocchi.push(<Blocco1 key={i} {...data} />);
          // if (i === 1) _blocchi.push(<Blocco2 key={i} {...data} />);
          // ...continua per ogni blocco
        } catch (err) {
          alert(`Errore JSON Blocco ${i+1}: ${err.message}`);
          return;
        }
      } else {
        _blocchi.push(null);
      }
    }
    setBlocchi(_blocchi);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Tradelia AI – Generatore Report</h1>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Asset Name"
          value={assetName}
          onChange={e => setAssetName(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="Ticker"
          value={ticker}
          onChange={e => setTicker(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          placeholder="Report Date"
          value={reportDate}
          onChange={e => setReportDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="Screenshot URL"
          value={screenshot}
          onChange={e => setScreenshot(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* INPUT JSON per ogni blocco */}
      <div className="mb-6">
        {Array.from({ length: NUM_BLOCCHI }).map((_, i) => (
          <div key={i} className="mb-3">
            <label className="font-semibold">JSON Blocco {i+1}</label>
            <textarea
              rows={3}
              value={jsonInputs[i]}
              onChange={e => handleChange(i, e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1 font-mono text-xs"
              placeholder={`{\n  "ticker": {"value": "TSLA", "status": "positivo"}, ...\n}`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={generaReport}
        className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-900 transition mb-8"
      >
        Genera Report
      </button>

      {/* ANTEPRIMA REPORT */}
      {blocchi && (
        <div className="border rounded-xl shadow-xl p-4 bg-slate-50">
          <ReportTemplate
            assetName={assetName || "ASSET"}
            ticker={ticker || "TICKER"}
            reportDate={reportDate || "DATA"}
            screenshot={screenshot || ""}
            blocchi={blocchi.filter(Boolean)}
          />
        </div>
      )}
    </div>
  );
}
