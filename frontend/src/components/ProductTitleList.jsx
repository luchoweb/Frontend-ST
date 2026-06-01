export function ProductTitleList({ products }) {
  return (
    <ol className="product-list" aria-label="Product titles">
      {products.map((product) => (
        <li className="product-list__item" key={product.id}>
          <span>{product.title}</span>
        </li>
      ))}
    </ol>
  );
}
