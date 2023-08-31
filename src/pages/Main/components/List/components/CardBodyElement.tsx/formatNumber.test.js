import { expect, test } from 'vitest'
import { formatNumber } from "./index";

test('format integer number', () => {
  expect(formatNumber(1)).toBe(1);
});

test('format float number', () => {
  expect(formatNumber(1.123)).toBe(1.12);
});

test('format number with zeroes', () => {
  expect(formatNumber(1.0000)).toBe(1);
});
