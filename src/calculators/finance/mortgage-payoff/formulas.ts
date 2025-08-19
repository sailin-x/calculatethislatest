export interface MortgagePayoffInputs {
  currentBalance: number;
  interestRate: number;
  remainingTerm: number;
  monthlyPayment: number;
  extraPayment?: number;
  lumpSumPayment?: number;
  payoffStrategy: string;
  targetPayoffDate?: string;
  propertyValue?: number;
  taxRate?: number;
  investmentReturn?: number;
  inflationRate?: number;
}

export interface PayoffScheduleEntry {
  month: number;
  date: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  cumulativeInterest: number;
}

export interface PayoffStrategy {
  name: string;
  payoffDate: string;
  totalInterest: number;
  interestSavings: number;
  timeSaved: number;
  monthlyPayment: number;
  payoffSchedule: PayoffScheduleEntry[];
  costBenefit: number;
}

export interface MortgagePayoffOutputs {
  payoffDate: string;
  totalInterest: number;
  interestSavings: number;
  timeSaved: number;
  monthlyPaymentNew: number;
  payoffSchedule: PayoffScheduleEntry[];
  costBenefitAnalysis: string;
  recommendations: string;
}

/**
 * Calculate mortgage payoff for different strategies
 */
export function calculateMortgagePayoff(inputs: MortgagePayoffInputs): MortgagePayoffOutputs {
  const {
    currentBalance,
    interestRate,
    remainingTerm,
    monthlyPayment,
    extraPayment = 0,
    lumpSumPayment = 0,
    payoffStrategy,
    propertyValue,
    taxRate = 22,
    investmentReturn = 7,
    inflationRate = 2.5
  } = inputs;

  // Apply lump sum payment if provided
  const adjustedBalance = currentBalance - lumpSumPayment;
  
  // Calculate monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Calculate standard payoff schedule
  const standardSchedule = calculateStandardPayoffSchedule(
    adjustedBalance,
    monthlyRate,
    remainingTerm * 12,
    monthlyPayment
  );
  
  // Calculate strategy-specific payoff
  let strategySchedule: PayoffScheduleEntry[];
  let newMonthlyPayment = monthlyPayment;
  
  switch (payoffStrategy) {
    case 'extra-monthly':
      strategySchedule = calculateExtraPaymentSchedule(
        adjustedBalance,
        monthlyRate,
        monthlyPayment + extraPayment
      );
      newMonthlyPayment = monthlyPayment + extraPayment;
      break;
      
    case 'biweekly':
      strategySchedule = calculateBiweeklySchedule(
        adjustedBalance,
        monthlyRate,
        monthlyPayment
      );
      newMonthlyPayment = monthlyPayment / 2; // Half payment every 2 weeks
      break;
      
    case 'lump-sum':
      strategySchedule = calculateLumpSumSchedule(
        adjustedBalance,
        monthlyRate,
        remainingTerm * 12,
        monthlyPayment,
        lumpSumPayment
      );
      break;
      
    case 'custom':
      strategySchedule = calculateCustomSchedule(
        adjustedBalance,
        monthlyRate,
        monthlyPayment,
        extraPayment,
        lumpSumPayment
      );
      newMonthlyPayment = monthlyPayment + extraPayment;
      break;
      
    default: // standard
      strategySchedule = standardSchedule;
      break;
  }
  
  // Calculate results
  const totalInterest = strategySchedule.reduce((sum, entry) => sum + entry.interest, 0);
  const standardTotalInterest = standardSchedule.reduce((sum, entry) => sum + entry.interest, 0);
  const interestSavings = standardTotalInterest - totalInterest;
  const timeSaved = (standardSchedule.length - strategySchedule.length) / 12;
  
  // Calculate payoff date
  const payoffDate = calculatePayoffDate(strategySchedule);
  
  // Generate cost-benefit analysis
  const costBenefitAnalysis = generateCostBenefitAnalysis(
    inputs,
    totalInterest,
    interestSavings,
    timeSaved,
    strategySchedule
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    inputs,
    totalInterest,
    interestSavings,
    timeSaved,
    strategySchedule
  );
  
  return {
    payoffDate,
    totalInterest,
    interestSavings,
    timeSaved,
    monthlyPaymentNew: newMonthlyPayment,
    payoffSchedule: strategySchedule,
    costBenefitAnalysis,
    recommendations
  };
}

/**
 * Calculate standard payoff schedule
 */
function calculateStandardPayoffSchedule(
  balance: number,
  monthlyRate: number,
  totalMonths: number,
  monthlyPayment: number
): PayoffScheduleEntry[] {
  const schedule: PayoffScheduleEntry[] = [];
  let currentBalance = balance;
  let cumulativeInterest = 0;
  const currentDate = new Date();
  
  for (let month = 1; month <= totalMonths && currentBalance > 0; month++) {
    const interest = currentBalance * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, currentBalance);
    const endingBalance = currentBalance - principal;
    
    cumulativeInterest += interest;
    
    const entry: PayoffScheduleEntry = {
      month,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + month - 1, 1).toISOString().split('T')[0],
      beginningBalance: currentBalance,
      payment: monthlyPayment,
      principal,
      interest,
      endingBalance,
      cumulativeInterest
    };
    
    schedule.push(entry);
    currentBalance = endingBalance;
    
    if (endingBalance <= 0) break;
  }
  
  return schedule;
}

/**
 * Calculate extra payment schedule
 */
function calculateExtraPaymentSchedule(
  balance: number,
  monthlyRate: number,
  totalPayment: number
): PayoffScheduleEntry[] {
  const schedule: PayoffScheduleEntry[] = [];
  let currentBalance = balance;
  let cumulativeInterest = 0;
  const currentDate = new Date();
  
  for (let month = 1; currentBalance > 0; month++) {
    const interest = currentBalance * monthlyRate;
    const principal = Math.min(totalPayment - interest, currentBalance);
    const endingBalance = currentBalance - principal;
    
    cumulativeInterest += interest;
    
    const entry: PayoffScheduleEntry = {
      month,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + month - 1, 1).toISOString().split('T')[0],
      beginningBalance: currentBalance,
      payment: totalPayment,
      principal,
      interest,
      endingBalance,
      cumulativeInterest
    };
    
    schedule.push(entry);
    currentBalance = endingBalance;
    
    if (endingBalance <= 0) break;
  }
  
  return schedule;
}

/**
 * Calculate bi-weekly payment schedule
 */
function calculateBiweeklySchedule(
  balance: number,
  monthlyRate: number,
  monthlyPayment: number
): PayoffScheduleEntry[] {
  const biweeklyPayment = monthlyPayment / 2;
  const biweeklyRate = monthlyRate / 2; // Simplified calculation
  const schedule: PayoffScheduleEntry[] = [];
  let currentBalance = balance;
  let cumulativeInterest = 0;
  const currentDate = new Date();
  
  for (let month = 1; currentBalance > 0; month++) {
    // Two bi-weekly payments per month
    for (let payment = 1; payment <= 2 && currentBalance > 0; payment++) {
      const interest = currentBalance * biweeklyRate;
      const principal = Math.min(biweeklyPayment - interest, currentBalance);
      const endingBalance = currentBalance - principal;
      
      cumulativeInterest += interest;
      currentBalance = endingBalance;
      
      if (endingBalance <= 0) break;
    }
    
    if (currentBalance <= 0) break;
    
    const entry: PayoffScheduleEntry = {
      month,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + month - 1, 1).toISOString().split('T')[0],
      beginningBalance: balance,
      payment: monthlyPayment,
      principal: balance - currentBalance,
      interest: cumulativeInterest,
      endingBalance: currentBalance,
      cumulativeInterest
    };
    
    schedule.push(entry);
  }
  
  return schedule;
}

/**
 * Calculate lump sum payment schedule
 */
function calculateLumpSumSchedule(
  balance: number,
  monthlyRate: number,
  totalMonths: number,
  monthlyPayment: number,
  lumpSum: number
): PayoffScheduleEntry[] {
  const schedule: PayoffScheduleEntry[] = [];
  let currentBalance = balance;
  let cumulativeInterest = 0;
  const currentDate = new Date();
  
  for (let month = 1; month <= totalMonths && currentBalance > 0; month++) {
    const interest = currentBalance * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, currentBalance);
    const endingBalance = currentBalance - principal;
    
    cumulativeInterest += interest;
    
    const entry: PayoffScheduleEntry = {
      month,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + month - 1, 1).toISOString().split('T')[0],
      beginningBalance: currentBalance,
      payment: monthlyPayment,
      principal,
      interest,
      endingBalance,
      cumulativeInterest
    };
    
    schedule.push(entry);
    currentBalance = endingBalance;
    
    if (endingBalance <= 0) break;
  }
  
  return schedule;
}

/**
 * Calculate custom strategy schedule
 */
function calculateCustomSchedule(
  balance: number,
  monthlyRate: number,
  monthlyPayment: number,
  extraPayment: number,
  lumpSum: number
): PayoffScheduleEntry[] {
  const totalPayment = monthlyPayment + extraPayment;
  return calculateExtraPaymentSchedule(balance, monthlyRate, totalPayment);
}

/**
 * Calculate payoff date from schedule
 */
function calculatePayoffDate(schedule: PayoffScheduleEntry[]): string {
  if (schedule.length === 0) return '';
  
  const lastEntry = schedule[schedule.length - 1];
  return lastEntry.date;
}

/**
 * Analyze different payoff strategies
 */
export function analyzePayoffStrategies(inputs: MortgagePayoffInputs): PayoffStrategy[] {
  const strategies: PayoffStrategy[] = [];
  
  // Standard strategy
  const standard = calculateMortgagePayoff({ ...inputs, payoffStrategy: 'standard' });
  strategies.push({
    name: 'Standard Payment',
    payoffDate: standard.payoffDate,
    totalInterest: standard.totalInterest,
    interestSavings: 0,
    timeSaved: 0,
    monthlyPayment: standard.monthlyPaymentNew,
    payoffSchedule: standard.payoffSchedule,
    costBenefit: 0
  });
  
  // Extra monthly payment
  if (inputs.extraPayment && inputs.extraPayment > 0) {
    const extra = calculateMortgagePayoff({ ...inputs, payoffStrategy: 'extra-monthly' });
    strategies.push({
      name: 'Extra Monthly Payment',
      payoffDate: extra.payoffDate,
      totalInterest: extra.totalInterest,
      interestSavings: extra.interestSavings,
      timeSaved: extra.timeSaved,
      monthlyPayment: extra.monthlyPaymentNew,
      payoffSchedule: extra.payoffSchedule,
      costBenefit: calculateCostBenefit(inputs, extra.interestSavings, extra.timeSaved)
    });
  }
  
  // Bi-weekly payments
  const biweekly = calculateMortgagePayoff({ ...inputs, payoffStrategy: 'biweekly' });
  strategies.push({
    name: 'Bi-weekly Payments',
    payoffDate: biweekly.payoffDate,
    totalInterest: biweekly.totalInterest,
    interestSavings: biweekly.interestSavings,
    timeSaved: biweekly.timeSaved,
    monthlyPayment: biweekly.monthlyPaymentNew,
    payoffSchedule: biweekly.payoffSchedule,
    costBenefit: calculateCostBenefit(inputs, biweekly.interestSavings, biweekly.timeSaved)
  });
  
  // Lump sum payment
  if (inputs.lumpSumPayment && inputs.lumpSumPayment > 0) {
    const lumpSum = calculateMortgagePayoff({ ...inputs, payoffStrategy: 'lump-sum' });
    strategies.push({
      name: 'Lump Sum Payment',
      payoffDate: lumpSum.payoffDate,
      totalInterest: lumpSum.totalInterest,
      interestSavings: lumpSum.interestSavings,
      timeSaved: lumpSum.timeSaved,
      monthlyPayment: lumpSum.monthlyPaymentNew,
      payoffSchedule: lumpSum.payoffSchedule,
      costBenefit: calculateCostBenefit(inputs, lumpSum.interestSavings, lumpSum.timeSaved)
    });
  }
  
  return strategies.sort((a, b) => b.costBenefit - a.costBenefit);
}

/**
 * Calculate different payoff scenarios
 */
export function calculatePayoffScenarios(inputs: MortgagePayoffInputs): {
  scenarios: PayoffStrategy[];
  bestStrategy: PayoffStrategy;
  worstStrategy: PayoffStrategy;
} {
  const strategies = analyzePayoffStrategies(inputs);
  
  if (strategies.length === 0) {
    throw new Error('No valid strategies found');
  }
  
  const bestStrategy = strategies[0];
  const worstStrategy = strategies[strategies.length - 1];
  
  return {
    scenarios: strategies,
    bestStrategy,
    worstStrategy
  };
}

/**
 * Calculate cost-benefit ratio
 */
function calculateCostBenefit(
  inputs: MortgagePayoffInputs,
  interestSavings: number,
  timeSaved: number
): number {
  const { investmentReturn = 7, inflationRate = 2.5 } = inputs;
  
  // Calculate opportunity cost of extra payments
  const extraPayment = inputs.extraPayment || 0;
  const lumpSum = inputs.lumpSumPayment || 0;
  const totalExtraInvestment = extraPayment * 12 * timeSaved + lumpSum;
  
  // Calculate future value of investment
  const investmentFV = totalExtraInvestment * Math.pow(1 + investmentReturn / 100, timeSaved);
  
  // Calculate inflation-adjusted interest savings
  const inflationAdjustedSavings = interestSavings / Math.pow(1 + inflationRate / 100, timeSaved);
  
  // Cost-benefit ratio
  return (inflationAdjustedSavings + investmentFV) / totalExtraInvestment;
}

/**
 * Generate cost-benefit analysis
 */
function generateCostBenefitAnalysis(
  inputs: MortgagePayoffInputs,
  totalInterest: number,
  interestSavings: number,
  timeSaved: number,
  schedule: PayoffScheduleEntry[]
): string {
  const { investmentReturn = 7, inflationRate = 2.5, taxRate = 22 } = inputs;
  
  let analysis = `## Cost-Benefit Analysis\n\n`;
  
  // Interest savings analysis
  analysis += `### Interest Savings\n`;
  analysis += `- **Total Interest Paid:** $${totalInterest.toLocaleString()}\n`;
  analysis += `- **Interest Savings:** $${interestSavings.toLocaleString()}\n`;
  analysis += `- **Time Saved:** ${timeSaved.toFixed(1)} years\n\n`;
  
  // Tax implications
  const taxSavings = interestSavings * (taxRate / 100);
  analysis += `### Tax Implications\n`;
  analysis += `- **Tax Savings:** $${taxSavings.toLocaleString()}\n`;
  analysis += `- **After-Tax Savings:** $${(interestSavings - taxSavings).toLocaleString()}\n\n`;
  
  // Opportunity cost
  const extraPayment = inputs.extraPayment || 0;
  const lumpSum = inputs.lumpSumPayment || 0;
  const totalExtraInvestment = extraPayment * 12 * timeSaved + lumpSum;
  const investmentFV = totalExtraInvestment * Math.pow(1 + investmentReturn / 100, timeSaved);
  
  analysis += `### Opportunity Cost Analysis\n`;
  analysis += `- **Total Extra Investment:** $${totalExtraInvestment.toLocaleString()}\n`;
  analysis += `- **Investment Return:** ${investmentReturn}%\n`;
  analysis += `- **Future Value if Invested:** $${investmentFV.toLocaleString()}\n`;
  analysis += `- **Net Benefit:** $${(interestSavings - taxSavings - totalExtraInvestment).toLocaleString()}\n\n`;
  
  // Inflation impact
  const inflationAdjustedSavings = interestSavings / Math.pow(1 + inflationRate / 100, timeSaved);
  analysis += `### Inflation Impact\n`;
  analysis += `- **Inflation Rate:** ${inflationRate}%\n`;
  analysis += `- **Inflation-Adjusted Savings:** $${inflationAdjustedSavings.toLocaleString()}\n\n`;
  
  return analysis;
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  inputs: MortgagePayoffInputs,
  totalInterest: number,
  interestSavings: number,
  timeSaved: number,
  schedule: PayoffScheduleEntry[]
): string {
  let recommendations = `## Personalized Recommendations\n\n`;
  
  // Strategy-specific recommendations
  switch (inputs.payoffStrategy) {
    case 'extra-monthly':
      recommendations += `### Extra Monthly Payment Strategy\n`;
      recommendations += `- **Recommended:** Add $${inputs.extraPayment} to your monthly payment\n`;
      recommendations += `- **Benefits:** Save $${interestSavings.toLocaleString()} in interest\n`;
      recommendations += `- **Time Saved:** ${timeSaved.toFixed(1)} years\n`;
      recommendations += `- **Monthly Impact:** Increase payment by ${((inputs.extraPayment || 0) / inputs.monthlyPayment * 100).toFixed(1)}%\n\n`;
      break;
      
    case 'biweekly':
      recommendations += `### Bi-weekly Payment Strategy\n`;
      recommendations += `- **Recommended:** Switch to bi-weekly payments\n`;
      recommendations += `- **Benefits:** Save $${interestSavings.toLocaleString()} in interest\n`;
      recommendations += `- **Time Saved:** ${timeSaved.toFixed(1)} years\n`;
      recommendations += `- **Payment:** $${(inputs.monthlyPayment / 2).toFixed(0)} every 2 weeks\n\n`;
      break;
      
    case 'lump-sum':
      recommendations += `### Lump Sum Payment Strategy\n`;
      recommendations += `- **Recommended:** Make a $${inputs.lumpSumPayment?.toLocaleString()} lump sum payment\n`;
      recommendations += `- **Benefits:** Save $${interestSavings.toLocaleString()} in interest\n`;
      recommendations += `- **Time Saved:** ${timeSaved.toFixed(1)} years\n`;
      recommendations += `- **One-time Impact:** Reduce principal by ${((inputs.lumpSumPayment || 0) / inputs.currentBalance * 100).toFixed(1)}%\n\n`;
      break;
  }
  
  // General recommendations
  recommendations += `### General Recommendations\n`;
  
  if (interestSavings > 10000) {
    recommendations += `- **High Impact:** This strategy will save significant interest\n`;
  } else if (interestSavings > 5000) {
    recommendations += `- **Moderate Impact:** This strategy provides good interest savings\n`;
  } else {
    recommendations += `- **Low Impact:** Consider other strategies for better returns\n`;
  }
  
  if (timeSaved > 2) {
    recommendations += `- **Time Savings:** You'll pay off your mortgage ${timeSaved.toFixed(1)} years early\n`;
  }
  
  // Risk considerations
  recommendations += `\n### Risk Considerations\n`;
  recommendations += `- **Liquidity:** Ensure you maintain emergency funds\n`;
  recommendations += `- **Investment Opportunity:** Consider if money could earn more elsewhere\n`;
  recommendations += `- **Tax Implications:** Mortgage interest may be tax-deductible\n`;
  
  return recommendations;
}