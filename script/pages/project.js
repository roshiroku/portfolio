import { footer, header, linkButton } from "../components/layout.js";
import { heroSection, techSection } from "../components/sections.js";
import { projectData } from "../projects.js";

const proj = projectData[PROJECT_ID];
const footerLinks = ["discover-the-world", "free-consulting", "here-now", "outside-the-box", "good-coffee"]
  .filter(link => link != proj.id).slice(0, 4);

document.body.innerHTML = /* html */`
  ${header()}
  <!-- Main content -->
  <main id="site-content">
    <div class="content-wrapper">
      ${heroSection(proj.titleHTML, proj.desc, linkButton(/* html */`
        View project<i class="fa-solid fa-eye"></i>`, "./index.html") + linkButton(/* html */`
        Download project<i class="fa-solid fa-file-arrow-down"></i>`, `./${proj.id}.zip`, { download: "" }))}
      <hr class="section-divider">
      ${techSection(proj.tech)}
      <hr class="section-divider">
      ${previewSection(proj)}
      <!-- Background blur effect -->
      <div class="blur-effect" aria-hidden="true"></div>
    </div>
  </main>
  ${footer(footerLinks)}`;

function previewSection(proj) {
  return /* html */`
    <section id="preview" class="section">
      <img src="${ROOT_URL}images/projects/${proj.id}.png" alt="${proj.title} preview">
      <img src="${ROOT_URL}images/projects/${proj.id}-mobile.png" alt="${proj.title} mobile preview">
    </section>`;
}