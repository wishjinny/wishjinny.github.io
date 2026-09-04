/* =========================================================
   WISH JINNY — APP.JS
   Cart + Search + Filter + Scratch Offer + Coupon
   AI Demo + Voice Search + Modals + Wishlist + UI
   ========================================================= */

"use strict";

/* =========================================================
   1. GLOBAL STATE
   ========================================================= */

const WishJinny = {
    cart: JSON.parse(localStorage.getItem("wishjinny_cart")) || [],
    wishlist: JSON.parse(localStorage.getItem("wishjinny_wishlist")) || [],
    coupon: localStorage.getItem("wishjinny_coupon") || "",
    scratchUsed: localStorage.getItem("wishjinny_scratch_used") === "true"
};


/* =========================================================
   2. SAMPLE PRODUCTS
   ========================================================= */

const products = [
    {
        id: 1,
        name: "Luxury Glow Face Serum",
        brand: "Wish Jinny Beauty",
        category: "skincare",
        price: 499,
        oldPrice: 999,
        discount: 50,
        rating: 4.8,
        reviews: 124,
        emoji: "✨",
        image: "",
        description: "Premium glow serum for a fresh and radiant look."
    },
    {
        id: 2,
        name: "Vitamin C Brightening Cream",
        brand: "Wish Jinny Beauty",
        category: "skincare",
        price: 399,
        oldPrice: 799,
        discount: 50,
        rating: 4.7,
        reviews: 98,
        emoji: "🍊",
        image: "",
        description: "Vitamin C cream designed for a bright-looking complexion."
    },
    {
        id: 3,
        name: "Elegant Gold Necklace",
        brand: "Wish Jinny Jewellery",
        category: "jewellery",
        price: 799,
        oldPrice: 1499,
        discount: 47,
        rating: 4.9,
        reviews: 87,
        emoji: "💎",
        image: "",
        description: "Elegant statement necklace for special occasions."
    },
    {
        id: 4,
        name: "Premium Makeup Kit",
        brand: "Wish Jinny Beauty",
        category: "makeup",
        price: 899,
        oldPrice: 1699,
        discount: 47,
        rating: 4.8,
        reviews: 156,
        emoji: "💄",
        image: "",
        description: "Complete makeup essentials in one premium kit."
    },
    {
        id: 5,
        name: "Rose Lip & Cheek Tint",
        brand: "Wish Jinny Beauty",
        category: "makeup",
        price: 299,
        oldPrice: 599,
        discount: 50,
        rating: 4.6,
        reviews: 76,
        emoji: "🌹",
        image: "",
        description: "Beautiful everyday tint for lips and cheeks."
    },
    {
        id: 6,
        name: "Crystal Fashion Earrings",
        brand: "Wish Jinny Jewellery",
        category: "jewellery",
        price: 349,
        oldPrice: 699,
        discount: 50,
        rating: 4.7,
        reviews: 61,
        emoji: "💍",
        image: "",
        description: "Stylish crystal earrings with a premium finish."
    },
    {
        id: 7,
        name: "Women's Premium Kurti",
        brand: "Wish Jinny Fashion",
        category: "fashion",
        price: 699,
        oldPrice: 1199,
        discount: 42,
        rating: 4.6,
        reviews: 72,
        emoji: "👗",
        image: "",
        description: "Comfortable and stylish premium women's kurti."
    },
    {
        id: 8,
        name: "Smart Home Mini Gadget",
        brand: "Wish Jinny Home",
        category: "home",
        price: 599,
        oldPrice: 999,
        discount: 40,
        rating: 4.5,
        reviews: 45,
        emoji: "🏠",
        image: "",
        description: "Useful smart gadget for your modern home."
    }
];


/* =========================================================
   3. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderProducts(products);
    updateCartUI();
    updateWishlistUI();
    setupSearch();
    setupFilters();
    setupScratchCard();
    setupCoupon();
    setupVoiceSearch();
    setupModals();
    setupAI();
    setupNewsletter();
    setupNavigation();
    setupScrollEffects();
    setupGlobalClicks();

});


/* =========================================================
   4. PRODUCT RENDER
   ========================================================= */

function renderProducts(list) {

    const grids = document.querySelectorAll(".product-grid");

    if (!grids.length) return;

    grids.forEach(grid => {

        grid.innerHTML = "";

        if (!list.length) {

            grid.innerHTML = `
                <div class="empty-state">
                    <div style="font-size:50px;">🔎</div>
                    <h3>No products found</h3>
                    <p>Try another search or category.</p>
                    <button class="small-button" onclick="resetProducts()">
                        View All Products
                    </button>
                </div>
            `;

            return;
        }

        list.forEach(product => {

            const isWishlisted =
                WishJinny.wishlist.includes(product.id);

            const card = document.createElement("article");

            card.className = "product-card";

            card.dataset.category = product.category;
            card.dataset.name = product.name.toLowerCase();

            card.innerHTML = `

                <div class="product-media">

                    <span class="product-label">
                        ${product.discount}% OFF
                    </span>

                    <button
                        class="wishlist-button ${isWishlisted ? "active" : ""}"
                        data-wishlist="${product.id}"
                        aria-label="Add to wishlist"
                    >
                        ${isWishlisted ? "♥️" : "♡"}
                    </button>

                    <div class="product-image-placeholder">
                        ${
                            product.image
                            ? `<img src="${product.image}" alt="${escapeHTML(product.name)}">`
                            : `<span>${product.emoji}</span>`
                        }
                    </div>

                </div>

                <div class="product-info">

                    <div class="brand-name">
                        ${escapeHTML(product.brand)}
                    </div>

                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>

                    <div class="rating">
                        ★ ${product.rating}
                        <span>(${product.reviews})</span>
                    </div>

                    <div class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                        <span class="old-price">
                            ₹${product.oldPrice.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <button
                        class="add-btn"
                        data-add-cart="${product.id}"
                    >
                        🛒 Add to Bag
                    </button>

                    <button
                        class="buy-now-button"
                        data-buy-now="${product.id}"
                    >
                        Buy Now
                    </button>

                </div>
            `;

            grid.appendChild(card);

        });

    });

}


/* =========================================================
   5. ADD TO CART
   ========================================================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) return;

    const existing = WishJinny.cart.find(
        item => item.id === product.id
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        WishJinny.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });

    }

    saveCart();
    updateCartUI();

    showToast("🛒 Product added to your bag!");

}


/* =========================================================
   6. REMOVE CART ITEM
   ========================================================= */

function removeFromCart(productId) {

    WishJinny.cart =
        WishJinny.cart.filter(
            item => item.id !== Number(productId)
        );

    saveCart();
    updateCartUI();

}


/* =========================================================
   7. CHANGE QUANTITY
   ========================================================= */

function changeQuantity(productId, change) {

    const item = WishJinny.cart.find(
        product => product.id === Number(productId)
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(productId);
        return;

    }

    saveCart();
    updateCartUI();

}


/* =========================================================
   8. CART UI
   ========================================================= */

function updateCartUI() {

    const count =
        WishJinny.cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

    const total =
        WishJinny.cart.reduce(
            (sum, item) =>
                sum + (item.price * item.quantity),
            0
        );

    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = count;
    });

    document.querySelectorAll(".cart-total").forEach(el => {
        el.textContent =
            `₹${total.toLocaleString("en-IN")}`;
    });

    const cartContainer =
        document.querySelector("#cartItems");

    if (!cartContainer) return;

    if (!WishJinny.cart.length) {

        cartContainer.innerHTML = `
            <div class="empty-state">
                <div style="font-size:55px;">🛍️</div>
                <h3>Your bag is empty</h3>
                <p>Add something magical from Wish Jinny.</p>
            </div>
        `;

        return;
    }

    cartContainer.innerHTML =
        WishJinny.cart.map(item => `

            <div class="cart-row">

                <div class="cart-product-icon">
                    ${item.emoji}
                </div>

                <div class="cart-product-info">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <span>
                        ₹${item.price.toLocaleString("en-IN")}
                    </span>

                    <div class="qty">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                >
                    ×
                </button>

            </div>

        `).join("");

}


function saveCart() {

    localStorage.setItem(
        "wishjinny_cart",
        JSON.stringify(WishJinny.cart)
    );

}


/* =========================================================
   9. SEARCH
   ========================================================= */

function setupSearch() {

    const searchInput =
        document.querySelector("#searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        if (!query) {

            renderProducts(products);
            return;

        }

        const filtered =
            products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );

        renderProducts(filtered);

    });

}


/* =========================================================
   10. FILTER
   ========================================================= */

function setupFilters() {

    const buttons =
        document.querySelectorAll(".filter-button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter || "all";

            if (filter === "all") {

                renderProducts(products);
                return;

            }

            const filtered =
                products.filter(
                    product =>
                        product.category === filter
                );

            renderProducts(filtered);

        });

    });

}


function resetProducts() {

    renderProducts(products);

    document
        .querySelectorAll(".filter-button")
        .forEach(btn => btn.classList.remove("active"));

}


/* =========================================================
   11. WISHLIST
   ========================================================= */

function toggleWishlist(productId) {

    productId = Number(productId);

    const index =
        WishJinny.wishlist.indexOf(productId);

    if (index === -1) {

        WishJinny.wishlist.push(productId);

        showToast("♥️ Added to wishlist!");

    } else {

        WishJinny.wishlist.splice(index, 1);

        showToast("Removed from wishlist");

    }

    localStorage.setItem(
        "wishjinny_wishlist",
        JSON.stringify(WishJinny.wishlist)
    );

    updateWishlistUI();

    renderProducts(products);

}


function updateWishlistUI() {

    document.querySelectorAll("[data-wishlist]").forEach(button => {

        const id =
            Number(button.dataset.wishlist);

        const active =
            WishJinny.wishlist.includes(id);

        button.classList.toggle("active", active);
        button.textContent = active ? "♥️" : "♡";

    });

}


/* =========================================================
   12. SCRATCH JINNY MAGIC OFFER
   ========================================================= */

function setupScratchCard() {

    const canvas =
        document.querySelector("#scratchCanvas");

    const card =
        document.querySelector(".scratch-card");

    const hiddenOffer =
        document.querySelector(".hidden-offer");

    if (!canvas || !card) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        const rect = card.getBoundingClientRect();

        canvas.width =
            Math.max(280, Math.floor(rect.width));

        canvas.height = 180;

        drawCover();

    }

    function drawCover() {

        ctx.globalCompositeOperation = "source-over";

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                canvas.width,
                canvas.height
            );

        gradient.addColorStop(0, "#c5a059");
        gradient.addColorStop(0.5, "#f6d77a");
        gradient.addColorStop(1, "#9d7735");

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "✨ SCRATCH ME ✨",
            canvas.width / 2,
            75
        );

        ctx.font = "15px Arial";

        ctx.fillText(
            "Jinny has a surprise for you!",
            canvas.width / 2,
            110
        );

    }

    let scratching = false;
    let scratchedPixels = 0;

    function scratch(e) {

        if (!scratching) return;

        const rect =
            canvas.getBoundingClientRect();

        const clientX =
            e.touches
                ? e.touches[0].clientX
                : e.clientX;

        const clientY =
            e.touches
                ? e.touches[0].clientY
                : e.clientY;

        const x =
            (clientX - rect.left)
            * (canvas.width / rect.width);

        const y =
            (clientY - rect.top)
            * (canvas.height / rect.height);

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            22,
            0,
            Math.PI * 2
        );

        ctx.fill();

        scratchedPixels++;

        if (scratchedPixels > 45) {

            revealOffer();

        }

    }

    function startScratch(e) {

        scratching = true;
        scratch(e);

    }

    function stopScratch() {

        scratching = false;

    }

    canvas.addEventListener(
        "mousedown",
        startScratch
    );

    canvas.addEventListener(
        "mousemove",
        scratch
    );

    canvas.addEventListener(
        "mouseup",
        stopScratch
    );

    canvas.addEventListener(
        "mouseleave",
        stopScratch
    );

    canvas.addEventListener(
        "touchstart",
        startScratch,
        { passive: true }
    );

    canvas.addEventListener(
        "touchmove",
        scratch,
        { passive: true }
    );

    canvas.addEventListener(
        "touchend",
        stopScratch
    );

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    if (WishJinny.scratchUsed) {

        revealOffer();

    }

}


function revealOffer() {

    const canvas =
        document.querySelector("#scratchCanvas");

    const hiddenOffer =
        document.querySelector(".hidden-offer");

    const message =
        document.querySelector(".scratch-message");

    if (canvas) {

        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";

    }

    if (hiddenOffer) {

        hiddenOffer.classList.add("revealed");

        hiddenOffer.innerHTML = `
            <div class="offer-reveal">
                🎉
                <strong>YOU WON!</strong>
                <span>Extra 20% OFF</span>
                <b>Use Code: JINNY20</b>
                <button
                    class="small-button"
                    onclick="copyCoupon('JINNY20')"
                >
                    Copy Coupon
                </button>
            </div>
        `;

    }

    if (message) {

        message.textContent =
            "🎉 Your Jinny magic offer has been unlocked!";

    }

    WishJinny.scratchUsed = true;

    localStorage.setItem(
        "wishjinny_scratch_used",
        "true"
    );

}


/* =========================================================
   13. COUPON SYSTEM
   ========================================================= */

function setupCoupon() {

    const button =
        document.querySelector("#applyCoupon");

    const input =
        document.querySelector("#couponInput");

    if (!button || !input) return;

    button.addEventListener("click", () => {

        applyCoupon(input.value);

    });

}


function applyCoupon(code) {

    code =
        String(code)
            .trim()
            .toUpperCase();

    const validCoupons = {

        "JINNY20": 20,
        "WELCOME10": 10,
        "MAGIC15": 15

    };

    if (!validCoupons[code]) {

        showToast("❌ Invalid coupon code");

        return;

    }

    WishJinny.coupon = code;

    localStorage.setItem(
        "wishjinny_coupon",
        code
    );

    showToast(
        `🎉 ${validCoupons[code]}% discount applied!`
    );

    updateCheckoutTotal();

}


function copyCoupon(code) {

    if (navigator.clipboard) {

        navigator.clipboard.writeText(code);

    }

    const input =
        document.querySelector("#couponInput");

    if (input) {

        input.value = code;

    }

    showToast("🎁 Coupon copied: " + code);

}


function getCouponDiscount() {

    const coupons = {

        "JINNY20": 20,
        "WELCOME10": 10,
        "MAGIC15": 15

    };

    return coupons[WishJinny.coupon] || 0;

}


function updateCheckoutTotal() {

    const subtotal =
        WishJinny.cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    const discountPercent =
        getCouponDiscount();

    const discount =
        Math.round(
            subtotal * discountPercent / 100
        );

    const finalTotal =
        subtotal - discount;

    const subtotalEl =
        document.querySelector("#checkoutSubtotal");

    const discountEl =
        document.querySelector("#checkoutDiscount");

    const totalEl =
        document.querySelector("#checkoutTotal");

    if (subtotalEl)
        subtotalEl.textContent =
            `₹${subtotal.toLocaleString("en-IN")}`;

    if (discountEl)
        discountEl.textContent =
            `−₹${discount.toLocaleString("en-IN")}`;

    if (totalEl)
        totalEl.textContent =
            `₹${finalTotal.toLocaleString("en-IN")}`;

}


/* =========================================================
   14. VOICE SEARCH
   ========================================================= */

function setupVoiceSearch() {

    const button =
        document.querySelector(".voice-search");

    const input =
        document.querySelector("#searchInput");

    if (!button || !input) return;

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        button.addEventListener("click", () => {

            showToast(
                "🎙️ Voice search is not supported in this browser."
            );

        });

        return;

    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;

    button.addEventListener("click", () => {

        try {

            recognition.start();

            showToast("🎙️ Listening...");

        } catch (error) {

            console.log(error);

        }

    });

    recognition.addEventListener(
        "result",
        event => {

            const text =
                event.results[0][0].transcript;

            input.value = text;

            input.dispatchEvent(
                new Event("input")
            );

        }
    );

}


/* =========================================================
   15. MODALS
   ========================================================= */

function setupModals() {

    document.addEventListener("click", event => {

        const openButton =
            event.target.closest("[data-modal]");

        if (openButton) {

            const modalId =
                openButton.dataset.modal;

            openModal(modalId);

        }

        const closeButton =
            event.target.closest(".close-modal");

        if (closeButton) {

            const modal =
                closeButton.closest(".modal");

            if (modal) {

                closeModal(modal.id);

            }

        }

    });

    document.querySelectorAll(".modal").forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                closeModal(modal.id);

            }

        });

    });

}


function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("active");
    modal.style.display = "flex";

    document.body.classList.add("modal-open");

    if (id === "cartModal") {

        updateCartUI();
        updateCheckoutTotal();

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");
    modal.style.display = "none";

    document.body.classList.remove("modal-open");

}


/* =========================================================
   16. BUY NOW
   ========================================================= */

function buyNow(productId) {

    const product =
        products.find(
            item => item.id === Number(productId)
        );

    if (!product) return;

    addToCart(product.id);

    setTimeout(() => {

        openModal("checkoutModal");

        updateCheckoutTotal();

    }, 250);

}


/* =========================================================
   17. CHECKOUT
   ========================================================= */

function checkout() {

    if (!WishJinny.cart.length) {

        showToast(
            "🛍️ Please add a product first."
        );

        return;

    }

    openModal("checkoutModal");

    updateCheckoutTotal();

}


/* =========================================================
   18. PAYMENT DEMO
   ========================================================= */

function processPayment() {

    if (!WishJinny.cart.length) {

        showToast("Your bag is empty.");

        return;

    }

    /*
       IMPORTANT:
       This is a FRONT-END DEMO.

       Real Razorpay/PayPal payment requires:
       - Backend server
       - API keys
       - Order creation
       - Payment verification
    */

    showToast(
        "💳 Payment gateway demo opened."
    );

    setTimeout(() => {

        showToast(
            "✅ Demo order created successfully!"
        );

        WishJinny.cart = [];

        saveCart();
        updateCartUI();

        closeModal("checkoutModal");
        closeModal("cartModal");

    }, 1200);

}


/* =========================================================
   19. AI ASSISTANT
   ========================================================= */

function setupAI() {

    const input =
        document.querySelector("#aiInput");

    const send =
        document.querySelector("#aiSend");

    if (!input || !send) return;

    send.addEventListener(
        "click",
        () => sendAIMessage()
    );

    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendAIMessage();

            }

        }
    );

}


function sendAIMessage() {

    const input =
        document.querySelector("#aiInput");

    const chat =
        document.querySelector("#aiChat");

    if (!input || !chat) return;

    const message =
        input.value.trim();

    if (!message) return;

    addAIMessage(
        message,
        "user"
    );

    input.value = "";

    setTimeout(() => {

        const response =
            getAIResponse(message);

        addAIMessage(
            response,
            "bot"
        );

    }, 600);

}


function addAIMessage(message, type) {

    const chat =
        document.querySelector("#aiChat");

    if (!chat) return;

    const div =
        document.createElement("div");

    div.className =
        `ai-message ${type}`;

    div.textContent = message;

    chat.appendChild(div);

    chat.scrollTop =
        chat.scrollHeight;

}


function getAIResponse(message) {

    const text =
        message.toLowerCase();

    if (
        text.includes("skin") ||
        text.includes("serum") ||
        text.includes("cream")
    ) {

        return "✨ For skincare, I recommend our Vitamin C Cream and Luxury Glow Face Serum. You can find them in the Skincare collection.";

    }

    if (
        text.includes("makeup") ||
        text.includes("lipstick")
    ) {

        return "💄 Check out our Makeup collection for premium makeup essentials and lip products.";

    }

    if (
        text.includes("jewellery") ||
        text.includes("jewelry") ||
        text.includes("necklace")
    ) {

        return "💎 Our Jewellery collection has elegant necklaces and crystal accessories.";

    }

    if (
        text.includes("discount") ||
        text.includes("offer") ||
        text.includes("coupon")
    ) {

        return "🎁 Scratch the Jinny Magic card to unlock a surprise offer. You can also try coupon code JINNY20.";

    }

    if (
        text.includes("delivery") ||
        text.includes("shipping")
    ) {

        return "🚚 Shipping availability and delivery time will be shown during checkout based on your location.";

    }

    if (
        text.includes("cart") ||
        text.includes("bag")
    ) {

        return "🛒 You can add products to your bag and manage quantity directly from the cart.";

    }

    return "✨ I'm Jinny AI! Tell me what you're looking for—skincare, makeup, jewellery, fashion, offers or shopping help.";


}


/* =========================================================
   20. NEWSLETTER
   ========================================================= */

function setupNewsletter() {

    const form =
        document.querySelector(".newsletter-form");

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                form.querySelector(
                    'input[type="email"]'
                );

            if (!email || !email.value) {

                showToast(
                    "Please enter your email."
                );

                return;

            }

            showToast(
                "🎉 Welcome to Wish Jinny!"
            );

            email.value = "";

        }
    );

}


/* =========================================================
   21. NAVIGATION
   ========================================================= */

function setupNavigation() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) return;

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   22. SCROLL EFFECTS
   ========================================================= */

function setupScrollEffects() {

    const header =
        document.querySelector(".site-header");

    if (!header) return;

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        },
        { passive: true }
    );

}


/* =========================================================
   23. GLOBAL CLICK HANDLER
   ========================================================= */

function setupGlobalClicks() {

    document.addEventListener(
        "click",
        event => {

            const addButton =
                event.target.closest(
                    "[data-add-cart]"
                );

            if (addButton) {

                addToCart(
                    addButton.dataset.addCart
                );

            }

            const buyButton =
                event.target.closest(
                    "[data-buy-now]"
                );

            if (buyButton) {

                buyNow(
                    buyButton.dataset.buyNow
                );

            }

            const wishlistButton =
                event.target.closest(
                    "[data-wishlist]"
                );

            if (wishlistButton) {

                toggleWishlist(
                    wishlistButton.dataset.wishlist
                );

            }

            const cartButton =
                event.target.closest(
                    ".cart-action"
                );

            if (
                cartButton &&
                !cartButton.hasAttribute("data-modal")
            ) {

                openModal("cartModal");

            }

        }
    );

}


/* =========================================================
   24. TOAST
   ========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(".toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.wishJinnyToastTimer
    );

    window.wishJinnyToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2600);

}


/* =========================================================
   25. HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   26. CLEAR CART
   ========================================================= */

function clearCart() {

    if (!WishJinny.cart.length) {

        showToast("Your bag is already empty.");

        return;

    }

    WishJinny.cart = [];

    saveCart();
    updateCartUI();

    showToast("🛍️ Bag cleared.");

}


/* =========================================================
   27. OPEN CART
   ========================================================= */

function openCart() {

    openModal("cartModal");

    updateCartUI();

    updateCheckoutTotal();

}


/* =========================================================
   28. MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    const nav =
        document.querySelector(".main-navigation");

    if (!nav) return;

    nav.classList.toggle("mobile-open");

}


/* =========================================================
   29. BACK TO TOP
   ========================================================= */

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   30. EXPOSE FUNCTIONS
   ========================================================= */

window.WishJinny = WishJinny;

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.toggleWishlist = toggleWishlist;
window.buyNow = buyNow;
window.checkout = checkout;
window.processPayment = processPayment;
window.applyCoupon = applyCoupon;
window.copyCoupon = copyCoupon;
window.openModal = openModal;
window.closeModal = closeModal;
window.openCart = openCart;
window.clearCart = clearCart;
window.resetProducts = resetProducts;
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToTop = scrollToTop;
window.showToast = showToast;
window.revealOffer = revealOffer;


/* =========================================================
   WISH JINNY APP READY
   ========================================================= */

console.log(
    "✨ Wish Jinny — App loaded successfully!"
);
