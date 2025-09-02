import { PMICancellationInputs, PMICancellationOutputs, PMICancellationAnalysis, PMICancellationMetrics } from './types';

export function calculatePMICancellation(inputs: PMICancellationInputs): PMICancellationOutputs {
  // Calculate basic PMI metrics
  const currentLtvRatio = calculateCurrentLTVRatio(inputs);
  const requiredLtvRatio = inputs.ltvThreshold;
  const ltvGap = requiredLtvRatio - currentLtvRatio;
  const pmiEligibility = currentLtvRatio <= requiredLtvRatio;
  
  // Calculate PMI costs and savings
  const totalPMIPaid = calculateTotalPMIPaid(inputs);
  const remainingPMICost = calculateRemainingPMICost(inputs);
  const pmiSavings = inputs.pmiMonthlyPayment * 12; // Annual savings
  const monthlyPMISavings = inputs.pmiMonthlyPayment;
  const annualPMISavings = pmiSavings;
  
  // Calculate timeline
  const automaticCancellationDate = calculateAutomaticCancellationDate(inputs);
  const requestCancellationDate = calculateRequestCancellationDate(inputs);
  const monthsToAutomaticCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const monthsToRequestCancellation = calculateMonthsToRequestCancellation(inputs);
  
  // Calculate payment analysis
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const monthlyPaymentWithoutPMI = monthlyPayment - inputs.pmiMonthlyPayment;
  const paymentReduction = inputs.pmiMonthlyPayment;
  const totalPaymentSavings = calculateTotalPaymentSavings(inputs);
  
  // Calculate equity analysis
  const currentEquity = inputs.currentPropertyValue - inputs.currentLoanBalance;
  const equityPercentage = (currentEquity / inputs.currentPropertyValue) * 100;
  const equityGrowth = currentEquity - (inputs.originalPropertyValue - inputs.originalLoanAmount);
  const equityRequired = inputs.currentPropertyValue * (requiredLtvRatio / 100) - inputs.currentLoanBalance;
  
  // Calculate break-even analysis
  const breakEvenPoint = calculateBreakEvenPoint(inputs);
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const breakEvenCost = inputs.appraisalCost;
  const netSavings = totalPaymentSavings - breakEvenCost;
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    currentLtvRatio,
    pmiEligibility,
    monthlyPMISavings,
    totalPaymentSavings,
    riskScore
  });
  
  // Generate timeline analysis
  const timelineAnalysis = generateTimelineAnalysis(inputs);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, {
    automaticCancellationDate,
    requestCancellationDate,
    totalPaymentSavings,
    breakEvenCost
  });
  
  // Generate metrics breakdown
  const metrics = generateMetrics(inputs, {
    currentLtvRatio,
    requiredLtvRatio,
    ltvGap,
    pmiEligibility,
    totalPMIPaid,
    remainingPMICost,
    pmiSavings,
    monthlyPMISavings,
    annualPMISavings,
    automaticCancellationDate,
    requestCancellationDate,
    monthsToAutomaticCancellation,
    monthsToRequestCancellation,
    monthlyPayment,
    monthlyPaymentWithoutPMI,
    paymentReduction,
    totalPaymentSavings,
    currentEquity,
    equityPercentage,
    equityGrowth,
    equityRequired,
    breakEvenPoint,
    breakEvenMonths,
    breakEvenCost,
    netSavings,
    riskScore
  });

  return {
    pmiEligibility,
    currentLtvRatio,
    monthlyPMISavings,
    totalPMISavings: totalPaymentSavings,
    breakEvenMonths,
    automaticCancellationDate,
    requestCancellationDate,
    riskScore,
    analysis,
    timelineAnalysis,
    comparisonAnalysis,
    metrics
  };
}

function calculateCurrentLTVRatio(inputs: PMICancellationInputs): number {
  return (inputs.currentLoanBalance / inputs.currentPropertyValue) * 100;
}

function calculateTotalPMIPaid(inputs: PMICancellationInputs): number {
  return inputs.pmiMonthlyPayment * inputs.monthsSinceLoanStart;
}

function calculateRemainingPMICost(inputs: PMICancellationInputs): number {
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  return inputs.pmiMonthlyPayment * monthsToCancellation;
}

function calculateAutomaticCancellationDate(inputs: PMICancellationInputs): string {
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const startDate = new Date(inputs.loanStartDate);
  const cancellationDate = new Date(startDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
  return cancellationDate.toISOString().split('T')[0];
}

function calculateRequestCancellationDate(inputs: PMICancellationInputs): string {
  const monthsToCancellation = calculateMonthsToRequestCancellation(inputs);
  const startDate = new Date(inputs.loanStartDate);
  const cancellationDate = new Date(startDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
  return cancellationDate.toISOString().split('T')[0];
}

function calculateMonthsToAutomaticCancellation(inputs: PMICancellationInputs): number {
  // For conventional loans, PMI automatically cancels when LTV reaches 78%
  // For FHA loans, PMI is typically for the life of the loan unless refinanced
  if (inputs.loanType === 'fha') {
    return 999; // Effectively never for FHA loans
  }
  
  const currentLtv = calculateCurrentLTVRatio(inputs);
  if (currentLtv <= 78) {
    return 0; // Already eligible
  }
  
  // Calculate months needed to reach 78% LTV
  const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
  const ltvGap = currentLtv - 78;
  const equityNeeded = (ltvGap / 100) * inputs.currentPropertyValue;
  
  return Math.ceil(equityNeeded / monthlyPrincipalPayment);
}

function calculateMonthsToRequestCancellation(inputs: PMICancellationInputs): number {
  // For conventional loans, can request cancellation when LTV reaches 80%
  const currentLtv = calculateCurrentLTVRatio(inputs);
  if (currentLtv <= 80) {
    return 0; // Already eligible
  }
  
  // Calculate months needed to reach 80% LTV
  const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
  const ltvGap = currentLtv - 80;
  const equityNeeded = (ltvGap / 100) * inputs.currentPropertyValue;
  
  return Math.ceil(equityNeeded / monthlyPrincipalPayment);
}

function calculateMonthlyPrincipalPayment(inputs: PMICancellationInputs): number {
  // Simplified calculation - in reality, this would be from amortization schedule
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const monthlyInterest = inputs.currentLoanBalance * (inputs.interestRate / 100) / 12;
  return monthlyPayment - monthlyInterest - inputs.pmiMonthlyPayment;
}

function calculateMonthlyPayment(inputs: PMICancellationInputs): number {
  const principal = inputs.currentLoanBalance;
  const rate = inputs.interestRate / 100 / 12;
  const term = inputs.loanTerm * 12;
  
  if (rate === 0) return principal / term;
  
  return principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
}

function calculateTotalPaymentSavings(inputs: PMICancellationInputs): number {
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  return inputs.pmiMonthlyPayment * monthsToCancellation;
}

function calculateBreakEvenPoint(inputs: PMICancellationInputs): number {
  return inputs.appraisalCost / inputs.pmiMonthlyPayment;
}

function calculateBreakEvenMonths(inputs: PMICancellationInputs): number {
  return Math.ceil(calculateBreakEvenPoint(inputs));
}

function calculateRiskScore(inputs: PMICancellationInputs): number {
  let riskScore = 50; // Base score
  
  // Market condition risk
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 20; break;
    case 'stable': break;
    case 'growing': riskScore -= 10; break;
    case 'hot': riskScore -= 5; break;
  }
  
  // Property appreciation risk
  if (inputs.propertyAppreciationRate < 0) riskScore += 15;
  else if (inputs.propertyAppreciationRate > 5) riskScore -= 10;
  
  // Credit score risk
  if (inputs.borrowerCreditScore < 650) riskScore += 15;
  else if (inputs.borrowerCreditScore > 750) riskScore -= 10;
  
  // Debt-to-income ratio risk
  if (inputs.borrowerDebtToIncomeRatio > 43) riskScore += 15;
  else if (inputs.borrowerDebtToIncomeRatio < 30) riskScore -= 5;
  
  // Employment type risk
  switch (inputs.borrowerEmploymentType) {
    case 'self_employed': riskScore += 10; break;
    case 'business_owner': riskScore += 5; break;
    case 'employed': riskScore -= 5; break;
    case 'retired': riskScore += 5; break;
  }
  
  // Loan type risk
  switch (inputs.loanType) {
    case 'fha': riskScore += 20; break; // PMI doesn't automatically cancel
    case 'conventional': riskScore -= 10; break;
    case 'va': riskScore -= 5; break;
    case 'usda': riskScore += 5; break;
    case 'jumbo': riskScore += 10; break;
  }
  
  return Math.max(0, Math.min(100, riskScore));
}

function generateAnalysis(
  inputs: PMICancellationInputs,
  metrics: {
    currentLtvRatio: number;
    pmiEligibility: boolean;
    monthlyPMISavings: number;
    totalPaymentSavings: number;
    riskScore: number;
  }
): PMICancellationAnalysis {
  const { currentLtvRatio, pmiEligibility, monthlyPMISavings, totalPaymentSavings, riskScore } = metrics;
  
  // Determine cancellation rating
  let cancellationRating = 'Not Eligible';
  if (pmiEligibility) {
    if (currentLtvRatio <= 78) cancellationRating = 'Eligible Now';
    else if (currentLtvRatio <= 80) cancellationRating = 'Eligible Soon';
    else cancellationRating = 'Requires Action';
  }
  
  // Determine savings rating
  let savingsRating = 'No Savings';
  const annualSavings = monthlyPMISavings * 12;
  if (annualSavings >= 2000) savingsRating = 'High Savings';
  else if (annualSavings >= 1000) savingsRating = 'Good Savings';
  else if (annualSavings >= 500) savingsRating = 'Moderate Savings';
  else if (annualSavings > 0) savingsRating = 'Low Savings';
  
  // Determine recommendation
  let recommendation = 'Requires Review';
  if (pmiEligibility && currentLtvRatio <= 78) recommendation = 'Cancel Now';
  else if (pmiEligibility && currentLtvRatio <= 80) recommendation = 'Request Cancellation';
  else if (currentLtvRatio <= 85) recommendation = 'Wait';
  else if (inputs.loanType === 'fha') recommendation = 'Refinance';
  
  // Generate key strengths
  const keyStrengths: string[] = [];
  if (pmiEligibility) keyStrengths.push('Eligible for PMI cancellation');
  if (currentLtvRatio <= 85) keyStrengths.push('Close to PMI cancellation threshold');
  if (monthlyPMISavings > 100) keyStrengths.push('Significant monthly savings potential');
  if (riskScore <= 40) keyStrengths.push('Low risk profile');
  if (inputs.borrowerCreditScore >= 750) keyStrengths.push('Excellent credit score');
  if (inputs.borrowerDebtToIncomeRatio <= 35) keyStrengths.push('Strong debt-to-income ratio');
  
  // Generate key weaknesses
  const keyWeaknesses: string[] = [];
  if (!pmiEligibility) keyWeaknesses.push('Not yet eligible for PMI cancellation');
  if (currentLtvRatio > 90) keyWeaknesses.push('High loan-to-value ratio');
  if (inputs.loanType === 'fha') keyWeaknesses.push('FHA loans require refinancing to remove PMI');
  if (riskScore >= 70) keyWeaknesses.push('High risk profile');
  if (inputs.borrowerCreditScore < 650) keyWeaknesses.push('Credit score may limit refinancing options');
  if (inputs.borrowerDebtToIncomeRatio > 43) keyWeaknesses.push('High debt-to-income ratio');
  
  // Generate risk assessments
  const marketRisk = generateMarketRiskAssessment(inputs);
  const appraisalRisk = generateAppraisalRiskAssessment(inputs);
  const timingRisk = generateTimingRiskAssessment(inputs);
  
  return {
    cancellationRating,
    savingsRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    marketRisk,
    appraisalRisk,
    timingRisk
  };
}

function generateMarketRiskAssessment(inputs: PMICancellationInputs): string {
  switch (inputs.marketCondition) {
    case 'declining':
      return 'High market risk - declining property values may delay PMI cancellation eligibility.';
    case 'stable':
      return 'Low market risk - stable property values support predictable PMI cancellation timeline.';
    case 'growing':
      return 'Moderate market risk - growing property values may accelerate PMI cancellation.';
    case 'hot':
      return 'Low market risk - strong property appreciation likely to expedite PMI cancellation.';
    default:
      return 'Standard market risk assessment.';
  }
}

function generateAppraisalRiskAssessment(inputs: PMICancellationInputs): string {
  if (inputs.appraisalRequired) {
    return 'Appraisal required for PMI cancellation - risk of lower than expected property value.';
  }
  return 'No appraisal required - automatic cancellation based on loan amortization.';
}

function generateTimingRiskAssessment(inputs: PMICancellationInputs): string {
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  if (monthsToCancellation <= 6) {
    return 'Low timing risk - PMI cancellation expected within 6 months.';
  } else if (monthsToCancellation <= 12) {
    return 'Moderate timing risk - PMI cancellation expected within 12 months.';
  } else {
    return 'High timing risk - PMI cancellation may take more than 12 months.';
  }
}

function generateTimelineAnalysis(inputs: PMICancellationInputs): Array<{
  month: number;
  date: string;
  ltvRatio: number;
  pmiPayment: number;
  cumulativePMI: number;
  eligibility: boolean;
}> {
  const timeline: Array<{
    month: number;
    date: string;
    ltvRatio: number;
    pmiPayment: number;
    cumulativePMI: number;
    eligibility: boolean;
  }> = [];
  
  const startDate = new Date(inputs.loanStartDate);
  let currentBalance = inputs.originalLoanAmount;
  let cumulativePMI = 0;
  
  for (let month = 1; month <= 60; month++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + month);
    
    // Calculate new balance (simplified)
    const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
    currentBalance = Math.max(0, currentBalance - monthlyPrincipalPayment);
    
    // Calculate LTV ratio
    const projectedPropertyValue = inputs.currentPropertyValue * Math.pow(1 + inputs.propertyAppreciationRate / 100, month / 12);
    const ltvRatio = (currentBalance / projectedPropertyValue) * 100;
    
    // Determine PMI payment and eligibility
    const pmiPayment = ltvRatio > inputs.ltvThreshold ? inputs.pmiMonthlyPayment : 0;
    const eligibility = ltvRatio <= inputs.ltvThreshold;
    
    cumulativePMI += pmiPayment;
    
    timeline.push({
      month,
      date: date.toISOString().split('T')[0],
      ltvRatio,
      pmiPayment,
      cumulativePMI,
      eligibility
    });
    
    // Stop if PMI is cancelled
    if (eligibility) break;
  }
  
  return timeline;
}

function generateComparisonAnalysis(
  inputs: PMICancellationInputs,
  metrics: {
    automaticCancellationDate: string;
    requestCancellationDate: string;
    totalPaymentSavings: number;
    breakEvenCost: number;
  }
): Array<{
  option: string;
  cancellationDate: string;
  totalCost: number;
  totalSavings: number;
  netBenefit: number;
}> {
  const { automaticCancellationDate, requestCancellationDate, totalPaymentSavings, breakEvenCost } = metrics;
  
  return [
    {
      option: 'Automatic Cancellation',
      cancellationDate: automaticCancellationDate,
      totalCost: 0,
      totalSavings: totalPaymentSavings,
      netBenefit: totalPaymentSavings
    },
    {
      option: 'Request Cancellation',
      cancellationDate: requestCancellationDate,
      totalCost: inputs.appraisalCost,
      totalSavings: totalPaymentSavings,
      netBenefit: totalPaymentSavings - inputs.appraisalCost
    },
    {
      option: 'Refinance',
      cancellationDate: 'Immediate',
      totalCost: 3000, // Estimated refinancing costs
      totalSavings: totalPaymentSavings,
      netBenefit: totalPaymentSavings - 3000
    },
    {
      option: 'Do Nothing',
      cancellationDate: automaticCancellationDate,
      totalCost: 0,
      totalSavings: 0,
      netBenefit: 0
    }
  ];
}

function generateMetrics(
  inputs: PMICancellationInputs,
  metrics: any
): PMICancellationMetrics {
  return {
    currentLtvRatio: metrics.currentLtvRatio,
    requiredLtvRatio: inputs.ltvThreshold,
    ltvGap: metrics.ltvGap,
    pmiEligibility: metrics.pmiEligibility,
    totalPMIPaid: metrics.totalPMIPaid,
    remainingPMICost: metrics.remainingPMICost,
    pmiSavings: metrics.pmiSavings,
    monthlyPMISavings: metrics.monthlyPMISavings,
    annualPMISavings: metrics.annualPMISavings,
    automaticCancellationDate: metrics.automaticCancellationDate,
    requestCancellationDate: metrics.requestCancellationDate,
    monthsToAutomaticCancellation: metrics.monthsToAutomaticCancellation,
    monthsToRequestCancellation: metrics.monthsToRequestCancellation,
    monthlyPayment: metrics.monthlyPayment,
    monthlyPaymentWithoutPMI: metrics.monthlyPaymentWithoutPMI,
    paymentReduction: metrics.paymentReduction,
    totalPaymentSavings: metrics.totalPaymentSavings,
    currentEquity: metrics.currentEquity,
    equityPercentage: metrics.equityPercentage,
    equityGrowth: metrics.equityGrowth,
    equityRequired: metrics.equityRequired,
    breakEvenPoint: metrics.breakEvenPoint,
    breakEvenMonths: metrics.breakEvenMonths,
    breakEvenCost: metrics.breakEvenCost,
    netSavings: metrics.netSavings,
    riskScore: metrics.riskScore
  };
}