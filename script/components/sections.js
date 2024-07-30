import { projectData, techData } from "../projects.js";
import { button } from "./layout.js";

export function heroSection(title, content, buttons) {
  return /* html */`
    <!-- Hero section -->
    <section id="hero" class="section">
      <!-- Background blur effect -->
      <div class="blur-effect" aria-hidden="true"></div>
      <h1 class="type-headline">${title}</h1>
      <p class="type-desc-lg">${content}</p>
      ${buttons ? /* html */`<div class="button-bar">${buttons}</div>` : ""}
    </section>`;
}

export function techSection(technologies = techData.ids) {
  return /* html */`
    <!-- Technologies section -->
    <section id="tech" class="section">
      <ul>
        ${technologies.reduce((html, tech) => html + /* html */`
          <li>${techIcon(tech)}</li>`, "")}
      </ul>
    </section>`;
}

export function projectsSection(projects = projectData.ids) {
  return /* html */`
    <!-- Projects section -->
    <section id="projects" class="section">
      <h4 class="type-title section-title">Web Development Highlights</h4>
      <p class="type-desc section-desc">
        Explore my diverse web development projects, showcasing innovative designs, robust functionality, and creative solutions using modern technologies.
      </p>
      <ul>
        ${projects.reduce((html, proj) => html + /* html */`
          <li>
            <!-- ${projectData[proj].title} -->
            <a href="${ROOT_URL}projects/${proj}/project.html" class="card card-clickable">
              <div class="card-top">
                <div class="card-img">
                  <img src="${ROOT_URL}images/projects/${proj}-thumb.png" alt="${projectData[proj].title}">
                </div>
              </div>
              <div class="card-bottom">
                <h4 class="card-title">${projectData[proj].title}</h4>
                <p class="card-desc">${projectData[proj].overview}</p>
                <ul class="card-footer">
                  ${projectData[proj].tech.reduce((html, tech) => html + /* html */`
                    <li>${techIcon(tech, false)}</li>`, "")}
                </ul>
              </div>
            </a>
          </li>`, "")}
      </ul>
    </section>`;
}

export function contactSection() {
  return /* html */`
    <!-- Contact section -->
    <section id="contact" class="section">
      <div class="panel">
        <div class="panel-highlight"></div>
        <div class="panel-body">
          <i class="fa-solid fa-envelope gradient-icon"></i>
          <h6 class="type-overview">Get In Touch</h6>
          <h4 class="type-title-sm">
            Connect with me for collaborations, questions, or inquiries.
          </h4>
          <!-- Contact form -->
          <form class="form">
            <div class="form-col">
              <!-- Name input -->
              <label for="contact-name">
                Name <i class="fa-solid fa-asterisk"></i>
              </label>
              <input type="text" id="contact-name" class="form-input" required>
            </div>
            <div class="form-col">
              <!-- Phone input -->
              <label for="contact-phone">Phone</label>
              <input type="tel" id="contact-phone" class="form-input" pattern="(\+\d{9,12})|(\d{9,10})">
            </div>
            <div class="form-row">
              <!-- Email input -->
              <label for="contact-email">
                Email <i class="fa-solid fa-asterisk"></i>
              </label>
              <input type="email" id="contact-email" class="form-input" required>
            </div>
            <div class="form-row">
              <!-- Message input -->
              <label for="contact-message">
                Message <i class="fa-solid fa-asterisk"></i>
              </label>
              <textarea id="contact-message" class="form-input" required></textarea>
            </div>
            <div class="form-row">
              <!-- Submit button -->
              ${button("Send", { type: "submit", class: "button-extended" })}
            </div>
          </form>
        </div>
      </div>
    </section>`;
}

function techIcon(tech, showTitle = true) {
  return /* html */`
    <i class="${techData[tech].icon}"${showTitle ? ` title="${techData[tech].title}"` : ""}></i></li>`;
}