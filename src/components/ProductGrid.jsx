import ProductCard from './ProductCard.jsx';

function ProductGrid({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onAddAndOpen,
  productCountLabel,
  sortValue,
  onSortChange,
}) {
  if (products.length === 0) {
    return (
      <section className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <header className="section-header">
          <div>
            <p className="section-label">Catalogue</p>
            <h2 className="section-title">Produits populaires</h2>
          </div>
        </header>
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>🔍</div>
          <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Aucun produit trouvé</p>
          <p style={{ fontSize: '0.9rem' }}>
            Essayez une autre catégorie ou un autre mot-clé.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <header className="section-header">
        <div>
          <p className="section-label">Catalogue</p>
          <h2 className="section-title">Produits populaires</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{productCountLabel}</span>
          <select
            className="select"
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Trier les produits"
          >
            <option value="default">Trier par</option>
            <option value="price-asc">Prix ↑</option>
            <option value="price-desc">Prix ↓</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWished={wishlistIds.includes(product.id)}
            onToggleWishlist={() => onToggleWishlist(product.id)}
            onAddToCart={() => onAddToCart(product.id)}
            onAddAndOpen={() => onAddAndOpen(product.id)}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <button
          type="button"
          className="btn-primary"
          style={{
            background: 'transparent',
            color: 'var(--navy)',
            border: '2px solid var(--navy)',
            boxShadow: 'none',
          }}
          onClick={() => {
            // purely visuel pour l'instant
            // eslint-disable-next-line no-alert
            window.alert('Tous les produits sont déjà affichés.');
          }}
        >
          Charger plus de produits
        </button>
      </div>
    </section>
  );
}

export default ProductGrid;
