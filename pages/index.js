import React, { useState } from "react";

// Etichette ufficiali blocchi Tradelia AI
const tabLabels = [
  "Identificativi & Contesto",
  "Multipli & Valutazione Intrinseca",
  "Fondamentali Aziendali",
  "Dividendi & Buyback",
  "Performance & Rischio",
  "Microstruttura & Market",
  "Derivati & Opzioni",
  "Tecnica & Correlazioni",
  "Proprietà, ESG & Governance",
  "Cluster Strategico AI",
  "Eventi & Macro",
  "Dati Alternativi & Retail",
  "Cluster Tradelia AI",
  "Simulazioni Operative"
];

// Stato-colore per status delle metriche
const statusToClass = {
  positivo: "text-green-600 font-bold",
  warning: "text-yellow-600 font-bold",
  negativo: "text-red-600 font-bold",
  neutro: "text-slate-700 font-bold"
};

const tooltipsBlocco1 = {
  ticker: {
    title: "Ticker",
    text: "È la sigla unica con cui il titolo viene identificato in borsa. Serve per trovare l’azione su qualsiasi piattaforma."
  },
  isin: {
    title: "ISIN",
    text: "Codice internazionale che identifica in modo univoco il titolo a livello globale. Utile per evitare errori nei trasferimenti o negli ordini."
  },
  exchange: {
    title: "Exchange",
    text: "La borsa dove il titolo viene scambiato (es: Nasdaq, NYSE). Determina regolamenti e orari di negoziazione."
  },
  mic: {
    title: "MIC",
    text: "Codice identificativo ufficiale della borsa (Market Identifier Code). Utile in sistemi automatizzati o per operare su broker multi-mercato."
  },
  societa: {
    title: "Società",
    text: "Il nome completo dell’azienda emittente. È quello che trovi nei documenti legali e nelle comunicazioni ufficiali."
  },
  settore: {
    title: "Settore",
    text: "Categoria economica di appartenenza dell’azienda secondo la classificazione globale GICS. Serve per confrontare le aziende con concorrenti simili."
  },
  industria: {
    title: "Industria",
    text: "Sottocategoria (ancora più specifica) secondo GICS. Es: Automobili invece di semplice 'beni di consumo'."
  },
  indiceprimario: {
    title: "Indice Primario",
    text: "Indice azionario principale di cui il titolo fa parte (es: S&P 500). L’inclusione spesso aumenta la visibilità e la liquidità del titolo."
  },
  dataindiceprimario: {
    title: "Data Inclusione Indice Primario",
    text: "La data in cui il titolo è stato inserito nell’indice principale. Può influire sul volume di scambi."
  },
  indicesecondario: {
    title: "Indice Secondario",
    text: "Altri indici di cui il titolo fa parte (es: Nasdaq 100). Più indici = maggiore interesse istituzionale."
  },
  dataindicesecondario: {
    title: "Data Inclusione Indice Secondario",
    text: "Quando il titolo è stato inserito nell’indice secondario."
  },
  prezzoattuale: {
    title: "Prezzo Attuale",
    text: "Ultimo prezzo registrato. È il valore di riferimento in tempo reale (o quasi) per valutare le performance."
  },
  valuta: {
    title: "Valuta",
    text: "La moneta in cui è espresso il prezzo (es: USD, EUR)."
  },
  timestampprezzo: {
    title: "Data/ora prezzo",
    text: "Orario e data dell’ultimo aggiornamento prezzo. Importante per sapere se il dato è attuale."
  },
  var24h: {
    title: "Variazione 24h (%)",
    text: "Quanto è salito o sceso il prezzo rispetto a 24 ore fa. Serve a capire il movimento più recente."
  },
  var7g: {
    title: "Variazione 7gg (%)",
    text: "Andamento settimanale: utile per capire se c’è un trend a breve."
  },
  var30g: {
    title: "Variazione 30gg (%)",
    text: "Andamento mensile: indica movimenti di fondo e volatilità su base più ampia."
  },
  min52w: {
    title: "Minimo 52 settimane",
    text: "Il prezzo più basso toccato dal titolo nell’ultimo anno. Utile per capire il rischio di ribasso."
  },
  max52w: {
    title: "Massimo 52 settimane",
    text: "Il prezzo più alto raggiunto dal titolo nell’ultimo anno. Serve per valutare il potenziale di recupero."
  },
  dataminmax52w: {
    title: "Data aggiornamento Min/Max 52 settimane",
    text: "Quando sono stati rilevati i prezzi minimo/massimo."
  },
  target: {
    title: "Prezzo Target Medio Analisti",
    text: "Stima media degli analisti su dove può arrivare il prezzo nei prossimi 12 mesi. Non è una garanzia, ma aiuta a capire le aspettative di mercato."
  },
  notarget: {
    title: "N° Analisti Target",
    text: "Quanti analisti hanno contribuito alla stima target."
  },
  datatarget: {
    title: "Data Target Analisti",
    text: "Ultimo aggiornamento delle stime degli analisti."
  },
  rating: {
    title: "Rating Analisti",
    text: "Valutazione aggregata degli analisti (Buy, Hold, Sell). È una media delle raccomandazioni degli esperti."
  },
  datarating: {
    title: "Data Rating Analisti",
    text: "Quando è stato aggiornato il rating degli analisti."
  },
  marketcap: {
    title: "Market Cap",
    text: "Valore totale dell’azienda calcolato moltiplicando il prezzo per il numero di azioni in circolazione."
  },
  datamarketcap: {
    title: "Data Market Cap",
    text: "Ultimo aggiornamento della capitalizzazione."
  },
  numazioni: {
    title: "Numero Azioni Totali",
    text: "Numero totale delle azioni esistenti (conta tutte le classi)."
  },
  classeazioni: {
    title: "Classe Azioni",
    text: "Tipo di azioni emesse (es: A, B, C). Alcuni titoli hanno più classi."
  },
  dataazioni: {
    title: "Data Azioni",
    text: "Ultimo aggiornamento ufficiale sul numero/classi azioni."
  },
  freefloat: {
    title: "Free Float (%)",
    text: "Percentuale di azioni realmente disponibili per il mercato (non bloccate da fondatori o investitori principali). Più è alto, più il titolo è liquido."
  },
  numfreefloat: {
    title: "Numero Azioni Flottanti",
    text: "Quantità di azioni realmente scambiabili ogni giorno."
  }
};
const tooltipsBlocco2 = {
  pe_ttm: {
    title: "P/E (TTM)",
    text: "È il rapporto tra il prezzo dell’azione e l’utile per azione degli ultimi 12 mesi. Più è basso, più il titolo può essere a buon prezzo rispetto agli utili prodotti."
  },
  pe_forward: {
    title: "Forward P/E",
    text: "Simile al P/E, ma usa gli utili previsti nei prossimi 12 mesi. Serve per capire se il titolo è caro o economico rispetto alle stime future."
  },
  peg: {
    title: "PEG Ratio",
    text: "Mette in relazione il P/E con la crescita attesa degli utili. Un valore intorno a 1 è considerato equilibrato; sotto 1 può essere sottovalutato."
  },
  pb: {
    title: "P/B",
    text: "Rapporto prezzo/valore contabile per azione. Serve per valutare quanto paghi rispetto al valore contabile dell’azienda (patrimonio netto)."
  },
  ps: {
    title: "P/S",
    text: "Rapporto prezzo/ricavi per azione. Utile per confrontare aziende che ancora non generano utili netti."
  },
  pebit: {
    title: "P/EBIT",
    text: "Prezzo dell’azione rapportato all’utile operativo (EBIT). Indica quanto il mercato paga per ogni euro di profitto operativo."
  },
  ev_ebit_ttm: {
    title: "EV/EBIT (TTM)",
    text: "Enterprise Value (valore complessivo dell’azienda) diviso per l’utile operativo degli ultimi 12 mesi. Indica quanto costa l’azienda rispetto ai profitti operativi recenti."
  },
  ev_ebit_fwd: {
    title: "EV/EBIT (Forward)",
    text: "Come sopra, ma usa le stime di EBIT per i prossimi 12 mesi."
  },
  ev_ebitda_ttm: {
    title: "EV/EBITDA (TTM)",
    text: "Valore dell’azienda rapportato all’EBITDA (utile operativo lordo) degli ultimi 12 mesi. Utile per confrontare aziende in settori diversi."
  },
  ev_ebitda_fwd: {
    title: "EV/EBITDA (Forward)",
    text: "Come sopra, ma sulle previsioni EBITDA dei prossimi 12 mesi."
  },
  pfcf: {
    title: "P/FCF",
    text: "Prezzo di mercato rispetto al flusso di cassa libero (Free Cash Flow). Più basso è, più l’azienda genera liquidità rispetto al suo prezzo."
  },
  ev_revenue: {
    title: "EV/Revenue",
    text: "Valore totale dell’azienda rispetto ai ricavi. Serve per confrontare società con margini diversi."
  },
  ev_fcf: {
    title: "EV/FCF",
    text: "Enterprise Value diviso per Free Cash Flow. Utile per aziende mature e con molta cassa."
  },
  roic_wacc: {
    title: "ROIC vs WACC",
    text: "Confronta il rendimento del capitale investito (ROIC) con il costo del capitale (WACC). Se il ROIC è superiore al WACC, l’azienda crea valore."
  },
  dcf_base: {
    title: "DCF Fair Value – Base",
    text: "Valore teorico calcolato con il metodo dei flussi di cassa attualizzati (Discounted Cash Flow) in uno scenario 'normale'."
  },
  dcf_bull: {
    title: "DCF Fair Value – Bull",
    text: "Valore DCF in scenario ottimistico (Bull): ipotizza crescita maggiore."
  },
  dcf_bear: {
    title: "DCF Fair Value – Bear",
    text: "Valore DCF in scenario pessimistico (Bear): ipotizza crescita minore."
  },
  upside: {
    title: "Upside % vs prezzo attuale",
    text: "Indica il potenziale di rialzo (o ribasso) rispetto al prezzo attuale, secondo le stime di fair value."
  },
  ranking_pe: {
    title: "Ranking Peer – P/E",
    text: "Posizione del titolo rispetto ai concorrenti (peer group) in base al P/E. Serve per vedere se è caro o a sconto rispetto al settore."
  },
  ranking_ev_ebitda: {
    title: "Ranking Peer – EV/EBITDA",
    text: "Posizionamento rispetto ai pari settore per EV/EBITDA."
  },
  ranking_ev_ebit: {
    title: "Ranking Peer – EV/EBIT",
    text: "Posizionamento rispetto ai pari settore per EV/EBIT."
  },
  ranking_pb: {
    title: "Ranking Peer – P/B",
    text: "Posizione rispetto ai concorrenti in base al Price/Book."
  }
};
const tooltipsBlocco3 = {
  ricavi_ttm: {
    title: "Ricavi (TTM)",
    text: "Somma di tutti i ricavi aziendali negli ultimi 12 mesi (TTM = trailing twelve months). Misura la forza commerciale dell’azienda."
  },
  crescita_ricavi_yoy: {
    title: "Crescita Ricavi YoY",
    text: "Variazione percentuale dei ricavi rispetto allo stesso periodo dell’anno precedente (Year over Year). Indica se l’azienda sta crescendo."
  },
  crescita_ricavi_qoq: {
    title: "Crescita Ricavi QoQ",
    text: "Variazione percentuale dei ricavi rispetto al trimestre precedente (Quarter over Quarter)."
  },
  utile_netto_ttm: {
    title: "Utile Netto (TTM)",
    text: "Guadagno complessivo dell’azienda dopo tutte le spese e le tasse negli ultimi 12 mesi."
  },
  crescita_utile_netto_yoy: {
    title: "Crescita Utile Netto YoY",
    text: "Crescita percentuale dell’utile netto rispetto all’anno precedente."
  },
  crescita_utile_netto_qoq: {
    title: "Crescita Utile Netto QoQ",
    text: "Crescita percentuale dell’utile netto rispetto al trimestre precedente."
  },
  eps_ttm: {
    title: "EPS (TTM)",
    text: "Utile netto per azione negli ultimi 12 mesi. Indica quanto guadagna la società per ciascuna azione in circolazione."
  },
  eps_yoy_qoq: {
    title: "EPS YoY / QoQ",
    text: "Variazione dell’utile per azione rispetto all’anno o al trimestre precedente."
  },
  ebit_ttm: {
    title: "EBIT (TTM)",
    text: "Utile operativo (prima di interessi e tasse) degli ultimi 12 mesi."
  },
  ebitda_ttm: {
    title: "EBITDA (TTM)",
    text: "Utile operativo lordo negli ultimi 12 mesi, utile per confrontare aziende in settori diversi."
  },
  fcf_ttm: {
    title: "Free Cash Flow (TTM)",
    text: "Liquidità generata dopo gli investimenti necessari, negli ultimi 12 mesi. Più è alto, meglio è."
  },
  ocf_ttm: {
    title: "Operating Cash Flow (TTM)",
    text: "Flusso di cassa generato dalle attività operative negli ultimi 12 mesi."
  },
  capex_ttm: {
    title: "Capex (TTM)",
    text: "Spese in conto capitale: soldi spesi per mantenere o migliorare gli asset, negli ultimi 12 mesi."
  },
  roe: {
    title: "ROE",
    text: "Return on Equity: misura la redditività del capitale proprio investito dagli azionisti."
  },
  roa: {
    title: "ROA",
    text: "Return on Assets: indica quanto rendimento genera l’azienda rispetto alle sue attività totali."
  },
  roi: {
    title: "ROI",
    text: "Return on Investment: misura la redditività generale degli investimenti dell’azienda."
  },
  margine_lordo: {
    title: "Margine Lordo",
    text: "Percentuale dei ricavi rimasta dopo il costo dei prodotti venduti. Misura l’efficienza produttiva."
  },
  margine_operativo: {
    title: "Margine Operativo",
    text: "Percentuale dei ricavi rimasta dopo costi operativi, ma prima di interessi e tasse."
  },
  margine_netto: {
    title: "Margine Netto",
    text: "Percentuale dei ricavi che resta come utile dopo tutte le spese, tasse e interessi."
  },
  margine_ebit: {
    title: "Margine EBIT (%)",
    text: "Quota percentuale dei ricavi che rimane come EBIT (utile operativo)."
  },
  margine_fcf: {
    title: "Margine FCF (%)",
    text: "Percentuale dei ricavi che si trasforma in free cash flow."
  },
  debito_totale: {
    title: "Debito Totale",
    text: "Somma di tutti i debiti aziendali a breve e lungo termine."
  },
  net_debt: {
    title: "Net Debt",
    text: "Debito netto: totale dei debiti meno la cassa e i mezzi equivalenti. "
  },
  cash_equivalenti: {
    title: "Cash & Equivalenti",
    text: "Liquidità disponibile immediatamente: cassa e depositi a breve. "
  },
  debt_equity: {
    title: "Debt/Equity",
    text: "Rapporto tra debito totale e capitale proprio. Misura la leva finanziaria."
  },
  debt_ebitda: {
    title: "Debt/EBITDA",
    text: "Debito totale diviso per EBITDA: misura la sostenibilità del debito rispetto ai profitti operativi lordi."
  },
  debt_fcf: {
    title: "Debt/FCF",
    text: "Debito totale diviso per free cash flow: più è basso, meglio è."
  },
  net_working_capital: {
    title: "Net Working Capital e variazione YoY/QoQ",
    text: "Capitale circolante netto e sua variazione anno/trimestre su anno/trimestre: indica la liquidità operativa di breve periodo."
  },
  interest_coverage: {
    title: "Copertura Interessi (Interest Coverage EBIT/EBITDA)",
    text: "Quante volte l’utile operativo (EBIT o EBITDA) copre le spese per interessi: >3 è considerato solido."
  },
  altman_z: {
    title: "Altman Z-score o equivalente",
    text: "Indicatore sintetico di rischio fallimento. Sopra 3 solitamente è zona di sicurezza."  },
  dividend_payout: {
    title: "Dividend Payout Ratio",
    text: "Percentuale di utile netto distribuito come dividendi. Serve per capire quanto del profitto viene restituito agli azionisti."
  },
  tax_rate: {
    title: "Tax Rate Effettivo",
    text: "Aliquota fiscale effettivamente pagata sull’utile (differisce dall’aliquota teorica)."
  }
};
const tooltipsBlocco4 = {
  dividend_status: {
    title: "Dividend Status",
    text: "Indica se il dividendo è attualmente pagato (Attivo) o no (Assente)."
  },
  dividend_yield: {
    title: "Dividend Yield (%)",
    text: "Percentuale che rappresenta quanto rende il dividendo rispetto al prezzo dell’azione. Più è alto, maggiore è la rendita periodica."
  },
  dps: {
    title: "DPS (Dividendo per Azione)",
    text: "Ammontare del dividendo pagato per ogni azione, solitamente espresso annualmente o negli ultimi 12 mesi."
  },
  frequenza_pagamento: {
    title: "Frequenza Pagamento",
    text: "Ogni quanto viene pagato il dividendo: può essere annuale, semestrale, trimestrale o nessuno."
  },
  ex_dividend_date: {
    title: "Ex‑Dividend Date",
    text: "Data dopo la quale chi compra l’azione non riceverà il prossimo dividendo. Serve per sapere quando avere le azioni in portafoglio."
  },
  record_date: {
    title: "Record Date",
    text: "Giorno in cui l’azienda registra gli azionisti che riceveranno il dividendo."
  },
  payment_date: {
    title: "Payment Date",
    text: "Data effettiva in cui il dividendo viene pagato agli azionisti."
  },
  payout_net_income: {
    title: "Payout Ratio su Net Income (%)",
    text: "Quota dell’utile netto distribuita agli azionisti come dividendo. Più è alta, più l’azienda restituisce agli azionisti."
  },
  payout_fcf: {
    title: "Payout su FCF (%)",
    text: "Percentuale del flusso di cassa libero che viene distribuito come dividendo. Utile per valutare la sostenibilità dei pagamenti."
  },
  dividend_policy: {
    title: "Dividend Policy",
    text: "Riassunto della politica aziendale ufficiale sui dividendi, con eventuale link al documento."
  },
  anni_consecutivi: {
    title: "Anni consecutivi di distribuzione",
    text: "Numero di anni di seguito in cui l’azienda ha pagato dividendi senza interruzioni."
  },
  buyback_status: {
    title: "Buyback Status",
    text: "Indica se il programma di riacquisto azioni proprie è attivo, in pausa, scaduto o assente."
  },
  buyback_autorizzazione: {
    title: "Autorizzazione Buyback",
    text: "Dettagli su importo massimo, valuta, data di annuncio e durata della nuova autorizzazione a riacquistare azioni."
  },
  buyback_ltm: {
    title: "Buyback eseguito LTM",
    text: "Valore e numero di azioni riacquistate negli ultimi 12 mesi."
  },
  buyback_rimanente: {
    title: "Rimanente autorizzazione",
    text: "Importo e percentuale ancora disponibili da utilizzare per ulteriori riacquisti."
  },
  buyback_prezzo_medio: {
    title: "Prezzo medio riacquisto (LTM)",
    text: "Prezzo medio pagato per le azioni riacquistate negli ultimi 12 mesi."
  },
  sbc_ltm: {
    title: "SBC (azioni/emesse) LTM",
    text: "Numero e percentuale di azioni emesse come compensi ai dipendenti negli ultimi 12 mesi."
  },
  net_share_change: {
    title: "Net Share Change YoY (%)",
    text: "Variazione percentuale del numero totale di azioni in un anno. Se negativo, azioni ridotte (buono)."
  },
  antidilution: {
    title: "Anti‑dilution effectiveness",
    text: "Efficacia del buyback nel compensare le nuove azioni emesse (ad esempio per stock option)."
  },
  total_shareholder_yield: {
    title: "Total Shareholder Yield (%)",
    text: "Rendimento totale per l’azionista, che somma dividendo e rendimento da buyback."
  },
  governance_note: {
    title: "ESG / Governance note",
    text: "Eventuali note sulla sostenibilità, trasparenza e responsabilità aziendale legate a dividendi e buyback."
  }
};
const tooltipsBlocco5 = {
  performance_ytd: {
    title: "Performance YTD (%)",
    text: "Rendimento da inizio anno ad oggi. Utile per vedere come si sta muovendo l’asset nel 2025."
  },
  performance_1m: {
    title: "Performance 1M (%)",
    text: "Rendimento nell’ultimo mese. Serve a capire se c’è stato un trend recente forte."
  },
  performance_6m: {
    title: "Performance 6M (%)",
    text: "Rendimento negli ultimi 6 mesi. Per valutare la tendenza semestrale."
  },
  performance_12m: {
    title: "Performance 12M (%)",
    text: "Rendimento negli ultimi 12 mesi, cioè l’ultimo anno intero."
  },
  performance_3y: {
    title: "Performance 3 anni (%)",
    text: "Rendimento annualizzato degli ultimi 3 anni. Mostra la crescita media su periodo lungo."
  },
  drawdown_1y: {
    title: "Drawdown massimo 1 anno (%)",
    text: "Peggiore perdita registrata in percentuale nell’ultimo anno partendo da un massimo."
  },
  drawdown_3y: {
    title: "Drawdown massimo 3 anni (%)",
    text: "Peggiore perdita registrata negli ultimi 3 anni. Indica il rischio di ‘crollo’ prolungato."
  },
  volatilita_30d: {
    title: "Volatilità 30 giorni (ann.) (%)",
    text: "Oscillazione dei prezzi nell’ultimo mese, annualizzata. Se alta, asset più rischioso."
  },
  beta_1y: {
    title: "Beta 1 anno vs benchmark",
    text: "Misura quanto l’asset si muove rispetto al suo indice di riferimento. 1 = stesso rischio del mercato."
  },
  alpha_1y: {
    title: "Alpha 1 anno vs benchmark",
    text: "Rendimento aggiuntivo ottenuto rispetto al benchmark. Valore positivo = meglio del mercato."
  },
  tracking_error_1y: {
    title: "Tracking Error 1 anno (%)",
    text: "Scarto medio tra i rendimenti dell’asset e del benchmark. Più basso = più simile all’indice."
  },
  information_ratio_1y: {
    title: "Information Ratio 1 anno",
    text: "Indica quanto rendimento extra ottieni per ogni punto di rischio rispetto all’indice. Più alto è, meglio gestito."
  },
  sharpe_1y: {
    title: "Sharpe Ratio (1 anno)",
    text: "Rendimento corretto per la volatilità. Più alto è, migliore è il rapporto rischio/rendimento."
  },
  sortino_1y: {
    title: "Sortino Ratio (1 anno)",
    text: "Come lo Sharpe, ma penalizza solo le perdite. Ottimo per valutare asset con rischi asimmetrici."
  },
  var_95_1d: {
    title: "VaR 95% (1 giorno)",
    text: "Perdita massima attesa in un giorno con probabilità del 95%. Aiuta a stimare il rischio ‘estremo’."
  },
  risk_level_tradelia: {
    title: "Risk Level – Tradelia AI",
    text: "Valutazione sintetica del rischio (basso, medio, alto, estremo) secondo la metodologia Tradelia AI."
  }
};
const tooltipsBlocco6 = {
  volume_medio_azioni: {
    title: "Volume medio giornaliero (Azioni)",
    text: "Numero medio di azioni scambiate ogni giorno negli ultimi 3 mesi. Un volume elevato significa che il titolo è liquido e facile da comprare/vendere."
  },
  volume_medio_usd: {
    title: "Volume medio giornaliero (USD)",
    text: "Valore totale scambiato ogni giorno (in dollari) negli ultimi 3 mesi. Aiuta a capire la rilevanza sul mercato globale."
  },
  distribuzione_volumi_intraday: {
    title: "Distribuzione volumi intraday",
    text: "Come sono distribuiti i volumi tra apertura, metà seduta e chiusura. Utile per capire i momenti più attivi e quelli più ‘vuoti’."
  },
  turnover_float: {
    title: "Turnover del flottante",
    text: "Quanto spesso l’intero ‘free float’ cambia di mano. Se alto, molti investitori si scambiano le azioni rapidamente."
  },
  median_trade_size: {
    title: "Median trade size",
    text: "Dimensione tipica (mediana) di uno scambio singolo. Un valore basso suggerisce molta attività retail, uno alto prevalenza di investitori istituzionali."
  },
  quoted_spread: {
    title: "Quoted spread (bps)",
    text: "Differenza tra prezzo denaro/lettera espressa in ‘basis point’. Più basso è, meno costa entrare/uscire dal titolo."
  },
  effective_spread: {
    title: "Effective spread (bps)",
    text: "Spread effettivo realmente pagato dagli operatori. Un buon indice della vera liquidità."
  },
  tick_size: {
    title: "Tick size relativa",
    text: "Minimo incremento di prezzo consentito. Influisce su quanto ‘fine’ può essere la variazione di prezzo."
  },
  slippage_stimato: {
    title: "Slippage stimato",
    text: "Differenza tra prezzo atteso e prezzo effettivo per ordini di grande taglia (100k/1M USD). Più è basso, meglio è per chi fa operazioni grosse."
  },
  price_improvement: {
    title: "Price improvement %",
    text: "Percentuale di ordini eseguiti a un prezzo migliore di quello richiesto. Più alto, meglio per l’investitore."
  },
  odd_lot: {
    title: "Odd-lot %",
    text: "Quota di scambi ‘irregolari’ per dimensione (non multipli di 100). Indica attività di piccoli operatori."
  },
  market_depth: {
    title: "Market depth (10 livelli)",
    text: "Quantità di ordini disponibili nei primi 10 livelli del book. Più profondità, meno rischio di ‘spostare’ il prezzo con ordini grandi."
  },
  book_imbalance: {
    title: "Order book imbalance",
    text: "Squilibrio tra domanda (bid) e offerta (ask). Se troppo sbilanciato può segnalare pressione a comprare o vendere."
  },
  volumi_asta: {
    title: "Volumi asta apertura/chiusura",
    text: "Quanti volumi passano nelle aste di apertura o chiusura. Serve a capire se i prezzi di fixing sono affidabili."
  },
  venue_lit_off: {
    title: "Ripartizione lit/off-exchange",
    text: "Percentuale di scambi su mercati trasparenti (lit) rispetto a mercati OTC o alternativi (dark pool)."
  },
  venue_principali: {
    title: "Ripartizione per venue principali",
    text: "Dove avvengono la maggior parte degli scambi (es: Nasdaq, NYSE, ARCA, ecc)."
  },
  short_interest: {
    title: "Short interest (% float)",
    text: "Percentuale di azioni prese in prestito per scommettere sul ribasso. Un valore elevato segnala pressione ribassista o rischio di ‘short squeeze’."
  },
  days_to_cover: {
    title: "Days-to-cover",
    text: "Giorni necessari a ricoprire tutte le posizioni short con i volumi medi giornalieri. Più alto = maggiore rischio di squeeze."
  },
  borrow_fee: {
    title: "Borrow fee (%)",
    text: "Tasso pagato per prendere a prestito le azioni. Se alto, difficile (o costoso) andare short."
  },
  utilization: {
    title: "Utilization (%)",
    text: "Quota delle azioni disponibili effettivamente date in prestito. Se vicino a 100%, poco spazio per nuovi short."
  },
  fails_to_deliver: {
    title: "Fails-to-deliver recenti",
    text: "Numero di volte in cui non si è riusciti a consegnare i titoli a regolamento. Troppi = segnali di stress sul mercato."
  },
  opzioni_adv: {
    title: "Opzioni – ADV",
    text: "Numero medio giornaliero di contratti scambiati sulle opzioni dell’asset. Più alto = mercato derivati attivo."
  },
  opzioni_oi: {
    title: "Opzioni – Open Interest",
    text: "Numero totale di contratti aperti (call e put) sulle opzioni. Misura l’interesse su questi strumenti."
  },
  opzioni_spread: {
    title: "Opzioni – bid-ask medio (%)",
    text: "Differenza media tra prezzi denaro/lettera sulle opzioni. Se stretto, mercato efficiente e liquido."
  },
  opzioni_maturita_strike: {
    title: "Opzioni – maturità/strike liquidi",
    text: "Scadenze e strike dove le opzioni sono più liquide e scambiate. Aiuta a scegliere strategie operative."
  },
  dma_depth: {
    title: "DMA/Depth access",
    text: "Accesso diretto ai flussi e profondità del book (es. TotalView, FIX, co-location). Rilevante solo per investitori evoluti."
  },
  futures_prodotti: {
    title: "Futures/prodotti sintetici",
    text: "Presenza di futures o prodotti equivalenti sul titolo. Utile per strategie avanzate."
  },
  peso_turnover: {
    title: "% turnover nell’indice/settore",
    text: "Quanto il titolo pesa in termini di scambi rispetto al suo indice o settore."
  },
  peso_etf: {
    title: "Peso in ETF core e flussi ETF",
    text: "Peso dell’asset nei principali ETF (es: SPY, QQQ) e variazione flussi ETF ultimi 7 giorni."
  },
  market_quality_index: {
    title: "Market Quality Index – Tradelia AI",
    text: "Valutazione sintetica della qualità di mercato secondo la metodologia Tradelia AI. Da 0 (scarso) a 100 (eccellente)."
  }
};
const tooltipsBlocco7 = {
  // 1) Struttura del listino & profondità
  opzioni_disponibili: {
    title: "Opzioni equity disponibili",
    text: "Se sono disponibili opzioni ufficiali sull’azione, su quali exchange vengono scambiate. Se non sono quotate opzioni, il dato è 'Assente'."
  },
  n_scadenze_listate: {
    title: "Numero scadenze listate",
    text: "Quante diverse scadenze sono negoziabili (incluse weekly e opzioni a zero giorni 0DTE). Indica la flessibilità per strategie a breve/lungo."
  },
  n_strike_per_scadenza: {
    title: "Numero medio strike per scadenza",
    text: "Quanti diversi prezzi di esercizio (strike) sono disponibili in media per ciascuna scadenza."
  },
  distanza_strike: {
    title: "Distanza strike (media/min/max)",
    text: "Quanto sono ravvicinati gli strike, sia in media che nei casi limite. Strike molto distanti indicano poca granularità."
  },
  distribuzione_oi_scadenza: {
    title: "Distribuzione Open Interest per scadenza",
    text: "Dove si concentrano i contratti aperti sulle varie scadenze, sia come numero che come valore."
  },
  distribuzione_oi_moneyness: {
    title: "Distribuzione OI per moneyness",
    text: "Quanti contratti sono in-the-money, at-the-money o out-of-the-money rispetto al prezzo attuale."
  },
  concentrazione_volumi_oi: {
    title: "Concentrazione volumi/OI",
    text: "Quanto gli scambi e gli interessi si concentrano su pochi strike o scadenze. Se molto concentrato, il mercato è meno liquido."
  },

  // 2) Volumi & OI
  volume_medio_opzioni: {
    title: "Volume medio opzioni (5 giorni)",
    text: "Quanti contratti vengono scambiati in media ogni giorno nelle ultime 5 sedute. Volume alto = mercato liquido."
  },
  volume_medio_call_put: {
    title: "Volume medio Call vs Put",
    text: "Rapporto tra volumi su opzioni call (rialziste) e put (ribassiste). Aiuta a capire il sentiment degli operatori."
  },
  open_interest_totale: {
    title: "Open Interest totale",
    text: "Numero totale di contratti aperti e non chiusi sulle opzioni di questo asset."
  },
  delta_oi_5g: {
    title: "ΔOI 5 giorni (call/put)",
    text: "Variazione dell’Open Interest negli ultimi 5 giorni, sia su call che su put."
  },
  delta_oi_by_expiry: {
    title: "ΔOI by-expiry (Top 3)",
    text: "Come cambia l’interesse aperto sulle tre scadenze più importanti."
  },
  rapporto_volume_oi: {
    title: "Rapporto Volume/OI (5 giorni)",
    text: "Volume medio degli scambi diviso open interest. Valori alti = opzioni più speculative."
  },
  options_stock_ratio: {
    title: "Options-to-stock notional ratio",
    text: "Rapporto tra valore nozionale scambiato in opzioni e quello sulle azioni sottostanti. Se alto, molte strategie derivate in corso."
  },

  // 3) Prezzi & spread
  bid_ask_atm_30d: {
    title: "Bid-ask mediano (%) – ATM 30d",
    text: "Differenza tra prezzo denaro e lettera sulle opzioni at-the-money con scadenza 30 giorni. Misurato in diversi momenti della giornata."
  },
  bid_ask_otm: {
    title: "Bid-ask mediano (%) – OTM",
    text: "Spread medio per opzioni fuori dal prezzo attuale. Può essere molto più ampio di ATM, soprattutto per strike lontani."
  },
  prezzo_medio_trade: {
    title: "Prezzo medio trade",
    text: "Prezzo medio a cui vengono scambiate le opzioni in giornata."
  },
  median_trade_size_opz: {
    title: "Median trade size",
    text: "Dimensione tipica di ogni scambio (numero di contratti per trade)."
  },
  percent_strike_illiquidi: {
    title: "% strike illiquidi",
    text: "Percentuale di strike dove non ci sono offerte reali (bid=0) o con size minima. Se molto alto, il mercato è poco accessibile."
  },

  // 4) Volatilità implicita & realizzata
  iv_atm: {
    title: "IV ATM (7d/30d/60d/90d) + slope",
    text: "Volatilità implicita delle opzioni at-the-money su 7, 30, 60, 90 giorni e pendenza della curva. Serve per capire quanto il mercato si aspetta movimenti forti."
  },
  iv_rank: {
    title: "IV Rank & IV Percentile (1y/90d)",
    text: "Quanto è alta la volatilità implicita rispetto alla propria storia (1 anno e 90 giorni). Più alto = opzioni care rispetto al solito."
  },
  iv_rv_spread: {
    title: "IV–RV spread (30d)",
    text: "Differenza tra volatilità implicita (IV) e volatilità realizzata (RV) negli ultimi 30 giorni. Un IV molto più alto del RV può segnalare opzioni sopravvalutate."
  },
  skew_standardizzato: {
    title: "Skew standardizzato (RR/BF 25Δ)",
    text: "Misura se le opzioni call o put costano di più rispetto all’ATM. Skew alto significa mercato ‘spaventato’ da forti movimenti unilaterali."
  },
  implied_move_evento: {
    title: "Implied move su evento",
    text: "Quanto il mercato si aspetta che il prezzo si muova in occasione di un evento (es: trimestrale), secondo il prezzo delle opzioni."
  },

  // 5) Posizionamento & rischio
  put_call_ratio: {
    title: "Put/Call Ratio (volume & OI)",
    text: "Rapporto tra numero di put e call scambiate e aperte. Se molto alto, aspettative ribassiste; molto basso, aspettative rialziste."
  },
  gamma_exposure: {
    title: "Gamma Exposure (GEX)",
    text: "Quantità totale di esposizione gamma detenuta dal mercato. Indica sensibilità a grandi movimenti improvvisi."
  },
  gamma_flip_level: {
    title: "Gamma-flip level",
    text: "Livello di prezzo dove la posizione gamma del mercato si inverte (da stabilizzante a destabilizzante, o viceversa)."
  },
  dealer_positioning: {
    title: "Dealer positioning (Vanna, Charm)",
    text: "Come sono posizionati i dealer rispetto a parametri avanzati di rischio (solo se disponibile)."
  },
  greeks_aggregati: {
    title: "Greeks aggregati",
    text: "Valori aggregati delle principali greche: Delta, Gamma, Vega (notional). Aiuta a capire se il mercato è più direzionale, sensibile a volatilità, ecc."
  },
  liquidity_stress: {
    title: "Liquidity stress",
    text: "Percentuale di strike con bid=0 o size minima. Se alto, segnala situazioni di stress e illiquidità sul mercato opzioni."
  },

  // 6) Weekly & strategie compatibili
  weekly_opzioni: {
    title: "Opzioni settimanali disponibili",
    text: "Quante opzioni con scadenza settimanale sono negoziabili nei prossimi 6 mesi, e che parte dei volumi rappresentano."
  },
  strategie_compatibili: {
    title: "Strategie compatibili (matrix Tradelia AI)",
    text: "Quali strategie operative sono adatte in base a volatilità, skew, liquidità (es: covered call, vertical, iron condor, straddle, ecc.)."
  },
  slippage_standard: {
    title: "Slippage atteso (bps, strategie standard)",
    text: "Quanto ci si può aspettare di ‘perdere’ rispetto al teorico eseguendo una strategia standard con size di riferimento."
  },

  // 7) Futures & proxy
  ssf_presenza: {
    title: "Single-Stock Futures (SSF)",
    text: "Se esistono futures direttamente sull’azione: exchange, ticker, margini, scadenze, ecc."
  },
  proxy_futures_etf: {
    title: "Proxy futures / ETF futures",
    text: "Futures o ETF che possono essere usati come sostituti dell’azione (es. ES/NQ per S&P/Nasdaq), e quanto sono correlati con il titolo."
  },
  etp_leva_short: {
    title: "ETP leva/short",
    text: "ETF/ETP a leva o short molto liquidi sull’asset. Solo se davvero liquidi e accessibili."
  },

  // 8) Derivati OTC
  warrant: {
    title: "Warrant / covered warrants",
    text: "Strumenti derivati regolamentati, simili alle opzioni ma emessi da intermediari, se disponibili."
  },
  swap_trs: {
    title: "Swap / TRS",
    text: "Derivati su misura come Total Return Swap, segnalati solo se documentati da comunicazioni ufficiali."
  },
  knockout_turbo: {
    title: "Knock-out / turbo",
    text: "Strumenti derivati che offrono leva e protezione automatica, se rilevanti e documentati."
  },
  dividend_assignment_risk: {
    title: "Dividend / early-exercise risk",
    text: "Segnala se esiste rischio di essere assegnati o dover esercitare l’opzione anticipatamente per via di un dividendo."
  }
};
const tooltipsBlocco8 = {
  vwap_daily: {
    title: "VWAP daily + σ1/σ2",
    text: "Il VWAP mostra il prezzo medio ponderato per i volumi della giornata. Le bande σ1/σ2 segnalano zone statistiche di supporto/resistenza dinamici."
  },
  vwap_weekly_stack: {
    title: "VWAP weekly (stack)",
    text: "Prezzo medio dei volumi calcolato su base settimanale. Se più VWAP sono 'impilati', segnalano cluster di prezzo importanti."
  },
  ema21: {
    title: "EMA21",
    text: "Media mobile esponenziale a 21 periodi: individua il trend di breve."
  },
  ema55: {
    title: "EMA55",
    text: "Media mobile esponenziale a 55 periodi: individua il trend intermedio."
  },
  ema200: {
    title: "EMA200",
    text: "Media mobile esponenziale a 200 periodi: è la principale linea del trend di lungo termine."
  },
  bollinger_bands: {
    title: "Bollinger Bands (BBW %ile)",
    text: "Canali che misurano la volatilità. BBW percentile indica quanto le bande siano 'larghe' rispetto alla loro storia: più larghe, più volatilità."
  },
  atr_percentile: {
    title: "ATR %ile",
    text: "L’ATR misura la volatilità attuale. Il percentile mostra se la volatilità è alta o bassa rispetto al passato."
  },
  delta_vwap: {
    title: "ΔVWAP % e ΔVWAPσ",
    text: "Differenza percentuale tra VWAP attuale e sessioni precedenti, e la variazione delle sue bande."
  },
  rvol_fast: {
    title: "RVOL Fast (10)",
    text: "Volume relativo rapido: paragona il volume attuale alla media delle ultime 10 sessioni. >1 = volumi sopra la norma."
  },
  rvol_slow: {
    title: "RVOL Slow (20)",
    text: "Volume relativo lento: confronto rispetto alle ultime 20 sessioni, utile per tendenze di fondo."
  },
  dry_volume_regime: {
    title: "Dry Volume regime (ON/OFF)",
    text: "Segnala se il mercato è in una fase di volumi anomali (secchi/bassi) che spesso precede forti movimenti."
  },
  volume_profile: {
    title: "Volume Profile (POC, VAH, VAL, VA Width%, POC shift)",
    text: "Il profilo dei volumi mostra dove si sono concentrati gli scambi: POC è il prezzo più battuto, VAH e VAL sono i limiti superiori/inferiori della zona di valore, VA Width% la sua ampiezza, POC shift il movimento rispetto alla sessione precedente."
  },
  adx: {
    title: "ADX (trend strength)",
    text: "Indice che misura la forza del trend, indipendentemente dalla direzione."
  },
  rsi: {
    title: "RSI",
    text: "Indica la velocità e il cambio dei movimenti di prezzo. Può individuare condizioni di ipercomprato/ipervenduto o divergenze."
  },
  macd: {
    title: "MACD",
    text: "Indicatore di momentum che aiuta a identificare cambi di direzione del trend e possibili divergenze."
  },
  obv: {
    title: "OBV (On Balance Volume)",
    text: "Indica se i volumi confermano il trend di prezzo, utile per vedere accumulo/distribuzione."
  },
  pvt: {
    title: "PVT (Price Volume Trend)",
    text: "Simile all’OBV, misura la forza dei movimenti di prezzo considerando anche i volumi."
  },
  obv_pvt_slope: {
    title: "OBV/PVT (slope + divergenze)",
    text: "Analizza la pendenza e possibili divergenze rispetto al prezzo: se volumi e prezzo divergono, attenzione a un possibile cambio di trend."
  },
  ah1r: {
    title: "AH1R % (Average H1 range)",
    text: "Ampiezza media delle candele orarie: aiuta a valutare se il mercato si sta 'muovendo' o è fermo."
  },
  squeeze_flag: {
    title: "Squeeze flag (ON/OFF)",
    text: "Indica se il mercato è in fase di compressione dei prezzi: tipicamente anticipa un’esplosione di volatilità."
  },
  structure: {
    title: "Structure: BOS, CHOCH, FBO",
    text: "Pattern strutturali che segnalano rotture (Break of Structure), cambi di trend (Change of Character), o falsi breakout (Failed Breakout)."
  },
  delta_poc_vwap_ema: {
    title: "Δ prezzo da POC/VWAP/EMA55/EMA200",
    text: "Quanto il prezzo attuale è distante dai livelli tecnici chiave: aiuta a capire quanto può muoversi ancora."
  },
  or30_or60: {
    title: "OR30 / OR60 (solo M15)",
    text: "Opening Range delle prime 30 o 60 minuti: misura la volatilità di apertura, utile per chi fa intraday."
  }
};
const tooltipsBlocco9 = {
  azionariato_istituzionale: {
    title: "Azionariato Istituzionale (%)",
    text: "Quota di azioni detenuta da fondi, banche e investitori professionali. Più è alta, più la società è seguita e sotto controllo."
  },
  azionariato_insider: {
    title: "Azionariato Insider (%)",
    text: "Percentuale di azioni posseduta da dirigenti, amministratori e fondatori. Un valore elevato può segnalare fiducia interna, ma anche rischi di governance."
  },
  attivita_insider: {
    title: "Attività Insider (ultimi 90gg)",
    text: "Acquisti o vendite di azioni da parte dei manager e dirigenti nell’ultimo trimestre. Gli acquisti sono spesso considerati un segnale positivo."
  },
  esg_score: {
    title: "ESG Score Globale",
    text: "Valutazione complessiva della società su ambiente (E), sociale (S) e governance (G). Più alto, meglio la società si comporta in termini di sostenibilità e responsabilità."
  },
  esg_breakdown: {
    title: "Breakdown ESG (E / S / G)",
    text: "Dettaglio dei punteggi nelle tre aree: E (Ambiente), S (Sociale), G (Governance). Permette di capire dove l’azienda è più o meno virtuosa."
  },
  controversie_esg: {
    title: "Controversie ESG / Legali",
    text: "Eventuali problemi legali, scandali o polemiche su ambiente, sociale o governance negli ultimi anni."
  },
  ceo_chairman: {
    title: "CEO / Chairman",
    text: "Chi sono il CEO (amministratore delegato) e il Chairman (presidente del consiglio). Quando le due figure coincidono, può esserci minore controllo."
  },
  governance_signals: {
    title: "Segnali Governance (board, audit, poison, proxy)",
    text: "Aspetti chiave della struttura di controllo: composizione del board, comitato audit, difese anti-scalata ('poison pill'), votazioni proxy."
  },
  peer_esg_percentile: {
    title: "Peer ESG – Percentile Settoriale",
    text: "Posizionamento ESG rispetto ai concorrenti diretti (percentile di settore)."
  },
  esg_outlook: {
    title: "ESG Outlook (Trend 12 mesi)",
    text: "Come sta evolvendo il punteggio ESG nell’ultimo anno: trend positivo, stabile o negativo."
  },
  audit_opinion: {
    title: "Audit Opinion / Going Concern",
    text: "Valutazione della società di revisione: se è positiva, i conti sono ritenuti affidabili. Un richiamo sul 'going concern' segnala rischio di continuità aziendale."
  },
  say_on_pay: {
    title: "Say-on-Pay – Ultimo Voto (%)",
    text: "Percentuale di approvazione degli azionisti sulle politiche di remunerazione del management. Un voto basso segnala insoddisfazione."
  },
  board_tenure_media: {
    title: "Board Tenure Media (anni)",
    text: "Anzianità media dei membri del consiglio di amministrazione. Una buona diversità di esperienza è spesso preferibile a board troppo 'storici'."
  },
  rpt: {
    title: "Transazioni Parti Correlate (RPT)",
    text: "Operazioni della società con azionisti rilevanti o membri del board. Troppe RPT possono segnalare conflitti d’interesse."
  },
  diversity_board: {
    title: "Diversity Board / Leadership (% donne / etnie)",
    text: "Quota di donne e minoranze tra amministratori e top manager. Più diversità può portare migliori decisioni e reputazione."
  }
};
const tooltipsBlocco10 = {
  flussi_etf_settimanali: {
    title: "Flussi netti ETF settimanali (equity / bond)",
    text: "Saldo tra acquisti e vendite negli ETF azionari e obbligazionari che contengono il titolo, calcolato ogni settimana. Un flusso positivo indica acquisti netti, uno negativo vendite."
  },
  flussi_etf_mensili: {
    title: "Flussi netti ETF mensili",
    text: "Saldo totale tra acquisti e vendite sugli ETF che investono nel titolo, su base mensile. Misura il trend di interesse degli investitori."
  },
  aum_etf_core: {
    title: "AUM ETF core (vs peer)",
    text: "Patrimonio gestito dagli ETF principali (core) che includono il titolo, confrontato con quello dei concorrenti. Un AUM alto segnala più stabilità e visibilità."
  },
  rotazioni_settoriali: {
    title: "Rotazioni settoriali / tematiche",
    text: "Spostamento di flussi tra settori (es. da tech a energia) o temi (es. AI, green). Indica dove va il denaro degli investitori."
  },
  concentrazione_etf_top_holder: {
    title: "Concentrazione ETF top holder sul titolo",
    text: "Quanto peso hanno i maggiori ETF tra gli azionisti del titolo. Alta concentrazione significa che pochi ETF controllano molte azioni."
  },
  flussi_etf_retail_vs_istituzionali: {
    title: "Flussi ETF retail vs istituzionali",
    text: "Confronta i flussi provenienti da investitori privati ('retail') e professionali ('istituzionali'). Serve a capire chi guida il mercato."
  },
  correlazione_flussi_prezzo: {
    title: "Correlazione tra flussi ETF e prezzo titolo",
    text: "Quanto sono collegati i movimenti di flussi ETF e il prezzo dell’azione. Un’alta correlazione suggerisce che i flussi influenzano direttamente il prezzo."
  },
  pos_etf_short_inversi: {
    title: "Posizionamento su ETF short / inversi (es. PSQ, SARK)",
    text: "Quota di titoli detenuta da ETF che puntano al ribasso sul mercato (short o inversi). Più alta è, più operatori scommettono contro il titolo."
  },
  delta_peso_etf_core: {
    title: "Δ Peso % del titolo nei principali ETF core (es. QQQ, SPY, XLY)",
    text: "Variazione del peso percentuale del titolo nei grandi ETF di riferimento. Se il peso scende, può esserci pressione sulle quotazioni."
  },
  pressione_meccanica_flussi: {
    title: "Pressione meccanica dei flussi (peso ETF × volumi × direzione)",
    text: "Misura l’impatto diretto dei flussi ETF sul prezzo, combinando peso del titolo negli ETF, volumi e segno (acquisti/vendite)."
  },
  concentrazione_etf_illiquidi: {
    title: "Concentrazione su ETF illiquidi (AUM < 100M)",
    text: "Quota di azioni in mano a ETF molto piccoli o poco scambiati. Può aumentare il rischio in caso di forti vendite."
  },
  flussi_etf_leveraged: {
    title: "Flussi su ETF leveraged / ultra (es. TQQQ, SOXL, SARK)",
    text: "Saldo acquisti/vendite sugli ETF a leva che amplificano i movimenti (sia long che short). Questi strumenti portano volatilità extra."
  }
};
const tooltipsBlocco11 = {
  // A) Eventi Macro & Intermarket
  dxy: {
    title: "DXY (Dollar Index)",
    text: "Indice del valore del dollaro USA rispetto alle principali valute mondiali. Se sale, il dollaro si rafforza."
  },
  fx: {
    title: "Forex (EURUSD, USDJPY, USDCNY)",
    text: "Principali tassi di cambio: Euro/Dollaro, Dollaro/Yen, Dollaro/Yuan. Indicano la forza relativa delle valute."
  },
  ust_yields: {
    title: "Tassi Treasury USA (2y/10y/30y)",
    text: "Rendimenti dei titoli di Stato USA a 2, 10 e 30 anni. Segnalano aspettative su tassi e inflazione."
  },
  real_yields: {
    title: "Real Yields (TIPS)",
    text: "Rendimenti dei Treasury legati all’inflazione. Un aumento indica rendimenti reali più alti per chi investe."
  },
  breakeven: {
    title: "Breakeven Inflation (5y/10y/5y5y)",
    text: "Differenza tra tasso nominale e reale; stima l’inflazione attesa su 5/10 anni."
  },
  curve_spread: {
    title: "Curva tassi (2s10s, 3m10y)",
    text: "Differenza tra rendimenti a breve e lungo termine. Se è negativa ('inversione'), può anticipare recessioni."
  },
  ois: {
    title: "OIS/Fed/€STR",
    text: "Tassi overnight su USD/EUR. Misurano aspettative di politica monetaria (Fed/BCE)."
  },
  vix: {
    title: "VIX / VSTOXX / MOVE",
    text: "Indici della volatilità su azioni (VIX), Europa (VSTOXX), e obbligazioni (MOVE). Un valore alto segnala mercati nervosi."
  },
  ig_hy_oas: {
    title: "IG/HY OAS",
    text: "Differenziale di rendimento (spread) tra obbligazioni Investment Grade (IG) e High Yield (HY), misura il rischio di credito."
  },
  cds: {
    title: "CDS settore/peer",
    text: "Costo per assicurarsi contro il default di un’azienda o settore. Più alto, più percepito è il rischio."
  },
  inflazione: {
    title: "Inflazione (CPI/PPI/PCE, HICP UE)",
    text: "Dati sui prezzi al consumo/produttore in USA ed Europa. Indicano quanto stanno salendo i prezzi rispetto alle attese."
  },
  crescita: {
    title: "Crescita (GDP, retail, durable goods)",
    text: "Misure della crescita economica: PIL, vendite al dettaglio, beni durevoli. Confrontate con le attese degli analisti."
  },
  lavoro: {
    title: "Lavoro (NFP, unemployment, claims)",
    text: "Dati sull’occupazione USA: nuovi posti di lavoro, tasso di disoccupazione, richieste di sussidio."
  },
  pmi_ism: {
    title: "PMI / ISM (manifatturiero/servizi)",
    text: "Indicatori dell’attività economica di industria e servizi. Se sopra 50, l’economia è in espansione."
  },
  banche_centrali: {
    title: "Banche Centrali (Fed, BCE...)",
    text: "Decisioni sui tassi, comunicati, dot plot e dimensione del bilancio (QE/QT). Influiscono su mercati globali."
  },
  eventi_geo: {
    title: "Eventi geopolitici/regolatori",
    text: "Guerre, sanzioni, regolamenti (es. AI Act), crisi energia. Spiegano impatti sui mercati."
  },

  // B) Eventi Societari & Corporate Actions
  earnings: {
    title: "Earnings (Risultati trimestrali)",
    text: "Risultati finanziari aziendali: utile per azione, ricavi, margini. Sorprese rispetto alle attese sono cruciali."
  },
  guidance: {
    title: "Guidance",
    text: "Previsioni ufficiali dell’azienda su ricavi, margini, investimenti per i prossimi trimestri."
  },
  dividendi: {
    title: "Dividendi",
    text: "Importo distribuito per azione, con date chiave: stacco, record e pagamento. Payout ratio indica quanto utile viene distribuito."
  },
  split_spin: {
    title: "Split / Reverse / Spin-off",
    text: "Operazioni sul capitale: frazionamento azioni, raggruppamenti, scorpori di rami aziendali."
  },
  buyback: {
    title: "Buyback",
    text: "Riacquisto di azioni proprie da parte dell’azienda. Supporta spesso il prezzo delle azioni."
  },
  debito: {
    title: "Debito / emissioni",
    text: "Nuove emissioni di obbligazioni: importo, scadenza, tasso, eventuale modifica dei rating di credito."
  },
  ma_jv: {
    title: "M&A / JV / Dismissioni",
    text: "Operazioni straordinarie: acquisizioni, joint venture, vendite di asset. Influenzano la strategia e il valore del titolo."
  },
  listing_rebalance: {
    title: "Listing/delisting / Rebalance indici",
    text: "Ingresso o uscita dal listino o dagli indici principali (S&P, Nasdaq, MSCI). Può cambiare i flussi degli investitori."
  },
  eventi_legali: {
    title: "Eventi legali/regolatori",
    text: "Cause, indagini antitrust, modifiche regolamentari. Possono portare volatilità e rischi inattesi."
  }
};
const tooltipsBlocco12 = {
  // NEWSFLOW & SENTIMENT
  newsflow_intensity: {
    title: "Intensità Newsflow (72h)",
    text: "Misura quante notizie sono state pubblicate sull’azienda negli ultimi 3 giorni. Un valore 'alto' segnala grande attenzione mediatica."
  },
  news_direction: {
    title: "Direzionalità News Istituzionali",
    text: "Indica se le principali notizie pubblicate dalle fonti istituzionali (agenzie, Bloomberg, Reuters) sono per lo più positive, negative o neutrali."
  },
  top_drivers: {
    title: "Top Driver News",
    text: "Le notizie o i temi più importanti che hanno influenzato la copertura mediatica negli ultimi giorni. Permette di capire quali sono le cause principali dei movimenti di prezzo o di sentiment."
  },
  social_sentiment: {
    title: "Sentiment Social (24h)",
    text: "Tono e atteggiamento prevalente sui social (es. Reddit, StockTwits) nelle ultime 24 ore: positivo, negativo o neutro."
  },
  media_sentiment: {
    title: "Sentiment Media Tradizionali",
    text: "Come giornali e TV descrivono l’azienda in questo periodo. Può differire dal tono sui social."
  },
  price_vs_sentiment: {
    title: "Prezzo vs Sentiment",
    text: "Analisi se il movimento del prezzo del titolo è coerente con il tono delle notizie (ad esempio: prezzo che scende se news sono negative)."
  },

  // COERENZA INTER-BLOCCHI
  interblock_coherence: {
    title: "Coerenza Inter-Blocchi",
    text: "Verifica se i segnali di questo blocco sono coerenti o in contrasto con quelli di altri blocchi del report (es. flussi ETF o risultati finanziari)."
  },

  // ATTENTION & REACH
  attention_reach: {
    title: "Attention & Reach",
    text: "Indica quanta attenzione pubblica c’è sull’azienda, misurata ad esempio da visualizzazioni Wikipedia o ricerche Google. Un aumento può anticipare volatilità."
  },
  wikipedia_views: {
    title: "Wikipedia Pageviews",
    text: "Numero di visite alla pagina Wikipedia dell’azienda, utile per stimare l’interesse improvviso del pubblico (dato opzionale)."
  },
  google_trends: {
    title: "Google Trends",
    text: "Misura la popolarità delle ricerche su Google legate all’azienda o a un tema chiave (es. 'robotaxi'). Picchi indicano eventi che attirano l’attenzione."
  }
};

