"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Download, Trash2, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Doc } from "@/convex/_generated/dataModel";

interface ProjectsTableProps {
  onEdit: (project: Doc<"projects">) => void;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  userId: string;
}

export function ProjectsTable({
  onDownload,
  onEdit,
  onDelete,
  onCreate,
  userId,
}: ProjectsTableProps) {
  const router = useRouter();
  // const user = useQuery(api.users.getById, { id: userId });
  // console.log(userId)
  // console.log(user)
  const projects = useQuery(api.projects.getAll, {
    userId: userId,
  });
  console.log(projects);
  if (!projects) return null;
  // return null;
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">📁 Ваші проєкти</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Назва проекту</th>
                <th className="text-left py-2">Статус</th>
                {/* <th className="text-left py-2">Останнє оновлення</th> */}
                <th className="text-left py-2">Дії</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b">
                  <td
                    className="py-2 cursor-pointer"
                    onClick={() => router.push(`/project/${project._id}`)}
                  >
                    {project.name}
                  </td>
                  <td>
                    <Badge className="text-xs" variant={"secondary"}>
                      {project.status === "active" ? "Активний" : "Архівований"}
                    </Badge>
                  </td>
                  {/* <td>project.lastUpdate d</td> */}
                  <td className="flex gap-2">
                    {project.status === "active" ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownload(project._id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button> */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(project._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownload(project._id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-4 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={
                  projects.length < 2 ? "cursor-pointer" : "cursor-not-allowed"
                }
                onClick={() => {
                  if (projects.length < 2) onCreate();
                }}
              >
                📎 Створити новий проект
              </Button>
            </TooltipTrigger>

            {projects.length < 2 ? null : (
              <TooltipContent>
                <p>Не можна добавляти більше ніж 2 проекти</p>
              </TooltipContent>
            )}
          </Tooltip>

          <Button variant="outline">Переглянути приклад проекту</Button>
        </div>
      </CardContent>
    </Card>
  );
}
