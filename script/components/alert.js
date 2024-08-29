import { attrString } from "../utils.js";
import { button } from "./layout.js";

export function lightbox() {
  return /* html */`<div id="lightbox"></div>`;
}

export function alert(text, btn = "OK", attrs = {}) {
  const cssClass = `alert${attrs.class ? ` ${attrs.class}` : ""}`;
  delete attrs.class;

  return /* html */`
    <div class="${cssClass}"${attrString(attrs)}>
      <div class="alert-header">
        ${window.location.href} says
      </div>
      <div class="alert-body type-desc">${text}</div>
      <div class="alert-buttons">
        ${button(btn, { "data-action": "close" })}
      </div>
    </div>`;
}

export function initializeAlerts() {
  const lightbox = document.getElementById("lightbox");

  let currentAlert = null;

  lightbox.addEventListener("click", closeAlert);

  document.querySelectorAll(".alert-link").forEach(alertLink => {
    const id = alertLink.getAttribute("data-for");
    const alert = document.getElementById(id);

    if (alert) {
      document.body.append(alert);

      alertLink.addEventListener("click", e => {
        e.preventDefault();
        closeAlert();
        openAlert(alert);
      });

      alert.querySelectorAll("[data-action=close]")
        .forEach(btn => btn.addEventListener("click", closeAlert));
    }
  });

  function openAlert(alert) {
    alert.classList.add("active");
    lightbox?.classList.add("active");
    document.body.classList.add("lightbox-active");
    currentAlert = alert;
  }

  function closeAlert() {
    currentAlert?.classList.remove("active");
    lightbox?.classList.remove("active");
    document.body.classList.remove("lightbox-active");
    currentAlert = null;
  }
}