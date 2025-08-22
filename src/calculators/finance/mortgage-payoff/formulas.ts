import { MortgagePayoffInputs } from './validation';

export interface PayoffResult {
  currentPayoffDate: string;
  acceleratedPayoffDate: string;
  yearsSaved: number;
  interestSaved: number;
  totalSavings: number;
  monthlyPaymentRequired: number;
  payoffAnalysis: PayoffAnalysis;
  scenarioComparison: ScenarioComparison;
  costBenefitAnalysis: CostBenefitAnalysis;
  recommendations: string;
  keyMetrics: KeyMetrics;
  mortgagePayoffAnalysis: string;
}

export interface PayoffAnalysis {
  currentScenario: PayoffScenario;
  acceleratedScenario: PayoffScenario;
  refinanceScenario?: PayoffScenario;
  lumpSumScenario?: PayoffScenario;
  biweeklyScenario?: PayoffScenario;
  payoffTimeline: PayoffTimeline;
  savingsBreakdown: SavingsBreakdown;
}

export interface PayoffScenario {
  name: string;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  payoffDate: string;
  yearsToPayoff: number;
  totalCost: number;
}

export interface PayoffTimeline {
  currentPayoff: number;
  acceleratedPayoff: number;
  yearsSaved: number;
  monthsSaved: number;
  payoffAcceleration: number;
}

export interface SavingsBreakdown {
  interestSavings: number;
  opportunityCost: number;
  taxBenefits: number;
  netSavings: number;
  refinanceSavings: number;
  lumpSumSavings: number;
}

export interface ScenarioComparison {
  scenarios: PayoffScenario[];
  bestScenario: string;
  costComparison: CostComparison;
  timelineComparison: TimelineComparison;
}

export interface CostComparison {
  currentTotal: number;
  acceleratedTotal: number;
  refinanceTotal?: number;
  lumpSumTotal?: number;
  biweeklyTotal?: number;
  bestValue: string;
}

export interface TimelineComparison {
  currentYears: number;
  acceleratedYears: number;
  refinanceYears?: number;
  lumpSumYears?: number;
  biweeklyYears?: number;
  fastestOption: string;
}

export interface CostBenefitAnalysis {
  totalInvestment: number;
  totalReturn: number;
  netBenefit: number;
  roi: number;
  breakEvenYears: number;
  paybackPeriod: number;
  valueAssessment: string;
}

export interface KeyMetrics {
  payoffAcceleration: number;
  interestReduction: number;
  costEfficiency: string;
  riskLevel: string;
  flexibilityScore: number;
}

export const calculateMortgagePayoff = (inputs: MortgagePayoffInputs): PayoffResult => {
  // Calculate current scenario
  const currentScenario = calculateCurrentScenario(inputs);
  
  // Calculate accelerated scenario
  const acceleratedScenario = calculateAcceleratedScenario(inputs);
  
  // Calculate refinance scenario if applicable
  const refinanceScenario = inputs.refinanceOption && inputs.refinanceOption !== 'No Refinance' 
    ? calculateRefinanceScenario(inputs) 
    : undefined;
  
  // Calculate lump sum scenario if applicable
  const lumpSumScenario = inputs.lumpSumPayment && inputs.lumpSumPayment > 0 
    ? calculateLumpSumScenario(inputs) 
    : undefined;
  
  // Calculate biweekly scenario if applicable
  const biweeklyScenario = inputs.biweeklyPayment 
    ? calculateBiweeklyScenario(inputs) 
    : undefined;
  
  // Analyze payoff timeline
  const payoffTimeline = analyzePayoffTimeline(currentScenario, acceleratedScenario);
  
  // Calculate savings breakdown
  const savingsBreakdown = calculateSavingsBreakdown(inputs, currentScenario, acceleratedScenario, refinanceScenario, lumpSumScenario);
  
  // Compare scenarios
  const scenarioComparison = compareScenarios(currentScenario, acceleratedScenario, refinanceScenario, lumpSumScenario, biweeklyScenario);
  
  // Analyze cost-benefit
  const costBenefitAnalysis = analyzeCostBenefit(inputs, currentScenario, acceleratedScenario);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, scenarioComparison, costBenefitAnalysis);
  
  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs, currentScenario, acceleratedScenario, scenarioComparison);
  
  // Generate comprehensive analysis
  const mortgagePayoffAnalysis = generateComprehensiveAnalysis(inputs, payoffTimeline, savingsBreakdown, scenarioComparison, costBenefitAnalysis);
  
  return {
    currentPayoffDate: currentScenario.payoffDate,
    acceleratedPayoffDate: acceleratedScenario.payoffDate,
    yearsSaved: payoffTimeline.yearsSaved,
    interestSaved: savingsBreakdown.interestSavings,
    totalSavings: savingsBreakdown.netSavings,
    monthlyPaymentRequired: acceleratedScenario.monthlyPayment,
    payoffAnalysis: {
      currentScenario,
      acceleratedScenario,
      refinanceScenario,
      lumpSumScenario,
      biweeklyScenario,
      payoffTimeline,
      savingsBreakdown
    },
    scenarioComparison,
    costBenefitAnalysis,
    recommendations,
    keyMetrics,
    mortgagePayoffAnalysis
  };
};

const calculateCurrentScenario = (inputs: MortgagePayoffInputs): PayoffScenario => {
  const loanAmount = inputs.loanAmount;
  const interestRate = inputs.interestRate / 100;
  const monthlyRate = interestRate / 12;
  const remainingTerm = inputs.remainingTerm || inputs.loanTerm;
  const totalPayments = remainingTerm * 12;
  
  // Calculate monthly payment if not provided
  let monthlyPayment = inputs.monthlyPayment;
  if (!monthlyPayment) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  
  const totalPaymentsMade = monthlyPayment * totalPayments;
  const totalInterest = totalPaymentsMade - loanAmount;
  
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + remainingTerm);
  
  return {
    name: 'Current Payment Plan',
    monthlyPayment,
    totalPayments: totalPaymentsMade,
    totalInterest,
    payoffDate: payoffDate.toISOString().split('T')[0],
    yearsToPayoff: remainingTerm,
    totalCost: totalPaymentsMade
  };
};

const calculateAcceleratedScenario = (inputs: MortgagePayoffInputs): PayoffScenario => {
  const loanAmount = inputs.loanAmount;
  const interestRate = inputs.interestRate / 100;
  const monthlyRate = interestRate / 12;
  const additionalPayment = inputs.additionalPayment || 0;
  const paymentIncrease = inputs.paymentIncrease || 0;
  
  // Calculate base monthly payment
  const remainingTerm = inputs.remainingTerm || inputs.loanTerm;
  const totalPayments = remainingTerm * 12;
  let baseMonthlyPayment = inputs.monthlyPayment;
  if (!baseMonthlyPayment) {
    baseMonthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  
  // Apply payment increase
  const increasedPayment = baseMonthlyPayment * (1 + paymentIncrease / 100);
  const totalMonthlyPayment = increasedPayment + additionalPayment;
  
  // Calculate payoff time with accelerated payments
  const payoffTime = calculatePayoffTime(loanAmount, monthlyRate, totalMonthlyPayment);
  const yearsToPayoff = payoffTime / 12;
  
  // Calculate total payments and interest
  const totalPaymentsMade = totalMonthlyPayment * payoffTime;
  const totalInterest = totalPaymentsMade - loanAmount;
  
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + yearsToPayoff);
  
  return {
    name: 'Accelerated Payment Plan',
    monthlyPayment: totalMonthlyPayment,
    totalPayments: totalPaymentsMade,
    totalInterest,
    payoffDate: payoffDate.toISOString().split('T')[0],
    yearsToPayoff,
    totalCost: totalPaymentsMade
  };
};

const calculateRefinanceScenario = (inputs: MortgagePayoffInputs): PayoffScenario => {
  const loanAmount = inputs.loanAmount;
  const refinanceRate = (inputs.refinanceRate || inputs.interestRate) / 100;
  const monthlyRate = refinanceRate / 12;
  const refinanceTerm = inputs.refinanceTerm || inputs.loanTerm;
  const totalPayments = refinanceTerm * 12;
  const closingCosts = inputs.refinanceClosingCosts || 0;
  
  // Calculate new monthly payment
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const totalPaymentsMade = monthlyPayment * totalPayments;
  const totalInterest = totalPaymentsMade - loanAmount;
  const totalCost = totalPaymentsMade + closingCosts;
  
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + refinanceTerm);
  
  return {
    name: 'Refinance Option',
    monthlyPayment,
    totalPayments: totalPaymentsMade,
    totalInterest,
    payoffDate: payoffDate.toISOString().split('T')[0],
    yearsToPayoff: refinanceTerm,
    totalCost
  };
};

const calculateLumpSumScenario = (inputs: MortgagePayoffInputs): PayoffScenario => {
  const loanAmount = inputs.loanAmount;
  const lumpSumPayment = inputs.lumpSumPayment || 0;
  const remainingLoanAmount = loanAmount - lumpSumPayment;
  const interestRate = inputs.interestRate / 100;
  const monthlyRate = interestRate / 12;
  const remainingTerm = inputs.remainingTerm || inputs.loanTerm;
  const totalPayments = remainingTerm * 12;
  
  // Calculate monthly payment for remaining balance
  let monthlyPayment = inputs.monthlyPayment;
  if (!monthlyPayment) {
    monthlyPayment = (remainingLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  
  const totalPaymentsMade = monthlyPayment * totalPayments + lumpSumPayment;
  const totalInterest = totalPaymentsMade - loanAmount;
  
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + remainingTerm);
  
  return {
    name: 'Lump Sum Payment',
    monthlyPayment,
    totalPayments: totalPaymentsMade,
    totalInterest,
    payoffDate: payoffDate.toISOString().split('T')[0],
    yearsToPayoff: remainingTerm,
    totalCost: totalPaymentsMade
  };
};

const calculateBiweeklyScenario = (inputs: MortgagePayoffInputs): PayoffScenario => {
  const loanAmount = inputs.loanAmount;
  const interestRate = inputs.interestRate / 100;
  const monthlyRate = interestRate / 12;
  const remainingTerm = inputs.remainingTerm || inputs.loanTerm;
  const totalPayments = remainingTerm * 12;
  
  // Calculate monthly payment
  let monthlyPayment = inputs.monthlyPayment;
  if (!monthlyPayment) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  
  // Biweekly payment is half of monthly payment
  const biweeklyPayment = monthlyPayment / 2;
  
  // Calculate payoff time with biweekly payments (26 payments per year)
  const payoffTime = calculatePayoffTime(loanAmount, monthlyRate, biweeklyPayment * 26 / 12);
  const yearsToPayoff = payoffTime / 12;
  
  const totalPaymentsMade = biweeklyPayment * 26 * yearsToPayoff;
  const totalInterest = totalPaymentsMade - loanAmount;
  
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + yearsToPayoff);
  
  return {
    name: 'Biweekly Payment Plan',
    monthlyPayment: biweeklyPayment * 26 / 12, // Average monthly equivalent
    totalPayments: totalPaymentsMade,
    totalInterest,
    payoffDate: payoffDate.toISOString().split('T')[0],
    yearsToPayoff,
    totalCost: totalPaymentsMade
  };
};

const calculatePayoffTime = (loanAmount: number, monthlyRate: number, monthlyPayment: number): number => {
  if (monthlyPayment <= loanAmount * monthlyRate) {
    return Infinity; // Payment too low to ever pay off
  }
  
  return Math.log(monthlyPayment / (monthlyPayment - loanAmount * monthlyRate)) / Math.log(1 + monthlyRate);
};

const analyzePayoffTimeline = (currentScenario: PayoffScenario, acceleratedScenario: PayoffScenario): PayoffTimeline => {
  const currentPayoff = currentScenario.yearsToPayoff;
  const acceleratedPayoff = acceleratedScenario.yearsToPayoff;
  const yearsSaved = currentPayoff - acceleratedPayoff;
  const monthsSaved = yearsSaved * 12;
  const payoffAcceleration = ((currentPayoff - acceleratedPayoff) / currentPayoff) * 100;
  
  return {
    currentPayoff,
    acceleratedPayoff,
    yearsSaved,
    monthsSaved,
    payoffAcceleration
  };
};

const calculateSavingsBreakdown = (inputs: MortgagePayoffInputs, currentScenario: PayoffScenario, acceleratedScenario: PayoffScenario, refinanceScenario?: PayoffScenario, lumpSumScenario?: PayoffScenario): SavingsBreakdown => {
  const interestSavings = currentScenario.totalInterest - acceleratedScenario.totalInterest;
  
  // Calculate opportunity cost
  let opportunityCost = 0;
  if (inputs.includeOpportunityCost && inputs.investmentReturn) {
    const additionalPayments = acceleratedScenario.totalPayments - currentScenario.totalPayments;
    const investmentReturn = inputs.investmentReturn / 100;
    const timePeriod = acceleratedScenario.yearsToPayoff;
    opportunityCost = additionalPayments * Math.pow(1 + investmentReturn, timePeriod) - additionalPayments;
  }
  
  // Calculate tax benefits
  let taxBenefits = 0;
  if (inputs.includeTaxBenefits && inputs.taxRate) {
    const taxRate = inputs.taxRate / 100;
    taxBenefits = (currentScenario.totalInterest - acceleratedScenario.totalInterest) * taxRate;
  }
  
  // Calculate refinance savings
  let refinanceSavings = 0;
  if (refinanceScenario) {
    refinanceSavings = currentScenario.totalInterest - refinanceScenario.totalInterest;
  }
  
  // Calculate lump sum savings
  let lumpSumSavings = 0;
  if (lumpSumScenario) {
    lumpSumSavings = currentScenario.totalInterest - lumpSumScenario.totalInterest;
  }
  
  const netSavings = interestSavings - opportunityCost + taxBenefits;
  
  return {
    interestSavings,
    opportunityCost,
    taxBenefits,
    netSavings,
    refinanceSavings,
    lumpSumSavings
  };
};

const compareScenarios = (currentScenario: PayoffScenario, acceleratedScenario: PayoffScenario, refinanceScenario?: PayoffScenario, lumpSumScenario?: PayoffScenario, biweeklyScenario?: PayoffScenario): ScenarioComparison => {
  const scenarios = [currentScenario, acceleratedScenario];
  if (refinanceScenario) scenarios.push(refinanceScenario);
  if (lumpSumScenario) scenarios.push(lumpSumScenario);
  if (biweeklyScenario) scenarios.push(biweeklyScenario);
  
  // Find best scenario by total cost
  const bestScenario = scenarios.reduce((best, current) => 
    current.totalCost < best.totalCost ? current : best
  ).name;
  
  const costComparison = {
    currentTotal: currentScenario.totalCost,
    acceleratedTotal: acceleratedScenario.totalCost,
    refinanceTotal: refinanceScenario?.totalCost,
    lumpSumTotal: lumpSumScenario?.totalCost,
    biweeklyTotal: biweeklyScenario?.totalCost,
    bestValue: bestScenario
  };
  
  const timelineComparison = {
    currentYears: currentScenario.yearsToPayoff,
    acceleratedYears: acceleratedScenario.yearsToPayoff,
    refinanceYears: refinanceScenario?.yearsToPayoff,
    lumpSumYears: lumpSumScenario?.yearsToPayoff,
    biweeklyYears: biweeklyScenario?.yearsToPayoff,
    fastestOption: scenarios.reduce((fastest, current) => 
      current.yearsToPayoff < fastest.yearsToPayoff ? current : fastest
    ).name
  };
  
  return {
    scenarios,
    bestScenario,
    costComparison,
    timelineComparison
  };
};

const analyzeCostBenefit = (inputs: MortgagePayoffInputs, currentScenario: PayoffScenario, acceleratedScenario: PayoffScenario): CostBenefitAnalysis => {
  const totalInvestment = acceleratedScenario.totalPayments - currentScenario.totalPayments;
  const totalReturn = currentScenario.totalInterest - acceleratedScenario.totalInterest;
  const netBenefit = totalReturn - totalInvestment;
  const roi = totalInvestment > 0 ? (netBenefit / totalInvestment) * 100 : 0;
  
  // Calculate break-even years
  const breakEvenYears = totalInvestment > 0 ? totalInvestment / (totalReturn / acceleratedScenario.yearsToPayoff) : 0;
  const paybackPeriod = breakEvenYears;
  
  let valueAssessment = 'Poor';
  if (roi > 50) valueAssessment = 'Excellent';
  else if (roi > 20) valueAssessment = 'Good';
  else if (roi > 0) valueAssessment = 'Fair';
  
  return {
    totalInvestment,
    totalReturn,
    netBenefit,
    roi,
    breakEvenYears,
    paybackPeriod,
    valueAssessment
  };
};

const generateRecommendations = (inputs: MortgagePayoffInputs, scenarioComparison: ScenarioComparison, costBenefitAnalysis: CostBenefitAnalysis): string => {
  const recommendations: string[] = [];
  
  if (costBenefitAnalysis.roi > 20) {
    recommendations.push('Accelerated payments provide excellent return on investment. Consider increasing your monthly payment.');
  } else if (costBenefitAnalysis.roi > 0) {
    recommendations.push('Accelerated payments provide positive returns. Consider if the payoff timeline fits your goals.');
  } else {
    recommendations.push('Consider the opportunity cost of accelerated payments versus other investment options.');
  }
  
  if (scenarioComparison.bestScenario !== 'Current Payment Plan') {
    recommendations.push(`${scenarioComparison.bestScenario} appears to be the most cost-effective option.`);
  }
  
  if (inputs.refinanceOption && inputs.refinanceOption !== 'No Refinance') {
    recommendations.push('Refinancing may provide significant savings. Compare rates and closing costs carefully.');
  }
  
  if (inputs.lumpSumPayment && inputs.lumpSumPayment > 0) {
    recommendations.push('Lump sum payments can significantly reduce payoff time and interest costs.');
  }
  
  if (inputs.biweeklyPayment) {
    recommendations.push('Biweekly payments can accelerate payoff without significantly increasing monthly burden.');
  }
  
  if (inputs.payoffGoal && inputs.payoffGoal < inputs.remainingTerm) {
    const requiredPayment = calculateRequiredPaymentForGoal(inputs);
    recommendations.push(`To meet your ${inputs.payoffGoal}-year payoff goal, consider increasing your monthly payment to $${requiredPayment.toFixed(2)}.`);
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Your current payment plan appears optimal for your situation.');
  }
  
  return recommendations.join(' ');
};

const calculateRequiredPaymentForGoal = (inputs: MortgagePayoffInputs): number => {
  const loanAmount = inputs.loanAmount;
  const interestRate = inputs.interestRate / 100;
  const monthlyRate = interestRate / 12;
  const payoffGoal = inputs.payoffGoal || inputs.remainingTerm;
  const totalPayments = payoffGoal * 12;
  
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
};

const calculateKeyMetrics = (inputs: MortgagePayoffInputs, currentScenario: PayoffScenario, acceleratedScenario: PayoffScenario, scenarioComparison: ScenarioComparison): KeyMetrics => {
  const payoffAcceleration = ((currentScenario.yearsToPayoff - acceleratedScenario.yearsToPayoff) / currentScenario.yearsToPayoff) * 100;
  const interestReduction = ((currentScenario.totalInterest - acceleratedScenario.totalInterest) / currentScenario.totalInterest) * 100;
  
  let costEfficiency = 'Poor';
  if (interestReduction > 30) costEfficiency = 'Excellent';
  else if (interestReduction > 15) costEfficiency = 'Good';
  else if (interestReduction > 5) costEfficiency = 'Fair';
  
  let riskLevel = 'Low';
  if (acceleratedScenario.monthlyPayment > currentScenario.monthlyPayment * 1.5) riskLevel = 'High';
  else if (acceleratedScenario.monthlyPayment > currentScenario.monthlyPayment * 1.2) riskLevel = 'Moderate';
  
  const flexibilityScore = Math.max(0, 100 - (payoffAcceleration * 2)); // Higher acceleration = lower flexibility
  
  return {
    payoffAcceleration,
    interestReduction,
    costEfficiency,
    riskLevel,
    flexibilityScore
  };
};

const generateComprehensiveAnalysis = (inputs: MortgagePayoffInputs, payoffTimeline: PayoffTimeline, savingsBreakdown: SavingsBreakdown, scenarioComparison: ScenarioComparison, costBenefitAnalysis: CostBenefitAnalysis): string => {
  let analysis = `# Mortgage Payoff Analysis Report\n\n`;
  
  analysis += `## Current Situation\n`;
  analysis += `- **Current Loan Balance:** $${inputs.loanAmount.toLocaleString()}\n`;
  analysis += `- **Interest Rate:** ${inputs.interestRate}%\n`;
  analysis += `- **Current Payoff Date:** ${scenarioComparison.scenarios[0].payoffDate}\n`;
  analysis += `- **Years Remaining:** ${scenarioComparison.scenarios[0].yearsToPayoff}\n\n`;
  
  analysis += `## Accelerated Payoff Results\n`;
  analysis += `- **Accelerated Payoff Date:** ${scenarioComparison.scenarios[1].payoffDate}\n`;
  analysis += `- **Years Saved:** ${payoffTimeline.yearsSaved.toFixed(1)}\n`;
  analysis += `- **Interest Saved:** $${savingsBreakdown.interestSavings.toLocaleString()}\n`;
  analysis += `- **Payoff Acceleration:** ${payoffTimeline.payoffAcceleration.toFixed(1)}%\n\n`;
  
  analysis += `## Cost-Benefit Analysis\n`;
  analysis += `- **Total Investment:** $${costBenefitAnalysis.totalInvestment.toLocaleString()}\n`;
  analysis += `- **Total Return:** $${costBenefitAnalysis.totalReturn.toLocaleString()}\n`;
  analysis += `- **Net Benefit:** $${costBenefitAnalysis.netBenefit.toLocaleString()}\n`;
  analysis += `- **ROI:** ${costBenefitAnalysis.roi.toFixed(1)}%\n`;
  analysis += `- **Break-even Years:** ${costBenefitAnalysis.breakEvenYears.toFixed(1)}\n`;
  analysis += `- **Value Assessment:** ${costBenefitAnalysis.valueAssessment}\n\n`;
  
  analysis += `## Savings Breakdown\n`;
  analysis += `- **Interest Savings:** $${savingsBreakdown.interestSavings.toLocaleString()}\n`;
  analysis += `- **Opportunity Cost:** $${savingsBreakdown.opportunityCost.toLocaleString()}\n`;
  analysis += `- **Tax Benefits:** $${savingsBreakdown.taxBenefits.toLocaleString()}\n`;
  analysis += `- **Net Savings:** $${savingsBreakdown.netSavings.toLocaleString()}\n\n`;
  
  if (scenarioComparison.scenarios.length > 2) {
    analysis += `## Scenario Comparison\n`;
    analysis += `- **Best Value:** ${scenarioComparison.bestScenario}\n`;
    analysis += `- **Fastest Payoff:** ${scenarioComparison.timelineComparison.fastestOption}\n`;
    analysis += `- **Lowest Total Cost:** ${scenarioComparison.costComparison.bestValue}\n\n`;
  }
  
  analysis += `## Key Recommendations\n`;
  analysis += `${generateRecommendations(inputs, scenarioComparison, costBenefitAnalysis)}\n\n`;
  
  analysis += `## Next Steps\n`;
  analysis += `1. **Review Budget:** Ensure accelerated payments fit your budget\n`;
  analysis += `2. **Contact Lender:** Verify prepayment policies and procedures\n`;
  analysis += `3. **Set Up Automatic Payments:** Consider automatic extra payments\n`;
  analysis += `4. **Monitor Progress:** Track payoff timeline and savings\n`;
  analysis += `5. **Reassess Annually:** Review strategy as circumstances change\n`;
  
  return analysis;
};

export const generateMortgagePayoffAnalysis = (inputs: MortgagePayoffInputs, outputs: PayoffResult): string => {
  return outputs.mortgagePayoffAnalysis;
};