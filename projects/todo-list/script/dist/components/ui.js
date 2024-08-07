export function button(content, onClick) {
    const btn = document.createElement("button");
    btn.className = "button";
    btn.innerHTML = content;
    if (onClick)
        btn.addEventListener("click", onClick);
    return btn;
}
export function iconButton(icon, onClick) {
    const btn = document.createElement("button");
    btn.className = "icon-button";
    btn.innerHTML = /* html */ `<i class="fas fa-${icon}"></i>`;
    if (onClick)
        btn.addEventListener("click", onClick);
    return btn;
}
