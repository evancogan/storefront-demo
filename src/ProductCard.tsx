import {formatPrice} from './formatPrice';
import type {Product} from './products';

type ProductCardProps = {
  product: Product;
};

function ProductCard({product}: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{formatPrice(product.priceCents)}</p>
    </article>
  );
}

export default ProductCard;
