document.addEventListener('DOMContentLoaded', () => {
    // load saved cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('checkoutCart'));
    const orderTable = document.querySelector("#checkoutTable tbody");
    const totalPriceCell = document.getElementById("totalPrice");

    // order summary
    function displayOrderSummary() {
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

    // Form validation
    function validateForm(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        
        // validation
        let isValid = true;
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        // card number validation
        const cardNumber = formData.get('cardNumber');
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number');
            return;
        }

        // CVV validation
        const cvv = formData.get('cvv');
        if (!/^\d{3}$/.test(cvv)) {
            alert('Please enter a valid 3-digit CVV');
            return;
        }

        // card expiry date validation
        const expiry = formData.get('expiry');
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Please enter expiry date in MM/YY format');
            return;
        }

        // if validations pass, proceed
        processOrder(formData);
    }

    function processOrder(formData) {
        // to calculate delivery date (1 day delivery)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        
        const formattedDate = deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // clear cart data from localStorage
        localStorage.removeItem('checkoutCart');

        // pop up message
        alert(`Thank you for choosing Pharmahaven, ${formData.get('name')}!\n\nYour order will be delivered by ${formattedDate}.\nA confirmation email has been sent to ${formData.get('email')}.`);
        
        // back to home page
        window.location.href = 'index.html';
    }

    if (cart) {
        displayOrderSummary();
        document.getElementById('checkoutForm').addEventListener('submit', validateForm);
    } else {
        alert('No order found');
        window.location.href = 'index.html';
    }
});