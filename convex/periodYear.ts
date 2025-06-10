import { v } from "convex/values";
import { query } from "./_generated/server";

export const getOneForProject = query({
  args: { project_id: v.string(), year: v.number() },
  handler: async (ctx, args) => {
    console.log("project_id", args.project_id, "year", args.year);
    const periodYear = await ctx.db
      .query("periods_years")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.project_id),
          q.eq(q.field("year"), args.year)
        )
      )
      .first();

    return periodYear;
  },
});

export const getAllForProject = query({
  args: { project_id: v.string() },
  handler: async (ctx, args) => {
    const periodYears = await ctx.db
      .query("periods_years")
      .filter((q) => q.eq(q.field("project_id"), args.project_id))
      .collect();
    return periodYears;
  },
});
