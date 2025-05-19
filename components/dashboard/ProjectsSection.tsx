"use client";
import { useState } from "react";
import { Project } from "@/types/dashboard";
import { ProjectsTable } from "./ProjectsTable";
import NewProjectModal from "@/components/NewProjectModal";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateProjectType } from "@/types/project.types";

interface ProjectsSectionProps {
  userId: string;
}

export function ProjectsSection({ userId }: ProjectsSectionProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isQuickMode, setIsQuickMode] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsQuickMode(false);
    setIsModalOpen(true);
  };
  // Convex queries and mutations
  const createProject = useMutation(api.projects.create);
//   const updateProject = useMutation(api.projects.update);
  //   const deleteProject = useMutation(api.projects.delete);
//   const projects = useQuery(api.projects.getAll, { userId });
  const handleSaveProject = async (formData: CreateProjectType) => {
    try {
      if (!editingProject) {
        console.log("Creating new project:", formData);
        await createProject(formData);
      } else {
        // Update existing project
        // await updateProject({
        //   id: editingProject._id,
        //   ...formData,
        //   lastUpdated: new Date().toLocaleDateString("uk-UA"),
        // });
      }
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    console.log("Deleting project:", projectId);
  };

  const handleViewProject = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleDownloadProject = (projectId: string) => {
    console.log("Downloading project:", projectId);
  };

  return (
    <div className="lg:col-span-2 space-y-8">
      <ProjectsTable
        onEdit={handleEditProject}
        onView={handleViewProject}
        onDownload={handleDownloadProject}
        onDelete={handleDeleteProject}
        onCreate={() => {
          setEditingProject(null);
          setIsQuickMode(true);
          setIsModalOpen(true);
        }}
        userId={userId}
      />

      {/* <FinancialOverview
        projectName="Фасування горіхів"
        projectId={userId}
        data={{
          income: 128000,
          expenses: 83500,
          profit: 44500,
        }}
      />
*/}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
        quickMode={isQuickMode}
        userId={userId}
      />
    </div>
  );
}
