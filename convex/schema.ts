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

  invest_incomes: defineTable({
    project_id: v.id("projects"),
    quantity: v.number(),
    price: v.number(),
    period: v.string(),
    total_income: v.number(),
    kind: v.string(),
    category: v.string(),
  }),

  incomes: defineTable({
    project_id: v.id("projects"),
    product_id: v.id("products"),
    quantity: v.number(),
    price: v.number(),
    period: v.string(),
    total_income: v.number(),
    kind: v.literal("Безповоротні"),
    category: v.literal("Виручка"),
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
    periods_months_id: v.optional(v.id("periods_months")),
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

  periods_years: defineTable({
    project_id: v.id("projects"),
    year: v.number(),
    index: v.number(),
  }),

  periods_quarters: defineTable({
    project_id: v.id("projects"),
    year_id: v.id("periods_years"),
    year: v.number(),
    quarter: v.union(
      v.literal("Q1"),
      v.literal("Q2"),
      v.literal("Q3"),
      v.literal("Q4")
    ),
    index: v.number(),
  }),

  periods_months: defineTable({
    project_id: v.id("projects"),
    year_id: v.id("periods_years"),
    quarter_id: v.id("periods_quarters"),
    year: v.number(),
    quarter: v.union(
      v.literal("Q1"),
      v.literal("Q2"),
      v.literal("Q3"),
      v.literal("Q4")
    ),
    index: v.number(),
    start_date: v.string(),
    dateEnd: v.string(),
  }),

  reports_project: defineTable({
    project_id: v.id("projects"),
    from_year: v.number(),
    to_year: v.number(),
    generated_from: v.array(v.string()),
    income_total: v.number(),
    expenses_total: v.number(),
    profit_total: v.number(),
    cashinflow_total: v.number(),
    cashoutflow_total: v.number(),
    net_cashflow: v.number(),
    created_at: v.number(),
    updated_at: v.number(),
    aiinsights: v.union(v.object({}), v.null()),
  }),

  reports_years: defineTable({
    project_id: v.id("projects"),
    year: v.number(),
    period_id: v.id("periods_years"),
    income_total: v.number(),
    expenses_total: v.number(),
    profit_total: v.number(),
    cashflow_outflow: v.number(),
    cashflow_inflow: v.number(),
    cashflow_total: v.number(),
    aiinsights: v.union(v.object({}), v.null()),
  }),

  reports_quarters: defineTable({
    project_id: v.id("projects"),
    period_quarter_id: v.id("periods_quarters"),
    period_year_id: v.id("periods_years"),
    period_label: v.string(),
    month_ids: v.array(v.string()),
    income_total: v.number(),
    expenses_total: v.number(),
    profit_total: v.number(),
    cashflow_inflow: v.number(),
    cashflow_outflow: v.number(),
    cashflow_total: v.number(),
    aiinsights: v.union(v.object({}), v.null()),
    report_years_id: v.id("reports_years"),
  }),

  reports_months: defineTable({
    project_id: v.id("projects"),
    period_month_id: v.id("periods_months"),
    period_quarter_id: v.id("periods_quarters"),
    period_year_id: v.id("periods_years"),
    period_label: v.string(),
    income_total: v.number(),
    expenses_total: v.number(),
    profit_total: v.number(),
    cashflow_inflow: v.number(),
    cashflow_outflow: v.number(),
    cashflow_total: v.number(),
    aiinsights: v.union(v.object({}), v.null()),
    report_quarters_id: v.id("reports_quarters"),
    report_years_id: v.id("reports_years"),
  }),
});
