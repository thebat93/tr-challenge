import { expect, test } from "vitest";
import { ISIN_REGEXP } from "./index";

test("validate correct ISIN", () => {
  expect(ISIN_REGEXP.test("US0378331005")).toBe(true);
});

test("validate incorrect short ISIN", () => {
  expect(ISIN_REGEXP.test("11")).toBe(false);
});

test("validate incorrect long ISIN", () => {
  expect(ISIN_REGEXP.test("US03783310050")).toBe(false);
});
