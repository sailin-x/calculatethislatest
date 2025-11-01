import { RetirementAbroadInputs, RetirementAbroadOutputs } from './types';

// Cost of living data for various countries (indices relative to US = 100)
const COST_OF_LIVING_INDICES: { [key: string]: number } = {
  'United States': 100,
  'Mexico': 65,
  'Portugal': 75,
  'Spain': 80,
  'Thailand': 55,
  'Malaysia': 60,
  'Costa Rica': 70,
  'Panama': 68,
  'Ecuador': 50,
  'Colombia': 45,
  'Vietnam': 40,
  'Indonesia': 35,
  'Philippines': 42,
  'Brazil': 55,
  'Argentina': 48,
  'Chile': 78,
  'Uruguay': 72,
  'Canada': 95,
  'Australia': 110,
  'New Zealand': 105,
  'United Kingdom': 105,
  'Germany': 95,
  'France': 98,
  'Italy': 90,
  'Japan': 95,
  'South Korea': 85,
  'Singapore': 120,
  'Hong Kong': 115,
  'UAE': 85,
  'Turkey': 45
};

export function calculateFutureValue(presentValue: number, annualReturn: number, years: number): number {
  return presentValue * Math.pow(1 + annualReturn / 100, years);
}

export function calculateFutureValueAnnuity(payment: number, annualReturn: number, years: number): number {
  if (annualReturn === 0) return payment * years;
  const rate = annualReturn / 100;
  return payment * (Math.pow(1 + rate, years) - 1) / rate;
}

export function calculateCostOfLivingAdjustment(currentCosts: number, fromCountry: string, toCountry: string, exchangeRate: number): number {
  const fromIndex = COST_OF_LIVING_INDICES[fromCountry] || 100;
  const toIndex = COST_OF_LIVING_INDICES[toCountry] || 100;
  const adjustmentFactor = toIndex / fromIndex;
  return currentCosts * adjustmentFactor / exchangeRate;
}

export function calculateRetirementAbroad(inputs: RetirementAbroadInputs): RetirementAbroadOutputs {
  // Calculate future value of current savings
  const futureSavings = calculateFutureValue(
    inputs.currentSavings,
    inputs.expectedInvestmentReturn,
    inputs.yearsToRetirement
  );

  // Calculate future value of retirement contributions
  const futureContributions = calculateFutureValueAnnuity(
    inputs.monthlyRetirementContribution * 12,
    inputs.expectedInvestmentReturn,
    inputs.yearsToRetirement
  );

  const totalSavingsAtRetirement = futureSavings + futureContributions;

  // Calculate annual retirement expenses in target country
  const baseAnnualExpenses = inputs.housingCosts + inputs.healthcareCosts +
                           inputs.transportationCosts + inputs.foodCosts + inputs.entertainmentCosts;

  const adjustedAnnualExpenses = calculateCostOfLivingAdjustment(
    baseAnnualExpenses,
    inputs.currentCountry,
    inputs.targetCountry,
    inputs.exchangeRate
  );

  // Apply inflation and cost of living adjustment
  const inflationAdjustedExpenses = adjustedAnnualExpenses * Math.pow(1 + inputs.expectedInflationRate / 100, inputs.yearsToRetirement);

  // Calculate annual retirement income (simplified - assuming 4% safe withdrawal rate)
  const annualRetirementIncome = totalSavingsAtRetirement * 0.04;

  // Calculate retirement gap
  const retirementGap = inflationAdjustedExpenses - annualRetirementIncome;
  const monthlyShortfall = retirementGap > 0 ? retirementGap / 12 : 0;

  // Calculate how long savings will last
  const yearsSavingsWillLast = annualRetirementIncome > 0 ?
    Math.log(1 + (totalSavingsAtRetirement * 0.04) / inflationAdjustedExpenses) / Math.log(1.03) : 0; // Assuming 3% inflation

  // Calculate required monthly contribution to close the gap
  const requiredMonthlyContribution = retirementGap > 0 ?
    calculateRequiredContribution(retirementGap, inputs.expectedInvestmentReturn, inputs.yearsToRetirement) / 12 : 0;

  // Cost of living comparison
  const costOfLivingComparison = (COST_OF_LIVING_INDICES[inputs.targetCountry] || 100) / (COST_OF_LIVING_INDICES[inputs.currentCountry] || 100);

  // Purchasing power parity (simplified)
  const purchasingPowerParity = (1 / inputs.exchangeRate) * costOfLivingComparison;

  // Tax savings (simplified - assuming lower tax rate abroad)
  const currentTaxAmount = inputs.currentAnnualIncome * (inputs.taxRate / 100);
  const abroadTaxAmount = annualRetirementIncome * Math.min(inputs.taxRate / 100, 0.20); // Assume max 20% abroad
  const taxSavings = Math.max(0, currentTaxAmount - abroadTaxAmount);

  // Feasibility score (0-100)
  const savingsRatio = annualRetirementIncome / inflationAdjustedExpenses;
  const feasibilityScore = Math.min(100, Math.max(0, (savingsRatio - 0.5) * 100));

  return {
    totalSavingsAtRetirement,
    annualRetirementIncome,
    annualRetirementExpenses: inflationAdjustedExpenses,
    retirementGap,
    monthlyShortfall,
    yearsSavingsWillLast,
    requiredMonthlyContribution,
    costOfLivingComparison,
    purchasingPowerParity,
    taxSavings,
    feasibilityScore
  };
}

function calculateRequiredContribution(annualGap: number, returnRate: number, years: number): number {
  if (returnRate === 0) return annualGap * years;
  const rate = returnRate / 100;
  return annualGap * (1 - Math.pow(1 + rate, -years)) / rate;
}

export function calculateResult(inputs: RetirementAbroadInputs): number {
  const result = calculateRetirementAbroad(inputs);
  return result.feasibilityScore;
}