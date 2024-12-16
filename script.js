// Login functionality
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Hardcoded credentials for simplicity (replace with server validation in real applications)
            const validUsername = "admin";
            const validPassword = "12345";

            if (username === validUsername && password === validPassword) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "home.html";
            } else {
                loginError.style.display = "block";
            }
        });
    }

    // Redirection to login.html if not logged in (for other pages)
    if (!localStorage.getItem("loggedIn") && window.location.pathname !== "home.html") {
        window.location.href = "home.html";
    }

    // Logout button functionality
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn"); // Clear login status
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Render the order and update total
    renderOrder();
    updateTotal();

    // Checkout button functionality
    document.getElementById('checkoutButton').addEventListener('click', function () {
        const name = document.getElementById('customerName').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();

        if (!name || !address || !phone) {
            alert("Please fill out all fields before proceeding.");
            return;
        }

        // Proceed to checkout
        alert("Thank you for your order, " + name + "!");
        localStorage.removeItem('selectedItems'); // Clear the cart after checkout
        localStorage.setItem('orderPlaced', 'true'); // Set the flag to indicate order is placed

        // Redirect to checkout page with a delay
        setTimeout(function () {
            location.href = "checkout.html"; // Redirect to checkout.html after 2 seconds
        }, 2000); // Delay of 2 seconds
    });
});

// Select item function (for adding to cart)
function selectItem(name, price, image) {
    const item = { name, price, image };

    let itemList = JSON.parse(localStorage.getItem('selectedItems')) || [];
    itemList.push(item);
    localStorage.setItem('selectedItems', JSON.stringify(itemList));
}

// Render order items and calculate total
function renderOrder() {
    let itemList = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const orderList = document.getElementById('orderList');

    orderList.innerHTML = ""; // Clear the current list
    itemList.forEach((item, index) => {
        let listItem = document.createElement('div');
        listItem.classList.add('order-card');
        listItem.innerHTML = `
            <div class="card">
                <img src="${item.image}" height="150" alt="${item.name}">
                <div class="card-content">
                    <h2>${item.name}</h2>
                    <p>Price: ₱${item.price}</p>
                    <button class="removeButton" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
        orderList.appendChild(listItem);
    });
}

// Remove item function
function removeItem(index) {
    let itemList = JSON.parse(localStorage.getItem('selectedItems')) || [];
    itemList.splice(index, 1); // Remove the item
    localStorage.setItem('selectedItems', JSON.stringify(itemList)); // Update localStorage
    renderOrder(); // Re-render the order
    updateTotal(); // Update total price
}

// Update total price
function updateTotal() {
    let itemList = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const totalAmount = document.getElementById('totalAmount');
    const total = itemList.reduce((sum, item) => sum + parseFloat(item.price), 0);
    totalAmount.textContent = total.toFixed(2);
}

// Function to toggle the sidebar
function show() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('treelines').classList.toggle('activebtn');
}
