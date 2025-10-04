```typescript
import { MezzanineFinancingCalculatorInputs, MezzanineFinancingCalculatorMetrics, MezzanineFinancingCalculatorAnalysis } from './types';

/**
 * Calculates the maximum affordable mezzanine loan amount based on available cash flow
 * after senior debt service, ensuring the required Debt Service Coverage Ratio (DSCR).
 * 
 * Formula:
 * Cash available for mezzanine = (EBITDA - Senior Debt Service) / DSCR
 * Max Mezzanine Loan = Cash available for mezzanine / Mezzanine Interest Rate
 * 
 * Assumptions:
 * - Mezzanine financing is interest-only (common structure).
 * - All inputs are annual figures.
 * - Interest rate is provided as a decimal (e.g., 0.15 for 15%).
 * - DSCR is the minimum required coverage (e.g., 1.5).
 */
export function calculateResult(inputs: MezzanineFinancingCalculatorInputs): number {
  const { ebitda, seniorDebtService, mezzanineInterestRate, dscr } = inputs;

  // Validate inputs for production readiness
  if (ebitda <= 0 || seniorDebtService < 0 || mezzanineInterestRate <= 0 || dscr <= 0) {
    throw new Error('Invalid inputs: EBITDA must be positive, other values must be non-negative and rates/DSCR > 0');
  }
  if (ebitda <= seniorDebtService) {
    return 0; // Cannot support any mezzanine if EBITDA doesn't cover senior
  }

  const cashAvailableForMezzanine = (ebitda - seniorDebtService) / dscr;
  const maxMezzanineLoan = cashAvailableForMezzanine / mezzanineInterestRate;

  return Math.max(0, maxMezzanineLoan); // Ensure non-negative
}

/**
 * Generates an analysis for the mezzanine financing calculation, including
 * a recommendation and risk level based on key metrics.
 * 
 * Risk Assessment Logic:
 * - Low: Mezzanine rate <= 12% and DSCR >= 2.0 (conservative structure)
 * - Medium: Mezzanine rate 12-18% or DSCR 1.5-2.0 (standard)
 * - High: Mezzanine rate > 18% or DSCR < 1.5 (aggressive, higher default risk)
 * 
 * Recommendation: Provides actionable insights based on the calculated loan amount
 * relative to EBITDA and overall structure.
 */
export function generateAnalysis(
  inputs: MezzanineFinancingCalculatorInputs,
  metrics: MezzanineFinancingCalculatorMetrics
): MezzanineFinancingCalculatorAnalysis {
  const { mezzanineInterestRate, dscr, ebitda } = inputs;
  const result = metrics.result;

  // Risk level determination
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (mezzanineInterestRate <= 0.12 && dscr >= 2.0) {
    riskLevel = 'Low';
  } else if (mezzanineInterestRate > 0.18 || dscr < 1.5) {
    riskLevel = 'High';
  }

  // Implied leverage ratio for additional context (total debt service / EBITDA)
  const totalDebtService = seniorDebtService + (result * mezzanineInterestRate);
  const leverageRatio = totalDebtService / ebitda;

  // Recommendation logic
  let recommendation: string;
  if (result === 0) {
    recommendation = 'Insufficient cash flow to support mezzanine financing after senior debt obligations. Consider reducing senior debt or improving EBITDA before pursuing mezzanine.';
  } else if (riskLevel === 'Low') {
    recommendation = `You can support up to $${result.toFixed(2)} in mezzanine financing with a conservative structure. This provides flexible capital at a low-risk profile. Proceed with confidence, but monitor cash flows closely. Implied leverage: ${(leverageRatio * 100).toFixed(1)}% of EBITDA.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `Feasible to raise up to $${result.toFixed(2)} in mezzanine financing under standard terms. Evaluate equity dilution from any warrants and ensure alignment with overall capital structure. Implied leverage: ${(leverageRatio * 100).toFixed(1)}% of EBITDA. Consult with lenders for PIK options to preserve cash.`;
  } else {
    recommendation = `Maximum mezzanine capacity is $${result.toFixed(2)}, but high interest rates and low DSCR indicate elevated risk. Strongly recommend stress-testing cash flows and considering alternatives like additional equity to avoid covenant breaches. Implied leverage: ${(leverageRatio * 100).toFixed(1)}% of EBITDA – monitor for over-leveraging.`;
  }

  return { recommendation, riskLevel };
}
```