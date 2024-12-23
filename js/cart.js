document.addEventListener("DOMContentLoaded", () => {
  // Llamar a la función para actualizar el carrito al cargar la página
  actualizarNumeroCarrito();
  renderCart();
  
});

// Funciones auxiliares para manejar `localStorage`
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Actualizar el número de productos en el carrito
function actualizarNumeroCarrito() {
  const cart = getFromStorage("cart");
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Log para verificar la ejecución y los datos
  console.log("Carrito cargado:", cart);
  console.log("Total de productos en el carrito:", totalItems);

  const cartCountDesktop = document.getElementById("cartCountDesktop");
  const cartCountMobile = document.getElementById("cartCountMobile");

  // Actualizar la visibilidad y el texto del contador para escritorio
  if (cartCountDesktop) {
    if (totalItems > 0) {
      cartCountDesktop.innerText = totalItems;
      cartCountDesktop.classList.remove("d-none");
    } else {
      cartCountDesktop.classList.add("d-none");
    }
  }

  // Actualizar la visibilidad y el texto del contador para móvil
  if (cartCountMobile) {
    if (totalItems > 0) {
      cartCountMobile.innerText = totalItems;
      cartCountMobile.classList.remove("d-none");
    } else {
      cartCountMobile.classList.add("d-none");
    }
  }
}

// Renderizar el carrito
function renderCart() {
  const cartContainer = document.querySelector(".cart-list");
  const cartProducts = getFromStorage("cart");
  if (!cartContainer) return;

  if (cartProducts.length === 0) {
    cartContainer.innerHTML =
      "<tr><td colspan='6' class='text-center'>El carrito está vacío.</td></tr>";
    document.getElementById("cart-total").innerText = "0.00";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cartProducts
    .map((product) => {
      const subtotal = product.price * product.quantity;
      total += subtotal;
      return renderCartItem(product);
    })
    .join("");

  document.getElementById("cart-total").innerText = total.toFixed(2);

  // Event listeners para botones
  document.querySelectorAll(".update-quantity").forEach((button) => {
    button.addEventListener("click", (e) => {
      const {uniqueId, delta} = e.target.dataset;
      updateQuantity(uniqueId, parseInt(delta, 10));
    });
  });

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const {uniqueId} = e.target.dataset;
      removeFromCart(uniqueId);
    });
  });
}

// Crear un elemento HTML para cada producto del carrito
function renderCartItem(product) {
  const subtotal = (product.price * product.quantity).toFixed(2);
  return `
    <tr>
      <td><img src="${product.image}" alt="${
    product.title
  }" class="img-fluid" style="max-width: 100px; height: auto;"></td>
      <td>${product.title}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary update-quantity" data-unique-id="${
          product.uniqueId
        }" data-delta="-1">-</button>
        <span class="mx-2">${product.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary update-quantity" data-unique-id="${
          product.uniqueId
        }" data-delta="1">+</button>
      </td>
      <td>$${subtotal}</td>
      <td>
        <button class="btn btn-sm btn-danger remove-from-cart" data-unique-id="${
          product.uniqueId
        }">Eliminar</button>
      </td>
    </tr>
  `;
}

// Actualizar la cantidad de un producto en el carrito
function updateQuantity(uniqueId, delta) {
  const cart = getFromStorage("cart");
  const productInCart = cart.find((item) => item.uniqueId === uniqueId);

  productInCart.quantity += delta;

  if (productInCart.quantity < 1) {
    removeFromCart(uniqueId);
    return;
  }

  saveToStorage("cart", cart);
  renderCart();
  actualizarNumeroCarrito(); // Asegura que el contador se actualice al cambiar la cantidad
}

// Eliminar un producto del carrito
function removeFromCart(uniqueId) {
  const cart = getFromStorage("cart").filter(
    (item) => item.uniqueId !== uniqueId
  );
  saveToStorage("cart", cart);
  renderCart();
  actualizarNumeroCarrito(); // Asegura que el contador se actualice al eliminar un producto
}

// Agregar un producto al carrito
function addToCart({id, title, price, image}) {
  const cart = getFromStorage("cart");
  const uniqueId = `${id}-${price}`;

  const productInCart = cart.find((item) => item.uniqueId === uniqueId);

  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.push({uniqueId, title, price, image, quantity: 1});
  }

  saveToStorage("cart", cart);
  actualizarNumeroCarrito(); // Asegura que el contador se actualice al agregar un producto

  Swal.fire({
    title: "¡Producto agregado!",
    text: `${title} ha sido añadido al carrito.`,
    icon: "success",
    confirmButtonText: "Continuar",
    timer: 3000,
  });
}

// Reiniciar el carrito
function reiniciarCarrito() {
  localStorage.removeItem("cart");
  actualizarNumeroCarrito();
  renderCart();
}
