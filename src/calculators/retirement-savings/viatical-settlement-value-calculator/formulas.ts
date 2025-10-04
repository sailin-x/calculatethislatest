```typescript
import { ViaticalSettlementValueCalculatorInputs, ViaticalSettlementValueCalculatorMetrics, ViaticalSettlementValueCalculatorAnalysis } from './types';

/**
 * Calculates the present value of a single future payment.
 * @param amount - The future amount to discount.
 * @param monthlyRate - The monthly discount rate.
 * @param periods - The number of months.
 * @returns The present value.
 */
function pvSingle(amount: number, monthlyRate: number, periods: number): number {
  if (periods <= 0) return amount;
  return amount / Math.pow(1 + monthlyRate, periods);
}

/**
 * Calculates the present value of an ordinary annuity (payments at end of period).
 * @param monthlyPayment - The payment amount per period.
 * @param monthlyRate - The monthly discount rate.
 * @param periods - The number of periods.
 * @returns The present value of the annuity.
 */
function pvAnnuity(monthlyPayment: number, monthlyRate: number, periods: number): number {
  if (monthlyRate === 0) {
    return monthlyPayment * periods;
  }
  if (periods <= 0) {
    return 0;
  }
  return monthlyPayment * (1 - Math.pow(1 + monthlyRate, -periods)) / monthlyRate;
}

/**
 * Main calculation for viatical settlement value.
 * Formula: Settlement Value = PV(Death Benefit) - PV(Future Premiums)
 * - Assumes monthly compounding and premium payments.
 * - Default annual discount rate of 10% if not provided (common for viatical investments).
 * - Life expectancy in months; premiums assumed paid monthly until death.
 * - This is a simplified model; real settlements include provider margins, costs, and underwriting.
 */
export function calculateResult(inputs: ViaticalSettlementValueCalculatorInputs): number {
  const { deathBenefit, annualPremium, lifeExpectancyInMonths, discountRate } = inputs;
  
  if (deathBenefit <= 0 || lifeExpectancyInMonths <= 0 || annualPremium < 0) {
    return 0; // Invalid inputs
  }

  const annualDiscountRate = discountRate ?? 0.10; // Default 10% annual
  const monthlyRate = (Math.pow(1 + annualDiscountRate, 1 / 12) - 1); // Effective monthly rate
  const monthlyPremium = annualPremium / 12;
  const periods = lifeExpectancyInMonths;

  const pvDeathBenefit = pvSingle(deathBenefit, monthlyRate, periods);
  const pvFuturePremiums = pvAnnuity(monthlyPremium, monthlyRate, periods);

  // Subtract provider's expected costs; in practice, apply a margin (e.g., 80% of net PV for profit)
  // Here, we use a conservative 85% factor to account for typical provider margins and costs
  const netPv = pvDeathBenefit - pvFuturePremiums;
  const settlementValue = netPv * 0.85;

  return Math.max(0, settlementValue); // Ensure non-negative
}

export function generateAnalysis(
  inputs: ViaticalSettlementValueCalculatorInputs,
  metrics: ViaticalSettlementValueCalculatorMetrics
): ViaticalSettlementValueCalculatorAnalysis {
  const result = metrics.result;
  const { deathBenefit, lifeExpectancyInMonths } = inputs;

  // Risk level assessment for the seller (higher settlement % = lower risk of suboptimal deal)
  // Also considers life expectancy: shorter LE typically yields higher % of face value
  const settlementPercentage = deathBenefit > 0 ? (result / deathBenefit) * 100 : 0;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  if (lifeExpectancyInMonths < 12 && settlementPercentage > 70) {
    riskLevel = 'Low'; // Favorable for seller: high payout, imminent benefit
  } else if (lifeExpectancyInMonths >= 24 || settlementPercentage < 40) {
    riskLevel = 'High'; // Less favorable: longer wait or low payout
  } else {
    riskLevel = 'Medium';
  }

  // Recommendation based on settlement value relative to face value and LE
  let recommendation = '';
  if (settlementPercentage > 60) {
    recommendation = 'The estimated viatical settlement offers a strong lump sum compared to the policy\'s face value. Consult a licensed viatical broker and financial advisor to explore this option as part of your retirement planning, ensuring it aligns with your overall savings strategy.';
  } else if (settlementPercentage > 30) {
    recommendation = 'The settlement value is moderate. Compare this to your policy\'s cash surrender value and consider tax implications. Professional advice is recommended before proceeding.';
  } else {
    recommendation = 'The calculated value is low, possibly due to longer life expectancy or high premiums. It may not be advantageous to pursue a viatical settlement at this time; review alternatives like policy loans or lapse.';
  }

  recommendation += ' Note: This is an estimate; actual offers depend on underwriting, market conditions, and provider terms. Viatical settlements are irreversible and may have tax consequences.';

  return { recommendation, riskLevel };
}
```