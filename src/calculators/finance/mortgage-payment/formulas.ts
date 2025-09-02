import { MortgagePaymentInputs, MortgagePaymentOutputs, MortgagePaymentAnalysis } from './types';

export function calculateMortgagePayment(inputs: MortgagePaymentInputs): MortgagePaymentOutputs {
  // Basic loan calculations
  const principal = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  // Calculate monthly payment based on payment type
  let monthlyPayment = 0;
  let principalPayment = 0;
  let interestPayment = 0;
  
  switch (inputs.paymentType) {
    case 'principal_interest':
      monthlyPayment = calculatePrincipalInterestPayment(principal, monthlyRate, totalPayments);
      break;
    case 'interest_only':
      monthlyPayment = calculateInterestOnlyPayment(principal, monthlyRate);
      break;
    case 'balloon':
      monthlyPayment = calculateBalloonPayment(principal, monthlyRate, totalPayments, inputs.loanTerm);
      break;
    case 'arm':
      monthlyPayment = calculateARMPayment(inputs);
      break;
  }
  
  // Calculate payment breakdown
  interestPayment = principal * monthlyRate;
  principalPayment = monthlyPayment - interestPayment;
  
  // Calculate total payments and interest
  const totalPaymentsAmount = monthlyPayment * totalPayments;
  const totalInterestPaid = totalPaymentsAmount - principal;
  const totalPrincipalPaid = principal;
  
  // Calculate effective interest rate
  const effectiveInterestRate = ((Math.pow(totalPaymentsAmount / principal, 1 / totalPayments) - 1) * 12) * 100;
  
  // Generate amortization schedule
  const amortizationSchedule = generateAmortizationSchedule(inputs, monthlyPayment);
  
  // Generate ARM schedule if applicable
  const armSchedule = inputs.paymentType === 'arm' ? generateARMSchedule(inputs) : [];
  
  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs, monthlyPayment);
  
  // Calculate equity analysis
  const equityAnalysis = calculateEquityAnalysis(inputs, amortizationSchedule);
  
  // Calculate cash flow analysis
  const cashFlowAnalysis = calculateCashFlowAnalysis(inputs, monthlyPayment);
  
  // Generate sensitivity analysis
  const sensitivityMatrix = generateSensitivityMatrix(inputs, monthlyPayment);
  
  // Generate scenario analysis
  const scenarios = generateScenarioAnalysis(inputs, monthlyPayment);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, monthlyPayment);
  
  // Calculate risk metrics
  const riskMetrics = calculateRiskMetrics(inputs, monthlyPayment);
  
  // Generate comprehensive analysis
  const analysis = generatePaymentAnalysis(inputs, {
    monthlyPayment,
    totalInterestPaid,
    breakEvenAnalysis,
    equityAnalysis,
    cashFlowAnalysis,
    riskMetrics
  });
  
  return {
    // Core Metrics
    monthlyPayment,
    principalPayment,
    interestPayment,
    totalPayment: monthlyPayment + (inputs.propertyInsurance / 12) + (inputs.propertyTaxes / 12) + inputs.hoaFees,
    totalPayments: totalPaymentsAmount,
    totalInterestPaid,
    effectiveInterestRate,
    breakEvenMonths: breakEvenAnalysis.breakEvenMonths,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    totalPrincipalPaid,
    amortizationSchedule,
    armSchedule,
    breakEvenPoint: breakEvenAnalysis.breakEvenPoint,
    breakEvenYears: breakEvenAnalysis.breakEvenYears,
    equityPosition: equityAnalysis.equityPosition,
    equityPercentage: equityAnalysis.equityPercentage,
    loanToValueRatio: equityAnalysis.loanToValueRatio,
    monthlyCashFlow: cashFlowAnalysis.monthlyCashFlow,
    annualCashFlow: cashFlowAnalysis.annualCashFlow,
    totalCashFlow: cashFlowAnalysis.totalCashFlow,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    riskScore: riskMetrics.riskScore,
    probabilityOfDefault: riskMetrics.probabilityOfDefault,
    paymentShockRisk: riskMetrics.paymentShockRisk,
    interestRateRisk: riskMetrics.interestRateRisk,
  };
}

function calculatePrincipalInterestPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateInterestOnlyPayment(principal: number, monthlyRate: number): number {
  return principal * monthlyRate;
}

function calculateBalloonPayment(principal: number, monthlyRate: number, totalPayments: number, loanTerm: number): number {
  // Calculate payment as if it's a 30-year loan, but with balloon payment at loan term
  const balloonPayment = principal * Math.pow(1 + monthlyRate, totalPayments);
  const monthlyPayment = calculatePrincipalInterestPayment(principal, monthlyRate, 30 * 12);
  return monthlyPayment;
}

function calculateARMPayment(inputs: MortgagePaymentInputs): number {
  const principal = inputs.loanAmount;
  const initialRate = inputs.interestRate / 100 / 12;
  const initialPayments = inputs.initialFixedPeriod * 12;
  
  return calculatePrincipalInterestPayment(principal, initialRate, 30 * 12);
}

function generateAmortizationSchedule(inputs: MortgagePaymentInputs, monthlyPayment: number): any[] {
  const schedule = [];
  let balance = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const startDate = new Date(inputs.firstPaymentDate);
  
  for (let i = 1; i <= inputs.loanTerm * 12; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = Math.max(0, balance - principal);
    
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);
    
    schedule.push({
      paymentNumber: i,
      paymentDate: paymentDate.toISOString().split('T')[0],
      payment: monthlyPayment,
      principal,
      interest,
      balance,
      equity: inputs.propertyValue - balance,
    });
  }
  
  return schedule;
}

function generateARMSchedule(inputs: MortgagePaymentInputs): any[] {
  const schedule = [];
  const startDate = new Date(inputs.firstPaymentDate);
  let currentRate = inputs.interestRate / 100;
  let balance = inputs.loanAmount;
  
  // Initial fixed period
  for (let period = 1; period <= inputs.initialFixedPeriod; period++) {
    const monthlyRate = currentRate / 12;
    const monthlyPayment = calculatePrincipalInterestPayment(balance, monthlyRate, (30 - period + 1) * 12);
    
    schedule.push({
      period,
      startDate: new Date(startDate.getFullYear(), startDate.getMonth() + (period - 1) * 12, startDate.getDate()).toISOString().split('T')[0],
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + period * 12 - 1, startDate.getDate()).toISOString().split('T')[0],
      rate: currentRate * 100,
      payment: monthlyPayment,
      principal: monthlyPayment - (balance * monthlyRate),
      interest: balance * monthlyRate,
      balance,
    });
    
    balance = Math.max(0, balance - (monthlyPayment - (balance * monthlyRate)));
  }
  
  // Adjustment periods
  for (let period = inputs.initialFixedPeriod + 1; period <= 30; period++) {
    // Calculate new rate based on index + margin
    const newRate = Math.min(
      Math.max(
        inputs.indexRate + inputs.margin,
        inputs.floorRate
      ),
      currentRate + inputs.periodicCap,
      inputs.lifetimeCap
    );
    
    currentRate = newRate;
    const monthlyRate = currentRate / 12;
    const monthlyPayment = calculatePrincipalInterestPayment(balance, monthlyRate, (30 - period + 1) * 12);
    
    schedule.push({
      period,
      startDate: new Date(startDate.getFullYear(), startDate.getMonth() + (period - 1) * 12, startDate.getDate()).toISOString().split('T')[0],
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + period * 12 - 1, startDate.getDate()).toISOString().split('T')[0],
      rate: currentRate * 100,
      payment: monthlyPayment,
      principal: monthlyPayment - (balance * monthlyRate),
      interest: balance * monthlyRate,
      balance,
    });
    
    balance = Math.max(0, balance - (monthlyPayment - (balance * monthlyRate)));
  }
  
  return schedule;
}

function calculateBreakEvenAnalysis(inputs: MortgagePaymentInputs, monthlyPayment: number): any {
  const totalMonthlyCost = monthlyPayment + (inputs.propertyInsurance / 12) + (inputs.propertyTaxes / 12) + inputs.hoaFees;
  const monthlyRentEquivalent = inputs.propertyValue * 0.01; // 1% rule for rent estimation
  
  if (totalMonthlyCost <= monthlyRentEquivalent) {
    return {
      breakEvenPoint: 0,
      breakEvenMonths: 0,
      breakEvenYears: 0,
    };
  }
  
  const monthlyDifference = totalMonthlyCost - monthlyRentEquivalent;
  const breakEvenMonths = Math.ceil(inputs.downPayment / monthlyDifference);
  
  return {
    breakEvenPoint: inputs.downPayment + (monthlyDifference * breakEvenMonths),
    breakEvenMonths,
    breakEvenYears: breakEvenMonths / 12,
  };
}

function calculateEquityAnalysis(inputs: MortgagePaymentInputs, amortizationSchedule: any[]): any {
  const currentEquity = inputs.propertyValue - inputs.loanAmount;
  const equityPercentage = (currentEquity / inputs.propertyValue) * 100;
  const loanToValueRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  
  return {
    equityPosition: currentEquity,
    equityPercentage,
    loanToValueRatio,
  };
}

function calculateCashFlowAnalysis(inputs: MortgagePaymentInputs, monthlyPayment: number): any {
  const totalMonthlyCost = monthlyPayment + (inputs.propertyInsurance / 12) + (inputs.propertyTaxes / 12) + inputs.hoaFees;
  const monthlyIncome = inputs.borrowerIncome / 12;
  const monthlyCashFlow = monthlyIncome - totalMonthlyCost;
  
  return {
    monthlyCashFlow,
    annualCashFlow: monthlyCashFlow * 12,
    totalCashFlow: monthlyCashFlow * inputs.loanTerm * 12,
  };
}

function generateSensitivityMatrix(inputs: MortgagePaymentInputs, basePayment: number): any[] {
  const variables = [
    { name: 'Interest Rate', field: 'interestRate', base: inputs.interestRate, range: [-2, -1, 0, 1, 2] },
    { name: 'Loan Amount', field: 'loanAmount', base: inputs.loanAmount, range: [-50000, -25000, 0, 25000, 50000] },
    { name: 'Loan Term', field: 'loanTerm', base: inputs.loanTerm, range: [-5, -2, 0, 2, 5] },
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      const testInputs = { ...inputs };
      if (variable.field === 'interestRate') {
        testInputs.interestRate = variable.base + change;
      } else if (variable.field === 'loanAmount') {
        testInputs.loanAmount = variable.base + change;
      } else if (variable.field === 'loanTerm') {
        testInputs.loanTerm = variable.base + change;
      }
      
      const testPayment = calculatePrincipalInterestPayment(
        testInputs.loanAmount,
        testInputs.interestRate / 100 / 12,
        testInputs.loanTerm * 12
      );
      
      return testPayment;
    });
    
    return {
      variable: variable.name,
      values: variable.range.map(v => variable.base + v),
      impacts,
    };
  });
}

function generateScenarioAnalysis(inputs: MortgagePaymentInputs, basePayment: number): any[] {
  const scenarios = [
    {
      scenario: 'Conservative',
      probability: 0.25,
      interestRateChange: -1,
      propertyAppreciation: 2,
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      interestRateChange: 0,
      propertyAppreciation: 3,
    },
    {
      scenario: 'Aggressive',
      probability: 0.25,
      interestRateChange: 2,
      propertyAppreciation: 5,
    },
  ];
  
  return scenarios.map(scenario => {
    const testInputs = { ...inputs };
    testInputs.interestRate += scenario.interestRateChange;
    testInputs.propertyAppreciationRate = scenario.propertyAppreciation;
    
    const testPayment = calculatePrincipalInterestPayment(
      testInputs.loanAmount,
      testInputs.interestRate / 100 / 12,
      testInputs.loanTerm * 12
    );
    
    const totalInterest = (testPayment * testInputs.loanTerm * 12) - testInputs.loanAmount;
    
    return {
      scenario: scenario.scenario,
      probability: scenario.probability,
      payment: testPayment,
      totalInterest,
    };
  });
}

function generateComparisonAnalysis(inputs: MortgagePaymentInputs, basePayment: number): any[] {
  const comparisons = [
    {
      metric: 'Monthly Payment',
      current: basePayment,
      alternative: basePayment * 0.9, // 10% lower
      difference: basePayment * 0.1,
    },
    {
      metric: 'Total Interest',
      current: (basePayment * inputs.loanTerm * 12) - inputs.loanAmount,
      alternative: (basePayment * 0.9 * inputs.loanTerm * 12) - inputs.loanAmount,
      difference: basePayment * 0.1 * inputs.loanTerm * 12,
    },
    {
      metric: 'Break-Even Months',
      current: Math.ceil(inputs.downPayment / (basePayment * 0.1)),
      alternative: Math.ceil(inputs.downPayment / (basePayment * 0.05)),
      difference: Math.ceil(inputs.downPayment / (basePayment * 0.05)) - Math.ceil(inputs.downPayment / (basePayment * 0.1)),
    },
  ];
  
  return comparisons;
}

function calculateRiskMetrics(inputs: MortgagePaymentInputs, monthlyPayment: number): any {
  // Calculate risk score based on multiple factors
  let riskScore = 50; // Base score
  
  // DTI ratio impact
  const dtiRatio = (monthlyPayment / (inputs.borrowerIncome / 12)) * 100;
  if (dtiRatio > 43) riskScore += 30;
  else if (dtiRatio > 36) riskScore += 20;
  else if (dtiRatio > 28) riskScore += 10;
  else riskScore -= 10;
  
  // Credit score impact
  if (inputs.borrowerCreditScore < 620) riskScore += 25;
  else if (inputs.borrowerCreditScore < 680) riskScore += 15;
  else if (inputs.borrowerCreditScore < 720) riskScore += 5;
  else riskScore -= 10;
  
  // LTV ratio impact
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltvRatio > 95) riskScore += 20;
  else if (ltvRatio > 90) riskScore += 15;
  else if (ltvRatio > 80) riskScore += 10;
  else riskScore -= 5;
  
  // Payment type impact
  if (inputs.paymentType === 'arm') riskScore += 15;
  else if (inputs.paymentType === 'interest_only') riskScore += 20;
  
  // Market condition impact
  if (inputs.marketCondition === 'declining') riskScore += 15;
  else if (inputs.marketCondition === 'hot') riskScore += 5;
  
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  // Calculate probability of default (simplified model)
  const probabilityOfDefault = Math.max(0, Math.min(1, riskScore / 100));
  
  // Calculate payment shock risk
  const paymentShockRisk = inputs.paymentType === 'arm' ? 0.3 : 0.1;
  
  // Calculate interest rate risk
  const interestRateRisk = inputs.paymentType === 'arm' ? 0.4 : 0.1;
  
  return {
    riskScore,
    probabilityOfDefault,
    paymentShockRisk,
    interestRateRisk,
  };
}

function generatePaymentAnalysis(inputs: MortgagePaymentInputs, metrics: any): MortgagePaymentAnalysis {
  const { monthlyPayment, totalInterestPaid, breakEvenAnalysis, equityAnalysis, cashFlowAnalysis, riskMetrics } = metrics;
  
  // Determine payment rating
  let paymentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  const dtiRatio = (monthlyPayment / (inputs.borrowerIncome / 12)) * 100;
  
  if (dtiRatio < 25) paymentRating = 'Excellent';
  else if (dtiRatio < 30) paymentRating = 'Good';
  else if (dtiRatio < 36) paymentRating = 'Average';
  else if (dtiRatio < 43) paymentRating = 'Poor';
  else paymentRating = 'Very Poor';
  
  // Determine affordability rating
  let affordabilityRating: 'Very Affordable' | 'Affordable' | 'Moderate' | 'Expensive' | 'Very Expensive' = 'Moderate';
  const paymentToIncomeRatio = (monthlyPayment / (inputs.borrowerIncome / 12)) * 100;
  
  if (paymentToIncomeRatio < 15) affordabilityRating = 'Very Affordable';
  else if (paymentToIncomeRatio < 25) affordabilityRating = 'Affordable';
  else if (paymentToIncomeRatio < 35) affordabilityRating = 'Moderate';
  else if (paymentToIncomeRatio < 45) affordabilityRating = 'Expensive';
  else affordabilityRating = 'Very Expensive';
  
  // Determine recommendation
  let recommendation: 'Proceed' | 'Consider' | 'Reconsider' | 'Requires Review' = 'Consider';
  
  if (riskMetrics.riskScore < 30 && dtiRatio < 30) recommendation = 'Proceed';
  else if (riskMetrics.riskScore < 50 && dtiRatio < 36) recommendation = 'Consider';
  else if (riskMetrics.riskScore < 70 && dtiRatio < 43) recommendation = 'Reconsider';
  else recommendation = 'Requires Review';
  
  // Generate key insights
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];
  const riskFactors: string[] = [];
  const opportunities: string[] = [];
  
  if (dtiRatio < 30) keyStrengths.push('Low debt-to-income ratio indicates strong affordability');
  if (inputs.borrowerCreditScore > 720) keyStrengths.push('Excellent credit score reduces borrowing costs');
  if (equityAnalysis.equityPercentage > 20) keyStrengths.push('Strong equity position provides financial buffer');
  
  if (dtiRatio > 36) keyWeaknesses.push('High debt-to-income ratio may limit financial flexibility');
  if (inputs.borrowerCreditScore < 680) keyWeaknesses.push('Lower credit score increases borrowing costs');
  if (equityAnalysis.loanToValueRatio > 90) keyWeaknesses.push('High loan-to-value ratio increases risk');
  
  if (inputs.paymentType === 'arm') riskFactors.push('Adjustable rate mortgage exposes borrower to interest rate risk');
  if (inputs.marketCondition === 'declining') riskFactors.push('Declining market may reduce property value');
  if (cashFlowAnalysis.monthlyCashFlow < 0) riskFactors.push('Negative cash flow indicates financial stress');
  
  if (breakEvenAnalysis.breakEvenMonths < 24) opportunities.push('Quick break-even point suggests good investment potential');
  if (inputs.propertyAppreciationRate > 4) opportunities.push('Strong property appreciation potential');
  if (inputs.inflationRate > 3) opportunities.push('Inflation may reduce real cost of fixed payments');
  
  return {
    paymentRating,
    affordabilityRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,
    paymentSummary: `Monthly payment of ${monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} with a ${dtiRatio.toFixed(1)}% debt-to-income ratio.`,
    affordabilityAnalysis: `This payment represents ${paymentToIncomeRatio.toFixed(1)}% of monthly income, which is ${affordabilityRating.toLowerCase()}.`,
    cashFlowAnalysis: `Monthly cash flow is ${cashFlowAnalysis.monthlyCashFlow.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} after all housing expenses.`,
    costSummary: `Total interest paid over ${inputs.loanTerm} years will be ${totalInterestPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`,
    interestAnalysis: `Effective interest rate is ${((totalInterestPaid / inputs.loanAmount) * 100 / inputs.loanTerm).toFixed(2)}% annually.`,
    totalCostAnalysis: `Total cost of ownership including principal, interest, taxes, and insurance.`,
    armSummary: inputs.paymentType === 'arm' ? 'Adjustable rate mortgage with initial fixed period and subsequent rate adjustments.' : 'Fixed rate mortgage provides payment stability.',
    rateRiskAnalysis: inputs.paymentType === 'arm' ? 'Interest rate changes may significantly impact monthly payments.' : 'Fixed rate provides protection against interest rate increases.',
    paymentShockAnalysis: inputs.paymentType === 'arm' ? 'Payment shock risk when rates adjust.' : 'No payment shock risk with fixed rate.',
    equitySummary: `Current equity position is ${equityAnalysis.equityPosition.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${equityAnalysis.equityPercentage.toFixed(1)}% of property value).`,
    equityGrowthAnalysis: `Equity will grow through principal payments and potential property appreciation.`,
    ltvAnalysis: `Loan-to-value ratio of ${equityAnalysis.loanToValueRatio.toFixed(1)}% is ${equityAnalysis.loanToValueRatio > 80 ? 'above' : 'below'} the 80% threshold.`,
    riskAssessment: `Overall risk score of ${riskMetrics.riskScore}/100 indicates ${riskMetrics.riskScore < 30 ? 'low' : riskMetrics.riskScore < 50 ? 'moderate' : 'high'} risk.`,
    paymentRisk: `Payment risk is ${riskMetrics.paymentShockRisk < 0.2 ? 'low' : riskMetrics.paymentShockRisk < 0.4 ? 'moderate' : 'high'}.`,
    interestRateRisk: `Interest rate risk is ${riskMetrics.interestRateRisk < 0.2 ? 'low' : riskMetrics.interestRateRisk < 0.4 ? 'moderate' : 'high'}.`,
    marketRisk: `Market risk is ${inputs.marketCondition === 'stable' ? 'low' : inputs.marketCondition === 'growing' ? 'moderate' : 'high'}.`,
    marketAnalysis: `Property located in a ${inputs.marketCondition} market with ${inputs.propertyAppreciationRate}% annual appreciation potential.`,
    competitiveAnalysis: `Current terms are ${inputs.interestRate < 4 ? 'very competitive' : inputs.interestRate < 5 ? 'competitive' : 'average'} for current market conditions.`,
    marketPosition: `Property value and location suggest ${inputs.propertyAppreciationRate > 4 ? 'strong' : inputs.propertyAppreciationRate > 2 ? 'moderate' : 'limited'} appreciation potential.`,
    paymentRecommendations: [
      'Consider making additional principal payments to reduce total interest cost',
      'Monitor interest rates for refinancing opportunities',
      'Maintain emergency fund equal to 3-6 months of payments',
    ],
    optimizationSuggestions: [
      'Consider bi-weekly payments to reduce loan term',
      'Evaluate refinancing when rates drop by 1% or more',
      'Consider paying points to reduce interest rate',
    ],
    riskMitigation: [
      'Maintain adequate insurance coverage',
      'Consider rate lock if rates are expected to rise',
      'Build emergency fund for unexpected expenses',
    ],
    implementationPlan: 'Proceed with loan application and secure rate lock if terms are acceptable.',
    nextSteps: [
      'Submit loan application',
      'Provide required documentation',
      'Lock in interest rate',
      'Schedule closing',
    ],
    timeline: 'Typical closing timeline is 30-45 days from application.',
    monitoringPlan: 'Review mortgage terms annually and monitor for refinancing opportunities.',
    keyMetrics: [
      'Monthly payment amount',
      'Total interest paid',
      'Break-even timeline',
      'Equity growth rate',
    ],
    reviewSchedule: 'Annual review of mortgage terms and market conditions.',
    riskManagement: 'Maintain adequate insurance and emergency funds to mitigate financial risks.',
    mitigationStrategies: [
      'Build emergency fund',
      'Consider mortgage insurance',
      'Monitor market conditions',
    ],
    contingencyPlans: [
      'Refinance if rates drop significantly',
      'Sell property if financial situation changes',
      'Rent property if unable to maintain payments',
    ],
    performanceBenchmarks: [
      {
        metric: 'DTI Ratio',
        target: 36,
        benchmark: dtiRatio,
        industry: 'Mortgage Lending',
      },
      {
        metric: 'LTV Ratio',
        target: 80,
        benchmark: equityAnalysis.loanToValueRatio,
        industry: 'Mortgage Lending',
      },
      {
        metric: 'Credit Score',
        target: 720,
        benchmark: inputs.borrowerCreditScore,
        industry: 'Mortgage Lending',
      },
    ],
    decisionRecommendation: recommendation === 'Proceed' ? 'Proceed with confidence' : 
                            recommendation === 'Consider' ? 'Proceed with caution' :
                            recommendation === 'Reconsider' ? 'Reconsider terms' : 'Requires additional review',
    presentationPoints: [
      `Monthly payment: ${monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
      `Total interest: ${totalInterestPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
      `Break-even: ${breakEvenAnalysis.breakEvenMonths} months`,
      `Risk score: ${riskMetrics.riskScore}/100`,
    ],
    decisionFactors: [
      'Affordability based on income',
      'Risk tolerance for payment changes',
      'Long-term financial goals',
      'Market conditions and property appreciation',
    ],
  };
}