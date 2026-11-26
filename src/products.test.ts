import {expect, test} from 'vitest';
import {products} from './products';

test('product ids are unique', () => {
  const ids = products.map(product => product.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('every product has a name and a description', () => {
  for (const product of products) {
    expect(product.name).not.toBe('');
    expect(product.description).not.toBe('');
  }
});

test('every price is a positive whole number of cents', () => {
  for (const product of products) {
    expect(Number.isInteger(product.priceCents)).toBe(true);
    expect(product.priceCents).toBeGreaterThan(0);
  }
});

test('every product has a non-empty id', () => {
  for (const product of products) {
    expect(product.id).not.toBe('');
  }
});
