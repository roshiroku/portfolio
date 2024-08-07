export function dateISO(date = new Date()) {
    date = date instanceof Date ? date : new Date(date);
    return date.toISOString().split("T")[0];
}
