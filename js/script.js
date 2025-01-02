document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const navMenu = document.getElementById("nav__menu");
  const menuToggle = document.getElementById("menu__toggle");
  const navItems = document.querySelectorAll(".nav__item");
  const mediaQuery = window.matchMedia("(min-width: 69.375rem)");
  const ANIMATION_DURATION = 300;

  setUpNav(mediaQuery);

  mediaQuery.addEventListener("change", function (e) {
    setUpNav(e);
  });

  menuToggle.addEventListener("click", function () {
    toggleNavMenu(menuToggle, navMenu, ANIMATION_DURATION);
  });

  function setUpNav(e) {
    if (e.matches) {
      // Desktop style
      navMenu.style.visibility = "visible";
      if (navMenu.classList.contains("nav__menu--active")) {
        body.classList.remove("no-scroll");
      }
    } else {
      // Mobile style
      if (navMenu.classList.contains("nav__menu--active")) {
        body.classList.add("no-scroll");
      } else {
        navMenu.style.visibility = "hidden";
      }
    }
  }

  /**
   * Toggles the visibility and state of the navigation menu
   * @param menuButton - The button that controls the menu
   * @param navigationMenu - The menu element to toggle
   * @param animationDuration - Duration in ms before hiding menu
   */
  function toggleNavMenu(menuButton, navigationMenu, animationDuration = 300) {
    if (!menuButton || !navigationMenu) return;

    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

    // Update button state
    menuButton.setAttribute("aria-expanded", !isExpanded);
    menuButton.setAttribute(
      "aria-label",
      !isExpanded ? "Close main menu" : "Open main menu"
    );

    // Update menu state
    if (!isExpanded) {
      body.classList.add("no-scroll");
      navigationMenu.style.visibility = "visible";
      navigationMenu.classList.add("nav__menu--active");
    } else {
      body.classList.remove("no-scroll");
      navigationMenu.classList.remove("nav__menu--active");
      setTimeout(() => {
        navigationMenu.style.visibility = "hidden";
      }, animationDuration);
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Remove any opened dropdown menu
      const dropdownContainer = item.querySelector(".nav-dropdown-container");
      const isOpen = dropdownContainer.classList.contains(
        "nav-dropdown-container--active"
      );
      navItems.forEach((i) => {
        const dropdownContainer = i.querySelector(".nav-dropdown-container");
        if (dropdownContainer) {
          dropdownContainer.classList.remove("nav-dropdown-container--active");
          i.classList.remove("nav__item--open");
        }
      });
      if (!isOpen && dropdownContainer) {
        // Add class to nav item to open dropdown
        dropdownContainer.classList.add("nav-dropdown-container--active");
        item.classList.add("nav__item--open");
      }
    });
  });

  // Close any drowndown when clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav__item")) {
      navItems.forEach((item) => {
        const dropdownContainer = item.querySelector(".nav-dropdown-container");
        if (dropdownContainer) {
          dropdownContainer.classList.remove("nav-dropdown-container--active");
          item.classList.remove("nav__item--open");
        }
      });
    }
  });
});
