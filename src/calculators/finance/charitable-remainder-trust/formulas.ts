import {
  CharitableRemainderTrustInputs,
  CharitableRemainderTrustMetrics,
  CharitableRemainderTrustAnalysis,
  CharitableRemainderTrustOutputs
} from './types';

// Helper function to calculate annuity payout for CRT
function calculateAnnuityPayout(
  trustValue: number,
  payoutRate: number,
  paymentFrequency: string = 'annual'
): number {
  const annualPayout = trustValue * (payoutRate / 100);
  const frequencyMultiplier = {
    'monthly': 12,
    'quarterly': 4,
    'semi_annual': 2,
    'annual': 1
  }[paymentFrequency] || 1;

  return annualPayout / frequencyMultiplier;
}

// Helper function to calculate unitrust payout (revalued annually)
function calculateUnitrustPayout(
  trustValue: number,
  payoutRate: number,
  expectedReturn: number,
  years: number,
  paymentFrequency: string = 'annual'
): number {
  // Simplified calculation - actual unitrust payouts are revalued annually
  const annualPayout = trustValue * (payoutRate / 100);
  const growthAdjustedValue = trustValue * Math.pow(1 + expectedReturn / 100, years);
  const adjustedAnnualPayout = growthAdjustedValue * (payoutRate / 100);

  const frequencyMultiplier = {
    'monthly': 12,
    'quarterly': 4,
    'semi_annual': 2,
    'annual': 1
  }[paymentFrequency] || 1;

  return adjustedAnnualPayout / frequencyMultiplier;
}

// Helper function to calculate tax deduction
function calculateTaxDeduction(
  trustValue: number,
  donorAge: number,
  payoutRate: number,
  trustTerm: number
): number {
  // Simplified calculation - actual deduction is based on IRS tables
  // This approximates the present value of the remainder interest
  const remainderPercentage = 100 - payoutRate;
  const remainderFactor = calculateLifeExpectancyFactor(donorAge, trustTerm);
  const remainderValue = trustValue * (remainderPercentage / 100) * remainderFactor;

  return trustValue - remainderValue;
}

// Helper function for life expectancy factor (simplified)
function calculateLifeExpectancyFactor(age: number, term: number): number {
  // Simplified life expectancy table for trust calculations
  if (age <= 50) return 0.85;
  if (age <= 60) return 0.80;
  if (age <= 70) return 0.75;
  if (age <= 80) return 0.70;
  return 0.65;
}

// Helper function to calculate capital gains tax savings
function calculateCapitalGainsTaxSavings(
  fairMarketValue: number,
  costBasis: number,
  capitalGainsTaxRate: number
): number {
  const capitalGain = Math.max(0, fairMarketValue - costBasis);
  return capitalGain * (capitalGainsTaxRate / 100);
}

// Helper function to calculate present value of payouts
function calculatePresentValueOfPayouts(
  annualPayout: number,
  discountRate: number,
  paymentYears: number,
  paymentFrequency: string = 'annual'
): number {
  const periodicRate = discountRate / 100 / (paymentFrequency === 'monthly' ? 12 :
                                             paymentFrequency === 'quarterly' ? 4 :
                                             paymentFrequency === 'semi_annual' ? 2 : 1);

  const numPayments = paymentYears * (paymentFrequency === 'monthly' ? 12 :
                                       paymentFrequency === 'quarterly' ? 4 :
                                       paymentFrequency === 'semi_annual' ? 2 : 1);

  if (periodicRate === 0) {
    return annualPayout * paymentYears;
  }

  const presentValue = annualPayout * (1 - Math.pow(1 + periodicRate, -numPayments)) / periodicRate;
  return presentValue;
}

// Helper function to calculate remainder value
function calculateRemainderValue(
  trustValue: number,
  expectedReturn: number,
  trustTerm: number,
  payoutRate: number
): number {
  let currentValue = trustValue;

  for (let year = 1; year <= trustTerm; year++) {
    const payout = currentValue * (payoutRate / 100);
    currentValue = (currentValue - payout) * (1 + expectedReturn / 100);
  }

  return Math.max(0, currentValue);
}

// Helper function to calculate alternative investment value
function calculateAlternativeInvestmentValue(
  trustValue: number,
  expectedReturn: number,
  analysisPeriod: number,
  inflationRate: number
): number {
  const realReturn = expectedReturn / 100 - inflationRate / 100;
  return trustValue * Math.pow(1 + realReturn, analysisPeriod);
}

// Helper function to calculate breakeven period
function calculateBreakevenPeriod(
  taxSavings: number,
  annualPayout: number,
  discountRate: number
): number {
  if (annualPayout <= 0) return Infinity;

  const netBenefit = taxSavings;
  if (netBenefit <= 0) return Infinity;

  // Simplified breakeven calculation
  return Math.ceil(netBenefit / annualPayout);
}

// Main calculation function
export function calculateCharitableRemainderTrust(
  inputs: CharitableRemainderTrustInputs
): CharitableRemainderTrustOutputs {
  const {
    trustValue,
    donorAge,
    payoutRate,
    trustTerm,
    fairMarketValue,
    costBasis,
    marginalTaxRate,
    capitalGainsTaxRate,
    stateTaxRate,
    includeStateTaxes,
    expectedReturn,
    inflationRate,
    discountRate,
    trusteeFees,
    administrativeCosts,
    taxPreparationFees,
    analysisPeriod,
    trustType
  } = inputs;

  // Calculate tax deduction
  const taxDeduction = calculateTaxDeduction(trustValue, donorAge, payoutRate, trustTerm);

  // Calculate capital gains tax savings
  const capitalGainsTaxSavings = calculateCapitalGainsTaxSavings(fairMarketValue, costBasis, capitalGainsTaxRate);

  // Calculate total tax benefit
  const federalTaxBenefit = taxDeduction * (marginalTaxRate / 100);
  const stateTaxBenefit = includeStateTaxes ? taxDeduction * (stateTaxRate / 100) : 0;
  const totalTaxBenefit = federalTaxBenefit + stateTaxBenefit + capitalGainsTaxSavings;

  // Calculate trust payouts
  const annualPayout = trustType === 'charitable_remainder_annuity_trust'
    ? calculateAnnuityPayout(trustValue, payoutRate)
    : calculateUnitrustPayout(trustValue, payoutRate, expectedReturn, analysisPeriod);

  // Adjust for fees and costs
  const netAnnualPayout = annualPayout - (trustValue * trusteeFees / 100) - administrativeCosts - taxPreparationFees;
  const totalPayouts = netAnnualPayout * Math.min(analysisPeriod, trustTerm);

  // Calculate present value of payouts
  const paymentYears = Math.min(analysisPeriod, trustTerm);
  const presentValueOfPayouts = calculatePresentValueOfPayouts(
    netAnnualPayout,
    discountRate,
    paymentYears
  );

  // Calculate remainder value
  const remainderValue = calculateRemainderValue(trustValue, expectedReturn, trustTerm, payoutRate);
  const charityBenefit = remainderValue;

  // Calculate net present value
  const afterTaxCost = trustValue - totalTaxBenefit;
  const netPresentValue = presentValueOfPayouts - afterTaxCost;

  // Calculate alternative investment value
  const alternativeInvestmentValue = calculateAlternativeInvestmentValue(
    trustValue,
    expectedReturn,
    analysisPeriod,
    inflationRate
  );

  // Calculate breakeven period
  const breakevenPeriod = calculateBreakevenPeriod(totalTaxBenefit, netAnnualPayout, discountRate);

  // Calculate internal rate of return
  const cashFlows = [-trustValue];
  for (let year = 1; year <= paymentYears; year++) {
    cashFlows.push(netAnnualPayout);
  }
  // Add remainder value at end of term
  if (paymentYears >= trustTerm) {
    cashFlows[cashFlows.length - 1] += remainderValue;
  }
  const internalRateOfReturn = calculateIRR(cashFlows) * 100;

  // Generate analysis
  const analysis: CharitableRemainderTrustAnalysis = {
    strategyViability: netPresentValue > 0 ? 'Excellent' :
                      netPresentValue > -10000 ? 'Good' :
                      netPresentValue > -50000 ? 'Fair' : 'Poor',
    taxEfficiency: totalTaxBenefit > trustValue * 0.3 ? 'High' :
                   totalTaxBenefit > trustValue * 0.2 ? 'Moderate' : 'Low',
    recommendation: netPresentValue > 0 ? 'Proceed' :
                   breakevenPeriod < analysisPeriod ? 'Delay' : 'Alternative Strategy',
    keyStrengths: [
      'Immediate tax deduction',
      'Income stream for life or term',
      'Charitable giving with personal benefit',
      'Potential capital gains tax savings',
      'Estate planning benefits'
    ],
    keyWeaknesses: [
      'Irrevocable trust structure',
      'Loss of asset control',
      'Trustee and administrative fees',
      'Complex setup and ongoing costs',
      'Potential changes in tax laws'
    ],
    riskFactors: [
      'Longevity risk - outliving trust term',
      'Market risk affecting unitrust payouts',
      'Trustee and administrative costs',
      'Changes in tax laws',
      'Charity financial stability'
    ],
    opportunities: [
      'Tax-efficient wealth transfer',
      'Philanthropic impact',
      'Income diversification',
      'Legacy planning',
      'Potential for higher unitrust payouts'
    ],
    taxDeductionSummary: `$${taxDeduction.toLocaleString()} tax deduction available`,
    capitalGainsAnalysis: `$${capitalGainsTaxSavings.toLocaleString()} capital gains tax savings`,
    taxEfficiencyAnalysis: `${((totalTaxBenefit / trustValue) * 100).toFixed(1)}% tax efficiency`,
    payoutSummary: `$${netAnnualPayout.toLocaleString()} net annual payout`,
    presentValueAnalysis: `$${presentValueOfPayouts.toLocaleString()} present value of payouts`,
    comparisonAnalysis: `$${alternativeInvestmentValue.toLocaleString()} alternative investment value`,
    remainderAnalysis: `$${remainderValue.toLocaleString()} remainder to charity`,
    charityImpactAnalysis: `$${charityBenefit.toLocaleString()} charitable benefit`,
    riskAssessment: `Overall risk level: ${expectedReturn > 8 ? 'Moderate' : 'Low'}`,
    longevityRiskAnalysis: 'Trust provides income for specified term or life',
    marketRiskAnalysis: 'Unitrust payouts adjust with market performance',
    implementationSteps: [
      'Consult with estate planning attorney',
      'Select qualified trustee',
      'Choose remainder beneficiary charity',
      'Transfer assets to trust',
      'File tax return claiming deduction'
    ],
    timingConsiderations: 'Consider year-end contributions for tax planning',
    legalConsiderations: [
      'Consult tax professional',
      'Review trust document carefully',
      'Consider state-specific rules',
      'Document all transactions'
    ],
    contributionRecommendations: [
      'Diversify trust assets',
      'Consider qualified charities',
      'Plan for long-term income needs',
      'Review tax implications carefully'
    ],
    trustRecommendations: [
      'Choose appropriate trust type',
      'Select reliable trustee',
      'Consider payout rate carefully',
      'Plan for administrative costs'
    ],
    taxPlanningRecommendations: [
      'Maximize tax deductions',
      'Consider bunching strategy',
      'Review state tax benefits',
      'Plan for future tax brackets'
    ],
    performanceBenchmarks: [
      {
        metric: 'Tax Efficiency',
        value: (totalTaxBenefit / trustValue) * 100,
        benchmark: 25.0,
        category: 'Tax Planning'
      },
      {
        metric: 'Net Present Value',
        value: netPresentValue,
        benchmark: 0,
        category: 'Financial Analysis'
      }
    ],
    decisionSummary: `Based on analysis, the charitable remainder trust ${netPresentValue > 0 ? 'provides positive net benefits' : 'requires careful consideration'}. The strategy offers ${((totalTaxBenefit / trustValue) * 100).toFixed(1)}% tax efficiency with $${netAnnualPayout.toLocaleString()} annual payouts.`,
    scenarioAnalysis: [
      `Conservative scenario: $${(presentValueOfPayouts * 0.9).toLocaleString()}`,
      `Moderate scenario: $${presentValueOfPayouts.toLocaleString()}`,
      `Optimistic scenario: $${(presentValueOfPayouts * 1.1).toLocaleString()}`
    ],
    sensitivityAnalysis: [
      '5% change in payout rate affects annual income by approximately 5%',
      '1% change in discount rate affects NPV by 2-3%',
      'Changes in tax rates significantly impact benefits'
    ]
  };

  return {
    taxDeduction,
    annualPayout: netAnnualPayout,
    netPresentValue,
    breakevenPeriod: breakevenPeriod === Infinity ? analysisPeriod : breakevenPeriod,
    analysis,
    totalPayouts,
    capitalGainsTaxSavings,
    internalRateOfReturn,
    alternativeInvestmentValue,
    remainderValue,
    charityBenefit
  };
}

// Helper function to calculate Internal Rate of Return
function calculateIRR(cashFlows: number[]): number {
  // Simplified IRR calculation
  const maxIterations = 100;
  let rate = 0.1; // Initial guess

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + rate, j);
    }

    if (Math.abs(npv) < 0.01) {
      return rate;
    }

    // Newton-Raphson approximation
    let dnpv = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      dnpv -= j * cashFlows[j] / Math.pow(1 + rate, j + 1);
    }

    rate = rate - npv / dnpv;
  }

  return rate;
}

// Validation function
export function validateCharitableRemainderTrustInputs(inputs: CharitableRemainderTrustInputs): string[] {
  const errors: string[] = [];

  if (!inputs.donorAge || inputs.donorAge < 18 || inputs.donorAge > 100) {
    errors.push('Donor age must be between 18 and 100');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.donorAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than donor age and less than 120');
  }

  if (!inputs.trustValue || inputs.trustValue <= 0) {
    errors.push('Trust value must be greater than 0');
  }

  if (!inputs.fairMarketValue || inputs.fairMarketValue <= 0) {
    errors.push('Fair market value must be greater than 0');
  }

  if (inputs.costBasis !== undefined && inputs.costBasis < 0) {
    errors.push('Cost basis cannot be negative');
  }

  if (inputs.payoutRate !== undefined && (inputs.payoutRate <= 0 || inputs.payoutRate > 50)) {
    errors.push('Payout rate must be between 0 and 50 percent');
  }

  if (!inputs.trustTerm || inputs.trustTerm < 1 || inputs.trustTerm > 100) {
    errors.push('Trust term must be between 1 and 100 years');
  }

  if (inputs.marginalTaxRate !== undefined && (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50)) {
    errors.push('Marginal tax rate must be between 0 and 50 percent');
  }

  if (inputs.expectedReturn !== undefined && (inputs.expectedReturn < -20 || inputs.expectedReturn > 30)) {
    errors.push('Expected return must be between -20% and 30%');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  return errors;
}