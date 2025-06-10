import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
      //@ts-ignore
      project_id: args.projectId,
    });

    const total_income = args.quantity * args.price;

    const reportMonth = await ctx.db.get(args.reports_months_id);
    if (!reportMonth) throw new Error("Report month not found");
    await ctx.db.patch(args.reports_months_id, {
      income_total: (reportMonth.income_total ?? 0) + total_income,
      profit_total: (reportMonth.profit_total ?? 0) + total_income,
    });

    const reportQuarter = await ctx.db.get(reportMonth.report_quarters_id);
    if (!reportQuarter) throw new Error("Report quarter not found");
    await ctx.db.patch(args.reports_quarters_id, {
      income_total: (reportQuarter.income_total ?? 0) + total_income,
      profit_total: (reportQuarter.profit_total ?? 0) + total_income,
    });

    const reportYear = await ctx.db.get(reportMonth.report_years_id);
    if (!reportYear) throw new Error("Report year not found");
    await ctx.db.patch(args.reports_years_id, {
      income_total: (reportYear.income_total ?? 0) + total_income,
      profit_total: (reportYear.profit_total ?? 0) + total_income,
    });

    return await ctx.db.insert("incomes", {
      period: args.period,
      quantity: args.quantity,
      price: args.price,
      product_id: productId,
      total_income: total_income,
      //@ts-ignore
      project_id: args.projectId,
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

