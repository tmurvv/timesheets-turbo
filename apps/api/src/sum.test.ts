import { expect, test } from 'vitest';

import {sum} from "./sum";

test('sum() correctly adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(5, 2)).toBe(7);
});

test('sum() works with negative numbers', () => {
    expect(sum(-1, 2)).toBe(1);
    expect(sum(3, -5)).toBe(-2);
});
