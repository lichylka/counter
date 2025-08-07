import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const argsSchema = v.union(
  v.object({
    name: v.string(),
    unit: v.string(),
    quantity: v.number(),
    price: v.number(),
    category: v.string(),
    asset_id: v.string(),
    period: v.string(),
    projectId: v.string(),
    type: v.string(),
    reports_months_id: v.id("reports_months"),
    reports_quarters_id: v.id("reports_quarters"),
    reports_years_id: v.id("reports_years"),
    period_month_id: v.id("periods_months"),
  }),
  v.object({
    name: v.string(),
    unit: v.string(),
    quantity: v.number(),
    price: v.number(),
    category: v.string(),
    assetName: v.string(),
    assetType: v.string(),
    period: v.string(),
    projectId: v.string(),
    type: v.string(),
    reports_months_id: v.id("reports_months"),
    reports_quarters_id: v.id("reports_quarters"),
    reports_years_id: v.id("reports_years"),
    period_month_id: v.id("periods_months"),
  })
);

export const addExpense = mutation({
  args: { args: argsSchema },
  handler: async (ctx, { args }) => {
    const expensesItemId = await ctx.db.insert("expense_items", {
      name: args.name,
      unit: args.unit,
      category: args.category,
      type: args.type,
      subtype: "",
    });
    let assetId: Id<"assets"> | null = null;
    const totalExpense = args.quantity * args.price;

    const periodMonth = await ctx.db.get(args.period_month_id);
    if (!periodMonth) throw new Error("wrong month id");

    if (!("asset_id" in args)) {
      assetId = await ctx.db.insert("assets", {
        name: args.assetName,
        assetType: args.assetType,
        project_id: args.projectId as Id<"projects">,
      });

      const periodMonths = await ctx.db
        .query("periods_months")
        .withIndex("by_project_id", (q) =>
          q.eq("project_id", args.projectId as Id<"projects">)
        )
        .collect();

      await Promise.all(
        periodMonths.map(async (month) => {
          let closingBalance = 0,
            monthlyDepreciation = 0,
            monthlyIncrease = 0,
            openingBalance = 0;

          if (periodMonth.index == month.index) {
            monthlyDepreciation = totalExpense;
            closingBalance = totalExpense;
          } else if (periodMonth.index < month.index) {
            openingBalance = totalExpense;
            closingBalance = totalExpense;
          }

          return ctx.db.insert("assets_per_months", {
            asset_id: assetId as Id<"assets">,
            closing_balance: closingBalance,
            monthly_depreciation: monthlyDepreciation,
            monthly_increase: monthlyIncrease,
            opening_balance: openingBalance,
            periods_months_id: month._id,
            project_id: args.projectId as Id<"projects">,
          });
        })
      );
    } else {
      assetId = args.asset_id as Id<"assets">;

      const assetsPerMonths = await ctx.db
        .query("assets_per_months")
        .withIndex("by_asset_id", (q) =>
          q.eq("asset_id", args.asset_id as Id<"assets">)
        )
        .collect();

      await Promise.all(
        assetsPerMonths.map(async (assetsPerMonth) => {
          let closingBalance = assetsPerMonth.closing_balance,
            monthlyDepreciation = assetsPerMonth.monthly_depreciation,
            monthlyIncrease = assetsPerMonth.monthly_increase,
            openingBalance = assetsPerMonth.opening_balance;

          const month = await ctx.db.get(assetsPerMonth.periods_months_id);
          if (!month) throw new Error("wrong month in assetsPerMonth");

          if (periodMonth.index == month.index) {
            monthlyDepreciation += totalExpense;
            closingBalance += totalExpense;
          } else if (periodMonth.index < month.index) {
            openingBalance += totalExpense;
            closingBalance += totalExpense;
          }

          return ctx.db.patch(assetsPerMonth._id, {
            closing_balance: closingBalance,
            monthly_depreciation: monthlyDepreciation,
            monthly_increase: monthlyIncrease,
            opening_balance: openingBalance,
          });
        })
      );
    }

    const reportMonth = await ctx.db.get(args.reports_months_id);
    if (!reportMonth) throw new Error("Report month not found");
    await ctx.db.patch(args.reports_months_id, {
      invest_expense_total:
        (reportMonth.invest_expense_total ?? 0) + totalExpense,
      invest_profit_total:
        (reportMonth.invest_income_total ?? 0) -
        (totalExpense + (reportMonth.invest_expense_total ?? 0)),
    });

    const reportQuarter = await ctx.db.get(reportMonth.report_quarters_id);
    if (!reportQuarter) throw new Error("Report quarter not found");
    await ctx.db.patch(args.reports_quarters_id, {
      invest_expense_total:
        (reportQuarter.invest_expense_total ?? 0) + totalExpense,
      invest_profit_total:
        (reportMonth.invest_income_total ?? 0) -
        ((reportQuarter.invest_expense_total ?? 0) + totalExpense),
    });

    const reportYear = await ctx.db.get(reportMonth.report_years_id);
    if (!reportYear) throw new Error("Report year not found");
    await ctx.db.patch(args.reports_years_id, {
      invest_expense_total:
        (reportYear.invest_expense_total ?? 0) + totalExpense,
      invest_profit_total:
        (reportYear.invest_income_total ?? 0) -
        ((reportQuarter.invest_expense_total ?? 0) + totalExpense),
    });

    return await ctx.db.insert("invest_expenses", {
      period: args.period,
      quantity: args.quantity,
      price: args.price,
      expense_item_id: expensesItemId,
      assets_id: assetId as Id<"assets">,
      total_expense: totalExpense,
      //@ts-ignore
      project_id: args.projectId,
      periods_months_id: args.period_month_id,
    });
  },
});

export const getExpensesForProjectWithPeriod = query({
  args: { projectId: v.string(), period_month_id: v.id("periods_months") },
  handler: async (ctx, args) => {
    const expense = await ctx.db
      .query("invest_expenses")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.projectId),
          q.eq(q.field("periods_months_id"), args.period_month_id)
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
