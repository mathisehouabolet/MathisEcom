import { formatPrice } from '../utils/formatPrice.js';

export function CartDrawer({ open, items, onClose, onChangeQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${open ? 'open' : ''}`}
        aria-label="Panier"
        aria-hidden={!open}
      >
        <header
          style={{
            padding: '0.9rem 1.2rem',
            borderBottom: '1px solid rgba(15,23,42,0.2)',
            background: 'var(--navy)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
              <span>Mon panier</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
              {count === 0 ? 'Aucun article' : `${count} article${count > 1 ? 's' : ''}`}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panier"
            style={{
              border: 'none',
              borderRadius: '999px',
              width: '32px',
              height: '32px',
              background: 'transparent',
              color: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </header>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.7rem',
                color: '#9ca3af',
                textAlign: 'center',
                paddingTop: '3rem',
                paddingBottom: '3rem',
              }}
            >
              <div style={{ fontSize: '2rem' }}>
                <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
              </div>
              <p style={{ fontWeight: 600, margin: 0 }}>Votre panier est vide</p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Ajoutez des produits pour commencer vos achats.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.7rem',
                  borderRadius: '0.9rem',
                  background: '#f9fafb',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg,#f8fafc,#eef2ff)',
                    fontSize: '1.7rem',
                  }}
                  aria-hidden="true"
                >
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ margin: '0.1rem 0 0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
                    {formatPrice(item.price)} €
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onChangeQty(item.id, item.qty - 1)}
                      aria-label={`Diminuer la quantité de ${item.name}`}
                    >
                      −
                    </button>
                    <span
                      style={{
                        width: '22px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onChangeQty(item.id, item.qty + 1)}
                      aria-label={`Augmenter la quantité de ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Retirer ${item.name} du panier`}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '0.3rem',
                  }}
                >
                  <i className="fa-solid fa-trash" aria-hidden="true" />
                </button>
              </div>
            ))
          )}
        </div>

        <footer
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: '0.9rem 1.2rem 1.1rem',
            background: '#f9fafb',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              color: '#6b7280',
              marginBottom: '0.2rem',
            }}
          >
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)} €</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              color: '#6b7280',
              marginBottom: '0.4rem',
            }}
          >
            <span>Livraison</span>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>Gratuite</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '0.6rem',
            }}
          >
            <span>Total</span>
            <span>{formatPrice(subtotal)} €</span>
          </div>
          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            Passer la commande →
          </button>
        </footer>
      </aside>
    </>
  );
}
