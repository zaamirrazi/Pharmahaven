document.addEventListener("DOMContentLoaded", () => {
    const prices = {
        Aspirin: 5,
        Codeine: 8,
        Morphine: 10,
        Ketoprofen: 12,
        Tramadol: 4,
        Naproxen: 18,
        Cephalosporin: 3,
        Aminoglycoside: 17,
        Penicillin: 23,
        Nitrofurantoin: 9,
        Macrolide: 14,
        Tetracycline: 17,
        Citalopram: 8,
        Escitalopram: 2,
        Fluoxetine: 13,
        Trazodone: 21,
        Bupropion: 18,
        Mirtazapine: 3,
        Diphenhydramine: 16,
        Ketotifen: 8,
        Methdilazine: 4,
        Hydroxyzine: 16,
        Diuretics: 7,
        Clonidine: 14,
        Prazosin: 35,
        Chlortalidone: 19,
        Indapamide: 15,
        Lisinopril: 20,
    };

    const cart = {};
    const orderTable = document.querySelector("#orderTable tbody");
    const totalPriceCell = document.getElementById("totalPrice");

    // Update Cart Display
    function updateCart() {
        orderTable.innerHTML = "";
        let totalPrice = 0;

        Object.entries(cart).forEach(([product, details]) => {
            const { quantity, price } = details;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product}</td>
                <td>${quantity}</td>
                <td>${price * quantity}</td>
            `;
            orderTable.appendChild(row);
            totalPrice += price * quantity;
        });

        totalPriceCell.textContent = totalPrice;
    }

    // Add to Cart
    function addToCart(event) {
        const button = event.target;
        const product = button.getAttribute("data-product");
        const quantityInput = document.querySelector(`input[name="${product}"]`);
        const quantity = parseInt(quantityInput.value, 10);

        if (quantity > 0) {
            if (!cart[product]) {
                cart[product] = { quantity: 0, price: prices[product] };
            }
            cart[product].quantity += quantity;
            quantityInput.value = 0;
            updateCart();
        } else {
            alert("Please enter a valid quantity.");
        }
    }

    // save/overwrite fav cart
    function saveFavorite() {
        localStorage.setItem("favoriteCart", JSON.stringify(cart));
        alert("Cart saved as favorite!");
    }

    // apply fav cart
    function applyFavorite() {
        const favoriteCart = JSON.parse(localStorage.getItem("favoriteCart"));
        if (favoriteCart) {
            Object.entries(favoriteCart).forEach(([product, details]) => {
                if (!cart[product]) {
                    cart[product] = { quantity: 0, price: details.price };
                }
                cart[product].quantity += details.quantity;
            });
            updateCart();
            alert("Favorite cart applied!");
        } else {
            alert("No favorite cart found.");
        }
    }

    // Clear Cart
    function clearCart() {
        for (let product in cart) {
            delete cart[product];
        }
        updateCart();
        alert("Cart cleared!");
    }

    // Buy Now
    function buyNow() {
        const total = parseInt(totalPriceCell.textContent, 10);
        if (total > 0) {
            // to save cart data to localStorage
            localStorage.setItem('checkoutCart', JSON.stringify(cart));
            // to navigate to checkout page
            window.location.href = 'checkout.html';
        } else {
            alert("Your cart is empty!");
        }
    }

    // event listeners
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
    });

    document.getElementById("saveFavorite").addEventListener("click", saveFavorite);
    document.getElementById("applyFavorite").addEventListener("click", applyFavorite);
    document.getElementById("clearCart").addEventListener("click", clearCart); // Attach the event listener
    document.getElementById("buyNow").addEventListener("click", buyNow);
});
