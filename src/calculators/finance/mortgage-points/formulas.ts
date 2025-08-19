export interface MortgagePointsInputs {
  loanAmount: number;
  originalRate: number;
  pointsToBuy: number;
  rateReduction: number;
  loanTerm: number;
  taxRate?: number;
  investmentReturn?: number;
  inflationRate?: number;
  plannedOwnershipYears?: number;
  closingCosts?: number;
  propertyValue?: number;
  downPayment?: number;
}

export interface PointsStrategy {
  points: number;
  cost: number;
  newRate: number;
  monthlySavings: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalInterestSavings: number;
  costBenefit: number;
}

export interface MortgagePointsOutputs {
  pointsCost: number;
  newRate: number;
  monthlyPaymentOriginal: number;
  monthlyPaymentNew: number;
  monthlySavings: number;
  totalInterestSavings: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  costBenefitAnalysis: string;
  recommendations: string;
}

/**
 * Calculate mortgage points costs and benefits
 */
export function calculateMortgagePoints(inputs: MortgagePointsInputs): MortgagePointsOutputs {
  const {
    loanAmount,
    originalRate,
    pointsToBuy,
    rateReduction,
    loanTerm,
    taxRate = 22,
    investmentReturn = 7,
    inflationRate = 2.5,
    plannedOwnershipYears,
    closingCosts = 0,
    propertyValue,
    downPayment = 0
  } = inputs;

  // Calculate points cost (1 point = 1% of loan amount)
  const pointsCost = loanAmount * (pointsToBuy / 100);
  
  // Calculate new interest rate
  const newRate = originalRate - (pointsToBuy * rateReduction);
  
  // Calculate monthly payments
  const monthlyPaymentOriginal = calculateMonthlyPayment(loanAmount, originalRate, loanTerm);
  const monthlyPaymentNew = calculateMonthlyPayment(loanAmount, newRate, loanTerm);
  
  // Calculate monthly savings
  const monthlySavings = monthlyPaymentOriginal - monthlyPaymentNew;
  
  // Calculate total interest savings
  const totalInterestOriginal = calculateTotalInterest(loanAmount, originalRate, loanTerm);
  const totalInterestNew = calculateTotalInterest(loanAmount, newRate, loanTerm);
  const totalInterestSavings = totalInterestOriginal - totalInterestNew;
  
  // Calculate break-even analysis
  const breakEvenMonths = pointsCost / monthlySavings;
  const breakEvenYears = breakEvenMonths / 12;
  
  // Generate cost-benefit analysis
  const costBenefitAnalysis = generateCostBenefitAnalysis(
    inputs,
    pointsCost,
    monthlySavings,
    totalInterestSavings,
    breakEvenMonths,
    breakEvenYears
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    inputs,
    pointsCost,
    monthlySavings,
    totalInterestSavings,
    breakEvenMonths,
    breakEvenYears
  );
  
  return {
    pointsCost,
    newRate,
    monthlyPaymentOriginal,
    monthlyPaymentNew,
    monthlySavings,
    totalInterestSavings,
    breakEvenMonths,
    breakEvenYears,
    costBenefitAnalysis,
    recommendations
  };
}

/**
 * Calculate monthly mortgage payment
 */
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                  (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return payment;
}

/**
 * Calculate total interest paid over loan term
 */
function calculateTotalInterest(principal: number, annualRate: number, years: number): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const totalPayments = years * 12;
  const totalPaid = monthlyPayment * totalPayments;
  
  return totalPaid - principal;
}

/**
 * Analyze different points purchase strategies
 */
export function analyzePointsStrategies(inputs: MortgagePointsInputs): PointsStrategy[] {
  const strategies: PointsStrategy[] = [];
  
  // Analyze different point amounts (0, 0.5, 1, 1.5, 2, 2.5, 3)
  const pointOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  
  for (const points of pointOptions) {
    if (points === 0) {
      // No points strategy
      strategies.push({
        points: 0,
        cost: 0,
        newRate: inputs.originalRate,
        monthlySavings: 0,
        breakEvenMonths: 0,
        breakEvenYears: 0,
        totalInterestSavings: 0,
        costBenefit: 0
      });
    } else {
      // Calculate strategy with points
      const strategyInputs = { ...inputs, pointsToBuy: points };
      const result = calculateMortgagePoints(strategyInputs);
      
      // Calculate cost-benefit ratio
      const costBenefit = calculateCostBenefitRatio(
        inputs,
        result.pointsCost,
        result.monthlySavings,
        result.totalInterestSavings
      );
      
      strategies.push({
        points,
        cost: result.pointsCost,
        newRate: result.newRate,
        monthlySavings: result.monthlySavings,
        breakEvenMonths: result.breakEvenMonths,
        breakEvenYears: result.breakEvenYears,
        totalInterestSavings: result.totalInterestSavings,
        costBenefit
      });
    }
  }
  
  return strategies.sort((a, b) => b.costBenefit - a.costBenefit);
}

/**
 * Calculate detailed break-even analysis
 */
export function calculateBreakEvenAnalysis(inputs: MortgagePointsInputs): {
  basicBreakEven: number;
  taxAdjustedBreakEven: number;
  investmentOpportunityBreakEven: number;
  inflationAdjustedBreakEven: number;
  ownershipPeriodBreakEven: number;
  analysis: string;
} {
  const {
    loanAmount,
    originalRate,
    pointsToBuy,
    rateReduction,
    loanTerm,
    taxRate = 22,
    investmentReturn = 7,
    inflationRate = 2.5,
    plannedOwnershipYears,
    closingCosts = 0
  } = inputs;

  const pointsCost = loanAmount * (pointsToBuy / 100);
  const newRate = originalRate - (pointsToBuy * rateReduction);
  const monthlyPaymentOriginal = calculateMonthlyPayment(loanAmount, originalRate, loanTerm);
  const monthlyPaymentNew = calculateMonthlyPayment(loanAmount, newRate, loanTerm);
  const monthlySavings = monthlyPaymentOriginal - monthlyPaymentNew;

  // Basic break-even (months)
  const basicBreakEven = pointsCost / monthlySavings;

  // Tax-adjusted break-even (considering interest deduction)
  const annualInterestSavings = monthlySavings * 12;
  const taxSavings = annualInterestSavings * (taxRate / 100);
  const afterTaxMonthlySavings = monthlySavings + (taxSavings / 12);
  const taxAdjustedBreakEven = pointsCost / afterTaxMonthlySavings;

  // Investment opportunity break-even
  const investmentFV = pointsCost * Math.pow(1 + investmentReturn / 100, basicBreakEven / 12);
  const investmentOpportunityBreakEven = investmentFV / monthlySavings;

  // Inflation-adjusted break-even
  const inflationAdjustedMonthlySavings = monthlySavings / Math.pow(1 + inflationRate / 100, basicBreakEven / 12);
  const inflationAdjustedBreakEven = pointsCost / inflationAdjustedMonthlySavings;

  // Ownership period break-even
  let ownershipPeriodBreakEven = basicBreakEven;
  if (plannedOwnershipYears && plannedOwnershipYears * 12 < basicBreakEven) {
    ownershipPeriodBreakEven = plannedOwnershipYears * 12;
  }

  // Generate analysis
  const analysis = generateBreakEvenAnalysis(
    basicBreakEven,
    taxAdjustedBreakEven,
    investmentOpportunityBreakEven,
    inflationAdjustedBreakEven,
    ownershipPeriodBreakEven,
    inputs
  );

  return {
    basicBreakEven,
    taxAdjustedBreakEven,
    investmentOpportunityBreakEven,
    inflationAdjustedBreakEven,
    ownershipPeriodBreakEven,
    analysis
  };
}

/**
 * Calculate cost-benefit ratio
 */
function calculateCostBenefitRatio(
  inputs: MortgagePointsInputs,
  pointsCost: number,
  monthlySavings: number,
  totalInterestSavings: number
): number {
  const { investmentReturn = 7, inflationRate = 2.5, plannedOwnershipYears } = inputs;
  
  // Calculate opportunity cost
  const ownershipYears = plannedOwnershipYears || 30;
  const investmentFV = pointsCost * Math.pow(1 + investmentReturn / 100, ownershipYears);
  
  // Calculate inflation-adjusted interest savings
  const inflationAdjustedSavings = totalInterestSavings / Math.pow(1 + inflationRate / 100, ownershipYears);
  
  // Cost-benefit ratio
  return (inflationAdjustedSavings + investmentFV) / pointsCost;
}

/**
 * Generate cost-benefit analysis
 */
function generateCostBenefitAnalysis(
  inputs: MortgagePointsInputs,
  pointsCost: number,
  monthlySavings: number,
  totalInterestSavings: number,
  breakEvenMonths: number,
  breakEvenYears: number
): string {
  const { taxRate = 22, investmentReturn = 7, inflationRate = 2.5, plannedOwnershipYears } = inputs;
  
  let analysis = `## Cost-Benefit Analysis\n\n`;
  
  // Points cost analysis
  analysis += `### Points Cost Analysis\n`;
  analysis += `- **Points Cost:** $${pointsCost.toLocaleString()}\n`;
  analysis += `- **Points Purchased:** ${inputs.pointsToBuy}\n`;
  analysis += `- **Rate Reduction:** ${(inputs.pointsToBuy * inputs.rateReduction).toFixed(3)}%\n`;
  analysis += `- **New Rate:** ${(inputs.originalRate - inputs.pointsToBuy * inputs.rateReduction).toFixed(3)}%\n\n`;
  
  // Monthly savings analysis
  analysis += `### Monthly Savings Analysis\n`;
  analysis += `- **Original Payment:** $${calculateMonthlyPayment(inputs.loanAmount, inputs.originalRate, inputs.loanTerm).toFixed(0)}\n`;
  analysis += `- **New Payment:** $${calculateMonthlyPayment(inputs.loanAmount, inputs.originalRate - inputs.pointsToBuy * inputs.rateReduction, inputs.loanTerm).toFixed(0)}\n`;
  analysis += `- **Monthly Savings:** $${monthlySavings.toFixed(0)}\n`;
  analysis += `- **Annual Savings:** $${(monthlySavings * 12).toLocaleString()}\n\n`;
  
  // Break-even analysis
  analysis += `### Break-Even Analysis\n`;
  analysis += `- **Break-Even Months:** ${breakEvenMonths.toFixed(1)}\n`;
  analysis += `- **Break-Even Years:** ${breakEvenYears.toFixed(1)}\n`;
  analysis += `- **Break-Even Date:** ${new Date(Date.now() + breakEvenMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}\n\n`;
  
  // Tax implications
  const annualInterestSavings = monthlySavings * 12;
  const taxSavings = annualInterestSavings * (taxRate / 100);
  analysis += `### Tax Implications\n`;
  analysis += `- **Tax Rate:** ${taxRate}%\n`;
  analysis += `- **Annual Tax Savings:** $${taxSavings.toLocaleString()}\n`;
  analysis += `- **After-Tax Monthly Savings:** $${(monthlySavings + taxSavings / 12).toFixed(0)}\n\n`;
  
  // Interest savings analysis
  analysis += `### Interest Savings Analysis\n`;
  analysis += `- **Total Interest Savings:** $${totalInterestSavings.toLocaleString()}\n`;
  analysis += `- **Interest Savings per Year:** $${(totalInterestSavings / inputs.loanTerm).toLocaleString()}\n`;
  analysis += `- **Savings as % of Points Cost:** ${((totalInterestSavings / pointsCost) * 100).toFixed(1)}%\n\n`;
  
  // Opportunity cost analysis
  const ownershipYears = plannedOwnershipYears || 30;
  const investmentFV = pointsCost * Math.pow(1 + investmentReturn / 100, ownershipYears);
  analysis += `### Opportunity Cost Analysis\n`;
  analysis += `- **Investment Return:** ${investmentReturn}%\n`;
  analysis += `- **Future Value if Invested:** $${investmentFV.toLocaleString()}\n`;
  analysis += `- **Net Benefit:** $${(totalInterestSavings - pointsCost).toLocaleString()}\n\n`;
  
  return analysis;
}

/**
 * Generate break-even analysis
 */
function generateBreakEvenAnalysis(
  basicBreakEven: number,
  taxAdjustedBreakEven: number,
  investmentOpportunityBreakEven: number,
  inflationAdjustedBreakEven: number,
  ownershipPeriodBreakEven: number,
  inputs: MortgagePointsInputs
): string {
  let analysis = `## Break-Even Analysis\n\n`;
  
  analysis += `### Basic Break-Even\n`;
  analysis += `- **Months:** ${basicBreakEven.toFixed(1)}\n`;
  analysis += `- **Years:** ${(basicBreakEven / 12).toFixed(1)}\n\n`;
  
  analysis += `### Tax-Adjusted Break-Even\n`;
  analysis += `- **Months:** ${taxAdjustedBreakEven.toFixed(1)}\n`;
  analysis += `- **Years:** ${(taxAdjustedBreakEven / 12).toFixed(1)}\n`;
  analysis += `- **Improvement:** ${((basicBreakEven - taxAdjustedBreakEven) / basicBreakEven * 100).toFixed(1)}% faster\n\n`;
  
  analysis += `### Investment Opportunity Break-Even\n`;
  analysis += `- **Months:** ${investmentOpportunityBreakEven.toFixed(1)}\n`;
  analysis += `- **Years:** ${(investmentOpportunityBreakEven / 12).toFixed(1)}\n\n`;
  
  analysis += `### Inflation-Adjusted Break-Even\n`;
  analysis += `- **Months:** ${inflationAdjustedBreakEven.toFixed(1)}\n`;
  analysis += `- **Years:** ${(inflationAdjustedBreakEven / 12).toFixed(1)}\n\n`;
  
  if (inputs.plannedOwnershipYears) {
    analysis += `### Ownership Period Analysis\n`;
    analysis += `- **Planned Ownership:** ${inputs.plannedOwnershipYears} years\n`;
    analysis += `- **Break-Even Period:** ${ownershipPeriodBreakEven.toFixed(1)} months\n`;
    
    if (ownershipPeriodBreakEven <= inputs.plannedOwnershipYears * 12) {
      analysis += `- **Recommendation:** Points will pay for themselves before you plan to sell\n`;
    } else {
      analysis += `- **Recommendation:** Points may not pay for themselves during your planned ownership period\n`;
    }
  }
  
  return analysis;
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  inputs: MortgagePointsInputs,
  pointsCost: number,
  monthlySavings: number,
  totalInterestSavings: number,
  breakEvenMonths: number,
  breakEvenYears: number
): string {
  let recommendations = `## Personalized Recommendations\n\n`;
  
  // Break-even analysis recommendations
  recommendations += `### Break-Even Analysis\n`;
  
  if (breakEvenYears <= 2) {
    recommendations += `- **Excellent Investment:** Points will pay for themselves in ${breakEvenYears.toFixed(1)} years\n`;
    recommendations += `- **Recommendation:** Strongly consider purchasing points\n`;
  } else if (breakEvenYears <= 5) {
    recommendations += `- **Good Investment:** Points will pay for themselves in ${breakEvenYears.toFixed(1)} years\n`;
    recommendations += `- **Recommendation:** Consider purchasing points if you plan to stay long-term\n`;
  } else if (breakEvenYears <= 8) {
    recommendations += `- **Moderate Investment:** Points will pay for themselves in ${breakEvenYears.toFixed(1)} years\n`;
    recommendations += `- **Recommendation:** Consider points only if you plan to stay very long-term\n`;
  } else {
    recommendations += `- **Poor Investment:** Points will take ${breakEvenYears.toFixed(1)} years to pay for themselves\n`;
    recommendations += `- **Recommendation:** Consider investing the money elsewhere\n`;
  }
  
  // Ownership period recommendations
  if (inputs.plannedOwnershipYears) {
    recommendations += `\n### Ownership Period Considerations\n`;
    
    if (breakEvenMonths <= inputs.plannedOwnershipYears * 12) {
      recommendations += `- **Favorable:** Points will pay for themselves before you plan to sell\n`;
      recommendations += `- **Net Benefit:** You'll save money by purchasing points\n`;
    } else {
      recommendations += `- **Unfavorable:** Points may not pay for themselves during your planned ownership\n`;
      recommendations += `- **Consider:** Whether you might stay longer than planned\n`;
    }
  }
  
  // Rate reduction recommendations
  recommendations += `\n### Rate Reduction Analysis\n`;
  const rateReduction = inputs.pointsToBuy * inputs.rateReduction;
  const rateReductionPercent = (rateReduction / inputs.originalRate) * 100;
  
  if (rateReductionPercent >= 10) {
    recommendations += `- **Significant Reduction:** ${rateReduction.toFixed(3)}% rate reduction (${rateReductionPercent.toFixed(1)}% of original rate)\n`;
    recommendations += `- **Impact:** Substantial monthly savings\n`;
  } else if (rateReductionPercent >= 5) {
    recommendations += `- **Moderate Reduction:** ${rateReduction.toFixed(3)}% rate reduction (${rateReductionPercent.toFixed(1)}% of original rate)\n`;
    recommendations += `- **Impact:** Noticeable monthly savings\n`;
  } else {
    recommendations += `- **Small Reduction:** ${rateReduction.toFixed(3)}% rate reduction (${rateReductionPercent.toFixed(1)}% of original rate)\n`;
    recommendations += `- **Impact:** Minimal monthly savings\n`;
  }
  
  // Cost considerations
  recommendations += `\n### Cost Considerations\n`;
  const costAsPercentOfLoan = (pointsCost / inputs.loanAmount) * 100;
  
  if (costAsPercentOfLoan <= 1) {
    recommendations += `- **Low Cost:** Points cost ${costAsPercentOfLoan.toFixed(2)}% of loan amount\n`;
  } else if (costAsPercentOfLoan <= 2) {
    recommendations += `- **Moderate Cost:** Points cost ${costAsPercentOfLoan.toFixed(2)}% of loan amount\n`;
  } else {
    recommendations += `- **High Cost:** Points cost ${costAsPercentOfLoan.toFixed(2)}% of loan amount\n`;
  }
  
  // Alternative investment comparison
  if (inputs.investmentReturn && inputs.investmentReturn > inputs.originalRate) {
    recommendations += `\n### Investment Alternative\n`;
    recommendations += `- **Consider:** Investing the points cost could earn ${inputs.investmentReturn}% vs. saving ${inputs.originalRate}% interest\n`;
    recommendations += `- **Opportunity:** Higher returns available elsewhere\n`;
  }
  
  return recommendations;
}