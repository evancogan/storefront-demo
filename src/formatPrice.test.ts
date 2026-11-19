import {expect, test} from 'vitest';
import {formatPrice} from './formatPrice';

test('formats zero cents as $0.00', () => {
  expect(formatPrice(0)).toBe('$0.00');
});

test('formats cents as dollars and cents', () => {
  expect(formatPrice(1299)).toBe('$12.99');
});

test('adds a thousands separator', () => {
  expect(formatPrice(100000)).toBe('$1,000.00');
});
