import { RothVsTraditionalInputs, RothVsTraditionalResults, RothVsTraditionalMetrics } from './types';

export function calculateRothVsTraditional(inputs: RothVsTraditionalInputs): RothVsTraditionalResults {
  const {
    currentAge,
    retirementAge,
    currentIncome,
    expectedIncomeGrowth,
    currentTaxBracket,
    retirementTaxBracket,
    expectedReturn,
    annualContribution,
    employerMatch,
    employerMatchLimit,
    timeHorizon,
    inflationRate,
    rothConversionAmount,
    fiveYearRule
  } = inputs;

  // Calculate years to retirement
  const yearsToRetirement = retirementAge - currentAge;

  // Calculate employer match contribution
  const employerContribution = Math.min(annualContribution * (employerMatch / 100), employerMatchLimit);

  // Calculate total annual contribution
  const totalAnnualContribution = annualContribution + employerContribution;

  // Calculate Traditional 401(k) future value
  const traditionalPreTaxContribution = totalAnnualContribution;
  const traditionalFutureValue = traditionalPreTaxContribution * ((Math.pow(1 + expectedReturn / 100, yearsToRetirement) - 1) / (expectedReturn / 100));

  // Calculate Roth 401(k) future value
  const rothAfterTaxContribution = totalAnnualContribution * (1 - currentTaxBracket / 100);
  const rothFutureValue = rothAfterTaxContribution * ((Math.pow(1 + expectedReturn / 100, yearsToRetirement) - 1) / (expectedReturn / 100));

  // Calculate tax implications
  const traditionalTaxSavings = totalAnnualContribution * (currentTaxBracket / 100);
  const rothTaxSavings = 0; // Roth contributions are after-tax

  // Calculate net values at retirement
  const traditionalNetValue = traditionalFutureValue * (1 - retirementTaxBracket / 100);
  const rothNetValue = rothFutureValue; // Roth withdrawals are tax-free

  // Calculate breakeven tax rate
  const breakevenTaxRate = traditionalFutureValue > 0 ? (rothAfterTaxContribution / traditionalPreTaxContribution) * 100 : 0;

  // Determine recommended strategy
  const recommendedStrategy = determineRecommendedStrategy(
    currentTaxBracket,
    retirementTaxBracket,
    yearsToRetirement,
    currentAge,
    fiveYearRule
  );

  // Calculate tax efficiency
  const taxEfficiency = Math.max(0, Math.min(100, 100 - Math.abs(currentTaxBracket - retirementTaxBracket)));

  // Calculate risk-adjusted return
  const riskAdjustedReturn = expectedReturn * (1 - Math.abs(currentTaxBracket - retirementTaxBracket) / 100);

  return {
    traditional401kValue: traditionalFutureValue,
    roth401kValue: rothFutureValue,
    traditionalTaxSavings,
    rothTaxSavings,
    traditionalNetValue,
    rothNetValue,
    breakevenTaxRate,
    recommendedStrategy,
    taxEfficiency,
    riskAdjustedReturn
  };
}

function determineRecommendedStrategy(
  currentTaxRate: number,
  retirementTaxRate: number,
  yearsToRetirement: number,
  currentAge: number,
  fiveYearRule: boolean
): string {
  if (currentTaxRate > retirementTaxRate) {
    return 'Roth 401(k) recommended - pay taxes now at higher rate, withdraw tax-free later';
  } else if (currentTaxRate < retirementTaxRate) {
    return 'Traditional 401(k) recommended - defer taxes to lower retirement tax rate';
  } else if (yearsToRetirement > 20) {
    return 'Roth 401(k) recommended - long time horizon allows tax-free growth';
  } else if (currentAge < 50) {
    return 'Consider Roth 401(k) for tax diversification and catch-up contributions';
  } else if (fiveYearRule) {
    return 'Roth 401(k) recommended - five-year rule satisfied for qualified withdrawals';
  } else {
    return 'Both options viable - consider personal circumstances and risk tolerance';
  }
}

export function calculateRothVsTraditionalMetrics(
  inputs: RothVsTraditionalInputs,
  results: RothVsTraditionalResults
): RothVsTraditionalMetrics {
  const { annualContribution, employerMatch, expectedReturn, retirementTaxBracket } = inputs;
  const { traditionalNetValue, rothNetValue } = results;

  // Calculate contribution efficiency
  const contributionEfficiency = annualContribution > 0 ? (employerMatch / 100) * 100 : 0;

  // Determine tax advantage
  let taxAdvantage: 'roth' | 'traditional' | 'neutral' = 'neutral';
  if (rothNetValue > traditionalNetValue * 1.05) {
    taxAdvantage = 'roth';
  } else if (traditionalNetValue > rothNetValue * 1.05) {
    taxAdvantage = 'traditional';
  }

  // Calculate retirement income estimate
  const retirementIncome = Math.max(traditionalNetValue, rothNetValue) * 0.04; // 4% safe withdrawal rate

  // Calculate legacy value
  const legacyValue = Math.max(traditionalNetValue, rothNetValue) * 0.7; // Assuming 30% spent in retirement

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  if (expectedReturn > 10) riskLevel = 'high';
  else if (expectedReturn < 5) riskLevel = 'low';

  return {
    contributionEfficiency,
    taxAdvantage,
    retirementIncome,
    legacyValue,
    riskLevel
  };
}

export function validateRothVsTraditionalInputs(inputs: RothVsTraditionalInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 18 || inputs.currentAge > 120) {
    errors.push('Current age must be between 18 and 120');
  }

  if (inputs.retirementAge <= inputs.currentAge) {
    errors.push('Retirement age must be greater than current age');
  }

  if (inputs.currentIncome < 0) {
    errors.push('Current income cannot be negative');
  }

  if (inputs.expectedIncomeGrowth < -20 || inputs.expectedIncomeGrowth > 50) {
    errors.push('Expected income growth must be between -20% and 50%');
  }

  if (inputs.currentTaxBracket < 0 || inputs.currentTaxBracket > 50) {
    errors.push('Current tax bracket must be between 0% and 50%');
  }

  if (inputs.retirementTaxBracket < 0 || inputs.retirementTaxBracket > 50) {
    errors.push('Retirement tax bracket must be between 0% and 50%');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.employerMatch < 0 || inputs.employerMatch > 100) {
    errors.push('Employer match must be between 0% and 100%');
  }

  if (inputs.employerMatchLimit < 0) {
    errors.push('Employer match limit cannot be negative');
  }

  if (inputs.timeHorizon < 1 || inputs.timeHorizon > 100) {
    errors.push('Time horizon must be between 1 and 100 years');
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  if (inputs.rothConversionAmount < 0) {
    errors.push('Roth conversion amount cannot be negative');
  }

  return errors;
}