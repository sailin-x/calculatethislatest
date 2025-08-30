import { MortgageRefinanceInputs, MortgageRefinanceOutputs, MortgageRefinanceAnalysis } from './types';

export function calculateMortgageRefinance(inputs: MortgageRefinanceInputs): MortgageRefinanceOutputs {
  // Calculate payment analysis
  const currentMonthlyPayment = calculateMonthlyPayment(inputs.currentPrincipalBalance, inputs.currentInterestRate, inputs.currentRemainingTerm);
  const newMonthlyPayment = calculateMonthlyPayment(inputs.newLoanAmount, inputs.newInterestRate, inputs.newLoanTerm);
  const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
  const monthlyPaymentSavings = Math.max(0, monthlyPaymentDifference);
  const annualPaymentSavings = monthlyPaymentSavings * 12;
  
  // Calculate interest analysis
  const currentTotalInterest = calculateTotalInterest(inputs.currentPrincipalBalance, inputs.currentInterestRate, inputs.currentRemainingTerm);
  const newTotalInterest = calculateTotalInterest(inputs.newLoanAmount, inputs.newInterestRate, inputs.newLoanTerm);
  const interestSavings = Math.max(0, currentTotalInterest - newTotalInterest);
  const interestSavingsPercentage = currentTotalInterest > 0 ? (interestSavings / currentTotalInterest) * 100 : 0;
  
  // Calculate cost analysis
  const totalRefinanceCost = calculateTotalRefinanceCost(inputs);
  const breakEvenPoint = calculateBreakEvenPoint(monthlyPaymentSavings, totalRefinanceCost);
  const breakEvenMonths = breakEvenPoint;
  const breakEvenYears = breakEvenMonths / 12;
  const netSavings = (annualPaymentSavings * inputs.analysisPeriod) - totalRefinanceCost;
  
  // Calculate cash flow analysis
  const monthlyCashFlow = monthlyPaymentSavings;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalCashFlow = annualCashFlow * inputs.analysisPeriod;
  const cashFlowImprovement = currentMonthlyPayment > 0 ? (monthlyPaymentSavings / currentMonthlyPayment) * 100 : 0;
  
  // Calculate equity analysis
  const currentEquity = inputs.propertyValue - inputs.currentPrincipalBalance;
  const newEquity = inputs.propertyValue - inputs.newLoanAmount;
  const equityChange = newEquity - currentEquity;
  const loanToValueRatio = (inputs.newLoanAmount / inputs.propertyValue) * 100;
  
  // Calculate tax analysis
  const taxDeduction = calculateTaxDeduction(inputs, newTotalInterest);
  const afterTaxSavings = annualPaymentSavings - (taxDeduction * (inputs.borrowerTaxRate / 100));
  const effectiveTaxRate = inputs.borrowerTaxRate;
  const taxBenefit = taxDeduction * (inputs.borrowerTaxRate / 100);
  
  // Calculate ROI analysis
  const returnOnInvestment = totalRefinanceCost > 0 ? (netSavings / totalRefinanceCost) * 100 : 0;
  const paybackPeriod = calculatePaybackPeriod(totalRefinanceCost, annualPaymentSavings);
  const netPresentValue = calculateNetPresentValue(inputs, monthlyPaymentSavings, totalRefinanceCost);
  const internalRateOfReturn = calculateInternalRateOfReturn(inputs, monthlyPaymentSavings, totalRefinanceCost);
  
  // Generate amortization comparison
  const amortizationComparison = generateAmortizationComparison(inputs, currentMonthlyPayment, newMonthlyPayment);
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs, netSavings);
  
  // Generate scenarios
  const scenarios = generateScenarioAnalysis(inputs, netSavings);
  
  // Calculate risk analysis
  const riskScore = calculateRiskScore(inputs, breakEvenMonths, returnOnInvestment);
  const probabilityOfBenefit = calculateProbabilityOfBenefit(inputs, breakEvenMonths, returnOnInvestment);
  const worstCaseScenario = calculateWorstCaseScenario(inputs, netSavings);
  const bestCaseScenario = calculateBestCaseScenario(inputs, netSavings);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, netSavings);
  
  // Generate analysis
  const analysis = generateRefinanceAnalysis(inputs, {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlyPaymentDifference,
    monthlyPaymentSavings,
    annualPaymentSavings,
    currentTotalInterest,
    newTotalInterest,
    interestSavings,
    interestSavingsPercentage,
    totalRefinanceCost,
    breakEvenPoint,
    breakEvenMonths,
    breakEvenYears,
    netSavings,
    monthlyCashFlow,
    annualCashFlow,
    totalCashFlow,
    cashFlowImprovement,
    currentEquity,
    newEquity,
    equityChange,
    loanToValueRatio,
    taxDeduction,
    afterTaxSavings,
    effectiveTaxRate,
    taxBenefit,
    returnOnInvestment,
    paybackPeriod,
    netPresentValue,
    internalRateOfReturn,
    riskScore,
    probabilityOfBenefit,
    worstCaseScenario,
    bestCaseScenario
  });
  
  return {
    // Core Metrics
    monthlyPaymentSavings,
    interestSavings,
    breakEvenMonths,
    netSavings,
    returnOnInvestment,
    riskScore,
    newMonthlyPayment,
    totalRefinanceCost,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    currentMonthlyPayment,
    monthlyPaymentDifference,
    annualPaymentSavings,
    currentTotalInterest,
    newTotalInterest,
    interestSavingsPercentage,
    monthlyCashFlow,
    annualCashFlow,
    totalCashFlow,
    cashFlowImprovement,
    currentEquity,
    newEquity,
    equityChange,
    loanToValueRatio,
    taxDeduction,
    afterTaxSavings,
    effectiveTaxRate,
    taxBenefit,
    paybackPeriod,
    netPresentValue,
    internalRateOfReturn,
    amortizationComparison,
    sensitivityMatrix,
    scenarios,
    probabilityOfBenefit,
    worstCaseScenario,
    bestCaseScenario,
    comparisonAnalysis,
  };
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateTotalInterest(principal: number, annualRate: number, years: number): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const totalPayments = monthlyPayment * years * 12;
  return totalPayments - principal;
}

function calculateTotalRefinanceCost(inputs: MortgageRefinanceInputs): number {
  return (
    inputs.closingCosts +
    inputs.originationFee +
    inputs.appraisalFee +
    inputs.titleInsuranceFee +
    inputs.recordingFee +
    inputs.attorneyFee +
    inputs.creditReportFee +
    inputs.floodCertificationFee +
    inputs.taxServiceFee +
    inputs.otherFees
  );
}

function calculateBreakEvenPoint(monthlySavings: number, totalCost: number): number {
  if (monthlySavings <= 0) return 0;
  return Math.ceil(totalCost / monthlySavings);
}

function calculateTaxDeduction(inputs: MortgageRefinanceInputs, totalInterest: number): number {
  const annualInterest = totalInterest / inputs.newLoanTerm;
  return Math.min(annualInterest, 750000); // Mortgage interest deduction limit
}

function calculatePaybackPeriod(totalCost: number, annualSavings: number): number {
  if (annualSavings <= 0) return 0;
  return totalCost / annualSavings;
}

function calculateNetPresentValue(inputs: MortgageRefinanceInputs, monthlySavings: number, totalCost: number): number {
  const annualSavings = monthlySavings * 12;
  const discountRate = inputs.discountRate / 100;
  let npv = -totalCost;
  
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    npv += annualSavings / Math.pow(1 + discountRate, year);
  }
  
  return npv;
}

function calculateInternalRateOfReturn(inputs: MortgageRefinanceInputs, monthlySavings: number, totalCost: number): number {
  const annualSavings = monthlySavings * 12;
  
  // Use iterative approach to find IRR
  let irr = 0.05; // Start with 5%
  let tolerance = 0.001;
  let maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = -totalCost;
    
    for (let year = 1; year <= inputs.analysisPeriod; year++) {
      npv += annualSavings / Math.pow(1 + irr, year);
    }
    
    if (Math.abs(npv) < tolerance) {
      break;
    }
    
    // Simple Newton-Raphson approximation
    if (npv > 0) {
      irr += 0.01;
    } else {
      irr -= 0.01;
    }
  }
  
  return irr * 100;
}

function generateAmortizationComparison(inputs: MortgageRefinanceInputs, currentPayment: number, newPayment: number): any[] {
  const comparison = [];
  const maxPayments = Math.max(inputs.currentRemainingTerm * 12, inputs.newLoanTerm * 12);
  
  for (let i = 1; i <= Math.min(maxPayments, 360); i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    
    comparison.push({
      paymentNumber: i,
      date: date.toISOString().split('T')[0],
      currentPayment: i <= inputs.currentRemainingTerm * 12 ? currentPayment : 0,
      newPayment: i <= inputs.newLoanTerm * 12 ? newPayment : 0,
      savings: Math.max(0, currentPayment - newPayment),
      cumulativeSavings: Math.max(0, (currentPayment - newPayment) * i)
    });
  }
  
  return comparison;
}

function generateSensitivityMatrix(inputs: MortgageRefinanceInputs, netSavings: number): any[] {
  const variables = [
    { name: 'New Interest Rate', field: 'newInterestRate', base: inputs.newInterestRate, range: [-1, -0.5, 0, 0.5, 1] },
    { name: 'Property Value', field: 'propertyValue', base: inputs.propertyValue, range: [-50000, -25000, 0, 25000, 50000] },
    { name: 'Closing Costs', field: 'closingCosts', base: inputs.closingCosts, range: [-2000, -1000, 0, 1000, 2000] },
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      const testInputs = { ...inputs };
      if (variable.field === 'newInterestRate') {
        testInputs.newInterestRate = variable.base + change;
      } else if (variable.field === 'propertyValue') {
        testInputs.propertyValue = variable.base + change;
      } else if (variable.field === 'closingCosts') {
        testInputs.closingCosts = variable.base + change;
      }
      
      const testResults = calculateMortgageRefinance(testInputs);
      return testResults.netSavings;
    });
    
    return {
      variable: variable.name,
      values: variable.range.map(v => variable.base + v),
      impacts,
    };
  });
}

function generateScenarioAnalysis(inputs: MortgageRefinanceInputs, netSavings: number): any[] {
  const scenarios = [
    {
      scenario: 'Conservative',
      probability: 0.25,
      rateChange: 0.5,
      costChange: 1000,
      valueChange: -25000
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      rateChange: 0,
      costChange: 0,
      valueChange: 0
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      rateChange: -0.25,
      costChange: -500,
      valueChange: 25000
    }
  ];
  
  return scenarios.map(scenario => {
    const testInputs = { ...inputs };
    testInputs.newInterestRate += scenario.rateChange;
    testInputs.closingCosts += scenario.costChange;
    testInputs.propertyValue += scenario.valueChange;
    
    const testResults = calculateMortgageRefinance(testInputs);
    
    return {
      scenario: scenario.scenario,
      probability: scenario.probability,
      rate: testInputs.newInterestRate,
      payment: testResults.newMonthlyPayment,
      savings: testResults.netSavings
    };
  });
}

function calculateRiskScore(inputs: MortgageRefinanceInputs, breakEvenMonths: number, roi: number): number {
  let riskScore = 50; // Base risk score
  
  // Break-even time impact
  if (breakEvenMonths <= 12) riskScore -= 20;
  else if (breakEvenMonths <= 24) riskScore -= 10;
  else if (breakEvenMonths <= 36) riskScore += 0;
  else if (breakEvenMonths <= 60) riskScore += 15;
  else riskScore += 30;
  
  // ROI impact
  if (roi > 100) riskScore -= 20;
  else if (roi > 50) riskScore -= 10;
  else if (roi > 20) riskScore += 0;
  else if (roi > 0) riskScore += 10;
  else riskScore += 30;
  
  // Rate difference impact
  const rateDifference = inputs.currentInterestRate - inputs.newInterestRate;
  if (rateDifference > 1) riskScore -= 15;
  else if (rateDifference > 0.5) riskScore -= 5;
  else if (rateDifference > 0) riskScore += 0;
  else riskScore += 20;
  
  // Credit score impact
  if (inputs.borrowerCreditScore >= 750) riskScore -= 10;
  else if (inputs.borrowerCreditScore >= 700) riskScore -= 5;
  else if (inputs.borrowerCreditScore >= 650) riskScore += 0;
  else if (inputs.borrowerCreditScore >= 600) riskScore += 10;
  else riskScore += 20;
  
  // Market condition impact
  switch (inputs.marketCondition) {
    case 'hot': riskScore -= 10; break;
    case 'growing': riskScore -= 5; break;
    case 'stable': riskScore += 0; break;
    case 'declining': riskScore += 15; break;
  }
  
  return Math.max(0, Math.min(100, riskScore));
}

function calculateProbabilityOfBenefit(inputs: MortgageRefinanceInputs, breakEvenMonths: number, roi: number): number {
  let probability = 50; // Base probability
  
  // Break-even time impact
  if (breakEvenMonths <= 12) probability += 30;
  else if (breakEvenMonths <= 24) probability += 20;
  else if (breakEvenMonths <= 36) probability += 10;
  else if (breakEvenMonths <= 60) probability += 0;
  else probability -= 20;
  
  // ROI impact
  if (roi > 100) probability += 30;
  else if (roi > 50) probability += 20;
  else if (roi > 20) probability += 10;
  else if (roi > 0) probability += 0;
  else probability -= 30;
  
  // Rate difference impact
  const rateDifference = inputs.currentInterestRate - inputs.newInterestRate;
  if (rateDifference > 1) probability += 20;
  else if (rateDifference > 0.5) probability += 10;
  else if (rateDifference > 0) probability += 0;
  else probability -= 20;
  
  return Math.max(0, Math.min(100, probability));
}

function calculateWorstCaseScenario(inputs: MortgageRefinanceInputs, netSavings: number): number {
  // Worst case: rates increase, costs increase, property value decreases
  const worstCaseInputs = { ...inputs };
  worstCaseInputs.newInterestRate += 1.0;
  worstCaseInputs.closingCosts += 2000;
  worstCaseInputs.propertyValue -= 50000;
  
  const worstCaseResults = calculateMortgageRefinance(worstCaseInputs);
  return worstCaseResults.netSavings;
}

function calculateBestCaseScenario(inputs: MortgageRefinanceInputs, netSavings: number): number {
  // Best case: rates decrease, costs decrease, property value increases
  const bestCaseInputs = { ...inputs };
  bestCaseInputs.newInterestRate -= 0.5;
  bestCaseInputs.closingCosts -= 1000;
  bestCaseInputs.propertyValue += 50000;
  
  const bestCaseResults = calculateMortgageRefinance(bestCaseInputs);
  return bestCaseResults.netSavings;
}

function generateComparisonAnalysis(inputs: MortgageRefinanceInputs, netSavings: number): any[] {
  const options = [
    {
      option: 'Current Loan',
      rate: inputs.currentInterestRate,
      payment: calculateMonthlyPayment(inputs.currentPrincipalBalance, inputs.currentInterestRate, inputs.currentRemainingTerm),
      totalCost: 0,
      savings: 0,
      breakEven: 0
    },
    {
      option: 'Refinance',
      rate: inputs.newInterestRate,
      payment: calculateMonthlyPayment(inputs.newLoanAmount, inputs.newInterestRate, inputs.newLoanTerm),
      totalCost: calculateTotalRefinanceCost(inputs),
      savings: netSavings,
      breakEven: calculateBreakEvenPoint(
        calculateMonthlyPayment(inputs.currentPrincipalBalance, inputs.currentInterestRate, inputs.currentRemainingTerm) - 
        calculateMonthlyPayment(inputs.newLoanAmount, inputs.newInterestRate, inputs.newLoanTerm),
        calculateTotalRefinanceCost(inputs)
      )
    },
    {
      option: 'Alternative Rate',
      rate: inputs.newInterestRate + 0.25,
      payment: calculateMonthlyPayment(inputs.newLoanAmount, inputs.newInterestRate + 0.25, inputs.newLoanTerm),
      totalCost: calculateTotalRefinanceCost(inputs) - 500,
      savings: netSavings - 10000,
      breakEven: calculateBreakEvenPoint(
        calculateMonthlyPayment(inputs.currentPrincipalBalance, inputs.currentInterestRate, inputs.currentRemainingTerm) - 
        calculateMonthlyPayment(inputs.newLoanAmount, inputs.newInterestRate + 0.25, inputs.newLoanTerm),
        calculateTotalRefinanceCost(inputs) - 500
      )
    }
  ];
  
  return options;
}

function generateRefinanceAnalysis(inputs: MortgageRefinanceInputs, metrics: any): MortgageRefinanceAnalysis {
  // Determine ratings
  let refinanceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value' = 'Moderate Value';
  let recommendation: 'Proceed' | 'Consider' | 'Don\'t Refinance' | 'Requires Review' = 'Requires Review';
  
  // Refinance rating based on break-even time and ROI
  if (metrics.breakEvenMonths <= 12 && metrics.returnOnInvestment > 50) {
    refinanceRating = 'Excellent';
  } else if (metrics.breakEvenMonths <= 24 && metrics.returnOnInvestment > 20) {
    refinanceRating = 'Good';
  } else if (metrics.breakEvenMonths <= 36 && metrics.returnOnInvestment > 0) {
    refinanceRating = 'Average';
  } else if (metrics.breakEvenMonths <= 60 && metrics.returnOnInvestment > -20) {
    refinanceRating = 'Poor';
  } else {
    refinanceRating = 'Very Poor';
  }
  
  // Value rating based on net savings
  if (metrics.netSavings > 50000) {
    valueRating = 'High Value';
  } else if (metrics.netSavings > 20000) {
    valueRating = 'Good Value';
  } else if (metrics.netSavings > 5000) {
    valueRating = 'Moderate Value';
  } else if (metrics.netSavings > 0) {
    valueRating = 'Low Value';
  } else {
    valueRating = 'No Value';
  }
  
  // Recommendation based on multiple factors
  if (metrics.netSavings > 10000 && metrics.breakEvenMonths <= 24) {
    recommendation = 'Proceed';
  } else if (metrics.netSavings > 5000 && metrics.breakEvenMonths <= 36) {
    recommendation = 'Consider';
  } else if (metrics.netSavings <= 0 || metrics.breakEvenMonths > 60) {
    recommendation = 'Don\'t Refinance';
  } else {
    recommendation = 'Requires Review';
  }
  
  // Generate key insights
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];
  const valueFactors: string[] = [];
  const opportunities: string[] = [];
  
  if (metrics.monthlyPaymentSavings > 200) keyStrengths.push('Significant monthly payment savings');
  if (metrics.breakEvenMonths <= 24) keyStrengths.push('Quick break-even period');
  if (metrics.returnOnInvestment > 50) keyStrengths.push('High return on investment');
  if (metrics.interestSavings > 10000) keyStrengths.push('Substantial interest savings');
  if (inputs.currentInterestRate - inputs.newInterestRate > 1) keyStrengths.push('Significant rate reduction');
  
  if (metrics.breakEvenMonths > 36) keyWeaknesses.push('Long break-even period');
  if (metrics.returnOnInvestment < 0) keyWeaknesses.push('Negative return on investment');
  if (metrics.totalRefinanceCost > 10000) keyWeaknesses.push('High refinance costs');
  if (inputs.currentInterestRate - inputs.newInterestRate < 0.5) keyWeaknesses.push('Minimal rate reduction');
  if (metrics.riskScore > 70) keyWeaknesses.push('High risk score');
  
  if (metrics.netSavings > 20000) valueFactors.push('High net savings potential');
  if (metrics.monthlyPaymentSavings > 300) valueFactors.push('Large monthly payment reduction');
  if (metrics.interestSavings > 20000) valueFactors.push('Major interest savings');
  if (metrics.cashFlowImprovement > 20) valueFactors.push('Significant cash flow improvement');
  
  if (metrics.netSavings > 10000) opportunities.push('Consider accelerating closing timeline');
  if (inputs.borrowerCreditScore >= 750) opportunities.push('Negotiate better rates with excellent credit');
  if (inputs.marketCondition === 'hot') opportunities.push('Lock in rates before market changes');
  if (metrics.taxBenefit > 1000) opportunities.push('Maximize tax benefits');
  
  return {
    refinanceRating,
    valueRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    valueFactors,
    opportunities,
    refinanceSummary: `Refinancing from ${inputs.currentInterestRate}% to ${inputs.newInterestRate}% with ${formatCurrency(metrics.monthlyPaymentSavings)} monthly savings.`,
    paymentAnalysis: `Monthly payment decreases from ${formatCurrency(metrics.currentMonthlyPayment)} to ${formatCurrency(metrics.newMonthlyPayment)}.`,
    costAnalysis: `Total refinance cost is ${formatCurrency(metrics.totalRefinanceCost)} with break-even in ${metrics.breakEvenMonths.toFixed(1)} months.`,
    breakEvenSummary: `Break-even point is ${metrics.breakEvenMonths.toFixed(1)} months with ${formatCurrency(metrics.netSavings)} net savings.`,
    timelineAnalysis: `Payback period is ${metrics.paybackPeriod.toFixed(1)} years with ${formatPercentage(metrics.returnOnInvestment)} ROI.`,
    riskAnalysis: `Risk score is ${metrics.riskScore.toFixed(1)}% with ${metrics.probabilityOfBenefit.toFixed(1)}% probability of benefit.`,
    cashFlowSummary: `Monthly cash flow improves by ${formatCurrency(metrics.monthlyCashFlow)} with ${formatPercentage(metrics.cashFlowImprovement)} improvement.`,
    savingsAnalysis: `Total savings of ${formatCurrency(metrics.netSavings)} over ${inputs.analysisPeriod} years.`,
    improvementAnalysis: `Cash flow improvement of ${formatPercentage(metrics.cashFlowImprovement)} with ${formatCurrency(metrics.annualCashFlow)} annual savings.`,
    taxSummary: `Annual tax deduction of ${formatCurrency(metrics.taxDeduction)} with ${formatCurrency(metrics.taxBenefit)} tax benefit.`,
    deductionAnalysis: `Tax deduction reduces effective cost by ${formatCurrency(metrics.taxBenefit)} annually.`,
    benefitAnalysis: `After-tax savings of ${formatCurrency(metrics.afterTaxSavings)} with ${formatPercentage(metrics.effectiveTaxRate)} effective tax rate.`,
    roiSummary: `Return on investment is ${formatPercentage(metrics.returnOnInvestment)} with ${metrics.paybackPeriod.toFixed(1)} year payback.`,
    investmentAnalysis: `Net present value is ${formatCurrency(metrics.netPresentValue)} with ${formatPercentage(metrics.internalRateOfReturn)} IRR.`,
    returnAnalysis: `Investment analysis shows ${formatPercentage(metrics.returnOnInvestment)} ROI over ${inputs.analysisPeriod} years.`,
    riskAssessment: `Risk assessment shows ${metrics.riskScore.toFixed(1)}% risk score with ${metrics.probabilityOfBenefit.toFixed(1)}% benefit probability.`,
    marketRisk: `Market risk is ${inputs.marketCondition === 'stable' ? 'low' : inputs.marketCondition === 'growing' ? 'moderate' : 'high'}.`,
    rateRisk: `Rate risk is ${inputs.currentInterestRate - inputs.newInterestRate > 1 ? 'low' : 'moderate'} with ${formatPercentage(Math.abs(inputs.currentInterestRate - inputs.newInterestRate))} rate difference.`,
    timingRisk: `Timing risk is ${metrics.breakEvenMonths <= 24 ? 'low' : metrics.breakEvenMonths <= 36 ? 'moderate' : 'high'}.`,
    marketAnalysis: `Market conditions are ${inputs.marketCondition} with ${formatPercentage(inputs.marketGrowthRate)} growth rate.`,
    competitiveAnalysis: `Current rate of ${formatPercentage(inputs.currentInterestRate)} vs new rate of ${formatPercentage(inputs.newInterestRate)}.`,
    marketPosition: `Market position is ${inputs.marketCondition === 'hot' ? 'favorable' : inputs.marketCondition === 'stable' ? 'neutral' : 'challenging'}.`,
    refinanceRecommendations: [
      'Compare multiple lender offers',
      'Negotiate closing costs',
      'Consider rate lock options',
      'Review prepayment penalties'
    ],
    optimizationSuggestions: [
      'Accelerate closing timeline if beneficial',
      'Consider shorter loan term if affordable',
      'Evaluate cash-out options if needed',
      'Monitor rate trends for optimal timing'
    ],
    riskMitigation: [
      'Lock in rate early',
      'Have backup financing options',
      'Monitor market conditions',
      'Prepare for potential delays'
    ],
    implementationPlan: recommendation === 'Proceed' ? 'Proceed with refinance application' :
                        recommendation === 'Consider' ? 'Evaluate refinance options carefully' :
                        recommendation === 'Don\'t Refinance' ? 'Maintain current loan' : 'Review all factors before deciding',
    nextSteps: [
      'Gather required documentation',
      'Compare lender offers',
      'Review loan estimates',
      'Prepare for closing'
    ],
    timeline: 'Typical refinance process takes 30-45 days.',
    monitoringPlan: 'Monitor rates weekly and costs monthly.',
    keyMetrics: [
      'Break-even months',
      'Monthly payment savings',
      'Net savings',
      'ROI percentage'
    ],
    reviewSchedule: 'Review refinance decision quarterly.',
    riskManagement: 'Maintain emergency fund and monitor market conditions.',
    mitigationStrategies: [
      'Lock in favorable rates',
      'Prepare for closing delays',
      'Have backup financing options',
      'Monitor market trends'
    ],
    contingencyPlans: [
      'Alternative lender options',
      'Rate lock extensions',
      'Closing cost assistance',
      'Timeline flexibility'
    ],
    performanceBenchmarks: [
      {
        metric: 'Break-Even Months',
        target: 24,
        benchmark: metrics.breakEvenMonths,
        industry: 'Mortgage Refinancing'
      },
      {
        metric: 'ROI Percentage',
        target: 50,
        benchmark: metrics.returnOnInvestment,
        industry: 'Mortgage Refinancing'
      },
      {
        metric: 'Monthly Savings',
        target: 200,
        benchmark: metrics.monthlyPaymentSavings,
        industry: 'Mortgage Refinancing'
      }
    ],
    decisionRecommendation: recommendation === 'Proceed' ? 'Proceed with refinance' :
                            recommendation === 'Consider' ? 'Consider refinance options' :
                            recommendation === 'Don\'t Refinance' ? 'Don\'t refinance at this time' : 'Review all options carefully',
    presentationPoints: [
      `Monthly savings: ${formatCurrency(metrics.monthlyPaymentSavings)}`,
      `Break-even: ${metrics.breakEvenMonths.toFixed(1)} months`,
      `Net savings: ${formatCurrency(metrics.netSavings)}`,
      `ROI: ${formatPercentage(metrics.returnOnInvestment)}`
    ],
    decisionFactors: [
      'Break-even timeline',
      'Net savings amount',
      'Rate reduction size',
      'Closing costs'
    ],
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}