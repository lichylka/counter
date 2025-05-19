import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Get all projects for a user
export const getAll = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("user_id"), args.userId))
      .collect();
    
    return projects;
  },
});

// Get a single project by ID
export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    return project;
  },
});

// Create a new project
export const create = mutation({
  args: {
    user_id: v.string(),
    name: v.string(),
    start_date: v.string(),
    period_plan: v.number(),
    sales_start: v.string(),
    type: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      ...args,
      created_at: new Date().toISOString(),
    });
    return projectId;
  },
});

// Update an existing project
export const update = mutation({
  args: {
    id: v.id("projects"),
    name: v.optional(v.string()),
    start_date: v.optional(v.string()),
    period_plan: v.optional(v.number()),
    sales_start: v.optional(v.string()),
    type: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Delete a project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Archive a project
export const archive = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "archived" });
    return args.id;
  },
});