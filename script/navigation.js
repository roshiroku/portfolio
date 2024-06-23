// This script automatically closes the navigation menu on mobile devices after a link is clicked.
const navToggleCheckbox = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll("#site-header nav a");

navLinks.forEach(link => link.addEventListener("click", () => navToggleCheckbox.checked = false));