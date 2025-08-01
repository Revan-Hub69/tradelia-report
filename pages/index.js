import { useState } from "react";
import AssetInput from "../components/AssetInput";
import ReportTemplate from "../components/ReportTemplate";
import Blocco1Preview from "../components/Blocco1Preview";

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
          <Blocco1Preview />
        </ReportTemplate>
      )}
    </div>
  );
}
