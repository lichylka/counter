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

  const expensesMonth = reportMonth.expenses_total + expense;
  const incomeMonth = reportMonth.income_total + income;
  const profitMonth = incomeMonth - expensesMonth;

  const investExpensesMonth =
    (reportMonth.invest_expense_total ?? 0) + investExpense;
  const investIncomeMonth =
    (reportMonth.invest_income_total ?? 0) + investIncome;
  const investProfitMonth = investIncomeMonth - investExpensesMonth;

  await ctx.db.patch(reports_months_id, {
    expenses_total: expensesMonth,
    income_total: incomeMonth,
    profit_total: profitMonth,

    invest_expense_total: investExpensesMonth,
    invest_income_total: investIncomeMonth,
    invest_profit_total: investProfitMonth,

    cashflow_outflow: expensesMonth + investExpensesMonth,
    cashflow_inflow: incomeMonth + investIncomeMonth,
    cashflow_total: profitMonth + investProfitMonth,
  });

  const reportQuarter = await ctx.db.get(reportMonth.report_quarters_id);
  if (!reportQuarter) throw new Error("Report quarter not found");

  const expensesQuarter = reportQuarter.expenses_total + expense;
  const incomeQuarter = reportQuarter.income_total + income;
  const profitQuarter = incomeQuarter - expensesQuarter;

  const investExpensesQuarter =
    (reportQuarter.invest_expense_total ?? 0) + investExpense;
  const investIncomeQuarter =
    (reportQuarter.invest_income_total ?? 0) + investIncome;
  const investProfitQuarter = investIncomeQuarter - investExpensesQuarter;

  await ctx.db.patch(reportQuarter._id, {
    expenses_total: expensesQuarter,
    income_total: incomeQuarter,
    profit_total: profitQuarter,

    invest_expense_total: investExpensesQuarter,
    invest_income_total: investIncomeQuarter,
    invest_profit_total: investProfitQuarter,

    cashflow_outflow: expensesQuarter + investExpensesQuarter,
    cashflow_inflow: incomeQuarter + investIncomeQuarter,
    cashflow_total: profitQuarter + investProfitQuarter,
  });

  const reportYear = await ctx.db.get(reportMonth.report_years_id);
  if (!reportYear) throw new Error("Report year not found");

  const expensesYear = reportYear.expenses_total + expense;
  const incomeYear = reportYear.income_total + income;
  const profitYear = incomeYear - expensesYear;

  const investExpensesYear =
    (reportYear.invest_expense_total ?? 0) + investExpense;
  const investIncomeYear = (reportYear.invest_income_total ?? 0) + investIncome;
  const investProfitYear = investIncomeYear - investExpensesYear;

  await ctx.db.patch(reportYear._id, {
    expenses_total: expensesYear,
    income_total: incomeYear,
    profit_total: profitYear,

    invest_expense_total: investExpensesYear,
    invest_income_total: investIncomeYear,
    invest_profit_total: investProfitYear,

    cashflow_outflow: expensesYear + investExpensesYear,
    cashflow_inflow: incomeYear + investIncomeYear,
    cashflow_total: profitYear + investProfitYear,
  });
}
