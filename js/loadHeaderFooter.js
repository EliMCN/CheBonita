document.addEventListener("DOMContentLoaded", () => {
  const loadHTML = async (url, placeholderId, callback) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Error al cargar ${url}: ${response.status}`);
      const content = await response.text();
      document.getElementById(placeholderId).innerHTML = content;

      // Ejecutar la función de callback si se proporciona
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar header con callback para actualizar carrito y configurar búsqueda
  loadHTML("./header.html", "header-placeholder", () => {
    actualizarNumeroCarrito(); // Actualiza el carrito
    configurarBuscador(); // Configura el buscador
  });

  // Cargar footer (sin callback en este caso)
  loadHTML("./footer.html", "footer-placeholder");
});

// Función para actualizar el carrito
function actualizarNumeroCarrito() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartCountDesktop = document.getElementById("cartCountDesktop");
  const cartCountMobile = document.getElementById("cartCountMobile");

  if (cartCountDesktop) {
    cartCountDesktop.innerText = totalItems;
    cartCountDesktop.classList.toggle("d-none", totalItems === 0);
  }

  if (cartCountMobile) {
    cartCountMobile.innerText = totalItems;
    cartCountMobile.classList.toggle("d-none", totalItems === 0);
  }
}

// Función para configurar el buscador
function configurarBuscador() {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evitar recargar la página
      const query = searchInput.value.trim(); // Leer la consulta
      if (!query) return; // No hacer nada si la búsqueda está vacía

      const currentPath = window.location.pathname;

      // Si no estás en la página de tienda, redirige
      if (!currentPath.includes("tienda.html")) {
        // Guarda la búsqueda en localStorage y redirige
        localStorage.setItem("searchQuery", query);
        window.location.href = `tienda.html`;
      } else {
        // Si ya estás en tienda, ejecuta la búsqueda
        searchProducts(query);
      }
    });

    // Verificar si hay una búsqueda previa al cargar tienda.html
    const searchQuery = localStorage.getItem("searchQuery");
    if (searchQuery && window.location.pathname.includes("tienda.html")) {
      searchProducts(searchQuery);
      localStorage.removeItem("searchQuery"); // Limpiar el query después de usarlo
    }
  } else {
    console.error("No se encontró el formulario o el input de búsqueda.");
  }
}
