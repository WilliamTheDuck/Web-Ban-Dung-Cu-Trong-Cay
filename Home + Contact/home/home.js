(function () {
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const badge = document.getElementById('cartBadge');
        const count = cart.reduce((s, i) => s + i.quantity, 0);
        if (badge) badge.textContent = count;
    }

    function loadFeatured() {
        const container = document.getElementById('featuredProducts');
        if (!container) return;
        container.innerHTML = appData.products.slice(0, 4).map(p => `
            <div class="product-card">
                <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
                <div class="product-info">
                    <div class="product-category">${p.category}</div>
                    <h6 class="product-name">${p.name}</h6>
                    <p class="product-description">${p.description}</p>
                    <p class="product-price">${p.price.toLocaleString('vi-VN')} ₫</p>
                    <div class="product-actions">
                        <a href="../product/product.html" class="btn btn-primary-custom btn-sm w-100">Xem Chi Tiết</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function updateUserMenu() {
        const userMenu = document.getElementById('userMenu');
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            userMenu.innerHTML = '<a class="nav-link" href="#" onclick="localStorage.removeItem(\'currentUser\'); location.reload();">' + user.name + ' (Dang Xuat)</a>';
        } else {
            userMenu.innerHTML = `<a class="nav-link" href="../login/login.html">Đăng Nhập</a>`;
        }
    }

    updateUserMenu();
    updateCartBadge();
    loadFeatured();
})();
