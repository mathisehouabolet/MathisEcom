function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="footer-title">À propos</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.3rem' }}>
            <li className="footer-link">Qui sommes-nous</li>
            <li className="footer-link">Carrières</li>
            <li className="footer-link">Presse</li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Aide</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.3rem' }}>
            <li className="footer-link">Centre d&apos;aide</li>
            <li className="footer-link">Retours</li>
            <li className="footer-link">Suivi de commande</li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Services</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.3rem' }}>
            <li className="footer-link">ShopZen Pro</li>
            <li className="footer-link">Carte cadeau</li>
            <li className="footer-link">Vendre sur ShopZen</li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Paiement sécurisé</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#e5e7eb',
                fontSize: '0.75rem',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
              }}
            >
              <i className="fa-regular fa-credit-card" aria-hidden="true" /> CB
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#e5e7eb',
                fontSize: '0.75rem',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
              }}
            >
              <i className="fa-brands fa-paypal" aria-hidden="true" /> PayPal
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#e5e7eb',
                fontSize: '0.75rem',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
              }}
            >
              <i className="fa-brands fa-apple-pay" aria-hidden="true" /> Apple Pay
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#e5e7eb',
                fontSize: '0.75rem',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
              }}
            >
              <i className="fa-brands fa-google-pay" aria-hidden="true" /> G&nbsp;Pay
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 ShopZen. Tous droits réservés.</p>
        <div className="footer-bottom-links">
          <span className="footer-link">Confidentialité</span>
          <span className="footer-link">CGV</span>
          <span className="footer-link">Cookies</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

