import PageContent from "./PageContent";

export default async function ExpensesPage({
  params: paramsPromise,
}: {
  params: Promise<{ projectId: string; year: string; month: string }>;
}) {
  const params = await paramsPromise;
  return <PageContent params={params} />;
}
