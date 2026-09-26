"use strict";

const WHATSAPP_NUMBER = "918433657212";

/**
 * Read the planner form and return the WhatsApp message a customer would send.
 * Only fields the customer filled in appear, so the message never has blanks.
 * @param {HTMLFormElement} form The "Plan your cake" form.
 * @returns {string} The message text, one detail per line.
 */
function buildMessage(form) {
  const data = new FormData(form);
  const occasion = data.get("occasion");
  const item = data.get("item") || "cake";
  const name = String(data.get("name") || "").trim();
  const flavour = String(data.get("flavour") || "").trim();
  const date = String(data.get("date") || "");

  const what = occasion && occasion !== "other" ? `${occasion} ${item}` : item;
  const article = /^[aeiou]/i.test(what) ? "an" : "a";
  const plural = item === "cupcakes" || item === "cake popsicles";
  const order = plural ? `some ${what}` : `${article} ${what}`;
  const lines = [`Hi Flora's Cakes! I'd like to order ${order}.`];
  if (name) lines.push(`Name on the cake: ${name}`);
  if (date) {
    const when = new Date(`${date}T00:00:00`);
    if (!Number.isNaN(when.getTime())) {
      lines.push(`Needed on: ${when.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`);
    }
  }
  if (flavour) lines.push(`Flavour or theme: ${flavour}`);
  return lines.join("\n");
}

/**
 * Keep the message preview and the WhatsApp link in step with the form.
 * Does nothing if the planner is missing, so the rest of the page still works.
 */
function setUpPlanner() {
  const form = document.getElementById("planner");
  const preview = document.getElementById("msg");
  const send = document.getElementById("send");
  if (!form || !preview || !send) return;

  const update = () => {
    const message = buildMessage(form);
    preview.textContent = message;
    send.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };
  form.addEventListener("input", update);
  form.addEventListener("change", update);
  form.addEventListener("submit", (event) => event.preventDefault());
  update();
}

/**
 * Reveal the rest of the gallery when "See all 36 cakes" is pressed, then hide the button.
 */
function setUpGalleryReveal() {
  const button = document.getElementById("show-all");
  if (!button) return;
  button.addEventListener("click", () => {
    const hidden = document.querySelectorAll("#gallery-grid .more");
    hidden.forEach((item) => { item.hidden = false; });
    button.setAttribute("aria-expanded", "true");
    button.parentElement.hidden = true;
    const firstNew = hidden[0] && hidden[0].querySelector("button");
    if (firstNew) firstNew.focus();
  });
}

/**
 * Open gallery photos full size in a native dialog, which handles Escape and focus for us.
 * Falls back to opening the image in a new tab where <dialog> is unsupported.
 */
function setUpLightbox() {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  const close = document.getElementById("lightbox-close");
  const grid = document.getElementById("gallery-grid");
  if (!dialog || !image || !close || !grid) return;

  grid.addEventListener("click", (event) => {
    const thumb = event.target.closest(".thumb");
    if (!thumb) return;
    const full = thumb.dataset.full;
    const alt = thumb.querySelector("img")?.alt || "";
    if (typeof dialog.showModal !== "function") {
      window.open(full, "_blank", "noopener");
      return;
    }
    image.src = full;
    image.alt = alt;
    dialog.showModal();
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { image.removeAttribute("src"); });
}

setUpPlanner();
setUpGalleryReveal();
setUpLightbox();
