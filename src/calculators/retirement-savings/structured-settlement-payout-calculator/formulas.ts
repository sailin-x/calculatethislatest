```typescript
import { 
  StructuredSettlementPayoutCalculatorInputs, 
  StructuredSettlementPayoutCalculatorMetrics, 
  StructuredSettlementPayoutCalculatorAnalysis 
} from './types';

/**
 * Calculates the present value of an ordinary annuity for a structured settlement.
 * Formula: PV = PMT × [1 - (1 + r)^(-n)] / r
 * Where PMT is the monthly payment, r is the monthly discount rate, n is the number of payments.
 * If r = 0, PV = PMT × n (undiscounted total).
 * 
 * @param pmt - Monthly payment amount
 * @param n - Number of remaining monthly payments
 * @param annualDiscountRate - Annual discount rate as a percentage (e.g., 5 for 5%)
 * @param annualInflationRate - Annual inflation rate as a percentage (optional, defaults to 0)
 * @returns Present value adjusted for inflation if provided
 */
function calculatePresentValue(
  pmt: number,
  n: number,
  annualDiscountRate: number,
  annualInflationRate: number = 0
): number {
  if (n <= 0 || pmt <= 0) {
    return 0;
  }

  const monthlyDiscountRate = (annualDiscountRate / 100) / 12;
  const monthlyInflationRate = (annualInflationRate / 100) / 12;
  const realMonthlyRate = monthlyDiscountRate - monthlyInflationRate;

  if (realMonthlyRate === 0) {
    // If real rate is zero, use undiscounted total
    return pmt * n;
  }

  // Adjust for inflation by using real rate
  const pvFactor = (1 - Math.pow(1 + realMonthlyRate, -n)) / realMonthlyRate;
  return pmt * pvFactor;
}

/**
 * Calculates the total undiscounted payout over the remaining term.
 * 
 * @param monthlyPayment - Monthly payment amount
 * @param remainingPayments - Number of remaining monthly payments
 * @returns Total undiscounted payout
 */
function calculateTotalUndiscountedPayout(
  monthlyPayment: number,
  remainingPayments: number
): number {
  if (remainingPayments <= 0 || monthlyPayment <= 0) {
    return 0;
  }
  return monthlyPayment * remainingPayments;
}

/**
 * Assesses the discount factor as a percentage of total undiscounted value.
 * 
 * @param presentValue - Calculated present value
 * @param totalUndiscounted - Total undiscounted payout
 * @returns Discount factor as a percentage (0-100)
 */
function calculateDiscountFactor(
  presentValue: number,
  totalUndiscounted: number
): number {
  if (totalUndiscounted <= 0) {
    return 0;
  }
  return ((totalUndiscounted - presentValue) / totalUndiscounted) * 100;
}

export function calculateResult(inputs: StructuredSettlementPayoutCalculatorInputs): number {
  const { monthlyPayment, remainingPayments, annualDiscountRate, annualInflationRate = 0 } = inputs;

  // Validate inputs
  if (monthlyPayment <= 0 || remainingPayments <= 0 || annualDiscountRate < 0) {
    return 0;
  }

  return calculatePresentValue(monthlyPayment, remainingPayments, annualDiscountRate, annualInflationRate);
}

export function generateAnalysis(
  inputs: StructuredSettlementPayoutCalculatorInputs,
  metrics: StructuredSettlementPayoutCalculatorMetrics
): StructuredSettlementPayoutCalculatorAnalysis {
  const { monthlyPayment, remainingPayments, annualDiscountRate, annualInflationRate = 0 } = inputs;
  const presentValue = metrics.result;
  const totalUndiscounted = calculateTotalUndiscountedPayout(monthlyPayment, remainingPayments);
  const discountFactor = calculateDiscountFactor(presentValue, totalUndiscounted);

  // Risk assessment: Based on discount factor and rate vs. inflation
  // High risk if discount > 20% or discount rate significantly exceeds inflation (indicating poor lump-sum deal)
  // Medium if 10-20% discount or rate slightly above inflation
  // Low if <10% discount or rate below/equal to inflation (favorable for keeping structured)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const rateDiff = annualDiscountRate - annualInflationRate;
  if (discountFactor > 20 || rateDiff > 5) {
    riskLevel = 'High';
  } else if (discountFactor > 10 || rateDiff > 2) {
    riskLevel = 'Medium';
  }

  // Recommendation logic
  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = `The present value of your structured settlement is $${presentValue.toFixed(2)}, representing ${((presentValue / totalUndiscounted) * 100).toFixed(1)}% of the total undiscounted payout of $${totalUndiscounted.toFixed(2)}. With a low discount factor of ${(discountFactor).toFixed(1)}%, it is advisable to retain the structured payments for steady retirement income, especially since the discount rate (${annualDiscountRate}%) is close to or below inflation (${annualInflationRate}%).`;
  } else if (riskLevel === 'Medium') {
    recommendation = `The present value is $${presentValue.toFixed(2)}, or ${((presentValue / totalUndiscounted) * 100).toFixed(1)}% of the total $${totalUndiscounted.toFixed(2)} undiscounted. A medium discount of ${(discountFactor).toFixed(1)}% suggests evaluating lump-sum options carefully; consult a financial advisor to compare against investment returns.`;
  } else {
    recommendation = `Your structured settlement's present value is $${presentValue.toFixed(2)}, only ${((presentValue / totalUndiscounted) * 100).toFixed(1)}% of the $${totalUndiscounted.toFixed(2)} total, with a high discount of ${(discountFactor).toFixed(1)}%. The discount rate (${annualDiscountRate}%) exceeds inflation by ${rateDiff}%, indicating a potentially unfavorable lump-sum sale. Strongly recommend keeping the payments or seeking better offers for retirement stability.`;
  }

  return { recommendation, riskLevel };
}
```