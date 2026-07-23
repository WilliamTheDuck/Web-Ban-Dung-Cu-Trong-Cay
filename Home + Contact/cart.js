function updateCartBadge() {
    var duLieuLuu = localStorage.getItem('cart');
    var gioHang;
    if (duLieuLuu == null) {
        gioHang = [];
    } else {
        gioHang = JSON.parse(duLieuLuu);
    }
    var badge = document.getElementById('cartBadge');
    if (badge != null) {
        var tongSoLuong = 0;
        for (var i = 0; i < gioHang.length; i++) {
            tongSoLuong = tongSoLuong + gioHang[i].quantity;
        }
        badge.textContent = tongSoLuong;
    }
}

function addToCart(product) {
    var duLieuLuu = localStorage.getItem('cart');
    var gioHang;
    if (duLieuLuu == null) {
        gioHang = [];
    } else {
        gioHang = JSON.parse(duLieuLuu);
    }
    var daCoTrongGio = false;
    for (var i = 0; i < gioHang.length; i++) {
        if (gioHang[i].id == product.id) {
            gioHang[i].quantity = gioHang[i].quantity + 1;
            daCoTrongGio = true;
            break;
        }
    }
    if (daCoTrongGio == false) {
        product.quantity = 1;
        gioHang.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(gioHang));

    updateCartBadge();
    alert("Đã thêm " + product.name + " vào giỏ hàng!");
}

document.addEventListener('DOMContentLoaded', updateCartBadge);