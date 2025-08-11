/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as asset from "../asset.js";
import type * as assetsPerMonth from "../assetsPerMonth.js";
import type * as expenses from "../expenses.js";
import type * as income from "../income.js";
import type * as investExpenses from "../investExpenses.js";
import type * as investIncomes from "../investIncomes.js";
import type * as periodMonth from "../periodMonth.js";
import type * as periodYear from "../periodYear.js";
import type * as products from "../products.js";
import type * as projects from "../projects.js";
import type * as reportHelpers from "../reportHelpers.js";
import type * as reportMonth from "../reportMonth.js";
import type * as reportYear from "../reportYear.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  asset: typeof asset;
  assetsPerMonth: typeof assetsPerMonth;
  expenses: typeof expenses;
  income: typeof income;
  investExpenses: typeof investExpenses;
  investIncomes: typeof investIncomes;
  periodMonth: typeof periodMonth;
  periodYear: typeof periodYear;
  products: typeof products;
  projects: typeof projects;
  reportHelpers: typeof reportHelpers;
  reportMonth: typeof reportMonth;
  reportYear: typeof reportYear;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
