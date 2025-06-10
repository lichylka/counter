import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

    const startDate = new Date(args.start_date);
    const monthsCount = args.period_plan * 12;

    // Create project report
    await ctx.db.insert("reports_project", {
      project_id: projectId,
      from_year: startDate.getFullYear(),
      to_year: startDate.getFullYear() + args.period_plan - 1,
      income_total: 0,
      expenses_total: 0,
      profit_total: 0,
      cashinflow_total: 0,
      cashoutflow_total: 0,
      net_cashflow: 0,
      created_at: Date.now(),
      updated_at: Date.now(),
      generated_from: [],
      aiinsights: null,
    });

    // Create years and track their IDs
    const yearIds = new Map<number, Id<"periods_years">>();
    const reportYearIds = new Map<number, Id<"reports_years">>();
    for (let i = 0; i <= args.period_plan; i++) {
      const year = startDate.getFullYear() + i;
      const yearId = await ctx.db.insert("periods_years", {
        project_id: projectId,
        year: year,
        index: i,
      });
      yearIds.set(year, yearId);

      const reportYearId = await ctx.db.insert("reports_years", {
        project_id: projectId,
        period_id: yearId,
        year: year,
        income_total: 0,
        expenses_total: 0,
        profit_total: 0,
        cashflow_inflow: 0,
        cashflow_outflow: 0,
        cashflow_total: 0,
        aiinsights: {},
      });
      reportYearIds.set(year, reportYearId);
    }

    // Create quarters and months
    let quarterId: any;
    let reportQuarterId: any;
    for (let i = 0; i < monthsCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const quarter = Math.ceil((month + 1) / 3);
      const yearId = yearIds.get(year)!;
      const reportYearId = reportYearIds.get(year)!;
      if (month % 3 === 0 || !quarterId) {
        console.log("create");
        quarterId = await ctx.db.insert("periods_quarters", {
          project_id: projectId,
          year_id: yearId,
          year: year,
          quarter: `Q${quarter}` as "Q1" | "Q2" | "Q3" | "Q4",
          index: i / 3,
        });

        // Create quarter report
        reportQuarterId = await ctx.db.insert("reports_quarters", {
          project_id: projectId,
          period_quarter_id: quarterId,
          period_year_id: yearId,
          period_label: `Q${quarter} ${year}`,
          month_ids: [],
          income_total: 0,
          expenses_total: 0,
          profit_total: 0,
          cashflow_inflow: 0,
          cashflow_outflow: 0,
          cashflow_total: 0,
          aiinsights: {},
          report_years_id: reportYearId,
        });
      }
      console.log("quarterId", quarterId);
      // Create month
      const monthId = await ctx.db.insert("periods_months", {
        project_id: projectId,
        year_id: yearId,
        quarter_id: quarterId,
        year: year,
        quarter: `Q${quarter}` as "Q1" | "Q2" | "Q3" | "Q4",
        index: i,
        start_date: new Date(year, month, 1).toISOString(),
        dateEnd: new Date(year, month + 1, 0).toISOString(),
      });

      // Create month report
      await ctx.db.insert("reports_months", {
        project_id: projectId,
        period_month_id: monthId,
        period_quarter_id: quarterId,
        period_year_id: yearId,
        period_label: `${month + 1}/${year}`,
        income_total: 0,
        expenses_total: 0,
        profit_total: 0,
        cashflow_inflow: 0,
        cashflow_outflow: 0,
        cashflow_total: 0,
        aiinsights: null,
        report_quarters_id: reportQuarterId,
        report_years_id: reportYearId,
      });
    }

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
