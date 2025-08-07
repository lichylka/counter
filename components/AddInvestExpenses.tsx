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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { AssetFinder } from "./AssetFinder";
import { CreateIvestExpense } from "@/app/project/[projectId]/investments/[year]/[type]/month/[month]/expenses/PageContent";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleSaveNewRow: (row: CreateIvestExpense) => void;
  reports_months_id: Id<"reports_months">;
  reports_quarters_id: Id<"reports_quarters">;
  reports_years_id: Id<"reports_years">;
  period_month_id: Id<"periods_months">;
  assets: Doc<"assets">[];
};

const formSchema = z.object({
  name: z.string().min(1, "Назва обов'язкова"),
  unit: z.string().min(1, "Виберіть одиницю виміру"),
  quantity: z.union([
    z.number().min(0, "Кількість має бути більше 0"),
    z.literal(""),
  ]),
  price: z.union([z.number().min(0, "Ціна має бути більше 0"), z.literal("")]),
  category: z.string().min(1, "Виберіть категорію"),
  type: z.enum(["Постійні", "Змінні: Прямі", "Змінні: Накладні"]),
  assetId: z.string().optional(),
  assetName: z.string().optional(),
  assetType: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function AddInvestExpenses({
  isOpen,
  setIsOpen,
  handleSaveNewRow,
  reports_months_id,
  reports_quarters_id,
  reports_years_id,
  period_month_id,
  assets,
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
      asset: "",
      category: "",
      assteType: "",
      assetName: "",
    } as any,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { assetId, assetName, assetType, ...rest } = data;
      const formattedData = assetId
        ? ({
            ...rest,
            quantity: Number(data.quantity),
            price: Number(data.price),
            reports_months_id,
            reports_quarters_id,
            reports_years_id,
            period_month_id,
            asset_id: assetId,
          } satisfies CreateIvestExpense)
        : ({
            ...rest,
            quantity: Number(data.quantity),
            price: Number(data.price),
            reports_months_id,
            reports_quarters_id,
            reports_years_id,
            period_month_id,
            assetName: assetName as string,
            assetType: assetType as string,
          } satisfies CreateIvestExpense);

      handleSaveNewRow(formattedData);
      reset();
      setCreate(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  const [create, setCreate] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="text-xl font-semibold mb-4">
          Додати рядок-запис
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Назва"
                  className="border rounded"
                />
              )}
            />

            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Од. Вим." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="шт">шт</SelectItem>
                    <SelectItem value="кг">кг</SelectItem>
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
                  onChange={(e) => field.onChange(+e.target.value || "")}
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
                  onChange={(e) => field.onChange(+e.target.value || "")}
                  className="border rounded"
                />
              )}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип витрат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Постійні">Постійні</SelectItem>
                    <SelectItem value="Змінні: Прямі">Змінні: Прямі</SelectItem>
                    <SelectItem value="Змінні: Накладні">
                      Змінні: Накладні
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Категорія" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Матеріали">Матеріали</SelectItem>
                    <SelectItem value="Оплата праці">Оплата праці</SelectItem>
                    <SelectItem value="Послуги">Послуги</SelectItem>
                    <SelectItem value="Енергія">Енергія, паливо</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <div className={create ? "" : "hidden"}>
              <Controller
                name="assetName"
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
                name="assetId"
                control={control}
                render={({ field }) => (
                  <AssetFinder
                    assets={assets}
                    onChange={field.onChange}
                    value={field.value}
                    setCreate={setCreate}
                    create={create}
                  />
                )}
              />
            </div>
            <Controller
              name="assetType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!create}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Тип активу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bio_multi_year">
                      Біобагаторічний
                    </SelectItem>
                    <SelectItem value="material">Матеріальний</SelectItem>
                    <SelectItem value="intangible">Нематеріальний</SelectItem>
                    <SelectItem value="bio_one_year">Біооднорічний</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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

export default AddInvestExpenses;
