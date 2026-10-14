// ===== Small message (toast) =====
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== Product Slider (sirf index.html pe) =====
const track = document.getElementById('sliderTrack');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

if (track && prevBtn && nextBtn) {
  const scrollAmount = () => {
    const card = track.querySelector('.product-card');
    return card.offsetWidth + 40; // card width + gap
  };
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
}

// ===== Cart count + Add to Cart =====
const cartBadge = document.querySelector('.cart-count');
let cartItems = JSON.parse(localStorage.getItem('kzCart')) || [];

const updateCartBadge = () => {
  if (cartBadge) cartBadge.textContent = cartItems.length;
};
updateCartBadge();

document.querySelectorAll('.add-cart[data-name]').forEach(btn => {
  btn.addEventListener('click', () => {
    cartItems.push({ name: btn.dataset.name, price: btn.dataset.price });
    localStorage.setItem('kzCart', JSON.stringify(cartItems));
    updateCartBadge();
    btn.textContent = 'Added ✓';
    setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1200);
  });
});

// ===== Shop filter =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.shop-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// ===== Navbar icons -> pages =====
const cartIconBtn = document.querySelector('.icon-btn[aria-label="Cart"]');
if (cartIconBtn) {
  cartIconBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
}

const wishIconBtn = document.querySelector('.icon-btn[aria-label="Wishlist"]');
if (wishIconBtn) {
  wishIconBtn.addEventListener('click', () => {
    window.location.href = 'wishlist.html';
  });
}

// ===== Cart page =====
const cartList = document.getElementById('cartList');
if (cartList) {
  const cartTotal = document.getElementById('cartTotal');
  const orderBtn = document.getElementById('cartOrder');

  const renderCart = () => {
    cartList.innerHTML = '';
    if (cartItems.length === 0) {
      cartList.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      cartTotal.textContent = '0';
      orderBtn.style.display = 'none';
      return;
    }
    orderBtn.style.display = 'block';
    let total = 0;
    cartItems.forEach((item, i) => {
      total += Number(item.price);
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `<span>${item.name}</span><span>Rs ${item.price}</span><button class="cart-remove" data-index="${i}" aria-label="Remove">✕</button>`;
      cartList.appendChild(row);
    });
    cartTotal.textContent = total;

    const lines = cartItems.map(it => `- ${it.name} (Rs ${it.price})`).join('\n');
    const text = `Hi KZ & Co, I want to order:\n${lines}\nTotal: Rs ${total}`;
    orderBtn.href = 'https://wa.me/923393959786?text=' + encodeURIComponent(text);
  };

  cartList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-remove')) {
      cartItems.splice(Number(e.target.dataset.index), 1);
      localStorage.setItem('kzCart', JSON.stringify(cartItems));
      updateCartBadge();
      renderCart();
    }
  });

  renderCart();
}

// ===== Wishlist =====
let wishItems = JSON.parse(localStorage.getItem('kzWish')) || [];
const saveWish = () => localStorage.setItem('kzWish', JSON.stringify(wishItems));

// heart buttons on shop cards
document.querySelectorAll('.wish-btn').forEach(btn => {
  const name = btn.dataset.name;
  if (wishItems.some(w => w.name === name)) btn.classList.add('active');

  btn.addEventListener('click', () => {
    const index = wishItems.findIndex(w => w.name === name);
    if (index === -1) {
      wishItems.push({ name: name, price: btn.dataset.price });
      btn.classList.add('active');
      showToast('Added to wishlist ♥');
    } else {
      wishItems.splice(index, 1);
      btn.classList.remove('active');
      showToast('Removed from wishlist');
    }
    saveWish();
  });
});

// wishlist page
const wishList = document.getElementById('wishList');
if (wishList) {
  const renderWish = () => {
    wishList.innerHTML = '';
    if (wishItems.length === 0) {
      wishList.innerHTML = '<p class="cart-empty">Your wishlist is empty.</p>';
      return;
    }
    wishItems.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `<span>${item.name}</span><span>Rs ${item.price}</span><button class="wish-move" data-index="${i}">Add to Cart</button><button class="cart-remove" data-index="${i}" aria-label="Remove">✕</button>`;
      wishList.appendChild(row);
    });
  };

  wishList.addEventListener('click', (e) => {
    const i = Number(e.target.dataset.index);
    if (e.target.classList.contains('cart-remove')) {
      wishItems.splice(i, 1);
      saveWish();
      renderWish();
    }
    if (e.target.classList.contains('wish-move')) {
      cartItems.push(wishItems[i]);
      localStorage.setItem('kzCart', JSON.stringify(cartItems));
      updateCartBadge();
      wishItems.splice(i, 1);
      saveWish();
      renderWish();
    }
  });

  renderWish();
}

// ===== Share a product =====
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const url = location.origin + location.pathname + '#' + btn.dataset.id;

    if (navigator.share) {
      try {
        await navigator.share({
          title: btn.dataset.name + ' | KZ & Co',
          text: 'Check out ' + btn.dataset.name + ' from KZ & Co',
          url: url
        });
      } catch (e) { /* share cancelled */ }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied!');
    } catch (e) {
      window.prompt('Copy this link:', url);
    }
  });
});

// ===== Open shared product link =====
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target && target.classList.contains('shop-card')) {
    target.classList.add('highlight');
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  }
}

// ===== Contact form -> WhatsApp =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    const msg = document.getElementById('cMsg').value.trim();
    const text = `Hi KZ & Co, I'm ${name}. ${msg} (Contact: ${phone})`;
    window.open('https://wa.me/923393959786?text=' + encodeURIComponent(text), '_blank');
  });
}

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.navbar nav');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}