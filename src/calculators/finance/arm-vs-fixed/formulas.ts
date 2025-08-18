/**
 * ARM vs Fixed Mortgage Comparison Formulas
 * Based on mortgage industry standards and financial analysis
 */

export interface ComparisonInputs {
  loanAmount: number;
  fixedRate: number;
  armInitialRate: number;
  armInitialPeriod: number;
  loanTerm: number;
  armMargin: number;
  currentIndex: number;
  armLifetimeCap: number;
  armPeriodicCap: number;
  expectedIndexTrend: number;
  planToStay: number;
  riskTolerance: 'low' | 'moderate' | 'high';
}

export interface ComparisonResults {
  fixedPayment: number;
  armInitialPayment: number;
  initialSavings: number;
  breakEvenRate: number;
  totalCostFixed: number;
  totalCostARM: ARMCostScenarios;
  riskAnalysis: RiskAnalysis;
  recommendation: Recommendation;
}

export interface ARMCostScenarios {
  bestCase: number;
  expected: number;
  worstCase: number;
}

export interface RiskAnalysis {
  paymentShock: number;
  rateRisk: 'low' | 'moderate' | 'high';
  breakEvenCushion: number;
  stabilityScore: number;
}

export interface Recommendation {
  choice: 'ARM' | 'Fixed' | 'Either';
  confidence: 'low' | 'moderate' | 'high';
  reasoning: string[];
  keyFactors: string[];
}

/**
 * Calculate monthly mortgage payment
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (annualRate === 0) {
    return principal / (termYears * 12);
  }
  
  const monthlyRate = annualRate / 12;
  const totalPayments = termYears * 12;
  
  return principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Calculate remaining balance after specified payments
 */
export function calculateRemainingBalance(
  originalPrincipal: number,
  monthlyPayment: number,
  annualRate: number,
  paymentsMade: number
): number {
  if (annualRate === 0) {
    return Math.max(0, originalPrincipal - (monthlyPayment * paymentsMade));
  }
  
  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, paymentsMade);
  
  const remaining = originalPrincipal * factor - monthlyPayment * (factor - 1) / monthlyRate;
  return Math.max(0, remaining);
}

/**
 * Find break-even rate where ARM payment equals fixed payment
 */
export function findBreakEvenRate(
  remainingBalance: number,
  targetPayment: number,
  remainingYears: number
): number {
  // Use binary search to find the rate
  let low = 0.001; // 0.1%
  let high = 0.30;  // 30%
  let rate = (low + high) / 2;
  
  for (let iteration = 0; iteration < 100; iteration++) {
    const payment = calculateMonthlyPayment(remainingBalance, rate, remainingYears);
    
    if (Math.abs(payment - targetPayment) < 0.01) {
      break;
    }
    
    if (payment < targetPayment) {
      low = rate;
    } else {
      high = rate;
    }
    
    rate = (low + high) / 2;
  }
  
  return rate;
}

/**
 * Calculate total cost for fixed-rate mortgage over specified period
 */
export function calculateFixedTotalCost(
  monthlyPayment: number,
  years: number
): number {
  return monthlyPayment * years * 12;
}

/**
 * Calculate ARM total cost scenarios over specified period
 */
export function calculateARMTotalCost(
  loanAmount: number,
  initialRate: number,
  initialPeriod: number,
  currentIndex: number,
  margin: number,
  periodicCap: number,
  lifetimeCap: number,
  expectedTrend: number,
  planToStay: number,
  loanTerm: number
): ARMCostScenarios {
  const monthsToStay = Math.min(planToStay * 12, loanTerm * 12);
  
  // Calculate scenarios
  const bestCase = calculateARMScenario(
    loanAmount, initialRate, initialPeriod, currentIndex, margin,
    periodicCap, lifetimeCap, -0.01, // Rates decline slightly
    monthsToStay, loanTerm
  );
  
  const expected = calculateARMScenario(
    loanAmount, initialRate, initialPeriod, currentIndex, margin,
    periodicCap, lifetimeCap, expectedTrend,
    monthsToStay, loanTerm
  );
  
  const worstCase = calculateARMScenario(
    loanAmount, initialRate, initialPeriod, currentIndex, margin,
    periodicCap, lifetimeCap, 0.02, // Rates rise 2% annually
    monthsToStay, loanTerm
  );
  
  return { bestCase, expected, worstCase };
}

/**
 * Calculate ARM cost for specific rate scenario
 */
function calculateARMScenario(
  loanAmount: number,
  initialRate: number,
  initialPeriod: number,
  currentIndex: number,
  margin: number,
  periodicCap: number,
  lifetimeCap: number,
  indexTrend: number,
  monthsToStay: number,
  loanTerm: number
): number {
  let totalCost = 0;
  let currentRate = initialRate;
  let currentBalance = loanAmount;
  const initialPayment = calculateMonthlyPayment(loanAmount, initialRate, loanTerm);
  
  for (let month = 1; month <= monthsToStay; month++) {
    // Check for rate adjustment
    if (month > initialPeriod * 12 && (month - initialPeriod * 12 - 1) % 12 === 0) {
      const yearsFromInitial = (month - initialPeriod * 12) / 12;
      const projectedIndex = currentIndex + (indexTrend * yearsFromInitial);
      let newRate = projectedIndex + margin;
      
      // Apply periodic cap
      newRate = Math.min(newRate, currentRate + periodicCap);
      
      // Apply lifetime cap
      newRate = Math.min(newRate, initialRate + lifetimeCap);
      
      // Ensure minimum rate
      currentRate = Math.max(newRate, 0.01);
    }
    
    // Calculate payment components
    const monthlyRate = currentRate / 12;
    const interestPayment = currentBalance * monthlyRate;
    
    // Use original payment amount for consistency
    const principalPayment = Math.min(initialPayment - interestPayment, currentBalance);
    
    totalCost += interestPayment + principalPayment;
    currentBalance = Math.max(0, currentBalance - principalPayment);
    
    if (currentBalance <= 0) break;
  }
  
  return totalCost;
}

/**
 * Analyze payment shock risk
 */
export function analyzePaymentShock(
  initialPayment: number,
  maxPossiblePayment: number
): {
  shockPercentage: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  dollarIncrease: number;
} {
  const dollarIncrease = maxPossiblePayment - initialPayment;
  const shockPercentage = (dollarIncrease / initialPayment) * 100;
  
  let riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  if (shockPercentage < 15) {
    riskLevel = 'low';
  } else if (shockPercentage < 30) {
    riskLevel = 'moderate';
  } else if (shockPercentage < 50) {
    riskLevel = 'high';
  } else {
    riskLevel = 'extreme';
  }
  
  return { shockPercentage, riskLevel, dollarIncrease };
}

/**
 * Calculate break-even cushion
 */
export function calculateBreakEvenCushion(
  breakEvenRate: number,
  fullyIndexedRate: number
): {
  cushionPercentage: number;
  cushionLevel: 'none' | 'small' | 'moderate' | 'large';
} {
  const cushionPercentage = ((breakEvenRate - fullyIndexedRate) / fullyIndexedRate) * 100;
  
  let cushionLevel: 'none' | 'small' | 'moderate' | 'large';
  if (cushionPercentage <= 0) {
    cushionLevel = 'none';
  } else if (cushionPercentage < 10) {
    cushionLevel = 'small';
  } else if (cushionPercentage < 25) {
    cushionLevel = 'moderate';
  } else {
    cushionLevel = 'large';
  }
  
  return { cushionPercentage, cushionLevel };
}

/**
 * Generate comprehensive comparison analysis
 */
export function generateComparisonAnalysis(inputs: ComparisonInputs): ComparisonResults {
  const {
    loanAmount,
    fixedRate,
    armInitialRate,
    armInitialPeriod,
    loanTerm,
    armMargin,
    currentIndex,
    armLifetimeCap,
    armPeriodicCap,
    expectedIndexTrend,
    planToStay,
    riskTolerance
  } = inputs;

  // Calculate basic payments
  const fixedPayment = calculateMonthlyPayment(loanAmount, fixedRate, loanTerm);
  const armInitialPayment = calculateMonthlyPayment(loanAmount, armInitialRate, loanTerm);
  const initialSavings = fixedPayment - armInitialPayment;

  // Calculate break-even rate
  const remainingBalance = calculateRemainingBalance(
    loanAmount, armInitialPayment, armInitialRate, armInitialPeriod * 12
  );
  const remainingYears = loanTerm - armInitialPeriod;
  const breakEvenRate = findBreakEvenRate(remainingBalance, fixedPayment, remainingYears);

  // Calculate total costs
  const totalCostFixed = calculateFixedTotalCost(fixedPayment, planToStay);
  const totalCostARM = calculateARMTotalCost(
    loanAmount, armInitialRate, armInitialPeriod, currentIndex, armMargin,
    armPeriodicCap, armLifetimeCap, expectedIndexTrend, planToStay, loanTerm
  );

  // Risk analysis
  const fullyIndexedRate = currentIndex + armMargin;
  const maxPossibleRate = Math.min(armInitialRate + armLifetimeCap, fullyIndexedRate + armLifetimeCap);
  const maxPayment = calculateMonthlyPayment(loanAmount, maxPossibleRate, loanTerm);
  
  const paymentShockAnalysis = analyzePaymentShock(armInitialPayment, maxPayment);
  const breakEvenCushion = calculateBreakEvenCushion(breakEvenRate, fullyIndexedRate);
  
  const riskAnalysis: RiskAnalysis = {
    paymentShock: paymentShockAnalysis.shockPercentage,
    rateRisk: paymentShockAnalysis.riskLevel === 'extreme' ? 'high' : 
              paymentShockAnalysis.riskLevel === 'high' ? 'high' :
              paymentShockAnalysis.riskLevel === 'moderate' ? 'moderate' : 'low',
    breakEvenCushion: breakEvenCushion.cushionPercentage,
    stabilityScore: calculateStabilityScore(inputs, paymentShockAnalysis, breakEvenCushion)
  };

  // Generate recommendation
  const recommendation = generateRecommendation(
    inputs, initialSavings, breakEvenRate, fullyIndexedRate, 
    riskAnalysis, totalCostFixed, totalCostARM
  );

  return {
    fixedPayment,
    armInitialPayment,
    initialSavings,
    breakEvenRate,
    totalCostFixed,
    totalCostARM,
    riskAnalysis,
    recommendation
  };
}

/**
 * Calculate stability score (0-100)
 */
function calculateStabilityScore(
  inputs: ComparisonInputs,
  paymentShock: any,
  breakEvenCushion: any
): number {
  let score = 50; // Base score
  
  // Adjust for payment shock risk
  if (paymentShock.riskLevel === 'low') score += 20;
  else if (paymentShock.riskLevel === 'moderate') score += 10;
  else if (paymentShock.riskLevel === 'high') score -= 10;
  else score -= 20;
  
  // Adjust for break-even cushion
  if (breakEvenCushion.cushionLevel === 'large') score += 15;
  else if (breakEvenCushion.cushionLevel === 'moderate') score += 10;
  else if (breakEvenCushion.cushionLevel === 'small') score += 5;
  else score -= 10;
  
  // Adjust for initial period vs plan to stay
  if (inputs.planToStay <= inputs.armInitialPeriod) score += 15;
  else if (inputs.planToStay <= inputs.armInitialPeriod + 2) score += 5;
  else score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Generate personalized recommendation
 */
function generateRecommendation(
  inputs: ComparisonInputs,
  initialSavings: number,
  breakEvenRate: number,
  fullyIndexedRate: number,
  riskAnalysis: RiskAnalysis,
  totalCostFixed: number,
  totalCostARM: ARMCostScenarios
): Recommendation {
  const reasoning: string[] = [];
  const keyFactors: string[] = [];
  
  // Analyze time horizon
  if (inputs.planToStay <= inputs.armInitialPeriod) {
    reasoning.push(`Short stay period (${inputs.planToStay} years) within ARM initial period (${inputs.armInitialPeriod} years)`);
    keyFactors.push('Short-term ownership favors ARM');
  }
  
  // Analyze initial savings
  if (initialSavings > 0) {
    reasoning.push(`ARM offers $${initialSavings.toLocaleString()} monthly savings initially`);
    keyFactors.push(`$${initialSavings.toLocaleString()}/month initial savings`);
  } else {
    reasoning.push('ARM offers no initial payment advantage');
    keyFactors.push('No initial ARM savings');
  }
  
  // Analyze break-even cushion
  const cushionBps = (breakEvenRate - fullyIndexedRate) * 10000;
  if (cushionBps > 100) {
    reasoning.push(`Strong break-even cushion (${cushionBps.toFixed(0)} basis points)`);
    keyFactors.push('Good rate protection');
  } else if (cushionBps > 0) {
    reasoning.push(`Moderate break-even cushion (${cushionBps.toFixed(0)} basis points)`);
    keyFactors.push('Limited rate protection');
  } else {
    reasoning.push('ARM already at or above break-even rate');
    keyFactors.push('High rate risk');
  }
  
  // Analyze risk tolerance alignment
  if (inputs.riskTolerance === 'low' && riskAnalysis.paymentShock > 25) {
    reasoning.push('High payment shock risk conflicts with low risk tolerance');
    keyFactors.push('Risk tolerance mismatch');
  } else if (inputs.riskTolerance === 'high' && riskAnalysis.paymentShock < 15) {
    reasoning.push('Low payment shock risk aligns with high risk tolerance');
    keyFactors.push('Good risk alignment');
  }
  
  // Make recommendation
  let choice: 'ARM' | 'Fixed' | 'Either';
  let confidence: 'low' | 'moderate' | 'high';
  
  if (inputs.planToStay <= inputs.armInitialPeriod && initialSavings > 0) {
    choice = 'ARM';
    confidence = 'high';
    reasoning.push('ARM recommended for short-term ownership with savings');
  } else if (riskAnalysis.stabilityScore >= 70 && initialSavings > 100) {
    choice = 'ARM';
    confidence = 'moderate';
    reasoning.push('ARM recommended with good stability metrics');
  } else if (riskAnalysis.stabilityScore <= 30 || inputs.riskTolerance === 'low') {
    choice = 'Fixed';
    confidence = 'high';
    reasoning.push('Fixed rate recommended for stability and risk management');
  } else if (Math.abs(totalCostARM.expected - totalCostFixed) < totalCostFixed * 0.02) {
    choice = 'Either';
    confidence = 'low';
    reasoning.push('Both options have similar total costs');
  } else if (totalCostARM.expected < totalCostFixed) {
    choice = 'ARM';
    confidence = 'moderate';
    reasoning.push('ARM has lower expected total cost');
  } else {
    choice = 'Fixed';
    confidence = 'moderate';
    reasoning.push('Fixed rate has lower total cost and better predictability');
  }
  
  return { choice, confidence, reasoning, keyFactors };
}