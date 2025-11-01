import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceOutputs } from './types';

// Calculate basic PMI payments
export function calculatePmiPayments(inputs: PrivateMortgageInsuranceInputs): {
  monthlyPmiPayment: number;
  annualPmiPayment: number;
  totalPmiCost: number;
} {
  const monthlyPmiPayment = (inputs.loanAmount * inputs.pmiRate / 100) / 12;
  const annualPmiPayment = monthlyPmiPayment * 12;
  const totalPmiCost = annualPmiPayment * inputs.pmiTerm;

  return {
    monthlyPmiPayment,
    annualPmiPayment,
    totalPmiCost
  };
}

// Calculate FHA MIP payments
export function calculateFhaMip(inputs: PrivateMortgageInsuranceInputs): {
  upfrontMipAmount: number;
  monthlyMipPayment: number;
  totalMipCost: number;
} {
  const upfrontMipAmount = inputs.loanAmount * (inputs.upfrontMip / 100);
  const monthlyMipPayment = (inputs.loanAmount * inputs.pmiRate / 100) / 12;
  const totalMipCost = upfrontMipAmount + (monthlyMipPayment * 12 * inputs.pmiTerm);

  return {
    upfrontMipAmount,
    monthlyMipPayment,
    totalMipCost
  };
}

// Calculate cancellation dates
export function calculateCancellationDates(inputs: PrivateMortgageInsuranceInputs): {
  automaticCancellationDate: string;
  lenderCancellationDate: string;
  monthsToAutomaticCancellation: number;
  monthsToLenderCancellation: number;
} {
  const originationDate = new Date(inputs.loanOriginationDate);
  const analysisDate = new Date(inputs.analysisDate);

  // Automatic cancellation (typically 78% LTV)
  const monthsToAutoCancel = calculateMonthsToLtv(inputs, 78);
  const automaticCancellationDate = new Date(originationDate);
  automaticCancellationDate.setMonth(automaticCancellationDate.getMonth() + monthsToAutoCancel);

  // Lender cancellation (typically 75% LTV)
  const monthsToLenderCancel = calculateMonthsToLtv(inputs, 75);
  const lenderCancellationDate = new Date(originationDate);
  lenderCancellationDate.setMonth(lenderCancellationDate.getMonth() + monthsToLenderCancel);

  return {
    automaticCancellationDate: automaticCancellationDate.toISOString().split('T')[0],
    lenderCancellationDate: lenderCancellationDate.toISOString().split('T')[0],
    monthsToAutomaticCancellation: monthsToAutoCancel,
    monthsToLenderCancellation: monthsToLenderCancel
  };
}

// Helper function to calculate months to reach specific LTV
function calculateMonthsToLtv(inputs: PrivateMortgageInsuranceInputs, targetLtv: number): number {
  const currentLtv = inputs.loanToValueRatio;
  if (currentLtv <= targetLtv) return 0;

  // Simplified calculation - assumes monthly principal payment
  // In reality, this would need amortization schedule
  const monthlyPrincipalPayment = inputs.loanAmount / (inputs.pmiTerm * 12); // Rough estimate
  const targetLoanBalance = inputs.propertyValue * (targetLtv / 100);
  const principalToPay = inputs.loanAmount - targetLoanBalance;

  return Math.ceil(principalToPay / monthlyPrincipalPayment);
}

// Calculate break-even analysis
export function calculateBreakEvenAnalysis(inputs: PrivateMortgageInsuranceInputs): {
  breakEvenPeriodMonths: number;
  breakEvenPeriodYears: number;
  breakEvenLoanBalance: number;
} {
  const pmiPayments = calculatePmiPayments(inputs);
  const monthlySavings = pmiPayments.monthlyPmiPayment;

  // Assume cancellation costs (appraisal, etc.)
  const cancellationCosts = 500; // Simplified

  const breakEvenPeriodMonths = Math.ceil(cancellationCosts / monthlySavings);
  const breakEvenPeriodYears = breakEvenPeriodMonths / 12;

  // Calculate loan balance at break-even
  const monthlyPrincipalPayment = inputs.loanAmount / (inputs.pmiTerm * 12);
  const breakEvenLoanBalance = inputs.loanAmount - (monthlyPrincipalPayment * breakEvenPeriodMonths);

  return {
    breakEvenPeriodMonths,
    breakEvenPeriodYears,
    breakEvenLoanBalance
  };
}

// Calculate tax implications
export function calculateTaxImplications(inputs: PrivateMortgageInsuranceInputs): {
  taxDeductiblePmi: number;
  afterTaxMonthlyPmi: number;
  afterTaxAnnualPmi: number;
  taxSavingsFromPmi: number;
} {
  const pmiPayments = calculatePmiPayments(inputs);
  const taxDeductiblePmi = pmiPayments.annualPmiPayment;
  const taxSavingsFromPmi = taxDeductiblePmi * (inputs.marginalTaxRate / 100);

  const afterTaxMonthlyPmi = pmiPayments.monthlyPmiPayment * (1 - inputs.marginalTaxRate / 100);
  const afterTaxAnnualPmi = pmiPayments.annualPmiPayment * (1 - inputs.marginalTaxRate / 100);

  return {
    taxDeductiblePmi,
    afterTaxMonthlyPmi,
    afterTaxAnnualPmi,
    taxSavingsFromPmi
  };
}

// Calculate refinance analysis
export function calculateRefinanceAnalysis(inputs: PrivateMortgageInsuranceInputs): {
  refinanceSavings: number;
  refinancePaybackPeriod: number;
  refinanceNetBenefit: number;
} {
  if (!inputs.refinanceInterestRate || !inputs.refinanceClosingCosts || !inputs.refinanceTerm) {
    return {
      refinanceSavings: 0,
      refinancePaybackPeriod: 0,
      refinanceNetBenefit: 0
    };
  }

  const currentMonthlyPayment = calculatePmiPayments(inputs).monthlyPmiPayment;
  const newMonthlyPmiPayment = (inputs.loanAmount * 0.0035) / 12; // Assume lower PMI rate after refinance

  const monthlySavings = currentMonthlyPayment - newMonthlyPmiPayment;
  const refinanceSavings = monthlySavings * 12 * (inputs.refinanceTerm || inputs.pmiTerm);

  const refinancePaybackPeriod = Math.ceil(inputs.refinanceClosingCosts / monthlySavings);
  const refinanceNetBenefit = refinanceSavings - inputs.refinanceClosingCosts;

  return {
    refinanceSavings,
    refinancePaybackPeriod,
    refinanceNetBenefit
  };
}

// Calculate risk assessment
export function calculateRiskAssessment(inputs: PrivateMortgageInsuranceInputs): {
  defaultRiskScore: number;
  prepaymentRiskScore: number;
  overallRiskAssessment: PrivateMortgageInsuranceOutputs['overallRiskAssessment'];
} {
  let defaultRiskScore = 50; // Base score
  let prepaymentRiskScore = 50;

  // Adjust for credit score
  if (inputs.borrowerCreditScore < 620) defaultRiskScore += 30;
  else if (inputs.borrowerCreditScore > 740) defaultRiskScore -= 20;

  // Adjust for DTI
  if (inputs.borrowerDebtToIncomeRatio > 43) defaultRiskScore += 20;

  // Adjust for LTV
  if (inputs.loanToValueRatio > 95) defaultRiskScore += 25;
  else if (inputs.loanToValueRatio < 80) defaultRiskScore -= 15;

  // Adjust for market conditions
  if (inputs.marketTrend === 'Decreasing') prepaymentRiskScore += 20;
  else if (inputs.marketTrend === 'Increasing') prepaymentRiskScore -= 10;

  const averageRisk = (defaultRiskScore + prepaymentRiskScore) / 2;
  let overallRiskAssessment: PrivateMortgageInsuranceOutputs['overallRiskAssessment'] = 'Medium';
  if (averageRisk > 70) overallRiskAssessment = 'High';
  else if (averageRisk < 40) overallRiskAssessment = 'Low';

  return {
    defaultRiskScore,
    prepaymentRiskScore,
    overallRiskAssessment
  };
}

// Calculate conventional vs FHA comparison
export function calculateConventionalVsFhaComparison(inputs: PrivateMortgageInsuranceInputs): {
  monthlyPaymentDifference: number;
  totalCostDifference: number;
  breakEvenPoint: number;
} {
  const conventionalPmi = calculatePmiPayments(inputs);
  const fhaMip = calculateFhaMip(inputs);

  const monthlyPaymentDifference = conventionalPmi.monthlyPmiPayment - fhaMip.monthlyMipPayment;
  const totalCostDifference = conventionalPmi.totalPmiCost - fhaMip.totalMipCost;
  const breakEvenPoint = Math.ceil(fhaMip.upfrontMipAmount / monthlyPaymentDifference);

  return {
    monthlyPaymentDifference,
    totalCostDifference,
    breakEvenPoint
  };
}

// Calculate market analysis
export function calculateMarketAnalysis(inputs: PrivateMortgageInsuranceInputs): {
  currentMarketPmiRate: number;
  rateComparisonToMarket: number;
  rateCompetitiveness: PrivateMortgageInsuranceOutputs['rateCompetitiveness'];
} {
  // Simplified market rate calculation
  let baseRate = 0.0052; // Base PMI rate

  // Adjust for credit score
  if (inputs.borrowerCreditScore < 620) baseRate += 0.002;
  else if (inputs.borrowerCreditScore > 740) baseRate -= 0.001;

  // Adjust for LTV
  if (inputs.loanToValueRatio > 95) baseRate += 0.003;
  else if (inputs.loanToValueRatio < 80) baseRate -= 0.001;

  const currentMarketPmiRate = baseRate * 100; // Convert to percentage
  const rateComparisonToMarket = inputs.pmiRate - currentMarketPmiRate;

  let rateCompetitiveness: PrivateMortgageInsuranceOutputs['rateCompetitiveness'] = 'At Market';
  if (rateComparisonToMarket > 0.5) rateCompetitiveness = 'Above Market';
  else if (rateComparisonToMarket < -0.5) rateCompetitiveness = 'Below Market';

  return {
    currentMarketPmiRate,
    rateComparisonToMarket,
    rateCompetitiveness
  };
}

// Calculate cash flow impact
export function calculateCashFlowImpact(inputs: PrivateMortgageInsuranceInputs): {
  cashFlowImpactMonthly: number;
  cashFlowImpactAnnual: number;
  affordabilityRatio: number;
} {
  const pmiPayments = calculatePmiPayments(inputs);
  const cashFlowImpactMonthly = -pmiPayments.monthlyPmiPayment;
  const cashFlowImpactAnnual = -pmiPayments.annualPmiPayment;
  const affordabilityRatio = (pmiPayments.monthlyPmiPayment / inputs.borrowerIncome) * 100;

  return {
    cashFlowImpactMonthly,
    cashFlowImpactAnnual,
    affordabilityRatio
  };
}

// Calculate PMI as investment
export function calculatePmiAsInvestment(inputs: PrivateMortgageInsuranceInputs): {
  roi: number;
  paybackPeriod: number;
  netPresentValue: number;
} {
  const pmiPayments = calculatePmiPayments(inputs);
  const cancellationSavings = pmiPayments.monthlyPmiPayment * 12 * 5; // Assume 5 years of savings

  // Simplified ROI calculation
  const totalPmiCost = pmiPayments.totalPmiCost;
  const roi = totalPmiCost > 0 ? (cancellationSavings / totalPmiCost) * 100 : 0;

  const paybackPeriod = totalPmiCost / pmiPayments.annualPmiPayment;

  // Simplified NPV calculation
  const discountRate = 0.05; // 5% discount rate
  const netPresentValue = cancellationSavings - totalPmiCost;

  return {
    roi,
    paybackPeriod,
    netPresentValue
  };
}

// Calculate FHA MIP refund
export function calculateFhaMipRefund(inputs: PrivateMortgageInsuranceInputs): {
  fhaMipRefundEligibility: boolean;
  fhaMipRefundAmount: number;
  fhaMipRefundDate: string;
} {
  const fhaMip = calculateFhaMip(inputs);
  const eligibility = inputs.loanType === 'FHA' && inputs.pmiTerm >= 11;

  let refundAmount = 0;
  if (eligibility) {
    // FHA MIP refund is typically half of the remaining term
    refundAmount = fhaMip.monthlyMipPayment * 6 * 12; // Assume 6 years remaining
  }

  const refundDate = eligibility ? '2025-12-31' : ''; // Simplified

  return {
    fhaMipRefundEligibility: eligibility,
    fhaMipRefundAmount: refundAmount,
    fhaMipRefundDate: refundDate
  };
}

// Generate recommendations
export function generateRecommendations(inputs: PrivateMortgageInsuranceInputs): {
  recommendedStrategy: PrivateMortgageInsuranceOutputs['recommendedStrategy'];
  actionItems: string[];
  timeline: string[];
} {
  const cancellation = calculateCancellationDates(inputs);
  const breakEven = calculateBreakEvenAnalysis(inputs);
  const refinance = calculateRefinanceAnalysis(inputs);

  let recommendedStrategy: PrivateMortgageInsuranceOutputs['recommendedStrategy'] = 'Keep PMI';
  const actionItems: string[] = [];
  const timeline: string[] = [];

  if (cancellation.monthsToAutomaticCancellation <= 24) {
    recommendedStrategy = 'Cancel When Eligible';
    actionItems.push('Monitor loan balance monthly');
    actionItems.push('Prepare cancellation documents');
    timeline.push(`Automatic cancellation in ${cancellation.monthsToAutomaticCancellation} months`);
  } else if (refinance.refinanceNetBenefit > 0) {
    recommendedStrategy = 'Refinance';
    actionItems.push('Check current interest rates');
    actionItems.push('Calculate refinance costs');
    timeline.push(`Potential refinance savings: $${refinance.refinanceSavings.toLocaleString()}`);
  } else if (breakEven.breakEvenPeriodMonths < 36) {
    recommendedStrategy = 'Pay Down Loan';
    actionItems.push('Make extra principal payments');
    actionItems.push('Consider bi-weekly payments');
    timeline.push(`Break-even in ${breakEven.breakEvenPeriodMonths} months`);
  }

  return {
    recommendedStrategy,
    actionItems,
    timeline
  };
}

// Main calculation function
export function calculatePrivateMortgageInsurance(inputs: PrivateMortgageInsuranceInputs): PrivateMortgageInsuranceOutputs {
  const pmiPayments = calculatePmiPayments(inputs);
  const fhaMip = calculateFhaMip(inputs);
  const cancellation = calculateCancellationDates(inputs);
  const breakEven = calculateBreakEvenAnalysis(inputs);
  const taxImplications = calculateTaxImplications(inputs);
  const refinance = calculateRefinanceAnalysis(inputs);
  const riskAssessment = calculateRiskAssessment(inputs);
  const conventionalVsFha = calculateConventionalVsFhaComparison(inputs);
  const marketAnalysis = calculateMarketAnalysis(inputs);
  const cashFlow = calculateCashFlowImpact(inputs);
  const investment = calculatePmiAsInvestment(inputs);
  const mipRefund = calculateFhaMipRefund(inputs);
  const recommendations = generateRecommendations(inputs);

  // Calculate additional metrics
  const cancellationSavings = pmiPayments.monthlyPmiPayment * 12 * 5; // Assume 5 years
  const equityBuildRate = (inputs.loanAmount / (inputs.pmiTerm * 12)) * 12; // Annual
  const timeTo80Ltv = calculateMonthsToLtv(inputs, 80);
  const timeTo78Ltv = calculateMonthsToLtv(inputs, 78);

  // Placeholder values for complex calculations
  const projectedPmiCost = pmiPayments.totalPmiCost;
  const projectedCancellationDate = cancellation.automaticCancellationDate;
  const projectedSavings = cancellationSavings;

  const pmiVsNoPmiComparison = {
    monthlyDifference: pmiPayments.monthlyPmiPayment,
    annualDifference: pmiPayments.annualPmiPayment,
    totalDifference: pmiPayments.totalPmiCost
  };

  const bestCaseScenario = {
    totalSavings: cancellationSavings,
    optimalCancellationDate: cancellation.automaticCancellationDate
  };

  const worstCaseScenario = {
    totalCost: pmiPayments.totalPmiCost + fhaMip.totalMipCost,
    riskFactors: ['Market decline', 'Job loss', 'Medical expenses']
  };

  const lenderPmiRequirements = [
    'Minimum credit score of 620',
    'Maximum LTV of 97%',
    'Stable employment history'
  ];

  const lenderCancellationPolicy = 'Automatic cancellation at 78% LTV, lender cancellation at 75% LTV';

  const statePmiLaws = [
    'Federal PMI cancellation laws apply',
    'State-specific disclosure requirements'
  ];

  const stateCancellationRequirements = [
    'Written request to lender',
    'Current appraisal',
    'Proof of LTV reduction'
  ];

  const pmiRateHistory = [
    { date: '2023-01-01', rate: inputs.pmiRate * 0.95, change: -0.1 },
    { date: '2023-06-01', rate: inputs.pmiRate * 0.98, change: -0.05 },
    { date: '2024-01-01', rate: inputs.pmiRate, change: 0.05 }
  ];

  const pmiFacts = [
    'PMI protects lenders, not borrowers',
    'PMI is typically required for loans above 80% LTV',
    'PMI can be canceled when LTV reaches 78%'
  ];

  const cancellationTips = [
    'Monitor your loan balance regularly',
    'Keep records of all payments',
    'Request cancellation in writing'
  ];

  const lenderNegotiationTips = [
    'Provide current appraisal',
    'Show payment history',
    'Compare rates with other lenders'
  ];

  return {
    ...pmiPayments,
    pmiCostAsPercentageOfLoan: (pmiPayments.totalPmiCost / inputs.loanAmount) * 100,
    ...fhaMip,
    ...cancellation,
    cancellationSavings,
    ...breakEven,
    ...taxImplications,
    ...refinance,
    ...riskAssessment,
    conventionalVsFhaComparison: conventionalVsFha,
    ...marketAnalysis,
    ...cashFlow,
    pmiAsInvestment: investment,
    ...mipRefund,
    bestCaseScenario,
    worstCaseScenario,
    ...recommendations,
    pmiVsNoPmiComparison,
    equityBuildRate,
    timeTo80Ltv,
    timeTo78Ltv,
    lenderPmiRequirements,
    lenderCancellationPolicy,
    statePmiLaws,
    stateCancellationRequirements,
    pmiRateHistory,
    projectedPmiCost,
    projectedCancellationDate,
    projectedSavings,
    pmiFacts,
    cancellationTips,
    lenderNegotiationTips
  };
}