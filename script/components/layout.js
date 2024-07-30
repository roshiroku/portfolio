import { projectData } from "../projects.js";

export function header() {
  return /* html */`
    <!-- Site header -->
    <header id="site-header">
      <div class="content-wrapper">
        <!-- Logo and homepage link -->
        ${logo()}
        <!-- Navigation toggle for mobile view -->
        <input type="checkbox" id="nav-toggle" aria-hidden="true">
        <label class="nav-button" for="nav-toggle" role="button">
          <i class="fa-solid fa-bars"></i>
          <i class="fa-solid fa-times"></i>
        </label>
        <!-- Site navigation menu -->
        ${siteNav("site menu")}
      </div>
    </header>`;
}

export function footer(projects) {
  return /* html */`
    <!-- Site footer -->
    <footer id="site-footer">
      <div class="content-wrapper">
        <!-- Footer column containing the logo and social links -->
        <div class="footer-col">
          ${logo("logo-white.svg")}
          <p>
            Website crafted with <i class="fa-solid fa-heart"></i> by Shir Raanan, your dedicated full stack developer.
          </p>
          <!-- Social media navigation links -->
          ${socialsNav()}
        </div>
        <!-- Footer column containing site and project navigation links -->
        <div class="footer-col">
          <!-- Site navigation links -->
          <div class="nav-col">
            <h4>Browse</h4>
            ${siteNav()}
          </div>
          <!-- Project highlights navigation links -->
          <div class="nav-col">
            <h4>Highlights</h4>
            ${projectsNav(projects)}
          </div>
        </div>
      </div>
    </footer>`;
}

function logo(img = "logo.svg") {
  return /* html */`
    <a href="${ROOT_URL}index.html" class="logo">
      <img src="${ROOT_URL}images/${img}" alt="logo">
      <span>Portfolio</span>
    </a>`;
}

function siteNav(label = "site links") {
  return /* html */`
    <nav aria-label="${label}">
      <a href="${ROOT_URL}index.html#">Home</a>
      <a href="${ROOT_URL}index.html#about">About</a>
      <a href="${ROOT_URL}index.html#projects">Projects</a>
      <a href="${ROOT_URL}index.html#contact">Contact</a>
    </nav>`;
}

function projectsNav(projects) {
  return /* html */`
    <nav aria-label="project links">
      ${projects.reduce((html, proj) => html +
        /* html */`<a href="${ROOT_URL}projects/${proj}/project.html">${projectData[proj].title}</a>`, "")}
    </nav>`;
}

function socialsNav() {
  return /* html */`
    <nav aria-label="social links">
      <a href="#" title="Linkedin">
        <i class="fa-brands fa-linkedin"></i>
      </a>
      <a href="#" title="GitHub">
        <i class="fa-brands fa-github"></i>
      </a>
      <a href="#" title="X Twitter">
        <i class="fa-brands fa-x-twitter"></i>
      </a>
      <a href="#" title="Facebook">
        <i class="fa-brands fa-facebook"></i>
      </a>
    </nav>`;
}

export function button(content, attrs = {}) {
  const cssClass = `button${attrs.class ? ` ${attrs.class}` : ""}`;
  delete attrs.class;

  return /* html */`
    <button class="${cssClass}"${attrString(attrs)}>
      <div class="button-text">
        ${content}
      </div>
    </button>`;
}

export function linkButton(content, href, attrs = {}) {
  const cssClass = `button${attrs.class ? ` ${attrs.class}` : ""}`;
  delete attrs.class;

  return /* html */`
    <a href="${href}" class="${cssClass}"${attrString(attrs)}>
      <div class="button-text">
        ${content}
      </div>
    </a>`;
}

function attrString(attrs) {
  return Object.keys(attrs).reduce((str, attr) => str + ` ${attr}${attrs[attr] ? `="${attrs[attr]}"` : ""}`, "");
}