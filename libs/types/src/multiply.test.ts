import { expect, test } from 'vitest';

import {multiply} from "./multiply";

test('sum() correctly adds two numbers', () => {
    expect(multiply(1, 2)).toBe(2);
    expect(multiply(5, 2)).toBe(10);
});

test('sum() works with negative numbers', () => {
    expect(multiply(-1, 2)).toBe(-2);
    expect(multiply(3, -5)).toBe(-15);
});
