import { MortgageRateLockInputs } from './validation';

export interface RateLockResult {
  lockDecision: string;
  monthlyPaymentDifference: number;
  totalInterestDifference: number;
  breakEvenDays: number;
  extensionRisk: 'low' | 'medium' | 'high';
  extensionCost: number;
  lockValue: number;
  riskAssessment: 'low' | 'medium' | 'high';
  recommendations: string[];
  scenarioAnalysis: {
    risingRates: { savings: number; risk: string };
    fallingRates: { cost: number; risk: string };
    stableRates: { value: number; recommendation: string };
    volatileRates: { expectedValue: number; risk: string };
  };
  costBreakdown: {
    lockFee: number;
    potentialExtensions: number;
    floatDownOpportunity: number;
    breakLockPenalty: number;
    totalCosts: number;
    totalSavings: number;
    netValue: number;
  };
  timelineAnalysis: {
    daysToClosing: number;
    extensionProbability: number;
    optimalLockDuration: number;
    criticalDates: string[];
    riskFactors: string[];
  };
}

export const calculateMortgageRateLock = (inputs: MortgageRateLockInputs): RateLockResult => {
  const {
    currentRate,
    lockRate,
    loanAmount,
    loanTerm,
    lockDuration,
    lockFee,
    extensionFee,
    expectedClosingDate,
    lockStartDate,
    rateVolatility = 0.1,
    marketTrend = 'stable',
    lockType,
    floatDownThreshold = 0.25,
    floatDownFee = 250,
    breakLockPenalty,
    processingTime,
    includeExtensionRisk = true,
    includeMarketScenarios = true,
    includeBreakEvenAnalysis = true
  } = inputs;

  // Calculate monthly payments
  const currentMonthlyRate = currentRate / 100 / 12;
  const lockMonthlyRate = lockRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  const currentMonthlyPayment = loanAmount * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, totalPayments)) / 
                               (Math.pow(1 + currentMonthlyRate, totalPayments) - 1);
  
  const lockMonthlyPayment = loanAmount * (lockMonthlyRate * Math.pow(1 + lockMonthlyRate, totalPayments)) / 
                            (Math.pow(1 + lockMonthlyRate, totalPayments) - 1);

  // Calculate differences
  const monthlyPaymentDifference = lockMonthlyPayment - currentMonthlyPayment;
  const totalInterestDifference = (lockMonthlyPayment * totalPayments - loanAmount) - 
                                 (currentMonthlyPayment * totalPayments - loanAmount);

  // Calculate break-even days
  const breakEvenDays = monthlyPaymentDifference < 0 ? 
    Math.abs(lockFee / monthlyPaymentDifference) : 
    Infinity;

  // Calculate days to closing
  const lockStart = new Date(lockStartDate);
  const closingDate = new Date(expectedClosingDate);
  const daysToClosing = Math.ceil((closingDate.getTime() - lockStart.getTime()) / (1000 * 60 * 60 * 24));

  // Extension risk analysis
  let extensionRisk: 'low' | 'medium' | 'high' = 'low';
  let extensionCost = 0;
  let extensionProbability = 0.1;

  if (includeExtensionRisk) {
    if (daysToClosing > lockDuration) {
      const extensionDays = daysToClosing - lockDuration;
      extensionCost = extensionDays * extensionFee;
      extensionProbability = Math.min(0.9, extensionDays / 30);
      
      if (extensionDays <= 7) {
        extensionRisk = 'low';
      } else if (extensionDays <= 14) {
        extensionRisk = 'medium';
      } else {
        extensionRisk = 'high';
      }
    } else if (daysToClosing > lockDuration * 0.8) {
      extensionRisk = 'medium';
      extensionProbability = 0.3;
    }
  }

  // Calculate lock value
  let lockValue = -lockFee - extensionCost;
  
  if (monthlyPaymentDifference < 0) {
    lockValue += Math.abs(monthlyPaymentDifference) * 12 * 5; // 5 years of savings
  }

  // Risk assessment
  let riskAssessment: 'low' | 'medium' | 'high' = 'low';
  
  if (extensionRisk === 'high' || Math.abs(lockRate - currentRate) > 1) {
    riskAssessment = 'high';
  } else if (extensionRisk === 'medium' || Math.abs(lockRate - currentRate) > 0.5) {
    riskAssessment = 'medium';
  }

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (lockRate > currentRate + 0.25) {
    recommendations.push('Consider waiting for better rates before locking');
  }
  
  if (extensionRisk === 'high') {
    recommendations.push('Consider longer lock duration or faster processing');
  }
  
  if (lockType === 'float-down' && currentRate > lockRate + floatDownThreshold) {
    recommendations.push('Float-down option may be valuable if rates continue to fall');
  }
  
  if (breakEvenDays < 30 && monthlyPaymentDifference < 0) {
    recommendations.push('Lock appears favorable - break-even in less than 30 days');
  }

  // Scenario analysis
  const scenarioAnalysis = {
    risingRates: {
      savings: lockRate < currentRate ? Math.abs(totalInterestDifference) : 0,
      risk: lockRate > currentRate ? 'High - locked at higher rate' : 'Low - protected from increases'
    },
    fallingRates: {
      cost: lockRate > currentRate ? totalInterestDifference : 0,
      risk: lockRate < currentRate ? 'Low - locked at lower rate' : 'High - missing rate decreases'
    },
    stableRates: {
      value: -lockFee - extensionCost,
      recommendation: extensionRisk === 'low' ? 'Consider floating' : 'Lock for certainty'
    },
    volatileRates: {
      expectedValue: lockValue * 0.7, // Conservative estimate
      risk: 'High - market uncertainty'
    }
  };

  // Cost breakdown
  const costBreakdown = {
    lockFee,
    potentialExtensions: extensionCost,
    floatDownOpportunity: lockType === 'float-down' ? floatDownFee : 0,
    breakLockPenalty,
    totalCosts: lockFee + extensionCost + (lockType === 'float-down' ? floatDownFee : 0),
    totalSavings: monthlyPaymentDifference < 0 ? Math.abs(monthlyPaymentDifference) * 12 * 5 : 0,
    netValue: lockValue
  };

  // Timeline analysis
  const timelineAnalysis = {
    daysToClosing,
    extensionProbability,
    optimalLockDuration: Math.max(lockDuration, daysToClosing + 7),
    criticalDates: [
      `Lock expires: ${new Date(lockStart.getTime() + lockDuration * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
      `Target closing: ${closingDate.toLocaleDateString()}`,
      `Processing deadline: ${new Date(closingDate.getTime() - processingTime * 24 * 60 * 60 * 1000).toLocaleDateString()}`
    ],
    riskFactors: []
  };

  if (daysToClosing > lockDuration) {
    timelineAnalysis.riskFactors.push('Closing date exceeds lock duration');
  }
  if (processingTime > lockDuration * 0.7) {
    timelineAnalysis.riskFactors.push('Processing time may require extension');
  }
  if (rateVolatility > 0.5) {
    timelineAnalysis.riskFactors.push('High rate volatility increases risk');
  }

  // Determine lock decision
  let lockDecision = 'FLOAT';
  
  if (lockValue > 0 && riskAssessment !== 'high') {
    lockDecision = 'LOCK';
  } else if (lockRate < currentRate - 0.25 && extensionRisk === 'low') {
    lockDecision = 'LOCK';
  } else if (marketTrend === 'rising' && lockRate <= currentRate) {
    lockDecision = 'LOCK';
  } else if (marketTrend === 'falling' && lockRate > currentRate + 0.5) {
    lockDecision = 'FLOAT';
  } else if (extensionRisk === 'high') {
    lockDecision = 'FLOAT';
  }

  return {
    lockDecision,
    monthlyPaymentDifference,
    totalInterestDifference,
    breakEvenDays,
    extensionRisk,
    extensionCost,
    lockValue,
    riskAssessment,
    recommendations,
    scenarioAnalysis,
    costBreakdown,
    timelineAnalysis
  };
};

export const generateMortgageRateLockAnalysis = (inputs: MortgageRateLockInputs, outputs: RateLockResult): string => {
  const { currentRate, lockRate, loanAmount, lockType, marketTrend } = inputs;
  const { lockDecision, monthlyPaymentDifference, totalInterestDifference, breakEvenDays, riskAssessment, lockValue } = outputs;

  let analysis = `## Mortgage Rate Lock Analysis\n\n`;

  // Lock Decision
  analysis += `### Lock Decision\n`;
  analysis += `**Recommendation:** ${lockDecision === 'LOCK' ? '🔒 LOCK THE RATE' : '🌊 FLOAT THE RATE'}\n\n`;

  // Rate Comparison
  analysis += `### Rate Comparison\n`;
  analysis += `- **Current Market Rate:** ${currentRate.toFixed(3)}%\n`;
  analysis += `- **Lock Rate:** ${lockRate.toFixed(3)}%\n`;
  analysis += `- **Rate Difference:** ${(lockRate - currentRate).toFixed(3)}%\n`;
  analysis += `- **Loan Amount:** $${loanAmount.toLocaleString()}\n\n`;

  // Financial Impact
  analysis += `### Financial Impact\n`;
  analysis += `- **Monthly Payment Difference:** $${Math.abs(monthlyPaymentDifference).toFixed(2)} ${monthlyPaymentDifference < 0 ? '(savings)' : '(cost)'}\n`;
  analysis += `- **Total Interest Difference:** $${Math.abs(totalInterestDifference).toLocaleString()} ${totalInterestDifference < 0 ? '(savings)' : '(cost)'}\n`;
  analysis += `- **Lock Value:** $${lockValue.toLocaleString()}\n`;
  if (breakEvenDays !== Infinity) {
    analysis += `- **Break-Even Days:** ${breakEvenDays.toFixed(0)} days\n`;
  }
  analysis += `\n`;

  // Risk Assessment
  analysis += `### Risk Assessment\n`;
  analysis += `- **Overall Risk:** ${riskAssessment.toUpperCase()}\n`;
  analysis += `- **Extension Risk:** ${outputs.extensionRisk.toUpperCase()}\n`;
  analysis += `- **Market Trend:** ${marketTrend.toUpperCase()}\n`;
  analysis += `- **Lock Type:** ${lockType.replace('-', ' ').toUpperCase()}\n\n`;

  // Recommendations
  if (outputs.recommendations.length > 0) {
    analysis += `### Recommendations\n`;
    outputs.recommendations.forEach((rec, index) => {
      analysis += `${index + 1}. ${rec}\n`;
    });
    analysis += `\n`;
  }

  // Timeline Analysis
  analysis += `### Timeline Analysis\n`;
  analysis += `- **Days to Closing:** ${outputs.timelineAnalysis.daysToClosing} days\n`;
  analysis += `- **Extension Probability:** ${(outputs.timelineAnalysis.extensionProbability * 100).toFixed(1)}%\n`;
  analysis += `- **Optimal Lock Duration:** ${outputs.timelineAnalysis.optimalLockDuration} days\n\n`;

  // Critical Dates
  analysis += `### Critical Dates\n`;
  outputs.timelineAnalysis.criticalDates.forEach(date => {
    analysis += `- ${date}\n`;
  });
  analysis += `\n`;

  // Risk Factors
  if (outputs.timelineAnalysis.riskFactors.length > 0) {
    analysis += `### Risk Factors\n`;
    outputs.timelineAnalysis.riskFactors.forEach(factor => {
      analysis += `- ⚠️ ${factor}\n`;
    });
  }

  return analysis;
};