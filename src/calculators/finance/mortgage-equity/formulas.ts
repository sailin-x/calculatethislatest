import { Calculator } from '../../../types/calculator';

export interface MortgageEquityInputs {
  currentPropertyValue: number;
  originalPurchasePrice: number;
  originalDownPayment: number;
  currentMortgageBalance: number;
  purchaseDate?: string;
  propertyImprovements?: number;
  marketAppreciation?: number;
  propertyTaxes?: number;
  homeInsurance?: number;
  hoaFees?: number;
  maintenanceCosts?: number;
  rentalIncome?: number;
  occupancyType?: string;
  creditScore?: number;
  debtToIncomeRatio?: number;
  loanType?: string;
  interestRate?: number;
  remainingLoanTerm?: number;
  monthlyPayment?: number;
  propertyType?: string;
  state?: string;
}

export interface EquityBreakdown {
  totalEquity: number;
  equityPercentage: number;
  borrowableEquity: number;
  equityGrowth: number;
  appreciationValue: number;
  improvementValue: number;
  paymentEquity: number;
  loanToValueRatio: number;
  combinedLoanToValueRatio: number;
  monthlyEquityBuild: number;
  annualEquityBuild: number;
  timeOwned: number;
  equityGrowthRate: number;
  refinancingOptions: string[];
  recommendations: string[];
  summary: {
    initialEquity: number;
    currentEquity: number;
    equityIncrease: number;
    equityIncreasePercentage: number;
  };
}

export interface MortgageEquityOutputs {
  totalEquity: number;
  equityPercentage: number;
  borrowableEquity: number;
  equityGrowth: number;
  appreciationValue: number;
  loanToValueRatio: number;
  monthlyEquityBuild: number;
  refinancingOptions: string;
  recommendations: string;
  breakdown: EquityBreakdown;
}

export function calculateMortgageEquity(inputs: MortgageEquityInputs): MortgageEquityOutputs {
  const {
    currentPropertyValue,
    originalPurchasePrice,
    originalDownPayment,
    currentMortgageBalance,
    purchaseDate,
    propertyImprovements = 0,
    marketAppreciation = 0,
    propertyTaxes = 0,
    homeInsurance = 0,
    hoaFees = 0,
    maintenanceCosts = 0,
    rentalIncome = 0,
    occupancyType = 'Primary Residence',
    creditScore,
    debtToIncomeRatio,
    loanType = 'Conventional',
    interestRate,
    remainingLoanTerm,
    monthlyPayment,
    propertyType = 'Single Family Home',
    state
  } = inputs;

  // Calculate time owned
  const timeOwned = calculateTimeOwned(purchaseDate);

  // Calculate initial equity
  const initialEquity = originalDownPayment;

  // Calculate current total equity
  const totalEquity = currentPropertyValue - currentMortgageBalance;

  // Calculate equity percentage
  const equityPercentage = (totalEquity / currentPropertyValue) * 100;

  // Calculate equity growth
  const equityGrowth = totalEquity - initialEquity;

  // Calculate appreciation value
  const appreciationValue = calculateAppreciationValue(originalPurchasePrice, currentPropertyValue, propertyImprovements);

  // Calculate improvement value
  const improvementValue = propertyImprovements;

  // Calculate payment equity (equity built through payments)
  const paymentEquity = calculatePaymentEquity(originalPurchasePrice, originalDownPayment, currentMortgageBalance, timeOwned, interestRate, monthlyPayment);

  // Calculate LTV ratios
  const loanToValueRatio = (currentMortgageBalance / currentPropertyValue) * 100;
  const combinedLoanToValueRatio = calculateCombinedLTV(currentMortgageBalance, totalEquity, occupancyType);

  // Calculate monthly equity build
  const monthlyEquityBuild = calculateMonthlyEquityBuild(monthlyPayment, interestRate, currentMortgageBalance, remainingLoanTerm);

  // Calculate annual equity build
  const annualEquityBuild = monthlyEquityBuild * 12;

  // Calculate equity growth rate
  const equityGrowthRate = timeOwned > 0 ? (equityGrowth / initialEquity / timeOwned) * 100 : 0;

  // Calculate borrowable equity
  const borrowableEquity = calculateBorrowableEquity(totalEquity, occupancyType, creditScore, debtToIncomeRatio);

  // Determine refinancing options
  const refinancingOptions = determineRefinancingOptions(equityPercentage, loanToValueRatio, occupancyType, creditScore, debtToIncomeRatio);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, {
    totalEquity,
    equityPercentage,
    equityGrowth,
    loanToValueRatio,
    monthlyEquityBuild,
    timeOwned,
    equityGrowthRate
  });

  // Build breakdown
  const breakdown: EquityBreakdown = {
    totalEquity: Math.round(totalEquity),
    equityPercentage: Math.round(equityPercentage * 100) / 100,
    borrowableEquity: Math.round(borrowableEquity),
    equityGrowth: Math.round(equityGrowth),
    appreciationValue: Math.round(appreciationValue),
    improvementValue: Math.round(improvementValue),
    paymentEquity: Math.round(paymentEquity),
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    combinedLoanToValueRatio: Math.round(combinedLoanToValueRatio * 100) / 100,
    monthlyEquityBuild: Math.round(monthlyEquityBuild),
    annualEquityBuild: Math.round(annualEquityBuild),
    timeOwned: Math.round(timeOwned * 100) / 100,
    equityGrowthRate: Math.round(equityGrowthRate * 100) / 100,
    refinancingOptions,
    recommendations,
    summary: {
      initialEquity: Math.round(initialEquity),
      currentEquity: Math.round(totalEquity),
      equityIncrease: Math.round(equityGrowth),
      equityIncreasePercentage: Math.round((equityGrowth / initialEquity) * 100)
    }
  };

  return {
    totalEquity: Math.round(totalEquity),
    equityPercentage: Math.round(equityPercentage * 100) / 100,
    borrowableEquity: Math.round(borrowableEquity),
    equityGrowth: Math.round(equityGrowth),
    appreciationValue: Math.round(appreciationValue),
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    monthlyEquityBuild: Math.round(monthlyEquityBuild),
    refinancingOptions: refinancingOptions.join(', '),
    recommendations: recommendations.join(' '),
    breakdown
  };
}

function calculateTimeOwned(purchaseDate?: string): number {
  if (!purchaseDate) return 0;
  
  const purchase = new Date(purchaseDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - purchase.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  return diffYears;
}

function calculateAppreciationValue(originalPrice: number, currentValue: number, improvements: number): number {
  const naturalAppreciation = currentValue - originalPrice - improvements;
  return Math.max(0, naturalAppreciation);
}

function calculatePaymentEquity(
  originalPrice: number,
  originalDownPayment: number,
  currentBalance: number,
  timeOwned: number,
  interestRate?: number,
  monthlyPayment?: number
): number {
  if (!monthlyPayment || !interestRate) {
    // Estimate based on typical amortization
    const originalLoan = originalPrice - originalDownPayment;
    const estimatedPaymentEquity = originalLoan - currentBalance;
    return Math.max(0, estimatedPaymentEquity);
  }

  // Calculate total payments made
  const totalPayments = monthlyPayment * timeOwned * 12;
  
  // Calculate interest paid (simplified)
  const originalLoan = originalPrice - originalDownPayment;
  const averageBalance = (originalLoan + currentBalance) / 2;
  const totalInterest = (averageBalance * interestRate / 100) * timeOwned;
  
  // Payment equity = total payments - interest paid
  const paymentEquity = totalPayments - totalInterest;
  
  return Math.max(0, paymentEquity);
}

function calculateCombinedLTV(currentBalance: number, totalEquity: number, occupancyType: string): number {
  const propertyValue = currentBalance + totalEquity;
  
  // For investment properties, lenders typically allow higher LTV
  const maxLTV = occupancyType === 'Investment Property' ? 0.75 : 0.80;
  const maxBorrowable = propertyValue * maxLTV;
  
  return (currentBalance / propertyValue) * 100;
}

function calculateMonthlyEquityBuild(
  monthlyPayment?: number,
  interestRate?: number,
  currentBalance?: number,
  remainingTerm?: number
): number {
  if (!monthlyPayment || !interestRate || !currentBalance || !remainingTerm) {
    // Estimate based on typical amortization
    return currentBalance ? currentBalance / (remainingTerm || 30) / 12 : 0;
  }

  // Calculate principal portion of payment
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = remainingTerm * 12;
  
  // Principal portion = payment - interest portion
  const interestPortion = currentBalance * monthlyRate;
  const principalPortion = monthlyPayment - interestPortion;
  
  return Math.max(0, principalPortion);
}

function calculateBorrowableEquity(
  totalEquity: number,
  occupancyType: string,
  creditScore?: number,
  debtToIncomeRatio?: number
): number {
  let borrowablePercentage = 0.85; // Default 85%

  // Adjust based on occupancy type
  if (occupancyType === 'Investment Property') {
    borrowablePercentage = 0.75; // Lower for investment properties
  } else if (occupancyType === 'Secondary Home') {
    borrowablePercentage = 0.80; // Slightly lower for secondary homes
  }

  // Adjust based on credit score
  if (creditScore) {
    if (creditScore >= 760) {
      borrowablePercentage += 0.05; // Up to 90% for excellent credit
    } else if (creditScore < 620) {
      borrowablePercentage -= 0.10; // Down to 75% for poor credit
    }
  }

  // Adjust based on DTI ratio
  if (debtToIncomeRatio) {
    if (debtToIncomeRatio > 43) {
      borrowablePercentage -= 0.05; // Reduce for high DTI
    } else if (debtToIncomeRatio < 28) {
      borrowablePercentage += 0.03; // Increase for low DTI
    }
  }

  return totalEquity * Math.min(0.90, Math.max(0.70, borrowablePercentage));
}

function determineRefinancingOptions(
  equityPercentage: number,
  ltvRatio: number,
  occupancyType: string,
  creditScore?: number,
  debtToIncomeRatio?: number
): string[] {
  const options: string[] = [];

  // Cash-out refinance
  if (equityPercentage >= 20 && ltvRatio <= 80) {
    options.push('Cash-out refinance');
  }

  // Rate and term refinance
  if (ltvRatio <= 80) {
    options.push('Rate and term refinance');
  }

  // HELOC
  if (equityPercentage >= 15 && ltvRatio <= 85) {
    options.push('HELOC (Home Equity Line of Credit)');
  }

  // Home equity loan
  if (equityPercentage >= 20 && ltvRatio <= 80) {
    options.push('Home equity loan');
  }

  // Investment property refinancing
  if (occupancyType === 'Investment Property' && equityPercentage >= 25) {
    options.push('Investment property refinancing');
  }

  // VA IRRRL (if applicable)
  if (occupancyType === 'Primary Residence' && equityPercentage >= 10) {
    options.push('VA IRRRL (if VA loan)');
  }

  // FHA streamline (if applicable)
  if (occupancyType === 'Primary Residence' && equityPercentage >= 5) {
    options.push('FHA streamline refinance (if FHA loan)');
  }

  return options;
}

function generateRecommendations(
  inputs: MortgageEquityInputs,
  metrics: {
    totalEquity: number;
    equityPercentage: number;
    equityGrowth: number;
    loanToValueRatio: number;
    monthlyEquityBuild: number;
    timeOwned: number;
    equityGrowthRate: number;
  }
): string[] {
  const recommendations: string[] = [];
  const { totalEquity, equityPercentage, equityGrowth, loanToValueRatio, monthlyEquityBuild, timeOwned, equityGrowthRate } = metrics;

  // Equity level recommendations
  if (equityPercentage >= 50) {
    recommendations.push('High equity position - excellent borrowing power available.');
  } else if (equityPercentage >= 30) {
    recommendations.push('Good equity position - consider refinancing or home equity options.');
  } else if (equityPercentage >= 20) {
    recommendations.push('Moderate equity - focus on building equity through payments.');
  } else {
    recommendations.push('Low equity - prioritize building equity before considering additional borrowing.');
  }

  // LTV recommendations
  if (loanToValueRatio > 80) {
    recommendations.push('High LTV ratio - may need to pay PMI or consider FHA options.');
  } else if (loanToValueRatio <= 60) {
    recommendations.push('Low LTV ratio - excellent refinancing opportunities available.');
  }

  // Equity growth recommendations
  if (equityGrowth > 0 && timeOwned > 0) {
    if (equityGrowthRate > 10) {
      recommendations.push('Strong equity growth - consider leveraging for investment opportunities.');
    } else if (equityGrowthRate > 5) {
      recommendations.push('Good equity growth - property is appreciating well.');
    }
  }

  // Monthly equity build recommendations
  if (monthlyEquityBuild > 1000) {
    recommendations.push('High monthly equity build - consider accelerating payments for faster equity growth.');
  } else if (monthlyEquityBuild < 500) {
    recommendations.push('Low monthly equity build - consider refinancing to lower rate or shorter term.');
  }

  // Occupancy type recommendations
  if (inputs.occupancyType === 'Investment Property') {
    recommendations.push('Investment property - consider 1031 exchange or portfolio diversification strategies.');
  } else if (inputs.occupancyType === 'Secondary Home') {
    recommendations.push('Secondary home - ensure adequate emergency funds before leveraging equity.');
  }

  // Credit and DTI recommendations
  if (inputs.creditScore && inputs.creditScore < 680) {
    recommendations.push('Improve credit score to access better refinancing rates and terms.');
  }

  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 43) {
    recommendations.push('High DTI ratio - consider debt consolidation or income improvement strategies.');
  }

  // Interest rate recommendations
  if (inputs.interestRate && inputs.interestRate > 7) {
    recommendations.push('High interest rate - consider refinancing to lower rate if credit allows.');
  }

  // Property type recommendations
  if (inputs.propertyType === 'Condo') {
    recommendations.push('Condo property - check HOA restrictions on refinancing and equity loans.');
  }

  return recommendations;
}

export function calculateEquityProjection(
  inputs: MortgageEquityInputs,
  years: number = 5
): {
  year: number;
  projectedEquity: number;
  projectedLTV: number;
  projectedMonthlyEquity: number;
}[] {
  const projection = [];
  const { currentPropertyValue, currentMortgageBalance, monthlyEquityBuild, interestRate, remainingLoanTerm } = inputs;

  let currentEquity = currentPropertyValue - currentMortgageBalance;
  let currentBalance = currentMortgageBalance;
  let currentValue = currentPropertyValue;

  for (let year = 1; year <= years; year++) {
    // Project property value growth (assume 3% annual appreciation)
    currentValue *= 1.03;
    
    // Project mortgage balance reduction
    const annualEquityBuild = monthlyEquityBuild * 12;
    currentBalance = Math.max(0, currentBalance - annualEquityBuild);
    
    // Calculate new equity
    currentEquity = currentValue - currentBalance;
    
    // Calculate new LTV
    const projectedLTV = (currentBalance / currentValue) * 100;

    projection.push({
      year,
      projectedEquity: Math.round(currentEquity),
      projectedLTV: Math.round(projectedLTV * 100) / 100,
      projectedMonthlyEquity: Math.round(monthlyEquityBuild)
    });
  }

  return projection;
}

export function calculateRefinancingScenarios(
  inputs: MortgageEquityInputs,
  newRate: number,
  newTerm: number,
  cashOutAmount: number = 0
): {
  currentPayment: number;
  newPayment: number;
  paymentSavings: number;
  newBalance: number;
  newLTV: number;
  breakEvenMonths: number;
  totalSavings: number;
} {
  const { currentPropertyValue, currentMortgageBalance, monthlyPayment = 0, interestRate = 0, remainingLoanTerm = 30 } = inputs;

  // Calculate new loan amount
  const newBalance = currentMortgageBalance + cashOutAmount;
  
  // Calculate new payment
  const monthlyRate = newRate / 100 / 12;
  const totalPayments = newTerm * 12;
  const newPayment = newBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate payment savings
  const paymentSavings = monthlyPayment - newPayment;
  
  // Calculate new LTV
  const newLTV = (newBalance / currentPropertyValue) * 100;
  
  // Estimate closing costs (2-5% of loan amount)
  const closingCosts = newBalance * 0.03;
  
  // Calculate break-even
  const breakEvenMonths = paymentSavings > 0 ? closingCosts / paymentSavings : 0;
  
  // Calculate total savings over new term
  const totalSavings = paymentSavings * totalPayments - closingCosts;

  return {
    currentPayment: Math.round(monthlyPayment),
    newPayment: Math.round(newPayment),
    paymentSavings: Math.round(paymentSavings),
    newBalance: Math.round(newBalance),
    newLTV: Math.round(newLTV * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths),
    totalSavings: Math.round(totalSavings)
  };
}

export function generateEquityAnalysis(inputs: MortgageEquityInputs, outputs: MortgageEquityOutputs): string {
  let analysis = `# Mortgage Equity Analysis\n\n`;

  analysis += `## Summary\n`;
  analysis += `- **Total Equity**: $${outputs.totalEquity.toLocaleString()}\n`;
  analysis += `- **Equity Percentage**: ${outputs.equityPercentage}% of property value\n`;
  analysis += `- **Equity Growth**: $${outputs.equityGrowth.toLocaleString()} since purchase\n`;
  analysis += `- **Loan-to-Value Ratio**: ${outputs.loanToValueRatio}%\n`;
  analysis += `- **Borrowable Equity**: $${outputs.borrowableEquity.toLocaleString()}\n`;
  analysis += `- **Monthly Equity Build**: $${outputs.monthlyEquityBuild.toLocaleString()}\n\n`;

  analysis += `## Equity Breakdown\n\n`;
  analysis += `| Component | Amount | Percentage |\n`;
  analysis += `|-----------|--------|------------|\n`;
  analysis += `| Initial Down Payment | $${outputs.breakdown.summary.initialEquity.toLocaleString()} | ${Math.round((outputs.breakdown.summary.initialEquity / outputs.totalEquity) * 100)}% |\n`;
  analysis += `| Market Appreciation | $${outputs.appreciationValue.toLocaleString()} | ${Math.round((outputs.appreciationValue / outputs.totalEquity) * 100)}% |\n`;
  analysis += `| Property Improvements | $${outputs.breakdown.improvementValue.toLocaleString()} | ${Math.round((outputs.breakdown.improvementValue / outputs.totalEquity) * 100)}% |\n`;
  analysis += `| Payment Equity | $${outputs.breakdown.paymentEquity.toLocaleString()} | ${Math.round((outputs.breakdown.paymentEquity / outputs.totalEquity) * 100)}% |\n\n`;

  analysis += `## Refinancing Options\n\n`;
  if (outputs.refinancingOptions) {
    analysis += `**Available Options**: ${outputs.refinancingOptions}\n\n`;
  } else {
    analysis += `**Limited Options**: Focus on building equity before considering refinancing.\n\n`;
  }

  analysis += `## Recommendations\n\n`;
  analysis += outputs.recommendations;

  return analysis;
}