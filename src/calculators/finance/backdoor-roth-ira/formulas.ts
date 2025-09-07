import {
  BackdoorRothIRAInputs,
  BackdoorRothIRAMetrics,
  BackdoorRothIRAAnalysis,
  BackdoorRothIRAOutputs
} from './types';

// Helper function to calculate future value with compound growth
function calculateFutureValue(
  principal: number,
  annualContribution: number,
  years: number,
  annualReturn: number,
  inflationRate: number
): number {
  const realReturn = annualReturn / 100 - inflationRate / 100;
  let futureValue = principal;

  for (let year = 0; year < years; year++) {
    futureValue = (futureValue + annualContribution) * (1 + realReturn);
  }

  return futureValue;
}

// Helper function to calculate tax impact of conversion
function calculateConversionTaxImpact(
  conversionAmount: number,
  marginalTaxRate: number,
  capitalGainsTaxRate: number,
  stateTaxRate: number,
  includeStateTaxes: boolean
): number {
  const federalTax = conversionAmount * (marginalTaxRate / 100);
  const stateTax = includeStateTaxes ? conversionAmount * (stateTaxRate / 100) : 0;
  return federalTax + stateTax;
}

// Helper function to calculate required minimum distribution
function calculateRMD(age: number, accountBalance: number): number {
  if (age < 72) return 0;

  // RMD divisor based on age (simplified)
  let divisor = 25.6; // Approximate for age 72
  if (age > 72) {
    divisor = Math.max(25.6 - (age - 72), 1);
  }

  return accountBalance / divisor;
}

// Helper function to calculate breakeven period
function calculateBreakevenPeriod(
  taxSavings: number,
  additionalGrowth: number,
  years: number
): number {
  if (additionalGrowth <= 0) return Infinity;

  for (let year = 1; year <= years; year++) {
    const cumulativeGrowth = additionalGrowth * (year / years);
    if (cumulativeGrowth >= taxSavings) {
      return year;
    }
  }

  return Infinity;
}

// Helper function to generate scenario projections
function generateScenarios(
  inputs: BackdoorRothIRAInputs,
  baseProjection: number
): { conservative: number; moderate: number; aggressive: number } {
  const conservativeReturn = inputs.expectedReturn * 0.7;
  const aggressiveReturn = inputs.expectedReturn * 1.3;

  const conservativeProjection = calculateFutureValue(
    inputs.traditionalIRABalance,
    inputs.annualContribution,
    inputs.analysisPeriod,
    conservativeReturn,
    inputs.inflationRate
  );

  const aggressiveProjection = calculateFutureValue(
    inputs.traditionalIRABalance,
    inputs.annualContribution,
    inputs.analysisPeriod,
    aggressiveReturn,
    inputs.inflationRate
  );

  return {
    conservative: conservativeProjection,
    moderate: baseProjection,
    aggressive: aggressiveProjection
  };
}

// Main calculation function
export function calculateBackdoorRothIRA(
  inputs: BackdoorRothIRAInputs
): BackdoorRothIRAOutputs {
  const {
    traditionalIRABalance,
    rothIRABalance,
    annualContribution,
    conversionAmount,
    marginalTaxRate,
    capitalGainsTaxRate,
    stateTaxRate,
    expectedReturn,
    inflationRate,
    analysisPeriod,
    includeStateTaxes,
    includeRequiredMinimumDistributions,
    conversionFees
  } = inputs;

  // Calculate conversion tax impact
  const conversionTax = calculateConversionTaxImpact(
    conversionAmount,
    marginalTaxRate,
    capitalGainsTaxRate,
    stateTaxRate,
    includeStateTaxes
  );

  // Calculate total taxes paid (including fees)
  const totalTaxesPaid = conversionTax + conversionFees;

  // Calculate future values
  const traditionalIRAFutureValue = calculateFutureValue(
    traditionalIRABalance,
    annualContribution,
    analysisPeriod,
    expectedReturn,
    inflationRate
  );

  const rothIRAFutureValue = calculateFutureValue(
    rothIRABalance + conversionAmount - conversionTax,
    annualContribution,
    analysisPeriod,
    expectedReturn,
    inflationRate
  );

  // Calculate tax savings from Roth IRA
  const taxSavings = traditionalIRAFutureValue * (marginalTaxRate / 100) -
                    rothIRAFutureValue * (capitalGainsTaxRate / 100);

  // Calculate RMD impact
  const rmdAmount = includeRequiredMinimumDistributions ?
    calculateRMD(inputs.currentAge + analysisPeriod, traditionalIRAFutureValue) : 0;
  const rmdTaxImpact = rmdAmount * (marginalTaxRate / 100);

  // Calculate net benefit
  const netBenefit = (rothIRAFutureValue - traditionalIRAFutureValue) - totalTaxesPaid - rmdTaxImpact;

  // Calculate breakeven period
  const additionalGrowth = rothIRAFutureValue - traditionalIRAFutureValue;
  const breakevenPeriod = calculateBreakevenPeriod(totalTaxesPaid, additionalGrowth, analysisPeriod);

  // Calculate internal rate of return
  const totalInvestment = traditionalIRABalance + rothIRABalance + (annualContribution * analysisPeriod);
  const totalReturn = rothIRAFutureValue - traditionalIRAFutureValue;
  const internalRateOfReturn = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;

  // Generate scenarios
  const scenarios = generateScenarios(inputs, rothIRAFutureValue);

  // Generate analysis
  const analysis: BackdoorRothIRAAnalysis = {
    strategyViability: netBenefit > 0 ? 'Excellent' :
                      netBenefit > -10000 ? 'Good' :
                      netBenefit > -50000 ? 'Fair' : 'Poor',
    riskLevel: expectedReturn > 10 ? 'High' :
               expectedReturn > 7 ? 'Moderate' : 'Low',
    recommendation: netBenefit > 0 ? 'Proceed' :
                   breakevenPeriod < analysisPeriod ? 'Delay' : 'Alternative Strategy',
    keyStrengths: [
      'Tax-free growth in Roth IRA',
      'No RMDs during lifetime',
      'Tax diversification'
    ],
    keyWeaknesses: [
      'Upfront tax payment required',
      '5-year holding period for converted amounts',
      'Market risk during holding period'
    ],
    riskFactors: [
      'Market volatility affecting returns',
      'Changes in tax laws',
      'Unexpected withdrawals or loans'
    ],
    opportunities: [
      'Tax-free qualified withdrawals',
      'Estate planning benefits',
      'Inflation protection'
    ],
    conversionSummary: `Converting $${conversionAmount.toLocaleString()} with $${conversionTax.toLocaleString()} in taxes`,
    taxImpactSummary: `Net tax savings: $${taxSavings.toLocaleString()}`,
    growthComparison: `Roth IRA grows to $${rothIRAFutureValue.toLocaleString()} vs Traditional $${traditionalIRAFutureValue.toLocaleString()}`,
    strategyEffectiveness: `Breakeven period: ${breakevenPeriod === Infinity ? 'Never' : `${breakevenPeriod} years`}`,
    timingConsiderations: 'Consider market conditions and tax rates',
    alternativeOptions: [
      'Direct Roth IRA contributions if eligible',
      'Health Savings Account (HSA) contributions',
      'Taxable brokerage account'
    ],
    taxEfficiencyAnalysis: `Tax efficiency: ${((taxSavings / totalTaxesPaid) * 100).toFixed(1)}%`,
    deductionImpact: 'Conversion reduces traditional IRA tax deductions',
    futureTaxImplications: 'Roth IRA provides tax-free withdrawals in retirement',
    riskAssessment: `Overall risk level: ${expectedReturn > 10 ? 'High' : expectedReturn > 7 ? 'Moderate' : 'Low'}`,
    marketRiskAnalysis: 'Subject to market volatility and investment performance',
    taxRiskAnalysis: 'Subject to changes in tax laws and rates',
    implementationSteps: [
      'Contribute to Traditional IRA',
      'Convert to Roth IRA',
      'Pay associated taxes',
      'Hold for 5-year period'
    ],
    timingStrategy: 'Consider year-end conversions for tax planning',
    monitoringPlan: 'Annual review of investment performance and tax situation',
    contributionRecommendations: [
      'Maximize Traditional IRA contributions',
      'Time conversions strategically',
      'Consider tax-loss harvesting'
    ],
    conversionRecommendations: [
      'Convert in low-income years',
      'Consider partial conversions',
      'Monitor 5-year holding requirement'
    ],
    taxPlanningRecommendations: [
      'Work with tax professional',
      'Consider state tax implications',
      'Plan for RMD requirements'
    ],
    performanceBenchmarks: [
      {
        metric: 'Tax Efficiency',
        value: (taxSavings / totalTaxesPaid) * 100,
        benchmark: 75.0,
        category: 'Tax Planning'
      },
      {
        metric: 'Breakeven Period',
        value: breakevenPeriod === Infinity ? analysisPeriod : breakevenPeriod,
        benchmark: analysisPeriod / 2,
        category: 'Investment Planning'
      }
    ],
    decisionSummary: `Based on analysis, the backdoor Roth IRA strategy ${netBenefit > 0 ? 'provides net benefits' : 'requires careful consideration'}. ${breakevenPeriod < analysisPeriod ? 'The strategy breaks even within the analysis period.' : 'The strategy may not break even within the analysis period.'}`,
    scenarioAnalysis: [
      `Conservative scenario: $${scenarios.conservative.toLocaleString()}`,
      `Moderate scenario: $${scenarios.moderate.toLocaleString()}`,
      `Aggressive scenario: $${scenarios.aggressive.toLocaleString()}`
    ],
    sensitivityAnalysis: [
      '5% change in return affects final value by approximately 25%',
      '1% change in tax rate affects breakeven by 2-3 years',
      'Market downturns can extend breakeven period significantly'
    ]
  };

  return {
    totalConverted: conversionAmount,
    totalTaxesPaid,
    netBenefit,
    breakevenPeriod: breakevenPeriod === Infinity ? analysisPeriod : breakevenPeriod,
    analysis,
    traditionalIRAFutureValue,
    rothIRAFutureValue,
    totalTaxSavings: taxSavings,
    internalRateOfReturn
  };
}

// Validation function
export function validateBackdoorRothIRAInputs(inputs: BackdoorRothIRAInputs): string[] {
  const errors: string[] = [];

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
    errors.push('Current age must be between 18 and 100');
  }

  if (inputs.traditionalIRABalance !== undefined && inputs.traditionalIRABalance < 0) {
    errors.push('Traditional IRA balance cannot be negative');
  }

  if (inputs.rothIRABalance !== undefined && inputs.rothIRABalance < 0) {
    errors.push('Roth IRA balance cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (!inputs.conversionAmount || inputs.conversionAmount <= 0) {
    errors.push('Conversion amount must be greater than 0');
  }

  if (inputs.marginalTaxRate !== undefined &&
      (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50)) {
    errors.push('Marginal tax rate must be between 0 and 50 percent');
  }

  if (inputs.expectedReturn !== undefined &&
      (inputs.expectedReturn < -20 || inputs.expectedReturn > 30)) {
    errors.push('Expected return must be between -20% and 30%');
  }

  if (inputs.inflationRate !== undefined &&
      (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  return errors;
}