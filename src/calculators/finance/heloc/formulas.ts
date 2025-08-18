import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factor constants
const MARKET_TYPE_FACTORS = {
  'hot': 1.1,
  'stable': 1.0,
  'declining': 0.9
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'primary-residence': 1.0,
  'second-home': 1.1,
  'investment-property': 1.2
};

// Occupancy type factors
const OCCUPANCY_FACTORS = {
  'owner-occupied': 1.0,
  'non-owner-occupied': 1.15
};

// Property location factors
const LOCATION_FACTORS = {
  'urban': 1.05,
  'suburban': 1.0,
  'rural': 0.95
};

// Purpose factors
const PURPOSE_FACTORS = {
  'home-improvement': 1.0,
  'debt-consolidation': 1.05,
  'education': 1.0,
  'emergency-fund': 0.95,
  'investment': 1.1,
  'other': 1.0
};

// Credit score factors
const CREDIT_SCORE_FACTORS = {
  'excellent': 0.9, // 750+
  'good': 1.0, // 700-749
  'fair': 1.1, // 650-699
  'poor': 1.3 // Below 650
};

function calculateMonthlyPayment(loanAmount: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const termMonths = termYears * 12;
  
  if (monthlyRate === 0) return loanAmount / termMonths;
  
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                  (Math.pow(1 + monthlyRate, termMonths) - 1);
  return payment;
}

function calculateInterestOnlyPayment(balance: number, annualRate: number): number {
  return balance * (annualRate / 100 / 12);
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 5; // Base score
  
  // Property type
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  riskScore += (propertyFactor - 1.0) * 2;
  
  // Occupancy type
  const occupancyFactor = OCCUPANCY_FACTORS[inputs.occupancyType as keyof typeof OCCUPANCY_FACTORS] || 1.0;
  riskScore += (occupancyFactor - 1.0) * 2;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  riskScore += (marketFactor - 1.0) * 1.5;
  
  // Purpose
  const purposeFactor = PURPOSE_FACTORS[inputs.purpose as keyof typeof PURPOSE_FACTORS] || 1.0;
  riskScore += (purposeFactor - 1.0) * 1.5;
  
  // Credit score impact
  if (inputs.creditScore) {
    let creditFactor = 1.0;
    if (inputs.creditScore >= 750) creditFactor = 0.9;
    else if (inputs.creditScore >= 700) creditFactor = 1.0;
    else if (inputs.creditScore >= 650) creditFactor = 1.1;
    else creditFactor = 1.3;
    riskScore += (creditFactor - 1.0) * 2;
  }
  
  // CLTV impact
  const proposedCLTV = ((inputs.currentMortgageBalance || 0) + (inputs.requestedCreditLimit || 0)) / (inputs.homeValue || 1) * 100;
  if (proposedCLTV > 90) riskScore += 3;
  else if (proposedCLTV > 85) riskScore += 2;
  else if (proposedCLTV > 80) riskScore += 1;
  
  // Debt-to-income impact
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 50) riskScore += 2;
  else if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 40) riskScore += 1;
  
  return Math.max(1, Math.min(10, Math.round(riskScore)));
}

function calculateFeasibilityScore(inputs: CalculatorInputs): number {
  let feasibilityScore = 5; // Base score
  
  // Property type
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  feasibilityScore += (1.0 - propertyFactor) * 2;
  
  // Occupancy type
  const occupancyFactor = OCCUPANCY_FACTORS[inputs.occupancyType as keyof typeof OCCUPANCY_FACTORS] || 1.0;
  feasibilityScore += (1.0 - occupancyFactor) * 2;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  feasibilityScore += (marketFactor - 1.0) * 1.5;
  
  // Purpose
  const purposeFactor = PURPOSE_FACTORS[inputs.purpose as keyof typeof PURPOSE_FACTORS] || 1.0;
  feasibilityScore += (1.0 - purposeFactor) * 1.5;
  
  // Credit score impact
  if (inputs.creditScore) {
    let creditFactor = 1.0;
    if (inputs.creditScore >= 750) creditFactor = 0.9;
    else if (inputs.creditScore >= 700) creditFactor = 1.0;
    else if (inputs.creditScore >= 650) creditFactor = 1.1;
    else creditFactor = 1.3;
    feasibilityScore += (1.0 - creditFactor) * 2;
  }
  
  // Equity utilization
  const availableEquity = (inputs.homeValue || 0) - (inputs.currentMortgageBalance || 0);
  const equityUtilization = (inputs.requestedCreditLimit || 0) / availableEquity * 100;
  if (equityUtilization < 50) feasibilityScore += 2;
  else if (equityUtilization < 70) feasibilityScore += 1;
  
  return Math.max(1, Math.min(10, Math.round(feasibilityScore)));
}

function calculateLiquidityScore(inputs: CalculatorInputs): number {
  let liquidityScore = 5; // Base score
  
  // Property location
  const locationFactor = LOCATION_FACTORS[inputs.propertyLocation as keyof typeof LOCATION_FACTORS] || 1.0;
  liquidityScore += (locationFactor - 1.0) * 1.5;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  liquidityScore += (marketFactor - 1.0) * 1.5;
  
  // Property type
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  liquidityScore += (1.0 - propertyFactor) * 1.5;
  
  return Math.max(1, Math.min(10, Math.round(liquidityScore)));
}

function calculateInflationHedgeScore(inputs: CalculatorInputs): number {
  let hedgeScore = 5; // Base score
  
  // Property location
  const locationFactor = LOCATION_FACTORS[inputs.propertyLocation as keyof typeof LOCATION_FACTORS] || 1.0;
  hedgeScore += (locationFactor - 1.0) * 1.5;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  hedgeScore += (marketFactor - 1.0) * 1.5;
  
  // Property type
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  hedgeScore += (propertyFactor - 1.0) * 1.5;
  
  return Math.max(1, Math.min(10, Math.round(hedgeScore)));
}

function calculateFlexibilityScore(inputs: CalculatorInputs): number {
  let flexibilityScore = 8; // HELOCs are inherently flexible
  
  // Draw period length
  const drawPeriod = inputs.drawPeriod || 10;
  if (drawPeriod >= 15) flexibilityScore += 1;
  else if (drawPeriod >= 10) flexibilityScore += 0;
  else flexibilityScore -= 1;
  
  // Repayment period length
  const repaymentPeriod = inputs.repaymentPeriod || 20;
  if (repaymentPeriod >= 25) flexibilityScore += 1;
  else if (repaymentPeriod >= 20) flexibilityScore += 0;
  else flexibilityScore -= 1;
  
  // Fees impact
  const totalFees = (inputs.originationFee || 0) + (inputs.appraisalFee || 0) + (inputs.titleFees || 0) + (inputs.closingCosts || 0);
  if (totalFees < 1000) flexibilityScore += 1;
  else if (totalFees > 3000) flexibilityScore -= 1;
  
  return Math.max(1, Math.min(10, Math.round(flexibilityScore)));
}

function generateHELOCAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let analysis = `# HELOC Analysis\n\n`;
  
  analysis += `## Executive Summary\n`;
  analysis += `This HELOC analysis evaluates the feasibility and cost-effectiveness of a home equity line of credit for a ${inputs.propertyType} property in a ${inputs.propertyLocation} ${inputs.marketType} market.\n\n`;
  
  analysis += `**Key Metrics:**\n`;
  analysis += `- Home Value: $${(inputs.homeValue || 0).toLocaleString()}\n`;
  analysis += `- Current Mortgage: $${(inputs.currentMortgageBalance || 0).toLocaleString()}\n`;
  analysis += `- Available Equity: $${outputs.availableEquity.toLocaleString()}\n`;
  analysis += `- Requested Credit Limit: $${(inputs.requestedCreditLimit || 0).toLocaleString()}\n`;
  analysis += `- Approved Credit Limit: $${outputs.approvedCreditLimit.toLocaleString()}\n`;
  analysis += `- Interest Rate: ${inputs.interestRate}%\n`;
  analysis += `- Current LTV: ${outputs.currentLTV.toFixed(1)}%\n`;
  analysis += `- Proposed CLTV: ${outputs.proposedCLTV.toFixed(1)}%\n\n`;
  
  analysis += `## Financial Analysis\n`;
  analysis += `**Payments:**\n`;
  analysis += `- Monthly Interest-Only (Draw Period): $${outputs.monthlyInterestOnly.toLocaleString()}\n`;
  analysis += `- Monthly P&I (Repayment Period): $${outputs.monthlyPrincipalInterest.toLocaleString()}\n`;
  analysis += `- Total Closing Costs: $${outputs.totalFees.toLocaleString()}\n`;
  analysis += `- APR: ${outputs.annualPercentageRate.toFixed(2)}%\n`;
  analysis += `- Effective Rate: ${outputs.effectiveRate.toFixed(2)}%\n\n`;
  
  analysis += `**Cash Flow Impact:**\n`;
  analysis += `- Monthly Cash Flow Impact: $${outputs.monthlyCashFlow.toLocaleString()}\n`;
  analysis += `- Annual Cash Flow Impact: $${outputs.annualCashFlow.toLocaleString()}\n`;
  analysis += `- Payment-to-Income Ratio: ${outputs.paymentToIncome.toFixed(2)}%\n`;
  analysis += `- Debt Service Coverage: ${outputs.debtServiceCoverage.toFixed(2)}\n\n`;
  
  analysis += `**Investment Metrics:**\n`;
  analysis += `- Equity Utilization: ${outputs.equityUtilization.toFixed(1)}%\n`;
  analysis += `- Cost of Borrowing: ${outputs.costOfBorrowing.toFixed(2)}%\n`;
  analysis += `- Tax Benefits: $${outputs.taxBenefits.toLocaleString()}\n`;
  analysis += `- Break-Even Months: ${outputs.breakEvenMonths.toFixed(1)}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `**Risk Score: ${outputs.riskScore}/10** ${outputs.riskScore <= 3 ? '🟢 Low' : outputs.riskScore <= 6 ? '🟡 Medium' : '🔴 High'}\n`;
  analysis += `**Feasibility Score: ${outputs.feasibilityScore}/10** ${outputs.feasibilityScore >= 7 ? '🟢 High' : outputs.feasibilityScore >= 4 ? '🟡 Medium' : '🔴 Low'}\n\n`;
  
  analysis += `**Key Risk Factors:**\n`;
  analysis += `- Property type: ${inputs.propertyType}\n`;
  analysis += `- Occupancy: ${inputs.occupancyType}\n`;
  analysis += `- Market conditions: ${inputs.marketType}\n`;
  analysis += `- Purpose: ${inputs.purpose}\n`;
  if (inputs.creditScore) {
    analysis += `- Credit score: ${inputs.creditScore}\n`;
  }
  analysis += `\n`;
  
  analysis += `## Investment Grade: ${outputs.investmentGrade}\n`;
  analysis += `**Recommended Action: ${outputs.recommendedAction}**\n\n`;
  
  analysis += `## Purpose Analysis\n`;
  analysis += `${outputs.purposeAnalysis}\n\n`;
  
  analysis += `## Market Analysis\n`;
  analysis += `${outputs.marketAnalysis}\n\n`;
  
  analysis += `## Optimization Opportunities\n`;
  analysis += `${outputs.optimizationOpportunities}\n\n`;
  
  analysis += `## Comparison Analysis\n`;
  analysis += `${outputs.comparisonAnalysis}\n\n`;
  
  analysis += `## Sensitivity Analysis\n`;
  analysis += `${outputs.sensitivityAnalysis}\n\n`;
  
  analysis += `## Risk Factors\n`;
  analysis += `${outputs.riskFactors}\n\n`;
  
  return analysis;
}

export function calculateHELOC(inputs: CalculatorInputs): CalculatorOutputs {
  const homeValue = inputs.homeValue || 0;
  const currentMortgageBalance = inputs.currentMortgageBalance || 0;
  const requestedCreditLimit = inputs.requestedCreditLimit || 0;
  const interestRate = inputs.interestRate || 0;
  const drawPeriod = inputs.drawPeriod || 0;
  const repaymentPeriod = inputs.repaymentPeriod || 0;
  const maxLTV = inputs.maxLTV || 85;
  const maxCLTV = inputs.maxCLTV || 90;
  const estimatedUsage = inputs.estimatedUsage || 60;
  const monthlyIncome = inputs.monthlyIncome || 0;
  const monthlyDebtPayments = inputs.monthlyDebtPayments || 0;
  const taxRate = inputs.taxRate || 25;
  const inflationRate = inputs.inflationRate || 3;
  
  // Calculate basic equity metrics
  const availableEquity = homeValue - currentMortgageBalance;
  const maxCreditLimit = (homeValue * (maxCLTV / 100)) - currentMortgageBalance;
  const approvedCreditLimit = Math.min(requestedCreditLimit, maxCreditLimit);
  
  // Calculate LTV ratios
  const currentLTV = (currentMortgageBalance / homeValue) * 100;
  const proposedCLTV = ((currentMortgageBalance + approvedCreditLimit) / homeValue) * 100;
  
  // Calculate payments
  const estimatedBalance = approvedCreditLimit * (estimatedUsage / 100);
  const monthlyInterestOnly = calculateInterestOnlyPayment(estimatedBalance, interestRate);
  const monthlyPrincipalInterest = calculateMonthlyPayment(estimatedBalance, interestRate, repaymentPeriod);
  
  // Calculate fees
  const totalFees = (inputs.originationFee || 0) + (inputs.appraisalFee || 0) + 
                   (inputs.titleFees || 0) + (inputs.closingCosts || 0);
  
  // Calculate APR and effective rate
  const monthlyRate = interestRate / 100 / 12;
  const totalTerm = drawPeriod + repaymentPeriod;
  const apr = ((estimatedBalance + totalFees) / estimatedBalance) ** (1 / totalTerm) - 1;
  const effectiveRate = ((estimatedBalance + totalFees) / estimatedBalance) ** (1 / totalTerm) - 1;
  
  // Calculate total interest and cost
  const totalInterest = (monthlyInterestOnly * drawPeriod * 12) + 
                       (monthlyPrincipalInterest * repaymentPeriod * 12) - estimatedBalance;
  const totalCost = estimatedBalance + totalInterest + totalFees;
  
  // Calculate debt service metrics
  const totalMonthlyDebt = monthlyDebtPayments + monthlyInterestOnly;
  const debtServiceCoverage = monthlyIncome > 0 ? monthlyIncome / totalMonthlyDebt : 0;
  const paymentToIncome = monthlyIncome > 0 ? (monthlyInterestOnly / monthlyIncome) * 100 : 0;
  
  // Calculate break-even
  const breakEvenMonths = monthlyInterestOnly > 0 ? totalFees / monthlyInterestOnly : 0;
  
  // Calculate tax benefits
  const annualInterest = totalInterest / totalTerm;
  const taxBenefits = (annualInterest * (taxRate / 100)) * totalTerm;
  
  // Calculate scores
  const riskScore = calculateRiskScore(inputs);
  const feasibilityScore = calculateFeasibilityScore(inputs);
  const liquidityScore = calculateLiquidityScore(inputs);
  const inflationHedge = calculateInflationHedgeScore(inputs);
  const flexibilityScore = calculateFlexibilityScore(inputs);
  
  // Determine investment grade
  let investmentGrade = 'D';
  if (riskScore <= 3 && feasibilityScore >= 7) investmentGrade = 'A';
  else if (riskScore <= 5 && feasibilityScore >= 5) investmentGrade = 'B';
  else if (riskScore <= 7 && feasibilityScore >= 3) investmentGrade = 'C';
  
  // Determine recommended action
  let recommendedAction = 'Proceed with caution';
  if (investmentGrade === 'A') recommendedAction = 'Strong buy - Excellent opportunity';
  else if (investmentGrade === 'B') recommendedAction = 'Buy - Good opportunity';
  else if (investmentGrade === 'C') recommendedAction = 'Hold - Consider alternatives';
  else recommendedAction = 'Avoid - High risk, low benefit';
  
  // Calculate maximum borrowing amount
  const maxBorrowingAmount = monthlyIncome > 0 ? 
    (monthlyIncome * 0.43) - monthlyDebtPayments : approvedCreditLimit;
  
  const recommendedCreditLimit = Math.min(approvedCreditLimit, maxBorrowingAmount);
  
  // Calculate cash flow impact
  const monthlyCashFlow = -monthlyInterestOnly;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate equity utilization
  const equityUtilization = (approvedCreditLimit / availableEquity) * 100;
  
  // Calculate cost of borrowing
  const costOfBorrowing = ((totalCost / estimatedBalance) ** (1 / totalTerm) - 1) * 100;
  
  // Generate analysis components
  const purposeAnalysis = `The HELOC is intended for ${inputs.purpose}. This purpose ${inputs.purpose === 'home-improvement' ? 'typically increases property value and may be tax-deductible' : inputs.purpose === 'debt-consolidation' ? 'can reduce overall interest costs but requires discipline' : inputs.purpose === 'emergency-fund' ? 'provides flexibility but should be used sparingly' : inputs.purpose === 'investment' ? 'offers potential returns but carries additional risk' : 'should be evaluated based on specific needs'}.`;
  
  const marketAnalysis = `The ${inputs.marketType} market conditions in ${inputs.propertyLocation} area ${inputs.marketType === 'hot' ? 'favor property appreciation and may support higher credit limits' : inputs.marketType === 'stable' ? 'provide predictable equity growth' : 'may limit equity growth and credit availability'}.`;
  
  const optimizationOpportunities = `Consider negotiating lower fees, extending the draw period for flexibility, or reducing the credit limit to minimize costs.`;
  
  const comparisonAnalysis = `HELOCs offer flexibility and lower rates than credit cards but higher rates than first mortgages. Compare with cash-out refinancing, personal loans, or home equity loans.`;
  
  const sensitivityAnalysis = `Key variables affecting costs: interest rate changes (±1% = ±${Math.round(totalInterest * 0.1)}% total interest), property value changes (±10% = ±${Math.round(availableEquity * 0.1)}% available equity), and usage changes (±20% = ±${Math.round(monthlyInterestOnly * 0.2)}% monthly payment).`;
  
  const riskFactors = `Primary risks include variable interest rates, potential for over-borrowing, and property value declines. Mitigation strategies include conservative borrowing limits, regular payment discipline, and monitoring market conditions.`;
  
  return {
    availableEquity: Math.round(availableEquity),
    maxCreditLimit: Math.round(maxCreditLimit),
    approvedCreditLimit: Math.round(approvedCreditLimit),
    currentLTV: Math.round(currentLTV * 100) / 100,
    proposedCLTV: Math.round(proposedCLTV * 100) / 100,
    monthlyInterestOnly: Math.round(monthlyInterestOnly),
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
    totalFees: Math.round(totalFees),
    annualPercentageRate: Math.round(apr * 12 * 100 * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 12 * 100 * 100) / 100,
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost),
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    paymentToIncome: Math.round(paymentToIncome * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths * 10) / 10,
    taxBenefits: Math.round(taxBenefits),
    inflationHedge,
    liquidityScore,
    flexibilityScore,
    riskScore,
    feasibilityScore,
    maxBorrowingAmount: Math.round(maxBorrowingAmount),
    recommendedCreditLimit: Math.round(recommendedCreditLimit),
    monthlyCashFlow: Math.round(monthlyCashFlow),
    annualCashFlow: Math.round(annualCashFlow),
    equityUtilization: Math.round(equityUtilization * 100) / 100,
    costOfBorrowing: Math.round(costOfBorrowing * 100) / 100,
    investmentGrade,
    recommendedAction,
    purposeAnalysis,
    riskFactors,
    optimizationOpportunities,
    marketAnalysis,
    comparisonAnalysis,
    sensitivityAnalysis,
    helocAnalysis: 'Comprehensive HELOC analysis completed'
  };
}

export { generateHELOCAnalysis };
