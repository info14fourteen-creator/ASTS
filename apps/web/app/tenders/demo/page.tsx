import { tenderDetail } from "../../../lib/mock-data";
import { TenderCardView } from "../tender-card-view";

export default function TenderDemoPage() {
  return <TenderCardView tenderDetail={tenderDetail} />;
}
