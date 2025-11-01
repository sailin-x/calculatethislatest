```typescript
import { TreasuryCalculatorInputs, TreasuryCalculatorMetrics, TreasuryCalculatorAnalysis } from './types';

/**
 * Calculates the discount yield for a Treasury Bill.
 * Formula: Discount Yield = ((Face Value - Purchase Price) / Face Value) * (360 / Days to Maturity) * 100
 * @param faceValue - The face value of the T-bill (par value at maturity).
 * @param purchasePrice - The price paid for the T-bill.
 * @param daysToMaturity - The number of days until maturity.
 * @returns The discount yield as a percentage.
 */
function calculateDiscountYield(faceValue: number, purchasePrice: number, daysToMaturity: number): number {
  if (daysToMaturity <= 0 || purchasePrice >= faceValue || faceValue <= 0) {
    throw new Error('Invalid inputs: daysToMaturity must be positive, purchasePrice < faceValue, and faceValue > 0');
  }
  const discount = (faceValue - purchasePrice) / faceValue;
  return discount * (360 / daysToMaturity) * 100;
}

/**
 * Calculates the bond equivalent yield (investment yield) for a Treasury Bill.
 * Formula: Bond Equivalent Yield = ((Face Value - Purchase Price) / Purchase Price) * (365 / Days to Maturity) * 100
 * This provides a more comparable yield metric for portfolio analysis.
 * @param faceValue - The face value of the T-bill.
 * @param purchasePrice - The price paid for the T-bill.
 * @param daysToMaturity - The number of days until maturity.
 * @returns The bond equivalent yield as a percentage.
 */
function calculateBondEquivalentYield(faceValue: number, purchasePrice: number, daysToMaturity: number): number {
  if (daysToMaturity <= 0 || purchasePrice >= faceValue || faceValue <= 0) {
    throw new Error('Invalid inputs: daysToMaturity must be positive, purchasePrice < faceValue, and faceValue > 0');
  }
  const returnOnInvestment = (faceValue - purchasePrice) / purchasePrice;
  return returnOnInvestment * (365 / daysToMaturity) * 100;
}

/**
 * Calculates the total return in dollars for the Treasury Bill.
 * Formula: Total Return = Face Value - Purchase Price
 * Useful for portfolio cash flow projections.
 * @param faceValue - The face value of the T-bill.
 * @param purchasePrice - The price paid for the T-bill.
 * @returns The total dollar return at maturity.
 */
function calculateTotalReturn(faceValue: number, purchasePrice: number): number {
  return faceValue - purchasePrice;
}

export function calculateResult(inputs: TreasuryCalculatorInputs): number {
  // Primary result: Bond Equivalent Yield (commonly used in portfolio management for comparability)
  // This is the key metric for investment decision-making in treasuries.
  return calculateBondEquivalentYield(inputs.faceValue, inputs.purchasePrice, inputs.daysToMaturity);
}

export function generateAnalysis(
  inputs: TreasuryCalculatorInputs,
  metrics: TreasuryCalculatorMetrics
): TreasuryCalculatorAnalysis {
  const bondEquivalentYield = metrics.result; // From calculateResult
  const discountYield = calculateDiscountYield(inputs.faceValue, inputs.purchasePrice, inputs.daysToMaturity);
  const totalReturn = calculateTotalReturn(inputs.faceValue, inputs.purchasePrice);

  // Risk assessment for treasuries: Always low due to US government backing,
  // but adjust slightly based on maturity length (shorter = lower liquidity risk).
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.daysToMaturity > 365) {
    riskLevel = 'Low'; // Still low, but longer maturity introduces minor interest rate risk.
  } else if (inputs.daysToMaturity > 180) {
    riskLevel = 'Low';
  } // Shorter maturities remain low risk.

  // Recommendation based on yield relative to typical short-term rates (e.g., assume 5% benchmark for analysis).
  // In production, this could integrate with current market data.
  let recommendation: string;
  if (bondEquivalentYield > 5) {
    recommendation = `This T-bill offers a competitive bond equivalent yield of ${bondEquivalentYield.toFixed(2)}%, providing a safe, short-term option for preserving capital in your portfolio while earning above-benchmark returns. Consider allocating if seeking liquidity with minimal credit risk.`;
  } else if (bondEquivalentYield >= 2) {
    recommendation = `The bond equivalent yield of ${bondEquivalentYield.toFixed(2)}% is suitable for conservative portfolio diversification. It ensures principal protection with modest income, ideal for cash equivalents.`;
  } else {
    recommendation = `With a bond equivalent yield of ${bondEquivalentYield.toFixed(2)}%, this T-bill is best for UltraShortTerm parking of funds in a low-interest environment. Evaluate against inflation to avoid erosion of purchasing power.`;
  }

  // Include additional insights for portfolio context
  recommendation += ` Discount yield: ${discountYield.toFixed(2)}%. Expected total return: $${totalReturn.toFixed(2)}.`;

  return { recommendation, riskLevel };
}
```