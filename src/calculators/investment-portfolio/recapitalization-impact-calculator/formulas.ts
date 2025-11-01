```typescript
import { 
  RecapitalizationImpactCalculatorInputs, 
  RecapitalizationImpactCalculatorMetrics, 
  RecapitalizationImpactCalculatorAnalysis 
} from './types';

// Domain-specific helper functions for recapitalization impact calculations
function calculateTaxShield(debtIssued: number, taxRate: number): number {
  // Perpetual tax shield under Modigliani-Miller with corporate taxes: Tc * D
  return debtIssued * taxRate;
}

function calculateNewEquityValue(
  totalEquityValue: number, 
  debtIssued: number, 
  taxRate: number
): number {
  // New equity value after leveraged recapitalization: V_U + Tc*D - D
  // Assuming pre-recap equity approximates unlevered firm value (no prior debt)
  const taxShield = calculateTaxShield(debtIssued, taxRate);
  return totalEquityValue + taxShield - debtIssued;
}

function calculatePostRecapLeverage(
  debtIssued: number, 
  newEquityValue: number
): number {
  // DebtToEquity ratio post-recapitalization
  return newEquityValue > 0 ? debtIssued / newEquityValue : Infinity;
}

function calculateOwnershipFraction(
  investmentValue: number, 
  totalEquityValue: number
): number {
  // Pro-rata ownership of the investment in the company's equity
  return totalEquityValue > 0 ? investmentValue / totalEquityValue : 0;
}

export function calculateResult(inputs: RecapitalizationImpactCalculatorInputs): number {
  // Calculate the net positive impact on the portfolio investment value from the tax shield
  // in a leveraged recapitalization (assuming shareholder does not tender shares)
  const ownershipFraction = calculateOwnershipFraction(
    inputs.investmentValue, 
    inputs.totalEquityValue
  );
  const taxShield = calculateTaxShield(inputs.debtIssued, inputs.taxRate);
  const impact = ownershipFraction * taxShield;
  
  // Return the value increase (positive impact); in production, handle edge cases like negative debt
  return Math.max(0, impact);
}

export function generateAnalysis(
  inputs: RecapitalizationImpactCalculatorInputs, 
  metrics: RecapitalizationImpactCalculatorMetrics
): RecapitalizationImpactCalculatorAnalysis {
  const result = metrics.result;
  const newEquityValue = calculateNewEquityValue(
    inputs.totalEquityValue, 
    inputs.debtIssued, 
    inputs.taxRate
  );
  const leverageRatio = calculatePostRecapLeverage(inputs.debtIssued, newEquityValue);
  
  // InvestmentPortfolioSpecific risk assessment:
  // - Low: Leverage < 0.5 (conservative post-recap structure)
  // - Medium: 0.5 <= Leverage < 1.5 (moderate increase in financial risk)
  // - High: Leverage >= 1.5 (significant default risk, potential value erosion)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (leverageRatio >= 1.5) {
    riskLevel = 'High';
  } else if (leverageRatio >= 0.5) {
    riskLevel = 'Medium';
  }

  // Generate recommendation based on impact magnitude and risk
  // Thresholds: Significant impact if >5% of investment value; consider portfolio diversification
  const impactPercentage = inputs.investmentValue > 0 ? (result / inputs.investmentValue) * 100 : 0;
  let recommendation: string;
  if (impactPercentage > 5 && riskLevel === 'Low') {
    recommendation = 'Proceed with the recapitalization; the tax shield provides meaningful value uplift to your portfolio holding with minimal added risk.';
  } else if (impactPercentage > 5 && riskLevel === 'Medium') {
    recommendation = 'Consider the recapitalization cautiously; benefits from tax shield are notable, but monitor increased leverage for potential volatility in returns.';
  } else if (riskLevel === 'High') {
    recommendation = 'Avoid or hedge the recapitalization; high post-recap leverage elevates default risk, potentially outweighing tax shield benefits in your portfolio.';
  } else {
    recommendation = 'The recapitalization offers limited impact; evaluate broader portfolio implications before adjusting exposure.';
  }

  return { recommendation, riskLevel };
}
```