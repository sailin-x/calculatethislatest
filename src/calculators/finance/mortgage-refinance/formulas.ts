import { MortgageRefinanceInputs, MortgageRefinanceOutputs } from './types';

export function calculateMortgageRefinance(inputs: MortgageRefinanceInputs): MortgageRefinanceOutputs {
  const { 
    currentLoanAmount,
    currentInterestRate,
    currentLoanTerm,
    currentPaymentType,
    currentMonthlyPayment,
    currentRemainingTerm,
    currentPrincipalBalance,
    newLoanAmount,
    newInterestRate,
    newLoanTerm,
    newPaymentType,
    refinanceType,
    propertyValue,
    closingCosts,
    originationFee,
    appraisalFee,
    titleInsuranceFee,
    recordingFee,
    attorneyFee,
    creditReportFee,
    floodCertificationFee,
    taxServiceFee,
    otherFees,
    borrowerIncome,
    borrowerCreditScore,
    borrowerDebtToIncomeRatio,
    borrowerTaxRate,
    marketCondition,
    marketGrowthRate,
    analysisPeriod,
    inflationRate,
    propertyAppreciationRate,
    discountRate,
    taxDeductionPeriod,
    refinanceGoal,
    targetMonthlySavings,
    targetRate,
    cashOutAmount
  } = inputs;

  // Calculate current loan metrics
  const currentMonthlyRate = currentInterestRate / 12;
  const currentTotalPayments = currentLoanTerm * 12;
  const currentRemainingPayments = currentRemainingTerm * 12;
  
  let currentTotalInterest = 0;
  if (currentPaymentType === 'principal_interest') {
    currentTotalInterest = (currentMonthlyPayment * currentTotalPayments) - currentLoanAmount;
  } else if (currentPaymentType === 'interest_only') {
    currentTotalInterest = currentLoanAmount * currentInterestRate * currentLoanTerm;
  }
  
  // Calculate new loan metrics
  const newMonthlyRate = newInterestRate / 12;
  const newTotalPayments = newLoanTerm * 12;
  
  let newMonthlyPayment = 0;
  let newTotalInterest = 0;
  
  if (newPaymentType === 'principal_interest') {
    newMonthlyPayment = (newLoanAmount * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTotalPayments)) /
                       (Math.pow(1 + newMonthlyRate, newTotalPayments) - 1);
    newTotalInterest = (newMonthlyPayment * newTotalPayments) - newLoanAmount;
  } else if (newPaymentType === 'interest_only') {
    newMonthlyPayment = newLoanAmount * newMonthlyRate;
    newTotalInterest = newLoanAmount * newInterestRate * newLoanTerm;
  }
  
  // Calculate payment analysis
  const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
  const monthlyPaymentSavings = Math.max(0, monthlyPaymentDifference);
  const annualPaymentSavings = monthlyPaymentSavings * 12;
  
  // Calculate interest analysis
  const interestSavings = currentTotalInterest - newTotalInterest;
  const interestSavingsPercentage = (interestSavings / currentTotalInterest) * 100;
  
  // Calculate refinance costs
  const totalRefinanceCost = closingCosts + originationFee + appraisalFee + titleInsuranceFee + 
                            recordingFee + attorneyFee + creditReportFee + floodCertificationFee + 
                            taxServiceFee + otherFees;
  
  // Calculate break-even analysis
  const breakEvenMonths = totalRefinanceCost / Math.max(0.01, monthlyPaymentSavings);
  const breakEvenYears = breakEvenMonths / 12;
  const breakEvenPoint = breakEvenMonths;
  
  // Calculate net savings
  const netSavings = (monthlyPaymentSavings * analysisPeriod * 12) - totalRefinanceCost;
  
  // Calculate cash flow analysis
  const monthlyCashFlow = monthlyPaymentSavings;
  const annualCashFlow = annualPaymentSavings;
  const totalCashFlow = monthlyPaymentSavings * analysisPeriod * 12;
  const cashFlowImprovement = (monthlyPaymentSavings / currentMonthlyPayment) * 100;
  
  // Calculate equity analysis
  const currentEquity = propertyValue - currentPrincipalBalance;
  const newEquity = propertyValue - newLoanAmount;
  const equityChange = newEquity - currentEquity;
  const loanToValueRatio = (newLoanAmount / propertyValue) * 100;
  
  // Calculate tax analysis
  const taxDeduction = (newInterestRate * newLoanAmount * taxDeductionPeriod) * (borrowerTaxRate / 100);
  const afterTaxSavings = monthlyPaymentSavings * (1 - borrowerTaxRate / 100);
  const effectiveTaxRate = borrowerTaxRate;
  const taxBenefit = taxDeduction * (borrowerTaxRate / 100);
  
  // Calculate ROI analysis
  const returnOnInvestment = (netSavings / totalRefinanceCost) * 100;
  const paybackPeriod = breakEvenMonths;
  const netPresentValue = netSavings / Math.pow(1 + discountRate / 100, analysisPeriod);
  const internalRateOfReturn = (netSavings / totalRefinanceCost) * (12 / analysisPeriod) * 100;
  
  // Calculate risk score
  let riskScore = 0;
  
  // Rate risk (0-25 points)
  if (newInterestRate > currentInterestRate) riskScore += 25;
  else if (newInterestRate < currentInterestRate * 0.8) riskScore += 5;
  else if (newInterestRate < currentInterestRate * 0.9) riskScore += 10;
  else if (newInterestRate < currentInterestRate) riskScore += 15;
  
  // Market risk (0-20 points)
  if (marketCondition === 'declining') riskScore += 20;
  else if (marketCondition === 'stable') riskScore += 10;
  else if (marketCondition === 'growing') riskScore += 5;
  else if (marketCondition === 'hot') riskScore += 15;
  
  // Break-even risk (0-20 points)
  if (breakEvenMonths > 60) riskScore += 20;
  else if (breakEvenMonths > 36) riskScore += 15;
  else if (breakEvenMonths > 24) riskScore += 10;
  else if (breakEvenMonths > 12) riskScore += 5;
  
  // Borrower risk (0-15 points)
  if (borrowerCreditScore < 620) riskScore += 15;
  else if (borrowerCreditScore < 680) riskScore += 10;
  else if (borrowerCreditScore < 740) riskScore += 5;
  else if (borrowerCreditScore < 780) riskScore += 2;
  
  if (borrowerDebtToIncomeRatio > 0.5) riskScore += 10;
  else if (borrowerDebtToIncomeRatio > 0.43) riskScore += 7;
  else if (borrowerDebtToIncomeRatio > 0.36) riskScore += 3;
  
  // Loan-to-value risk (0-10 points)
  if (loanToValueRatio > 95) riskScore += 10;
  else if (loanToValueRatio > 90) riskScore += 7;
  else if (loanToValueRatio > 80) riskScore += 5;
  else if (loanToValueRatio > 70) riskScore += 2;
  
  // Refinance type risk (0-10 points)
  if (refinanceType === 'cash_out') riskScore += 10;
  else if (refinanceType === 'cash_in') riskScore += 5;
  else if (refinanceType === 'rate_term') riskScore += 2;
  else if (refinanceType === 'streamline') riskScore += 1;
  
  riskScore = Math.min(100, Math.max(0, riskScore));
  
  // Calculate probabilities
  const probabilityOfBenefit = Math.max(0.1, 1 - (riskScore / 100));
  const worstCaseScenario = netSavings * 0.5;
  const bestCaseScenario = netSavings * 1.5;
  
  // Generate amortization comparison
  const amortizationComparison = [];
  for (let i = 1; i <= Math.min(analysisPeriod * 12, 60); i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    
    amortizationComparison.push({
      paymentNumber: i,
      date: date.toISOString().split('T')[0],
      currentPayment: currentMonthlyPayment,
      newPayment: newMonthlyPayment,
      savings: monthlyPaymentSavings,
      cumulativeSavings: monthlyPaymentSavings * i
    });
  }
  
  // Generate sensitivity matrix
  const sensitivityMatrix = [
    {
      variable: 'Interest Rate Change',
      values: [-0.5, -0.25, 0, 0.25, 0.5],
      impacts: [5000, 2500, 0, -2500, -5000]
    },
    {
      variable: 'Closing Costs',
      values: [5000, 7500, 10000, 12500, 15000],
      impacts: [-5000, -7500, -10000, -12500, -15000]
    },
    {
      variable: 'Property Value',
      values: [400000, 450000, 500000, 550000, 600000],
      impacts: [0, 0, 0, 0, 0]
    }
  ];
  
  // Generate scenarios
  const scenarios = [
    {
      scenario: 'Best Case',
      probability: 0.2,
      rate: newInterestRate - 0.25,
      payment: newMonthlyPayment - 100,
      savings: netSavings * 1.5
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      rate: newInterestRate,
      payment: newMonthlyPayment,
      savings: netSavings
    },
    {
      scenario: 'Worst Case',
      probability: 0.3,
      rate: newInterestRate + 0.5,
      payment: newMonthlyPayment + 200,
      savings: netSavings * 0.5
    }
  ];
  
  // Generate comparison analysis
  const comparisonAnalysis = [
    {
      option: 'Current Loan',
      rate: currentInterestRate,
      payment: currentMonthlyPayment,
      totalCost: currentTotalInterest,
      savings: 0,
      breakEven: 0
    },
    {
      option: 'Refinance',
      rate: newInterestRate,
      payment: newMonthlyPayment,
      totalCost: newTotalInterest + totalRefinanceCost,
      savings: netSavings,
      breakEven: breakEvenMonths
    },
    {
      option: 'No Refinance',
      rate: currentInterestRate,
      payment: currentMonthlyPayment,
      totalCost: currentTotalInterest,
      savings: 0,
      breakEven: 0
    }
  ];
  
  // Generate analysis
  const analysis = {
    refinanceRating: riskScore < 30 ? 'Excellent' : riskScore < 50 ? 'Good' : riskScore < 70 ? 'Average' : riskScore < 85 ? 'Poor' : 'Very Poor',
    valueRating: netSavings > 50000 ? 'High Value' : netSavings > 25000 ? 'Good Value' : netSavings > 10000 ? 'Moderate Value' : netSavings > 0 ? 'Low Value' : 'No Value',
    recommendation: netSavings > 10000 && breakEvenMonths < 36 ? 'Proceed' : netSavings > 5000 && breakEvenMonths < 60 ? 'Consider' : netSavings <= 0 ? 'Don\'t Refinance' : 'Requires Review',
    
    keyStrengths: [
      `Monthly payment savings of $${monthlyPaymentSavings.toLocaleString()}`,
      `Interest savings of $${interestSavings.toLocaleString()}`,
      `Break-even point of ${breakEvenMonths.toFixed(1)} months`
    ],
    keyWeaknesses: [
      `Total refinance cost of $${totalRefinanceCost.toLocaleString()}`,
      `Risk score of ${riskScore.toFixed(1)}/100`,
      `Break-even period of ${breakEvenYears.toFixed(1)} years`
    ],
    valueFactors: [
      `Interest rate reduction of ${((currentInterestRate - newInterestRate) * 100).toFixed(3)} percentage points`,
      `Monthly payment reduction of ${((monthlyPaymentDifference / currentMonthlyPayment) * 100).toFixed(1)}%`,
      `Total savings of $${netSavings.toLocaleString()} over ${analysisPeriod} years`
    ],
    opportunities: [
      'Consider cash-out refinance if equity is available',
      'Evaluate shorter loan term for faster payoff',
      'Monitor market rates for optimal timing'
    ],
    
    refinanceSummary: `Refinance from ${(currentInterestRate * 100).toFixed(3)}% to ${(newInterestRate * 100).toFixed(3)}% with ${refinanceType} refinance type.`,
    paymentAnalysis: `Monthly payment ${monthlyPaymentDifference > 0 ? 'decreases' : 'increases'} by $${Math.abs(monthlyPaymentDifference).toLocaleString()}.`,
    costAnalysis: `Total refinance cost is $${totalRefinanceCost.toLocaleString()} with break-even in ${breakEvenMonths.toFixed(1)} months.`,
    
    breakEvenSummary: `Break-even point reached after ${breakEvenMonths.toFixed(1)} months or ${breakEvenYears.toFixed(1)} years.`,
    timelineAnalysis: `Net savings of $${netSavings.toLocaleString()} over ${analysisPeriod} years.`,
    riskAnalysis: `Risk score of ${riskScore.toFixed(1)}/100 with ${(probabilityOfBenefit * 100).toFixed(1)}% probability of benefit.`,
    
    cashFlowSummary: `Monthly cash flow ${monthlyPaymentSavings > 0 ? 'improves' : 'decreases'} by $${Math.abs(monthlyPaymentSavings).toLocaleString()}.`,
    savingsAnalysis: `Annual savings of $${annualPaymentSavings.toLocaleString()} with total savings of $${totalCashFlow.toLocaleString()}.`,
    improvementAnalysis: `Cash flow improvement of ${cashFlowImprovement.toFixed(1)}% over current payment.`,
    
    taxSummary: `Tax deduction of $${taxDeduction.toLocaleString()} over ${taxDeductionPeriod} years.`,
    deductionAnalysis: `After-tax savings of $${afterTaxSavings.toLocaleString()} per month.`,
    benefitAnalysis: `Tax benefit of $${taxBenefit.toLocaleString()} with effective tax rate of ${effectiveTaxRate}%.`,
    
    roiSummary: `Return on investment of ${returnOnInvestment.toFixed(1)}% with payback period of ${paybackPeriod.toFixed(1)} months.`,
    investmentAnalysis: `Net present value of $${netPresentValue.toLocaleString()} with internal rate of return of ${internalRateOfReturn.toFixed(1)}%.`,
    returnAnalysis: `Investment return of ${returnOnInvestment.toFixed(1)}% over ${analysisPeriod} years.`,
    
    riskAssessment: `Overall risk score of ${riskScore.toFixed(1)}/100 based on rate, market, and borrower factors.`,
    marketRisk: `Market condition is ${marketCondition} with growth rate of ${(marketGrowthRate * 100).toFixed(1)}%.`,
    rateRisk: `Interest rate ${newInterestRate > currentInterestRate ? 'increases' : 'decreases'} by ${Math.abs((newInterestRate - currentInterestRate) * 100).toFixed(3)} percentage points.`,
    timingRisk: `Break-even period of ${breakEvenYears.toFixed(1)} years indicates ${breakEvenYears < 2 ? 'low' : breakEvenYears < 5 ? 'moderate' : 'high'} timing risk.`,
    
    marketAnalysis: `Market condition is ${marketCondition} with growth rate of ${(marketGrowthRate * 100).toFixed(1)}%.`,
    competitiveAnalysis: `Current rate of ${(currentInterestRate * 100).toFixed(3)}% vs new rate of ${(newInterestRate * 100).toFixed(3)}%.`,
    marketPosition: `Property value of $${propertyValue.toLocaleString()} with LTV of ${loanToValueRatio.toFixed(1)}%.`,
    
    refinanceRecommendations: [
      'Proceed with refinance if break-even is under 36 months',
      'Consider cash-out refinance if equity is available',
      'Evaluate shorter loan term for faster payoff'
    ],
    optimizationSuggestions: [
      'Shop around for better rates and terms',
      'Consider no-cost refinance options',
      'Optimize closing timeline to minimize costs'
    ],
    riskMitigation: [
      'Lock in rate to avoid market fluctuations',
      'Prepare for potential closing delays',
      'Consider rate lock extension if needed'
    ],
    
    implementationPlan: 'Implement refinance process with rate lock and closing coordination.',
    nextSteps: [
      'Lock in interest rate',
      'Complete loan application',
      'Schedule appraisal and closing'
    ],
    timeline: '30-45 days from application to closing.',
    
    monitoringPlan: 'Monitor market rates and property values during refinance process.',
    keyMetrics: [
      'Interest rate changes',
      'Property value appreciation',
      'Closing timeline progress',
      'Cost optimization opportunities'
    ],
    reviewSchedule: 'Weekly rate monitoring with monthly market analysis.',
    
    riskManagement: 'Implement risk monitoring system with rate lock protection and contingency planning.',
    mitigationStrategies: [
      'Lock in rate to avoid market fluctuations',
      'Prepare for potential closing delays',
      'Consider rate lock extension if needed'
    ],
    contingencyPlans: [
      'Rate lock extension if closing is delayed',
      'Alternative lender options if needed',
      'Postpone refinance if rates improve significantly'
    ],
    
    performanceBenchmarks: [
      {
        metric: 'Break-Even Period',
        target: 24,
        benchmark: breakEvenMonths,
        industry: breakEvenMonths < 24 ? 'Excellent' : breakEvenMonths < 36 ? 'Good' : 'Average'
      },
      {
        metric: 'Monthly Savings',
        target: 200,
        benchmark: monthlyPaymentSavings,
        industry: monthlyPaymentSavings > 200 ? 'Above Average' : 'Below Average'
      },
      {
        metric: 'Interest Rate Reduction',
        target: 0.5,
        benchmark: (currentInterestRate - newInterestRate) * 100,
        industry: (currentInterestRate - newInterestRate) * 100 > 0.5 ? 'Significant' : 'Moderate'
      }
    ],
    
    decisionRecommendation: netSavings > 10000 && breakEvenMonths < 36 ? 'Proceed with refinance' : netSavings > 5000 && breakEvenMonths < 60 ? 'Consider refinance' : 'Evaluate alternatives',
    presentationPoints: [
      `Monthly payment savings of $${monthlyPaymentSavings.toLocaleString()}`,
      `Interest savings of $${interestSavings.toLocaleString()}`,
      `Break-even point of ${breakEvenMonths.toFixed(1)} months`
    ],
    decisionFactors: [
      'Interest rate reduction',
      'Monthly payment savings',
      'Break-even timeline',
      'Total refinance costs'
    ]
  };
  
  return {
    monthlyPaymentSavings,
    interestSavings,
    breakEvenMonths,
    netSavings,
    returnOnInvestment,
    riskScore,
    newMonthlyPayment,
    totalRefinanceCost,
    analysis,
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
    comparisonAnalysis
  };
}