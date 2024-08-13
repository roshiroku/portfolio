export function ucFirst(str) {
    return str[0].toUpperCase() + str.substring(1);
}
export function capitalize(str) {
    return str.split(" ").map(word => ucFirst(word)).join(" ");
}
export function unslugify(str) {
    return capitalize(str.replace(/-/g, " "));
}
function createElement(tagName, attrsOrChildren, children = []) {
    const el = document.createElement(tagName);
    if (Array.isArray(attrsOrChildren)) {
        // Case where attrsOrChildren is the children array
        el.append(...attrsOrChildren);
    }
    else if (attrsOrChildren) {
        // Case where attrsOrChildren is the attributes object
        for (const key in attrsOrChildren) {
            if (attrsOrChildren.hasOwnProperty(key)) {
                el[key] = attrsOrChildren[key];
            }
        }
        // Append children if provided
        el.append(...children);
    }
    return el;
}
export { createElement };
