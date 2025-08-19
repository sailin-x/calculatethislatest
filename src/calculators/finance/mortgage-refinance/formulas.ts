export interface MortgageRefinanceInputs {
  currentLoanAmount: number;
  currentInterestRate: number;
  currentLoanTerm: string;
  remainingYears: number;
  newLoanAmount: number;
  newInterestRate: number;
  newLoanTerm: string;
  closingCosts: number;
  prepaymentPenalty?: number;
  propertyValue?: number;
  refinancePurpose: string;
  cashOutAmount?: number;
  taxRate?: number;
  planToMove?: string;
}

export interface RefinanceScenario {
  scenario: string;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  breakEvenMonths: number;
  savings: number;
  recommendation: string;
}

export interface RefinanceAnalysis {
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalCost: number;
  netBenefit: number;
  recommendation: string;
  analysis: string;
}

export interface MortgageRefinanceOutputs {
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalCost: number;
  netBenefit: number;
  recommendation: string;
  analysis: string;
}

/**
 * Calculate mortgage refinance analysis
 */
export function calculateMortgageRefinance(inputs: MortgageRefinanceInputs): MortgageRefinanceOutputs {
  const {
    currentLoanAmount,
    currentInterestRate,
    currentLoanTerm,
    remainingYears,
    newLoanAmount,
    newInterestRate,
    newLoanTerm,
    closingCosts,
    prepaymentPenalty = 0,
    propertyValue,
    refinancePurpose,
    cashOutAmount = 0,
    taxRate = 0,
    planToMove = 'never'
  } = inputs;

  // Calculate current loan payments
  const currentMonthlyRate = currentInterestRate / 100 / 12;
  const currentRemainingMonths = remainingYears * 12;
  const currentMonthlyPayment = calculateMonthlyPayment(currentLoanAmount, currentMonthlyRate, currentRemainingMonths);
  const currentTotalInterest = calculateTotalInterest(currentLoanAmount, currentMonthlyRate, currentRemainingMonths);

  // Calculate new loan payments
  const newMonthlyRate = newInterestRate / 100 / 12;
  const newTotalMonths = parseInt(newLoanTerm) * 12;
  const newMonthlyPayment = calculateMonthlyPayment(newLoanAmount, newMonthlyRate, newTotalMonths);
  const newTotalInterest = calculateTotalInterest(newLoanAmount, newMonthlyRate, newTotalMonths);

  // Calculate savings
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const totalSavings = Math.max(0, currentTotalInterest - newTotalInterest);

  // Calculate total refinance cost
  const totalCost = closingCosts + prepaymentPenalty;

  // Calculate break-even analysis
  const breakEvenMonths = calculateBreakEvenMonths(totalCost, monthlySavings);
  const breakEvenYears = breakEvenMonths / 12;

  // Calculate net benefit
  const netBenefit = totalSavings - totalCost;

  // Generate recommendation
  const recommendation = generateRecommendation(
    monthlySavings,
    totalSavings,
    breakEvenMonths,
    planToMove,
    refinancePurpose,
    cashOutAmount
  );

  // Generate detailed analysis
  const analysis = generateAnalysis(
    inputs,
    monthlySavings,
    totalSavings,
    breakEvenMonths,
    breakEvenYears,
    totalCost,
    netBenefit,
    currentMonthlyPayment,
    newMonthlyPayment,
    currentTotalInterest,
    newTotalInterest
  );

  return {
    monthlySavings,
    totalSavings,
    breakEvenMonths,
    breakEvenYears,
    totalCost,
    netBenefit,
    recommendation,
    analysis
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
 * Calculate break-even months
 */
function calculateBreakEvenMonths(totalCost: number, monthlySavings: number): number {
  if (monthlySavings <= 0) {
    return Infinity; // Never break even if no monthly savings
  }
  
  return totalCost / monthlySavings;
}

/**
 * Generate refinance recommendation
 */
function generateRecommendation(
  monthlySavings: number,
  totalSavings: number,
  breakEvenMonths: number,
  planToMove: string,
  refinancePurpose: string,
  cashOutAmount: number
): string {
  // Check if planning to move soon
  const moveYears = planToMove === 'never' ? Infinity : parseInt(planToMove);
  const moveMonths = moveYears * 12;
  
  // Strong recommendation criteria
  if (monthlySavings > 0 && totalSavings > 0 && breakEvenMonths < moveMonths * 0.5) {
    return 'Strongly Recommended';
  }
  
  // Good recommendation criteria
  if (monthlySavings > 0 && totalSavings > 0 && breakEvenMonths < moveMonths * 0.8) {
    return 'Recommended';
  }
  
  // Cash-out refinance considerations
  if (refinancePurpose === 'cash_out' && cashOutAmount > 0) {
    if (breakEvenMonths < moveMonths * 0.7) {
      return 'Consider for Cash-Out';
    } else {
      return 'Consider carefully';
    }
  }
  
  // Weak recommendation
  if (monthlySavings > 0 && breakEvenMonths < moveMonths) {
    return 'Consider';
  }
  
  // Not recommended
  if (monthlySavings <= 0 || breakEvenMonths >= moveMonths) {
    return 'Not recommended';
  }
  
  return 'Consider carefully';
}

/**
 * Generate detailed analysis
 */
function generateAnalysis(
  inputs: MortgageRefinanceInputs,
  monthlySavings: number,
  totalSavings: number,
  breakEvenMonths: number,
  breakEvenYears: number,
  totalCost: number,
  netBenefit: number,
  currentMonthlyPayment: number,
  newMonthlyPayment: number,
  currentTotalInterest: number,
  newTotalInterest: number
): string {
  const {
    currentLoanAmount,
    newLoanAmount,
    currentInterestRate,
    newInterestRate,
    refinancePurpose,
    planToMove,
    propertyValue,
    cashOutAmount = 0
  } = inputs;

  let analysis = `# Mortgage Refinance Analysis\n\n`;

  // Summary
  analysis += `## Summary\n`;
  analysis += `- **Current Monthly Payment:** $${currentMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  analysis += `- **New Monthly Payment:** $${newMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  analysis += `- **Monthly Savings:** $${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  analysis += `- **Total Interest Savings:** $${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n`;

  // Break-even analysis
  analysis += `## Break-Even Analysis\n`;
  if (monthlySavings > 0) {
    analysis += `- **Break-Even Months:** ${breakEvenMonths.toFixed(1)} months\n`;
    analysis += `- **Break-Even Years:** ${breakEvenYears.toFixed(1)} years\n`;
    analysis += `- **Total Refinance Cost:** $${totalCost.toLocaleString()}\n`;
    analysis += `- **Net Financial Benefit:** $${netBenefit.toLocaleString()}\n\n`;
  } else {
    analysis += `- **No monthly savings** - refinancing would increase your monthly payment\n`;
    analysis += `- **Total Refinance Cost:** $${totalCost.toLocaleString()}\n\n`;
  }

  // Purpose-specific analysis
  analysis += `## Purpose-Specific Analysis\n\n`;
  
  switch (refinancePurpose) {
    case 'lower_rate':
      analysis += `### Rate Reduction Refinance\n`;
      analysis += `- **Rate Reduction:** ${(currentInterestRate - newInterestRate).toFixed(2)}%\n`;
      analysis += `- **Interest Savings:** $${totalSavings.toLocaleString()}\n`;
      if (monthlySavings > 0) {
        analysis += `- **Monthly Cash Flow Improvement:** $${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
      }
      break;
      
    case 'shorter_term':
      analysis += `### Term Reduction Refinance\n`;
      analysis += `- **New Term:** ${inputs.newLoanTerm} years\n`;
      analysis += `- **Faster Equity Building:** ${inputs.newLoanTerm} years vs ${inputs.currentLoanTerm} years\n`;
      if (monthlySavings < 0) {
        analysis += `- **Higher Monthly Payment:** $${Math.abs(monthlySavings).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
        analysis += `- **Trade-off:** Higher payments for faster payoff\n`;
      }
      break;
      
    case 'cash_out':
      analysis += `### Cash-Out Refinance\n`;
      analysis += `- **Cash Out Amount:** $${cashOutAmount.toLocaleString()}\n`;
      analysis += `- **New Loan Amount:** $${newLoanAmount.toLocaleString()}\n`;
      if (propertyValue) {
        const newLTV = (newLoanAmount / propertyValue) * 100;
        analysis += `- **New Loan-to-Value:** ${newLTV.toFixed(1)}%\n`;
      }
      break;
      
    case 'debt_consolidation':
      analysis += `### Debt Consolidation Refinance\n`;
      analysis += `- **Consolidation Amount:** $${(newLoanAmount - currentLoanAmount).toLocaleString()}\n`;
      analysis += `- **Potential Interest Savings:** $${totalSavings.toLocaleString()}\n`;
      break;
      
    case 'remove_pmi':
      analysis += `### PMI Removal Refinance\n`;
      if (propertyValue) {
        const currentLTV = (currentLoanAmount / propertyValue) * 100;
        const newLTV = (newLoanAmount / propertyValue) * 100;
        analysis += `- **Current LTV:** ${currentLTV.toFixed(1)}%\n`;
        analysis += `- **New LTV:** ${newLTV.toFixed(1)}%\n`;
        if (newLTV <= 80) {
          analysis += `- **PMI Status:** Removed (LTV ≤ 80%)\n`;
        }
      }
      break;
  }

  // Move timeline considerations
  analysis += `\n## Move Timeline Considerations\n`;
  if (planToMove === 'never') {
    analysis += `- **Planning to stay long-term** - refinancing benefits can be fully realized\n`;
  } else {
    const moveYears = parseInt(planToMove);
    analysis += `- **Planning to move in ${moveYears} years**\n`;
    if (breakEvenMonths < moveYears * 12) {
      analysis += `- **Break-even before move:** ${breakEvenYears.toFixed(1)} years vs ${moveYears} years\n`;
      analysis += `- **Benefit period:** ${(moveYears - breakEvenYears).toFixed(1)} years of savings\n`;
    } else {
      analysis += `- **Break-even after move:** Not recommended\n`;
    }
  }

  // Tax considerations
  if (inputs.taxRate && inputs.taxRate > 0) {
    analysis += `\n## Tax Considerations\n`;
    analysis += `- **Marginal Tax Rate:** ${inputs.taxRate}%\n`;
    analysis += `- **After-Tax Monthly Savings:** $${(monthlySavings * (1 - inputs.taxRate / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    analysis += `- **After-Tax Break-Even:** ${(breakEvenMonths / (1 - inputs.taxRate / 100)).toFixed(1)} months\n`;
  }

  // Final recommendation
  analysis += `\n## Final Recommendation\n`;
  const recommendation = generateRecommendation(monthlySavings, totalSavings, breakEvenMonths, planToMove, refinancePurpose, cashOutAmount);
  analysis += `**${recommendation}**\n\n`;
  
  if (recommendation.includes('Recommended')) {
    analysis += `Refinancing appears to be financially beneficial based on the analysis above.\n`;
  } else if (recommendation.includes('Consider')) {
    analysis += `Refinancing may be beneficial but consider the trade-offs carefully.\n`;
  } else {
    analysis += `Refinancing does not appear to be financially beneficial at this time.\n`;
  }

  return analysis;
}

/**
 * Calculate different refinance scenarios
 */
export function calculateRefinanceScenarios(inputs: MortgageRefinanceInputs): RefinanceScenario[] {
  const scenarios: RefinanceScenario[] = [];
  
  // Current scenario (no refinance)
  const currentMonthlyRate = inputs.currentInterestRate / 100 / 12;
  const currentRemainingMonths = inputs.remainingYears * 12;
  const currentMonthlyPayment = calculateMonthlyPayment(inputs.currentLoanAmount, currentMonthlyRate, currentRemainingMonths);
  const currentTotalInterest = calculateTotalInterest(inputs.currentLoanAmount, currentMonthlyRate, currentRemainingMonths);
  
  scenarios.push({
    scenario: 'Keep Current Loan',
    monthlyPayment: currentMonthlyPayment,
    totalInterest: currentTotalInterest,
    totalCost: 0,
    breakEvenMonths: 0,
    savings: 0,
    recommendation: 'Baseline'
  });
  
  // Refinance scenario
  const refinanceResult = calculateMortgageRefinance(inputs);
  scenarios.push({
    scenario: 'Refinance',
    monthlyPayment: currentMonthlyPayment - refinanceResult.monthlySavings,
    totalInterest: currentTotalInterest - refinanceResult.totalSavings,
    totalCost: refinanceResult.totalCost,
    breakEvenMonths: refinanceResult.breakEvenMonths,
    savings: refinanceResult.netBenefit,
    recommendation: refinanceResult.recommendation
  });
  
  return scenarios;
}

/**
 * Analyze refinance timing
 */
export function analyzeRefinanceTiming(
  currentRate: number,
  newRate: number,
  loanAmount: number,
  closingCosts: number,
  planToMove: string
): {
  optimalTiming: string;
  rateThreshold: number;
  analysis: string;
} {
  const moveYears = planToMove === 'never' ? 30 : parseInt(planToMove);
  const moveMonths = moveYears * 12;
  
  // Calculate minimum rate reduction needed for break-even
  const currentMonthlyPayment = calculateMonthlyPayment(loanAmount, currentRate / 100 / 12, moveMonths);
  const requiredMonthlySavings = closingCosts / moveMonths;
  const requiredNewPayment = currentMonthlyPayment - requiredMonthlySavings;
  
  // Find the rate that would give us the required payment
  let rateThreshold = currentRate;
  for (let rate = currentRate - 0.125; rate >= 0.1; rate -= 0.125) {
    const testPayment = calculateMonthlyPayment(loanAmount, rate / 100 / 12, moveMonths);
    if (testPayment <= requiredNewPayment) {
      rateThreshold = rate;
      break;
    }
  }
  
  const rateReduction = currentRate - newRate;
  const optimalTiming = rateReduction >= (currentRate - rateThreshold) ? 'Refinance now' : 'Wait for better rates';
  
  let analysis = `## Refinance Timing Analysis\n\n`;
  analysis += `- **Current Rate:** ${currentRate}%\n`;
  analysis += `- **New Rate:** ${newRate}%\n`;
  analysis += `- **Rate Reduction:** ${rateReduction.toFixed(2)}%\n`;
  analysis += `- **Minimum Rate Reduction Needed:** ${(currentRate - rateThreshold).toFixed(2)}%\n`;
  analysis += `- **Recommendation:** ${optimalTiming}\n`;
  
  return {
    optimalTiming,
    rateThreshold,
    analysis
  };
}