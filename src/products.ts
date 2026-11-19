export type Product = {
  id: string;
  name: string;
  priceCents: number;
  description: string;
};

export const products: Product[] = [
  {
    id: 'mug',
    name: 'Ceramic Mug',
    priceCents: 1299,
    description: 'A 12 oz stoneware mug.',
  },
  {
    id: 'tote',
    name: 'Canvas Tote Bag',
    priceCents: 2400,
    description: 'A sturdy cotton tote.',
  },
  {
    id: 'notebook',
    name: 'Dot Grid Notebook',
    priceCents: 1450,
    description: 'A 120 page notebook with a dot grid.',
  },
  {
    id: 'bottle',
    name: 'Steel Water Bottle',
    priceCents: 2999,
    description: 'A 24 oz insulated bottle.',
  },
];
