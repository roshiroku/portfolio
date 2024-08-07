export function dateISO(date: string | number | Date = new Date()) {
  date = date instanceof Date ? date : new Date(date);
  return date.toISOString().split("T")[0];
}