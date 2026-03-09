const CATEGORIES = [
  { id: 'all', label: 'Tout', iconClass: 'fa-solid fa-layer-group' },
  { id: 'electronique', label: 'Électronique', iconClass: 'fa-solid fa-mobile-screen-button' },
  { id: 'mode', label: 'Mode', iconClass: 'fa-solid fa-shirt' },
  { id: 'maison', label: 'Maison', iconClass: 'fa-solid fa-couch' },
  { id: 'sport', label: 'Sport', iconClass: 'fa-solid fa-dumbbell' },
  { id: 'beaute', label: 'Beauté', iconClass: 'fa-solid fa-spray-can-sparkles' },
  { id: 'livres', label: 'Livres', iconClass: 'fa-solid fa-book-open' },
  { id: 'jouets', label: 'Jouets', iconClass: 'fa-solid fa-puzzle-piece' },
];

function CategoryBar({ current, onChange }) {
  return (
    <nav
      className="chip-scroll"
      aria-label="Catégories de produits"
    >
      {CATEGORIES.map((cat) => {
        const active = current === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`cat-chip ${active ? 'cat-chip--active' : ''}`}
            onClick={() => onChange(cat.id)}
          >
            <i className={cat.iconClass} aria-hidden="true" style={{ marginRight: '0.35rem' }} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryBar;
