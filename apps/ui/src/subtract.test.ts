import { expect, test } from 'vitest';

import {subtract} from "./subtract";

test('subtract() correctly adds two numbers', () => {
    expect(subtract(1, 2)).toBe(-1);
    expect(subtract(5, 2)).toBe(3);
});

test('subtract() works with negative numbers', () => {
    expect(subtract(-1, 2)).toBe(-3);
    expect(subtract(3, -5)).toBe(8);
});
