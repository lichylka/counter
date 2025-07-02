import { fetchQuery, preloadQuery } from "convex/nextjs";
import PageContent from "./PageContent";
import { api } from "@/convex/_generated/api";

export default async function InvestmentsDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ projectId: string; year: string; month: string }>;
}) {
  const params = await paramsPromise;

  const periodMonth = await fetchQuery(api.periodMonth.getOne, {
    month: +params.month,
    projectId: params.projectId,
    year: +params.year,
  });

  if (!periodMonth) {
    throw new Error("Period month not found");
  }

  const preloadedReportMonth = await preloadQuery(api.reportMonth.getOne, {
    period_months_id: periodMonth._id,
  });

  return (
    <PageContent params={params} preloadedReportMonth={preloadedReportMonth} />
  );
}
