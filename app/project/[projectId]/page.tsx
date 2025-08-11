import { api } from "@/convex/_generated/api";
import PageContent from "./PageContent";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export default async function ProjectDashboard({
  params: promiseParams,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await promiseParams;
  if (!params.projectId) {
    throw new Error("Project ID is not provided");
  }

  const [projectData, periodYears] = await Promise.all([
    fetchQuery(api.projects.getById, {
      id: params.projectId as Id<"projects">,
    }),
    fetchQuery(api.periodYear.getAllForProject, {
      project_id: params.projectId,
    }),
  ]);
  if (!projectData) throw new Error("Project not found");
  if (!periodYears) throw new Error("no period Years");

  return (
    <PageContent
      params={params}
      periodYears={periodYears}
      projectData={projectData}
    />
  );
}
