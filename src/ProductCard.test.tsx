import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';
import ProductCard from './ProductCard';
import {products} from './products';

test('shows the name, description and price of a product', () => {
  const mug = products.find(product => product.id === 'mug');
  if (!mug) {
    throw new Error('The mug product is missing from products.ts');
  }

  render(<ProductCard product={mug} />);

  expect(
    screen.getByRole('heading', {name: 'Ceramic Mug'})
  ).toBeInTheDocument();
  expect(screen.getByText('A 12 oz stoneware mug.')).toBeInTheDocument();
  expect(screen.getByText('$12.99')).toBeInTheDocument();
});
