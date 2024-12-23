# Che Bonita

Este proyecto forma parte del curso **Front-End Talento Tech**, como parte del proceso de evaluación del programa. Se trata de un sitio web ficticio de **Che Bonita**, una tienda en línea (eCommerce) que utiliza tecnologías modernas para crear una experiencia atractiva y responsive para los usuarios.

**Che Bonita** es un sitio web de moda y accesorios enfocado en ofrecer productos con estilo femenino y elegante, inspirado en la identidad argentina. La plataforma permitirá explorar colecciones, categorías y realizar compras en línea. El sitio  presenta para la primer entrega del curso las paginas de: index.html, tienda.html, contacto.html, y proximamente.html.
Se utilizo flexbox , grid , y posicionamientos.
Se desarrollaron dos formularios con Formspree, un form de newsletter, y uno de contacto.
Los productos en la base de datos están organizados en las siguientes categorías en inglés:

- **womens-bags**: Bolsos de mujer
- **womens-shoes**: Zapatos de mujer
- **womens-watches**: Relojes de mujer
- **womens-dresses**: Vestidos de mujer
- **womens-jewelry**: Joyería de mujer
- **ediciones-especiales**: Ediciones especiales
- **gift-cards**: Tarjetas regalo

### Nota

Puedes utilizar estas categorías directamente en las búsquedas o para filtrar productos.

## Contenido

- [Che Bonita](#che-bonita)
    - [Nota](#nota)
  - [Contenido](#contenido)
- [Entrega Final](#entrega-final)
  - [Detalle de Productos con Thumbnails](#detalle-de-productos-con-thumbnails)
  - [Consumo de JSON Local y API Externa](#consumo-de-json-local-y-api-externa)
  - [Creación de Producto Gift Card](#creación-de-producto-gift-card)
  - [Carrito de Compras Funcional](#carrito-de-compras-funcional)
  - [Formulario y Checkout](#formulario-y-checkout)
  - [Buscador Search](#buscador-search)
  - [Futuras Funcionalidades](#futuras-funcionalidades)
  - [Resumen Técnico](#resumen-técnico)
  - [Vista Previa](#vista-previa)
  - [Descripción de las secciones del archivo `index.html`](#descripción-de-las-secciones-del-archivo-indexhtml)
    - [1. **Encabezado (Header)**](#1-encabezado-header)
    - [2. **Galería de Productos (NEW Collection)**](#2-galería-de-productos-new-collection)
    - [3. **Gift Cards**](#3-gift-cards)
    - [4. **Reseñas de Clientes**](#4-reseñas-de-clientes)
    - [5. **Pie de Página (Footer)**](#5-pie-de-página-footer)
    - [Recursos adicionales:](#recursos-adicionales)
  - [Instrucciones para ejecutar el proyecto](#instrucciones-para-ejecutar-el-proyecto)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Autor](#autor)

# Entrega Final

En esta entrega, se han agregado y mejorado diversas funcionalidades, llevando el proyecto a un nivel más avanzado:

## Detalle de Productos con Thumbnails

Se implementó un sistema de detalle de productos que incluye imágenes en miniatura (thumbnails). Esto permite a los usuarios ver múltiples vistas de los productos antes de realizar su compra.

## Consumo de JSON Local y API Externa

El proyecto ahora combina datos locales con una API externa:

- **JSON local**: Utilizado para cargar inicialmente los productos y establecer una estructura básica.
- **API de DummyJSON**: Se integró para complementar los datos locales, proporcionando categorías dinámicas y más realismo en el catálogo.

## Creación de Producto Gift Card

Se diseñó un producto especial llamado "Gift Card" para que los usuarios puedan regalar saldo para compras. Este producto incluyó:

- Un menú desplegable (`<select>`) para seleccionar el monto deseado.
- La implementación de un `uniqueId` para identificar de forma exclusiva cada tarjeta.

## Carrito de Compras Funcional

El carrito de compras es completamente funcional y cuenta con las siguientes características:

- **Almacenamiento en Local Storage**: Permite a los usuarios mantener los productos seleccionados incluso al cerrar el navegador.
- **Gestión de Productos**: Los usuarios pueden agregar, eliminar y actualizar la cantidad de productos en el carrito.
- **Ventajas y Limitaciones**: Aunque Local Storage no es la solución más segura, proporciona velocidad y simplicidad en esta etapa del desarrollo.

## Formulario y Checkout

El proyecto concluye con un sistema de formulario y un proceso de checkout, donde los usuarios ingresan sus datos personales y completan sus compras. Este sistema incluye:

- **Validación básica de datos en el formulario.**
- **Un flujo de usuario claro** desde el carrito hasta la confirmación de compra.
  
## Buscador Search

Se incorporo un buscador funcional. Puede probarse con las categorias del proyecto, DummyJson trabaja en Ingles.

## Futuras Funcionalidades

Quedaron pendientes a realizar: los filtrados de categorias en el aside de la Tienda, y en Dropdwon del Navegable en el Header, los procesos de Login/Logout y la incorporacion de pasarelas de pagos (la compra solo se termina con un sencillo form de checkout).

## Resumen Técnico

- **Frontend**: Se utilizó HTML5, CSS3 y Bootstrap para el diseño responsivo y estilizado del sitio.
- **Backend**: El consumo de APIs y la integración de datos se gestionaron con JavaScript y `fetch`.
- **Local Storage**: Implementado como solución para gestionar la persistencia de datos de los usuarios.

## Vista Previa

![Logo Che Bonita](./img/logo.webp)

> Visita la [demo en vivo](https://chebonita-talentotech.netlify.app/)
---

##  Descripción de las secciones del archivo `index.html`

Este archivo corresponde a la página principal del sitio web, organizada en diversas secciones. A continuación se detalla la descripción de cada una de ellas.

### 1. **Encabezado (Header)**
El encabezado contiene el logotipo de la tienda y el menú de navegación principal, que incluye enlaces a varias páginas y una barra de búsqueda.

- **Logotipo**: Representa la imagen de marca de la tienda.
- **Botón de hamburguesa**: Para móviles, permite expandir o contraer el menú de navegación.
- **Menú de navegación**: Enlaces a secciones como "NEW Collection", "Tienda", entre otros.
- **Barra de búsqueda**: Para permitir a los usuarios buscar productos dentro de la tienda.

### 2. **Galería de Productos (NEW Collection)**
Esta sección está dedicada a resaltar los nuevos productos de la tienda. Los productos se presentan en un formato de galería con imágenes llamativas y botones que permiten añadir productos al carrito o ver más detalles.

- **Imágenes de productos**: Se muestran las imágenes de los productos más recientes.
- **Botones de acción**: Permiten añadir productos al carrito o redirigir a la página de detalles del producto.

### 3. **Gift Cards**
En esta sección se promocionan las tarjetas de regalo de la tienda. Los usuarios pueden conocer más acerca de cómo funciona la tarjeta, sus beneficios y cómo obtenerla.

- **Descripción de la tarjeta de regalo**: Información sobre cómo funciona y sus beneficios.
- **Botón para comprar**: Enlace a la página de compra de las tarjetas de regalo.

### 4. **Reseñas de Clientes**
Esta sección presenta testimonios de clientes satisfechos que han comprado productos en la tienda. Incluye comentarios y calificaciones, lo que ayuda a generar confianza en los nuevos clientes.

- **Comentarios de clientes**: Texto que describe la experiencia de compra de los usuarios.
- **Calificación en estrellas**: Indicador visual de la satisfacción del cliente con las estrellas.

### 5. **Pie de Página (Footer)**
El pie de página contiene información adicional sobre la tienda, enlaces a políticas, contacto y redes sociales.

- **Enlaces a redes sociales**: Accesos directos a las paginas oficiales de las redes sociales, no se cuentan con los propios de la tienda.
- **Políticas y términos**: Se enlaza a proximamente.html.
- **Información de contacto**: Correo electrónico y otras formas de contacto.

---

### Recursos adicionales:
- **Bootstrap**: Framework utilizado para el diseño responsivo y la estructura de la página.
- **Fuentes de Google**: Fuentes personalizadas para el estilo visual del sitio.
- **CSS personalizado**: Archivos CSS para definir el diseño, las tarjetas de producto y otras secciones específicas.
  
## Instrucciones para ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/EliMCN/CheBonita.git]
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd CheBonita
   ```

3. Abre `index.html` en tu navegador para visualizar el sitio.

## Tecnologías Utilizadas

- **HTML5** y **CSS3** para la estructura y estilos.
- **Bootstrap 5** para un diseño responsive.- 
- **Google Fonts** para la carga de fuentes tipográficas personalizadas ( Dancing Script, Poppins, Playfair Display y Lora).

## Autor

Che Bonita fue desarrollado por **Elizabeth Mc Nally**. Para cualquier consulta, no dudes en contactarme.

---
¡Gracias por visitar Che Bonita! Sentite Bonita ❤️


[def]: #nota