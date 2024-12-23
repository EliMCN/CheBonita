// **Configuración inicial**
const categories = [
  "womens-bags",
  "womens-shoes",
  "womens-watches",
  "womens-dresses",
  "womens-jewelry",
  "ediciones-especiales",
  "basic",
  "gift-cards",
];

let currentPage = 1; // Página actual
const PRODUCTS_PER_PAGE = 6; // Cantidad de productos por página

// **Funciones auxiliares para localStorage**
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function setInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// **Normalización y manejo de datos**
function normalizeCategory(category) {
  return Array.isArray(category) ? category : [category || "Sin categoría"];
}

function normalizeProduct(product) {
  const normalizedProduct = {
    id: product.id,
    title: product.title || product.name || "Producto sin título",
    description: product.description || "Sin descripción disponible",
    category: normalizeCategory(product.category),
    price: product.price || 0,
    discountPercentage: product.discountPercentage || 0,
    rating: product.rating || 0,
    stock: product.stock || 0,
    image: product.image || product.thumbnail,
    images: product.images || [product.image] || [],
    brand: product.brand || "Sin marca",
  };
  console.log("Producto Normalizado:", normalizedProduct);
  return normalizedProduct;
}

// **Fetch de productos locales y de API**
async function fetchLocalProducts() {
  try {
    const response = await fetch("./api-local-products.json");
    const data = await response.json();
    return data.products.map(normalizeProduct);
  } catch (error) {
    console.error("Error al cargar productos locales:", error);
    return [];
  }
}

async function fetchProductsFromAPI(category) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    return data.products.map(normalizeProduct);
  } catch (error) {
    console.error(
      `Error al cargar productos de DummyJSON (${category}):`,
      error
    );
    return [];
  }
}

async function fetchAllApiProducts() {
  const allProducts = await Promise.all(
    categories.map((category) => fetchProductsFromAPI(category))
  );
  return allProducts.flat();
}

// **Combinación y almacenamiento de productos**
function combineProducts(localProducts, apiProducts) {
  return Array.from(
    new Map(
      [...localProducts, ...apiProducts].map((product) => [product.id, product])
    ).values()
  );
}

function updateLocalStorageIfNecessary(products) {
  const storedProducts = getFromLocalStorage("allProducts");
  if (JSON.stringify(storedProducts) !== JSON.stringify(products)) {
    setInLocalStorage("allProducts", products);
  }
}

// **Carga de productos**
async function loadAndStoreProducts() {
  const localProducts = await fetchLocalProducts();
  const apiProducts = await fetchAllApiProducts();
  const combinedProducts = combineProducts(localProducts, apiProducts);
  updateLocalStorageIfNecessary(combinedProducts);
  return combinedProducts;
}

/** Renderizado de productos */
function renderProducts(products) {
  const productsContainer = document.querySelector(".product-list");
  if (!productsContainer) {
    console.error("No se encontró el contenedor de productos");
    return;
  }
  productsContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar
  // Mostrar mensaje si no hay productos
  if (products.length === 0) {
    const message = document.createElement("div");
    message.classList.add("no-results");
    message.innerHTML = `<p>No se encontraron productos para tu búsqueda.</p>`;
    productsContainer.appendChild(message);
    return;
  }

  // Renderizar productos si existen
  products.forEach((product) => {
    productsContainer.appendChild(createProductCard(product));
  });
}


function createProductCard(product) {
  const card = document.createElement("li");
  card.classList.add("product-card");

  // Verificar si el producto es una gift-card
  const priceContent = product.category.includes("gift-cards")
    ? "" // Si es gift-card, dejar vacío
    : `$${product.price.toFixed(2)}`; // Si no es gift-card, mostrar el precio formateado

  card.innerHTML = `
    <figure class="product-figure">
      <img src="${product.image || "./img/logo.webp"}" alt="${
    product.title || "Producto"
  }" loading="lazy">
      <figcaption class="caption">
        <h3 class="caption-title">${product.title}</h3>
        <div class="location">${product.brand}</div>
        <p>${product.description}</p>
        <div class="price">${priceContent}</div>
        <p class="stock-status">
          ${
            product.stock > 10
              ? "En Stock"
              : product.stock > 0
              ? "Últimas unidades"
              : "Agotado"
          }
        </p>
        <a href="product-details.html?id=${
          product.id
        }" class="btn btn-outline-success btn-center">
          Ver más
        </a>
      </figcaption>
    </figure>
  `;
  return card;
}

// **Control de la paginación**
async function loadProducts() {
  const productsContainer = document.querySelector(".product-list");
  if (!productsContainer) {
    console.error("No se encontró el contenedor de productos");
    return;
  }

  const allProducts = await loadAndStoreProducts();
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const productsToDisplay = allProducts.slice(startIndex, endIndex);

  renderProducts(productsToDisplay, productsContainer);

  // Actualizar botón "Load More"
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const loadMoreButton = document.querySelector(".load-more");
  if (loadMoreButton) {
    loadMoreButton.style.display = currentPage >= totalPages ? "none" : "block";
  }
}

function loadMoreProducts() {
  currentPage++;
  loadProducts();
}

// **Eventos y carga inicial**
document
  .querySelector(".load-more")
  ?.addEventListener("click", loadMoreProducts);

loadProducts();
