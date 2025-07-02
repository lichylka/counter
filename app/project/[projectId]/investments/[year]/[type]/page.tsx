import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import PageContent from "./PageContent";

export default async function ProfitReportPage({
  params: paramsPromise,
}: {
  params: Promise<{ projectId: string; year: string }>;
}) {
  const params = await paramsPromise;

  const periodYear = await fetchQuery(api.periodYear.getOneForProject, {
    project_id: params.projectId,
    year: +params.year,
  });

  
  if (!periodYear) throw new Error("Період року не знайдено");
  
  console.log(periodYear._id);
  
  const reportYear = await fetchQuery(api.reportYear.getOneWithIncludes, {
    period_year_id: periodYear._id,
  });

  if (!params.projectId) {
    throw new Error("ID проекту не вказано");
  }

  return <PageContent params={params} reportYear={reportYear} />;
}
