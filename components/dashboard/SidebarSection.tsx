"use client";
import { AIAssistant } from "./AIAssistant";

export function SidebarSection() {
//   const [documents] = useState<Document[]>([
//     { name: "Бізнес-план_горіхи.pdf", type: "pdf" },
//     { name: "Звіт_P&L_березень.xlsx", type: "xlsx" },
//     { name: "Стратегія_2025.docx", type: "docx" },
//   ]);

  return (
    <div className="space-y-8">
      <AIAssistant />
      {/* <DocumentsList documents={documents} />
      <ProfileSettings /> */}
    </div>
  );
}