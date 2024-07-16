export function currencyFormat(value: number, locale = "id-ID", currency = "IDR") {
  return value.toLocaleString(locale, { style: "currency", currency });
}
