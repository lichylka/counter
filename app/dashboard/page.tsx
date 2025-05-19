import { DashboardHeader } from "@/components/dashboard/Header";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { SidebarSection } from "@/components/dashboard/SidebarSection";
import { createUser } from "@/helpers/createUser/createUser";
import { SetUserIdInCookies } from "@/helpers/createUser/SetUserIdInCookies";

export default async function Dashboard() {
  const userId = await createUser();

  return (
    <>
      <SetUserIdInCookies userId={userId} />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProjectsSection userId={userId} />
          <SidebarSection />
        </div>
      </div>
    </>
  );
}
