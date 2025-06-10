import { v } from "convex/values";
import { query } from "./_generated/server";

export const getOne = query({
  args: { projectId: v.string(), year: v.number(), month: v.number() },
  handler: async (ctx, args) => {
    console.log("args", args);
    const date = new Date(args.year, args.month - 1, 1).toISOString();

    const periodMonths = await ctx.db
      .query("periods_months")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.projectId),
          q.eq(q.field("start_date"), date)
        )
      )
      .first();

    return periodMonths;
  },
});
