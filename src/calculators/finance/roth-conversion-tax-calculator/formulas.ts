import { RothConversionInputs, RothConversionResults, RothConversionMetrics } from './types';

export function calculateRothConversion(inputs: RothConversionInputs): RothConversionResults {
  const {
    conversionAmount,
    currentTaxBracket,
    expectedTaxBracket,
    fiveYearRule,
    timeHorizon,
    expectedReturn,
    inflationRate,
    stateTaxRate,
    includeStateTax,
    medicalExpenses,
    charitableContributions
  } = inputs;

  // Calculate immediate tax liability
  const federalTaxLiability = conversionAmount * (currentTaxBracket / 100);
  const stateTaxLiability = includeStateTax ? conversionAmount * (stateTaxRate / 100) : 0;
  const immediateTaxLiability = federalTaxLiability + stateTaxLiability;

  // Calculate total tax liability
  const totalTaxLiability = immediateTaxLiability;

  // Calculate net conversion amount (amount that goes into Roth)
  const netConversionAmount = conversionAmount - immediateTaxLiability;

  // Calculate projected value of Roth account
  const projectedValue = netConversionAmount * Math.pow(1 + expectedReturn / 100, timeHorizon);

  // Calculate tax savings (future tax savings vs. current tax paid)
  const futureTaxSavings = conversionAmount * (expectedTaxBracket / 100) * timeHorizon / 10; // Rough estimate
  const taxSavings = futureTaxSavings - immediateTaxLiability;

  // Calculate breakeven years
  const breakevenYears = immediateTaxLiability > 0 ? (immediateTaxLiability / (conversionAmount * expectedReturn / 100)) : 0;

  // Calculate conversion efficiency
  const conversionEfficiency = conversionAmount > 0 ? (netConversionAmount / conversionAmount) * 100 : 0;

  // Determine recommended strategy
  const recommendedStrategy = determineRecommendedStrategy(
    currentTaxBracket,
    expectedTaxBracket,
    timeHorizon,
    fiveYearRule,
    conversionEfficiency
  );

  return {
    immediateTaxLiability,
    stateTaxLiability,
    totalTaxLiability,
    netConversionAmount,
    projectedValue,
    taxSavings,
    breakevenYears,
    conversionEfficiency,
    recommendedStrategy
  };
}

function determineRecommendedStrategy(
  currentTax: number,
  expectedTax: number,
  timeHorizon: number,
  fiveYearRule: boolean,
  efficiency: number
): string {
  if (currentTax > expectedTax && timeHorizon > 10) {
    return 'Strong candidate for Roth conversion - pay taxes now at higher rate, benefit from tax-free growth';
  } else if (currentTax < expectedTax) {
    return 'Consider delaying conversion - current tax rate is favorable';
  } else if (!fiveYearRule && timeHorizon < 5) {
    return 'Consider traditional withdrawals - five-year rule may complicate Roth benefits';
  } else if (efficiency > 80) {
    return 'Good conversion candidate - high efficiency and long time horizon';
  } else {
    return 'Evaluate carefully - conversion may not be optimal given current tax situation';
  }
}

export function calculateRothConversionMetrics(
  inputs: RothConversionInputs,
  results: RothConversionResults
): RothConversionMetrics {
  const { currentTaxBracket, expectedTaxBracket, timeHorizon, expectedReturn } = inputs;
  const { conversionEfficiency, taxSavings, projectedValue } = results;

  // Calculate tax efficiency
  const taxEfficiency = Math.max(0, Math.min(100, 100 - Math.abs(currentTaxBracket - expectedTaxBracket)));

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  if (timeHorizon > 20) riskLevel = 'low';
  else if (timeHorizon < 5) riskLevel = 'high';

  // Calculate time value
  const timeValue = timeHorizon * (expectedReturn / 100);

  // Calculate conversion benefit
  const conversionBenefit = taxSavings > 0 ? taxSavings : -Math.abs(taxSavings);

  // Calculate strategy score (0-100)
  const strategyScore = Math.max(0, Math.min(100,
    (conversionEfficiency + taxEfficiency + (timeHorizon / 30) * 100) / 3
  ));

  return {
    taxEfficiency,
    riskLevel,
    timeValue,
    conversionBenefit,
    strategyScore
  };
}

export function validateRothConversionInputs(inputs: RothConversionInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 18 || inputs.currentAge > 120) {
    errors.push('Current age must be between 18 and 120');
  }

  if (inputs.conversionAmount <= 0) {
    errors.push('Conversion amount must be greater than $0');
  }

  if (inputs.currentTaxBracket < 0 || inputs.currentTaxBracket > 50) {
    errors.push('Current tax bracket must be between 0% and 50%');
  }

  if (inputs.expectedTaxBracket < 0 || inputs.expectedTaxBracket > 50) {
    errors.push('Expected tax bracket must be between 0% and 50%');
  }

  if (inputs.timeHorizon < 1 || inputs.timeHorizon > 100) {
    errors.push('Time horizon must be between 1 and 100 years');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  if (inputs.medicalExpenses < 0) {
    errors.push('Medical expenses cannot be negative');
  }

  if (inputs.charitableContributions < 0) {
    errors.push('Charitable contributions cannot be negative');
  }

  return errors;
}