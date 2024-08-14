import { header, footer, linkButton } from "../components/layout.js";
import { heroSection, techSection, projectsSection, contactSection } from "../components/sections.js";
import { initializeTabs } from "../components/tabs.js";

document.body.innerHTML = /* html */`
  ${header()}
  <!-- Main content -->
  <main id="site-content">
    <div class="content-wrapper">
      ${heroSection(/* html */`Crafting Digital Experiences with <span class="gradient-text">Precision and Creativity</span>`, "Delivering tailored web solutions that blend innovative design with robust functionality, ensuring a seamless and engaging user experience.")}
      <hr class="section-divider">
      ${techSection()}
      <hr class="section-divider">
      ${aboutSection()}
      <hr class="section-divider">
      ${projectsSection()}
      <hr class="section-divider">
      ${contactSection()}
      <!-- Background blur effect -->
      <div class="blur-effect" aria-hidden="true"></div>
    </div>
  </main>
  ${footer(["discover-the-world", "free-consulting", "here-now", "outside-the-box"])}`;

const navToggleCheckbox = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll("#site-header nav a");

navLinks.forEach(link => link.addEventListener("click", () => navToggleCheckbox.checked = false));

initializeTabs();

function aboutSection() {
  return /* html */`
    <!-- About section -->
    <section id="about" class="section">
      <img src="./images/logo.svg" alt="about logo">
      <h4 class="type-title section-title">Behind the Code</h4>
      <p class="type-desc section-desc">
        Hello! I'm Shir Raanan, an aspiring full stack developer with a passion for creating seamless digital experiences. Currently, I'm honing my skills at HackerU Academy, where I'm dedicated to becoming a professional full stack web developer.
      </p>
      <p class="type-desc section-desc">
        Motivation, consistency, creativity, and professionalism drive my work. I strive to ensure each project is functional, aesthetically pleasing, and user-centric. I'm excited to bring innovative solutions to the digital world and collaborate on future projects.
      </p>
      ${linkButton("Download CV", "#")}
    </section>`;
}