import { Id } from "./_generated/dataModel";
import { MutationCtx } from "./_generated/server";

export async function updateReports(
  ctx: MutationCtx,
  reports_months_id: Id<"reports_months">,
  {
    expense = 0,
    income = 0,
    investExpense = 0,
    investIncome = 0,
  }: {
    expense?: number;
    income?: number;
    investExpense?: number;
    investIncome?: number;
  }
) {
  const reportMonth = await ctx.db.get(reports_months_id);
  if (!reportMonth) throw new Error("Report month not found");

  await ctx.db.patch(reports_months_id, {
    expenses_total: reportMonth.expenses_total + expense,
    income_total: reportMonth.income_total + income,
    profit_total: reportMonth.profit_total - expense + income,

    invest_expense_total:
      (reportMonth.invest_expense_total ?? 0) + investExpense,
    invest_income_total: (reportMonth.invest_income_total ?? 0) + investIncome,
    invest_profit_total:
      (reportMonth.invest_profit_total ?? 0) - investExpense + investIncome,
  });

  const reportQuarter = await ctx.db.get(reportMonth.report_quarters_id);
  if (!reportQuarter) throw new Error("Report quarter not found");
  await ctx.db.patch(reportQuarter._id, {
    expenses_total: reportQuarter.expenses_total + expense,
    income_total: reportQuarter.income_total + income,
    profit_total: reportQuarter.profit_total - expense + income,

    invest_expense_total:
      (reportQuarter.invest_expense_total ?? 0) + investExpense,
    invest_income_total:
      (reportQuarter.invest_income_total ?? 0) + investIncome,
    invest_profit_total:
      (reportQuarter.invest_profit_total ?? 0) - investExpense + investIncome,
  });

  const reportYear = await ctx.db.get(reportMonth.report_years_id);
  if (!reportYear) throw new Error("Report year not found");
  await ctx.db.patch(reportYear._id, {
    expenses_total: reportYear.expenses_total + expense,
    income_total: reportYear.income_total + income,
    profit_total: reportYear.profit_total - expense + income,

    invest_expense_total:
      (reportYear.invest_expense_total ?? 0) + investExpense,
    invest_income_total: (reportYear.invest_income_total ?? 0) + investIncome,
    invest_profit_total:
      (reportYear.invest_profit_total ?? 0) - investExpense + investIncome,
  });
}
