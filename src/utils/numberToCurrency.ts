export const numberToCurrency = (
  amount = 0,
  currency = 'BRL',
  noPrefix = false,
  decimalCount = 2,
  decimal = ',',
  thousands = '.'
): string => {
  const newAmount = Math.abs(amount);
  let newDecimalCount = Math.abs(decimalCount);
  newDecimalCount = Number.isNaN(newDecimalCount) ? 2 : newDecimalCount;

  const negativeSign = amount < 0 ? '-' : '';

  const i = parseInt((newAmount || 0).toFixed(newDecimalCount), 10).toString();
  const j = i.length > 3 ? i.length % 3 : 0;

  const prefix = currency === 'BRL' ? 'R$ ' : '$ ';
  const thousandIsolated = j ? i.substr(0, j) + thousands : '';
  const restThousands = i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`);
  const decimals = newDecimalCount
    ? decimal +
      Math.abs(amount - Number(negativeSign + i))
        .toFixed(newDecimalCount)
        .slice(2)
    : '';

  const value = `${thousandIsolated}${restThousands}${decimals}`;

  if (!noPrefix) return `${negativeSign}${noPrefix ? '' : prefix}${value}`;

  return `${negativeSign}${value}`;
};
