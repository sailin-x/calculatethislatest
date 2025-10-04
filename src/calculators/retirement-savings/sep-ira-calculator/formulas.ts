```typescript
import { SEPIRACalculatorInputs, SEPIRACalculatorMetrics, SEPIRACalculatorAnalysis } from './types';

const ANNUAL_CONTRIBUTION_LIMIT_2024 = 69000; // IRS limit for 2024; update as needed for future years
const SE_TAX_RATE = 0.153;
const SE_INCOME_BASE_FACTOR = 0.9235;
const SEP_RATE = 0.25;
const EFFECTIVE_SEP_RATE_FOR_SELF_EMPLOYED = SEP_RATE / (1 + SEP_RATE); // 0.2

function calculateMaxSEPContribution(annualIncome: number, isSelfEmployed: boolean): number {
  if (annualIncome <= 0) return 0;

  let maxContrib: number;

  if (!isSelfEmployed) {
    // For employees: 25% of compensation
    maxContrib = SEP_RATE * annualIncome;
  } else {
    // For self-employed: Adjust for self-employment tax deduction
    const seIncomeBase = SE_INCOME_BASE_FACTOR * annualIncome;
    const seTax = SE_TAX_RATE * seIncomeBase;
    const halfSeTaxDeduction = seTax / 2;
    const adjustedNetEarnings = annualIncome - halfSeTaxDeduction;
    maxContrib = EFFECTIVE_SEP_RATE_FOR_SELF_EMPLOYED * adjustedNetEarnings;
  }

  return Math.min(maxContrib, ANNUAL_CONTRIBUTION_LIMIT_2024);
}

function calculateFutureValue(
  currentBalance: number,
  annualContribution: number,
  annualReturnRate: number,
  yearsToRetirement: number
): number {
  if (yearsToRetirement <= 0) return currentBalance;
  if (annualReturnRate === 0) {
    return currentBalance + annualContribution * yearsToRetirement;
  }

  const r = annualReturnRate / 100;
  const fvCurrentBalance = currentBalance * Math.pow(1 + r, yearsToRetirement);
  const fvContributions = annualContribution * ((Math.pow(1 + r, yearsToRetirement) - 1) / r);
  return fvCurrentBalance + fvContributions;
}

export function calculateResult(inputs: SEPIRACalculatorInputs): number {
  const {
    currentBalance = 0,
    annualIncome = 0,
    expectedAnnualReturn = 0,
    currentAge = 0,
    retirementAge = 0,
    isSelfEmployed = true
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const maxAnnualContribution = calculateMaxSEPContribution(annualIncome, isSelfEmployed);
  return calculateFutureValue(currentBalance, maxAnnualContribution, expectedAnnualReturn, yearsToRetirement);
}

export function generateAnalysis(
  inputs: SEPIRACalculatorInputs,
  metrics: SEPIRACalculatorMetrics
): SEPIRACalculatorAnalysis {
  const result = metrics.result;
  const { expectedAnnualReturn = 0, retirementAge = 0, annualIncome = 0, isSelfEmployed = true } = inputs;

  // Recalculate annual contribution for analysis if not in metrics
  const maxAnnualContribution = calculateMaxSEPContribution(annualIncome, isSelfEmployed);

  // Risk level based on expected return assumption (higher returns imply higher investment risk)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (expectedAnnualReturn > 8) {
    riskLevel = 'High';
  } else if (expectedAnnualReturn > 5) {
    riskLevel = 'Medium';
  } else if (expectedAnnualReturn <= 5 && expectedAnnualReturn > 0) {
    riskLevel = 'Low';
  } else {
    riskLevel = 'Low'; // 0% return is conservative
  }

  const formattedResult = result.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  const formattedContribution = maxAnnualContribution.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  let recommendation = `Your projected SEP IRA balance at retirement (age ${retirementAge}) is ${formattedResult}, assuming maximum annual contributions of ${formattedContribution} and an ${expectedAnnualReturn}% annual return. `;
  
  if (maxAnnualContribution > 0) {
    recommendation += `SEP IRAs offer tax-deferred growth, making them ideal for self-employed individuals or small business owners. Contribute the maximum allowable amount each year to optimize your retirement savings. `;
  } else {
    recommendation += `Based on your income, no SEP IRA contribution is currently allowable. Consider increasing your business income or consulting a tax professional. `;
  }

  if (riskLevel === 'High') {
    recommendation += `Your assumed return rate is aggressive; consider diversifying into lower-risk investments to mitigate volatility. `;
  } else if (riskLevel === 'Medium') {
    recommendation += `Your return assumption is moderate; a balanced portfolio of stocks and bonds may help achieve this. `;
  } else {
    recommendation += `Your conservative return assumption prioritizes capital preservation, suitable for nearing retirement. `;
  }

  recommendation += `This is an estimate—actual results depend on market performance, income changes, and IRS limits. Consult a financial advisor for personalized advice.`;

  return { recommendation, riskLevel };
}
```