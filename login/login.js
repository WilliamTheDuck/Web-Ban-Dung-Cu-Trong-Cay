(function () {
    function updateBadge() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const badge = document.getElementById('cartBadge');
        if (badge) badge.textContent = cart.reduce((s, i) => s + i.quantity, 0);
    }

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const alertDiv = document.getElementById('alertMessage');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        localStorage.setItem('savedEmail', email);
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) document.getElementById('email').value = savedEmail;
        if (!email.includes('@gmail.com')) {
            alertDiv.innerHTML = "<div class='alert alert-danger'>Chỉ chấp nhận gmail cá nhân.</div>";
            return;
        }

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alertDiv.innerHTML = '<div class="alert alert-success">Đăng nhập thành công! Đang chuyển hướng...</div>';
            setTimeout(() => { window.location.href = '../home/home.html'; }, 2000);
        } else {
            alertDiv.innerHTML = '<div class="alert alert-danger">Email hoặc mật khẩu không chính xác!</div>';
        }
    });

    updateBadge();
})();
