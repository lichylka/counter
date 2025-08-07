import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { updateReports } from "./reportHelpers";

export const addIncome = mutation({
  args: {
    name: v.string(),
    unit: v.string(),
    quantity: v.number(),
    price: v.number(),
    period: v.string(),
    projectId: v.string(),
    reports_months_id: v.id("reports_months"),
    reports_quarters_id: v.id("reports_quarters"),
    reports_years_id: v.id("reports_years"),
    kind: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const total_income = args.quantity * args.price;

    await updateReports(ctx, args.reports_months_id, {
      investIncome: total_income,
    });

    return await ctx.db.insert("invest_incomes", {
      period: args.period,
      quantity: args.quantity,
      name: args.name,
      unit: args.unit,
      price: args.price,
      total_income: total_income,
      //@ts-ignore
      project_id: args.projectId,
      kind: args.kind,
      category: args.category,
    });
  },
});

export const getIncomeForProjectWithPeriod = query({
  args: { projectId: v.string(), period: v.string() },
  handler: async (ctx, args) => {
    const incomes = await ctx.db
      .query("invest_incomes")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.projectId),
          q.eq(q.field("period"), args.period)
        )
      )
      .collect();

    return incomes;
  },
});
