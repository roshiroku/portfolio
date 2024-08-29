export function ucFirst(str) {
  return str[0].toUpperCase() + str.substring(1);
}

export function attrString(attrs) {
  return Object.keys(attrs).reduce((str, attr) => str + ` ${attr}${attrs[attr] ? `="${attrs[attr]}"` : ""}`, "");
}