import { MortgageRateLockInputs, MortgageRateLockMetrics } from './types';

export function calculateMortgageRateLock(inputs: MortgageRateLockInputs): MortgageRateLockMetrics {
  // Calculate rate difference and savings
  const rateDifference = inputs.currentMarketRate - inputs.lockedRate;
  const rateSavings = rateDifference > 0 ? rateDifference : 0;
  
  // Calculate monthly payments
  const monthlyRate = inputs.lockedRate / 100 / 12;
  const currentMonthlyRate = inputs.currentMarketRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;
  
  const lockedPayment = calculateMonthlyPayment(inputs.loanAmount, monthlyRate, numPayments);
  const currentPayment = calculateMonthlyPayment(inputs.loanAmount, currentMonthlyRate, numPayments);
  
  const paymentDifference = currentPayment - lockedPayment;
  const paymentSavings = paymentDifference > 0 ? paymentDifference : 0;
  
  // Calculate total interest
  const totalInterestPaid = (lockedPayment * numPayments) - inputs.loanAmount;
  const currentTotalInterest = (currentPayment * numPayments) - inputs.loanAmount;
  const interestSavings = currentTotalInterest - totalInterestPaid;
  
  // Calculate lock costs
  const lockCost = calculateLockCost(inputs);
  const netSavings = interestSavings - lockCost;
  
  // Calculate time analysis
  const lockRemainingDays = calculateRemainingDays(inputs.lockExpirationDate);
  const lockExpirationRisk = calculateExpirationRisk(lockRemainingDays, inputs.closingDelay);
  const extensionCost = calculateExtensionCost(inputs, lockRemainingDays);
  
  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs, rateDifference, lockRemainingDays);
  const probabilityOfExpiration = calculateExpirationProbability(lockRemainingDays, inputs.closingDelay);
  const probabilityOfRateIncrease = calculateRateIncreaseProbability(inputs);
  const probabilityOfRateDecrease = calculateRateDecreaseProbability(inputs);
  
  // Calculate lock value
  const lockValue = calculateLockValue(interestSavings, lockCost, inputs.analysisPeriod);
  const lockValuePerDay = lockValue / Math.max(lockRemainingDays, 1);
  const lockValuePerMonth = lockValuePerDay * 30;
  const lockValuePerYear = lockValuePerMonth * 12;
  
  // Calculate break-even point
  const breakEvenPoint = calculateBreakEvenPoint(inputs, rateDifference);
  
  // Generate sensitivity analysis
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  
  // Generate scenarios
  const scenarios = generateScenarios(inputs, rateDifference);
  
  // Generate timeline analysis
  const timelineAnalysis = generateTimelineAnalysis(inputs, lockRemainingDays);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, lockedPayment, currentPayment);
  
  // Generate break-even analysis
  const breakEvenAnalysis = generateBreakEvenAnalysis(inputs, rateDifference);
  
  return {
    rateDifference,
    rateSavings,
    rateRisk: Math.abs(rateDifference),
    effectiveRate: inputs.lockedRate,
    lockedPayment,
    currentPayment,
    paymentDifference,
    paymentSavings,
    totalInterestPaid,
    interestSavings,
    lockCost,
    netSavings,
    lockRemainingDays,
    lockExpirationRisk,
    extensionCost,
    breakEvenPoint,
    riskScore,
    probabilityOfExpiration,
    probabilityOfRateIncrease,
    probabilityOfRateDecrease,
    lockValue,
    lockValuePerDay,
    lockValuePerMonth,
    lockValuePerYear,
    sensitivityMatrix,
    scenarios,
    timelineAnalysis,
    comparisonAnalysis,
    breakEvenAnalysis
  };
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, numPayments: number): number {
  if (monthlyRate === 0) {
    return principal / numPayments;
  }
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateLockCost(inputs: MortgageRateLockInputs): number {
  let cost = 0;
  
  if (inputs.lockFeeType === 'percentage') {
    cost = inputs.loanAmount * (inputs.lockFee / 100);
  } else if (inputs.lockFeeType === 'fixed') {
    cost = inputs.lockFee;
  }
  
  return cost;
}

function calculateRemainingDays(expirationDate: string): number {
  const expiration = new Date(expirationDate);
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function calculateExpirationRisk(remainingDays: number, closingDelay: number): number {
  if (remainingDays <= 0) return 100;
  if (remainingDays <= closingDelay) return 90;
  if (remainingDays <= closingDelay * 1.5) return 70;
  if (remainingDays <= closingDelay * 2) return 50;
  if (remainingDays <= closingDelay * 3) return 30;
  return 10;
}

function calculateExtensionCost(inputs: MortgageRateLockInputs, remainingDays: number): number {
  if (remainingDays > 0) return 0;
  
  const daysOver = Math.abs(remainingDays);
  if (inputs.extensionFeeType === 'daily') {
    return daysOver * inputs.extensionFee;
  } else if (inputs.extensionFeeType === 'percentage') {
    return inputs.loanAmount * (inputs.extensionFee / 100);
  } else {
    return inputs.extensionFee;
  }
}

function calculateRiskScore(inputs: MortgageRateLockInputs, rateDifference: number, remainingDays: number): number {
  let score = 0;
  
  // Rate risk (0-40 points)
  const rateRisk = Math.abs(rateDifference) * 10;
  score += Math.min(rateRisk, 40);
  
  // Time risk (0-30 points)
  if (remainingDays <= 0) score += 30;
  else if (remainingDays <= 7) score += 25;
  else if (remainingDays <= 14) score += 20;
  else if (remainingDays <= 30) score += 15;
  else if (remainingDays <= 60) score += 10;
  else score += 5;
  
  // Market risk (0-20 points)
  if (inputs.marketCondition === 'volatile') score += 20;
  else if (inputs.marketCondition === 'declining') score += 15;
  else if (inputs.marketCondition === 'growing') score += 10;
  else score += 5;
  
  // Borrower risk (0-10 points)
  if (inputs.borrowerCreditScore < 620) score += 10;
  else if (inputs.borrowerCreditScore < 680) score += 7;
  else if (inputs.borrowerCreditScore < 740) score += 5;
  else score += 2;
  
  return Math.min(score, 100);
}

function calculateExpirationProbability(remainingDays: number, closingDelay: number): number {
  if (remainingDays <= 0) return 100;
  if (remainingDays <= closingDelay * 0.5) return 90;
  if (remainingDays <= closingDelay) return 75;
  if (remainingDays <= closingDelay * 1.5) return 50;
  if (remainingDays <= closingDelay * 2) return 25;
  return 10;
}

function calculateRateIncreaseProbability(inputs: MortgageRateLockInputs): number {
  let probability = 50; // Base probability
  
  if (inputs.rateTrend === 'rising') probability += 30;
  else if (inputs.rateTrend === 'falling') probability -= 30;
  else if (inputs.rateTrend === 'volatile') probability += 10;
  
  if (inputs.marketCondition === 'growing') probability += 20;
  else if (inputs.marketCondition === 'declining') probability -= 20;
  else if (inputs.marketCondition === 'volatile') probability += 10;
  
  return Math.max(0, Math.min(100, probability));
}

function calculateRateDecreaseProbability(inputs: MortgageRateLockInputs): number {
  return 100 - calculateRateIncreaseProbability(inputs);
}

function calculateLockValue(interestSavings: number, lockCost: number, analysisPeriod: number): number {
  return (interestSavings - lockCost) / (analysisPeriod / 12);
}

function calculateBreakEvenPoint(inputs: MortgageRateLockInputs, rateDifference: number): number {
  if (rateDifference <= 0) return 0;
  
  const lockCost = calculateLockCost(inputs);
  const monthlySavings = (rateDifference / 100 / 12) * inputs.loanAmount;
  
  if (monthlySavings <= 0) return Infinity;
  
  return lockCost / monthlySavings;
}

function generateSensitivityMatrix(inputs: MortgageRateLockInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const variables = [
    { name: 'Rate Change', base: inputs.currentMarketRate, range: [-1, 1] },
    { name: 'Loan Amount', base: inputs.loanAmount, range: [-50000, 50000] },
    { name: 'Loan Term', base: inputs.loanTerm, range: [-5, 5] }
  ];
  
  return variables.map(variable => {
    const values = [
      variable.base + variable.range[0],
      variable.base,
      variable.base + variable.range[1]
    ];
    
    const impacts = values.map(value => {
      // Simplified impact calculation
      if (variable.name === 'Rate Change') {
        return (value - inputs.lockedRate) * inputs.loanAmount * 0.01;
      } else if (variable.name === 'Loan Amount') {
        return (value - inputs.loanAmount) * (inputs.currentMarketRate - inputs.lockedRate) * 0.01;
      } else {
        return (value - inputs.loanTerm) * inputs.loanAmount * 0.001;
      }
    });
    
    return { variable: variable.name, values, impacts };
  });
}

function generateScenarios(inputs: MortgageRateLockInputs, rateDifference: number): Array<{
  scenario: string;
  probability: number;
  rate: number;
  payment: number;
  savings: number;
}> {
  const scenarios = [
    { name: 'Best Case', rateChange: -0.5, probability: 20 },
    { name: 'Optimistic', rateChange: -0.25, probability: 30 },
    { name: 'Base Case', rateChange: 0, probability: 30 },
    { name: 'Pessimistic', rateChange: 0.25, probability: 15 },
    { name: 'Worst Case', rateChange: 0.5, probability: 5 }
  ];
  
  return scenarios.map(scenario => {
    const scenarioRate = inputs.currentMarketRate + scenario.rateChange;
    const monthlyRate = scenarioRate / 100 / 12;
    const numPayments = inputs.loanTerm * 12;
    const payment = calculateMonthlyPayment(inputs.loanAmount, monthlyRate, numPayments);
    const lockedPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate / 100 / 12, numPayments);
    const savings = (payment - lockedPayment) * numPayments;
    
    return {
      scenario: scenario.name,
      probability: scenario.probability,
      rate: scenarioRate,
      payment,
      savings
    };
  });
}

function generateTimelineAnalysis(inputs: MortgageRateLockInputs, remainingDays: number): Array<{
  date: string;
  event: string;
  rate: number;
  payment: number;
  cost: number;
}> {
  const timeline = [];
  const today = new Date();
  
  // Lock expiration
  const expirationDate = new Date(inputs.lockExpirationDate);
  timeline.push({
    date: expirationDate.toISOString().split('T')[0],
    event: 'Lock Expiration',
    rate: inputs.lockedRate,
    payment: calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate / 100 / 12, inputs.loanTerm * 12),
    cost: 0
  });
  
  // Estimated closing
  const closingDate = new Date(inputs.estimatedClosingDate);
  timeline.push({
    date: closingDate.toISOString().split('T')[0],
    event: 'Estimated Closing',
    rate: inputs.lockedRate,
    payment: calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate / 100 / 12, inputs.loanTerm * 12),
    cost: 0
  });
  
  return timeline;
}

function generateComparisonAnalysis(inputs: MortgageRateLockInputs, lockedPayment: number, currentPayment: number): Array<{
  option: string;
  rate: number;
  payment: number;
  totalCost: number;
  risk: string;
}> {
  return [
    {
      option: 'Locked Rate',
      rate: inputs.lockedRate,
      payment: lockedPayment,
      totalCost: (lockedPayment * inputs.loanTerm * 12) + calculateLockCost(inputs),
      risk: 'Low'
    },
    {
      option: 'Current Market Rate',
      rate: inputs.currentMarketRate,
      payment: currentPayment,
      totalCost: currentPayment * inputs.loanTerm * 12,
      risk: 'High'
    },
    {
      option: 'Float Down (if available)',
      rate: Math.min(inputs.lockedRate, inputs.currentMarketRate),
      payment: calculateMonthlyPayment(inputs.loanAmount, Math.min(inputs.lockedRate, inputs.currentMarketRate) / 100 / 12, inputs.loanTerm * 12),
      totalCost: calculateMonthlyPayment(inputs.loanAmount, Math.min(inputs.lockedRate, inputs.currentMarketRate) / 100 / 12, inputs.loanTerm * 12) * inputs.loanTerm * 12,
      risk: 'Medium'
    }
  ];
}

function generateBreakEvenAnalysis(inputs: MortgageRateLockInputs, rateDifference: number): Array<{
  days: number;
  rateIncrease: number;
  breakEvenRate: number;
  savings: number;
}> {
  const analysis = [];
  const lockCost = calculateLockCost(inputs);
  
  for (let days = 1; days <= 30; days += 5) {
    const rateIncrease = (days / 30) * 0.5; // Assume 0.5% increase over 30 days
    const breakEvenRate = inputs.lockedRate + (lockCost / (inputs.loanAmount * days / 365));
    const savings = (rateIncrease / 100) * inputs.loanAmount * (inputs.loanTerm / 12);
    
    analysis.push({
      days,
      rateIncrease,
      breakEvenRate,
      savings
    });
  }
  
  return analysis;
}