import { api } from "@/convex/_generated/api";
import PageContent from "./PageContent";
import { fetchQuery } from "convex/nextjs";

export default async function ProjectDashboard({
  params: promiseParams,
}: {
  params: Promise<any>;
}) {
  const params = await promiseParams;
  if (!params.projectId) {
    throw new Error("Project ID is not provided");
  }

  const periodYears = await fetchQuery(api.periodYear.getAllForProject, {
    project_id: params.projectId as string,
  });
  if (!periodYears) throw new Error("no period Years");

  return <PageContent params={params} periodYears={periodYears} />;
}

// function balanceRows(years: string[], data: any[] = []) {
//   return years.map((year, index) => {
//     const rowData = data[index] || { assets: 0, liabilities: 0, equity: 0 };

//     return [
//       year,
//       `${rowData.assets}`,
//       `${rowData.liabilities}`,
//       `${rowData.equity}`,
//       <Select key={`select-bal-${year}`} defaultValue="yearly">
//         <SelectTrigger className="w-[120px]">
//           <SelectValue placeholder="Порічно" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="yearly">Порічно</SelectItem>
//           <SelectItem value="quarterly">Поквартально</SelectItem>
//           <SelectItem value="monthly">Помісячно</SelectItem>
//         </SelectContent>
//       </Select>,
//     ];
//   });
// }
