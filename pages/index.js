import { useState } from "react";
import AssetInput from "../components/AssetInput";
import ReportTemplate from "../components/ReportTemplate";

export default function Home() {
  const [asset, setAsset] = useState(null);

  return (
    <div>
      {!asset ? (
        <AssetInput onSubmit={setAsset} />
      ) : (
        <ReportTemplate
          assetName={asset.assetName}
          ticker={asset.ticker}
          reportDate={asset.reportDate}
          screenshot={asset.screenshot}
        >
          {/* Qui dopo inseriremo i blocchi preview uno alla volta */}
        </ReportTemplate>
      )}
    </div>
  );
}
