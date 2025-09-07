import {
  CharitableGiftAnnuityInputs,
  CharitableGiftAnnuityMetrics,
  CharitableGiftAnnuityAnalysis,
  CharitableGiftAnnuityOutputs
} from './types';

// Helper function to calculate annuity payment amount
function calculateAnnuityPayment(
  principal: number,
  annuityRate: number,
  paymentFrequency: string,
  lifeExpectancy: number,
  currentAge: number
): number {
  const annualPayment = principal * (annuityRate / 100);
  const frequencyMultiplier = {
    'monthly': 12,
    'quarterly': 4,
    'semi_annual': 2,
    'annual': 1
  }[paymentFrequency] || 12;

  return annualPayment / frequencyMultiplier;
}

// Helper function to calculate present value of annuity payments
function calculatePresentValueOfPayments(
  annualPayment: number,
  discountRate: number,
  paymentYears: number,
  paymentFrequency: string
): number {
  const periodicRate = discountRate / 100 / (paymentFrequency === 'monthly' ? 12 :
                                             paymentFrequency === 'quarterly' ? 4 :
                                             paymentFrequency === 'semi_annual' ? 2 : 1);

  const numPayments = paymentYears * (paymentFrequency === 'monthly' ? 12 :
                                       paymentFrequency === 'quarterly' ? 4 :
                                       paymentFrequency === 'semi_annual' ? 2 : 1);

  if (periodicRate === 0) {
    return annualPayment * paymentYears;
  }

  const presentValue = annualPayment * (1 - Math.pow(1 + periodicRate, -numPayments)) / periodicRate;
  return presentValue;
}

// Helper function to calculate tax deduction
function calculateTaxDeduction(
  giftAmount: number,
  fairMarketValue: number,
  costBasis: number,
  donorAge: number,
  annuityRate: number
): number {
  // Simplified calculation - actual deduction is based on IRS tables
  // This is an approximation for the annuity exclusion
  const annuityExclusion = giftAmount * (annuityRate / 100) * (lifeExpectancyFactor(donorAge) / 100);
  const capitalGain = Math.max(0, fairMarketValue - costBasis);
  const deductibleAmount = giftAmount - annuityExclusion - capitalGain;

  return Math.max(0, deductibleAmount);
}

// Helper function for life expectancy factor (simplified)
function lifeExpectancyFactor(age: number): number {
  // Simplified life expectancy table
  if (age <= 50) return 85;
  if (age <= 60) return 80;
  if (age <= 70) return 75;
  if (age <= 80) return 70;
  return 65;
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

// Helper function to calculate alternative investment value
function calculateAlternativeInvestmentValue(
  giftAmount: number,
  expectedReturn: number,
  analysisPeriod: number,
  inflationRate: number
): number {
  const realReturn = expectedReturn / 100 - inflationRate / 100;
  return giftAmount * Math.pow(1 + realReturn, analysisPeriod);
}

// Helper function to calculate breakeven period
function calculateBreakevenPeriod(
  taxSavings: number,
  annualPayment: number,
  discountRate: number
): number {
  if (annualPayment <= 0) return Infinity;

  const netBenefit = taxSavings;
  if (netBenefit <= 0) return Infinity;

  // Simplified breakeven calculation
  return Math.ceil(netBenefit / annualPayment);
}

// Main calculation function
export function calculateCharitableGiftAnnuity(
  inputs: CharitableGiftAnnuityInputs
): CharitableGiftAnnuityOutputs {
  const {
    giftAmount,
    fairMarketValue,
    costBasis,
    donorAge,
    annuityRate,
    paymentFrequency,
    lifeExpectancy,
    marginalTaxRate,
    capitalGainsTaxRate,
    stateTaxRate,
    includeStateTaxes,
    expectedReturn,
    inflationRate,
    discountRate,
    analysisPeriod
  } = inputs;

  // Calculate tax deduction
  const taxDeduction = calculateTaxDeduction(giftAmount, fairMarketValue, costBasis, donorAge, annuityRate);

  // Calculate capital gains tax savings
  const capitalGainsTaxSavings = calculateCapitalGainsTaxSavings(fairMarketValue, costBasis, capitalGainsTaxRate);

  // Calculate total tax benefit
  const federalTaxBenefit = taxDeduction * (marginalTaxRate / 100);
  const stateTaxBenefit = includeStateTaxes ? taxDeduction * (stateTaxRate / 100) : 0;
  const totalTaxBenefit = federalTaxBenefit + stateTaxBenefit + capitalGainsTaxSavings;

  // Calculate annuity payments
  const annualPayment = calculateAnnuityPayment(giftAmount, annuityRate, paymentFrequency, lifeExpectancy, donorAge);
  const totalPayments = annualPayment * Math.min(analysisPeriod, lifeExpectancy - donorAge);

  // Calculate present value of payments
  const paymentYears = Math.min(analysisPeriod, lifeExpectancy - donorAge);
  const presentValueOfPayments = calculatePresentValueOfPayments(
    annualPayment,
    discountRate,
    paymentYears,
    paymentFrequency
  );

  // Calculate net present value
  const afterTaxCost = giftAmount - totalTaxBenefit;
  const netPresentValue = presentValueOfPayments - afterTaxCost;

  // Calculate alternative investment value
  const alternativeInvestmentValue = calculateAlternativeInvestmentValue(
    giftAmount,
    expectedReturn,
    analysisPeriod,
    inflationRate
  );

  // Calculate breakeven period
  const breakevenPeriod = calculateBreakevenPeriod(totalTaxBenefit, annualPayment, discountRate);

  // Calculate internal rate of return
  const cashFlows = [-giftAmount];
  for (let year = 1; year <= paymentYears; year++) {
    cashFlows.push(annualPayment);
  }
  const internalRateOfReturn = calculateIRR(cashFlows) * 100;

  // Generate analysis
  const analysis: CharitableGiftAnnuityAnalysis = {
    strategyViability: netPresentValue > 0 ? 'Excellent' :
                      netPresentValue > -10000 ? 'Good' :
                      netPresentValue > -50000 ? 'Fair' : 'Poor',
    taxEfficiency: totalTaxBenefit > giftAmount * 0.3 ? 'High' :
                   totalTaxBenefit > giftAmount * 0.2 ? 'Moderate' : 'Low',
    recommendation: netPresentValue > 0 ? 'Proceed' :
                   breakevenPeriod < analysisPeriod ? 'Delay' : 'Alternative Strategy',
    keyStrengths: [
      'Immediate tax deduction',
      'Guaranteed income stream',
      'Support for charitable causes',
      'Potential capital gains tax savings'
    ],
    keyWeaknesses: [
      'Irrevocable gift commitment',
      'Loss of asset control',
      'Potential lower returns than investments',
      'Charity risk considerations'
    ],
    riskFactors: [
      'Longevity risk - outliving payments',
      'Inflation risk - fixed payments',
      'Charity financial stability',
      'Changes in tax laws'
    ],
    opportunities: [
      'Tax-efficient wealth transfer',
      'Philanthropic impact',
      'Income diversification',
      'Estate planning benefits'
    ],
    taxDeductionSummary: `$${taxDeduction.toLocaleString()} tax deduction available`,
    capitalGainsAnalysis: `$${capitalGainsTaxSavings.toLocaleString()} capital gains tax savings`,
    taxEfficiencyAnalysis: `${((totalTaxBenefit / giftAmount) * 100).toFixed(1)}% tax efficiency`,
    annuityPaymentSummary: `$${annualPayment.toLocaleString()} annual payment`,
    presentValueAnalysis: `$${presentValueOfPayments.toLocaleString()} present value of payments`,
    comparisonAnalysis: `$${alternativeInvestmentValue.toLocaleString()} alternative investment value`,
    riskAssessment: `Overall risk level: ${expectedReturn > 8 ? 'Moderate' : 'Low'}`,
    longevityRiskAnalysis: 'Payments continue for life or specified period',
    inflationRiskAnalysis: 'Fixed payments may lose purchasing power',
    implementationSteps: [
      'Consult with tax advisor',
      'Select qualified charity',
      'Complete gift annuity agreement',
      'Transfer assets to charity',
      'Begin receiving payments'
    ],
    timingConsiderations: 'Consider year-end gifts for tax planning',
    legalConsiderations: [
      'Consult tax professional',
      'Review charity qualifications',
      'Consider state-specific rules',
      'Document all transactions'
    ],
    contributionRecommendations: [
      'Diversify charitable giving',
      'Consider qualified charities',
      'Plan for long-term income needs',
      'Review tax implications'
    ],
    annuityRecommendations: [
      'Choose appropriate annuity rate',
      'Consider payment frequency',
      'Evaluate deferral options',
      'Review charity stability'
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
        value: (totalTaxBenefit / giftAmount) * 100,
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
    decisionSummary: `Based on analysis, the charitable gift annuity ${netPresentValue > 0 ? 'provides positive net benefits' : 'requires careful consideration'}. The strategy offers ${((totalTaxBenefit / giftAmount) * 100).toFixed(1)}% tax efficiency with $${annualPayment.toLocaleString()} annual payments.`,
    scenarioAnalysis: [
      `Conservative scenario: $${(presentValueOfPayments * 0.9).toLocaleString()}`,
      `Moderate scenario: $${presentValueOfPayments.toLocaleString()}`,
      `Optimistic scenario: $${(presentValueOfPayments * 1.1).toLocaleString()}`
    ],
    sensitivityAnalysis: [
      '5% change in annuity rate affects payments by approximately 5%',
      '1% change in discount rate affects NPV by 2-3%',
      'Changes in tax rates significantly impact benefits'
    ]
  };

  return {
    taxDeduction,
    annualPayment,
    netPresentValue,
    breakevenPeriod: breakevenPeriod === Infinity ? analysisPeriod : breakevenPeriod,
    analysis,
    totalPayments,
    capitalGainsTaxSavings,
    internalRateOfReturn,
    alternativeInvestmentValue
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
export function validateCharitableGiftAnnuityInputs(inputs: CharitableGiftAnnuityInputs): string[] {
  const errors: string[] = [];

  if (!inputs.donorAge || inputs.donorAge < 18 || inputs.donorAge > 100) {
    errors.push('Donor age must be between 18 and 100');
  }

  if (!inputs.annuityAge || inputs.annuityAge < inputs.donorAge || inputs.annuityAge > 100) {
    errors.push('Annuity age must be greater than or equal to donor age');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.donorAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than donor age and less than 120');
  }

  if (!inputs.giftAmount || inputs.giftAmount <= 0) {
    errors.push('Gift amount must be greater than 0');
  }

  if (!inputs.fairMarketValue || inputs.fairMarketValue <= 0) {
    errors.push('Fair market value must be greater than 0');
  }

  if (inputs.costBasis !== undefined && inputs.costBasis < 0) {
    errors.push('Cost basis cannot be negative');
  }

  if (inputs.annuityRate !== undefined && (inputs.annuityRate <= 0 || inputs.annuityRate > 20)) {
    errors.push('Annuity rate must be between 0 and 20 percent');
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