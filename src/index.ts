function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export interface YearMonth {
  year: number;
  month: number;
}
export function fiscalPeriod(
  year: number,
  month: number,
  startMonth = 1,
): { fiscalYear: number; quarter: number; monthInYear: number } {
  integer(year, 2, 9998);
  integer(month, 1, 12);
  integer(startMonth, 1, 12);
  const monthInYear = ((month - startMonth + 12) % 12) + 1;
  return {
    fiscalYear: month < startMonth ? year - 1 : year,
    quarter: Math.floor((monthInYear - 1) / 3) + 1,
    monthInYear,
  };
}
export function fiscalQuarterRange(
  fiscalYear: number,
  quarter: number,
  startMonth = 1,
): { start: YearMonth; end: YearMonth } {
  integer(fiscalYear, 1, 9998);
  integer(quarter, 1, 4);
  integer(startMonth, 1, 12);
  const index = startMonth - 1 + 3 * (quarter - 1);
  const date = (i: number): YearMonth => ({
    year: fiscalYear + Math.floor(i / 12),
    month: (i % 12) + 1,
  });
  return { start: date(index), end: date(index + 2) };
}
