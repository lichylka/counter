import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { updateReports } from "./reportHelpers";
import { Id } from "./_generated/dataModel";

export const addIncome = mutation({
  args: {
    name: v.string(),
    unit: v.string(),
    quantity: v.number(),
    price: v.number(),
    type: v.string(),
    period: v.string(),
    projectId: v.string(),
    reports_months_id: v.id("reports_months"),
    reports_quarters_id: v.id("reports_quarters"),
    reports_years_id: v.id("reports_years"),
  },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      name: args.name,
      unit: args.unit,
      type: args.type,
      project_id: args.projectId as Id<"projects">,
    });

    const total_income = args.quantity * args.price;

    await updateReports(ctx, args.reports_months_id, {
      income: total_income,
    });

    return await ctx.db.insert("incomes", {
      period: args.period,
      quantity: args.quantity,
      price: args.price,
      product_id: productId,
      total_income: total_income,
      project_id: args.projectId as Id<"projects">,
      kind: "Безповоротні",
      category: "Виручка",
    });
  },
});

export const getIncomeForProjectWithPeriod = query({
  args: { projectId: v.string(), period: v.string() },
  handler: async (ctx, args) => {
    const income = await ctx.db
      .query("incomes")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.projectId),
          q.eq(q.field("period"), args.period)
        )
      )
      .collect();

    const res = await Promise.all(
      income.map(async (el) => {
        return {
          ...el,
          product: await ctx.db.get(el.product_id),
        };
      })
    );
    return res;
  },
});
