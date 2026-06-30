import { notFound } from "next/navigation";

import { getTenderDetail, tenderDetailIds } from "../../../lib/mock-data";
import { TenderCardView } from "../tender-card-view";

export function generateStaticParams() {
  return tenderDetailIds.map((id) => ({ id }));
}

export default async function TenderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenderDetail = getTenderDetail(id);

  if (!tenderDetail) {
    notFound();
  }

  return <TenderCardView tenderDetail={tenderDetail} />;
}
