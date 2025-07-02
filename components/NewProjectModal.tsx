import { useForm } from "react-hook-form";
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
import { CreateProjectType } from "@/types/project.types";
import { useEffect } from "react";
import { Doc } from "@/convex/_generated/dataModel";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateProjectType) => void;
  initialData?: Doc<"projects"> | null;
  quickMode?: boolean;
  userId: string;
  isUpdate: boolean;
}

export default function NewProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  quickMode = false,
  userId,
  isUpdate,
}: NewProjectModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateProjectType>({
    defaultValues: {
      name: "",
      status: "active",
      start_date: new Date().toISOString().split("T")[0],
      period_plan: 0,
      sales_start: "",
      type: "Бізнес-план",
      user_id: userId,
    },
    values: {
      name: initialData?.name || "",
      status: initialData?.status || "active",
      start_date:
        initialData?.start_date || new Date().toISOString().split("T")[0],
      period_plan: initialData?.period_plan || 0,
      sales_start: initialData?.sales_start || "",
      type: initialData?.type || "Бізнес-план",
      user_id: initialData?.user_id || userId,
    },
  });

  // useEffect(() => {
  //   if (initialData) {
  //     Object.entries(initialData).forEach(([key, value]) => {
  //       setValue(key as keyof CreateProjectType, value);
  //     });
  //   } else {
  //     reset({
  //       name: "",
  //       status: "active",
  //       start_date: new Date().toISOString().split("T")[0],
  //       period_plan: 0,
  //       sales_start: "",
  //       type: "",
  //       user_id: userId,
  //       created_at: new Date().toISOString(),
  //     });
  //   }
  // }, [initialData, isOpen, reset, setValue, userId]);

  const formValues = watch();

  // Log form updates
  useEffect(() => {
    console.log("Form values updated:", formValues);
  }, [formValues]);

  const onSubmit = (data: CreateProjectType) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={quickMode ? "sm:max-w-[500px]" : "sm:max-w-[600px]"}
      >
        <DialogHeader>
          <DialogTitle>
            {quickMode ? "Новий проєкт" : "Створити новий проєкт"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Назва проєкту</Label>
            <Input
              id="name"
              placeholder="Вкажіть назву проєкту"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {!quickMode && (
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select {...register("status")}>
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
                <Label htmlFor="start_date">Початок планування</Label>
                <Input
                  id="start_date"
                  type="date"
                  {...register("start_date")}
                />
                {errors.start_date && (
                  <p className="text-sm text-red-500">
                    {errors.start_date.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {!isUpdate && (
            <>
              <div className="space-y-2">
                <Label htmlFor="period_plan">Період планування</Label>
                <Select
                  value={watch("period_plan")?.toString()}
                  onValueChange={(value) => {
                    // Update form value manually since Select component doesn't work with register
                    setValue("period_plan", parseInt(value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Оберіть період планування" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 рік</SelectItem>
                    <SelectItem value="2">2 роки</SelectItem>
                    <SelectItem value="3">3 роки</SelectItem>
                  </SelectContent>
                </Select>
                {errors.period_plan && (
                  <p className="text-sm text-red-500">
                    {errors.period_plan.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sales_start">Початок продажів</Label>
                <Input
                  id="sales_start"
                  type="date"
                  {...register("sales_start")}
                />
                {errors.sales_start && (
                  <p className="text-sm text-red-500">
                    {errors.sales_start.message}
                  </p>
                )}
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {quickMode ? "Відмінити" : "Скасувати"}
            </Button>
            <Button type="submit">
              {quickMode ? "Зберегти" : "💾 Зберегти"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
