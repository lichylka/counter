"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/Header";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { AIAssistant } from "@/components/dashboard/AIAssistant";
import { DocumentsList } from "@/components/dashboard/DocumentsList";
import { ProfileSettings } from "@/components/dashboard/ProfileSettings";
import NewProjectModal from "@/components/NewProjectModal";
import { Project, Document } from "@/types/dashboard";

export default function Dashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isQuickMode, setIsQuickMode] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "🌰 Фасування горіхів",
      status: "active",
      planStart: "2025-05-01",
      planEnd: "2030-05-01",
      salesStart: "2025-09-01",
      description: "",
      lastUpdated: "02.05.2025",
    },
    {
      id: "2",
      name: "🏗️ Виробництво каркасів",
      status: "archived",
      planStart: "2025-01-01",
      planEnd: "2028-01-01",
      salesStart: "2025-03-01",
      description: "",
      lastUpdated: "18.04.2025",
    },
  ]);
  
  const [documents] = useState<Document[]>([
    { name: "Бізнес-план_горіхи.pdf", type: "pdf" },
    { name: "Звіт_P&L_березень.xlsx", type: "xlsx" },
    { name: "Стратегія_2025.docx", type: "docx" },
  ]);

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsQuickMode(false);
    setIsModalOpen(true);
  };

  const handleSaveProject = (formData: Omit<Project, "id" | "lastUpdated">) => {
    console.log("Saving project:", formData);
    // Add API call here
    
    // If it's a new project, add it to the list
    if (!editingProject) {
      const newProject: Project = {
        id: Date.now().toString(), // Generate a temporary ID
        ...formData,
        lastUpdated: new Date().toLocaleDateString('uk-UA')
      };
      
      setProjects([newProject, ...projects]);
    } else {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData, lastUpdated: new Date().toLocaleDateString('uk-UA') } 
          : p
      ));
    }
  };

  const handleDeleteProject = (projectId: string) => {
    // Add confirmation dialog and API call
    console.log("Deleting project:", projectId);
  };

  const handleViewProject = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleDownloadProject = (projectId: string) => {
    // Add download logic
    console.log("Downloading project:", projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProjectsTable
            projects={projects}
            onEdit={handleEditProject}
            onView={handleViewProject}
            onDownload={handleDownloadProject}
            onDelete={handleDeleteProject}
            onCreate={() => {
              setEditingProject(null);
              setIsQuickMode(true);
              setIsModalOpen(true);
            }}
          />
          
          <FinancialOverview
            projectName="Фасування горіхів"
            projectId="1"
            data={{
              income: 128000,
              expenses: 83500,
              profit: 44500
            }}
          />
        </div>

        <div className="space-y-8">
          <AIAssistant />
          <DocumentsList documents={documents} />
          <ProfileSettings />
        </div>
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
        quickMode={isQuickMode}
      />
    </div>
  );
}
