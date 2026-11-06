import { fiscalPeriod } from '@lp-labs/fiscal-periods';
if (fiscalPeriod(2026, 1, 7).fiscalYear !== 2025) throw new Error('Fiscal');
// @ts-expect-error invalid argument must be rejected by declarations
fiscalPeriod('2026', 1);
