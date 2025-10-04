```typescript
import { RoyaltyFinancingCalculatorInputs, RoyaltyFinancingCalculatorMetrics, RoyaltyFinancingCalculatorAnalysis } from './types';

// Helper function to calculate the present value of an annuity (royalty stream)
// Formula: PV = PMT * [1 - (1 + r)^(-n)] / r, where PMT is annual payment, r is discount rate, n is periods
// Handles r = 0 edge case: PV = PMT * n
function calculatePVOfAnnuity(annualPayment: number, discountRate: number, termYears: number): number {
  if (discountRate === 0) {
    return annualPayment * termYears;
  }
  return annualPayment * (1 - Math.pow(1 + discountRate, -termYears)) / discountRate;
}

// Additional helper for total undiscounted royalty income (for metrics and analysis)
function calculateTotalUndiscountedRoyalties(annualPayment: number, termYears: number): number {
  return annualPayment * termYears;
}

export function calculateResult(inputs: RoyaltyFinancingCalculatorInputs): number {
  // Calculate annual royalty payment: percentage of annual revenue
  const annualRoyaltyPayment = inputs.royaltyPercentage * inputs.annualRevenue;

  // Calculate present value of the royalty stream using annuity formula
  const presentValue = calculatePVOfAnnuity(annualRoyaltyPayment, inputs.discountRate, inputs.termYears);

  // NPV = PV of royalties - initial principal investment
  const npv = presentValue - inputs.principal;

  return npv;
}

export function generateAnalysis(
  inputs: RoyaltyFinancingCalculatorInputs,
  metrics: RoyaltyFinancingCalculatorMetrics
): RoyaltyFinancingCalculatorAnalysis {
  const npv = metrics.result;
  const annualRoyaltyPayment = metrics.annualRoyaltyPayment;
  const totalUndiscounted = calculateTotalUndiscountedRoyalties(annualRoyaltyPayment, inputs.termYears);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation: string;

  // Risk assessment: Based on term length (longer terms increase exposure to revenue uncertainty in royalty financing)
  // and royalty rate (higher rates may indicate higher underlying business risk)
  if (inputs.termYears > 10 || inputs.royaltyPercentage > 0.10) {
    riskLevel = 'High';
  } else if (inputs.termYears > 5 || inputs.royaltyPercentage > 0.05) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  // Recommendation logic: Positive NPV suggests value creation; consider total return multiple
  const returnMultiple = totalUndiscounted / inputs.principal;
  if (npv > 0 && returnMultiple > 1.5) {
    recommendation = `This royalty financing deal shows strong potential with an NPV of $${npv.toFixed(2)} and an expected undiscounted return multiple of ${returnMultiple.toFixed(2)}x over ${inputs.termYears} years. Proceed with the investment, but monitor revenue projections closely.`;
  } else if (npv > 0) {
    recommendation = `The deal has a positive NPV of $${npv.toFixed(2)}, indicating viability. Consider proceeding, but negotiate for a higher royalty rate or shorter term to improve returns.`;
  } else {
    recommendation = `Negative NPV of $${npv.toFixed(2)} suggests the current terms do not create value for the investor. Reevaluate revenue assumptions, increase the royalty rate to ${((inputs.royaltyPercentage * 1.2) * 100).toFixed(1)}%, or avoid the deal.`;
  }

  return { recommendation, riskLevel };
}
```