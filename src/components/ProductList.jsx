import ProductCard from './ProductCard';

export default function ProductList({ products, addToCart }) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}
