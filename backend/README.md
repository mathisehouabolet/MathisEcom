# ShopZen Backend

Backend minimal pour ton front `index.html`.

## Démarrer

Dans un terminal, depuis `d:\BUREAU\CoDe\Ecommerce\backend` :

```bash
npm install
npm run dev
```

Le serveur démarre par défaut sur `http://localhost:5174`.

## API

- `GET /api/health`
- `GET /api/products?category=&q=&sort=default|price-asc|price-desc|rating`
- `GET /api/products/:id`
- `GET /api/cart`
- `POST /api/cart/items` body: `{ "productId": 0, "qty": 1 }`
- `PATCH /api/cart/items/:productId` body: `{ "qty": 3 }`
- `DELETE /api/cart/items/:productId`
- `POST /api/cart/clear`
- `POST /api/checkout` body: `{ "customer": { "name": "...", "email": "..." } }`

## Frontend (option)

Le backend sert aussi le front existant :

- ouvre `http://localhost:5174/` au lieu d’ouvrir `index.html` en `file://`

