import { formatPrice } from '../utils/formatPrice.js';

function ProductCard({ product, isWished, onToggleWishlist, onAddToCart, onAddAndOpen }) {
  const discount =
    product.oldPrice != null ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const badgeClass =
    product.badge === 'new'
      ? 'badge-new'
      : product.badge === 'hot'
        ? 'badge-hot'
        : 'badge-sale';
  const badgeText =
    product.badge === 'new'
      ? 'Nouveau'
      : product.badge === 'hot'
        ? '🔥 Hot'
        : `-${discount}%`;

  return (
    <article className="product-card" aria-label={product.name}>
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg,#f8fafc,#eef2ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '160px',
        }}
      >
        <span className="product-emoji" aria-hidden="true">
          {/* On garde l'emoji produit comme fallback visuel */}
          {product.emoji}
        </span>
        <span
          className={`badge ${badgeClass}`}
          style={{ position: 'absolute', top: '10px', left: '10px' }}
        >
          {badgeText}
        </span>
        <button
          type="button"
          className={`wishlist-btn ${isWished ? 'wishlist-btn--active' : ''}`}
          aria-pressed={isWished}
          aria-label={
            isWished
              ? `Retirer ${product.name} des favoris`
              : `Ajouter ${product.name} aux favoris`
          }
          onClick={onToggleWishlist}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <i
            className={isWished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
            aria-hidden="true"
          />
        </button>
        {!product.inStock ? (
          <div className="badge-out">Rupture de stock</div>
        ) : null}
      </div>

      <div style={{ padding: '0.9rem' }}>
        <p
          style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'capitalize', margin: 0 }}
        >
          {product.category}
        </p>
        <h3
          style={{
            margin: '0.15rem 0 0.3rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            marginBottom: '0.3rem',
            fontSize: '0.75rem',
          }}
        >
          <span className="star-rating">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 >= 0.5 ? '½' : ''}
          </span>
          <span style={{ color: '#6b7280' }}>
            {product.rating.toFixed(1)} ({product.reviews.toLocaleString('fr-FR')})
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.4rem',
            marginBottom: '0.6rem',
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--navy)',
            }}
          >
            {formatPrice(product.price)} €
          </span>
          {product.oldPrice != null ? (
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>
              {formatPrice(product.oldPrice)} €
            </span>
          ) : null}
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            className="add-btn"
            style={{ flex: 1, opacity: product.inStock ? 1 : 0.45, cursor: product.inStock ? 'pointer' : 'not-allowed' }}
            disabled={!product.inStock}
            onClick={onAddToCart}
          >
            {product.inStock ? '+ Ajouter' : 'Indisponible'}
          </button>
          <button
            type="button"
            style={{
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              padding: '0.4rem 0.65rem',
              fontSize: '0.75rem',
              background: '#fff',
              color: '#4b5563',
              opacity: product.inStock ? 1 : 0.45,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
            }}
            disabled={!product.inStock}
            onClick={onAddAndOpen}
            aria-label={`Ajouter ${product.name} et ouvrir le panier`}
          >
            <i className="fa-solid fa-cart-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

