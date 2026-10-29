// Productos de demostración. Cambia estos datos por el inventario de tu tienda.
// Las cantidades se muestran como existencias actuales y no se actualizan solas.
const products = [
  {
    id: 1, name: "Refrigeradora No Frost", category: "Refrigeración",
    description: "Top Mount · 14 pies cúbicos", price: 18999, stock: 7,
    image: "https://www.lg.com/cac/images/refrigerador/md07602521/gallery-01/D-01.jpg"
  },
  {
    id: 2, name: "Lavadora automática", category: "Lavado",
    description: "Carga superior · 18 kg", price: 12499, stock: 3,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3, name: "Cocina de gas", category: "Cocina",
    description: "4 quemadores · Horno incluido", price: 8999, stock: 5,
    image: "https://www.mabeglobal.com/medias/515Wx515H-A-Mabe-Cocina-20-pulgadas-Plata-Mercury-EM5035CFIS0-Frente.jpg?context=bWFzdGVyfGltYWdlc3wxNTA5OXxpbWFnZS9qcGVnfGFEQmtMMmd4T1M4eE1qY3dNalUzT0RVd056Z3dOaTgxTVRWWGVEVXhOVWhmUVMxTllXSmxMVU52WTJsdVlTMHlNQzF3ZFd4bllXUmhjeTFRYkdGMFlTMU5aWEpqZFhKNUxVVk5OVEF6TlVOR1NWTXdMVVp5Wlc1MFpTNXFjR2N8OTkyM2RiNmM4ODQwODA3NWU5M2M2YmE5YjczYzRmNmY3YTQ3NTYxZWU3MDI1MmQyYWI1MjM5MGZkOTk1MWJkMw"
  },
  {
    id: 4, name: "Televisor Smart TV", category: "Entretenimiento",
    description: "4K UHD · 55 pulgadas", price: 15999, stock: 0,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5, name: "Horno microondas", category: "Microondas",
    description: "Digital · 1.1 pies cúbicos", price: 2499, stock: 12,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6, name: "Licuadora de vaso", category: "Pequeños electrodomésticos",
    description: "600 W · 2 velocidades", price: 1299, stock: 2,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7, name: "Aire acondicionado", category: "Ventiladores y aire acondicionado",
    description: "Minisplit · 12,000 BTU", price: 13999, stock: 4,
    image: "https://orbegozo.com/wp-content/uploads/2026/05/aire-acondicionado-portatil-ADR-7000_3.jpg"
  },
  {
    id: 8, name: "Cafetera eléctrica", category: "Pequeños electrodomésticos",
    description: "Jarra de vidrio · 12 tazas", price: 999, stock: 0,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85"
  },
   {
    id: 9, name: "Equipo de sonido", category: "Sonido",
    description: "1000 watts", price: 6999, stock: 2,
    image: "https://www.lg.com/cac/images/equipo-de-sonido/md05819210/gallery/DZ-01.jpg"
  },
];

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const productCount = document.querySelector("#product-count");
const emptyState = document.querySelector("#empty-state");

function formatPrice(price) {
  // Formato de ejemplo para Nicaragua. Modifícalo si usas otra moneda.
  return new Intl.NumberFormat("es-NI", {
    style: "currency", currency: "NIO", maximumFractionDigits: 0
  }).format(price);
}

function getStockInfo(stock) {
  if (stock === 0) return { label: "Agotado", className: "stock-out" };
  if (stock <= 3) return { label: `Pocas: ${stock}`, className: "stock-low" };
  return { label: `Stock: ${stock}`, className: "stock-available" };
}

function createProductCard(product) {
  const stock = getStockInfo(product.stock);
  const card = document.createElement("article");
  card.className = "product-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";

  const category = document.createElement("span");
  category.className = "category-tag";
  category.textContent = product.category;

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.onerror = () => {
    image.removeAttribute("src");
    image.alt = "Imagen no disponible";
    image.style.background = "#e9eef5";
  };

  imageWrap.append(category, image);

  const info = document.createElement("div");
  info.className = "product-info";

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";

  const priceBlock = document.createElement("div");
  const priceLabel = document.createElement("span");
  priceLabel.className = "price-label";
  priceLabel.textContent = "Precio";
  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = formatPrice(product.price);
  priceBlock.append(priceLabel, price);

  const stockBadge = document.createElement("span");
  stockBadge.className = `stock ${stock.className}`;
  stockBadge.textContent = stock.label;
  stockBadge.setAttribute("aria-label", `Disponibilidad: ${stock.label}`);

  bottom.append(priceBlock, stockBadge);
  info.append(name, description, bottom);
  card.append(imageWrap, info);
  return card;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const category = categorySelect.value;
  const sort = sortSelect.value;

  let visibleProducts = products.filter(product => {
    const matchesText = `${product.name} ${product.category} ${product.description}`
      .toLocaleLowerCase("es").includes(query);
    const matchesCategory = category === "todos" || product.category === category;
    return matchesText && matchesCategory;
  });

  if (sort === "price-asc") visibleProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") visibleProducts.sort((a, b) => b.price - a.price);
  if (sort === "name") visibleProducts.sort((a, b) => a.name.localeCompare(b.name, "es"));

  grid.replaceChildren(...visibleProducts.map(createProductCard));
  productCount.textContent = `${visibleProducts.length} producto${visibleProducts.length === 1 ? "" : "s"} encontrado${visibleProducts.length === 1 ? "" : "s"}`;
  emptyState.hidden = visibleProducts.length > 0;
  grid.hidden = visibleProducts.length === 0;
}

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);
document.querySelector("#clear-filters").addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "todos";
  sortSelect.value = "featured";
  renderProducts();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
