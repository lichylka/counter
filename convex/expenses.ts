import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addExpense = mutation({
  args: {
    name: v.string(),
    unit: v.string(),
    quantity: v.number(),
    price: v.number(),
    category: v.string(),
    type: v.union(
      v.literal("Постійні"),
      v.literal("Змінні: Прямі"),
      v.literal("Змінні: Накладні")
    ),
    period: v.string(),
    projectId: v.string(),
  },
  handler: async (ctx, args) => {
    const expensesItemId = await ctx.db.insert("expense_items", {
      name: args.name,
      unit: args.unit,
      category: args.category,
      type: args.type,
      subtype: "",
    });
    return await ctx.db.insert("expenses", {
      period: args.period,
      quantity: args.quantity,
      price: args.price,
      expense_item_id: expensesItemId,
      total_expense: args.quantity * args.price,
      //@ts-ignore
      project_id: args.projectId,
    });
  },
});

export const getExpensesForProjectWithPeriod = query({
  args: { projectId: v.string(), prediod: v.string() },
  handler: async (ctx, args) => {
    const expense = await ctx.db
      .query("expenses")
      .filter((q) =>
        q.and(
          q.eq(q.field("project_id"), args.projectId),
          q.eq(q.field("period"), args.prediod)
        )
      )
      .collect();
    const res = await Promise.all(
      expense.map(async (el) => {
        return {
          ...el,
          expense_item: await ctx.db.get(el.expense_item_id),
        };
      })
    );
    return res;
  },
});
