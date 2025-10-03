export function formatWithThousandsSeparator(number: number) {
  return new Intl.NumberFormat('en-US').format(number);
}
