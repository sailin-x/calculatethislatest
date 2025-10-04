```typescript
import { 
  RetirementAbroadCalculatorInputs, 
  RetirementAbroadCalculatorMetrics, 
  RetirementAbroadCalculatorAnalysis 
} from './types';

/**
 * Helper function to calculate the future value of current expenses adjusted for inflation.
 * @param currentExpenses - Current annual expenses in home currency.
 * @param inflationRate - Annual inflation rate (decimal).
 * @param years - Number of years to project forward.
 * @returns Future value of expenses.
 */
function futureValueOfExpenses(
  currentExpenses: number, 
  inflationRate: number, 
  years: number
): number {
  if (years <= 0) return currentExpenses;
  return currentExpenses * Math.pow(1 + inflationRate, years);
}

/**
 * Helper function to calculate the present value of a growing annuity (required nest egg at retirement).
 * Formula: PV = C * (1 - ((1 + g) / (1 + r))^n) / (r - g)
 * Where C is the first year's withdrawal, g is inflation rate, r is investment return rate, n is years in retirement.
 * If r === g, falls back to PV = C * n / (1 + r) (approximation for equal rates).
 * @param firstYearWithdrawal - Annual withdrawal needed in the first year of retirement (adjusted for abroad).
 * @param inflationRate - Annual inflation rate (decimal).
 * @param investmentReturnRate - Annual investment return rate (decimal).
 * @param yearsInRetirement - Number of years in retirement.
 * @returns Present value (required savings at retirement start).
 */
function presentValueOfGrowingAnnuity(
  firstYearWithdrawal: number,
  inflationRate: number,
  investmentReturnRate: number,
  yearsInRetirement: number
): number {
  if (yearsInRetirement <= 0) return 0;

  const g = inflationRate;
  const r = investmentReturnRate;

  if (r === g) {
    // Approximation when rates are equal: PV = C * n / (1 + r)
    return firstYearWithdrawal * yearsInRetirement / (1 + r);
  }

  const numerator = 1 - Math.pow((1 + g) / (1 + r), yearsInRetirement);
  const denominator = r - g;
  return firstYearWithdrawal * (numerator / denominator);
}

/**
 * Calculates the required retirement savings needed at the start of retirement to sustain the lifestyle abroad.
 * This uses the present value of a growing annuity formula to account for inflation-adjusted withdrawals.
 * Assumes expenses are net of any social security or other income (subtract if provided).
 * @param inputs - Calculator inputs.
 * @returns Required savings amount at retirement (in home currency equivalent).
 */
export function calculateResult(inputs: RetirementAbroadCalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentAnnualExpenses,
    costOfLivingAdjustment, // e.g., 0.8 for 20% cheaper abroad
    inflationRate,
    investmentReturnRate,
    socialSecurityIncome = 0 // Optional, defaults to 0
  } = inputs;

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

  if (yearsInRetirement <= 0 || currentAnnualExpenses <= 0) {
    return 0; // Invalid scenario
  }

  // Project current expenses to retirement start (in home currency terms)
  const futureHomeExpenses = futureValueOfExpenses(
    currentAnnualExpenses,
    inflationRate,
    yearsToRetirement
  );

  // Adjust for cost of living abroad (applied at retirement start)
  const firstYearAbroadWithdrawal = futureHomeExpenses * costOfLivingAdjustment;

  // Net withdrawal needed after social security
  const netFirstYearWithdrawal = Math.max(0, firstYearAbroadWithdrawal - socialSecurityIncome);

  // Calculate required nest egg at retirement using growing annuity PV
  const requiredSavingsAtRetirement = presentValueOfGrowingAnnuity(
    netFirstYearWithdrawal,
    inflationRate,
    investmentReturnRate,
    yearsInRetirement
  );

  return Math.round(requiredSavingsAtRetirement * 100) / 100; // Round to 2 decimal places
}

/**
 * Generates an analysis including a recommendation and risk level based on inputs and calculated metrics.
 * Risk level is determined by factors like years to retirement, return rate assumptions, and adjustment factor.
 * @param inputs - Calculator inputs.
 * @param metrics - Calculated metrics (including result).
 * @returns Analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: RetirementAbroadCalculatorInputs,
  metrics: RetirementAbroadCalculatorMetrics
): RetirementAbroadCalculatorAnalysis {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    costOfLivingAdjustment,
    investmentReturnRate,
    socialSecurityIncome = 0
  } = inputs;

  const result = metrics.result;
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

  // Risk assessment logic
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // High risk if short time to retirement and high assumed returns, or long retirement period
  const shortHorizon = yearsToRetirement < 5;
  const longRetirement = yearsInRetirement > 30;
  const aggressiveReturns = investmentReturnRate > 0.07;
  const highAdjustment = costOfLivingAdjustment > 1.0; // More expensive abroad
  const lowSS = socialSecurityIncome < 10000; // Arbitrary threshold for low fixed income

  let riskFactors = 0;
  if (shortHorizon) riskFactors++;
  if (longRetirement) riskFactors++;
  if (aggressiveReturns) riskFactors++;
  if (highAdjustment) riskFactors++;
  if (lowSS) riskFactors++;

  if (riskFactors >= 3) {
    riskLevel = 'High';
  } else if (riskFactors >= 2) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  // Generate recommendation
  let recommendation = '';

  if (costOfLivingAdjustment < 0.9) {
    recommendation += `Retiring abroad in a lower-cost location (${(1 - costOfLivingAdjustment) * 100}% savings on living expenses) can significantly stretch your retirement funds. `;
  } else if (costOfLivingAdjustment > 1.1) {
    recommendation += `Be cautious: the target country is more expensive (${(costOfLivingAdjustment - 1) * 100}% higher costs). Consider additional buffers. `;
  }

  if (yearsToRetirement < 5) {
    recommendation += `With limited time until retirement, prioritize conservative investments and review your plan annually. `;
  }

  if (yearsInRetirement > 30) {
    recommendation += `Your long retirement horizon requires careful planning; consider longevity insurance or part-time work. `;
  }

  if (investmentReturnRate > 0.07) {
    recommendation += `Your assumed return rate is optimistic. Stress-test with lower rates (e.g., 4-5%) for realism. `;
  }

  if (socialSecurityIncome > 0) {
    recommendation += `Factor in Social Security as a reliable income stream, but account for potential foreign tax implications. `;
  }

  recommendation += `Required savings at retirement: $${result.toLocaleString()}. Consult a financial advisor for personalized advice, including visa, healthcare, and tax considerations for retiring abroad.`;

  return { recommendation, riskLevel };
}
```