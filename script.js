// Search suggestions show/hide
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');

    searchInput.addEventListener('focus', () => {
      suggestions.style.display = 'flex';
    });

    searchInput.addEventListener('blur', () => {
      // Delay hiding to allow click on suggestions
      setTimeout(() => {
        suggestions.style.display = 'none';
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

    // Mega menu show/hide logic
    const categoryNav = document.querySelector('.category-nav');
    const megaMenus = document.querySelectorAll('.mega-menu');
    const megaMenuContainer = document.getElementById('mega-menu-container');

    let activeCategory = null;

    function hideAllMegaMenus() {
      megaMenus.forEach(menu => {
        menu.style.display = 'none';
        menu.setAttribute('aria-hidden', 'true');
      });
      megaMenuContainer.setAttribute('aria-hidden', 'true');
      activeCategory = null;
    }

    categoryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        const cat = link.getAttribute('data-category');
        if (!cat) return;
        megaMenus.forEach(menu => {
          if (menu.getAttribute('data-category') === cat) {
            menu.style.display = 'flex';
            menu.setAttribute('aria-hidden', 'false');
            megaMenuContainer.setAttribute('aria-hidden', 'false');
            activeCategory = cat;
          } else {
            menu.style.display = 'none';
            menu.setAttribute('aria-hidden', 'true');
          }
        });
      });

      link.addEventListener('focus', () => {
        const cat = link.getAttribute('data-category');
        if (!cat) return;
        megaMenus.forEach(menu => {
          if (menu.getAttribute('data-category') === cat) {
            menu.style.display = 'flex';
            menu.setAttribute('aria-hidden', 'false');
            megaMenuContainer.setAttribute('aria-hidden', 'false');
            activeCategory = cat;
          } else {
            menu.style.display = 'none';
            menu.setAttribute('aria-hidden', 'true');
          }
        });
      });

      link.addEventListener('mouseleave', () => {
        // Delay hiding to allow hover on mega menu
        setTimeout(() => {
          if (!activeCategory) return;
          if (activeCategory !== link.getAttribute('data-category')) return;
          if (!megaMenuContainer.matches(':hover')) {
            hideAllMegaMenus();
          }
        }, 200);
      });
    });

    megaMenus.forEach(menu => {
      menu.addEventListener('mouseleave', () => {
        hideAllMegaMenus();
      });
      menu.addEventListener('mouseenter', () => {
        activeCategory = menu.getAttribute('data-category');
      });
    });

    // Profile dropdown aria-expanded toggle on keyboard focus
    const profile = document.querySelector('.profile');
    const profileDropdown = profile.querySelector('.profile-dropdown');
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
        profileDropdown.style.display = 'none';
        profile.setAttribute('aria-expanded', 'false');
      }
    });

    // Dropdown Become a Supplier aria-expanded toggle on keyboard focus
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
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




    // ============== Another team members work =================



    