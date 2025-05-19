import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    user_id: v.string(),
    name: v.string(),
    start_date: v.string(), 
    period_plan: v.number(),
    sales_start: v.string(),
    created_at: v.string(),
    type: v.string(),
    status: v.string(),
  }),

  products: defineTable({
    project_id: v.id("projects"),
    name: v.string(),
    unit: v.string(),
    type: v.string(),
  }),

  incomes: defineTable({
    project_id: v.id("projects"),
    product_id: v.id("products"),
    quantity: v.number(),
    price: v.number(),
    period: v.string(),
    total_income: v.number(),
  }),

  expense_items: defineTable({
    name: v.string(),
    unit: v.string(),
    type: v.string(),
    subtype: v.string(),
    category: v.string(),
  }),

  expenses: defineTable({
    project_id: v.id("projects"),
    expense_item_id: v.id("expense_items"),
    quantity: v.number(),
    price: v.number(),
    total_expense: v.number(),
    period: v.string(),
  }),

  profit: defineTable({
    project_id: v.id("projects"),
    period: v.string(),
    opening_profit: v.number(),
    incomes: v.number(),
    expenses: v.number(),
    closing_profit: v.number(),
  }),


  cashflow: defineTable({
    project_id: v.id("projects"),
    period: v.string(),
    opening_balance: v.number(),
    inflow_operational: v.number(),
    inflow_investment: v.number(),
    outflow_operational: v.number(),
    outflow_investment: v.number(),
    closing_balance: v.number(),
  }),

  users: defineTable({
    id: v.string(),
    email: v.optional(v.string()),
    is_guest: v.boolean(),
    ai_requests: v.number(),
  }),
});