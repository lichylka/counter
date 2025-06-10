import { v } from "convex/values";
import { query } from "./_generated/server";

export const getOne = query({
  args: { period_months_id: v.string() },
  handler: async (ctx, args) => {
    const periodMonths = await ctx.db
      .query("reports_months")
      .filter((q) =>
        q.and(q.eq(q.field("period_month_id"), args.period_months_id))
      )
      .first();

    return periodMonths;
  },
});
