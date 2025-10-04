```typescript
import { REITCalculatorInputs, REITCalculatorMetrics, REITCalculatorAnalysis } from './types';

/**
 * Calculates the net yield percentage after deducting management fees.
 * Formula: netYield = grossYield - managementFee
 * @param grossYield - The gross annual dividend yield in percentage.
 * @param managementFee - The annual management fee in percentage.
 * @returns The net yield in percentage.
 */
function calculateNetYield(grossYield: number, managementFee: number): number {
  return Math.max(0, grossYield - managementFee); // Ensure non-negative
}

/**
 * Calculates the total investment amount allocated to REITs in the portfolio.
 * Formula: reitInvestment = totalPortfolioValue * (reitAllocation / 100)
 * @param totalPortfolioValue - The total value of the investment portfolio.
 * @param reitAllocation - The percentage allocation to REITs.
 * @returns The REIT investment amount.
 */
function calculateREITInvestment(totalPortfolioValue: number, reitAllocation: number): number {
  if (totalPortfolioValue <= 0 || reitAllocation <= 0) {
    return 0;
  }
  return totalPortfolioValue * (reitAllocation / 100);
}

/**
 * Calculates the expected total return percentage for the REIT portion, including yield and appreciation.
 * Formula: totalReturn = netYield + expectedAppreciation
 * @param netYield - The net yield after fees.
 * @param expectedAppreciation - The expected annual capital appreciation in percentage.
 * @returns The total expected return in percentage.
 */
function calculateTotalREITReturn(netYield: number, expectedAppreciation: number): number {
  return netYield + Math.max(0, expectedAppreciation); // Appreciation cannot be negative in this model
}

/**
 * Assesses the risk level based on REIT allocation percentage.
 * REITs are typically medium-risk assets; higher allocation increases portfolio concentration risk.
 * @param reitAllocation - The percentage allocation to REITs.
 * @returns 'Low', 'Medium', or 'High' risk level.
 */
function assessRiskLevel(reitAllocation: number): 'Low' | 'Medium' | 'High' {
  if (reitAllocation < 10) {
    return 'Low';
  } else if (reitAllocation <= 30) {
    return 'Medium';
  } else {
    return 'High';
  }
}

export function calculateResult(inputs: REITCalculatorInputs): number {
  // Validate inputs
  if (inputs.totalPortfolioValue <= 0 || inputs.reitAllocation <= 0 || inputs.averageREITYield <= 0) {
    return 0;
  }

  // Calculate REIT investment amount
  const reitInvestment = calculateREITInvestment(inputs.totalPortfolioValue, inputs.reitAllocation);

  // Calculate net yield
  const netYield = calculateNetYield(inputs.averageREITYield, inputs.managementFee);

  // Calculate expected annual income from REITs
  // Formula: annualIncome = reitInvestment * (netYield / 100)
  const annualIncome = reitInvestment * (netYield / 100);

  return Math.round(annualIncome * 100) / 100; // Round to 2 decimal places for currency
}

export function generateAnalysis(
  inputs: REITCalculatorInputs,
  metrics: REITCalculatorMetrics
): REITCalculatorAnalysis {
  const annualIncome = metrics.result;
  const netYield = calculateNetYield(inputs.averageREITYield, inputs.managementFee);
  const totalReturn = calculateTotalREITReturn(netYield, inputs.expectedAppreciation);
  const riskLevel = assessRiskLevel(inputs.reitAllocation);

  // Generate recommendation based on net yield and total return
  // REITs with yields >8% are attractive for income; consider total return for growth
  let recommendation: string;
  if (netYield > 8 && totalReturn > 10) {
    recommendation = 'Strong buy recommendation: High-yielding REIT allocation provides attractive income and growth potential. Consider increasing allocation if risk tolerance allows.';
  } else if (netYield > 5 && totalReturn > 7) {
    recommendation = 'Moderate buy: Solid income generation from REITs with balanced growth. Suitable for diversified portfolios.';
  } else if (netYield > 3) {
    recommendation = 'Hold: REITs offer steady income but monitor for better opportunities in rising interest rate environments.';
  } else {
    recommendation = 'Sell or avoid: Low yield and return suggest reallocating to higher-performing assets like equities or bonds.';
  }

  // Include additional insights
  const analysis = {
    recommendation,
    riskLevel,
    insights: [
      `Projected annual income from REITs: $${annualIncome.toFixed(2)}`,
      `Net yield after fees: ${netYield.toFixed(2)}%`,
      `Expected total REIT return (yield + appreciation): ${totalReturn.toFixed(2)}%`,
      `REIT allocation impact: ${inputs.reitAllocation}% allocation contributes to portfolio diversification but increases real estate sector exposure.`
    ]
  };

  return analysis;
}
```