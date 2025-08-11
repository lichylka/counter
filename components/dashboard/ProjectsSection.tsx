"use client";
import { useState } from "react";
import { ProjectsTable } from "./ProjectsTable";
import NewProjectModal from "@/components/NewProjectModal";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateProjectType } from "@/types/project.types";
import { Doc } from "@/convex/_generated/dataModel";
import { projectRoute } from "@/helpers/routes";

interface ProjectsSectionProps {
  userId: string;
}

export function ProjectsSection({ userId }: ProjectsSectionProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isQuickMode, setIsQuickMode] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Doc<"projects"> | null>(
    null
  );

  const handleEditProject = (project: Doc<"projects">) => {
    setIsQuickMode(true);
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);

  const handleSaveProject = async (formData: CreateProjectType) => {
    try {
      if (!editingProject) {
        await createProject(formData);
      } else {
        await updateProject({
          id: editingProject._id,
          name: formData.name,
        });
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
    router.push(projectRoute({ projectId }));
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

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
        quickMode={isQuickMode}
        userId={userId}
        isUpdate={editingProject != null}
      />
    </div>
  );
}
