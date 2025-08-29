import { MortgageRateLockInputs, MortgageRateLockOutputs, MortgageRateLockAnalysis } from './types';

export function calculateMortgageRateLock(inputs: MortgageRateLockInputs): MortgageRateLockOutputs {
  // Calculate rate analysis
  const rateDifference = inputs.currentMarketRate - inputs.lockedRate;
  const rateSavings = calculateRateSavings(inputs);
  const rateRisk = calculateRateRisk(inputs);
  const effectiveRate = calculateEffectiveRate(inputs);
  
  // Calculate payment analysis
  const lockedPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm);
  const currentPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRate, inputs.loanTerm);
  const paymentDifference = currentPayment - lockedPayment;
  const paymentSavings = Math.max(0, paymentDifference);
  
  // Calculate time analysis
  const lockRemainingDays = calculateLockRemainingDays(inputs);
  const lockExpirationRisk = calculateLockExpirationRisk(inputs, lockRemainingDays);
  const extensionCost = calculateExtensionCost(inputs);
  const breakEvenPoint = calculateBreakEvenPoint(inputs, rateSavings, extensionCost);
  
  // Calculate cost analysis
  const totalInterestPaid = calculateTotalInterestPaid(inputs);
  const interestSavings = calculateInterestSavings(inputs);
  const lockCost = calculateLockCost(inputs);
  const netSavings = rateSavings - lockCost;
  
  // Calculate risk analysis
  const riskScore = calculateRiskScore(inputs, lockRemainingDays, rateRisk);
  const probabilityOfExpiration = calculateProbabilityOfExpiration(inputs, lockRemainingDays);
  const probabilityOfRateIncrease = calculateProbabilityOfRateIncrease(inputs);
  const probabilityOfRateDecrease = calculateProbabilityOfRateDecrease(inputs);
  
  // Calculate value analysis
  const lockValue = calculateLockValue(inputs, rateSavings, lockCost);
  const lockValuePerDay = lockValue / Math.max(1, lockRemainingDays);
  const lockValuePerMonth = lockValuePerDay * 30;
  const lockValuePerYear = lockValuePerDay * 365;
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs, lockValue);
  
  // Generate scenarios
  const scenarios = generateScenarioAnalysis(inputs, lockValue);
  
  // Generate timeline analysis
  const timelineAnalysis = generateTimelineAnalysis(inputs, lockRemainingDays);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, lockValue);
  
  // Generate break-even analysis
  const breakEvenAnalysis = generateBreakEvenAnalysis(inputs, lockValue);
  
  // Generate analysis
  const analysis = generateRateLockAnalysis(inputs, {
    rateDifference,
    rateSavings,
    rateRisk,
    effectiveRate,
    lockedPayment,
    currentPayment,
    paymentDifference,
    paymentSavings,
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
    lockValuePerYear
  });
  
  return {
    // Core Metrics
    rateDifference,
    rateSavings,
    paymentDifference,
    paymentSavings,
    lockValue,
    riskScore,
    lockRemainingDays,
    breakEvenPoint,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    rateRisk,
    effectiveRate,
    lockedPayment,
    currentPayment,
    totalInterestPaid,
    interestSavings,
    lockCost,
    netSavings,
    lockExpirationRisk,
    extensionCost,
    probabilityOfExpiration,
    probabilityOfRateIncrease,
    probabilityOfRateDecrease,
    lockValuePerDay,
    lockValuePerMonth,
    lockValuePerYear,
    sensitivityMatrix,
    scenarios,
    timelineAnalysis,
    comparisonAnalysis,
    breakEvenAnalysis,
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

function calculateRateSavings(inputs: MortgageRateLockInputs): number {
  const rateDifference = inputs.currentMarketRate - inputs.lockedRate;
  if (rateDifference <= 0) return 0;
  
  const lockedPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm);
  const currentPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRate, inputs.loanTerm);
  const monthlySavings = currentPayment - lockedPayment;
  
  return monthlySavings * inputs.loanTerm * 12;
}

function calculateRateRisk(inputs: MortgageRateLockInputs): number {
  let risk = 0;
  
  // Market volatility impact
  risk += inputs.marketVolatility * 0.5;
  
  // Rate trend impact
  switch (inputs.rateTrend) {
    case 'rising': risk += 20; break;
    case 'volatile': risk += 15; break;
    case 'stable': risk += 5; break;
    case 'falling': risk -= 10; break;
  }
  
  // Market condition impact
  switch (inputs.marketCondition) {
    case 'volatile': risk += 15; break;
    case 'declining': risk += 10; break;
    case 'growing': risk += 5; break;
    case 'stable': risk += 0; break;
  }
  
  return Math.max(0, Math.min(100, risk));
}

function calculateEffectiveRate(inputs: MortgageRateLockInputs): number {
  const lockCost = calculateLockCost(inputs);
  const totalLoanAmount = inputs.loanAmount + lockCost;
  
  // Calculate effective rate that would result in the same total cost
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm);
  const totalPayments = monthlyPayment * inputs.loanTerm * 12;
  
  // Use iterative approach to find effective rate
  let effectiveRate = inputs.lockedRate;
  let tolerance = 0.001;
  let maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    const testPayment = calculateMonthlyPayment(totalLoanAmount, effectiveRate, inputs.loanTerm);
    const testTotal = testPayment * inputs.loanTerm * 12;
    
    if (Math.abs(testTotal - totalPayments) < tolerance) {
      break;
    }
    
    if (testTotal > totalPayments) {
      effectiveRate -= 0.01;
    } else {
      effectiveRate += 0.01;
    }
  }
  
  return effectiveRate;
}

function calculateLockRemainingDays(inputs: MortgageRateLockInputs): number {
  const lockDate = new Date(inputs.lockDate);
  const expirationDate = new Date(inputs.lockExpirationDate);
  const currentDate = new Date();
  
  const timeDiff = expirationDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return Math.max(0, daysRemaining);
}

function calculateLockExpirationRisk(inputs: MortgageRateLockInputs, remainingDays: number): number {
  let risk = 0;
  
  // Days remaining impact
  if (remainingDays <= 0) risk = 100;
  else if (remainingDays <= 3) risk = 90;
  else if (remainingDays <= 7) risk = 70;
  else if (remainingDays <= 14) risk = 50;
  else if (remainingDays <= 30) risk = 30;
  else risk = 10;
  
  // Market volatility impact
  risk += inputs.marketVolatility * 0.3;
  
  // Rate trend impact
  switch (inputs.rateTrend) {
    case 'rising': risk += 10; break;
    case 'volatile': risk += 15; break;
    case 'stable': risk += 5; break;
    case 'falling': risk -= 5; break;
  }
  
  return Math.max(0, Math.min(100, risk));
}

function calculateExtensionCost(inputs: MortgageRateLockInputs): number {
  if (inputs.extensionFeeType === 'none') return 0;
  
  let cost = 0;
  switch (inputs.extensionFeeType) {
    case 'percentage':
      cost = inputs.loanAmount * (inputs.extensionFee / 100);
      break;
    case 'fixed':
      cost = inputs.extensionFee;
      break;
    case 'daily':
      cost = inputs.extensionFee * 30; // Assume 30-day extension
      break;
  }
  
  return cost;
}

function calculateBreakEvenPoint(inputs: MortgageRateLockInputs, rateSavings: number, extensionCost: number): number {
  const totalCost = calculateLockCost(inputs) + extensionCost;
  if (rateSavings <= 0) return 0;
  
  const monthlySavings = rateSavings / (inputs.loanTerm * 12);
  if (monthlySavings <= 0) return 0;
  
  return Math.ceil(totalCost / monthlySavings);
}

function calculateTotalInterestPaid(inputs: MortgageRateLockInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm);
  const totalPayments = monthlyPayment * inputs.loanTerm * 12;
  return totalPayments - inputs.loanAmount;
}

function calculateInterestSavings(inputs: MortgageRateLockInputs): number {
  const lockedInterest = calculateTotalInterestPaid(inputs);
  const currentInterest = calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRate, inputs.loanTerm) * inputs.loanTerm * 12 - inputs.loanAmount;
  
  return Math.max(0, currentInterest - lockedInterest);
}

function calculateLockCost(inputs: MortgageRateLockInputs): number {
  if (inputs.lockFeeType === 'none') return 0;
  
  let cost = 0;
  switch (inputs.lockFeeType) {
    case 'percentage':
      cost = inputs.loanAmount * (inputs.lockFee / 100);
      break;
    case 'fixed':
      cost = inputs.lockFee;
      break;
  }
  
  return cost;
}

function calculateRiskScore(inputs: MortgageRateLockInputs, remainingDays: number, rateRisk: number): number {
  let riskScore = 50; // Base risk score
  
  // Days remaining impact
  if (remainingDays <= 0) riskScore += 40;
  else if (remainingDays <= 7) riskScore += 30;
  else if (remainingDays <= 14) riskScore += 20;
  else if (remainingDays <= 30) riskScore += 10;
  else riskScore -= 10;
  
  // Rate risk impact
  riskScore += rateRisk * 0.3;
  
  // Market volatility impact
  riskScore += inputs.marketVolatility * 0.2;
  
  // Rate trend impact
  switch (inputs.rateTrend) {
    case 'rising': riskScore += 15; break;
    case 'volatile': riskScore += 20; break;
    case 'stable': riskScore += 5; break;
    case 'falling': riskScore -= 10; break;
  }
  
  return Math.max(0, Math.min(100, riskScore));
}

function calculateProbabilityOfExpiration(inputs: MortgageRateLockInputs, remainingDays: number): number {
  let probability = 5; // Base 5% probability
  
  // Days remaining impact
  if (remainingDays <= 0) probability = 100;
  else if (remainingDays <= 3) probability = 80;
  else if (remainingDays <= 7) probability = 60;
  else if (remainingDays <= 14) probability = 40;
  else if (remainingDays <= 30) probability = 20;
  else probability = 5;
  
  // Market volatility impact
  probability += inputs.marketVolatility * 0.3;
  
  // Rate trend impact
  switch (inputs.rateTrend) {
    case 'rising': probability += 10; break;
    case 'volatile': probability += 15; break;
    case 'stable': probability += 5; break;
    case 'falling': probability -= 5; break;
  }
  
  return Math.max(0, Math.min(100, probability));
}

function calculateProbabilityOfRateIncrease(inputs: MortgageRateLockInputs): number {
  let probability = 50; // Base 50% probability
  
  // Rate trend impact
  switch (inputs.rateTrend) {
    case 'rising': probability += 30; break;
    case 'volatile': probability += 20; break;
    case 'stable': probability += 10; break;
    case 'falling': probability -= 20; break;
  }
  
  // Market condition impact
  switch (inputs.marketCondition) {
    case 'volatile': probability += 15; break;
    case 'growing': probability += 10; break;
    case 'stable': probability += 5; break;
    case 'declining': probability -= 10; break;
  }
  
  return Math.max(0, Math.min(100, probability));
}

function calculateProbabilityOfRateDecrease(inputs: MortgageRateLockInputs): number {
  return 100 - calculateProbabilityOfRateIncrease(inputs);
}

function calculateLockValue(inputs: MortgageRateLockInputs, rateSavings: number, lockCost: number): number {
  return Math.max(0, rateSavings - lockCost);
}

function generateSensitivityMatrix(inputs: MortgageRateLockInputs, lockValue: number): any[] {
  const variables = [
    { name: 'Market Rate', field: 'currentMarketRate', base: inputs.currentMarketRate, range: [-0.5, -0.25, 0, 0.25, 0.5] },
    { name: 'Lock Duration', field: 'lockDuration', base: inputs.lockDuration, range: [-15, -7, 0, 7, 15] },
    { name: 'Market Volatility', field: 'marketVolatility', base: inputs.marketVolatility, range: [-10, -5, 0, 5, 10] },
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      const testInputs = { ...inputs };
      if (variable.field === 'currentMarketRate') {
        testInputs.currentMarketRate = variable.base + change;
      } else if (variable.field === 'lockDuration') {
        testInputs.lockDuration = variable.base + change;
      } else if (variable.field === 'marketVolatility') {
        testInputs.marketVolatility = variable.base + change;
      }
      
      const testResults = calculateMortgageRateLock(testInputs);
      return testResults.lockValue;
    });
    
    return {
      variable: variable.name,
      values: variable.range.map(v => variable.base + v),
      impacts,
    };
  });
}

function generateScenarioAnalysis(inputs: MortgageRateLockInputs, lockValue: number): any[] {
  const scenarios = [
    {
      scenario: 'Conservative',
      probability: 0.25,
      rateChange: 0.5,
      durationChange: -7,
      volatilityChange: 10
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      rateChange: 0,
      durationChange: 0,
      volatilityChange: 0
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      rateChange: -0.25,
      durationChange: 7,
      volatilityChange: -5
    }
  ];
  
  return scenarios.map(scenario => {
    const testInputs = { ...inputs };
    testInputs.currentMarketRate += scenario.rateChange;
    testInputs.lockDuration += scenario.durationChange;
    testInputs.marketVolatility += scenario.volatilityChange;
    
    const testResults = calculateMortgageRateLock(testInputs);
    
    return {
      scenario: scenario.scenario,
      probability: scenario.probability,
      rate: testInputs.currentMarketRate,
      payment: testResults.lockedPayment,
      savings: testResults.lockValue
    };
  });
}

function generateTimelineAnalysis(inputs: MortgageRateLockInputs, remainingDays: number): any[] {
  const timeline = [];
  const lockDate = new Date(inputs.lockDate);
  const expirationDate = new Date(inputs.lockExpirationDate);
  const currentDate = new Date();
  
  // Add lock date
  timeline.push({
    date: inputs.lockDate,
    event: 'Rate Lock Initiated',
    rate: inputs.lockedRate,
    payment: calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm),
    cost: calculateLockCost(inputs)
  });
  
  // Add current date
  timeline.push({
    date: currentDate.toISOString().split('T')[0],
    event: 'Current Status',
    rate: inputs.lockedRate,
    payment: calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm),
    cost: 0
  });
  
  // Add expiration date
  timeline.push({
    date: inputs.lockExpirationDate,
    event: 'Lock Expires',
    rate: inputs.currentMarketRate,
    payment: calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRate, inputs.loanTerm),
    cost: 0
  });
  
  // Add forecast dates
  inputs.rateForecast.forEach(forecast => {
    timeline.push({
      date: forecast.date,
      event: 'Rate Forecast',
      rate: forecast.predictedRate,
      payment: calculateMonthlyPayment(inputs.loanAmount, forecast.predictedRate, inputs.loanTerm),
      cost: 0
    });
  });
  
  return timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function generateComparisonAnalysis(inputs: MortgageRateLockInputs, lockValue: number): any[] {
  const options = [
    {
      option: 'Maintain Current Lock',
      rate: inputs.lockedRate,
      payment: calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm),
      totalCost: calculateLockCost(inputs),
      risk: 'Low'
    },
    {
      option: 'Let Lock Expire',
      rate: inputs.currentMarketRate,
      payment: calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRate, inputs.loanTerm),
      totalCost: 0,
      risk: 'High'
    },
    {
      option: 'Extend Lock',
      rate: inputs.lockedRate,
      payment: calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm),
      totalCost: calculateLockCost(inputs) + calculateExtensionCost(inputs),
      risk: 'Medium'
    }
  ];
  
  return options;
}

function generateBreakEvenAnalysis(inputs: MortgageRateLockInputs, lockValue: number): any[] {
  const analysis = [];
  const rateIncreases = [0.25, 0.5, 0.75, 1.0, 1.25];
  
  rateIncreases.forEach(increase => {
    const newRate = inputs.currentMarketRate + increase;
    const newPayment = calculateMonthlyPayment(inputs.loanAmount, newRate, inputs.loanTerm);
    const lockedPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.lockedRate, inputs.loanTerm);
    const monthlySavings = newPayment - lockedPayment;
    
    const breakEvenDays = monthlySavings > 0 ? Math.ceil(calculateLockCost(inputs) / monthlySavings) : 0;
    const totalSavings = monthlySavings * inputs.loanTerm * 12;
    
    analysis.push({
      days: breakEvenDays,
      rateIncrease: increase,
      breakEvenRate: newRate,
      savings: totalSavings
    });
  });
  
  return analysis;
}

function generateRateLockAnalysis(inputs: MortgageRateLockInputs, metrics: any): MortgageRateLockAnalysis {
  // Determine ratings
  let lockRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value' = 'Moderate Value';
  let recommendation: 'Maintain Lock' | 'Consider Extension' | 'Let Expire' | 'Requires Review' = 'Requires Review';
  
  // Lock rating based on risk score and remaining days
  if (metrics.riskScore < 30 && metrics.lockRemainingDays > 14) {
    lockRating = 'Excellent';
  } else if (metrics.riskScore < 50 && metrics.lockRemainingDays > 7) {
    lockRating = 'Good';
  } else if (metrics.riskScore < 70 && metrics.lockRemainingDays > 3) {
    lockRating = 'Average';
  } else if (metrics.riskScore < 85) {
    lockRating = 'Poor';
  } else {
    lockRating = 'Very Poor';
  }
  
  // Value rating based on lock value
  if (metrics.lockValue > 10000) {
    valueRating = 'High Value';
  } else if (metrics.lockValue > 5000) {
    valueRating = 'Good Value';
  } else if (metrics.lockValue > 1000) {
    valueRating = 'Moderate Value';
  } else if (metrics.lockValue > 0) {
    valueRating = 'Low Value';
  } else {
    valueRating = 'No Value';
  }
  
  // Recommendation based on multiple factors
  if (metrics.lockValue > 5000 && metrics.riskScore < 50) {
    recommendation = 'Maintain Lock';
  } else if (metrics.lockValue > 1000 && metrics.lockRemainingDays <= 7) {
    recommendation = 'Consider Extension';
  } else if (metrics.lockValue <= 0 || metrics.riskScore > 80) {
    recommendation = 'Let Expire';
  } else {
    recommendation = 'Requires Review';
  }
  
  // Generate key insights
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];
  const riskFactors: string[] = [];
  const opportunities: string[] = [];
  
  if (metrics.rateDifference > 0) keyStrengths.push('Locked rate is below current market rate');
  if (metrics.lockRemainingDays > 14) keyStrengths.push('Adequate time remaining on lock');
  if (metrics.lockValue > 5000) keyStrengths.push('Significant value in current lock');
  if (inputs.lockType === 'free') keyStrengths.push('Free rate lock with no additional cost');
  
  if (metrics.lockRemainingDays <= 7) keyWeaknesses.push('Limited time remaining on lock');
  if (metrics.rateDifference <= 0) keyWeaknesses.push('Locked rate is at or above market rate');
  if (metrics.lockValue <= 0) keyWeaknesses.push('No value in current lock');
  if (inputs.marketVolatility > 20) keyWeaknesses.push('High market volatility');
  
  if (metrics.riskScore > 70) riskFactors.push('High risk of lock expiration');
  if (inputs.rateTrend === 'rising') riskFactors.push('Rising rate environment');
  if (inputs.marketCondition === 'volatile') riskFactors.push('Volatile market conditions');
  if (metrics.probabilityOfExpiration > 50) riskFactors.push('High probability of lock expiration');
  
  if (metrics.lockValue > 1000) opportunities.push('Consider extending lock to preserve value');
  if (inputs.rateTrend === 'falling') opportunities.push('Monitor for better rates');
  if (metrics.lockRemainingDays > 30) opportunities.push('Time to optimize closing timeline');
  
  return {
    lockRating,
    valueRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,
    lockSummary: `Rate lock at ${inputs.lockedRate}% with ${metrics.lockRemainingDays} days remaining.`,
    rateAnalysis: `Current market rate is ${inputs.currentMarketRate}%, providing ${formatCurrency(metrics.rateSavings)} in potential savings.`,
    valueAnalysis: `Lock value is ${formatCurrency(metrics.lockValue)} with ${formatCurrency(metrics.lockValuePerDay)} per day.`,
    riskAssessment: `Risk score of ${metrics.riskScore.toFixed(1)}% with ${metrics.probabilityOfExpiration.toFixed(1)}% expiration probability.`,
    expirationRisk: `Expiration risk is ${metrics.lockExpirationRisk.toFixed(1)}% with ${metrics.lockRemainingDays} days remaining.`,
    rateRisk: `Rate risk is ${metrics.rateRisk.toFixed(1)}% with ${metrics.probabilityOfRateIncrease.toFixed(1)}% probability of increase.`,
    marketRisk: `Market risk is ${inputs.marketCondition === 'stable' ? 'low' : inputs.marketCondition === 'growing' ? 'moderate' : 'high'}.`,
    costSummary: `Lock cost is ${formatCurrency(calculateLockCost(inputs))} with ${formatCurrency(metrics.netSavings)} net savings.`,
    savingsAnalysis: `Total savings of ${formatCurrency(metrics.rateSavings)} over loan term.`,
    breakEvenAnalysis: `Break-even point is ${metrics.breakEvenPoint} days with current market conditions.`,
    marketAnalysis: `Market conditions are ${inputs.marketCondition} with ${inputs.marketVolatility}% volatility.`,
    rateTrendAnalysis: `Rate trend is ${inputs.rateTrend} with ${metrics.probabilityOfRateIncrease.toFixed(1)}% probability of increase.`,
    volatilityAnalysis: `Market volatility of ${inputs.marketVolatility}% indicates ${inputs.marketVolatility > 20 ? 'high' : inputs.marketVolatility > 10 ? 'moderate' : 'low'} risk.`,
    timelineSummary: `Lock expires on ${inputs.lockExpirationDate} with ${metrics.lockRemainingDays} days remaining.`,
    expirationAnalysis: `Lock expiration risk is ${metrics.lockExpirationRisk.toFixed(1)}% based on remaining time and market conditions.`,
    extensionAnalysis: `Extension cost would be ${formatCurrency(calculateExtensionCost(inputs))} if needed.`,
    lockRecommendations: [
      'Monitor market conditions daily',
      'Prepare for potential extension if needed',
      'Maintain communication with lender',
      'Have backup financing options ready'
    ],
    extensionRecommendations: [
      'Evaluate extension cost vs. potential savings',
      'Consider market rate forecasts',
      'Assess closing timeline realistically',
      'Negotiate extension terms if possible'
    ],
    optimizationSuggestions: [
      'Accelerate closing timeline if possible',
      'Monitor for better rate opportunities',
      'Consider float-down options if available',
      'Prepare for potential rate changes'
    ],
    implementationPlan: recommendation === 'Maintain Lock' ? 'Continue with current lock strategy' :
                        recommendation === 'Consider Extension' ? 'Evaluate extension options' :
                        recommendation === 'Let Expire' ? 'Prepare for new rate lock' : 'Review all options carefully',
    nextSteps: [
      'Monitor daily rate movements',
      'Track lock expiration timeline',
      'Prepare extension documentation',
      'Maintain lender communication'
    ],
    timeline: 'Typical rate lock process takes 30-60 days.',
    monitoringPlan: 'Monitor rates daily and lock status weekly.',
    keyMetrics: [
      'Lock remaining days',
      'Rate difference',
      'Lock value',
      'Risk score'
    ],
    reviewSchedule: 'Review lock status weekly and market conditions daily.',
    riskManagement: 'Maintain backup financing options and monitor market closely.',
    mitigationStrategies: [
      'Accelerate closing timeline',
      'Prepare extension documentation',
      'Monitor alternative lenders',
      'Consider rate lock insurance'
    ],
    contingencyPlans: [
      'Have backup lender options',
      'Prepare for rate changes',
      'Consider different loan terms',
      'Have additional down payment available'
    ],
    performanceBenchmarks: [
      {
        metric: 'Lock Value',
        target: 5000,
        benchmark: metrics.lockValue,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'Risk Score',
        target: 30,
        benchmark: metrics.riskScore,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'Days Remaining',
        target: 14,
        benchmark: metrics.lockRemainingDays,
        industry: 'Mortgage Lending'
      }
    ],
    decisionRecommendation: recommendation === 'Maintain Lock' ? 'Maintain current rate lock' :
                            recommendation === 'Consider Extension' ? 'Consider extending rate lock' :
                            recommendation === 'Let Expire' ? 'Let current lock expire' : 'Review all options',
    presentationPoints: [
      `Lock value: ${formatCurrency(metrics.lockValue)}`,
      `Days remaining: ${metrics.lockRemainingDays}`,
      `Rate difference: ${formatPercentage(Math.abs(metrics.rateDifference))}`,
      `Risk score: ${metrics.riskScore.toFixed(1)}%`
    ],
    decisionFactors: [
      'Lock value and potential savings',
      'Days remaining on lock',
      'Market rate trends and volatility',
      'Extension costs and benefits'
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