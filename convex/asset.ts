import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const assets = await ctx.db.get(args.id as Id<"assets">);
    return assets;
  },
});

export const getForProject = query({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    const assets = await ctx.db
      .query("assets")
      .filter((q) => q.eq(q.field("project_id"), args.projectId))
      .collect();
    return assets;
  },
});
