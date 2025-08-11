type ProjectRouteParams = {
  projectId: string;
};

export function projectRoute({ projectId }: ProjectRouteParams) {
  return `/project/${projectId}`;
}

export type ProjectSectionType = "investments" | "profit";

type ProjectSectionRouteParams = {
  section: ProjectSectionType;
} & ProjectRouteParams;

export function projectSectionRoute({
  projectId,
  section,
}: ProjectSectionRouteParams) {
  return `${projectRoute({ projectId })}/section/${section}`;
}

type ProjectYearRouteParams = { year: string } & ProjectSectionRouteParams;

export function projectYearRoute({
  projectId,
  section,
  year,
}: ProjectYearRouteParams) {
  return `${projectSectionRoute({ projectId, section })}/year/${year}`;
}

export type ProjectMonthType = "income" | "expenses";

type ProjectMonthRouteParams = {
  month: string;
  type: ProjectMonthType;
} & ProjectYearRouteParams;

export function projectMonthRoute({
  projectId,
  section,
  year,
  month,
  type,
}: ProjectMonthRouteParams) {
  return `${projectYearRoute({ projectId, section, year })}/month/${month}/${type}`;
}
