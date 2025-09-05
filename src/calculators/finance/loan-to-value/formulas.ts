import { LoanToValueInputs, LoanToValueMetrics } from './types';

export function calculateLoanToValueMetrics(inputs: LoanToValueInputs): LoanToValueMetrics {
  // LTV Analysis
  const loanToValueRatio = inputs.loanAmount / inputs.propertyValue;
  const combinedLtvRatio = calculateCombinedLTV(inputs);
  const effectiveLtvRatio = calculateEffectiveLTV(inputs);
  const equityPosition = inputs.propertyValue - inputs.loanAmount;
  const equityPercentage = equityPosition / inputs.propertyValue;
  
  // Loan Analysis
  const loanPercentage = (inputs.loanAmount / inputs.propertyValue) * 100;
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const totalPayments = monthlyPayment * inputs.loanTerm;
  const totalInterestPaid = totalPayments - inputs.loanAmount;
  
  // Cost Analysis
  const totalCost = calculateTotalCost(inputs);
  const costOfCredit = calculateCostOfCredit(inputs);
  const effectiveInterestRate = calculateEffectiveInterestRate(inputs);
  
  // Risk Metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs, riskScore);
  const lossGivenDefault = calculateLossGivenDefault(inputs);
  const expectedLoss = calculateExpectedLoss(inputs, probabilityOfDefault, lossGivenDefault);
  
  // Insurance Analysis
  const pmiRequired = calculatePMIRequired(inputs);
  const pmiCost = calculatePMICost(inputs, pmiRequired);
  const pmiDuration = calculatePMIDuration(inputs, pmiRequired);
  const totalInsuranceCost = calculateTotalInsuranceCost(inputs, pmiCost);
  
  // Cash Flow Analysis
  const monthlyCashFlow = calculateMonthlyCashFlow(inputs, monthlyPayment);
  const annualCashFlow = monthlyCashFlow * 12;
  const breakEvenPoint = calculateBreakEvenPoint(inputs, monthlyCashFlow);
  
  // Sensitivity Analysis
  const sensitivityMatrix = calculateSensitivityMatrix(inputs);
  
  // Scenario Analysis
  const scenarios = calculateScenarios(inputs);
  
  // Valuation Analysis
  const valuationBreakdown = calculateValuationBreakdown(inputs);
  
  // Market Analysis
  const marketPosition = calculateMarketPosition(inputs);
  const comparableAnalysis = calculateComparableAnalysis(inputs);
  
  return {
    loanToValueRatio,
    combinedLtvRatio,
    effectiveLtvRatio,
    equityPosition,
    equityPercentage,
    loanAmount: inputs.loanAmount,
    loanPercentage,
    monthlyPayment,
    totalPayments,
    totalInterestPaid,
    totalCost,
    costOfCredit,
    effectiveInterestRate,
    riskScore,
    probabilityOfDefault,
    lossGivenDefault,
    expectedLoss,
    pmiRequired,
    pmiCost,
    pmiDuration,
    totalInsuranceCost,
    monthlyCashFlow,
    annualCashFlow,
    breakEvenPoint,
    sensitivityMatrix,
    scenarios,
    valuationBreakdown,
    marketPosition,
    comparableAnalysis
  };
}

function calculateCombinedLTV(inputs: LoanToValueInputs): number {
  // Combined LTV includes additional liens or loans
  const additionalLiens = inputs.additionalCollateral || 0;
  return (inputs.loanAmount + additionalLiens) / inputs.propertyValue;
}

function calculateEffectiveLTV(inputs: LoanToValueInputs): number {
  // Effective LTV considers closing costs and prepaid items
  const closingCosts = inputs.loanAmount * 0.02; // Estimate 2% closing costs
  const prepaidItems = inputs.propertyInsurance + inputs.propertyTaxes / 12; // Monthly insurance and taxes
  const effectiveLoanAmount = inputs.loanAmount + closingCosts + prepaidItems;
  return effectiveLoanAmount / inputs.propertyValue;
}

function calculateMonthlyPayment(inputs: LoanToValueInputs): number {
  if (inputs.paymentType === 'interest_only') {
    return inputs.loanAmount * inputs.interestRate / 12;
  } else if (inputs.paymentType === 'balloon') {
    // Interest-only with balloon payment
    return inputs.loanAmount * inputs.interestRate / 12;
  } else if (inputs.paymentType === 'arm') {
    // Adjustable rate mortgage - use current rate
    return calculateFixedPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  } else {
    // Principal and interest payment
    return calculateFixedPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
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

function calculateTotalCost(inputs: LoanToValueInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const totalPayments = monthlyPayment * inputs.loanTerm;
  const closingCosts = inputs.loanAmount * 0.02; // Estimate 2% closing costs
  const insuranceCosts = (inputs.propertyInsurance + inputs.propertyTaxes + inputs.hoaFees + inputs.floodInsurance) * (inputs.loanTerm / 12);
  const pmiCost = calculatePMICost(inputs, calculatePMIRequired(inputs)) * (inputs.loanTerm / 12);
  
  return totalPayments + closingCosts + insuranceCosts + pmiCost;
}

function calculateCostOfCredit(inputs: LoanToValueInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const totalPayments = monthlyPayment * inputs.loanTerm;
  const closingCosts = inputs.loanAmount * 0.02; // Estimate 2% closing costs
  const pmiCost = calculatePMICost(inputs, calculatePMIRequired(inputs)) * (inputs.loanTerm / 12);
  
  return totalPayments - inputs.loanAmount + closingCosts + pmiCost;
}

function calculateEffectiveInterestRate(inputs: LoanToValueInputs): number {
  const costOfCredit = calculateCostOfCredit(inputs);
  const averageLoanBalance = inputs.loanAmount / 2; // Simplified calculation
  return costOfCredit / (averageLoanBalance * (inputs.loanTerm / 12));
}

function calculateRiskScore(inputs: LoanToValueInputs): number {
  let riskScore = 0;
  
  // LTV Risk (0-0.3)
  const ltvRatio = inputs.loanAmount / inputs.propertyValue;
  if (ltvRatio <= 0.70) riskScore += 0.05;
  else if (ltvRatio <= 0.75) riskScore += 0.10;
  else if (ltvRatio <= 0.80) riskScore += 0.15;
  else if (ltvRatio <= 0.85) riskScore += 0.25;
  else riskScore += 0.30;
  
  // Borrower Risk (0-0.25)
  if (inputs.borrowerCreditScore >= 750) riskScore += 0.00;
  else if (inputs.borrowerCreditScore >= 700) riskScore += 0.05;
  else if (inputs.borrowerCreditScore >= 650) riskScore += 0.10;
  else if (inputs.borrowerCreditScore >= 600) riskScore += 0.15;
  else riskScore += 0.20;
  
  if (inputs.borrowerDebtToIncomeRatio <= 0.35) riskScore += 0.00;
  else if (inputs.borrowerDebtToIncomeRatio <= 0.40) riskScore += 0.05;
  else if (inputs.borrowerDebtToIncomeRatio <= 0.45) riskScore += 0.10;
  else if (inputs.borrowerDebtToIncomeRatio <= 0.50) riskScore += 0.15;
  else riskScore += 0.20;
  
  // Market Risk (0-0.2)
  if (inputs.marketCondition === 'hot') riskScore += 0.05;
  else if (inputs.marketCondition === 'growing') riskScore += 0.10;
  else if (inputs.marketCondition === 'stable') riskScore += 0.15;
  else riskScore += 0.20;
  
  // Property Risk (0-0.15)
  if (inputs.propertyCondition === 'excellent') riskScore += 0.05;
  else if (inputs.propertyCondition === 'good') riskScore += 0.08;
  else if (inputs.propertyCondition === 'average') riskScore += 0.10;
  else if (inputs.propertyCondition === 'poor') riskScore += 0.12;
  else riskScore += 0.15;
  
  // Loan Risk (0-0.1)
  if (inputs.loanType === 'conventional') riskScore += 0.05;
  else if (inputs.loanType === 'fha' || inputs.loanType === 'va') riskScore += 0.08;
  else riskScore += 0.10;
  
  return Math.min(riskScore, 1.0);
}

function calculateProbabilityOfDefault(inputs: LoanToValueInputs, riskScore: number): number {
  let baseProbability = 0.05;
  
  // Adjust based on risk factors
  if (inputs.borrowerCreditScore < 650) baseProbability += 0.10;
  else if (inputs.borrowerCreditScore < 700) baseProbability += 0.05;
  
  if (inputs.borrowerDebtToIncomeRatio > 0.45) baseProbability += 0.10;
  else if (inputs.borrowerDebtToIncomeRatio > 0.40) baseProbability += 0.05;
  
  if (inputs.marketCondition === 'declining') baseProbability += 0.10;
  
  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_repair') baseProbability += 0.05;
  
  // Adjust based on overall risk score
  baseProbability += (riskScore * 0.2);
  
  return Math.max(0.01, Math.min(0.5, baseProbability));
}

function calculateLossGivenDefault(inputs: LoanToValueInputs): number {
  // Assume 30% loss severity in default
  return 0.30;
}

function calculateExpectedLoss(inputs: LoanToValueInputs, probabilityOfDefault: number, lossGivenDefault: number): number {
  return inputs.loanAmount * probabilityOfDefault * lossGivenDefault;
}

function calculatePMIRequired(inputs: LoanToValueInputs): boolean {
  const ltvRatio = inputs.loanAmount / inputs.propertyValue;
  return ltvRatio > inputs.pmiThreshold;
}

function calculatePMICost(inputs: LoanToValueInputs, pmiRequired: boolean): number {
  if (!pmiRequired) return 0;
  return inputs.loanAmount * inputs.pmiRate;
}

function calculatePMIDuration(inputs: LoanToValueInputs, pmiRequired: boolean): number {
  if (!pmiRequired) return 0;
  
  // Calculate how long until LTV reaches 80%
  const targetLTV = 0.80;
  const currentLTV = inputs.loanAmount / inputs.propertyValue;
  
  if (currentLTV <= targetLTV) return 0;
  
  // Simplified calculation - assumes 2% annual appreciation
  const annualAppreciation = 0.02;
  const ltvReductionPerYear = annualAppreciation;
  const yearsToTarget = (currentLTV - targetLTV) / ltvReductionPerYear;
  
  return Math.max(0, yearsToTarget);
}

function calculateTotalInsuranceCost(inputs: LoanToValueInputs, pmiCost: number): number {
  return inputs.propertyInsurance + inputs.propertyTaxes + inputs.hoaFees + inputs.floodInsurance + pmiCost;
}

function calculateMonthlyCashFlow(inputs: LoanToValueInputs, monthlyPayment: number): number {
  const monthlyInsurance = inputs.propertyInsurance / 12;
  const monthlyTaxes = inputs.propertyTaxes / 12;
  const monthlyHOA = inputs.hoaFees / 12;
  const monthlyFlood = inputs.floodInsurance / 12;
  const monthlyPMI = calculatePMICost(inputs, calculatePMIRequired(inputs)) / 12;
  
  const totalMonthlyCosts = monthlyPayment + monthlyInsurance + monthlyTaxes + monthlyHOA + monthlyFlood + monthlyPMI;
  
  // Assume rental income or other income sources
  const monthlyIncome = inputs.borrowerIncome / 12;
  
  return monthlyIncome - totalMonthlyCosts;
}

function calculateBreakEvenPoint(inputs: LoanToValueInputs, monthlyCashFlow: number): number {
  if (monthlyCashFlow <= 0) return Infinity;
  
  const totalCost = calculateTotalCost(inputs);
  return totalCost / monthlyCashFlow;
}

function calculateSensitivityMatrix(inputs: LoanToValueInputs) {
  const variables = [
    { name: 'Interest Rate', base: inputs.interestRate, range: [-0.02, -0.01, 0.01, 0.02] },
    { name: 'Property Value', base: inputs.propertyValue, range: [-0.1, -0.05, 0.05, 0.1] },
    { name: 'Loan Amount', base: inputs.loanAmount, range: [-0.05, -0.02, 0.02, 0.05] },
    { name: 'Property Appreciation', base: inputs.propertyAppreciationRate, range: [-0.02, -0.01, 0.01, 0.02] }
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      let adjustedInputs = { ...inputs };
      
      if (variable.name === 'Interest Rate') {
        adjustedInputs.interestRate = inputs.interestRate + change;
      } else if (variable.name === 'Property Value') {
        adjustedInputs.propertyValue = inputs.propertyValue * (1 + change);
      } else if (variable.name === 'Loan Amount') {
        adjustedInputs.loanAmount = inputs.loanAmount * (1 + change);
      } else if (variable.name === 'Property Appreciation') {
        adjustedInputs.propertyAppreciationRate = inputs.propertyAppreciationRate + change;
      }
      
      const adjustedMetrics = calculateLoanToValueMetrics(adjustedInputs);
      return adjustedMetrics.loanToValueRatio;
    });
    
    return {
      variable: variable.name,
      values: variable.range,
      impacts
    };
  });
}

function calculateScenarios(inputs: LoanToValueInputs) {
  const scenarios = [
    {
      scenario: 'Base Case',
      probability: 0.5,
      ltvRatio: inputs.loanAmount / inputs.propertyValue,
      risk: 'Current'
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      ltvRatio: inputs.loanAmount / (inputs.propertyValue * 1.1),
      risk: 'Lower'
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      ltvRatio: inputs.loanAmount / (inputs.propertyValue * 0.9),
      risk: 'Higher'
    }
  ];
  
  return scenarios;
}

function calculateValuationBreakdown(inputs: LoanToValueInputs) {
  const breakdown = [
    { method: 'Purchase Price', value: inputs.purchasePrice, weight: 0.3 },
    { method: 'Appraisal Value', value: inputs.appraisalValue, weight: 0.4 },
    { method: 'Market Value', value: inputs.marketValue, weight: 0.2 },
    { method: 'Assessed Value', value: inputs.assessedValue, weight: 0.1 }
  ];
  
  return breakdown;
}

function calculateMarketPosition(inputs: LoanToValueInputs): string {
  const ltvRatio = inputs.loanAmount / inputs.propertyValue;
  
  if (ltvRatio <= 0.70) return 'Conservative';
  if (ltvRatio <= 0.75) return 'Moderate';
  if (ltvRatio <= 0.80) return 'Standard';
  if (ltvRatio <= 0.85) return 'Aggressive';
  return 'High Risk';
}

function calculateComparableAnalysis(inputs: LoanToValueInputs) {
  const analysis = [
    {
      metric: 'LTV Ratio',
      subject: inputs.loanAmount / inputs.propertyValue,
      comparable: 0.75, // Industry average
      difference: (inputs.loanAmount / inputs.propertyValue) - 0.75
    },
    {
      metric: 'Down Payment %',
      subject: inputs.downPaymentPercentage,
      comparable: 0.20, // Industry average
      difference: inputs.downPaymentPercentage - 0.20
    },
    {
      metric: 'Credit Score',
      subject: inputs.borrowerCreditScore,
      comparable: 720, // Industry average
      difference: inputs.borrowerCreditScore - 720
    }
  ];
  
  return analysis;
}