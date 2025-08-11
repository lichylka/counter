import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { api } from "@/convex/_generated/api";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Finder } from "./Finder";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleSaveNewRow: (
    row: Omit<typeof api.income.addIncome._args.args, "period" | "projectId">
  ) => void;
  reports_months_id: Id<"reports_months">;
  reports_quarters_id: Id<"reports_quarters">;
  reports_years_id: Id<"reports_years">;
  products: Doc<"products">[];
};

const formSchema = z.union([
  z.object({
    name: z.string().min(1, "Назва обов'язкова"),
    unit: z.string().min(1, "Виберіть одиницю виміру"),
    quantity: z.union([
      z.number().min(0, "Кількість має бути більше 0"),
      z.literal(""),
    ]),
    price: z.union([
      z.number().min(0, "Ціна має бути більше 0"),
      z.literal(""),
    ]),
    type: z.string().min(1, "Виберіть тип"),
  }),
  z.object({
    productId: z.string().min(1, "Назва обов'язкова"),
    unit: z.string().min(1, "Виберіть одиницю виміру"),
    quantity: z.union([
      z.number().min(0, "Кількість має бути більше 0"),
      z.literal(""),
    ]),
    price: z.union([
      z.number().min(0, "Ціна має бути більше 0"),
      z.literal(""),
    ]),
    type: z.string().min(1, "Виберіть тип"),
  }),
]);

type FormData = z.infer<typeof formSchema>;

function AddIncomeModal({
  isOpen,
  setIsOpen,
  handleSaveNewRow,
  reports_months_id,
  reports_quarters_id,
  reports_years_id,
  products,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit: "",
      quantity: "",
      price: "",
      type: "",
      productId: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formattedData = {
        ...data,
        quantity: Number(data.quantity),
        price: Number(data.price),
        reports_months_id,
        reports_quarters_id,
        reports_years_id,
      };

      handleSaveNewRow(formattedData);
      reset();
                setCreate(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save income:", error);
    }
  };
  const [create, setCreate] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="text-xl font-semibold mb-4">
          Додати дохід
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className={create ? "" : "hidden"}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Назва активу"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className="border rounded"
                  />
                )}
              />
            </div>
            <div className={create ? "hidden" : ""}>
              <Controller
                name="productId"
                control={control}
                render={({ field }) => (
                  <Finder
                    data={products.map((product) => ({
                      id: product._id,
                      value: product.name,
                    }))}
                    onChange={field.onChange}
                    value={field.value}
                    setCreate={setCreate}
                    create={create}
                    placeholder="Виберіть продукт"
                    actionButtonText="Додати продукт"
                  />
                )}
              />
            </div>
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Одиниця" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="шт">шт</SelectItem>
                    <SelectItem value="кг">кг</SelectItem>
                    <SelectItem value="л">л</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Кількість"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="border rounded"
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Ціна"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="border rounded"
                />
              )}
            />
          </div>
          <div className="flex mb-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип доходу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Продукція">Продукція</SelectItem>
                    <SelectItem value="Послуга">Послуга</SelectItem>
                    <SelectItem value="Інше">Інше</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}
          </div>
          {/* Error messages */}
          <div className="space-y-1">
            {Object.entries(errors).map(([key, error]) => (
              <p key={key} className="text-red-500 text-sm">
                {error.message}
              </p>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setCreate(false);
                setIsOpen(false);
              }}
            >
              ✖ Скасувати
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              💾 Зберегти
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddIncomeModal;
