document.addEventListener("DOMContentLoaded", loadProductDetails);

function loadProductDetails() {
  try {
    // Obtener el ID del producto desde los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseFloat(urlParams.get("id"));
    const storedProducts = getFromStorage("allProducts");

    // Buscar el producto por su ID
    const product = storedProducts.find((p) => parseFloat(p.id) === productId);

    if (!product) throw new Error("Producto no encontrado");

    // Renderizar detalles del producto
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-description").textContent =
      product.description;

    // Verificar si el producto es una gift-card para mostrar el precio vacío, luego será seleccionado
    if (product.category.includes("gift-cards")) {
      document.getElementById("product-price").textContent = ""; // Precio vacío para gift-cards
    } else {
      document.getElementById(
        "product-price"
      ).textContent = `$${product.price}`; // Precio normal
    }
    document.getElementById("product-stock").textContent =
      product.stock > 10 ? "En Stock" : "Últimas unidades";

    // Renderizar los thumbnails
    renderThumbnails(product.images);

    // Verificar si el producto es una Gift Card
    if (product.category.includes("gift-cards")) {
      handleGiftCard(product);
    } else {
      handleNormalProduct(product); // Agregar la lógica para productos normales
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Función para renderizar los thumbnails
function renderThumbnails(thumbnails) {
  const thumbnailContainer = document.getElementById("thumbnail-container");
  if (thumbnails.length > 0) {
    thumbnails.forEach((thumbSrc) => {
      const img = document.createElement("img");
      img.src = thumbSrc;
      img.alt = "Thumbnail";
      img.classList.add("thumbnail");
      thumbnailContainer.appendChild(img);

      // Cambiar la imagen principal al hacer clic en el thumbnail
      img.addEventListener("click", () => {
        document.getElementById("product-image").src = thumbSrc;
      });
    });
  }
}

// Función para manejar productos normales
function handleNormalProduct(product) {
  const addToCartButton = document.getElementById("add-to-cart");

  // Evitar añadir múltiples listeners
  addToCartButton.removeEventListener("click", addToCartHandler);
  addToCartButton.addEventListener("click", addToCartHandler);

  function addToCartHandler() {
    const uniqueId = `${product.id}-${product.price}`;

    addToCart({
      id: uniqueId,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    // Mostrar el botón "Ir al carrito"
    const goToCartButton = document.getElementById("go-to-cart");
    goToCartButton.style.display = "inline-block"; // Mostrar el botón

    // Redirigir al carrito cuando el botón es clickeado
    goToCartButton.removeEventListener("click", goToCartHandler);
    goToCartButton.addEventListener("click", goToCartHandler);
  }

  function goToCartHandler() {
    window.location.href = "cart.html"; // Redirige a la página del carrito
  }
}

// Función para manejar gift cards
function handleGiftCard(product) {
  const giftCardOptions = document.getElementById("gift-card-options");
  giftCardOptions.style.display = "block"; // Mostrar opciones de Gift Card

  const giftCardValueSelect = document.getElementById("gift-card-value");
  const customValueInput = document.getElementById("custom-value");
  const selectedPriceSpan = document.getElementById("selected-price");

  giftCardValueSelect.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value === "custom") {
      customValueInput.style.display = "inline-block";
      selectedPriceSpan.textContent = `$${customValueInput.value || 0}`;
    } else {
      customValueInput.style.display = "none";
      selectedPriceSpan.textContent = `$${value}`;
    }
  });

  customValueInput.addEventListener("input", () => {
    selectedPriceSpan.textContent = `$${customValueInput.value || 0}`;
  });

  const addToCartButton = document.getElementById("add-to-cart");

  // Evitar añadir múltiples listeners
  addToCartButton.removeEventListener("click", addToCartHandler);
  addToCartButton.addEventListener("click", addToCartHandler);

  function addToCartHandler() {
    let price = product.price;
    let uniqueId = `${product.id}-${price}`; // Default uniqueId para productos normales

    const selectedValue = giftCardValueSelect.value;
    if (selectedValue === "0" || selectedValue === "custom") {
      price = parseFloat(customValueInput.value);
      if (isNaN(price) || price <= 0) {
        Swal.fire({
          title: "Precio inválido",
          text: "Por favor, selecciona un precio válido para la tarjeta de regalo.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    } else {
      price = parseFloat(selectedValue);
    }

    uniqueId = `${product.id}-${price}`;

    addToCart({
      id: uniqueId,
      title: product.title,
      price: price,
      image: product.image,
    });

    // Mostrar el botón "Ir al carrito"
    const goToCartButton = document.getElementById("go-to-cart");
    goToCartButton.style.display = "inline-block"; // Mostrar el botón

    // Redirigir al carrito cuando el botón es clickeado
    goToCartButton.removeEventListener("click", goToCartHandler);
    goToCartButton.addEventListener("click", goToCartHandler);
  }

  function goToCartHandler() {
    window.location.href = "cart.html"; // Redirige a la página del carrito
  }
}

// Función auxiliar para obtener datos de `localStorage`
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
