import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download } from "lucide-react";
import { Document } from "@/types/dashboard";

interface DocumentsListProps {
  documents: Document[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">📚 Мої документи</h2>
        <ul className="space-y-2 mb-4">
          {documents.map((doc, index) => (
            <li key={index}>
              {doc.type === "pdf" && "📄 "}
              {doc.type === "xlsx" && "📊 "}
              {doc.type === "docx" && "📝 "}
              {doc.name}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Завантажити
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Імпортувати
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}