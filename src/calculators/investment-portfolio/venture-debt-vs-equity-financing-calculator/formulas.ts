```typescript
import { VentureDebtvsEquityFinancingCalculatorInputs, VentureDebtvsEquityFinancingCalculatorMetrics, VentureDebtvsEquityFinancingCalculatorAnalysis } from './types';

// Domain-specific helper functions for venture debt vs. equity financing calculations
// These use real investment business logic: dilution percentages based on pre-money valuation and financing amount.
// Equity dilution: percentage of ownership given up = (amount raised) / (pre-money + amount raised) * 100
// Debt dilution: effective ownership dilution from warrants = (warrant coverage %) * (loan amount / pre-money valuation) * 100
// Interest cost: simple interest over term (common approximation for venture debt analysis; actual may include compounding or interest-only structure)

function calculateEquityDilution(inputs: { amount: number; preMoneyValuation: number }): number {
  if (inputs.preMoneyValuation <= 0 || inputs.amount <= 0) {
    throw new Error('Pre-money valuation and amount must be positive');
  }
  const postMoneyValuation = inputs.preMoneyValuation + inputs.amount;
  return (inputs.amount / postMoneyValuation) * 100;
}

function calculateDebtDilution(inputs: { amount: number; preMoneyValuation: number; warrantCoverage: number }): number {
  if (inputs.preMoneyValuation <= 0 || inputs.amount <= 0 || inputs.warrantCoverage < 0) {
    throw new Error('Pre-money valuation and amount must be positive; warrant coverage must be non-negative');
  }
  return (inputs.warrantCoverage / 100) * (inputs.amount / inputs.preMoneyValuation) * 100;
}

function calculateInterestCost(inputs: { amount: number; interestRate: number; termYears: number }): number {
  if (inputs.amount <= 0 || inputs.interestRate <= 0 || inputs.termYears <= 0) {
    throw new Error('Amount, interest rate, and term must be positive');
  }
  // Simple interest total: principal * rate * time (annual basis; suitable for high-level venture debt comparison)
  // Note: Real venture debt often uses interest-only with balloon principal; this approximates total interest outflow
  return inputs.amount * (inputs.interestRate / 100) * inputs.termYears;
}

export function calculateResult(inputs: VentureDebtvsEquityFinancingCalculatorInputs): number {
  // Core result: dilution savings percentage by choosing venture debt over equity
  // Positive value indicates debt is less dilutive; calculated as equity dilution minus debt dilution
  // This is a key metric in venture financing comparisons to assess ownership retention impact
  const equityDilution = calculateEquityDilution({ amount: inputs.amount, preMoneyValuation: inputs.preMoneyValuation });
  const debtDilution = calculateDebtDilution({ 
    amount: inputs.amount, 
    preMoneyValuation: inputs.preMoneyValuation, 
    warrantCoverage: inputs.warrantCoverage 
  });
  const dilutionSavings = equityDilution - debtDilution;
  
  // Validate inputs for realism (e.g., pre-money > 0, amount reasonable relative to valuation)
  if (inputs.preMoneyValuation <= 0 || inputs.amount <= 0 || inputs.amount > inputs.preMoneyValuation * 0.5) {
    throw new Error('Invalid inputs: Pre-money valuation must be positive, amount positive, and typically <= 50% of pre-money for venture rounds');
  }
  
  return dilutionSavings;
}

export function generateAnalysis(
  inputs: VentureDebtvsEquityFinancingCalculatorInputs, 
  metrics: VentureDebtvsEquityFinancingCalculatorMetrics
): VentureDebtvsEquityFinancingCalculatorAnalysis {
  const dilutionSavings = metrics.result;
  const equityDilution = calculateEquityDilution({ amount: inputs.amount, preMoneyValuation: inputs.preMoneyValuation });
  const debtDilution = calculateDebtDilution({ 
    amount: inputs.amount, 
    preMoneyValuation: inputs.preMoneyValuation, 
    warrantCoverage: inputs.warrantCoverage 
  });
  const interestCost = calculateInterestCost({ 
    amount: inputs.amount, 
    interestRate: inputs.interestRate, 
    termYears: inputs.termYears 
  });

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation: string;

  // Risk assessment: Equity has no repayment risk (low-medium); debt risk based on interest rate and term
  // High rate (>15%) or long term (>3 years) increases default risk in volatile startup environments
  const debtRiskFactor = inputs.interestRate > 15 || inputs.termYears > 3 ? 'High' : 'Medium';
  riskLevel = dilutionSavings > 0 ? debtRiskFactor : 'Low';  // Equity default if debt not advantageous

  if (dilutionSavings > 10) {
    // Significant savings: strongly recommend debt for ownership preservation
    recommendation = `Venture Debt is recommended. It saves ${dilutionSavings.toFixed(2)}% in dilution compared to equity (${equityDilution.toFixed(2)}% vs. ${debtDilution.toFixed(2)}%). However, factor in $${interestCost.toFixed(0)} total interest cost over ${inputs.termYears} years at ${inputs.interestRate}% rate. Suitable for capital-efficient growth without heavy dilution.`;
  } else if (dilutionSavings > 0) {
    // Marginal benefit: recommend debt if cash flow supports repayment
    recommendation = `Venture Debt slightly edges out equity with ${dilutionSavings.toFixed(2)}% dilution savings (${equityDilution.toFixed(2)}% vs. ${debtDilution.toFixed(2)}%). Total interest: $${interestCost.toFixed(0)}. Consider if your runway covers the ${inputs.termYears}-year term and ${inputs.interestRate}% rate without straining operations.`;
  } else {
    // Equity better: lower effective dilution or negative savings
    recommendation = `Equity Financing is preferable, avoiding ${debtDilution.toFixed(2)}% warrant dilution and $${interestCost.toFixed(0)} interest costs. Equity dilution is ${equityDilution.toFixed(2)}%, but provides no repayment obligations. Ideal if seeking strategic investor value beyond capital.`;
  }

  // Append risk-specific advice
  if (riskLevel === 'High') {
    recommendation += ' High risk due to elevated interest rate or term—ensure strong revenue traction before proceeding with debt.';
  } else if (riskLevel === 'Medium') {
    recommendation += ' Medium risk: Balance dilution savings against debt servicing in your financial model.';
  } else {
    recommendation += ' Low risk: Straightforward path with minimal financial leverage concerns.';
  }

  return { recommendation, riskLevel };
}
```