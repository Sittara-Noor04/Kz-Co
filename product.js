// ====== Saari Products ka Data ======
// NOTE: product ke "name" bilkul wahi hon jo shop.html ke data-name mein hain
const products = {
  "roselle-lily": {
    id: "Roselle Lily", name: "Roselle Lily Flower", brand: "KZ & Co",
    price: 1500, oldPrice: 1800, rating: 4.5, reviews: 12,
    colors: [{ name: "Pink", code: "#f4a6c0" }, { name: "White", code: "#f5f5f5" }],
    images: ["images/product1.jpg", "images/product1.2.jpg", "images/product1.3.jpg"],
    desc: "Description: A delicate handmade pink-and-white lily, crafted from soft pipe cleaners with gentle petals and lush green leaves—a charming handcrafted bloom made to last. 🌸"
  },
  "Imperial-Hibiscus": {
    id: "Imperial-Hibiscus", name: "Imperial Hibiscus", brand: "KZ & Co",
    price: 1500, oldPrice: 1700, rating: 4.8, reviews: 8,
    colors: [{ name: "Purple", code: "#9b4a5e" }, { name: "White", code: "#f5f5f5" }],
    images: ["images/product2.jpg", "images/product2.2.jpg", "images/product2.3.jpg"],
    desc: "Elegant single orchid stem crafted delicately to add a graceful touch to any room corner."
  },
  "Daisies": {
    id: "Daisies", name: "Daisies", brand: "KZ & Co",
    price: 4000, oldPrice: 4500, rating: 4.6, reviews: 15,
    colors: [{ name: "White", code: "#efefef" }, { name: "Yellow", code: "#f4d35e" }],
    images: ["images/product3.jpg", "images/product3.2.jpg", "images/product3.3.jpg"],
    desc: "For those who believe simplicity is beautiful! Our handmade pipe-cleaner daisies bring a soft, elegant touch to any vase. 🌷 The perfect little gift for your loved ones, best friends, or anyone who appreciates simple yet meaningful gestures. Because sometimes, the smallest flowers carry the sweetest feelings. 🎀Handcrafted with love by Twisted Petals ✨"
  },
  "Mini Tiger Lily Pot": {
    id: "Mini Tiger Lily Pot", name: "Mini Tiger Lily Pot", brand: "KZ & Co",
    price: 1845, oldPrice: 2500, rating: 4.7, reviews: 10,
    colors: [{ name: "Cream", code: "#f8f3ec" }, { name: "Pink", code: "#f4a6c0" }],
    images: ["images/product4.jpg", "images/product4.2.jpg", "images/product4.3.jpg"],
    desc: "A little pot full of floral charm! ❤️ Our handmade Tiger Lily Pot is carefully crafted with pipe cleaners, featuring beautiful petals that add a unique touch to any space. Perfect for gifting, decorating your room, or adding a little floral magic to your day! 🌷Handcrafted with love by Twisted Petals 🤍"
  },
  "Mini Tulip Pot": {
    id: "Mini Tulip Pot", name: "Mini Tulip Pot", brand: "KZ & Co",
    price: 1845, oldPrice: 2500, rating: 4.7, reviews: 10,
    colors: [{ name: "Cream", code: "#f8f3ec" }, { name: "Pink", code: "#f4a6c0" }],
    images: ["images/product5.jpg", "images/product5.2.jpg", "images/product5.3.jpg"],
    desc: "A charming little tulip pot, carefully handcrafted with pipe cleaners to bring a touch of beauty to any space. A sweet little gift or a lovely addition to your room decor. 💗"
  },
  "Mini Daisy Pot": {
    id: "Mini Daisy Pot", name: "Mini Daisy Pot", brand: "KZ & Co",
    price: 1845, oldPrice: 2500, rating: 4.9, reviews: 20,
    colors: [{ name: "White", code: "#efefef" }, { name: "Yellow", code: "#f4d35e" }],
    images: ["images/product6.jpg", "images/product6.2.jpg", "images/product6.3.jpg"],
    desc: "A cute handmade mini daisy pot, crafted with love using soft pipe cleaners. Perfect for adding a touch of charm to your desk, room, or gifting to someone special. 🤍"
  },
  "The Floral Trinity": {
    id: "The Floral Trinity", name: "The Floral Trinity", brand: "KZ & Co",
    price: 5399, oldPrice: 6000, rating: 4.8, reviews: 15,
    colors: [{ name: "Purple", code: "#9b4a5e" }, { name: "White", code: "#f5f5f5" }],
    images: ["images/product7.jpg", "images/product7.2.jpg", "images/product7.3.jpg"],
    desc: "🌷 The Blooming Trio Bundle Three beautiful handmade pipe-cleaner flower pots featuring delicate tulips, cheerful daisies, and elegant tiger lilies. A charming little bundle made to brighten your space and bring a smile to someone special. 💐Perfect for gifting your best friend, loved ones, or anyone who adores handmade flowers.Handcrafted with love by Twisted Petals ♡"
  },
  "Blush & Pearl Hyacinth": {
    id: "Blush & Pearl Hyacinth", name: "Blush & Pearl Hyacinth", brand: "KZ & Co",
    price: 3500 , oldPrice: 4000, rating: 4.8, reviews: 15,
    colors: [{ name: "Blush", code: "#f4a6c0" }, { name: "Pearl", code: "#f5f5f5" }],
    images: ["images/product8.jpg", "images/product8.2.jpg", "images/product8.3.jpg"],
    desc: "Handcrafted Hyacinthus orientalis flowers made from soft pipe cleaners, featuring delicate pink and white blooms with graceful green stems and leaves. A charming floral décor piece that adds a fresh, elegant touch to any space. 🤍🌸"
  }
};

// URL se product lo (product.html?id=blush-lily)
const urlParams = new URLSearchParams(window.location.search);


const productId = urlParams.get("id") || "Blush & Pearl Hyacinth";
const p = products[productId] || products["Blush & Pearl Hyacinth"];

const $ = (sel) => document.querySelector(sel);
let qty = 1;
let selectedColor = p.colors[0];

// ====== Storage (main.js  SAME keys: kzCart and kzWish) ======
const getCart = () => JSON.parse(localStorage.getItem("kzCart")) || [];
const getWish = () => JSON.parse(localStorage.getItem("kzWish")) || [];

function updateCartCount() {
  const el = $(".cart-count");
  if (el) el.textContent = getCart().length;
}

// ====== Page ki fields bharo ======
document.title = p.name + " | KZ & Co";
$("#crumbName").textContent = p.name;
$("#pName").textContent = p.name;
$("#pBrand").textContent = p.brand;
$("#pPrice").textContent = "Rs. " + p.price.toLocaleString();
$("#pOld").textContent = "Rs. " + p.oldPrice.toLocaleString();
$("#pDiscount").textContent = "-" + Math.round((1 - p.price / p.oldPrice) * 100) + "%";
$("#pRatings").textContent = "Ratings (" + p.reviews + ")";
$("#pDesc").textContent = p.desc;
const full = Math.round(p.rating);
$("#pStars").textContent = "★".repeat(full) + "☆".repeat(5 - full);

// Gallery
const mainImg = $("#mainImg");
const thumbsContainer = $("#thumbs");
mainImg.src = p.images[0];
mainImg.alt = p.name;
p.images.forEach((src, i) => {
  const t = document.createElement("img");
  t.src = src;
  t.alt = "Thumbnail " + (i + 1);
  if (i === 0) t.classList.add("active");
  t.addEventListener("click", () => {
    mainImg.src = src;
    thumbsContainer.querySelectorAll("img").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
  });
  thumbsContainer.appendChild(t);
});

// Colors
const colorContainer = $("#colors");
$("#colorName").textContent = selectedColor.name;
p.colors.forEach((c, i) => {
  const d = document.createElement("div");
  d.className = "color-dot" + (i === 0 ? " active" : "");
  d.style.background = c.code;
  d.title = c.name;
  d.addEventListener("click", () => {
    selectedColor = c;
    $("#colorName").textContent = c.name;
    colorContainer.querySelectorAll(".color-dot").forEach(x => x.classList.remove("active"));
    d.classList.add("active");
  });
  colorContainer.appendChild(d);
});

// Quantity
const qtyInput = $("#qty");
$("#plus").addEventListener("click", () => { qty++; qtyInput.value = qty; });
$("#minus").addEventListener("click", () => { if (qty > 1) { qty--; qtyInput.value = qty; } });

// ====== Add to Cart ======
// cart.html , total = sum(price),
// push the items according to the qty
function addToCart() {
  const cart = getCart();
  for (let i = 0; i < qty; i++) {
    cart.push({ name: p.name + " (" + selectedColor.name + ")", price: p.price });
  }
  localStorage.setItem("kzCart", JSON.stringify(cart));
  updateCartCount();
}

$("#addCart").addEventListener("click", () => {
  addToCart();
  showToast("Added to cart ✓");
});
$("#buyNow").addEventListener("click", () => {
  addToCart();
  window.location.href = "cart.html";
});

// ====== Wishlist ======
const wishBtn = $("#wishBtn");
function updateHeart() {
  const liked = getWish().some(w => w.name === p.name);
  wishBtn.innerHTML = liked ? "&#9829;" : "&#9825;";
  wishBtn.classList.toggle("liked", liked);
}
wishBtn.addEventListener("click", () => {
  let w = getWish();
  if (w.some(x => x.name === p.name)) {
    w = w.filter(x => x.name !== p.name);
    showToast("Removed from wishlist");
  } else {
    w.push({ name: p.name, price: p.price });
    showToast("Added to wishlist ♥");
  }
  localStorage.setItem("kzWish", JSON.stringify(w));
  updateHeart();
});
updateHeart();

// ====== Share ======
$("#shareBtn").addEventListener("click", async () => {
  const url = window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: p.name + " | KZ & Co", url }); } catch (e) {}
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    showToast("Link copied ✓");
  } catch (e) {
    window.prompt("Copy this link:", url);
  }
});

// ====== Tabs ======
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

updateCartCount();