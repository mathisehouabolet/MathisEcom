const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const PRODUCTS = require('./data/products');

const app = express();

const PORT = process.env.PORT || 5174;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// In-memory cart store: { cartId: [{ productId, qty }] }
const carts = new Map();
const CART_COOKIE = 'cartId';

function getOrCreateCartId(req, res) {
  let id = req.cookies[CART_COOKIE];
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    res.cookie(CART_COOKIE, id, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
  if (!carts.has(id)) {
    carts.set(id, []);
  }
  return id;
}

function getCartItems(cartId) {
  return carts.get(cartId) || [];
}

function setCartItems(cartId, items) {
  carts.set(cartId, items);
}

function buildCartResponse(cartItems) {
  const detailed = cartItems
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        qty: line.qty,
      };
    })
    .filter(Boolean);

  const subtotal = detailed.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = detailed.reduce((sum, item) => sum + item.qty, 0);

  return {
    items: detailed,
    count,
    subtotal,
  };
}

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Products
app.get('/api/products', (req, res) => {
  const { category, q, sort } = req.query;
  const query = (q || '').toString().toLowerCase().trim();

  let list = PRODUCTS.filter((p) => {
    const matchCat = !category || category === 'all' || p.category === category;
    const matchSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  if (sort === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list = [...list].sort((a, b) => b.rating - a.rating);
  }

  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(product);
});

// Cart
app.get('/api/cart', (req, res) => {
  const cartId = getOrCreateCartId(req, res);
  const items = getCartItems(cartId);
  res.json(buildCartResponse(items));
});

app.post('/api/cart/items', (req, res) => {
  const { productId, qty = 1 } = req.body || {};
  const id = Number(productId);
  const quantity = Number(qty) || 1;

  const product = PRODUCTS.find((p) => p.id === id);
  if (!product || !product.inStock) {
    return res.status(400).json({ error: 'Invalid product or out of stock' });
  }

  const cartId = getOrCreateCartId(req, res);
  const current = getCartItems(cartId);
  const existing = current.find((line) => line.productId === id);

  let next;
  if (existing) {
    next = current.map((line) =>
      line.productId === id ? { ...line, qty: line.qty + quantity } : line,
    );
  } else {
    next = [...current, { productId: id, qty: quantity }];
  }

  setCartItems(cartId, next);
  res.status(201).json(buildCartResponse(next));
});

app.patch('/api/cart/items/:productId', (req, res) => {
  const id = Number(req.params.productId);
  const { qty } = req.body || {};
  const quantity = Number(qty);

  if (!Number.isFinite(quantity) || quantity < 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  const cartId = getOrCreateCartId(req, res);
  const current = getCartItems(cartId);

  let next;
  if (quantity === 0) {
    next = current.filter((line) => line.productId !== id);
  } else {
    const exists = current.some((line) => line.productId === id);
    if (!exists) {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) {
        return res.status(400).json({ error: 'Product does not exist' });
      }
      next = [...current, { productId: id, qty: quantity }];
    } else {
      next = current.map((line) =>
        line.productId === id ? { ...line, qty: quantity } : line,
      );
    }
  }

  setCartItems(cartId, next);
  res.json(buildCartResponse(next));
});

app.delete('/api/cart/items/:productId', (req, res) => {
  const id = Number(req.params.productId);
  const cartId = getOrCreateCartId(req, res);
  const current = getCartItems(cartId);
  const next = current.filter((line) => line.productId !== id);
  setCartItems(cartId, next);
  res.json(buildCartResponse(next));
});

app.post('/api/cart/clear', (req, res) => {
  const cartId = getOrCreateCartId(req, res);
  setCartItems(cartId, []);
  res.json(buildCartResponse([]));
});

// Checkout (mock)
app.post('/api/checkout', (req, res) => {
  const cartId = getOrCreateCartId(req, res);
  const items = getCartItems(cartId);
  if (!items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderId = `order_${Date.now().toString(36)}`;

  setCartItems(cartId, []);

  return res.status(201).json({
    orderId,
    message: 'Commande passée avec succès',
  });
});

// Optional: serve built frontend if present (vite build output in ../dist)
const distDir = path.join(__dirname, '..', '..', 'dist');
app.use(express.static(distDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Not found');
    }
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ShopZen backend listening on http://localhost:${PORT}`);
});

