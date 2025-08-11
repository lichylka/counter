import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { updateReports } from "./reportHelpers";
import { Id } from "./_generated/dataModel";

export const addExpense = mutation({
  args: {
    name: v.string(),
    unit: v.string(),
    quantity: v.number(),
    price: v.number(),
    category: v.string(),
    type: v.union(
      v.literal("Постійні"),
      v.literal("Змінні: Прямі"),
      v.literal("Змінні: Накладні")
    ),
    period: v.string(),
    projectId: v.string(),
    reports_months_id: v.id("reports_months"),
    reports_quarters_id: v.id("reports_quarters"),
    reports_years_id: v.id("reports_years"),
    period_month_id: v.id("periods_months"),
  },
  handler: async (ctx, args) => {
    const expensesItemId = await ctx.db.insert("expense_items", {
      name: args.name,
      unit: args.unit,
      category: args.category,
      type: args.type,
      subtype: "",
    });

    const total_expense = args.quantity * args.price;

    await updateReports(ctx, args.reports_months_id, {
      expense: total_expense,
    });

    return await ctx.db.insert("expenses", {
      period: args.period,
      quantity: args.quantity,
      price: args.price,
      expense_item_id: expensesItemId,
      total_expense: total_expense,
      project_id: args.projectId as Id<"projects">,
      periods_months_id: args.period_month_id,
    });
  },
});

export const getExpensesForProjectWithPeriod = query({
  args: { projectId: v.string(), period: v.string() },
  handler: async (ctx, args) => {
    const expense = await ctx.db
      .query("expenses")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.projectId),
          q.eq(q.field("period"), args.period)
        )
      )
      .collect();
    const res = await Promise.all(
      expense.map(async (el) => {
        return {
          ...el,
          expense_item: await ctx.db.get(el.expense_item_id),
        };
      })
    );
    return res;
  },
});
