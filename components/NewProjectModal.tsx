import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormData {
  name: string;
  status: 'active' | 'archived';
  planStart: string;
  planEnd: string;
  salesStart: string;
  description: string;
}

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  initialData?: ProjectFormData | null;
  quickMode?: boolean;
}

export default function NewProjectModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData,
  quickMode = false 
}: NewProjectModalProps) {
  const [form, setForm] = useState<ProjectFormData>({
    name: '',
    status: 'active',
    planStart: '',
    planEnd: '',
    salesStart: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      // Set default values for new projects
      setForm({
        name: '',
        status: 'active',
        planStart: new Date().toISOString().split('T')[0], // Today as default
        planEnd: '',
        salesStart: '',
        description: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={quickMode ? "sm:max-w-[500px]" : "sm:max-w-[600px]"}>
        <DialogHeader>
          <DialogTitle>
            {quickMode ? "Новий проєкт" : "Створити новий проєкт"}
          </DialogTitle>
         
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Назва проєкту</Label>
            <Input
              id="name"
              placeholder="Вкажіть назву проєкту"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          {!quickMode && (
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={form.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активний</SelectItem>
                  <SelectItem value="archived">Архівований</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!quickMode && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planStart">Початок планування</Label>
                <Input
                  id="planStart"
                  type="date"
                  value={form.planStart}
                  onChange={(e) => handleChange('planStart', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="planEnd">Кінець планування</Label>
                <Input
                  id="planEnd"
                  type="date"
                  value={form.planEnd}
                  onChange={(e) => handleChange('planEnd', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salesStart">Початок продажів</Label>
                <Input
                  id="salesStart"
                  type="date"
                  value={form.salesStart}
                  onChange={(e) => handleChange('salesStart', e.target.value)}
                />
              </div>
            </div>
          )}

          {quickMode && (
            <>
              <div className="space-y-2">
                <Label htmlFor="planEnd">Кінець періоду планування</Label>
                <Input
                  id="planEnd"
                  type="date"
                  placeholder="Вкажіть період планування"
                  value={form.planEnd}
                  onChange={(e) => handleChange('planEnd', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salesStart">Початок продажів</Label>
                <Input
                  id="salesStart"
                  type="date"
                  placeholder="Вкажіть дату початку продажів"
                  value={form.salesStart}
                  onChange={(e) => handleChange('salesStart', e.target.value)}
                />
              </div>
            </>
          )}

          {!quickMode && (
            <div className="space-y-2">
              <Label htmlFor="description">Опис (необов&apos;язково)</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {quickMode ? "Відмінити" : "Скасувати"}
          </Button>
          <Button onClick={handleSubmit}>
            {quickMode ? "Зберегти" : "💾 Зберегти"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}