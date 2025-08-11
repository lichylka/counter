import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id as Id<"products">);
    return product;
  },
});

export const getForProject = query({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("project_id"), args.projectId))
      .collect();
    return products;
  },
});
