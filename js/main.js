// ==========================
// CUPIFY - MAIN JAVASCRIPT
// ==========================

const cartButtons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");

// Recuperar carrito guardado
let cart = JSON.parse(localStorage.getItem("cupifyCart")) || [];

// Mostrar cantidad guardada al cargar
updateCartCount();

cartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        const productPrice =
            productCard.querySelector("strong").textContent;

        const product = {
            name: productName,
            price: productPrice
        };

        cart.push(product);

        localStorage.setItem(
            "cupifyCart",
            JSON.stringify(cart)
        );

        updateCartCount();

        // Cambiar temporalmente el botón
        const originalText = button.textContent;

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1200);

    });

});


function updateCartCount() {

    cartCount.textContent = cart.length;

}
