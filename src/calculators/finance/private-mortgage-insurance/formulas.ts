import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceMetrics } from './types';

export function calculatePrivateMortgageInsuranceMetrics(inputs: PrivateMortgageInsuranceInputs): PrivateMortgageInsuranceMetrics {
  // PMI Analysis
  const pmiRequired = calculatePMIRequired(inputs);
  const pmiRate = inputs.pmiRate;
  const pmiMonthlyPayment = calculatePMIMonthlyPayment(inputs, pmiRequired);
  const pmiAnnualCost = pmiMonthlyPayment * 12;
  const pmiTotalCost = calculatePMITotalCost(inputs, pmiMonthlyPayment);
  
  // Loan Analysis
  const loanToValueRatio = inputs.loanAmount / inputs.propertyValue;
  const currentLtvRatio = calculateCurrentLTVRatio(inputs);
  const ltvGap = Math.max(0, currentLtvRatio - inputs.ltvThreshold);
  const equityPosition = inputs.propertyValue - inputs.currentPrincipalBalance;
  const equityPercentage = equityPosition / inputs.propertyValue;
  
  // Payment Analysis
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const monthlyPaymentWithoutPMI = monthlyPayment - pmiMonthlyPayment;
  const paymentIncrease = pmiMonthlyPayment;
  const paymentIncreasePercentage = pmiMonthlyPayment / monthlyPaymentWithoutPMI;
  
  // Cost Analysis
  const totalPMICost = pmiTotalCost;
  const pmiSavings = calculatePMISavings(inputs, pmiTotalCost);
  const effectiveInterestRate = calculateEffectiveInterestRate(inputs, pmiMonthlyPayment);
  const totalLoanCost = calculateTotalLoanCost(inputs, pmiTotalCost);
  
  // Cancellation Analysis
  const cancellationEligibility = calculateCancellationEligibility(inputs, currentLtvRatio);
  const automaticCancellationDate = calculateAutomaticCancellationDate(inputs);
  const requestCancellationDate = calculateRequestCancellationDate(inputs);
  const monthsToAutomaticCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const monthsToRequestCancellation = calculateMonthsToRequestCancellation(inputs);
  
  // Break-Even Analysis
  const breakEvenPoint = calculateBreakEvenPoint(inputs, pmiMonthlyPayment);
  const breakEvenMonths = calculateBreakEvenMonths(inputs, pmiMonthlyPayment);
  const breakEvenCost = calculateBreakEvenCost(inputs, pmiMonthlyPayment);
  const netSavings = calculateNetSavings(inputs, pmiTotalCost, breakEvenCost);
  
  // Timeline Analysis
  const timelineAnalysis = calculateTimelineAnalysis(inputs, pmiMonthlyPayment);
  
  // Sensitivity Analysis
  const sensitivityMatrix = calculateSensitivityMatrix(inputs);
  
  // Scenario Analysis
  const scenarios = calculateScenarios(inputs, pmiTotalCost);
  
  // Comparison Analysis
  const comparisonAnalysis = calculateComparisonAnalysis(inputs, pmiTotalCost);
  
  // Risk Analysis
  const riskScore = calculateRiskScore(inputs, currentLtvRatio);
  const probabilityOfCancellation = calculateProbabilityOfCancellation(inputs, currentLtvRatio);
  const worstCaseScenario = calculateWorstCaseScenario(inputs, pmiTotalCost);
  const bestCaseScenario = calculateBestCaseScenario(inputs, pmiTotalCost);
  
  // Tax Analysis
  const taxDeduction = calculateTaxDeduction(inputs, pmiAnnualCost);
  const afterTaxCost = pmiAnnualCost - taxDeduction;
  const taxBenefit = taxDeduction;
  
  // Market Analysis
  const marketAnalysis = calculateMarketAnalysis(inputs);
  
  return {
    pmiMonthlyPayment,
    pmiAnnualCost,
    pmiTotalCost,
    pmiRate,
    pmiRequired,
    loanToValueRatio,
    currentLtvRatio,
    ltvGap,
    equityPosition,
    equityPercentage,
    monthlyPayment,
    monthlyPaymentWithoutPMI,
    paymentIncrease,
    paymentIncreasePercentage,
    totalPMICost,
    pmiSavings,
    effectiveInterestRate,
    totalLoanCost,
    automaticCancellationDate,
    requestCancellationDate,
    monthsToAutomaticCancellation,
    monthsToRequestCancellation,
    cancellationEligibility,
    breakEvenPoint,
    breakEvenMonths,
    breakEvenCost,
    netSavings,
    timelineAnalysis,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    riskScore,
    probabilityOfCancellation,
    worstCaseScenario,
    bestCaseScenario,
    taxDeduction,
    afterTaxCost,
    taxBenefit,
    marketAnalysis
  };
}

function calculatePMIRequired(inputs: PrivateMortgageInsuranceInputs): boolean {
  return inputs.pmiRequired && inputs.currentLtvRatio > inputs.ltvThreshold;
}

function calculatePMIMonthlyPayment(inputs: PrivateMortgageInsuranceInputs, pmiRequired: boolean): number {
  if (!pmiRequired) return 0;
  
  if (inputs.pmiType === 'single_premium') {
    // Single premium paid upfront, no monthly payment
    return 0;
  } else if (inputs.pmiType === 'lender_paid') {
    // Lender-paid PMI, no monthly payment
    return 0;
  } else {
    // Monthly PMI payment
    return inputs.currentPrincipalBalance * inputs.pmiRate / 12;
  }
}

function calculatePMITotalCost(inputs: PrivateMortgageInsuranceInputs, pmiMonthlyPayment: number): number {
  if (inputs.pmiType === 'single_premium') {
    // Single premium paid upfront
    return inputs.currentPrincipalBalance * inputs.pmiRate;
  } else if (inputs.pmiType === 'lender_paid') {
    // Lender-paid PMI, cost is in higher interest rate
    return 0;
  } else {
    // Monthly PMI payments until cancellation
    const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
    return pmiMonthlyPayment * monthsToCancellation;
  }
}

function calculateCurrentLTVRatio(inputs: PrivateMortgageInsuranceInputs): number {
  // Adjust property value for appreciation
  const monthsSinceStart = inputs.monthsSinceLoanStart;
  const appreciationFactor = Math.pow(1 + inputs.propertyAppreciationRate, monthsSinceStart / 12);
  const currentPropertyValue = inputs.propertyValue * appreciationFactor;
  
  return inputs.currentPrincipalBalance / currentPropertyValue;
}

function calculateMonthlyPayment(inputs: PrivateMortgageInsuranceInputs): number {
  if (inputs.paymentType === 'interest_only') {
    return inputs.currentPrincipalBalance * inputs.interestRate / 12;
  } else if (inputs.paymentType === 'balloon') {
    // Interest-only with balloon payment
    return inputs.currentPrincipalBalance * inputs.interestRate / 12;
  } else if (inputs.paymentType === 'arm') {
    // Adjustable rate mortgage - use current rate
    return calculateFixedPayment(inputs.currentPrincipalBalance, inputs.interestRate, inputs.loanTerm - inputs.paymentsMade);
  } else {
    // Principal and interest payment
    return calculateFixedPayment(inputs.currentPrincipalBalance, inputs.interestRate, inputs.loanTerm - inputs.paymentsMade);
  }
}

function calculateFixedPayment(principal: number, rate: number, term: number): number {
  const monthlyRate = rate / 12;
  const numPayments = term;
  
  if (monthlyRate === 0) {
    return principal / numPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculatePMISavings(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number): number {
  if (!inputs.pmiRequired) return 0;
  
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const pmiMonthlyPayment = inputs.currentPrincipalBalance * inputs.pmiRate / 12;
  const remainingPMICost = pmiMonthlyPayment * monthsToCancellation;
  
  return pmiTotalCost - remainingPMICost;
}

function calculateEffectiveInterestRate(inputs: PrivateMortgageInsuranceInputs, pmiMonthlyPayment: number): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const totalMonthlyPayment = monthlyPayment + pmiMonthlyPayment;
  const principal = inputs.currentPrincipalBalance;
  const term = inputs.loanTerm - inputs.paymentsMade;
  
  // Calculate effective rate including PMI
  const monthlyRate = inputs.interestRate / 12;
  const pmiRate = pmiMonthlyPayment * 12 / principal;
  
  return inputs.interestRate + pmiRate;
}

function calculateTotalLoanCost(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const totalPayments = monthlyPayment * (inputs.loanTerm - inputs.paymentsMade);
  const totalInterest = totalPayments - inputs.currentPrincipalBalance;
  
  return totalInterest + pmiTotalCost;
}

function calculateCancellationEligibility(inputs: PrivateMortgageInsuranceInputs, currentLtvRatio: number): boolean {
  // Check if LTV ratio meets cancellation threshold
  if (currentLtvRatio <= inputs.ltvThreshold) {
    // Check payment history requirements (typically 2 years)
    if (inputs.paymentsMade >= 24) {
      // Check if payments are current
      const recentPayments = inputs.paymentHistory.slice(-12);
      const onTimePayments = recentPayments.filter(p => p.onTime).length;
      return onTimePayments >= 11; // Allow 1 late payment in last 12 months
    }
  }
  
  return false;
}

function calculateAutomaticCancellationDate(inputs: PrivateMortgageInsuranceInputs): string {
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const startDate = new Date(inputs.loanStartDate);
  const cancellationDate = new Date(startDate.getTime() + monthsToCancellation * 30 * 24 * 60 * 60 * 1000);
  
  return cancellationDate.toISOString().split('T')[0];
}

function calculateRequestCancellationDate(inputs: PrivateMortgageInsuranceInputs): string {
  const monthsToCancellation = calculateMonthsToRequestCancellation(inputs);
  const startDate = new Date(inputs.loanStartDate);
  const cancellationDate = new Date(startDate.getTime() + monthsToCancellation * 30 * 24 * 60 * 60 * 1000);
  
  return cancellationDate.toISOString().split('T')[0];
}

function calculateMonthsToAutomaticCancellation(inputs: PrivateMortgageInsuranceInputs): number {
  // Automatic cancellation typically occurs when LTV reaches 78% of original value
  const targetLTV = 0.78;
  const originalLTV = inputs.loanAmount / inputs.propertyValue;
  
  if (originalLTV <= targetLTV) {
    return 0; // Already below threshold
  }
  
  // Calculate months based on principal payments and appreciation
  const monthlyRate = inputs.interestRate / 12;
  const monthlyPayment = calculateFixedPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const monthlyPrincipal = monthlyPayment - (inputs.loanAmount * monthlyRate);
  const monthlyAppreciation = inputs.propertyValue * inputs.propertyAppreciationRate / 12;
  
  let months = 0;
  let balance = inputs.currentPrincipalBalance;
  let propertyValue = inputs.propertyValue * Math.pow(1 + inputs.propertyAppreciationRate, inputs.monthsSinceLoanStart / 12);
  
  while (balance / propertyValue > targetLTV && months < 300) {
    balance -= monthlyPrincipal;
    propertyValue += monthlyAppreciation;
    months++;
  }
  
  return months;
}

function calculateMonthsToRequestCancellation(inputs: PrivateMortgageInsuranceInputs): number {
  // Request cancellation typically requires 2 years of payments and 80% LTV
  const minPayments = 24;
  const targetLTV = inputs.ltvThreshold;
  
  if (inputs.paymentsMade < minPayments) {
    return minPayments - inputs.paymentsMade;
  }
  
  const currentLTV = calculateCurrentLTVRatio(inputs);
  if (currentLTV <= targetLTV) {
    return 0; // Already eligible
  }
  
  // Calculate months to reach target LTV
  const monthlyRate = inputs.interestRate / 12;
  const monthlyPayment = calculateFixedPayment(inputs.currentPrincipalBalance, inputs.interestRate, inputs.loanTerm - inputs.paymentsMade);
  const monthlyPrincipal = monthlyPayment - (inputs.currentPrincipalBalance * monthlyRate);
  const monthlyAppreciation = inputs.propertyValue * inputs.propertyAppreciationRate / 12;
  
  let months = 0;
  let balance = inputs.currentPrincipalBalance;
  let propertyValue = inputs.propertyValue * Math.pow(1 + inputs.propertyAppreciationRate, inputs.monthsSinceLoanStart / 12);
  
  while (balance / propertyValue > targetLTV && months < 300) {
    balance -= monthlyPrincipal;
    propertyValue += monthlyAppreciation;
    months++;
  }
  
  return months;
}

function calculateBreakEvenPoint(inputs: PrivateMortgageInsuranceInputs, pmiMonthlyPayment: number): number {
  if (pmiMonthlyPayment === 0) return 0;
  
  // Break-even point is when PMI savings equal cancellation costs
  const cancellationCost = 500; // Typical appraisal and processing costs
  return cancellationCost / pmiMonthlyPayment;
}

function calculateBreakEvenMonths(inputs: PrivateMortgageInsuranceInputs, pmiMonthlyPayment: number): number {
  if (pmiMonthlyPayment === 0) return 0;
  
  const breakEvenPoint = calculateBreakEvenPoint(inputs, pmiMonthlyPayment);
  return Math.ceil(breakEvenPoint);
}

function calculateBreakEvenCost(inputs: PrivateMortgageInsuranceInputs, pmiMonthlyPayment: number): number {
  const breakEvenMonths = calculateBreakEvenMonths(inputs, pmiMonthlyPayment);
  return pmiMonthlyPayment * breakEvenMonths;
}

function calculateNetSavings(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number, breakEvenCost: number): number {
  return Math.max(0, pmiTotalCost - breakEvenCost);
}

function calculateTimelineAnalysis(inputs: PrivateMortgageInsuranceInputs, pmiMonthlyPayment: number) {
  const timeline = [];
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  
  for (let month = 0; month <= Math.min(monthsToCancellation, 60); month++) {
    const date = new Date(inputs.loanStartDate);
    date.setMonth(date.getMonth() + inputs.monthsSinceLoanStart + month);
    
    const ltvRatio = calculateLTVAtMonth(inputs, month);
    const pmiPayment = ltvRatio > inputs.ltvThreshold ? pmiMonthlyPayment : 0;
    const cumulativePMI = pmiMonthlyPayment * month;
    const eligibility = ltvRatio <= inputs.ltvThreshold && (inputs.paymentsMade + month) >= 24;
    
    timeline.push({
      month: month + 1,
      date: date.toISOString().split('T')[0],
      ltvRatio,
      pmiPayment,
      cumulativePMI,
      eligibility
    });
  }
  
  return timeline;
}

function calculateLTVAtMonth(inputs: PrivateMortgageInsuranceInputs, monthsFromNow: number): number {
  const totalMonths = inputs.monthsSinceLoanStart + monthsFromNow;
  const appreciationFactor = Math.pow(1 + inputs.propertyAppreciationRate, totalMonths / 12);
  const currentPropertyValue = inputs.propertyValue * appreciationFactor;
  
  // Calculate remaining balance
  const monthlyRate = inputs.interestRate / 12;
  const monthlyPayment = calculateFixedPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const monthlyPrincipal = monthlyPayment - (inputs.loanAmount * monthlyRate);
  
  const remainingBalance = Math.max(0, inputs.currentPrincipalBalance - (monthlyPrincipal * monthsFromNow));
  
  return remainingBalance / currentPropertyValue;
}

function calculateSensitivityMatrix(inputs: PrivateMortgageInsuranceInputs) {
  const variables = [
    { name: 'Property Appreciation Rate', base: inputs.propertyAppreciationRate, range: [-0.02, -0.01, 0.01, 0.02] },
    { name: 'PMI Rate', base: inputs.pmiRate, range: [-0.002, -0.001, 0.001, 0.002] },
    { name: 'Interest Rate', base: inputs.interestRate, range: [-0.01, -0.005, 0.005, 0.01] },
    { name: 'Property Value', base: inputs.propertyValue, range: [-0.05, -0.02, 0.02, 0.05] }
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      let adjustedInputs = { ...inputs };
      
      if (variable.name === 'Property Appreciation Rate') {
        adjustedInputs.propertyAppreciationRate = inputs.propertyAppreciationRate + change;
      } else if (variable.name === 'PMI Rate') {
        adjustedInputs.pmiRate = inputs.pmiRate + change;
      } else if (variable.name === 'Interest Rate') {
        adjustedInputs.interestRate = inputs.interestRate + change;
      } else if (variable.name === 'Property Value') {
        adjustedInputs.propertyValue = inputs.propertyValue * (1 + change);
      }
      
      const adjustedMetrics = calculatePrivateMortgageInsuranceMetrics(adjustedInputs);
      return adjustedMetrics.pmiTotalCost;
    });
    
    return {
      variable: variable.name,
      values: variable.range,
      impacts
    };
  });
}

function calculateScenarios(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number) {
  const scenarios = [
    {
      scenario: 'Base Case',
      probability: 0.5,
      pmiCost: pmiTotalCost,
      cancellationDate: calculateAutomaticCancellationDate(inputs),
      savings: calculatePMISavings(inputs, pmiTotalCost)
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      pmiCost: pmiTotalCost * 0.7, // Faster cancellation
      cancellationDate: calculateRequestCancellationDate(inputs),
      savings: calculatePMISavings(inputs, pmiTotalCost) * 1.3
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      pmiCost: pmiTotalCost * 1.3, // Slower cancellation
      cancellationDate: calculateAutomaticCancellationDate(inputs),
      savings: calculatePMISavings(inputs, pmiTotalCost) * 0.7
    }
  ];
  
  return scenarios;
}

function calculateComparisonAnalysis(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number) {
  const analysis = [
    {
      option: 'Keep Current PMI',
      pmiCost: pmiTotalCost,
      totalCost: calculateTotalLoanCost(inputs, pmiTotalCost),
      cancellationDate: calculateAutomaticCancellationDate(inputs),
      savings: 0
    },
    {
      option: 'Cancel PMI Now',
      pmiCost: 0,
      totalCost: calculateTotalLoanCost(inputs, 0),
      cancellationDate: new Date().toISOString().split('T')[0],
      savings: calculatePMISavings(inputs, pmiTotalCost)
    },
    {
      option: 'Refinance',
      pmiCost: 0,
      totalCost: calculateTotalLoanCost(inputs, 0) * 0.95, // Assume 5% lower rate
      cancellationDate: new Date().toISOString().split('T')[0],
      savings: calculatePMISavings(inputs, pmiTotalCost) + (calculateTotalLoanCost(inputs, pmiTotalCost) * 0.05)
    }
  ];
  
  return analysis;
}

function calculateRiskScore(inputs: PrivateMortgageInsuranceInputs, currentLtvRatio: number): number {
  let riskScore = 0;
  
  // LTV Risk (0-0.3)
  if (currentLtvRatio <= 0.70) riskScore += 0.05;
  else if (currentLtvRatio <= 0.75) riskScore += 0.10;
  else if (currentLtvRatio <= 0.80) riskScore += 0.15;
  else if (currentLtvRatio <= 0.85) riskScore += 0.25;
  else riskScore += 0.30;
  
  // Credit Risk (0-0.25)
  if (inputs.borrowerCreditScore >= 750) riskScore += 0.05;
  else if (inputs.borrowerCreditScore >= 700) riskScore += 0.10;
  else if (inputs.borrowerCreditScore >= 650) riskScore += 0.15;
  else if (inputs.borrowerCreditScore >= 600) riskScore += 0.20;
  else riskScore += 0.25;
  
  // Market Risk (0-0.2)
  if (inputs.marketCondition === 'hot') riskScore += 0.05;
  else if (inputs.marketCondition === 'growing') riskScore += 0.10;
  else if (inputs.marketCondition === 'stable') riskScore += 0.15;
  else riskScore += 0.20;
  
  // Payment History Risk (0-0.15)
  const recentPayments = inputs.paymentHistory.slice(-12);
  const onTimePayments = recentPayments.filter(p => p.onTime).length;
  const onTimePercentage = onTimePayments / recentPayments.length;
  
  if (onTimePercentage >= 0.95) riskScore += 0.05;
  else if (onTimePercentage >= 0.90) riskScore += 0.10;
  else if (onTimePercentage >= 0.80) riskScore += 0.12;
  else riskScore += 0.15;
  
  // Property Risk (0-0.1)
  if (inputs.propertyAge <= 5) riskScore += 0.05;
  else if (inputs.propertyAge <= 15) riskScore += 0.08;
  else riskScore += 0.10;
  
  return Math.min(riskScore, 1.0);
}

function calculateProbabilityOfCancellation(inputs: PrivateMortgageInsuranceInputs, currentLtvRatio: number): number {
  let probability = 0.5; // Base probability
  
  // Adjust based on LTV ratio
  if (currentLtvRatio <= 0.75) probability += 0.3;
  else if (currentLtvRatio <= 0.80) probability += 0.2;
  else if (currentLtvRatio <= 0.85) probability += 0.1;
  else probability -= 0.1;
  
  // Adjust based on market conditions
  if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') probability += 0.1;
  else if (inputs.marketCondition === 'declining') probability -= 0.2;
  
  // Adjust based on appreciation rate
  if (inputs.propertyAppreciationRate > 0.05) probability += 0.1;
  else if (inputs.propertyAppreciationRate < 0.01) probability -= 0.1;
  
  return Math.max(0.1, Math.min(0.9, probability));
}

function calculateWorstCaseScenario(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number): number {
  // Worst case: PMI continues for full term
  const monthsRemaining = inputs.loanTerm - inputs.paymentsMade;
  const pmiMonthlyPayment = inputs.currentPrincipalBalance * inputs.pmiRate / 12;
  return pmiMonthlyPayment * monthsRemaining;
}

function calculateBestCaseScenario(inputs: PrivateMortgageInsuranceInputs, pmiTotalCost: number): number {
  // Best case: PMI cancelled immediately
  return 0;
}

function calculateTaxDeduction(inputs: PrivateMortgageInsuranceInputs, pmiAnnualCost: number): number {
  // PMI may be tax deductible for certain income levels
  if (inputs.borrowerIncome > 100000) return 0; // Phase out for high income
  
  const deductionLimit = Math.min(pmiAnnualCost, 10000); // Annual limit
  return deductionLimit * inputs.borrowerTaxRate;
}

function calculateMarketAnalysis(inputs: PrivateMortgageInsuranceInputs) {
  const analysis = [
    {
      factor: 'Market Condition',
      impact: inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 0.1 : -0.1,
      risk: inputs.marketCondition === 'declining' ? 'High' : 'Low',
      opportunity: inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'Strong appreciation' : 'Limited appreciation'
    },
    {
      factor: 'Property Appreciation',
      impact: inputs.propertyAppreciationRate > 0.03 ? 0.1 : -0.05,
      risk: inputs.propertyAppreciationRate < 0.01 ? 'High' : 'Low',
      opportunity: inputs.propertyAppreciationRate > 0.05 ? 'Rapid equity growth' : 'Moderate equity growth'
    },
    {
      factor: 'Interest Rates',
      impact: inputs.interestRate < 0.05 ? 0.05 : -0.05,
      risk: inputs.interestRate > 0.07 ? 'High' : 'Low',
      opportunity: inputs.interestRate < 0.05 ? 'Refinancing opportunity' : 'Limited refinancing benefit'
    }
  ];
  
  return analysis;
}