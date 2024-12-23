// Función de búsqueda
function searchProducts(query) {
  // Obtener productos desde localStorage
  const allProducts = getFromLocalStorage("allProducts") || [];
  const container = document.getElementById("product-list"); 

  if (!container) {
    console.error("El contenedor de productos no está disponible.");
    return;
  }

  if (!query) {
    // Si no hay búsqueda (campo vacío), renderizar todos los productos
    renderProducts(allProducts);
    return;
  }

  // Filtrar productos por título, descripción o categoría
  const filteredProducts = allProducts.filter((product) => {
    const queryLower = query.toLowerCase(); // Hacer la búsqueda insensible a mayúsculas
    return (
      product.title.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower) ||
      product.category.some((category) =>
        category.toLowerCase().includes(queryLower)
      )
    );
  });

  if (filteredProducts.length > 0) {
    // Renderizar los productos filtrados
    renderProducts(filteredProducts);
  } else {
    // Mostrar mensaje de no encontrado
    showNoResultsMessage(container, query);
  }
}

// Función para renderizar mensaje de "sin resultados"
function showNoResultsMessage(container, query) {
  container.innerHTML = `<p class="text-center mt-5">No se encontraron productos para "<strong>${query}</strong>".</p>`;
}

// Manejar el evento de búsqueda (ya en tienda.html)
document.addEventListener("DOMContentLoaded", () => {
  const searchQuery = localStorage.getItem("searchQuery");
  if (searchQuery) {
    searchProducts(searchQuery);
    localStorage.removeItem("searchQuery"); // Limpiar la búsqueda después de usarla
  }
});
