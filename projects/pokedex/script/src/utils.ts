export function ucFirst(str: string) {
  return str[0].toUpperCase() + str.substring(1);
}

export function capitalize(str: string) {
  return str.split(" ").map(word => ucFirst(word)).join(" ");
}

export function unslugify(str: string) {
  return capitalize(str.replace(/-/g, " "));
}

function createElement<T extends keyof HTMLElementTagNameMap>(tagName: T): HTMLElementTagNameMap[T];
function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  children: (HTMLElement | string)[]
): HTMLElementTagNameMap[T];
function createElement<T extends keyof HTMLElementTagNameMap, K extends keyof HTMLElementTagNameMap[T]>(
  tagName: T,
  attrs: { [P in K]?: HTMLElementTagNameMap[T][P] },
  children?: (HTMLElement | string)[]
): HTMLElementTagNameMap[T];
function createElement<T extends keyof HTMLElementTagNameMap, K extends keyof HTMLElementTagNameMap[T]>(
  tagName: T,
  attrsOrChildren?: { [P in K]?: HTMLElementTagNameMap[T][P] } | (HTMLElement | string)[],
  children: (HTMLElement | string)[] = []
) {
  const el = document.createElement(tagName) as HTMLElementTagNameMap[T];

  if (Array.isArray(attrsOrChildren)) {
    // Case where attrsOrChildren is the children array
    el.append(...attrsOrChildren);
  } else if (attrsOrChildren) {
    // Case where attrsOrChildren is the attributes object
    for (const key in attrsOrChildren) {
      if (attrsOrChildren.hasOwnProperty(key)) {
        (el as any)[key] = attrsOrChildren[key as K];
      }
    }
    // Append children if provided
    el.append(...children);
  }

  return el;
}

export { createElement };