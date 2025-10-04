```typescript
import { TerminalValueCalculatorInputs, TerminalValueCalculatorMetrics, TerminalValueCalculatorAnalysis } from './types';

/**
 * Helper function to validate inputs for terminal value calculation.
 * Ensures discount rate > growth rate to avoid division by zero or negative denominator.
 * @param inputs - The calculator inputs
 * @returns boolean indicating validity
 */
function areInputsValid(inputs: TerminalValueCalculatorInputs): boolean {
  return inputs.discountRate > inputs.growthRate && inputs.lastYearFCF > 0 && inputs.growthRate >= 0;
}

/**
 * Helper function to calculate the implied perpetuity factor.
 * Used in analysis to assess sensitivity of terminal value to growth assumptions.
 * @param growthRate - Perpetual growth rate
 * @param discountRate - Discount rate (WACC)
 * @returns The perpetuity factor (1 / (r - g))
 */
function calculatePerpetuityFactor(growthRate: number, discountRate: number): number {
  if (discountRate <= growthRate) {
    return Infinity; // Indicates unsustainable growth assumption
  }
  return 1 / (discountRate - growthRate);
}

export function calculateResult(inputs: TerminalValueCalculatorInputs): number {
  if (!areInputsValid(inputs)) {
    return NaN; // Invalid inputs lead to NaN result for graceful handling in UI
  }

  // Gordon Growth Model: TV = FCF_n * (1 + g) / (r - g)
  // Where FCF_n is the free cash flow in the final projection year,
  // g is the perpetual growth rate, r is the discount rate (WACC)
  const nextYearFCF = inputs.lastYearFCF * (1 + inputs.growthRate);
  const terminalValue = nextYearFCF / (inputs.discountRate - inputs.growthRate);

  return terminalValue;
}

export function generateAnalysis(
  inputs: TerminalValueCalculatorInputs,
  metrics: TerminalValueCalculatorMetrics
): TerminalValueCalculatorAnalysis {
  const result = metrics.result;
  const perpetuityFactor = calculatePerpetuityFactor(inputs.growthRate, inputs.discountRate);

  // Risk assessment based on investment-portfolio principles:
  // - High risk if growth rate is close to or exceeds discount rate (small/negative denominator)
  // - Medium risk if growth rate > 3% (aggressive long-term assumption for most economies)
  // - Low risk otherwise, assuming conservative inputs
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const denominator = inputs.discountRate - inputs.growthRate;
  if (denominator <= 0 || denominator < 0.02) {
    riskLevel = 'High'; // Unsustainable or highly sensitive to assumptions
  } else if (inputs.growthRate > 0.03) {
    riskLevel = 'Medium'; // Above typical long-term GDP growth, increases uncertainty
  }

  // Recommendation based on terminal value magnitude and assumptions:
  // In portfolio context, high TV relative to FCF suggests strong compounding value;
  // Advise on diversification or sensitivity analysis for portfolio integration
  let recommendation: string;
  if (isNaN(result)) {
    recommendation = 'Invalid inputs detected. Ensure discount rate exceeds growth rate and FCF is positive for accurate terminal value in your portfolio valuation.';
  } else if (perpetuityFactor > 20) {
    recommendation = 'The calculated terminal value indicates significant long-term growth potential. Consider stress-testing growth assumptions in your investment portfolio to mitigate overvaluation risk.';
  } else if (perpetuityFactor < 10) {
    recommendation = 'Conservative terminal value suggests limited perpetuity growth. Evaluate if this aligns with your portfolio\'s high-growth objectives or adjust for exit multiples.';
  } else {
    recommendation = 'Balanced terminal value under Gordon Growth Model. Integrate this into DCF for portfolio decisions, monitoring WACC and growth rate sensitivity.';
  }

  return { recommendation, riskLevel };
}
```