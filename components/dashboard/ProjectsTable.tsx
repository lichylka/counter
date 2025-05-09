import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Search, Download, Trash2, RefreshCcw } from "lucide-react";
import { Project } from "@/types/dashboard";

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export function ProjectsTable({
  projects,
  onEdit,
  onView,
  onDownload,
  onDelete,
  onCreate
}: ProjectsTableProps) {
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
                <th className="text-left py-2">Останнє оновлення</th>
                <th className="text-left py-2">Дії</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="py-2">{project.name}</td>
                  <td>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                      {project.status === "active" ? "Активний" : "Архівований"}
                    </Badge>
                  </td>
                  <td>{project.lastUpdated}</td>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(project.id)}
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownload(project.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(project.id)}
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownload(project.id)}
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
        <Button variant="outline" className="mt-4" onClick={onCreate}>
          📎 Створити новий проект [+]
        </Button>
      </CardContent>
    </Card>
  );
}