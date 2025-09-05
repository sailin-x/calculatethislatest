import { PMICancellationInputs, PMICancellationMetrics } from './types';

export function calculatePMICancellation(inputs: PMICancellationInputs): PMICancellationMetrics {
  // Calculate LTV ratios
  const currentLtvRatio = calculateCurrentLTVRatio(inputs);
  const requiredLtvRatio = calculateRequiredLTVRatio(inputs);
  const ltvGap = currentLtvRatio - requiredLtvRatio;

  // Calculate PMI eligibility
  const pmiEligibility = calculatePMIEligibility(inputs, currentLtvRatio, requiredLtvRatio);

  // Calculate PMI costs and savings
  const totalPMIPaid = calculateTotalPMIPaid(inputs);
  const remainingPMICost = calculateRemainingPMICost(inputs);
  const pmiSavings = calculatePMISavings(inputs);
  const monthlyPMISavings = inputs.pmiMonthlyPayment;
  const annualPMISavings = monthlyPMISavings * 12;

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
  const currentEquity = calculateCurrentEquity(inputs);
  const equityPercentage = currentEquity / inputs.currentPropertyValue;
  const equityGrowth = calculateEquityGrowth(inputs);
  const equityRequired = calculateEquityRequired(inputs);

  // Calculate break-even analysis
  const breakEvenPoint = calculateBreakEvenPoint(inputs);
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const breakEvenCost = calculateBreakEvenCost(inputs);
  const netSavings = pmiSavings - breakEvenCost;

  // Generate analysis components
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  const scenarios = generateScenarios(inputs);
  const timelineAnalysis = generateTimelineAnalysis(inputs);
  const comparisonAnalysis = generateComparisonAnalysis(inputs);
  const marketAnalysis = generateMarketAnalysis(inputs);

  // Calculate risk analysis
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfCancellation = calculateProbabilityOfCancellation(inputs, riskScore);
  const worstCaseScenario = calculateWorstCaseScenario(inputs);
  const bestCaseScenario = calculateBestCaseScenario(inputs);

  return {
    // PMI Analysis
    currentLtvRatio,
    requiredLtvRatio,
    ltvGap,
    pmiEligibility,
    
    // Cost Analysis
    totalPMIPaid,
    remainingPMICost,
    pmiSavings,
    monthlyPMISavings,
    annualPMISavings,
    
    // Timeline Analysis
    automaticCancellationDate,
    requestCancellationDate,
    monthsToAutomaticCancellation,
    monthsToRequestCancellation,
    
    // Payment Analysis
    monthlyPayment,
    monthlyPaymentWithoutPMI,
    paymentReduction,
    totalPaymentSavings,
    
    // Equity Analysis
    currentEquity,
    equityPercentage,
    equityGrowth,
    equityRequired,
    
    // Break-Even Analysis
    breakEvenPoint,
    breakEvenMonths,
    breakEvenCost,
    netSavings,
    
    // Analysis Components
    sensitivityMatrix,
    scenarios,
    timelineAnalysis,
    comparisonAnalysis,
    marketAnalysis,
    
    // Risk Analysis
    riskScore,
    probabilityOfCancellation,
    worstCaseScenario,
    bestCaseScenario
  };
}

function calculateCurrentLTVRatio(inputs: PMICancellationInputs): number {
  return inputs.currentLoanBalance / inputs.currentPropertyValue;
}

function calculateRequiredLTVRatio(inputs: PMICancellationInputs): number {
  // Standard PMI cancellation threshold is 80% LTV
  // Some loans may have different requirements
  return inputs.ltvThreshold || 0.8;
}

function calculatePMIEligibility(inputs: PMICancellationInputs, currentLtv: number, requiredLtv: number): boolean {
  // Check if current LTV meets the requirement
  if (currentLtv <= requiredLtv) {
    return true;
  }
  
  // Check if enough time has passed (typically 2 years for conventional loans)
  const loanStartDate = new Date(inputs.loanStartDate);
  const currentDate = new Date();
  const monthsSinceStart = (currentDate.getFullYear() - loanStartDate.getFullYear()) * 12 + 
                          (currentDate.getMonth() - loanStartDate.getMonth());
  
  // For conventional loans, need 2 years of payments and 80% LTV
  if (inputs.loanType === 'conventional' && monthsSinceStart >= 24) {
    return currentLtv <= 0.8;
  }
  
  // For FHA loans, PMI is typically for the life of the loan
  if (inputs.loanType === 'fha') {
    return false; // FHA loans typically don't allow PMI cancellation
  }
  
  return false;
}

function calculateTotalPMIPaid(inputs: PMICancellationInputs): number {
  const loanStartDate = new Date(inputs.loanStartDate);
  const currentDate = new Date();
  const monthsSinceStart = (currentDate.getFullYear() - loanStartDate.getFullYear()) * 12 + 
                          (currentDate.getMonth() - loanStartDate.getMonth());
  
  return inputs.pmiMonthlyPayment * Math.min(monthsSinceStart, inputs.paymentsMade);
}

function calculateRemainingPMICost(inputs: PMICancellationInputs): number {
  const monthsToCancellation = calculateMonthsToRequestCancellation(inputs);
  return inputs.pmiMonthlyPayment * monthsToCancellation;
}

function calculatePMISavings(inputs: PMICancellationInputs): number {
  const monthsToCancellation = calculateMonthsToRequestCancellation(inputs);
  const remainingPMICost = inputs.pmiMonthlyPayment * monthsToCancellation;
  const breakEvenCost = calculateBreakEvenCost(inputs);
  
  return remainingPMICost - breakEvenCost;
}

function calculateAutomaticCancellationDate(inputs: PMICancellationInputs): string {
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const currentDate = new Date();
  const cancellationDate = new Date(currentDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
  
  return cancellationDate.toISOString().split('T')[0];
}

function calculateRequestCancellationDate(inputs: PMICancellationInputs): string {
  const monthsToCancellation = calculateMonthsToRequestCancellation(inputs);
  const currentDate = new Date();
  const cancellationDate = new Date(currentDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
  
  return cancellationDate.toISOString().split('T')[0];
}

function calculateMonthsToAutomaticCancellation(inputs: PMICancellationInputs): number {
  // Automatic cancellation typically occurs at 78% LTV
  const targetLtv = 0.78;
  const currentLtv = calculateCurrentLTVRatio(inputs);
  
  if (currentLtv <= targetLtv) {
    return 0;
  }
  
  // Calculate months based on principal payments and appreciation
  const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
  const monthlyAppreciation = inputs.currentPropertyValue * inputs.propertyAppreciationRate / 12;
  
  const ltvReductionPerMonth = (monthlyPrincipalPayment + monthlyAppreciation) / inputs.currentPropertyValue;
  const ltvGap = currentLtv - targetLtv;
  
  return Math.ceil(ltvGap / ltvReductionPerMonth);
}

function calculateMonthsToRequestCancellation(inputs: PMICancellationInputs): number {
  const requiredLtv = calculateRequiredLTVRatio(inputs);
  const currentLtv = calculateCurrentLTVRatio(inputs);
  
  if (currentLtv <= requiredLtv) {
    return 0;
  }
  
  // Calculate months based on principal payments and appreciation
  const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
  const monthlyAppreciation = inputs.currentPropertyValue * inputs.propertyAppreciationRate / 12;
  
  const ltvReductionPerMonth = (monthlyPrincipalPayment + monthlyAppreciation) / inputs.currentPropertyValue;
  const ltvGap = currentLtv - requiredLtv;
  
  return Math.ceil(ltvGap / ltvReductionPerMonth);
}

function calculateMonthlyPrincipalPayment(inputs: PMICancellationInputs): number {
  // Calculate monthly principal payment using amortization formula
  const monthlyRate = inputs.interestRate / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  const monthlyPayment = inputs.currentLoanBalance * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const monthlyInterest = inputs.currentLoanBalance * monthlyRate;
  return monthlyPayment - monthlyInterest;
}

function calculateMonthlyPayment(inputs: PMICancellationInputs): number {
  // Calculate total monthly payment including PMI
  const monthlyRate = inputs.interestRate / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  const principalAndInterest = inputs.currentLoanBalance * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return principalAndInterest + inputs.pmiMonthlyPayment;
}

function calculateTotalPaymentSavings(inputs: PMICancellationInputs): number {
  const monthsToCancellation = calculateMonthsToRequestCancellation(inputs);
  return inputs.pmiMonthlyPayment * monthsToCancellation;
}

function calculateCurrentEquity(inputs: PMICancellationInputs): number {
  return inputs.currentPropertyValue - inputs.currentLoanBalance;
}

function calculateEquityGrowth(inputs: PMICancellationInputs): number {
  const originalEquity = inputs.originalPropertyValue - inputs.originalLoanAmount;
  const currentEquity = calculateCurrentEquity(inputs);
  return currentEquity - originalEquity;
}

function calculateEquityRequired(inputs: PMICancellationInputs): number {
  const requiredLtv = calculateRequiredLTVRatio(inputs);
  return inputs.currentPropertyValue * (1 - requiredLtv);
}

function calculateBreakEvenPoint(inputs: PMICancellationInputs): number {
  const breakEvenCost = calculateBreakEvenCost(inputs);
  const monthlySavings = inputs.pmiMonthlyPayment;
  
  if (monthlySavings <= 0) {
    return Infinity;
  }
  
  return breakEvenCost / monthlySavings;
}

function calculateBreakEvenMonths(inputs: PMICancellationInputs): number {
  return Math.ceil(calculateBreakEvenPoint(inputs));
}

function calculateBreakEvenCost(inputs: PMICancellationInputs): number {
  let cost = 0;
  
  // Appraisal cost if required
  if (inputs.appraisalRequired) {
    cost += inputs.appraisalCost;
  }
  
  // Additional costs for request-based cancellation
  if (inputs.pmiCancellationMethod === 'request') {
    cost += 500; // Estimated processing fees
  }
  
  return cost;
}

function generateSensitivityMatrix(inputs: PMICancellationInputs): any[] {
  const baseSavings = calculatePMISavings(inputs);
  const baseMonths = calculateMonthsToRequestCancellation(inputs);
  
  return [
    {
      variable: 'Property Appreciation Rate',
      values: [inputs.propertyAppreciationRate * 0.5, inputs.propertyAppreciationRate, inputs.propertyAppreciationRate * 1.5],
      impacts: [
        baseMonths * 1.2,
        baseMonths,
        baseMonths * 0.8
      ]
    },
    {
      variable: 'Interest Rate',
      values: [inputs.interestRate * 0.8, inputs.interestRate, inputs.interestRate * 1.2],
      impacts: [
        baseSavings * 1.1,
        baseSavings,
        baseSavings * 0.9
      ]
    },
    {
      variable: 'Property Value',
      values: [inputs.currentPropertyValue * 0.9, inputs.currentPropertyValue, inputs.currentPropertyValue * 1.1],
      impacts: [
        baseMonths * 1.1,
        baseMonths,
        baseMonths * 0.9
      ]
    }
  ];
}

function generateScenarios(inputs: PMICancellationInputs): any[] {
  const baseSavings = calculatePMISavings(inputs);
  const baseMonths = calculateMonthsToRequestCancellation(inputs);
  const baseCost = calculateBreakEvenCost(inputs);
  
  return [
    {
      scenario: 'Conservative',
      probability: 0.3,
      cancellationDate: calculateRequestCancellationDate(inputs),
      savings: baseSavings * 0.8,
      cost: baseCost * 1.2
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      cancellationDate: calculateRequestCancellationDate(inputs),
      savings: baseSavings,
      cost: baseCost
    },
    {
      scenario: 'Optimistic',
      probability: 0.2,
      cancellationDate: calculateRequestCancellationDate(inputs),
      savings: baseSavings * 1.3,
      cost: baseCost * 0.8
    }
  ];
}

function generateTimelineAnalysis(inputs: PMICancellationInputs): any[] {
  const timeline: any[] = [];
  const monthsToAnalyze = Math.min(60, calculateMonthsToRequestCancellation(inputs) + 12);
  
  for (let month = 0; month <= monthsToAnalyze; month++) {
    const currentDate = new Date();
    const analysisDate = new Date(currentDate);
    analysisDate.setMonth(analysisDate.getMonth() + month);
    
    // Calculate projected LTV for this month
    const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
    const monthlyAppreciation = inputs.currentPropertyValue * inputs.propertyAppreciationRate / 12;
    
    const projectedLoanBalance = Math.max(0, inputs.currentLoanBalance - (monthlyPrincipalPayment * month));
    const projectedPropertyValue = inputs.currentPropertyValue + (monthlyAppreciation * month);
    const projectedLtv = projectedLoanBalance / projectedPropertyValue;
    
    const pmiPayment = projectedLtv > calculateRequiredLTVRatio(inputs) ? inputs.pmiMonthlyPayment : 0;
    const cumulativePMI = inputs.pmiMonthlyPayment * Math.min(month, calculateMonthsToRequestCancellation(inputs));
    const eligibility = projectedLtv <= calculateRequiredLTVRatio(inputs);
    
    timeline.push({
      month,
      date: analysisDate.toISOString().split('T')[0],
      ltvRatio: projectedLtv,
      pmiPayment,
      cumulativePMI,
      eligibility
    });
  }
  
  return timeline;
}

function generateComparisonAnalysis(inputs: PMICancellationInputs): any[] {
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const requestDate = calculateRequestCancellationDate(inputs);
  const automaticMonths = calculateMonthsToAutomaticCancellation(inputs);
  const requestMonths = calculateMonthsToRequestCancellation(inputs);
  
  const automaticCost = 0; // No cost for automatic cancellation
  const requestCost = calculateBreakEvenCost(inputs);
  
  const automaticSavings = inputs.pmiMonthlyPayment * automaticMonths;
  const requestSavings = inputs.pmiMonthlyPayment * requestMonths;
  
  return [
    {
      option: 'Automatic Cancellation',
      cancellationDate: automaticDate,
      totalCost: automaticCost,
      totalSavings: automaticSavings,
      netBenefit: automaticSavings - automaticCost
    },
    {
      option: 'Request Cancellation',
      cancellationDate: requestDate,
      totalCost: requestCost,
      totalSavings: requestSavings,
      netBenefit: requestSavings - requestCost
    },
    {
      option: 'No Action',
      cancellationDate: automaticDate,
      totalCost: 0,
      totalSavings: 0,
      netBenefit: 0
    }
  ];
}

function generateMarketAnalysis(inputs: PMICancellationInputs): any[] {
  return [
    {
      factor: 'Market Growth',
      impact: inputs.marketGrowthRate,
      risk: inputs.marketCondition === 'declining' ? 'High' : 'Low',
      opportunity: inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'High' : 'Moderate'
    },
    {
      factor: 'Property Appreciation',
      impact: inputs.propertyAppreciationRate,
      risk: inputs.propertyAppreciationRate < 0 ? 'High' : 'Low',
      opportunity: inputs.propertyAppreciationRate > 0.03 ? 'High' : 'Moderate'
    },
    {
      factor: 'Interest Rates',
      impact: inputs.interestRate,
      risk: inputs.interestRate > 0.06 ? 'High' : 'Low',
      opportunity: inputs.interestRate < 0.04 ? 'High' : 'Moderate'
    },
    {
      factor: 'LTV Position',
      impact: calculateCurrentLTVRatio(inputs),
      risk: calculateCurrentLTVRatio(inputs) > 0.9 ? 'High' : 'Low',
      opportunity: calculateCurrentLTVRatio(inputs) < 0.8 ? 'High' : 'Moderate'
    }
  ];
}

function calculateRiskScore(inputs: PMICancellationInputs): number {
  let riskScore = 0;
  
  // Market risk
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 0.3; break;
    case 'stable': riskScore += 0.1; break;
    case 'growing': riskScore += 0.05; break;
    case 'hot': riskScore += 0.02; break;
  }
  
  // LTV risk
  const currentLtv = calculateCurrentLTVRatio(inputs);
  if (currentLtv > 0.9) riskScore += 0.3;
  else if (currentLtv > 0.85) riskScore += 0.2;
  else if (currentLtv > 0.8) riskScore += 0.1;
  
  // Property appreciation risk
  if (inputs.propertyAppreciationRate < 0) riskScore += 0.2;
  else if (inputs.propertyAppreciationRate < 0.02) riskScore += 0.1;
  
  // Loan type risk
  if (inputs.loanType === 'fha') riskScore += 0.4; // FHA loans typically don't allow PMI cancellation
  
  return Math.min(1, riskScore);
}

function calculateProbabilityOfCancellation(inputs: PMICancellationInputs, riskScore: number): number {
  let probability = 0.8; // Base probability
  
  // Adjust based on risk score
  probability -= riskScore * 0.4;
  
  // Adjust based on loan type
  if (inputs.loanType === 'fha') {
    probability = 0.1; // Very low probability for FHA loans
  }
  
  // Adjust based on current LTV
  const currentLtv = calculateCurrentLTVRatio(inputs);
  if (currentLtv <= 0.8) {
    probability = 0.95; // Very high if already eligible
  } else if (currentLtv <= 0.85) {
    probability += 0.1;
  }
  
  return Math.max(0.05, Math.min(0.95, probability));
}

function calculateWorstCaseScenario(inputs: PMICancellationInputs): number {
  const baseSavings = calculatePMISavings(inputs);
  const riskScore = calculateRiskScore(inputs);
  
  return baseSavings * (1 - riskScore * 0.5);
}

function calculateBestCaseScenario(inputs: PMICancellationInputs): number {
  const baseSavings = calculatePMISavings(inputs);
  const marketGrowthRate = inputs.marketGrowthRate;
  
  return baseSavings * (1 + marketGrowthRate * 0.3);
}