import { MortgagePaymentInputs, MortgagePaymentOutputs } from './types';

export function calculateMortgagePayment(inputs: MortgagePaymentInputs): MortgagePaymentOutputs {
  const { loanAmount, interestRate, loanTerm, paymentType, paymentFrequency } = inputs;
  
  // Calculate monthly interest rate
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  
  let monthlyPayment = 0;
  let principalPayment = 0;
  let interestPayment = 0;
  
  // Calculate payment based on type
  switch (paymentType) {
    case 'principal_interest':
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                      (Math.pow(1 + monthlyRate, totalPayments) - 1);
      principalPayment = monthlyPayment - (loanAmount * monthlyRate);
      interestPayment = loanAmount * monthlyRate;
      break;
      
    case 'interest_only':
      monthlyPayment = loanAmount * monthlyRate;
      principalPayment = 0;
      interestPayment = loanAmount * monthlyRate;
      break;
      
    case 'balloon':
      // For balloon payment, calculate interest-only payments for most of the term
      // and a large principal payment at the end
      monthlyPayment = loanAmount * monthlyRate;
      principalPayment = 0;
      interestPayment = loanAmount * monthlyRate;
      break;
      
    case 'arm':
      // For ARM, use initial rate for calculation
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                      (Math.pow(1 + monthlyRate, totalPayments) - 1);
      principalPayment = monthlyPayment - (loanAmount * monthlyRate);
      interestPayment = loanAmount * monthlyRate;
      break;
  }
  
  // Calculate total payments and interest
  const totalPaymentsAmount = monthlyPayment * totalPayments;
  const totalInterestPaid = totalPaymentsAmount - loanAmount;
  const totalPrincipalPaid = loanAmount;
  
  // Calculate effective interest rate
  const effectiveInterestRate = (totalInterestPaid / loanAmount) / loanTerm;
  
  // Calculate break-even point
  const breakEvenMonths = Math.ceil(loanAmount / principalPayment);
  const breakEvenYears = breakEvenMonths / 12;
  const breakEvenPoint = breakEvenMonths;
  
  // Calculate equity position
  const equityPosition = inputs.propertyValue - loanAmount;
  const equityPercentage = (equityPosition / inputs.propertyValue) * 100;
  const loanToValueRatio = (loanAmount / inputs.propertyValue) * 100;
  
  // Calculate cash flow
  const monthlyCashFlow = inputs.borrowerIncome / 12 - monthlyPayment;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalCashFlow = annualCashFlow * loanTerm;
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs);
  
  // Calculate probability of default
  const probabilityOfDefault = calculateDefaultProbability(inputs, riskScore);
  
  // Calculate payment shock risk (for ARM)
  const paymentShockRisk = calculatePaymentShockRisk(inputs);
  
  // Calculate interest rate risk
  const interestRateRisk = calculateInterestRateRisk(inputs);
  
  // Generate amortization schedule
  const amortizationSchedule = generateAmortizationSchedule(inputs, monthlyPayment);
  
  // Generate ARM schedule (if applicable)
  const armSchedule = generateARMSchedule(inputs);
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  
  // Generate scenarios
  const scenarios = generateScenarios(inputs);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    monthlyPayment,
    totalInterestPaid,
    riskScore,
    probabilityOfDefault,
    paymentShockRisk,
    interestRateRisk
  });
  
  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    principalPayment: parseFloat(principalPayment.toFixed(2)),
    interestPayment: parseFloat(interestPayment.toFixed(2)),
    totalPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPayments: totalPaymentsAmount,
    totalInterestPaid: parseFloat(totalInterestPaid.toFixed(2)),
    effectiveInterestRate: parseFloat(effectiveInterestRate.toFixed(4)),
    breakEvenMonths,
    analysis,
    totalPrincipalPaid: parseFloat(totalPrincipalPaid.toFixed(2)),
    amortizationSchedule,
    armSchedule,
    breakEvenPoint,
    breakEvenYears,
    equityPosition: parseFloat(equityPosition.toFixed(2)),
    equityPercentage: parseFloat(equityPercentage.toFixed(2)),
    loanToValueRatio: parseFloat(loanToValueRatio.toFixed(2)),
    monthlyCashFlow: parseFloat(monthlyCashFlow.toFixed(2)),
    annualCashFlow: parseFloat(annualCashFlow.toFixed(2)),
    totalCashFlow: parseFloat(totalCashFlow.toFixed(2)),
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    riskScore,
    probabilityOfDefault,
    paymentShockRisk,
    interestRateRisk
  };
}

function calculateRiskScore(inputs: MortgagePaymentInputs): number {
  let score = 0;
  
  // Credit score risk
  if (inputs.borrowerCreditScore < 620) score += 3;
  else if (inputs.borrowerCreditScore < 680) score += 2;
  else if (inputs.borrowerCreditScore < 720) score += 1;
  
  // Debt-to-income ratio risk
  if (inputs.borrowerDebtToIncomeRatio > 0.43) score += 3;
  else if (inputs.borrowerDebtToIncomeRatio > 0.36) score += 2;
  else if (inputs.borrowerDebtToIncomeRatio > 0.28) score += 1;
  
  // Loan-to-value ratio risk
  const ltv = inputs.loanAmount / inputs.propertyValue;
  if (ltv > 0.95) score += 3;
  else if (ltv > 0.8) score += 2;
  else if (ltv > 0.7) score += 1;
  
  // Property type risk
  if (inputs.propertyType === 'commercial') score += 2;
  else if (inputs.propertyType === 'multi_family') score += 1;
  
  // Market condition risk
  if (inputs.marketCondition === 'declining') score += 2;
  else if (inputs.marketCondition === 'stable') score += 1;
  
  // Employment type risk
  if (inputs.borrowerEmploymentType === 'self_employed') score += 2;
  else if (inputs.borrowerEmploymentType === 'business_owner') score += 1;
  
  return Math.min(score, 10); // Cap at 10
}

function calculateDefaultProbability(inputs: MortgagePaymentInputs, riskScore: number): number {
  // Base default probability based on risk score
  const baseProbability = riskScore * 0.02; // 2% per risk point
  
  // Adjust based on loan type
  let adjustment = 1;
  switch (inputs.loanType) {
    case 'conventional': adjustment = 1; break;
    case 'fha': adjustment = 1.2; break;
    case 'va': adjustment = 0.8; break;
    case 'usda': adjustment = 1.1; break;
    case 'jumbo': adjustment = 1.3; break;
    case 'hard_money': adjustment = 2; break;
    case 'private': adjustment = 1.5; break;
  }
  
  return Math.min(baseProbability * adjustment, 0.5); // Cap at 50%
}

function calculatePaymentShockRisk(inputs: MortgagePaymentInputs): number {
  if (inputs.paymentType !== 'arm') return 0;
  
  // Calculate potential payment increase
  const currentPayment = inputs.loanAmount * (inputs.interestRate / 12);
  const maxRate = inputs.interestRate + inputs.lifetimeCap;
  const maxPayment = inputs.loanAmount * (maxRate / 12);
  const paymentIncrease = (maxPayment - currentPayment) / currentPayment;
  
  return Math.min(paymentIncrease, 1); // Cap at 100% increase
}

function calculateInterestRateRisk(inputs: MortgagePaymentInputs): number {
  if (inputs.paymentType !== 'arm') return 0;
  
  // Calculate potential interest rate increase
  const rateIncrease = inputs.lifetimeCap;
  const rateRisk = rateIncrease / inputs.interestRate;
  
  return Math.min(rateRisk, 1); // Cap at 100% increase
}

function generateAmortizationSchedule(inputs: MortgagePaymentInputs, monthlyPayment: number): any[] {
  const schedule = [];
  let balance = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 12;
  
  for (let i = 1; i <= inputs.loanTerm * 12; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    
    schedule.push({
      paymentNumber: i,
      paymentDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      payment: parseFloat(monthlyPayment.toFixed(2)),
      principal: parseFloat(principalPayment.toFixed(2)),
      interest: parseFloat(interestPayment.toFixed(2)),
      balance: parseFloat(Math.max(0, balance).toFixed(2)),
      equity: parseFloat((inputs.propertyValue - Math.max(0, balance)).toFixed(2))
    });
  }
  
  return schedule;
}

function generateARMSchedule(inputs: MortgagePaymentInputs): any[] {
  if (inputs.paymentType !== 'arm') return [];
  
  const schedule = [];
  const initialPeriod = inputs.initialFixedPeriod * 12;
  const adjustmentPeriod = inputs.adjustmentPeriod * 12;
  
  for (let i = 0; i < inputs.loanTerm; i++) {
    const startDate = new Date(Date.now() + i * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = new Date(Date.now() + (i + 1) * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let rate = inputs.interestRate;
    if (i > inputs.initialFixedPeriod) {
      rate = Math.min(inputs.indexRate + inputs.margin, inputs.floorRate + inputs.lifetimeCap);
    }
    
    const monthlyRate = rate / 12;
    const remainingPayments = (inputs.loanTerm - i) * 12;
    const payment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, remainingPayments)) /
                   (Math.pow(1 + monthlyRate, remainingPayments) - 1);
    
    schedule.push({
      period: i + 1,
      startDate,
      endDate,
      rate: parseFloat(rate.toFixed(4)),
      payment: parseFloat(payment.toFixed(2)),
      principal: parseFloat((payment - inputs.loanAmount * monthlyRate).toFixed(2)),
      interest: parseFloat((inputs.loanAmount * monthlyRate).toFixed(2)),
      balance: parseFloat(inputs.loanAmount.toFixed(2))
    });
  }
  
  return schedule;
}

function generateSensitivityMatrix(inputs: MortgagePaymentInputs): any[] {
  const variables = ['interestRate', 'loanTerm', 'loanAmount'];
  const matrix = [];
  
  for (const variable of variables) {
    const values = [];
    const impacts = [];
    
    // Generate test values
    for (let i = -0.02; i <= 0.02; i += 0.005) {
      let testValue = inputs[variable as keyof MortgagePaymentInputs] as number;
      if (variable === 'interestRate') {
        testValue = Math.max(0, testValue + i);
      } else if (variable === 'loanTerm') {
        testValue = Math.max(1, testValue + i * 12);
      } else if (variable === 'loanAmount') {
        testValue = Math.max(10000, testValue + i * 10000);
      }
      
      values.push(testValue);
      
      // Calculate impact on monthly payment
      const monthlyRate = testValue / 12;
      const totalPayments = inputs.loanTerm * 12;
      const payment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      impacts.push(parseFloat(payment.toFixed(2)));
    }
    
    matrix.push({
      variable,
      values,
      impacts
    });
  }
  
  return matrix;
}

function generateScenarios(inputs: MortgagePaymentInputs): any[] {
  const scenarios = [
    {
      scenario: 'Base Case',
      probability: 0.5,
      payment: inputs.loanAmount * (inputs.interestRate / 12),
      totalInterest: (inputs.loanAmount * (inputs.interestRate / 12) * inputs.loanTerm * 12) - inputs.loanAmount
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      payment: inputs.loanAmount * ((inputs.interestRate - 0.01) / 12),
      totalInterest: (inputs.loanAmount * ((inputs.interestRate - 0.01) / 12) * inputs.loanTerm * 12) - inputs.loanAmount
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      payment: inputs.loanAmount * ((inputs.interestRate + 0.01) / 12),
      totalInterest: (inputs.loanAmount * ((inputs.interestRate + 0.01) / 12) * inputs.loanTerm * 12) - inputs.loanAmount
    }
  ];
  
  return scenarios;
}

function generateComparisonAnalysis(inputs: MortgagePaymentInputs): any[] {
  const analysis = [
    {
      metric: 'Monthly Payment',
      current: inputs.loanAmount * (inputs.interestRate / 12),
      alternative: inputs.loanAmount * ((inputs.interestRate - 0.005) / 12),
      difference: inputs.loanAmount * (0.005 / 12)
    },
    {
      metric: 'Total Interest',
      current: (inputs.loanAmount * (inputs.interestRate / 12) * inputs.loanTerm * 12) - inputs.loanAmount,
      alternative: (inputs.loanAmount * ((inputs.interestRate - 0.005) / 12) * inputs.loanTerm * 12) - inputs.loanAmount,
      difference: inputs.loanAmount * (0.005 / 12) * inputs.loanTerm * 12
    }
  ];
  
  return analysis;
}

function generateAnalysis(inputs: MortgagePaymentInputs, metrics: any): any {
  return {
    paymentRating: getPaymentRating(metrics.monthlyPayment, inputs.borrowerIncome),
    affordabilityRating: getAffordabilityRating(metrics.monthlyPayment, inputs.borrowerIncome),
    recommendation: getRecommendation(metrics.riskScore, metrics.probabilityOfDefault),
    keyStrengths: getKeyStrengths(inputs, metrics),
    keyWeaknesses: getKeyWeaknesses(inputs, metrics),
    riskFactors: getRiskFactors(inputs, metrics),
    opportunities: getOpportunities(inputs, metrics),
    paymentSummary: `Monthly payment of $${metrics.monthlyPayment.toFixed(2)} with ${inputs.loanTerm}-year term`,
    affordabilityAnalysis: `Payment represents ${((metrics.monthlyPayment * 12) / inputs.borrowerIncome * 100).toFixed(1)}% of annual income`,
    cashFlowAnalysis: `Monthly cash flow of $${(inputs.borrowerIncome / 12 - metrics.monthlyPayment).toFixed(2)}`,
    costSummary: `Total interest of $${metrics.totalInterestPaid.toFixed(2)} over ${inputs.loanTerm} years`,
    interestAnalysis: `Effective interest rate of ${(metrics.effectiveInterestRate * 100).toFixed(2)}%`,
    totalCostAnalysis: `Total cost of $${(inputs.loanAmount + metrics.totalInterestPaid).toFixed(2)}`,
    armSummary: inputs.paymentType === 'arm' ? 'ARM loan with rate adjustment risk' : 'Fixed rate loan',
    rateRiskAnalysis: inputs.paymentType === 'arm' ? `Potential rate increase of ${(metrics.interestRateRisk * 100).toFixed(1)}%` : 'No rate risk',
    paymentShockAnalysis: inputs.paymentType === 'arm' ? `Potential payment increase of ${(metrics.paymentShockRisk * 100).toFixed(1)}%` : 'No payment shock risk',
    equitySummary: `Current equity of $${(inputs.propertyValue - inputs.loanAmount).toFixed(2)} (${((inputs.propertyValue - inputs.loanAmount) / inputs.propertyValue * 100).toFixed(1)}%)`,
    equityGrowthAnalysis: `Equity will grow as principal is paid down`,
    ltvAnalysis: `Current LTV of ${(inputs.loanAmount / inputs.propertyValue * 100).toFixed(1)}%`,
    riskAssessment: `Risk score of ${metrics.riskScore}/10`,
    paymentRisk: `Probability of default: ${(metrics.probabilityOfDefault * 100).toFixed(1)}%`,
    interestRateRisk: inputs.paymentType === 'arm' ? `Interest rate risk: ${(metrics.interestRateRisk * 100).toFixed(1)}%` : 'No interest rate risk',
    marketRisk: `Market condition: ${inputs.marketCondition}`,
    marketAnalysis: `Property located in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions`,
    competitiveAnalysis: `Competitive analysis based on market conditions`,
    marketPosition: `Market position analysis based on property type and location`,
    paymentRecommendations: getPaymentRecommendations(inputs, metrics),
    optimizationSuggestions: getOptimizationSuggestions(inputs, metrics),
    riskMitigation: getRiskMitigation(inputs, metrics),
    implementationPlan: 'Implementation plan for mortgage payment optimization',
    nextSteps: ['Review payment options', 'Consider refinancing opportunities', 'Monitor market conditions'],
    timeline: 'Timeline for implementation and monitoring',
    monitoringPlan: 'Plan for ongoing monitoring of payment performance',
    keyMetrics: ['Monthly payment', 'Total interest', 'Equity position', 'Risk score'],
    reviewSchedule: 'Quarterly review of payment performance and market conditions',
    riskManagement: 'Risk management strategies for payment optimization',
    mitigationStrategies: ['Diversify income sources', 'Maintain emergency fund', 'Monitor market conditions'],
    contingencyPlans: ['Refinancing options', 'Payment modification programs', 'Emergency assistance programs'],
    performanceBenchmarks: [
      { metric: 'Monthly Payment', target: metrics.monthlyPayment, benchmark: metrics.monthlyPayment * 1.1, industry: 'Industry Average' },
      { metric: 'Total Interest', target: metrics.totalInterestPaid, benchmark: metrics.totalInterestPaid * 1.05, industry: 'Industry Average' }
    ],
    decisionRecommendation: getDecisionRecommendation(metrics.riskScore, metrics.probabilityOfDefault),
    presentationPoints: ['Payment affordability', 'Total cost analysis', 'Risk assessment', 'Market position'],
    decisionFactors: ['Interest rate', 'Loan term', 'Property value', 'Borrower qualifications']
  };
}

function getPaymentRating(payment: number, income: number): string {
  const ratio = (payment * 12) / income;
  if (ratio < 0.25) return 'Excellent';
  if (ratio < 0.30) return 'Good';
  if (ratio < 0.35) return 'Average';
  if (ratio < 0.40) return 'Poor';
  return 'Very Poor';
}

function getAffordabilityRating(payment: number, income: number): string {
  const ratio = (payment * 12) / income;
  if (ratio < 0.25) return 'Very Affordable';
  if (ratio < 0.30) return 'Affordable';
  if (ratio < 0.35) return 'Moderate';
  if (ratio < 0.40) return 'Expensive';
  return 'Very Expensive';
}

function getRecommendation(riskScore: number, defaultProbability: number): string {
  if (riskScore <= 3 && defaultProbability <= 0.05) return 'Proceed';
  if (riskScore <= 5 && defaultProbability <= 0.10) return 'Consider';
  if (riskScore <= 7 && defaultProbability <= 0.15) return 'Reconsider';
  return 'Requires Review';
}

function getKeyStrengths(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const strengths = [];
  if (inputs.borrowerCreditScore >= 720) strengths.push('Excellent credit score');
  if (inputs.borrowerDebtToIncomeRatio <= 0.28) strengths.push('Low debt-to-income ratio');
  if (inputs.loanAmount / inputs.propertyValue <= 0.8) strengths.push('Low loan-to-value ratio');
  if (inputs.marketCondition === 'growing') strengths.push('Growing market conditions');
  return strengths;
}

function getKeyWeaknesses(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const weaknesses = [];
  if (inputs.borrowerCreditScore < 680) weaknesses.push('Credit score below optimal range');
  if (inputs.borrowerDebtToIncomeRatio > 0.36) weaknesses.push('High debt-to-income ratio');
  if (inputs.loanAmount / inputs.propertyValue > 0.9) weaknesses.push('High loan-to-value ratio');
  if (inputs.marketCondition === 'declining') weaknesses.push('Declining market conditions');
  return weaknesses;
}

function getRiskFactors(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const risks = [];
  if (inputs.paymentType === 'arm') risks.push('Adjustable rate mortgage risk');
  if (inputs.borrowerEmploymentType === 'self_employed') risks.push('Self-employed income risk');
  if (inputs.propertyType === 'commercial') risks.push('Commercial property risk');
  if (metrics.riskScore > 5) risks.push('High overall risk score');
  return risks;
}

function getOpportunities(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const opportunities = [];
  if (inputs.marketCondition === 'growing') opportunities.push('Market appreciation potential');
  if (inputs.interestRate > 0.05) opportunities.push('Refinancing opportunity when rates drop');
  if (inputs.borrowerCreditScore >= 720) opportunities.push('Access to better loan terms');
  return opportunities;
}

function getPaymentRecommendations(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const recommendations = [];
  if (metrics.monthlyPayment > inputs.borrowerIncome * 0.3 / 12) {
    recommendations.push('Consider reducing loan amount or extending term');
  }
  if (inputs.paymentType === 'arm' && metrics.paymentShockRisk > 0.2) {
    recommendations.push('Consider fixed-rate alternative');
  }
  if (metrics.riskScore > 5) {
    recommendations.push('Improve credit score and reduce debt-to-income ratio');
  }
  return recommendations;
}

function getOptimizationSuggestions(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const suggestions = [];
  if (inputs.discountPoints > 0) {
    suggestions.push('Consider paying discount points to reduce interest rate');
  }
  if (inputs.paymentFrequency === 'monthly') {
    suggestions.push('Consider biweekly payments to reduce total interest');
  }
  if (inputs.loanType === 'conventional' && inputs.loanAmount / inputs.propertyValue > 0.8) {
    suggestions.push('Consider FHA loan for lower down payment');
  }
  return suggestions;
}

function getRiskMitigation(inputs: MortgagePaymentInputs, metrics: any): string[] {
  const mitigation = [];
  if (inputs.paymentType === 'arm') {
    mitigation.push('Monitor interest rate changes');
    mitigation.push('Prepare for potential payment increases');
  }
  if (metrics.riskScore > 5) {
    mitigation.push('Maintain emergency fund');
    mitigation.push('Consider payment protection insurance');
  }
  if (inputs.marketCondition === 'declining') {
    mitigation.push('Monitor property value changes');
    mitigation.push('Consider refinancing options');
  }
  return mitigation;
}

function getDecisionRecommendation(riskScore: number, defaultProbability: number): string {
  if (riskScore <= 3 && defaultProbability <= 0.05) {
    return 'Proceed with confidence - low risk profile';
  }
  if (riskScore <= 5 && defaultProbability <= 0.10) {
    return 'Proceed with caution - moderate risk profile';
  }
  if (riskScore <= 7 && defaultProbability <= 0.15) {
    return 'Reconsider - high risk profile';
  }
  return 'Requires review - very high risk profile';
}
