```typescript
import { CorporateTaxShieldCalculatorInputs, CorporateTaxShieldCalculatorMetrics, CorporateTaxShieldCalculatorAnalysis } from './types';

/**
 * Calculates the present value of the corporate tax shield from debt interest deductibility.
 * Formula: Annual Tax Shield = Corporate Tax Rate × (Interest Rate × Debt Amount)
 * PV = Annual Tax Shield × [1 - (1 + Discount Rate)^(-Years)] / Discount Rate
 * Assumes constant debt level and annual payments. If Discount Rate = 0, uses simple sum.
 * This is the standard formula for the finite annuity present value of tax shields in the Adjusted Present Value (APV) method.
 */
function presentValueOfAnnuity(payment: number, rate: number, periods: number): number {
  if (periods <= 0) return 0;
  if (rate === 0) return payment * periods;
  return payment * (1 - Math.pow(1 + rate, -periods)) / rate;
}

export function calculateResult(inputs: CorporateTaxShieldCalculatorInputs): number {
  const { debtAmount, interestRate, corporateTaxRate, years, discountRate = interestRate } = inputs; // Default discountRate to interestRate if not provided (common assumption for riskless tax shield)

  // Input validation (basic; assume full validation in calling code)
  if (debtAmount <= 0 || interestRate < 0 || corporateTaxRate < 0 || corporateTaxRate > 1 || years <= 0 || discountRate < 0) {
    return 0; // Invalid inputs yield no tax shield
  }

  const annualInterestExpense = interestRate * debtAmount;
  const annualTaxShield = corporateTaxRate * annualInterestExpense;
  const pvTaxShield = presentValueOfAnnuity(annualTaxShield, discountRate, years);

  return pvTaxShield;
}

export function generateAnalysis(
  inputs: CorporateTaxShieldCalculatorInputs,
  metrics: CorporateTaxShieldCalculatorMetrics
): CorporateTaxShieldCalculatorAnalysis {
  const result = metrics.result;
  const { debtAmount, interestRate, corporateTaxRate, years } = inputs;

  // Risk assessment: Based on leverage implied by interest rate and debt duration
  // High risk if high interest or long-term debt (increased financial risk from leverage)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const effectiveLeverage = interestRate * years; // Proxy for cumulative interest burden
  if (effectiveLeverage > 2.0 || corporateTaxRate > 0.3) {
    riskLevel = 'High'; // High leverage or aggressive tax planning increases bankruptcy risk
  } else if (effectiveLeverage > 1.0) {
    riskLevel = 'Medium';
  }

  // Recommendation: Domain-specific advice for investment portfolio context
  // Emphasize tax benefits in APV for leveraged investments, but caution on risks
  const taxBenefitPercentage = debtAmount > 0 ? (result / debtAmount) * 100 : 0;
  const recommendation = `The present value of the corporate tax shield is $${result.toFixed(2)}, representing a ${taxBenefitPercentage.toFixed(2)}% benefit relative to the debt amount. In an investment portfolio, this enhances the adjusted present value (APV) of leveraged assets. Recommendation: Incorporate this shield into DCF or APV models for debt-financed projects, but monitor interest coverage to mitigate default risk. If risk level is High, consider reducing leverage or hedging interest rates.`;

  return { recommendation, riskLevel };
}
```