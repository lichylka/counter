import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Get all users
export const getAll = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

// Get user by ID
export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();
    return users[0] || null;
  },
});

// Create a new user
export const create = mutation({
  args: {
    id: v.string(),
    email: v.optional(v.string()),
    is_guest: v.boolean(),
    ai_requests: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      id: args.id,
      email: args.email,
      is_guest: args.is_guest,
      ai_requests: args.ai_requests,
    });
    return userId;
  },
});

// Update user
export const update = mutation({
  args: {
    id: v.string(),
    email: v.optional(v.string()),
    is_guest: v.optional(v.boolean()),
    ai_requests: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Find the user first
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), id))
      .collect();
    
    if (users.length === 0) {
      throw new Error("User not found");
    }

    // Update the user
    await ctx.db.patch(users[0]._id, updates);
    return users[0]._id;
  },
});

// Delete user
export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();
    
    if (users.length === 0) {
      throw new Error("User not found");
    }

    await ctx.db.delete(users[0]._id);
    return users[0]._id;
  },
});

// Increment AI requests counter
export const incrementAIRequests = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();
    
    if (users.length === 0) {
      throw new Error("User not found");
    }

    await ctx.db.patch(users[0]._id, {
      ai_requests: (users[0].ai_requests || 0) + 1
    });
    
    return users[0]._id;
  },
});