import { PmiCancellationInputs, PmiCancellationOutputs } from './types';

// Calculate current LTV ratio
export function calculateCurrentLtvRatio(currentLoanBalance: number, currentPropertyValue: number): number {
  if (currentPropertyValue === 0) return 0;
  return (currentLoanBalance / currentPropertyValue) * 100;
}

// Calculate equity percentage
export function calculateEquityPercentage(currentPropertyValue: number, currentLoanBalance: number): number {
  if (currentPropertyValue === 0) return 0;
  return ((currentPropertyValue - currentLoanBalance) / currentPropertyValue) * 100;
}

// Calculate months to reach target LTV
export function calculateMonthsToTargetLtv(
  currentLtv: number,
  targetLtv: number,
  monthlyPrincipalPayment: number,
  monthlyAppreciation: number,
  currentLoanBalance: number,
  currentPropertyValue: number
): number {
  if (currentLtv <= targetLtv) return 0;
  if (monthlyPrincipalPayment <= 0 && monthlyAppreciation <= 0) return Infinity;

  let months = 0;
  let loanBalance = currentLoanBalance;
  let propertyValue = currentPropertyValue;

  while (months < 360) { // Max 30 years
    loanBalance -= monthlyPrincipalPayment;
    propertyValue += monthlyAppreciation;

    const currentLtvRatio = (loanBalance / propertyValue) * 100;
    if (currentLtvRatio <= targetLtv) {
      return months;
    }

    months++;
  }

  return Infinity;
}

// Calculate PMI savings
export function calculatePmiSavings(
  monthlyPmiPayment: number,
  remainingTermMonths: number
): { monthly: number; annual: number; total: number } {
  const monthly = monthlyPmiPayment;
  const annual = monthly * 12;
  const total = monthly * remainingTermMonths;

  return { monthly, annual, total };
}

// Calculate total cancellation cost
export function calculateTotalCancellationCost(
  appraisalFee: number,
  titleSearchFee: number,
  otherFees: number
): number {
  return appraisalFee + titleSearchFee + otherFees;
}

// Calculate break-even period
export function calculateBreakEvenPeriod(
  totalCancellationCost: number,
  monthlyPmiSavings: number
): { months: number; years: number } {
  if (monthlyPmiSavings <= 0) return { months: Infinity, years: Infinity };

  const months = Math.ceil(totalCancellationCost / monthlyPmiSavings);
  const years = months / 12;

  return { months, years };
}

// Calculate tax savings from PMI cancellation
export function calculateTaxSavingsFromCancellation(
  monthlyPmiSavings: number,
  marginalTaxRate: number,
  stateTaxRate: number
): number {
  const totalTaxRate = marginalTaxRate + stateTaxRate;
  return monthlyPmiSavings * (totalTaxRate / 100);
}

// Calculate projected LTV at future date
export function calculateProjectedLtv(
  currentLoanBalance: number,
  currentPropertyValue: number,
  monthsAhead: number,
  monthlyPrincipalPayment: number,
  monthlyAppreciation: number
): number {
  let loanBalance = currentLoanBalance;
  let propertyValue = currentPropertyValue;

  for (let month = 0; month < monthsAhead; month++) {
    loanBalance -= monthlyPrincipalPayment;
    propertyValue += monthlyAppreciation;
  }

  return (loanBalance / propertyValue) * 100;
}

// Calculate cost-benefit ratio
export function calculateCostBenefitRatio(
  totalCancellationCost: number,
  totalPmiSavings: number
): number {
  if (totalCancellationCost === 0) return Infinity;
  return totalPmiSavings / totalCancellationCost;
}

// Calculate return on cancellation investment
export function calculateReturnOnCancellationInvestment(
  totalPmiSavings: number,
  totalCancellationCost: number,
  yearsToSavings: number
): number {
  if (totalCancellationCost === 0 || yearsToSavings === 0) return 0;
  const annualSavings = totalPmiSavings / yearsToSavings;
  return ((annualSavings / totalCancellationCost) * 100);
}

// Generate cancellation recommendation
export function generateCancellationRecommendation(
  currentLtv: number,
  automaticCancellationLtv: number,
  lenderCancellationLtv: number,
  breakEvenMonths: number,
  totalCancellationCost: number,
  monthlyPmiSavings: number
): PmiCancellationOutputs['recommendedAction'] {
  // If already eligible for automatic cancellation
  if (currentLtv <= automaticCancellationLtv) {
    return 'Cancel Now';
  }

  // If close to lender cancellation threshold
  if (currentLtv <= lenderCancellationLtv + 2) {
    return 'Request Lender Cancellation';
  }

  // If break-even period is reasonable (less than 2 years)
  if (breakEvenMonths <= 24) {
    return 'Cancel Now';
  }

  // If far from automatic cancellation
  if (currentLtv > automaticCancellationLtv + 10) {
    return 'Wait for Automatic';
  }

  // Default recommendation
  return 'Request Lender Cancellation';
}

// Calculate monthly principal payment (simplified)
export function calculateMonthlyPrincipalPayment(
  loanBalance: number,
  interestRate: number,
  remainingTermMonths: number
): number {
  if (remainingTermMonths === 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanBalance * (monthlyRate * Math.pow(1 + monthlyRate, remainingTermMonths)) /
                        (Math.pow(1 + monthlyRate, remainingTermMonths) - 1);

  // Principal portion (simplified approximation)
  return monthlyPayment * 0.3; // Rough estimate - actual calculation would be more complex
}

// Calculate monthly appreciation
export function calculateMonthlyAppreciation(
  propertyValue: number,
  annualAppreciationRate: number
): number {
  return propertyValue * (annualAppreciationRate / 100) / 12;
}

// Generate scenario analysis
export function generateScenarioAnalysis(inputs: PmiCancellationInputs): Pick<PmiCancellationOutputs, 'automaticCancellationScenario' | 'lenderCancellationScenario' | 'immediateCancellationScenario'> {
  const currentLtv = calculateCurrentLtvRatio(inputs.currentLoanBalance, inputs.currentPropertyValue);
  const monthlyPrincipal = calculateMonthlyPrincipalPayment(
    inputs.currentLoanBalance,
    inputs.interestRate,
    inputs.remainingTerm * 12
  );
  const monthlyAppreciation = calculateMonthlyAppreciation(
    inputs.currentPropertyValue,
    inputs.expectedPropertyAppreciation
  );

  // Automatic cancellation scenario
  const monthsToAuto = calculateMonthsToTargetLtv(
    currentLtv,
    inputs.automaticCancellationLtv,
    monthlyPrincipal,
    monthlyAppreciation,
    inputs.currentLoanBalance,
    inputs.currentPropertyValue
  );

  const autoTotalPmiPaid = inputs.monthlyPmiPayment * monthsToAuto;
  const autoTotalSavings = inputs.monthlyPmiPayment * (inputs.remainingTerm * 12 - monthsToAuto);
  const autoNetBenefit = autoTotalSavings - autoTotalPmiPaid;

  // Lender cancellation scenario
  const monthsToLender = calculateMonthsToTargetLtv(
    currentLtv,
    inputs.lenderCancellationLtv,
    monthlyPrincipal,
    monthlyAppreciation,
    inputs.currentLoanBalance,
    inputs.currentPropertyValue
  );

  const lenderTotalPmiPaid = inputs.monthlyPmiPayment * monthsToLender;
  const lenderTotalSavings = inputs.monthlyPmiPayment * (inputs.remainingTerm * 12 - monthsToLender);
  const lenderNetBenefit = lenderTotalSavings - lenderTotalPmiPaid;

  // Immediate cancellation scenario
  const immediateTotalCost = calculateTotalCancellationCost(
    inputs.appraisalFee,
    inputs.titleSearchFee,
    inputs.otherFees
  );
  const immediateMonthlySavings = inputs.monthlyPmiPayment;
  const immediateBreakEven = calculateBreakEvenPeriod(immediateTotalCost, immediateMonthlySavings);
  const immediateNetBenefit = (inputs.monthlyPmiPayment * inputs.remainingTerm * 12) - immediateTotalCost;

  return {
    automaticCancellationScenario: {
      monthsToCancellation: monthsToAuto,
      totalPmiPaid: autoTotalPmiPaid,
      totalSavings: autoTotalSavings,
      netBenefit: autoNetBenefit
    },
    lenderCancellationScenario: {
      monthsToCancellation: monthsToLender,
      totalPmiPaid: lenderTotalPmiPaid,
      totalSavings: lenderTotalSavings,
      netBenefit: lenderNetBenefit,
      successProbability: monthsToLender < 12 ? 90 : monthsToLender < 24 ? 75 : 60
    },
    immediateCancellationScenario: {
      totalCost: immediateTotalCost,
      monthlySavings: immediateMonthlySavings,
      breakEvenPeriod: immediateBreakEven.months,
      netBenefit: immediateNetBenefit
    }
  };
}

// Generate refinance option analysis
export function generateRefinanceOption(
  inputs: PmiCancellationInputs,
  currentLtv: number
): PmiCancellationOutputs['refinanceOption'] {
  // Simplified refinance analysis
  const estimatedRefinanceCost = inputs.currentPropertyValue * 0.03; // 3% of property value
  const potentialRateReduction = 0.5; // 0.5% rate reduction
  const monthlySavingsFromRefinance = (inputs.currentLoanBalance * (inputs.interestRate / 100) / 12) * 0.3; // Rough estimate

  const breakEvenPeriod = estimatedRefinanceCost / monthlySavingsFromRefinance;
  const recommended = breakEvenPeriod < 24 && currentLtv > 80; // Recommend if break-even < 2 years and high LTV

  return {
    estimatedCost: estimatedRefinanceCost,
    estimatedSavings: monthlySavingsFromRefinance * 12 * inputs.remainingTerm,
    breakEvenPeriod: breakEvenPeriod,
    recommended
  };
}

// Main calculation function
export function calculatePmiCancellation(inputs: PmiCancellationInputs): PmiCancellationOutputs {
  const currentLtvRatio = calculateCurrentLtvRatio(inputs.currentLoanBalance, inputs.currentPropertyValue);
  const equityPercentage = calculateEquityPercentage(inputs.currentPropertyValue, inputs.currentLoanBalance);

  const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(
    inputs.currentLoanBalance,
    inputs.interestRate,
    inputs.remainingTerm * 12
  );
  const monthlyAppreciation = calculateMonthlyAppreciation(
    inputs.currentPropertyValue,
    inputs.expectedPropertyAppreciation
  );

  const monthsToAutomaticCancellation = calculateMonthsToTargetLtv(
    currentLtvRatio,
    inputs.automaticCancellationLtv,
    monthlyPrincipalPayment,
    monthlyAppreciation,
    inputs.currentLoanBalance,
    inputs.currentPropertyValue
  );

  const monthsToLenderCancellation = calculateMonthsToTargetLtv(
    currentLtvRatio,
    inputs.lenderCancellationLtv,
    monthlyPrincipalPayment,
    monthlyAppreciation,
    inputs.currentLoanBalance,
    inputs.currentPropertyValue
  );

  const pmiSavings = calculatePmiSavings(
    inputs.monthlyPmiPayment,
    inputs.remainingTerm * 12
  );

  const totalCancellationCost = calculateTotalCancellationCost(
    inputs.appraisalFee,
    inputs.titleSearchFee,
    inputs.otherFees
  );

  const breakEven = calculateBreakEvenPeriod(totalCancellationCost, pmiSavings.monthly);
  const netSavings = pmiSavings.total - totalCancellationCost;

  const taxSavingsFromCancellation = calculateTaxSavingsFromCancellation(
    pmiSavings.monthly,
    inputs.marginalTaxRate,
    inputs.stateTaxRate
  );

  const afterTaxMonthlySavings = pmiSavings.monthly - taxSavingsFromCancellation;
  const afterTaxAnnualSavings = afterTaxMonthlySavings * 12;

  const projectedLtvAtAutomaticCancellation = calculateProjectedLtv(
    inputs.currentLoanBalance,
    inputs.currentPropertyValue,
    monthsToAutomaticCancellation,
    monthlyPrincipalPayment,
    monthlyAppreciation
  );

  const projectedLtvAtLenderCancellation = calculateProjectedLtv(
    inputs.currentLoanBalance,
    inputs.currentPropertyValue,
    monthsToLenderCancellation,
    monthlyPrincipalPayment,
    monthlyAppreciation
  );

  const projectedEquityAtAutomaticCancellation = inputs.currentPropertyValue *
    (1 - projectedLtvAtAutomaticCancellation / 100) - inputs.currentLoanBalance;

  const projectedEquityAtLenderCancellation = inputs.currentPropertyValue *
    (1 - projectedLtvAtLenderCancellation / 100) - inputs.currentLoanBalance;

  const costBenefitRatio = calculateCostBenefitRatio(totalCancellationCost, pmiSavings.total);
  const returnOnCancellationInvestment = calculateReturnOnCancellationInvestment(
    pmiSavings.total,
    totalCancellationCost,
    inputs.remainingTerm
  );

  const paybackPeriod = breakEven.months;

  const recommendedAction = generateCancellationRecommendation(
    currentLtvRatio,
    inputs.automaticCancellationLtv,
    inputs.lenderCancellationLtv,
    breakEven.months,
    totalCancellationCost,
    pmiSavings.monthly
  );

  const confidenceLevel = currentLtvRatio < 78 ? 'High' : currentLtvRatio < 80 ? 'Medium' : 'Low';

  const rationale = [];
  if (currentLtvRatio <= inputs.automaticCancellationLtv) {
    rationale.push('Already eligible for automatic cancellation');
  }
  if (breakEven.months < 24) {
    rationale.push('Reasonable break-even period');
  }
  if (currentLtvRatio > inputs.automaticCancellationLtv) {
    rationale.push('Waiting for natural equity build');
  }

  const scenarioAnalysis = generateScenarioAnalysis(inputs);

  const risksOfCancellation = [
    'Potential property value decline',
    'Appraisal costs if value decreased',
    'Processing delays and paperwork',
    'Possible lender fees'
  ];

  const benefitsOfCancellation = [
    'Monthly cash flow improvement',
    'Elimination of unnecessary insurance',
    'Simplified mortgage payment',
    'Potential for loan modification'
  ];

  const opportunityCostOfWaiting = pmiSavings.monthly * monthsToAutomaticCancellation;

  const requiredDocuments = [
    'Recent appraisal',
    'Pay stubs',
    'Tax returns',
    'Bank statements',
    'Loan statements'
  ];

  const estimatedProcessingTime = currentLtvRatio <= inputs.lenderCancellationLtv ? 30 : 45;
  const successRate = currentLtvRatio <= inputs.automaticCancellationLtv ? 95 :
                     currentLtvRatio <= inputs.lenderCancellationLtv ? 85 : 70;

  const refinanceOption = generateRefinanceOption(inputs, currentLtvRatio);

  const loanModificationOption = {
    estimatedCost: 1000,
    estimatedSavings: pmiSavings.monthly * 12,
    feasibility: (currentLtvRatio < 95 ? 'High' : currentLtvRatio < 97 ? 'Medium' : 'Low') as 'High' | 'Medium' | 'Low'
  };

  const monthlyCashFlowImprovement = pmiSavings.monthly;
  const annualCashFlowImprovement = pmiSavings.annual;
  const totalCashFlowImprovement = pmiSavings.total;

  const equityBuildRate = monthlyPrincipalPayment + monthlyAppreciation;
  const loanPaydownRate = monthlyPrincipalPayment;
  const remainingPrincipal = inputs.currentLoanBalance;

  const currentMarketValue = inputs.currentPropertyValue;
  const marketTrend = inputs.expectedPropertyAppreciation > 3 ? 'Appreciating' :
                     inputs.expectedPropertyAppreciation > 0 ? 'Stable' : 'Declining';
  const marketVolatility = 'Medium' as const;

  const federalProtections = [
    'Automatic cancellation at 78% LTV',
    'Lender must respond within 30 days',
    'No fee for automatic cancellation'
  ];

  const stateSpecificRequirements = [
    'Check state-specific PMI laws',
    'Some states require lower LTV thresholds',
    'State insurance guarantee associations may apply'
  ];

  const lenderSpecificPolicies = [
    'Each lender has different policies',
    'Some lenders cancel at 75% LTV',
    'Documentation requirements vary'
  ];

  return {
    currentLtvRatio,
    equityPercentage,
    monthsToAutomaticCancellation,
    monthsToLenderCancellation,
    monthlyPmiSavings: pmiSavings.monthly,
    annualPmiSavings: pmiSavings.annual,
    totalPmiSavings: pmiSavings.total,
    lifetimePmiSavings: inputs.monthlyPmiPayment * inputs.originalLoanTerm * 12,
    breakEvenMonths: breakEven.months,
    breakEvenYears: breakEven.years,
    totalCancellationCost,
    netSavings,
    taxSavingsFromCancellation,
    afterTaxMonthlySavings,
    afterTaxAnnualSavings,
    projectedLtvAtAutomaticCancellation,
    projectedLtvAtLenderCancellation,
    projectedEquityAtAutomaticCancellation,
    projectedEquityAtLenderCancellation,
    costBenefitRatio,
    returnOnCancellationInvestment,
    paybackPeriod,
    recommendedAction,
    confidenceLevel,
    rationale,
    ...scenarioAnalysis,
    risksOfCancellation,
    benefitsOfCancellation,
    opportunityCostOfWaiting,
    requiredDocuments,
    estimatedProcessingTime,
    successRate,
    refinanceOption,
    loanModificationOption,
    monthlyCashFlowImprovement,
    annualCashFlowImprovement,
    totalCashFlowImprovement,
    equityBuildRate,
    loanPaydownRate,
    remainingPrincipal,
    currentMarketValue,
    marketTrend,
    marketVolatility,
    federalProtections,
    stateSpecificRequirements,
    lenderSpecificPolicies
  };
}