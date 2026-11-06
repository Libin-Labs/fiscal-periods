import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('July start', () => {
  assert.deepEqual(api.fiscalPeriod(2026, 1, 7), { fiscalYear: 2025, quarter: 3, monthInYear: 7 });
});
test('standard quarters', () => {
  assert.deepEqual(api.fiscalQuarterRange(2026, 2), {
    start: { year: 2026, month: 4 },
    end: { year: 2026, month: 6 },
  });
});
test('cross-year range', () => {
  assert.deepEqual(api.fiscalQuarterRange(2025, 4, 7), {
    start: { year: 2026, month: 4 },
    end: { year: 2026, month: 6 },
  });
});
test('every start month', () => {
  for (let s = 1; s <= 12; s++)
    for (let m = 1; m <= 12; m++) {
      const p = api.fiscalPeriod(2026, m, s),
        r = api.fiscalQuarterRange(p.fiscalYear, p.quarter, s),
        n = 2026 * 12 + m;
      assert.ok(n >= r.start.year * 12 + r.start.month && n <= r.end.year * 12 + r.end.month);
    }
});
test('December fiscal start', () => {
  assert.equal(api.fiscalPeriod(2026, 12, 12).quarter, 1);
});
test('invalid bounds', () => {
  assert.throws(() => api.fiscalPeriod(1, 1));
  assert.throws(() => api.fiscalPeriod(2026, 13));
  assert.throws(() => api.fiscalQuarterRange(2026, 5));
});
