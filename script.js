document.addEventListener('DOMContentLoaded', function() {
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

        mobileMenu.addEventListener('click', function(e) {
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
                link.addEventListener('click', function(e) {
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
        document.addEventListener('click', function(e) {
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