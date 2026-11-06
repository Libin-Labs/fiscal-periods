# @lp-labs/fiscal-periods

Month-based fiscal quarters with explicit start-year labels.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/fiscal-periods
```

## Working example

```js
import { fiscalPeriod } from '@lp-labs/fiscal-periods';
if (fiscalPeriod(2026, 1, 7).fiscalYear !== 2025) throw new Error('Fiscal');
```

CommonJS: `const api = require('@lp-labs/fiscal-periods')`.

## Behavior, customization and limits

fiscalPeriod(year,month,startMonth=1) returns fiscalYear labeled by STARTING civil year,quarter1..4,monthInYear1..12. Civil years2..9998. fiscalQuarterRange(fiscalYear,quarter,startMonth=1) returns inclusive start/end civil {year,month}; fiscalYear1..9998. Twelve regular months ONLY,not4-4-5/week calendars,tax law or date/time ranges. Constant time.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface YearMonth {
  year: number;
  month: number;
}
export declare function fiscalPeriod(
  year: number,
  month: number,
  startMonth?: number,
): {
  fiscalYear: number;
  quarter: number;
  monthInYear: number;
};
export declare function fiscalQuarterRange(
  fiscalYear: number,
  quarter: number,
  startMonth?: number,
): {
  start: YearMonth;
  end: YearMonth;
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
