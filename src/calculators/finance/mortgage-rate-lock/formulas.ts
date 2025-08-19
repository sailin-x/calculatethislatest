export interface MortgageRateLockInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: string;
  lockPeriod: string;
  lockFee?: number;
  lockExtensionFee?: number;
  processingTime: number;
  rateVolatility?: number;
  marketTrend?: string;
  closingDate?: string;
  lockStartDate?: string;
  propertyType?: string;
  loanType: string;
  creditScore?: number;
  downPayment?: number;
}

export interface LockScenario {
  scenario: string;
  lockPeriod: number;
  lockCost: number;
  potentialSavings: number;
  breakEvenDays: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface RateLockAnalysis {
  monthlyPayment: number;
  totalInterest: number;
  lockCost: number;
  potentialSavings: number;
  breakEvenDays: number;
  riskAnalysis: string;
  recommendations: string;
  lockScenarios: LockScenario[];
}

export interface MortgageRateLockOutputs {
  monthlyPayment: number;
  totalInterest: number;
  lockCost: number;
  potentialSavings: number;
  breakEvenDays: number;
  riskAnalysis: string;
  recommendations: string;
}

/**
 * Calculate mortgage rate lock analysis
 */
export function calculateRateLockAnalysis(inputs: MortgageRateLockInputs): MortgageRateLockOutputs {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    lockPeriod,
    lockFee = 0,
    lockExtensionFee = 0,
    processingTime,
    rateVolatility = 25,
    marketTrend = 'stable',
    propertyType = 'primary',
    loanType,
    creditScore = 750,
    downPayment = 0
  } = inputs;

  // Calculate monthly payment and total interest
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = parseInt(loanTerm) * 12;
  
  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalMonths);
  const totalInterest = calculateTotalInterest(loanAmount, monthlyRate, totalMonths);

  // Calculate rate lock costs
  const lockPeriodDays = parseInt(lockPeriod);
  const extensionDays = Math.max(0, processingTime - lockPeriodDays);
  const extensionCost = extensionDays * lockExtensionFee;
  const totalLockCost = lockFee + extensionCost;

  // Calculate potential savings from rate increase
  const potentialSavings = calculatePotentialSavings(
    loanAmount,
    interestRate,
    rateVolatility,
    marketTrend,
    processingTime,
    totalMonths
  );

  // Calculate break-even days
  const breakEvenDays = calculateBreakEvenDays(totalLockCost, potentialSavings, processingTime);

  // Generate risk analysis
  const riskAnalysis = generateRiskAnalysis(
    inputs,
    totalLockCost,
    potentialSavings,
    breakEvenDays
  );

  // Generate recommendations
  const recommendations = generateRecommendations(
    inputs,
    totalLockCost,
    potentialSavings,
    breakEvenDays
  );

  return {
    monthlyPayment,
    totalInterest,
    lockCost: totalLockCost,
    potentialSavings,
    breakEvenDays,
    riskAnalysis,
    recommendations
  };
}

/**
 * Calculate monthly mortgage payment
 */
function calculateMonthlyPayment(loanAmount: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) {
    return loanAmount / totalMonths;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

/**
 * Calculate total interest paid
 */
function calculateTotalInterest(loanAmount: number, monthlyRate: number, totalMonths: number): number {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalMonths);
  return (monthlyPayment * totalMonths) - loanAmount;
}

/**
 * Calculate potential savings from rate increase
 */
function calculatePotentialSavings(
  loanAmount: number,
  currentRate: number,
  rateVolatility: number,
  marketTrend: string,
  processingTime: number,
  totalMonths: number
): number {
  // Calculate expected rate increase based on volatility and trend
  let expectedRateIncrease = 0;
  
  switch (marketTrend) {
    case 'rising':
      expectedRateIncrease = (rateVolatility / 100) * (processingTime / 30); // Monthly volatility
      break;
    case 'falling':
      expectedRateIncrease = -(rateVolatility / 100) * (processingTime / 30);
      break;
    case 'stable':
    default:
      expectedRateIncrease = (rateVolatility / 100) * (processingTime / 30) * 0.5; // Half volatility
      break;
  }

  // Ensure rate increase is reasonable
  expectedRateIncrease = Math.max(-2, Math.min(2, expectedRateIncrease));
  
  const newRate = currentRate + expectedRateIncrease;
  const newMonthlyRate = newRate / 100 / 12;
  
  const currentMonthlyPayment = calculateMonthlyPayment(loanAmount, currentRate / 100 / 12, totalMonths);
  const newMonthlyPayment = calculateMonthlyPayment(loanAmount, newMonthlyRate, totalMonths);
  
  const monthlyDifference = newMonthlyPayment - currentMonthlyPayment;
  const totalSavings = monthlyDifference * totalMonths;
  
  return Math.max(0, totalSavings);
}

/**
 * Calculate break-even days for rate lock cost
 */
function calculateBreakEvenDays(lockCost: number, potentialSavings: number, processingTime: number): number {
  if (potentialSavings <= 0) {
    return processingTime; // Never break even if no potential savings
  }
  
  const dailySavings = potentialSavings / processingTime;
  const breakEvenDays = lockCost / dailySavings;
  
  return Math.min(breakEvenDays, processingTime);
}

/**
 * Generate risk analysis
 */
function generateRiskAnalysis(
  inputs: MortgageRateLockInputs,
  lockCost: number,
  potentialSavings: number,
  breakEvenDays: number
): string {
  const { marketTrend = 'stable', rateVolatility = 25, processingTime } = inputs;
  
  let analysis = `## Rate Lock Risk Analysis\n\n`;
  
  // Cost analysis
  analysis += `### Cost Analysis\n`;
  analysis += `- **Total Lock Cost:** $${lockCost.toLocaleString()}\n`;
  analysis += `- **Potential Savings:** $${potentialSavings.toLocaleString()}\n`;
  analysis += `- **Break-Even Days:** ${breakEvenDays.toFixed(1)} days\n\n`;
  
  // Risk assessment
  analysis += `### Risk Assessment\n`;
  
  if (marketTrend === 'rising') {
    analysis += `- **Market Trend:** Rising rates increase the value of rate locks\n`;
    analysis += `- **Risk Level:** ${potentialSavings > lockCost * 2 ? 'Low' : potentialSavings > lockCost ? 'Medium' : 'High'}\n`;
  } else if (marketTrend === 'falling') {
    analysis += `- **Market Trend:** Falling rates reduce the value of rate locks\n`;
    analysis += `- **Risk Level:** High (rates may decrease, making lock unnecessary)\n`;
  } else {
    analysis += `- **Market Trend:** Stable rates provide moderate protection value\n`;
    analysis += `- **Risk Level:** Medium\n`;
  }
  
  // Volatility impact
  if (rateVolatility > 50) {
    analysis += `- **Volatility:** High volatility increases rate lock value\n`;
  } else if (rateVolatility > 25) {
    analysis += `- **Volatility:** Moderate volatility provides reasonable protection\n`;
  } else {
    analysis += `- **Volatility:** Low volatility reduces rate lock necessity\n`;
  }
  
  // Processing time impact
  if (processingTime > parseInt(inputs.lockPeriod)) {
    analysis += `- **Processing Time:** Exceeds lock period - extension fees apply\n`;
  } else {
    analysis += `- **Processing Time:** Within lock period - no extension needed\n`;
  }
  
  return analysis;
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  inputs: MortgageRateLockInputs,
  lockCost: number,
  potentialSavings: number,
  breakEvenDays: number
): string {
  const { marketTrend = 'stable', processingTime, lockPeriod } = inputs;
  
  let recommendations = `## Rate Lock Recommendations\n\n`;
  
  // Overall recommendation
  if (potentialSavings > lockCost * 2) {
    recommendations += `### Strong Recommendation: Lock the Rate\n`;
    recommendations += `The potential savings significantly outweigh the lock cost.\n\n`;
  } else if (potentialSavings > lockCost) {
    recommendations += `### Moderate Recommendation: Consider Rate Lock\n`;
    recommendations += `The potential savings exceed the lock cost, but the margin is modest.\n\n`;
  } else {
    recommendations += `### Weak Recommendation: Rate Lock May Not Be Worthwhile\n`;
    recommendations += `The lock cost exceeds potential savings.\n\n`;
  }
  
  // Market-specific recommendations
  recommendations += `### Market-Specific Advice\n\n`;
  
  switch (marketTrend) {
    case 'rising':
      recommendations += `**Rising Rate Environment:**\n`;
      recommendations += `- Rate locks provide strong protection\n`;
      recommendations += `- Consider longer lock periods if processing time is uncertain\n`;
      recommendations += `- Monitor rate trends closely\n\n`;
      break;
      
    case 'falling':
      recommendations += `**Falling Rate Environment:**\n`;
      recommendations += `- Rate locks may limit your ability to benefit from rate decreases\n`;
      recommendations += `- Consider shorter lock periods or floating rates\n`;
      recommendations += `- Be prepared to pay extension fees if needed\n\n`;
      break;
      
    case 'stable':
    default:
      recommendations += `**Stable Rate Environment:**\n`;
      recommendations += `- Rate locks provide moderate protection\n`;
      recommendations += `- Standard lock periods should be sufficient\n`;
      recommendations += `- Focus on minimizing lock costs\n\n`;
      break;
  }
  
  // Processing time recommendations
  if (processingTime > parseInt(lockPeriod)) {
    recommendations += `### Processing Time Considerations\n`;
    recommendations += `- Your expected processing time (${processingTime} days) exceeds the lock period (${lockPeriod} days)\n`;
    recommendations += `- Budget for extension fees: $${(processingTime - parseInt(lockPeriod)) * (inputs.lockExtensionFee || 0)}\n`;
    recommendations += `- Consider a longer initial lock period if available\n\n`;
  }
  
  // Break-even analysis
  recommendations += `### Break-Even Analysis\n`;
  if (breakEvenDays < processingTime) {
    recommendations += `- Lock cost breaks even in ${breakEvenDays.toFixed(1)} days\n`;
    recommendations += `- Processing time is ${processingTime} days\n`;
    recommendations += `- **Net benefit:** $${(potentialSavings - lockCost).toLocaleString()}\n\n`;
  } else {
    recommendations += `- Lock cost does not break even within processing time\n`;
    recommendations += `- Consider whether the protection is worth the cost\n\n`;
  }
  
  return recommendations;
}

/**
 * Analyze different lock strategies
 */
export function analyzeLockStrategies(inputs: MortgageRateLockInputs): LockScenario[] {
  const scenarios: LockScenario[] = [];
  
  // Current scenario
  const current = calculateRateLockAnalysis(inputs);
  scenarios.push({
    scenario: 'Current Lock Period',
    lockPeriod: parseInt(inputs.lockPeriod),
    lockCost: current.lockCost,
    potentialSavings: current.potentialSavings,
    breakEvenDays: current.breakEvenDays,
    riskLevel: determineRiskLevel(current.potentialSavings, current.lockCost),
    recommendation: current.potentialSavings > current.lockCost ? 'Recommended' : 'Not Recommended'
  });
  
  // Shorter lock period
  const shorterPeriod = Math.max(15, parseInt(inputs.lockPeriod) - 15);
  const shorterInputs = { ...inputs, lockPeriod: shorterPeriod.toString() };
  const shorterAnalysis = calculateRateLockAnalysis(shorterInputs);
  scenarios.push({
    scenario: 'Shorter Lock Period',
    lockPeriod: shorterPeriod,
    lockCost: shorterAnalysis.lockCost,
    potentialSavings: shorterAnalysis.potentialSavings,
    breakEvenDays: shorterAnalysis.breakEvenDays,
    riskLevel: determineRiskLevel(shorterAnalysis.potentialSavings, shorterAnalysis.lockCost),
    recommendation: shorterAnalysis.potentialSavings > shorterAnalysis.lockCost ? 'Consider' : 'Not Recommended'
  });
  
  // Longer lock period
  const longerPeriod = Math.min(120, parseInt(inputs.lockPeriod) + 30);
  const longerInputs = { ...inputs, lockPeriod: longerPeriod.toString() };
  const longerAnalysis = calculateRateLockAnalysis(longerInputs);
  scenarios.push({
    scenario: 'Longer Lock Period',
    lockPeriod: longerPeriod,
    lockCost: longerAnalysis.lockCost,
    potentialSavings: longerAnalysis.potentialSavings,
    breakEvenDays: longerAnalysis.breakEvenDays,
    riskLevel: determineRiskLevel(longerAnalysis.potentialSavings, longerAnalysis.lockCost),
    recommendation: longerAnalysis.potentialSavings > longerAnalysis.lockCost ? 'Strongly Recommended' : 'Consider'
  });
  
  return scenarios;
}

/**
 * Calculate different lock scenarios
 */
export function calculateLockScenarios(inputs: MortgageRateLockInputs): {
  scenarios: LockScenario[];
  bestScenario: LockScenario;
  worstScenario: LockScenario;
} {
  const strategies = analyzeLockStrategies(inputs);
  
  // Sort by potential savings to cost ratio
  strategies.sort((a, b) => {
    const ratioA = a.potentialSavings / Math.max(a.lockCost, 1);
    const ratioB = b.potentialSavings / Math.max(b.lockCost, 1);
    return ratioB - ratioA;
  });
  
  return {
    scenarios: strategies,
    bestScenario: strategies[0],
    worstScenario: strategies[strategies.length - 1]
  };
}

/**
 * Determine risk level based on potential savings vs lock cost
 */
function determineRiskLevel(potentialSavings: number, lockCost: number): 'low' | 'medium' | 'high' {
  const ratio = potentialSavings / Math.max(lockCost, 1);
  
  if (ratio >= 2) return 'low';
  if (ratio >= 1) return 'medium';
  return 'high';
}