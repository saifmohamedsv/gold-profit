export function currencyFormat(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "EGP",
  }).format(value);
}
