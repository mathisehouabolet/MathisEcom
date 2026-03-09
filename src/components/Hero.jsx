function Hero({ onExplore }) {
  return (
    <section className="hero">
      <div className="hero-grid container">
        <div>
          <div className="hero-badge">
            <span>🔥 Ventes flash</span>
            <span>-60%</span>
          </div>
          <h1 className="hero-title">
            Tout ce dont
            <br />
            vous avez besoin,
            <br />
            <span style={{ color: 'var(--gold)' }}>livré en 24h</span>
          </h1>
          <p className="hero-subtitle">
            Des milliers de produits, les meilleures marques, la livraison express.
            Commencez à explorer dès maintenant.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={onExplore}
            >
              Explorer les offres →
            </button>
            <button type="button" className="btn-ghost">
              Rejoindre ShopZen Pro
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">2M+</div>
              <div className="hero-stat-label">Produits</div>
            </div>
            <div>
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">Satisfaction</div>
            </div>
            <div>
              <div className="hero-stat-value">24h</div>
              <div className="hero-stat-label">Livraison</div>
            </div>
          </div>
        </div>

        <div className="hero-cards">
          <article className="hero-card">
            <span className="hero-card-emoji" aria-hidden="true">
              <i className="fa-solid fa-mobile-screen-button" />
            </span>
            <p className="hero-card-title">Smartphones</p>
            <span className="badge badge-sale">-40%</span>
          </article>
          <article className="hero-card">
            <span className="hero-card-emoji" aria-hidden="true">
              <i className="fa-solid fa-shoe-prints" />
            </span>
            <p className="hero-card-title">Sneakers</p>
            <span className="badge badge-new">Nouveau</span>
          </article>
          <article className="hero-card">
            <span className="hero-card-emoji" aria-hidden="true">
              <i className="fa-solid fa-headphones" />
            </span>
            <p className="hero-card-title">Audio</p>
            <span className="badge badge-hot">🔥 Hot</span>
          </article>
          <article className="hero-card">
            <span className="hero-card-emoji" aria-hidden="true">
              <i className="fa-solid fa-laptop" />
            </span>
            <p className="hero-card-title">Laptops</p>
            <span className="badge badge-sale">-25%</span>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Hero;
