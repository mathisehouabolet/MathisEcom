import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import CategoryBar from './components/CategoryBar.jsx';
import Hero from './components/Hero.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import Footer from './components/Footer.jsx';
import { PRODUCTS } from './data/products.js';
import { loadCart, loadWishlist, saveCart, saveWishlist } from './utils/storage.js';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [cart, setCart] = useState(() => loadCart());
  const [wishlistIds, setWishlistIds] = useState(() => loadWishlist());
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, icon: '✅', message: '' });
  const toastTimeoutRef = useRef(null);
  const productsSectionRef = useRef(null);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    saveWishlist(wishlistIds);
  }, [wishlistIds]);

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const matchSearch =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const productCountLabel =
    filteredProducts.length === 0
      ? 'Aucun produit'
      : `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''}`;

  const showToast = (message, icon = '✅') => {
    setToast({ open: true, icon, message });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2600);
  };

  const handleAddToCart = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || !product.inStock) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} ajouté au panier`, '✅');
  };

  const handleAddToCartAndOpen = (productId) => {
    handleAddToCart(productId);
    setCartOpen(true);
  };

  const handleChangeQty = (productId, qty) => {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, qty } : item,
      );
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Retiré des favoris', '🤍');
        return prev.filter((id) => id !== productId);
      }
      showToast('Ajouté aux favoris', '❤️');
      return [...prev, productId];
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast('Commande passée avec succès ! 🎉', '🎉');
    setCart([]);
    setCartOpen(false);
  };

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => {}}
        onOpenCart={() => setCartOpen(true)}
      />

      <CategoryBar current={category} onChange={setCategory} />

      <main className="app-main">
        <Hero onExplore={scrollToProducts} />

        <div className="promo-banner">
          <div className="promo-inner shadow-soft">
            <div>
              <p className="promo-title">
                <i className="fa-solid fa-bolt" aria-hidden="true" /> Offre du jour — iPhone 15 Pro
              </p>
              <p className="promo-sub">
                Prix spécial pour les membres ShopZen Pro. Offre valable jusqu&apos;à minuit.
              </p>
            </div>
            <button
              type="button"
              className="promo-cta"
              onClick={() => handleAddToCart(0)}
            >
              Voir l&apos;offre
            </button>
          </div>
        </div>

        <div ref={productsSectionRef}>
          <ProductGrid
            products={filteredProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onAddAndOpen={handleAddToCartAndOpen}
            productCountLabel={productCountLabel}
            sortValue={sort}
            onSortChange={setSort}
          />
        </div>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={handleChangeQty}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Toast open={toast.open} icon={toast.icon} message={toast.message} />
    </div>
  );
}

export default App;

