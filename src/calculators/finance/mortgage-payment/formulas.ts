import { MortgagePaymentInputs, MortgagePaymentMetrics, MortgagePaymentAnalysis } from './types';

export function calculateMonthlyPayment(inputs: MortgagePaymentInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  if (inputs.paymentType === 'interest_only') {
    return inputs.loanAmount * monthlyRate;
  }

  if (inputs.paymentType === 'balloon') {
    // Simplified balloon calculation
    const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
  }

  // Standard principal and interest calculation
  return inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculatePrincipalPayment(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const monthlyRate = inputs.interestRate / 100 / 12;

  if (inputs.paymentType === 'interest_only') {
    return 0;
  }

  // First month principal payment
  return monthlyPayment - (inputs.loanAmount * monthlyRate);
}

export function calculateInterestPayment(inputs: MortgagePaymentInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  return inputs.loanAmount * monthlyRate;
}

export function calculateTotalPayment(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  return monthlyPayment + inputs.propertyTaxes / 12 + inputs.propertyInsurance / 12 +
         inputs.hoaFees + inputs.floodInsurance / 12 + inputs.mortgageInsurance / 12;
}

export function calculateTotalPayments(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  return monthlyPayment * inputs.loanTerm * 12;
}

export function calculateTotalInterestPaid(inputs: MortgagePaymentInputs): number {
  const totalPayments = calculateTotalPayments(inputs);
  return totalPayments - inputs.loanAmount;
}

export function calculateTotalPrincipalPaid(inputs: MortgagePaymentInputs): number {
  return inputs.loanAmount;
}

export function calculateEffectiveInterestRate(inputs: MortgagePaymentInputs): number {
  // Simplified calculation - in practice this would be more complex
  return inputs.interestRate;
}

export function calculateAmortizationSchedule(inputs: MortgagePaymentInputs): Array<{
  paymentNumber: number;
  paymentDate: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  equity: number;
}> {
  const schedule = [];
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const monthlyRate = inputs.interestRate / 100 / 12;
  let balance = inputs.loanAmount;
  let paymentDate = new Date(inputs.firstPaymentDate || '2024-01-01');

  for (let i = 1; i <= inputs.loanTerm * 12; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    schedule.push({
      paymentNumber: i,
      paymentDate: paymentDate.toISOString().split('T')[0],
      payment: monthlyPayment,
      principal: principal,
      interest: interest,
      balance: Math.max(0, balance),
      equity: inputs.propertyValue - Math.max(0, balance)
    });

    // Increment payment date
    paymentDate.setMonth(paymentDate.getMonth() + 1);
  }

  return schedule;
}

export function calculateARMSchedule(inputs: MortgagePaymentInputs): Array<{
  period: number;
  startDate: string;
  endDate: string;
  rate: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  if (inputs.paymentType !== 'arm') {
    return [];
  }

  const schedule = [];
  let currentRate = inputs.interestRate;
  let balance = inputs.loanAmount;
  let periodStart = new Date(inputs.firstPaymentDate || '2024-01-01');

  for (let period = 1; period <= inputs.loanTerm; period++) {
    const periodEnd = new Date(periodStart);
    periodEnd.setFullYear(periodEnd.getFullYear() + 1);

    // Adjust rate for ARM
    if (period > inputs.initialFixedPeriod) {
      const adjustment = Math.min(inputs.lifetimeCap - inputs.interestRate,
                                 (inputs.indexRate + inputs.margin - currentRate));
      currentRate = Math.max(inputs.floorRate, currentRate + adjustment);
    }

    const monthlyRate = currentRate / 100 / 12;
    const monthlyPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, (inputs.loanTerm - period + 1) * 12)) /
                          (Math.pow(1 + monthlyRate, (inputs.loanTerm - period + 1) * 12) - 1);

    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    schedule.push({
      period,
      startDate: periodStart.toISOString().split('T')[0],
      endDate: periodEnd.toISOString().split('T')[0],
      rate: currentRate,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance)
    });

    periodStart = periodEnd;
  }

  return schedule;
}

export function calculateBreakEvenPoint(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateTotalPayment(inputs);
  const monthlyIncome = inputs.borrowerIncome / 12;
  return (monthlyPayment / monthlyIncome) * 100;
}

export function calculateBreakEvenMonths(inputs: MortgagePaymentInputs): number {
  const totalCost = calculateTotalPayments(inputs);
  const monthlySavings = inputs.borrowerIncome / 12 - calculateTotalPayment(inputs);
  return totalCost / monthlySavings;
}

export function calculateBreakEvenYears(inputs: MortgagePaymentInputs): number {
  return calculateBreakEvenMonths(inputs) / 12;
}

export function calculateEquityPosition(inputs: MortgagePaymentInputs): number {
  return inputs.propertyValue - inputs.loanAmount;
}

export function calculateEquityPercentage(inputs: MortgagePaymentInputs): number {
  return ((inputs.propertyValue - inputs.loanAmount) / inputs.propertyValue) * 100;
}

export function calculateLoanToValueRatio(inputs: MortgagePaymentInputs): number {
  return (inputs.loanAmount / inputs.propertyValue) * 100;
}

export function calculateMonthlyCashFlow(inputs: MortgagePaymentInputs): number {
  // Assuming rental income for investment properties
  const monthlyIncome = inputs.borrowerIncome / 12;
  const monthlyExpenses = calculateTotalPayment(inputs);
  return monthlyIncome - monthlyExpenses;
}

export function calculateAnnualCashFlow(inputs: MortgagePaymentInputs): number {
  return calculateMonthlyCashFlow(inputs) * 12;
}

export function calculateTotalCashFlow(inputs: MortgagePaymentInputs): number {
  return calculateAnnualCashFlow(inputs) * inputs.loanTerm;
}

export function calculateSensitivityMatrix(inputs: MortgagePaymentInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];
  const basePayment = calculateMonthlyPayment(inputs);

  // Interest rate sensitivity
  const rateValues = [inputs.interestRate - 1, inputs.interestRate, inputs.interestRate + 1];
  const rateImpacts = rateValues.map(rate => {
    const testInputs = { ...inputs, interestRate: rate };
    return calculateMonthlyPayment(testInputs) - basePayment;
  });

  matrix.push({
    variable: 'Interest Rate',
    values: rateValues,
    impacts: rateImpacts
  });

  // Loan term sensitivity
  const termValues = [inputs.loanTerm - 5, inputs.loanTerm, inputs.loanTerm + 5];
  const termImpacts = termValues.map(term => {
    const testInputs = { ...inputs, loanTerm: term };
    return calculateMonthlyPayment(testInputs) - basePayment;
  });

  matrix.push({
    variable: 'Loan Term',
    values: termValues,
    impacts: termImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: MortgagePaymentInputs): Array<{
  scenario: string;
  probability: number;
  payment: number;
  totalInterest: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.5,
    payment: calculateMonthlyPayment(inputs),
    totalInterest: calculateTotalInterestPaid(inputs)
  });

  // Rate increase scenario
  const rateIncreaseInputs = { ...inputs, interestRate: inputs.interestRate + 1 };
  scenarios.push({
    scenario: 'Rate +1%',
    probability: 0.25,
    payment: calculateMonthlyPayment(rateIncreaseInputs),
    totalInterest: calculateTotalInterestPaid(rateIncreaseInputs)
  });

  // Rate decrease scenario
  const rateDecreaseInputs = { ...inputs, interestRate: Math.max(0, inputs.interestRate - 1) };
  scenarios.push({
    scenario: 'Rate -1%',
    probability: 0.25,
    payment: calculateMonthlyPayment(rateDecreaseInputs),
    totalInterest: calculateTotalInterestPaid(rateDecreaseInputs)
  });

  return scenarios;
}

export function calculateComparisonAnalysis(inputs: MortgagePaymentInputs): Array<{
  metric: string;
  current: number;
  alternative: number;
  difference: number;
}> {
  const analysis = [];

  // Compare with 15-year vs 30-year term
  const shortTermInputs = { ...inputs, loanTerm: 15 };
  analysis.push({
    metric: '15-year vs 30-year',
    current: calculateMonthlyPayment(inputs),
    alternative: calculateMonthlyPayment(shortTermInputs),
    difference: calculateMonthlyPayment(shortTermInputs) - calculateMonthlyPayment(inputs)
  });

  // Compare with different down payment
  const higherDownPayment = Math.min(inputs.propertyValue * 0.3, inputs.loanAmount + inputs.downPayment);
  const higherDownInputs = { ...inputs, loanAmount: inputs.loanAmount - (higherDownPayment - inputs.downPayment) };
  analysis.push({
    metric: '20% vs current down payment',
    current: calculateMonthlyPayment(inputs),
    alternative: calculateMonthlyPayment(higherDownInputs),
    difference: calculateMonthlyPayment(higherDownInputs) - calculateMonthlyPayment(inputs)
  });

  return analysis;
}

export function calculateRiskScore(inputs: MortgagePaymentInputs): number {
  let score = 0;

  // DTI ratio risk
  if (inputs.borrowerDebtToIncomeRatio > 43) score += 25;
  else if (inputs.borrowerDebtToIncomeRatio > 36) score += 15;

  // Credit score risk
  if (inputs.borrowerCreditScore < 620) score += 25;
  else if (inputs.borrowerCreditScore < 680) score += 15;

  // LTV ratio risk
  const ltv = calculateLoanToValueRatio(inputs);
  if (ltv > 90) score += 25;
  else if (ltv > 80) score += 15;

  // Market condition risk
  if (inputs.marketCondition === 'declining') score += 20;
  else if (inputs.marketCondition === 'hot') score += 10;

  return Math.min(100, score);
}

export function calculateProbabilityOfDefault(inputs: MortgagePaymentInputs): number {
  const riskScore = calculateRiskScore(inputs);
  return Math.min(0.5, riskScore / 200);
}

export function calculatePaymentShockRisk(inputs: MortgagePaymentInputs): number {
  if (inputs.paymentType !== 'arm') return 0;

  const currentPayment = calculateMonthlyPayment(inputs);
  const maxRate = inputs.interestRate + inputs.lifetimeCap - inputs.interestRate;
  const maxRateInputs = { ...inputs, interestRate: maxRate };
  const maxPayment = calculateMonthlyPayment(maxRateInputs);

  return ((maxPayment - currentPayment) / currentPayment) * 100;
}

export function calculateInterestRateRisk(inputs: MortgagePaymentInputs): number {
  // Simplified calculation
  return inputs.interestRate * 0.1;
}

export function generateMortgagePaymentAnalysis(inputs: MortgagePaymentInputs, metrics: MortgagePaymentMetrics): MortgagePaymentAnalysis {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const breakEvenPoint = calculateBreakEvenPoint(inputs);
  const riskScore = calculateRiskScore(inputs);

  let paymentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (breakEvenPoint < 25) paymentRating = 'Excellent';
  else if (breakEvenPoint < 30) paymentRating = 'Good';
  else if (breakEvenPoint < 35) paymentRating = 'Average';
  else if (breakEvenPoint < 40) paymentRating = 'Poor';
  else paymentRating = 'Very Poor';

  let affordabilityRating: 'Very Affordable' | 'Affordable' | 'Moderate' | 'Expensive' | 'Very Expensive';
  if (breakEvenPoint < 25) affordabilityRating = 'Very Affordable';
  else if (breakEvenPoint < 30) affordabilityRating = 'Affordable';
  else if (breakEvenPoint < 35) affordabilityRating = 'Moderate';
  else if (breakEvenPoint < 40) affordabilityRating = 'Expensive';
  else affordabilityRating = 'Very Expensive';

  const recommendation = riskScore < 30 ? 'Proceed' : riskScore < 60 ? 'Consider' : 'Requires Review';

  return {
    paymentRating,
    affordabilityRating,
    recommendation,
    keyStrengths: [
      `Monthly payment of $${monthlyPayment.toLocaleString()}`,
      `Break-even ratio of ${breakEvenPoint.toFixed(1)}%`,
      `Equity position of $${metrics.equityPosition.toLocaleString()}`
    ],
    keyWeaknesses: [
      riskScore > 50 ? 'High risk score requires attention' : 'Risk profile acceptable',
      breakEvenPoint > 35 ? 'Payment may be expensive relative to income' : 'Payment is affordable'
    ],
    riskFactors: [
      `Risk score: ${riskScore}`,
      `DTI ratio: ${inputs.borrowerDebtToIncomeRatio}%`,
      `LTV ratio: ${metrics.loanToValueRatio.toFixed(1)}%`
    ],
    opportunities: [
      'Potential for equity growth',
      'Tax deductions on interest',
      'Building credit through consistent payments'
    ],
    paymentSummary: `Monthly mortgage payment of $${monthlyPayment.toLocaleString()} with total cost of $${metrics.totalPayments.toLocaleString()} over ${inputs.loanTerm} years.`,
    affordabilityAnalysis: `Payment represents ${breakEvenPoint.toFixed(1)}% of monthly income, rated as ${affordabilityRating.toLowerCase()}.`,
    cashFlowAnalysis: `Monthly cash flow of $${metrics.monthlyCashFlow.toLocaleString()} provides ${metrics.monthlyCashFlow > 0 ? 'positive' : 'negative'} cash flow.`,
    costSummary: `Total interest paid of $${metrics.totalInterestPaid.toLocaleString()} with effective rate of ${metrics.effectiveInterestRate.toFixed(2)}%.`,
    interestAnalysis: `Interest payments total $${metrics.totalInterestPaid.toLocaleString()} over the life of the loan.`,
    totalCostAnalysis: `Total payments of $${metrics.totalPayments.toLocaleString()} for $${inputs.loanAmount.toLocaleString()} loan.`,
    armSummary: inputs.paymentType === 'arm' ? `ARM loan with ${inputs.initialFixedPeriod}-year fixed period and ${inputs.adjustmentPeriod}-year adjustments.` : 'Fixed-rate loan provides payment stability.',
    rateRiskAnalysis: inputs.paymentType === 'arm' ? `Interest rate risk of ${calculateInterestRateRisk(inputs).toFixed(2)}% with lifetime cap of ${inputs.lifetimeCap}%.` : 'Fixed-rate loan eliminates interest rate risk.',
    paymentShockAnalysis: inputs.paymentType === 'arm' ? `Payment shock risk of ${calculatePaymentShockRisk(inputs).toFixed(1)}% at maximum rate adjustment.` : 'Fixed-rate loan provides payment certainty.',
    equitySummary: `Current equity position of $${metrics.equityPosition.toLocaleString()} (${metrics.equityPercentage.toFixed(1)}% of property value).`,
    equityGrowthAnalysis: `Equity will grow through principal payments and property appreciation.`,
    ltvAnalysis: `Loan-to-value ratio of ${metrics.loanToValueRatio.toFixed(1)}% indicates ${metrics.loanToValueRatio < 80 ? 'strong' : 'moderate'} equity position.`,
    riskAssessment: `Overall risk score of ${riskScore} indicates ${riskScore < 30 ? 'low' : riskScore < 60 ? 'moderate' : 'high'} risk profile.`,
    paymentRisk: `Payment risk assessed as ${breakEvenPoint < 30 ? 'low' : breakEvenPoint < 40 ? 'moderate' : 'high'}.`,
    interestRateRisk: `Interest rate risk of ${calculateInterestRateRisk(inputs).toFixed(2)}% for ${inputs.paymentType === 'arm' ? 'ARM' : 'fixed-rate'} loan.`,
    marketRisk: `Market risk assessed as ${inputs.marketCondition} with ${inputs.marketGrowthRate}% growth rate.`,
    marketAnalysis: `Property located in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions.`,
    competitiveAnalysis: `Market analysis shows ${inputs.marketGrowthRate > 3 ? 'strong' : inputs.marketGrowthRate > 0 ? 'moderate' : 'weak'} growth potential.`,
    marketPosition: `Property positioned in ${inputs.marketCondition} market with ${inputs.marketGrowthRate}% annual growth rate.`,
    paymentRecommendations: [
      breakEvenPoint > 35 ? 'Consider larger down payment to reduce payment' : 'Payment structure is appropriate',
      inputs.paymentType === 'arm' ? 'Monitor interest rate changes for ARM loans' : 'Fixed-rate provides payment stability'
    ],
    optimizationSuggestions: [
      'Consider extra principal payments to reduce interest',
      'Explore refinancing opportunities as rates change',
      'Build emergency fund for payment stability'
    ],
    riskMitigation: [
      'Maintain adequate insurance coverage',
      'Monitor credit score and debt-to-income ratio',
      'Keep emergency fund for unexpected expenses'
    ],
    implementationPlan: `Loan payment of $${monthlyPayment.toLocaleString()} per month starting ${inputs.firstPaymentDate}.`,
    nextSteps: [
      'Review and sign loan documents',
      'Set up automatic payments',
      'Obtain homeowners insurance',
      'Establish escrow account'
    ],
    timeline: `${inputs.loanTerm} year loan term with monthly payments.`,
    monitoringPlan: 'Monthly payment monitoring with annual escrow analysis.',
    keyMetrics: [
      'Payment amount and due date',
      'Principal and interest breakdown',
      'Escrow balance and adjustments',
      'Property value changes'
    ],
    reviewSchedule: 'Annual loan review with potential refinance analysis.',
    riskManagement: `Risk management includes ${inputs.borrowerCreditScore > 740 ? 'excellent' : inputs.borrowerCreditScore > 680 ? 'good' : 'fair'} credit and ${inputs.borrowerDebtToIncomeRatio < 36 ? 'low' : 'moderate'} debt-to-income ratio.`,
    mitigationStrategies: [
      'Maintain steady employment',
      'Avoid new debt during loan term',
      'Keep property well-maintained',
      'Monitor market conditions'
    ],
    contingencyPlans: [
      'Emergency fund for unexpected expenses',
      'Disability and life insurance',
      'Loan modification options if needed',
      'Refinance options for rate reduction'
    ],
    performanceBenchmarks: [
      {
        metric: 'DTI Ratio',
        target: 36,
        benchmark: inputs.borrowerDebtToIncomeRatio,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'Credit Score',
        target: 740,
        benchmark: inputs.borrowerCreditScore,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'LTV Ratio',
        target: 80,
        benchmark: metrics.loanToValueRatio,
        industry: 'Mortgage Lending'
      }
    ],
    decisionRecommendation: `${recommendation} with loan application based on ${paymentRating.toLowerCase()} payment rating and ${affordabilityRating.toLowerCase()} affordability.`,
    presentationPoints: [
      `Monthly payment: $${monthlyPayment.toLocaleString()}`,
      `Break-even ratio: ${breakEvenPoint.toFixed(1)}%`,
      `Risk score: ${riskScore}`,
      `Equity position: $${metrics.equityPosition.toLocaleString()}`
    ],
    decisionFactors: [
      'Payment affordability analysis',
      'Risk assessment results',
      'Borrower qualification review',
      'Market condition evaluation',
      'Loan structure optimization'
    ]
  };
}