document.addEventListener('DOMContentLoaded', function () {
    // Search suggestions show/hide
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');

    if (searchInput && suggestions) {
        searchInput.addEventListener('focus', () => {
            suggestions.style.display = 'flex';
        });

        searchInput.addEventListener('blur', () => {
            // Delay hiding to allow click on suggestions
            setTimeout(() => {
                if (!suggestions.matches(':hover') && !searchInput.matches(':focus')) {
                    suggestions.style.display = 'none';
                }
            }, 150);
        });

        // Clicking on suggestion fills input
        suggestions.querySelectorAll('span').forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                suggestions.style.display = 'none';
                searchInput.focus();
            });
            tag.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tag.click();
                }
            });
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.style.display = 'none';
            }
        });
    }

    // Mega menu show/hide logic - Desktop only
    const categoryNav = document.querySelector('.category-nav');
    const megaMenus = document.querySelectorAll('.mega-menu');
    const megaMenuContainer = document.getElementById('mega-menu-container');

    if (categoryNav && megaMenuContainer) {
        let activeCategory = null;
        let hideTimeout;

        function hideAllMegaMenus() {
            megaMenus.forEach(menu => {
                menu.style.display = 'none';
                menu.setAttribute('aria-hidden', 'true');
            });
            megaMenuContainer.setAttribute('aria-hidden', 'true');
            activeCategory = null;
        }

        function showMegaMenu(category) {
            clearTimeout(hideTimeout);
            megaMenus.forEach(menu => {
                if (menu.getAttribute('data-category') === category) {
                    menu.style.display = 'flex';
                    menu.setAttribute('aria-hidden', 'false');
                    megaMenuContainer.setAttribute('aria-hidden', 'false');
                    activeCategory = category;
                } else {
                    menu.style.display = 'none';
                    menu.setAttribute('aria-hidden', 'true');
                }
            });
        }

        categoryNav.querySelectorAll('a').forEach(link => {
            const cat = link.getAttribute('data-category');
            if (!cat) return;

            link.addEventListener('mouseenter', () => {
                if (window.innerWidth > 767) { // Desktop only
                    showMegaMenu(cat);
                }
            });

            link.addEventListener('focus', () => {
                showMegaMenu(cat);
            });

            link.addEventListener('mouseleave', () => {
                if (window.innerWidth > 767) { // Desktop only
                    hideTimeout = setTimeout(() => {
                        if (!megaMenuContainer.matches(':hover')) {
                            hideAllMegaMenus();
                        }
                    }, 200);
                }
            });
        });

        megaMenus.forEach(menu => {
            menu.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                activeCategory = menu.getAttribute('data-category');
            });

            menu.addEventListener('mouseleave', () => {
                if (window.innerWidth > 767) { // Desktop only
                    hideTimeout = setTimeout(hideAllMegaMenus, 200);
                }
            });
        });

        // Hide mega menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!categoryNav.contains(e.target) && !megaMenuContainer.contains(e.target)) {
                hideAllMegaMenus();
            }
        });
    }

    // Profile dropdown
    const profile = document.querySelector('.profile');
    if (profile) {
        const profileDropdown = profile.querySelector('.profile-dropdown');

        profile.addEventListener('mouseenter', () => {
            if (window.innerWidth > 767) { // Desktop only
                profileDropdown.style.display = 'flex';
                profileDropdown.style.opacity = '1';
                profileDropdown.style.pointerEvents = 'auto';
                profile.setAttribute('aria-expanded', 'true');
            }
        });

        profile.addEventListener('mouseleave', () => {
            if (window.innerWidth > 767) { // Desktop only
                profileDropdown.style.opacity = '0';
                profileDropdown.style.pointerEvents = 'none';
                setTimeout(() => {
                    if (profileDropdown.style.opacity === '0') {
                        profileDropdown.style.display = 'none';
                    }
                }, 300);
                profile.setAttribute('aria-expanded', 'false');
            }
        });

        profile.addEventListener('focusin', () => {
            profileDropdown.style.display = 'flex';
            profileDropdown.style.opacity = '1';
            profileDropdown.style.pointerEvents = 'auto';
            profile.setAttribute('aria-expanded', 'true');
        });

        profile.addEventListener('focusout', (e) => {
            if (!profile.contains(e.relatedTarget)) {
                profileDropdown.style.opacity = '0';
                profileDropdown.style.pointerEvents = 'none';
                setTimeout(() => {
                    if (profileDropdown.style.opacity === '0') {
                        profileDropdown.style.display = 'none';
                    }
                }, 300);
                profile.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Dropdown Become a Supplier
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 767) { // Desktop only
                dropdownContent.style.display = 'flex';
                dropdown.setAttribute('aria-expanded', 'true');
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 767) { // Desktop only
                dropdownContent.style.display = 'none';
                dropdown.setAttribute('aria-expanded', 'false');
            }
        });

        dropdown.addEventListener('focusin', () => {
            dropdownContent.style.display = 'flex';
            dropdown.setAttribute('aria-expanded', 'true');
        });

        dropdown.addEventListener('focusout', (e) => {
            if (!dropdown.contains(e.relatedTarget)) {
                dropdownContent.style.display = 'none';
                dropdown.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        const barsIcon = mobileMenu.querySelector('.fa-bars');
        const timesIcon = mobileMenu.querySelector('.fa-times');
        const mobileNav = document.querySelector('.mobile-nav');

        mobileMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                if (barsIcon) barsIcon.style.display = 'none';
                if (timesIcon) timesIcon.style.display = 'block';
                if (mobileNav) mobileNav.style.display = 'block';
                document.body.style.overflow = 'hidden';
                this.setAttribute('aria-expanded', 'true');
            } else {
                if (barsIcon) barsIcon.style.display = 'block';
                if (timesIcon) timesIcon.style.display = 'none';
                if (mobileNav) mobileNav.style.display = 'none';
                document.body.style.overflow = '';
                this.setAttribute('aria-expanded', 'false');
            }
        });

        // Category menu toggle for mobile
        if (mobileNav) {
            const categoryLinks = mobileNav.querySelectorAll('.category-nav a');

            categoryLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close all other open mega menus
                    categoryLinks.forEach(item => {
                        if (item !== this) {
                            item.classList.remove('active');
                            const otherMenu = document.querySelector(`.mobile-nav .mega-menu[data-category="${item.dataset.category}"]`);
                            if (otherMenu) otherMenu.classList.remove('active');
                        }
                    });

                    // Toggle current
                    this.classList.toggle('active');
                    const megaMenu = document.querySelector(`.mobile-nav .mega-menu[data-category="${this.dataset.category}"]`);
                    if (megaMenu) {
                        megaMenu.classList.toggle('active');
                    }
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenu.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenu.classList.remove('active');
                if (barsIcon) barsIcon.style.display = 'block';
                if (timesIcon) timesIcon.style.display = 'none';
                if (mobileNav) mobileNav.style.display = 'none';
                document.body.style.overflow = '';
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ================= Product Section =================

// Sample product data with 100 products using local images with the specified naming convention
const products = [
    // Fashion Category (25 products)
    { id: 1, title: "Women's Floral Printed Dress", price: 399, offer: "349 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "fashion", image: "/images/products/fashion/f1.webp" },
    { id: 2, title: "Men's Casual T-Shirt Pack", price: 599, offer: "499 with 1 special offer", delivery: "Free delivery", rating: 3.8, category: "fashion", image: "/images/products/fashion/f2.webp" },
    { id: 3, title: "Women's Running Shoes", price: 1299, offer: "1099 with bank offer", delivery: "Free delivery", rating: 4.4, category: "fashion", image: "/images/products/fashion/f3.webp" },
    { id: 4, title: "Men's Formal Shirt", price: 699, offer: "599 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "fashion", image: "/images/products/fashion/f4.webp" },
    { id: 5, title: "Women's Handbag", price: 899, offer: "749 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "fashion", image: "/images/products/fashion/f5.webp" },
    { id: 6, title: "Men's Sports Watch", price: 1599, offer: "1399 with coupon", delivery: "Free delivery", rating: 4.0, category: "fashion", image: "/images/products/fashion/f6.webp" },
    { id: 7, title: "Women's Sandals", price: 499, offer: "399 with coupon", delivery: "Free delivery", rating: 3.9, category: "fashion", image: "/images/products/fashion/f7.webp" },
    { id: 8, title: "Laptop Backpack", price: 799, offer: "699 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "fashion", image: "/images/products/fashion/f8.webp" },
    { id: 9, title: "Men's Jeans", price: 899, offer: "749 with coupon", delivery: "Free delivery", rating: 4.1, category: "fashion", image: "/images/products/fashion/f9.webp" },
    { id: 10, title: "Women's Kurti", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "fashion", image: "/images/products/fashion/f10.webp" },
    { id: 11, title: "Men's Polo T-Shirts Pack", price: 799, offer: "699 with coupon", delivery: "Free delivery", rating: 4.2, category: "fashion", image: "/images/products/fashion/f11.webp" },
    { id: 12, title: "Women's Leggings", price: 299, offer: "249 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "fashion", image: "/images/products/fashion/f12.webp" },
    { id: 13, title: "Men's Casual Shoes", price: 999, offer: "849 with bank offer", delivery: "Free delivery", rating: 4.1, category: "fashion", image: "/images/products/fashion/f13.webp" },
    { id: 14, title: "Women's Earrings Set", price: 199, offer: "149 with coupon", delivery: "Free delivery", rating: 3.8, category: "fashion", image: "/images/products/fashion/f14.webp" },
    { id: 15, title: "Men's Wallet", price: 349, offer: "299 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "fashion", image: "/images/products/fashion/f15.webp" },
    { id: 16, title: "Women's Saree", price: 799, offer: "699 with coupon", delivery: "Free delivery", rating: 4.2, category: "fashion", image: "/images/products/fashion/f16.webp" },
    { id: 17, title: "Men's Track Pants", price: 599, offer: "499 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "fashion", image: "/images/products/fashion/f17.webp" },
    { id: 18, title: "Women's Clutch Purse", price: 599, offer: "499 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "fashion", image: "/images/products/fashion/f18.webp" },
    { id: 19, title: "Men's Formal Shoes", price: 1299, offer: "1099 with bank offer", delivery: "Free delivery", rating: 4.0, category: "fashion", image: "/images/products/fashion/f19.webp" },
    { id: 20, title: "Women's Nightdress", price: 349, offer: "299 with coupon", delivery: "Free delivery", rating: 3.8, category: "fashion", image: "/images/products/fashion/f20.webp" },
    { id: 21, title: "Men's Belt", price: 249, offer: "199 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "fashion", image: "/images/products/fashion/f21.webp" },
    { id: 22, title: "Women's Top", price: 299, offer: "249 with coupon", delivery: "Free delivery", rating: 4.0, category: "fashion", image: "/images/products/fashion/f22.webp" },
    { id: 23, title: "Men's Sunglasses", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "fashion", image: "/images/products/fashion/f23.webp" },
    { id: 24, title: "Women's Jumpsuit", price: 699, offer: "599 with coupon", delivery: "Free delivery", rating: 3.9, category: "fashion", image: "/images/products/fashion/f24.webp" },
    { id: 25, title: "Men's Jacket", price: 1199, offer: "999 with bank offer", delivery: "Free delivery", rating: 4.2, category: "fashion", image: "/images/products/fashion/f25.webp" },

    // Electronics Category (25 products)
    { id: 26, title: "Wireless Bluetooth Headphones", price: 1299, offer: "999 with 2 special offers", delivery: "Free delivery", rating: 4.5, category: "electronics", image: "/images/products/electronics/e1.webp" },
    { id: 27, title: "Smartphone with 48MP Camera", price: 8999, offer: "7999 with exchange", delivery: "Free delivery", rating: 4.3, category: "electronics", image: "/images/products/electronics/e2.webp" },
    { id: 28, title: "Wireless Mouse", price: 349, offer: "299 with coupon", delivery: "Free delivery", rating: 4.2, category: "electronics", image: "/images/products/electronics/e3.webp" },
    { id: 29, title: "Bluetooth Speaker", price: 1299, offer: "999 with 2 special offers", delivery: "Free delivery", rating: 4.2, category: "electronics", image: "/images/products/electronics/e4.webp" },
    { id: 30, title: "Smart Watch", price: 1999, offer: "1699 with bank offer", delivery: "Free delivery", rating: 4.1, category: "electronics", image: "/images/products/electronics/e5.webp" },
    { id: 31, title: "Power Bank 10000mAh", price: 799, offer: "699 with coupon", delivery: "Free delivery", rating: 4.0, category: "electronics", image: "/images/products/electronics/e6.webp" },
    { id: 32, title: "Earphones with Mic", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "electronics", image: "/images/products/electronics/e7.webp" },
    { id: 33, title: "Tablet 10 inch", price: 8999, offer: "7999 with exchange", delivery: "Free delivery", rating: 4.2, category: "electronics", image: "/images/products/electronics/e8.webp" },
    { id: 34, title: "USB Flash Drive 64GB", price: 599, offer: "499 with coupon", delivery: "Free delivery", rating: 4.1, category: "electronics", image: "/images/products/electronics/e9.webp" },
    { id: 35, title: "Wireless Keyboard", price: 899, offer: "749 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "electronics", image: "/images/products/electronics/e10.webp" },
    { id: 36, title: "HD Webcam", price: 1299, offer: "1099 with bank offer", delivery: "Free delivery", rating: 4.3, category: "electronics", image: "/images/products/electronics/e11.webp" },
    { id: 37, title: "Portable SSD 500GB", price: 3999, offer: "3499 with coupon", delivery: "Free delivery", rating: 4.4, category: "electronics", image: "/images/products/electronics/e12.webp" },
    { id: 38, title: "Bluetooth Earbuds", price: 1499, offer: "1299 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "electronics", image: "/images/products/electronics/e13.webp" },
    { id: 39, title: "Laptop Cooling Pad", price: 699, offer: "599 with coupon", delivery: "Free delivery", rating: 3.9, category: "electronics", image: "/images/products/electronics/e14.webp" },
    { id: 40, title: "Smart Bulb", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "electronics", image: "/images/products/electronics/e15.webp" },
    { id: 41, title: "Fitness Tracker", price: 1599, offer: "1399 with bank offer", delivery: "Free delivery", rating: 4.2, category: "electronics", image: "/images/products/electronics/e16.webp" },
    { id: 42, title: "External DVD Writer", price: 1199, offer: "999 with coupon", delivery: "Free delivery", rating: 3.8, category: "electronics", image: "/images/products/electronics/e17.webp" },
    { id: 43, title: "Wireless Charger", price: 799, offer: "699 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "electronics", image: "/images/products/electronics/e18.webp" },
    { id: 44, title: "HDMI Cable", price: 249, offer: "199 with coupon", delivery: "Free delivery", rating: 3.9, category: "electronics", image: "/images/products/electronics/e19.webp" },
    { id: 45, title: "Gaming Mouse", price: 999, offer: "849 with bank offer", delivery: "Free delivery", rating: 4.3, category: "electronics", image: "/images/products/electronics/e20.webp" },
    { id: 46, title: "Mechanical Keyboard", price: 2499, offer: "2199 with coupon", delivery: "Free delivery", rating: 4.5, category: "electronics", image: "/images/products/electronics/e21.webp" },
    { id: 47, title: "Curved Gaming Monitor", price: 12999, offer: "11499 with bank offer", delivery: "Free delivery", rating: 4.6, category: "electronics", image: "/images/products/electronics/e22.webp" },
    { id: 48, title: "Wireless Router", price: 1499, offer: "1299 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "electronics", image: "/images/products/electronics/e23.webp" },
    { id: 49, title: "Noise Cancelling Headphones", price: 2999, offer: "2499 with coupon", delivery: "Free delivery", rating: 4.4, category: "electronics", image: "/images/products/electronics/e24.webp" },
    { id: 50, title: "Digital Camera", price: 24999, offer: "21999 with exchange", delivery: "Free delivery", rating: 4.5, category: "electronics", image: "/images/products/electronics/e25.webp" },

    // Home & Kitchen Category (25 products)
    { id: 51, title: "Non-Stick Cookware Set", price: 1499, offer: "1299 with coupon", delivery: "Free delivery", rating: 4.3, category: "home", image: "/images/products/home/h1.webp" },
    { id: 52, title: "Automatic Coffee Maker", price: 2999, offer: "2499 with bank offer", delivery: "Free delivery", rating: 4.4, category: "home", image: "/images/products/home/h2.webp" },
    { id: 53, title: "Microwave Oven 20L", price: 5999, offer: "4999 with exchange", delivery: "Free delivery", rating: 4.2, category: "home", image: "/images/products/home/h3.webp" },
    { id: 54, title: "Electric Kettle", price: 799, offer: "699 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "home", image: "/images/products/home/h4.webp" },
    { id: 55, title: "Bedsheet Set King Size", price: 999, offer: "849 with coupon", delivery: "Free delivery", rating: 4.0, category: "home", image: "/images/products/home/h5.webp" },
    { id: 56, title: "Stainless Steel Water Bottle", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "home", image: "/images/products/home/h6.webp" },
    { id: 57, title: "Cushion Covers Set of 5", price: 599, offer: "499 with coupon", delivery: "Free delivery", rating: 3.9, category: "home", image: "/images/products/home/h7.webp" },
    { id: 58, title: "Food Storage Containers", price: 699, offer: "599 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "home", image: "/images/products/home/h8.webp" },
    { id: 59, title: "Hand Blender", price: 1299, offer: "1099 with bank offer", delivery: "Free delivery", rating: 4.3, category: "home", image: "/images/products/home/h9.webp" },
    { id: 60, title: "Kitchen Knife Set", price: 899, offer: "749 with coupon", delivery: "Free delivery", rating: 4.1, category: "home", image: "/images/products/home/h10.webp" },
    { id: 61, title: "Bathroom Shower Head", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "home", image: "/images/products/home/h11.webp" },
    { id: 62, title: "Towel Set of 4", price: 799, offer: "699 with coupon", delivery: "Free delivery", rating: 3.9, category: "home", image: "/images/products/home/h12.webp" },
    { id: 63, title: "Air Fryer 4L", price: 3999, offer: "3499 with bank offer", delivery: "Free delivery", rating: 4.5, category: "home", image: "/images/products/home/h13.webp" },
    { id: 64, title: "Dinner Set 24 Pieces", price: 1999, offer: "1699 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "home", image: "/images/products/home/h14.webp" },
    { id: 65, title: "Vacuum Cleaner", price: 4999, offer: "4299 with exchange", delivery: "Free delivery", rating: 4.3, category: "home", image: "/images/products/home/h15.webp" },
    { id: 66, title: "Curtains Set of 2", price: 899, offer: "749 with coupon", delivery: "Free delivery", rating: 4.0, category: "home", image: "/images/products/home/h16.webp" },
    { id: 67, title: "Electric Toaster", price: 1299, offer: "1099 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "home", image: "/images/products/home/h17.webp" },
    { id: 68, title: "Bathroom Scale", price: 799, offer: "699 with coupon", delivery: "Free delivery", rating: 3.9, category: "home", image: "/images/products/home/h18.webp" },
    { id: 69, title: "Pressure Cooker 5L", price: 1499, offer: "1299 with bank offer", delivery: "Free delivery", rating: 4.4, category: "home", image: "/images/products/home/h19.webp" },
    { id: 70, title: "Wall Clock Modern", price: 599, offer: "499 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "home", image: "/images/products/home/h20.webp" },
    { id: 71, title: "Induction Cooktop", price: 2499, offer: "2199 with coupon", delivery: "Free delivery", rating: 4.2, category: "home", image: "/images/products/home/h21.webp" },
    { id: 72, title: "Laundry Basket", price: 399, offer: "349 with 1 special offer", delivery: "Free delivery", rating: 3.8, category: "home", image: "/images/products/home/h22.webp" },
    { id: 73, title: "Mixer Grinder 750W", price: 2999, offer: "2499 with bank offer", delivery: "Free delivery", rating: 4.3, category: "home", image: "/images/products/home/h23.webp" },
    { id: 74, title: "Bathroom Mirror", price: 899, offer: "749 with coupon", delivery: "Free delivery", rating: 4.0, category: "home", image: "/images/products/home/h24.webp" },
    { id: 75, title: "Chopping Board Set", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "home", image: "/images/products/home/h25.webp" },

    // Beauty & Personal Care Category (25 products)
    { id: 76, title: "Face Wash for Oily Skin", price: 249, offer: "199 with coupon", delivery: "Free delivery", rating: 4.2, category: "beauty", image: "/images/products/beauty/b1.webp" },
    { id: 77, title: "Hair Dryer 1800W", price: 999, offer: "849 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "beauty", image: "/images/products/beauty/b2.webp" },
    { id: 78, title: "Perfume for Men 100ml", price: 799, offer: "699 with coupon", delivery: "Free delivery", rating: 4.3, category: "beauty", image: "/images/products/beauty/b3.webp" },
    { id: 79, title: "Lipstick Set of 4", price: 599, offer: "499 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "beauty", image: "/images/products/beauty/b4.webp" },
    { id: 80, title: "Electric Shaver for Men", price: 1499, offer: "1299 with bank offer", delivery: "Free delivery", rating: 4.2, category: "beauty", image: "/images/products/beauty/b5.webp" },
    { id: 81, title: "Moisturizer for Dry Skin", price: 349, offer: "299 with coupon", delivery: "Free delivery", rating: 4.1, category: "beauty", image: "/images/products/beauty/b6.webp" },
    { id: 82, title: "Hair Straightener", price: 1299, offer: "1099 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "beauty", image: "/images/products/beauty/b7.webp" },
    { id: 83, title: "Perfume for Women 50ml", price: 699, offer: "599 with coupon", delivery: "Free delivery", rating: 4.3, category: "beauty", image: "/images/products/beauty/b8.webp" },
    { id: 84, title: "Makeup Brush Set", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "beauty", image: "/images/products/beauty/b9.webp" },
    { id: 85, title: "Beard Trimmer", price: 899, offer: "749 with bank offer", delivery: "Free delivery", rating: 4.2, category: "beauty", image: "/images/products/beauty/b10.webp" },
    { id: 86, title: "Sunscreen SPF 50", price: 399, offer: "349 with coupon", delivery: "Free delivery", rating: 4.4, category: "beauty", image: "/images/products/beauty/b11.webp" },
    { id: 87, title: "Hair Curler", price: 1199, offer: "999 with 1 special offer", delivery: "Free delivery", rating: 4.0, category: "beauty", image: "/images/products/beauty/b12.webp" },
    { id: 88, title: "Body Spray for Men", price: 199, offer: "149 with coupon", delivery: "Free delivery", rating: 3.8, category: "beauty", image: "/images/products/beauty/b13.webp" },
    { id: 89, title: "Foundation Makeup", price: 599, offer: "499 with 1 special offer", delivery: "Free delivery", rating: 4.1, category: "beauty", image: "/images/products/beauty/b14.webp" },
    { id: 90, title: "Electric Toothbrush", price: 999, offer: "849 with bank offer", delivery: "Free delivery", rating: 4.3, category: "beauty", image: "/images/products/beauty/b15.webp" },
    { id: 91, title: "Face Mask Pack of 5", price: 299, offer: "249 with coupon", delivery: "Free delivery", rating: 4.0, category: "beauty", image: "/images/products/beauty/b16.webp" },
    { id: 92, title: "Hair Serum", price: 399, offer: "349 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "beauty", image: "/images/products/beauty/b17.webp" },
    { id: 93, title: "Body Lotion 400ml", price: 349, offer: "299 with coupon", delivery: "Free delivery", rating: 4.1, category: "beauty", image: "/images/products/beauty/b18.webp" },
    { id: 94, title: "Manicure Set", price: 499, offer: "399 with 1 special offer", delivery: "Free delivery", rating: 3.9, category: "beauty", image: "/images/products/beauty/b19.webp" },
    { id: 95, title: "Deodorant for Women", price: 199, offer: "149 with coupon", delivery: "Free delivery", rating: 4.0, category: "beauty", image: "/images/products/beauty/b20.webp" },
    { id: 96, title: "Eye Shadow Palette", price: 699, offer: "599 with 1 special offer", delivery: "Free delivery", rating: 4.2, category: "beauty", image: "/images/products/beauty/b21.webp" },
    { id: 97, title: "Facial Cleansing Brush", price: 899, offer: "749 with bank offer", delivery: "Free delivery", rating: 4.1, category: "beauty", image: "/images/products/beauty/b22.webp" },
    { id: 98, title: "Nail Polish Set", price: 399, offer: "349 with coupon", delivery: "Free delivery", rating: 3.9, category: "beauty", image: "/images/products/beauty/b23.webp" },
    { id: 99, title: "Men's Grooming Kit", price: 1299, offer: "1099 with 1 special offer", delivery: "Free delivery", rating: 4.3, category: "beauty", image: "/images/products/beauty/b24.webp" },
    { id: 100, title: "Hair Color Brown", price: 299, offer: "249 with coupon", delivery: "Free delivery", rating: 4.0, category: "beauty", image: "/images/products/beauty/b25.webp" }
];

// // Export the products array
// export default products;

// // Log information about the updated image paths
// console.log("Product data updated with local image paths using the specified naming convention:");
// console.log("- Fashion products: f1.webp to f25.webp");
// console.log("- Electronics products: e1.webp to e25.webp");
// console.log("- Home products: h1.webp to h25.webp");
// console.log("- Beauty products: b1.webp to b25.webp");
// console.log("\nAll images should be placed in the following directory structure:");
// console.log("/public");
// console.log("  /images");
// console.log("    /products");
// console.log("      /fashion");
// console.log("      /electronics");
// console.log("      /home");
// console.log("      /beauty");

// // For demonstration purposes, let's verify some of the image URLs
// function verifyImageUrls() {
//     // Check a few random images from each category
//     const imagesToCheck = [
//         products[0].image,  // Fashion
//         products[26].image, // Electronics
//         products[51].image, // Home
//         products[76].image  // Beauty
//     ];

//     console.log("Verifying sample image URLs:");
//     imagesToCheck.forEach((url, index) => {
//         console.log(`Image ${index + 1}: ${url}`);

//         // In a browser environment, we could actually test loading these images
//         const img = new Image();
//         img.onload = () => console.log(`Image ${index + 1} loaded successfully`);
//         img.onerror = () => console.log(`Image ${index + 1} failed to load`);
//         img.src = url;
//     });

//     console.log("\nAll product images have been updated with working Amazon image URLs.");
//     console.log("Total products by category:");
//     console.log("- Fashion: 25 products");
//     console.log("- Electronics: 25 products");
//     console.log("- Home & Kitchen: 25 products");
//     console.log("- Beauty & Personal Care: 25 products");
// }

// // Export the products array
// export default products;

// // Run verification if in a browser environment
// if (typeof window !== 'undefined') {
//     verifyImageUrls();
// }

// DOM elements
const productsContainer = document.getElementById('products-container');
const loadingElement = document.getElementById('loading');
const mobileFilterBtn = document.getElementById('mobile-filter-btn');
const filterModal = document.getElementById('filter-modal');
const closeModalBtn = document.getElementById('close-modal');
const applyFiltersBtn = document.querySelector('.apply-filters');
const mobileApplyFiltersBtn = document.getElementById('mobile-apply-filters');
const clearFiltersBtn = document.querySelector('.clear-filters');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const ratingFilters = document.querySelectorAll('input[name="rating"]');
const sortSelect = document.getElementById('sort-select');

// Variables for infinite scroll
let currentPage = 1;
const productsPerPage = 12; // Increased from 8 to show more products initially
let isLoading = false;
let activeFilters = {
    categories: ['fashion', 'electronics', 'home', 'beauty'],
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    freeDelivery: true,
    expressDelivery: true,
    sort: 'relevance' // Default sort option
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    loadProducts();
    setupEventListeners();
});

// Initialize filter UI based on available categories
function initializeFilters() {
    // Get unique categories from products
    const categories = [...new Set(products.map(product => product.category))];

    // Create category filter checkboxes if they don't exist
    const categoryFilterContainer = document.querySelector('.category-filters');
    if (categoryFilterContainer && categoryFilterContainer.children.length === 0) {
        categories.forEach(category => {
            const label = document.createElement('label');
            label.className = 'filter-option';
            label.innerHTML = `
                <input type="checkbox" name="category" value="${category}" checked>
                <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
            `;
            categoryFilterContainer.appendChild(label);
        });
    }
}

// Set up event listeners
function setupEventListeners() {
    // Infinite scroll
    window.addEventListener('scroll', handleInfiniteScroll);

    // Filter buttons
    if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', applyFilters);
    if (mobileApplyFiltersBtn) mobileApplyFiltersBtn.addEventListener('click', applyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);

    // Mobile filter modal
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => {
            filterModal.style.display = 'block';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            filterModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (filterModal) {
        filterModal.addEventListener('click', (e) => {
            if (e.target === filterModal) {
                filterModal.style.display = 'none';
            }
        });
    }

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            activeFilters.sort = sortSelect.value;
            currentPage = 1;
            loadProducts();
        });
    }

    // Add event listeners to category checkboxes
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Auto-apply filters when a category is checked/unchecked
            applyFilters();
        });
    });

    // Add event listeners to rating checkboxes
    document.querySelectorAll('input[name="rating"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Auto-apply filters when a rating is checked/unchecked
            applyFilters();
        });
    });

    // Add event listeners to price inputs for real-time filtering
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    if (minPriceInput && maxPriceInput) {
        const debouncedApplyFilters = debounce(applyFilters, 500);

        minPriceInput.addEventListener('input', debouncedApplyFilters);
        maxPriceInput.addEventListener('input', debouncedApplyFilters);
    }
}

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Handle infinite scroll
function handleInfiniteScroll() {
    if (isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreProducts();
    }
}

// Load initial products
function loadProducts() {
    isLoading = true;
    if (loadingElement) loadingElement.style.display = 'block';

    // Simulate API call delay
    setTimeout(() => {
        const filteredProducts = filterProducts();
        const sortedProducts = sortProducts(filteredProducts);
        const paginatedProducts = paginateProducts(sortedProducts, currentPage, productsPerPage);

        renderProducts(paginatedProducts);
        updateProductCount(filteredProducts.length);

        isLoading = false;
        if (loadingElement) loadingElement.style.display = 'none';
    }, 500);
}

// Load more products for infinite scroll
function loadMoreProducts() {
    isLoading = true;
    if (loadingElement) loadingElement.style.display = 'block';

    // Simulate API call delay
    setTimeout(() => {
        currentPage++;
        const filteredProducts = filterProducts();
        const sortedProducts = sortProducts(filteredProducts);
        const paginatedProducts = paginateProducts(sortedProducts, currentPage, productsPerPage);

        if (paginatedProducts.length > 0) {
            renderProducts(paginatedProducts, true);
        } else {
            if (loadingElement) loadingElement.textContent = 'No more products to load';
        }

        isLoading = false;
        if (loadingElement) loadingElement.style.display = 'none';
    }, 800);
}

// Filter products based on active filters
function filterProducts() {
    return products.filter(product => {
        // Category filter
        const categoryMatch = activeFilters.categories.length === 0 || 
                            activeFilters.categories.includes(product.category);
        
        // Price filter
        const priceMatch = product.price >= activeFilters.minPrice && 
                         product.price <= activeFilters.maxPrice;
        
        // Rating filter (products with rating >= selected minimum)
        const ratingMatch = product.rating >= activeFilters.minRating;
        
        // Delivery filters (OR logic - show if either matches or none selected)
        let deliveryMatch = true;
        if (activeFilters.freeDelivery || activeFilters.expressDelivery) {
            deliveryMatch = false;
            if (activeFilters.freeDelivery && product.delivery.includes('Free')) {
                deliveryMatch = true;
            }
            if (activeFilters.expressDelivery && product.delivery.includes('Express')) {
                deliveryMatch = true;
            }
        }
        
        return categoryMatch && priceMatch && ratingMatch && deliveryMatch;
    });
}

// Sort products based on selected sort option
function sortProducts(products) {
    const sortedProducts = [...products];

    switch (activeFilters.sort) {
        case 'price-low-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating-high-low':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // In a real app, you would sort by date
            // Here we'll just reverse the array as a placeholder
            sortedProducts.reverse();
            break;
        default:
            // 'relevance' - no sorting needed, use default order
            break;
    }

    return sortedProducts;
}

// Paginate products
function paginateProducts(products, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return products.slice(0, end);
}

// Render products to the DOM
function renderProducts(productsToRender, append = false) {
    if (!productsContainer) return;

    if (!append) {
        productsContainer.innerHTML = '';
    }

    if (productsToRender.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">No products match your filters. Try adjusting your criteria.</div>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.setAttribute('data-price', product.price);
        productCard.setAttribute('data-rating', product.rating);

        productCard.innerHTML = `
            <div class="product-rating">
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
                ${product.rating.toFixed(1)}
            </div>
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">₹${product.price}</div>
                <div class="product-offer">${product.offer}</div>
                <div class="product-delivery">${product.delivery}</div>
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });

    // Add hover effects and click handlers
    const allProductCards = document.querySelectorAll('.product-card');
    allProductCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real app, this would navigate to the product detail page
            console.log(`Product clicked: ${card.querySelector('.product-title').textContent}`);
        });
    });
}

// Update product count display
function updateProductCount(count) {
    const countElement = document.getElementById('product-count');
    if (countElement) {
        countElement.textContent = `${count} products found`;
    }
}

// Apply filters from the UI
function applyFilters() {
    // Get category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
    activeFilters.categories = Array.from(categoryCheckboxes).map(cb => cb.value);
    
    // If no categories are selected, show all categories
    if (activeFilters.categories.length === 0) {
        const allCategories = document.querySelectorAll('input[name="category"]');
        activeFilters.categories = Array.from(allCategories).map(cb => cb.value);
    }

    // Get price range
    activeFilters.minPrice = parseInt(document.getElementById('min-price')?.value) || 0;
    activeFilters.maxPrice = parseInt(document.getElementById('max-price')?.value) || 5000;

    // Get minimum rating (show products AT OR ABOVE selected rating)
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]:checked');
    const ratingValues = Array.from(ratingCheckboxes).map(cb => parseInt(cb.value));
    activeFilters.minRating = ratingValues.length > 0 ? Math.max(...ratingValues) : 0;

    // Get delivery options (independent options)
    activeFilters.freeDelivery = document.getElementById('free-delivery')?.checked || false;
    activeFilters.expressDelivery = document.getElementById('express-delivery')?.checked || false;

    // Reset pagination
    currentPage = 1;

    // Reload products
    loadProducts();

    // Close mobile modal if open
    if (filterModal) filterModal.style.display = 'none';
}

// Clear all filters
function clearFilters() {
    // Uncheck all category checkboxes
    document.querySelectorAll('input[name="category"]').forEach(cb => {
        cb.checked = false;
    });

    // Reset price range
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    if (minPriceInput) minPriceInput.value = 0;
    if (maxPriceInput) maxPriceInput.value = 5000;

    // Uncheck all rating checkboxes
    document.querySelectorAll('input[name="rating"]').forEach(cb => {
        cb.checked = false;
    });

    // Uncheck delivery options
    const freeDeliveryCheckbox = document.getElementById('free-delivery');
    const expressDeliveryCheckbox = document.getElementById('express-delivery');

    if (freeDeliveryCheckbox) freeDeliveryCheckbox.checked = false;
    if (expressDeliveryCheckbox) expressDeliveryCheckbox.checked = false;

    // Reset sort select
    if (sortSelect) sortSelect.value = 'relevance';

    // Reset active filters to show all products
    activeFilters = {
        categories: [], // Will be populated in applyFilters when none selected
        minPrice: 0,
        maxPrice: 5000,
        minRating: 0,
        freeDelivery: false,
        expressDelivery: false,
        sort: 'relevance'
    };

    // Reset pagination
    currentPage = 1;

    // Reload products
    loadProducts();
}

// For demonstration purposes, simulate the DOM elements
console.log("Product data loaded with 100 products across 4 categories:");
console.log("- Fashion: 25 products");
console.log("- Electronics: 25 products");
console.log("- Home & Kitchen: 25 products");
console.log("- Beauty & Personal Care: 25 products");
console.log("\nFilter functionality improved with:");
console.log("- Debounced price filter inputs");
console.log("- Auto-applying filters on category/rating changes");
console.log("- Better sorting options");
console.log("- Improved product cards with category labels");
console.log("- Increased initial products per page (12 instead of 8)");

// Product Detail Popup Implementation

// First, let's add the HTML for the popup to the document
function addProductPopupToDOM() {
    const popupHTML = `
    <div id="product-popup" class="product-popup">
        <div class="product-popup-content">
            <button class="close-popup" id="close-popup">&times;</button>
            <div class="product-popup-container">
                <div class="product-popup-image-container">
                    <img id="popup-product-image" src="/placeholder.svg" alt="Product Image" class="popup-product-image">
                </div>
                <div class="product-popup-details">
                    <h2 id="popup-product-title" class="popup-product-title"></h2>
                    
                    <div class="popup-product-rating">
                        <div class="rating-stars">
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                            </svg>
                            <span id="popup-product-rating"></span>
                        </div>
                        <span class="rating-count">(<span id="popup-rating-count">243</span> ratings)</span>
                    </div>
                    
                    <div class="popup-product-price-container">
                        <div class="popup-product-price">₹<span id="popup-product-price"></span></div>
                        <div class="popup-product-offer" id="popup-product-offer"></div>
                    </div>
                    
                    <div class="popup-product-delivery" id="popup-product-delivery"></div>
                    
                    <div class="popup-product-category">
                        Category: <span id="popup-product-category"></span>
                    </div>
                    
                    <div class="popup-delivery-check">
                        <h3>Check Delivery Availability</h3>
                        <div class="pincode-container">
                            <input type="text" id="pincode-input" placeholder="Enter Pincode" maxlength="6">
                            <button id="check-pincode">Check</button>
                        </div>
                        <div id="pincode-message" class="pincode-message"></div>
                    </div>
                    
                    <div class="popup-product-actions">
                        <button id="add-to-cart" class="add-to-cart-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,1 7,22A2,2 0 0,1 9,20C9,18.89 8.1,18 7,18Z" />
                            </svg>
                            Add to Cart
                        </button>
                        <button id="buy-now" class="buy-now-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4V2H1M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18Z" />
                            </svg>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Add the popup HTML to the body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Add CSS for the popup
    const popupStyles = document.createElement('style');
    popupStyles.textContent = `
        .product-popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 2000;
            overflow-y: auto;
        }
        
        .product-popup-content {
            background-color: white;
            width: 90%;
            max-width: 1000px;
            margin: 30px auto;
            border-radius: 8px;
            position: relative;
            animation: popupFadeIn 0.3s ease-out;
        }
        
        @keyframes popupFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .close-popup {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 28px;
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            z-index: 10;
        }
        
        .product-popup-container {
            display: flex;
            padding: 20px;
        }
        
        .product-popup-image-container {
            flex: 0 0 45%;
            padding: 20px;
        }
        
        .popup-product-image {
            width: 100%;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
        }
        
        .product-popup-details {
            flex: 0 0 55%;
            padding: 20px;
        }
        
        .popup-product-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
        }
        
        .popup-product-rating {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .rating-stars {
            display: flex;
            align-items: center;
            background-color: #388e3c;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            margin-right: 10px;
        }
        
        .rating-stars svg {
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }
        
        .rating-count {
            color: #666;
            font-size: 14px;
        }
        
        .popup-product-price-container {
            margin-bottom: 15px;
        }
        
        .popup-product-price {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        
        .popup-product-offer {
            font-size: 16px;
            color: #388e3c;
            margin-bottom: 10px;
        }
        
        .popup-product-delivery {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .popup-product-category {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
        }
        
        .popup-delivery-check {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .popup-delivery-check h3 {
            font-size: 16px;
            margin-bottom: 10px;
            color: #333;
        }
        
        .pincode-container {
            display: flex;
            margin-bottom: 10px;
        }
        
        .pincode-container input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            font-size: 14px;
        }
        
        .pincode-container button {
            padding: 10px 15px;
            background-color: #f43397;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            font-weight: 600;
        }
        
        .pincode-message {
            font-size: 14px;
            margin-top: 5px;
        }
        
        .pincode-available {
            color: #388e3c;
        }
        
        .pincode-unavailable {
            color: #d32f2f;
        }
        
        .popup-product-actions {
            display: flex;
            gap: 15px;
        }
        
        .add-to-cart-btn, .buy-now-btn {
            flex: 1;
            padding: 12px 15px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .add-to-cart-btn {
            background-color: #ff9f00;
            color: white;
        }
        
        .buy-now-btn {
            background-color: #fb641b;
            color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .product-popup-container {
                flex-direction: column;
                padding: 15px;
            }
            
            .product-popup-image-container,
            .product-popup-details {
                flex: 0 0 100%;
                padding: 10px;
            }
            
            .popup-product-title {
                font-size: 20px;
            }
            
            .popup-product-price {
                font-size: 24px;
            }
            
            .popup-product-actions {
                flex-direction: column;
            }
        }
        
        @media (max-width: 480px) {
            .product-popup-content {
                width: 95%;
                margin: 10px auto;
            }
            
            .popup-product-title {
                font-size: 18px;
            }
            
            .popup-product-price {
                font-size: 22px;
            }
            
            .close-popup {
                top: 10px;
                right: 10px;
                font-size: 24px;
            }
        }
    `;

    document.head.appendChild(popupStyles);
}

// Function to set up event listeners for the popup
function setupPopupEventListeners() {
    const popup = document.getElementById('product-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const checkPincodeBtn = document.getElementById('check-pincode');
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');

    // Close popup when clicking the close button
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close popup when clicking outside the content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Check pincode availability
    checkPincodeBtn.addEventListener('click', checkPincodeAvailability);

    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => {
        const productTitle = document.getElementById('popup-product-title').textContent;
        alert(`Added to cart: ${productTitle}`);
        // In a real app, you would add the product to the cart here
    });

    // Buy now functionality
    buyNowBtn.addEventListener('click', () => {
        const productTitle = document.getElementById('popup-product-title').textContent;
        alert(`Proceeding to checkout for: ${productTitle}`);
        // In a real app, you would redirect to checkout here
    });
}

// Function to check pincode availability
function checkPincodeAvailability() {
    const pincodeInput = document.getElementById('pincode-input');
    const pincodeMessage = document.getElementById('pincode-message');
    const pincode = pincodeInput.value.trim();

    // Clear previous message
    pincodeMessage.textContent = '';
    pincodeMessage.className = 'pincode-message';

    // Validate pincode
    if (!pincode) {
        pincodeMessage.textContent = 'Please enter a pincode';
        pincodeMessage.classList.add('pincode-unavailable');
        return;
    }

    if (!/^\d{6}$/.test(pincode)) {
        pincodeMessage.textContent = 'Please enter a valid 6-digit pincode';
        pincodeMessage.classList.add('pincode-unavailable');
        return;
    }

    // Simulate checking pincode (in a real app, this would be an API call)
    pincodeMessage.textContent = 'Checking...';

    setTimeout(() => {
        // Randomly determine if delivery is available (for demo purposes)
        const isAvailable = Math.random() > 0.3;

        if (isAvailable) {
            pincodeMessage.textContent = '✓ Delivery available at this location. Expected delivery in 3-5 days.';
            pincodeMessage.classList.add('pincode-available');
        } else {
            pincodeMessage.textContent = '✗ Sorry, delivery is not available at this location.';
            pincodeMessage.classList.add('pincode-unavailable');
        }
    }, 1000);
}

// Function to open the product popup with the selected product's details
function openProductPopup(product) {
    const popup = document.getElementById('product-popup');

    // Set product details in the popup
    document.getElementById('popup-product-image').src = product.image;
    document.getElementById('popup-product-title').textContent = product.title;
    document.getElementById('popup-product-rating').textContent = product.rating.toFixed(1);
    document.getElementById('popup-product-price').textContent = product.price;
    document.getElementById('popup-product-offer').textContent = product.offer;
    document.getElementById('popup-product-delivery').textContent = product.delivery;
    document.getElementById('popup-product-category').textContent =
        product.category.charAt(0).toUpperCase() + product.category.slice(1);

    // Generate a random number of ratings (for demo purposes)
    const ratingCount = Math.floor(Math.random() * 500) + 50;
    document.getElementById('popup-rating-count').textContent = ratingCount;

    // Clear pincode input and message
    document.getElementById('pincode-input').value = '';
    document.getElementById('pincode-message').textContent = '';
    document.getElementById('pincode-message').className = 'pincode-message';

    // Show the popup
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind the popup
}

// Function to modify the renderProducts function to add click event listeners to product cards
function modifyRenderProductsFunction(productsContainer) {
    // Override the original renderProducts function with our new one
    window.renderProducts = function (productsToRender, append = false) {
        if (!productsContainer) return;

        if (!append) {
            productsContainer.innerHTML = '';
        }

        if (productsToRender.length === 0) {
            productsContainer.innerHTML = '<div class="no-products">No products match your filters. Try adjusting your criteria.</div>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category);
            productCard.setAttribute('data-price', product.price);
            productCard.setAttribute('data-rating', product.rating);

            productCard.innerHTML = `
                <div class="product-rating">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                    </svg>
                    ${product.rating.toFixed(1)}
                </div>
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <div class="product-price">₹${product.price}</div>
                    <div class="product-offer">${product.offer}</div>
                    <div class="product-delivery">${product.delivery}</div>
                    <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                </div>
            `;

            // Add click event to open the popup
            productCard.addEventListener('click', () => {
                openProductPopup(product);
            });

            productsContainer.appendChild(productCard);
        });
    };
}

// Initialize the product popup
function initializeProductPopup() {
    // Add the popup HTML to the DOM
    addProductPopupToDOM();

    // Set up event listeners for the popup
    setupPopupEventListeners();

    // Declare the productsContainer variable
    const productsContainer = document.getElementById('products-container');

    // Modify the renderProducts function to add click event listeners to product cards
    modifyRenderProductsFunction(productsContainer);

    // For demonstration purposes
    console.log("Product popup functionality has been added!");
    console.log("Features:");
    console.log("1. Click on any product to open a detailed popup");
    console.log("2. View product details including name, rating, price, and category");
    console.log("3. Check delivery availability with pincode verification");
    console.log("4. Add to cart and Buy now buttons");
    console.log("5. Fully responsive design for mobile and tablet");
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProductPopup();

    // Sample implementation for testing in a browser environment
    if (typeof window !== 'undefined') {
        // Define a sample product for testing
        const sampleProduct = {
            id: 1,
            title: "Women's Floral Printed Dress",
            price: 399,
            offer: "349 with 1 special offer",
            delivery: "Free delivery",
            rating: 4.2,
            category: "fashion",
            image: "https://m.media-amazon.com/images/I/71GtJr2BfVL._AC_UL320_.jpg"
        };

        // Log instructions for testing
        console.log("To test the popup in a browser environment:");
        console.log("1. Add the HTML structure from your question");
        console.log("2. Add the CSS from your attachment");
        console.log("3. Include this JavaScript file");
        console.log("4. Click on any product to see the popup");
    }
});

// Top Brands Section

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.brands-track');
    const scroller = document.querySelector('.brands-scroller');
    const leftBtn = document.querySelector('.left-scroll-btn');
    const rightBtn = document.querySelector('.right-scroll-btn');
    const brandCards = document.querySelectorAll('.brand-card');
    
    let currentPosition = 0;
    const cardWidth = 150; // Should match your CSS min-width for brand-card
    const gap = 20; // Should match your gap in CSS
    let visibleCards;
    
    function calculateVisibleCards() {
        const containerWidth = scroller.offsetWidth;
        visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    }
    
    function updateButtons() {
        const maxScroll = track.scrollWidth - scroller.offsetWidth;
        
        leftBtn.style.display = currentPosition <= 0 ? 'none' : 'flex';
        rightBtn.style.display = currentPosition >= maxScroll ? 'none' : 'flex';
    }
    
    function scrollToPosition(position) {
        track.style.transform = `translateX(-${position}px)`;
        currentPosition = position;
        updateButtons();
    }
    
    function scrollLeft() {
        calculateVisibleCards();
        const scrollAmount = (cardWidth + gap) * visibleCards;
        const newPosition = Math.max(0, currentPosition - scrollAmount);
        scrollToPosition(newPosition);
    }
    
    function scrollRight() {
        calculateVisibleCards();
        const scrollAmount = (cardWidth + gap) * visibleCards;
        const maxScroll = track.scrollWidth - scroller.offsetWidth;
        const newPosition = Math.min(maxScroll, currentPosition + scrollAmount);
        scrollToPosition(newPosition);
    }
    
    // Initialize
    calculateVisibleCards();
    updateButtons();
    
    // Event Listeners
    leftBtn.addEventListener('click', scrollLeft);
    rightBtn.addEventListener('click', scrollRight);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        calculateVisibleCards();
        updateButtons();
    });
    
    // Add click event to brand cards
    brandCards.forEach(card => {
        card.addEventListener('click', function() {
            const brandName = this.querySelector('.brand-name').textContent;
            alert(`You clicked on ${brandName}! This would navigate to their products.`);
            // In a real implementation, you would navigate to the brand's page
            // window.location.href = `/brands/${brandName.toLowerCase()}`;
        });
    });
});