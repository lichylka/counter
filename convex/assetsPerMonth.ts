import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getPerMonthAndProject = query({
  args: {
    periods_months_id: v.string(),
    project_id: v.string(),
  },
  handler: (ctx, args) => {
    const assetPerMonth = ctx.db
      .query("assets_per_months")
      .withIndex("by_period_month_id_and_project_id", (q) =>
        q
          .eq(
            "periods_months_id",
            args.periods_months_id as Id<"periods_months">
          )
          .eq("project_id", args.project_id as Id<"projects">)
      )
      .collect();
    return assetPerMonth;
  },
});
