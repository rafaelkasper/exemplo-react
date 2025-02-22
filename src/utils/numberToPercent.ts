export function formatNumberToPercent(param: number | undefined) {
  if (!param) return '0%';

  let stringParam = param.toString();

  if (stringParam.startsWith('.'))
    stringParam = stringParam = `0${stringParam}`;

  return `${stringParam.replace('.', ',')}%`;
}
