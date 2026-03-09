function Header({
  cartCount,
  wishlistCount,
  search,
  onSearchChange,
  onSearchSubmit,
  onOpenCart,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="header-shell">
      <div className="header-top container">
        <a href="#" className="header-logo" aria-label="Accueil ShopZen">
          <div className="header-logo-mark">🛍</div>
          <span>
            Shop
            <span style={{ color: 'var(--gold)' }}>Zen</span>
          </span>
        </a>

        <div className="search-shell" role="search">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un produit, une marque…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Rechercher des produits"
          />
          <button
            type="button"
            className="search-button"
            onClick={onSearchSubmit}
            aria-label="Lancer la recherche"
          >
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          </button>
        </div>

        <div className="header-actions" aria-label="Actions du compte">
          <button type="button" className="header-icon-btn" aria-label="Compte">
            <i className="fa-regular fa-user" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="header-icon-btn"
            aria-label="Liste de souhaits"
          >
            <i className="fa-regular fa-heart" aria-hidden="true" />
            {wishlistCount > 0 ? (
              <span className="cart-badge" aria-label={`${wishlistCount} favoris`}>
                {wishlistCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="header-icon-btn header-cart-btn"
            onClick={onOpenCart}
            aria-label="Ouvrir le panier"
          >
            <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="cart-badge" aria-label={`${cartCount} articles`}>
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;


