/**
 * Format number with space as thousand separator
 * 1000 → 1 000
 * 1000000 → 1 000 000
 */
export function formatNumberWithSpaces(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Format values with space as thousand separator for readability
 */
export function formatValue(value: string | number): string {
  if (value === "n/a" || value === "N/A") return "N/A";
  if (value === "unknown" || value === "Unknown") return "Unknown";
  
  if (typeof value === "number") {
    return formatNumberWithSpaces(value);
  }
  
  // Remove units like "1000km" for consistency
  const numericMatch = value.match(/^([\d,]+)([a-zA-Z]*)$/);
  if (numericMatch) {
    const numericPart = parseInt(numericMatch[1].replace(/,/g, ""));
    return formatNumberWithSpaces(numericPart);
  }
  
  return value;
}
