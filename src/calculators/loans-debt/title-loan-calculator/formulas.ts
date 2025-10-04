```typescript
import { TitleLoanCalculatorInputs, TitleLoanCalculatorMetrics, TitleLoanCalculatorAnalysis } from './types';

/**
 * Calculates the maximum loan amount based on vehicle value and loan-to-value (LTV) ratio.
 * LTV is typically 25-50% for title loans to mitigate risk on depreciating assets.
 * @param vehicleValue - The appraised wholesale value of the vehicle.
 * @param ltvRatio - Loan-to-value ratio (e.g., 0.5 for 50%).
 * @returns The maximum eligible loan principal.
 */
function calculateLoanAmount(vehicleValue: number, ltvRatio: number): number {
  return vehicleValue * ltvRatio;
}

/**
 * Calculates the total interest for a title loan using simple interest formula.
 * Title loans often use simple interest due to short terms (e.g., 30 days).
 * Formula: Interest = Principal * (APR / 100) * (Term in years)
 * Since terms are monthly, convert to years: TermMonths / 12.
 * @param principal - The loan amount.
 * @param apr - Annual Percentage Rate (e.g., 300 for high-risk title loans).
 * @param termMonths - Loan term in months (typically 1-12).
 * @returns The total interest amount.
 */
function calculateSimpleInterest(principal: number, apr: number, termMonths: number): number {
  const annualRate = apr / 100;
  const termYears = termMonths / 12;
  return principal * annualRate * termYears;
}

/**
 * Calculates any origination fees, common in title loans (e.g., 10% of principal or flat fee).
 * For production use, this can be adjusted based on lender policies; here using a percentage.
 * @param principal - The loan amount.
 * @param feeRate - Fee rate as a decimal (e.g., 0.10 for 10%).
 * @returns The fee amount.
 */
function calculateOriginationFee(principal: number, feeRate: number): number {
  return principal * feeRate;
}

/**
 * Main calculation function for title loan total repayment.
 * Combines loan amount, simple interest, and fees to get total due at maturity.
 * Title loans are typically balloon payments due at end of term.
 * @param inputs - Input parameters for the calculator.
 * @returns The total repayment amount (principal + interest + fees).
 */
export function calculateResult(inputs: TitleLoanCalculatorInputs): number {
  const principal = calculateLoanAmount(inputs.vehicleValue, inputs.ltvRatio);
  const interest = calculateSimpleInterest(principal, inputs.apr, inputs.termMonths);
  const fees = calculateOriginationFee(principal, inputs.feeRate);
  return principal + interest + fees;
}

/**
 * Generates a detailed analysis for the title loan, including risk assessment.
 * Risk is evaluated based on LTV (over 50% increases risk due to vehicle depreciation),
 * APR (over 200% is predatory/high-risk), and term (short terms amplify pressure).
 * Recommendation provides debt management advice tailored to title loans' high-cost nature.
 * @param inputs - Original inputs for context.
 * @param metrics - Calculated metrics including the result.
 * @returns Analysis object with recommendation and risk level.
 */
export function generateAnalysis(
  inputs: TitleLoanCalculatorInputs,
  metrics: TitleLoanCalculatorMetrics
): TitleLoanCalculatorAnalysis {
  const principal = calculateLoanAmount(inputs.vehicleValue, inputs.ltvRatio);
  const totalRepayment = metrics.result;
  const effectiveCost = ((totalRepayment - principal) / principal) * 100; // Approximate total cost percentage

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  // Risk logic: High if LTV > 0.5 (over-leveraged on asset) or APR > 200 (predatory rates)
  // or term < 3 months (default pressure); Medium otherwise; Low rare for title loans
  if (inputs.ltvRatio > 0.5 || inputs.apr > 200 || inputs.termMonths < 3) {
    riskLevel = 'High';
  } else if (inputs.apr > 100 || effectiveCost > 25) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  let recommendation: string;
  if (riskLevel === 'High') {
    recommendation = `This title loan carries significant risk due to high LTV (${(inputs.ltvRatio * 100).toFixed(0)}%) and APR (${inputs.apr}%). Total cost is approximately ${effectiveCost.toFixed(1)}% of principal. Strongly consider alternatives like personal loans or credit unions to avoid vehicle repossession. If proceeding, ensure you can repay in ${inputs.termMonths} months to protect your asset.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `Moderate risk with APR at ${inputs.apr}%. The loan totals $${totalRepayment.toFixed(2)} due in ${inputs.termMonths} months. Budget strictly for repayment to prevent default fees or loss of title. Explore refinancing options post-approval if rates improve.`;
  } else {
    recommendation = `Lower risk profile for a title loan. Total repayment is $${totalRepayment.toFixed(2)}. Monitor vehicle value depreciation and repay early if possible to minimize interest costs.`;
  }

  return { recommendation, riskLevel };
}
```