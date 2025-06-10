import { v } from "convex/values";
import { query } from "./_generated/server";
import { internal } from "./_generated/api";

export const getOneWithIncludes = query({
  args: { period_year_id: v.string() },
  handler: async (ctx, args) => {
    const reportYear = await ctx.db
      .query("reports_years")
      .filter((q) => q.eq(q.field("period_id"), args.period_year_id))
      .first();

    const reportQuarters = await ctx.db
      .query("reports_quarters")
      .filter((q) => q.eq(q.field("period_year_id"), args.period_year_id))
      .collect();

    const reportMonths = await ctx.db
      .query("reports_months")
      .filter((q) => q.eq(q.field("period_year_id"), args.period_year_id))
      .collect();

    const periodQuarterWithMonths = reportQuarters.map((quarter) => {
      return {
        ...quarter,
        months: reportMonths.filter(
          (month) => month.period_quarter_id === quarter.period_quarter_id
        ),
      };
    });

    if (!reportYear) throw new Error("no period Year");
    const res = { ...reportYear, quarters: periodQuarterWithMonths };

    return res;
  },
});

export const getMultipleWithIncludes = query({
  args: { period_year_ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const res = [];
    for (const period_year_id of args.period_year_ids) {
      const reportYear = await ctx.db
        .query("reports_years")
        .filter((q) => q.eq(q.field("period_id"), period_year_id))
        .first();

      const reportQuarters = await ctx.db
        .query("reports_quarters")
        .filter((q) => q.eq(q.field("period_year_id"), period_year_id))
        .collect();

      const reportMonths = await ctx.db
        .query("reports_months")
        .filter((q) => q.eq(q.field("period_year_id"), period_year_id))
        .collect();

      const periodQuarterWithMonths = reportQuarters.map((quarter) => {
        return {
          ...quarter,
          months: reportMonths.filter(
            (month) => month.period_quarter_id === quarter.period_quarter_id
          ),
        };
      });

      if (!reportYear) throw new Error("no period Year");
      const year = { ...reportYear, quarters: periodQuarterWithMonths };

      res.push(year);
    }
    return res;
  },
});
