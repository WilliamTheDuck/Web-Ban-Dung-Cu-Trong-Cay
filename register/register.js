// IIFE (Immediately Invoked Function Expression) - prevents polluting the global scope
(function () {
    // Updates the cart badge in the header with the total item count from localStorage
    function updateBadge() {
        // Retrieve the cart array from localStorage, defaulting to an empty array if null
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Find the badge element in the DOM by its ID
        const badge = document.getElementById('cartBadge');
        // If the badge element exists, set its text to the sum of all item quantities
        if (badge) badge.textContent = cart.reduce((s, i) => s + i.quantity, 0);
    }

    // Attach a submit event listener to the registration form
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        // Prevent the default form submission (page reload)
        e.preventDefault();

        // Read the value from each input field in the form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        // Reference to the div that will display alert messages
        const alertDiv = document.getElementById('alertMessage');

        // Check if password and confirm password fields match
        if (password !== confirmPassword) {
            // Display a danger alert if passwords don't match
            alertDiv.innerHTML = '<div class="alert alert-danger">Mật khẩu xác nhận không khớp!</div>';
            // Stop further execution of this function
            return;
        }

        // Check if password is at least 8 characters long
        if (password.length < 8) {
            // Display a danger alert if password is too short
            alertDiv.innerHTML = "<div class='alert alert-danger'>Mật khẩu phải chứa ít nhất 8 ký tự</div>"
        }

        // Retrieve the existing users array from localStorage, defaulting to empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Check if a user with the same email already exists in the array
        if (users.some(u => u.email === email)) {
            // Display a danger alert if email is already registered
            alertDiv.innerHTML = '<div class="alert alert-danger">Email này đã được đăng ký!</div>';
            // Stop further execution
            return;
        }

        // Create a new user object with a unique ID (timestamp) and all form data
        const newUser = { id: Date.now(), name, email, phone, address, password, createdAt: new Date().toLocaleString('vi-VN') };
        // Add the new user to the users array
        users.push(newUser);
        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        // Store the new user as the currently logged-in user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Display a success alert message
        alertDiv.innerHTML = '<div class="alert alert-success">Đăng ký thành công! Đang chuyển hướng...</div>';
        // After 2 seconds, redirect the browser to the home page
        setTimeout(() => { window.location.href = '../home/home.html'; }, 2000);
    });

    // Call updateBadge once when the script loads to show the current cart count
    updateBadge();
})();
