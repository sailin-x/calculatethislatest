import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factor constants
const MARKET_TYPE_FACTORS = {
  'hot': 1.2,
  'stable': 1.0,
  'declining': 0.8
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'single-family': 1.0,
  'multi-family': 1.1,
  'commercial': 1.2,
  'land': 1.3,
  'mixed-use': 1.15,
  'industrial': 1.25
};

// Property condition factors
const PROPERTY_CONDITION_FACTORS = {
  'excellent': 0.9,
  'good': 1.0,
  'fair': 1.1,
  'poor': 1.2,
  'needs-repair': 1.3
};

// Location factors
const LOCATION_FACTORS = {
  'urban': 1.1,
  'suburban': 1.0,
  'rural': 0.9
};

// Loan purpose factors
const LOAN_PURPOSE_FACTORS = {
  'purchase': 1.0,
  'refinance': 1.05,
  'fix-and-flip': 1.1,
  'construction': 1.2,
  'bridge': 1.15,
  'cash-out': 1.1
};

// Exit strategy factors
const EXIT_STRATEGY_FACTORS = {
  'sell': 1.0,
  'refinance': 1.05,
  'hold': 1.1,
  'flip': 0.95
};

// Experience level factors
const EXPERIENCE_FACTORS = {
  'beginner': 1.2,
  'intermediate': 1.1,
  'experienced': 1.0,
  'professional': 0.9
};

// Typical LTV limits by property type
const LTV_LIMITS = {
  'single-family': 0.75,
  'multi-family': 0.70,
  'commercial': 0.65,
  'land': 0.50,
  'mixed-use': 0.70,
  'industrial': 0.60
};

// Typical LTC limits by loan purpose
const LTC_LIMITS = {
  'purchase': 0.80,
  'refinance': 0.75,
  'fix-and-flip': 0.85,
  'construction': 0.90,
  'bridge': 0.80,
  'cash-out': 0.70
};

function calculateMonthlyPayment(loanAmount: number, annualRate: number, termMonths: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / termMonths;
  
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                  (Math.pow(1 + monthlyRate, termMonths) - 1);
  return payment;
}

function calculateTotalInterest(loanAmount: number, monthlyPayment: number, termMonths: number): number {
  return (monthlyPayment * termMonths) - loanAmount;
}

function calculateIRR(cashFlows: number[]): number {
  // Simplified IRR calculation using trial and error
  let rate = 0.1;
  let npv = 0;
  const tolerance = 0.0001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    npv = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + rate, j);
    }
    
    if (Math.abs(npv) < tolerance) {
      return rate * 100;
    }
    
    // Simple adjustment
    if (npv > 0) {
      rate += 0.01;
    } else {
      rate -= 0.01;
    }
    
    if (rate < -0.99) rate = -0.99;
    if (rate > 10) rate = 10;
  }
  
  return rate * 100;
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 5; // Base score
  
  // Property condition
  const conditionFactor = PROPERTY_CONDITION_FACTORS[inputs.propertyCondition as keyof typeof PROPERTY_CONDITION_FACTORS] || 1.0;
  riskScore += (conditionFactor - 1.0) * 2;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  riskScore += (marketFactor - 1.0) * 1.5;
  
  // Loan purpose
  const purposeFactor = LOAN_PURPOSE_FACTORS[inputs.loanPurpose as keyof typeof LOAN_PURPOSE_FACTORS] || 1.0;
  riskScore += (purposeFactor - 1.0) * 1.5;
  
  // Experience level
  if (inputs.experienceLevel) {
    const experienceFactor = EXPERIENCE_FACTORS[inputs.experienceLevel as keyof typeof EXPERIENCE_FACTORS] || 1.0;
    riskScore += (experienceFactor - 1.0) * 1.5;
  }
  
  // LTV impact
  const ltv = (inputs.loanAmount || 0) / (inputs.propertyValue || 1);
  if (ltv > 0.8) riskScore += 2;
  else if (ltv > 0.7) riskScore += 1;
  
  // Timeline impact
  if (inputs.timeline && inputs.timeline > 12) riskScore += 1;
  
  return Math.max(1, Math.min(10, Math.round(riskScore)));
}

function calculateFeasibilityScore(inputs: CalculatorInputs): number {
  let feasibilityScore = 5; // Base score
  
  // Property condition
  const conditionFactor = PROPERTY_CONDITION_FACTORS[inputs.propertyCondition as keyof typeof PROPERTY_CONDITION_FACTORS] || 1.0;
  feasibilityScore += (1.0 - conditionFactor) * 2;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  feasibilityScore += (marketFactor - 1.0) * 1.5;
  
  // Exit strategy
  const exitFactor = EXIT_STRATEGY_FACTORS[inputs.exitStrategy as keyof typeof EXIT_STRATEGY_FACTORS] || 1.0;
  feasibilityScore += (1.0 - exitFactor) * 1.5;
  
  // Experience level
  if (inputs.experienceLevel) {
    const experienceFactor = EXPERIENCE_FACTORS[inputs.experienceLevel as keyof typeof EXPERIENCE_FACTORS] || 1.0;
    feasibilityScore += (1.0 - experienceFactor) * 1.5;
  }
  
  // ARV vs current value
  if (inputs.afterRepairValue && inputs.propertyValue) {
    const arvRatio = inputs.afterRepairValue / inputs.propertyValue;
    if (arvRatio > 1.3) feasibilityScore += 2;
    else if (arvRatio > 1.2) feasibilityScore += 1;
  }
  
  return Math.max(1, Math.min(10, Math.round(feasibilityScore)));
}

function calculateLiquidityScore(inputs: CalculatorInputs): number {
  let liquidityScore = 5; // Base score
  
  // Property type
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  liquidityScore += (1.0 - propertyFactor) * 1.5;
  
  // Location
  const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
  liquidityScore += (locationFactor - 1.0) * 1.5;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  liquidityScore += (marketFactor - 1.0) * 1.5;
  
  // Exit strategy
  const exitFactor = EXIT_STRATEGY_FACTORS[inputs.exitStrategy as keyof typeof EXIT_STRATEGY_FACTORS] || 1.0;
  liquidityScore += (1.0 - exitFactor) * 1.5;
  
  return Math.max(1, Math.min(10, Math.round(liquidityScore)));
}

function calculateInflationHedgeScore(inputs: CalculatorInputs): number {
  let hedgeScore = 5; // Base score
  
  // Property type
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  hedgeScore += (propertyFactor - 1.0) * 1.5;
  
  // Location
  const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
  hedgeScore += (locationFactor - 1.0) * 1.5;
  
  // Market type
  const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
  hedgeScore += (marketFactor - 1.0) * 1.5;
  
  return Math.max(1, Math.min(10, Math.round(hedgeScore)));
}

function calculateDiversificationScore(inputs: CalculatorInputs): number {
  let diversificationScore = 5; // Base score
  
  // Property type diversification
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  diversificationScore += (propertyFactor - 1.0) * 1.5;
  
  // Location diversification
  const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
  diversificationScore += (locationFactor - 1.0) * 1.5;
  
  return Math.max(1, Math.min(10, Math.round(diversificationScore)));
}

function generateHardMoneyLoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let analysis = `# Hard Money Loan Analysis\n\n`;
  
  analysis += `## Executive Summary\n`;
  analysis += `This hard money loan analysis evaluates the feasibility and profitability of a ${inputs.loanPurpose} project for a ${inputs.propertyType} property in a ${inputs.location} ${inputs.marketType} market.\n\n`;
  
  analysis += `**Key Metrics:**\n`;
  analysis += `- Loan Amount: $${(inputs.loanAmount || 0).toLocaleString()}\n`;
  analysis += `- Property Value: $${(inputs.propertyValue || 0).toLocaleString()}\n`;
  analysis += `- Interest Rate: ${inputs.interestRate}%\n`;
  analysis += `- Loan Term: ${inputs.loanTerm} months\n`;
  analysis += `- LTV Ratio: ${outputs.loanToValue.toFixed(1)}%\n`;
  analysis += `- Monthly Payment: $${outputs.monthlyPayment.toLocaleString()}\n`;
  analysis += `- Total Cost: $${outputs.totalCost.toLocaleString()}\n\n`;
  
  analysis += `## Financial Analysis\n`;
  analysis += `**Cash Flow:**\n`;
  analysis += `- Monthly Cash Flow: $${outputs.monthlyCashFlow.toLocaleString()}\n`;
  analysis += `- Total Cash Flow: $${outputs.totalCashFlow.toLocaleString()}\n`;
  analysis += `- Cash-on-Cash Return: ${outputs.cashOnCashReturn.toFixed(2)}%\n`;
  analysis += `- IRR: ${outputs.internalRateOfReturn.toFixed(2)}%\n`;
  analysis += `- Break-Even: ${outputs.breakEvenMonths.toFixed(1)} months\n\n`;
  
  analysis += `**Investment Metrics:**\n`;
  analysis += `- Profit Margin: ${outputs.profitMargin.toFixed(2)}%\n`;
  analysis += `- NPV: $${outputs.netPresentValue.toLocaleString()}\n`;
  analysis += `- Tax Benefits: $${outputs.taxBenefits.toLocaleString()}\n`;
  analysis += `- Equity Build-Up: $${outputs.equityBuildUp.toLocaleString()}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `**Risk Score: ${outputs.riskScore}/10** ${outputs.riskScore <= 3 ? '🟢 Low' : outputs.riskScore <= 6 ? '🟡 Medium' : '🔴 High'}\n`;
  analysis += `**Feasibility Score: ${outputs.feasibilityScore}/10** ${outputs.feasibilityScore >= 7 ? '🟢 High' : outputs.feasibilityScore >= 4 ? '🟡 Medium' : '🔴 Low'}\n\n`;
  
  analysis += `**Key Risk Factors:**\n`;
  analysis += `- Property condition: ${inputs.propertyCondition}\n`;
  analysis += `- Market conditions: ${inputs.marketType}\n`;
  analysis += `- Loan purpose: ${inputs.loanPurpose}\n`;
  analysis += `- Exit strategy: ${inputs.exitStrategy}\n`;
  if (inputs.experienceLevel) {
    analysis += `- Borrower experience: ${inputs.experienceLevel}\n`;
  }
  analysis += `\n`;
  
  analysis += `## Investment Grade: ${outputs.investmentGrade}\n`;
  analysis += `**Recommended Action: ${outputs.recommendedAction}**\n\n`;
  
  analysis += `## Exit Strategy Analysis\n`;
  analysis += `${outputs.exitStrategyAnalysis}\n\n`;
  
  analysis += `## Timeline Analysis\n`;
  analysis += `${outputs.timelineAnalysis}\n\n`;
  
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

export function calculateHardMoneyLoan(inputs: CalculatorInputs): CalculatorOutputs {
  const loanAmount = inputs.loanAmount || 0;
  const propertyValue = inputs.propertyValue || 0;
  const interestRate = inputs.interestRate || 0;
  const loanTerm = inputs.loanTerm || 0;
  const points = inputs.points || 0;
  const downPayment = inputs.downPayment || 0;
  const closingCosts = inputs.closingCosts || 0;
  const renovationBudget = inputs.renovationBudget || 0;
  const afterRepairValue = inputs.afterRepairValue || propertyValue;
  const monthlyExpenses = inputs.monthlyExpenses || 0;
  const taxRate = inputs.taxRate || 25;
  const inflationRate = inputs.inflationRate || 3;
  
  // Calculate basic loan metrics
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const totalInterest = calculateTotalInterest(loanAmount, monthlyPayment, loanTerm);
  const pointsCost = (points / 100) * loanAmount;
  
  // Calculate fees
  const totalFees = pointsCost + (inputs.appraisalFees || 0) + (inputs.titleFees || 0) + 
                   (inputs.escrowFees || 0) + (inputs.inspectionFees || 0) + 
                   (inputs.processingFees || 0) + (inputs.wireFees || 0) + closingCosts;
  
  const totalCost = loanAmount + totalInterest + totalFees;
  
  // Calculate ratios
  const loanToValue = (loanAmount / propertyValue) * 100;
  const totalProjectCost = propertyValue + renovationBudget + totalFees;
  const loanToCost = (loanAmount / totalProjectCost) * 100;
  
  // Calculate APR
  const monthlyRate = interestRate / 100 / 12;
  const apr = ((totalCost / loanAmount) ** (1 / loanTerm) - 1) * 12 * 100;
  const effectiveRate = ((totalCost / loanAmount) ** (1 / loanTerm) - 1) * 12 * 100;
  
  // Calculate cash flow
  const monthlyCashFlow = -monthlyPayment - monthlyExpenses;
  const totalCashFlow = monthlyCashFlow * loanTerm;
  
  // Calculate investment metrics
  const totalInvestment = downPayment + totalFees + renovationBudget;
  const netAnnualCashFlow = monthlyCashFlow * 12;
  const cashOnCashReturn = totalInvestment > 0 ? (netAnnualCashFlow / totalInvestment) * 100 : 0;
  
  // Calculate IRR
  const cashFlows = [-totalInvestment];
  for (let i = 0; i < loanTerm; i++) {
    cashFlows.push(monthlyCashFlow);
  }
  if (inputs.exitStrategy === 'sell' || inputs.exitStrategy === 'flip') {
    cashFlows[cashFlows.length - 1] += afterRepairValue - loanAmount;
  }
  const internalRateOfReturn = calculateIRR(cashFlows);
  
  // Calculate NPV
  const discountRate = (interestRate + inflationRate) / 100;
  let npv = -totalInvestment;
  for (let i = 0; i < cashFlows.length - 1; i++) {
    npv += cashFlows[i + 1] / Math.pow(1 + discountRate / 12, i + 1);
  }
  if (inputs.exitStrategy === 'sell' || inputs.exitStrategy === 'flip') {
    npv += (afterRepairValue - loanAmount) / Math.pow(1 + discountRate / 12, loanTerm);
  }
  
  // Calculate profit margin
  const totalRevenue = afterRepairValue;
  const totalCosts = totalInvestment + Math.abs(totalCashFlow);
  const profitMargin = totalRevenue > 0 ? ((totalRevenue - totalCosts) / totalRevenue) * 100 : 0;
  
  // Calculate break-even
  const breakEvenMonths = monthlyCashFlow < 0 ? Math.abs(totalInvestment / monthlyCashFlow) : 0;
  
  // Calculate equity build-up
  const equityBuildUp = totalInterest > 0 ? (totalInterest / loanTerm) * (loanTerm / 12) : 0;
  
  // Calculate tax benefits
  const annualInterest = totalInterest / (loanTerm / 12);
  const taxBenefits = (annualInterest * (taxRate / 100)) * (loanTerm / 12);
  
  // Calculate scores
  const riskScore = calculateRiskScore(inputs);
  const feasibilityScore = calculateFeasibilityScore(inputs);
  const liquidityScore = calculateLiquidityScore(inputs);
  const inflationHedge = calculateInflationHedgeScore(inputs);
  const diversificationScore = calculateDiversificationScore(inputs);
  
  // Determine investment grade
  let investmentGrade = 'D';
  if (cashOnCashReturn > 15 && riskScore <= 4) investmentGrade = 'A';
  else if (cashOnCashReturn > 10 && riskScore <= 6) investmentGrade = 'B';
  else if (cashOnCashReturn > 5 && riskScore <= 8) investmentGrade = 'C';
  
  // Determine recommended action
  let recommendedAction = 'Proceed with caution';
  if (investmentGrade === 'A') recommendedAction = 'Strong buy - Excellent opportunity';
  else if (investmentGrade === 'B') recommendedAction = 'Buy - Good opportunity';
  else if (investmentGrade === 'C') recommendedAction = 'Hold - Consider alternatives';
  else recommendedAction = 'Avoid - High risk, low return';
  
  // Calculate maximum loan amounts
  const maxLTV = LTV_LIMITS[inputs.propertyType as keyof typeof LTV_LIMITS] || 0.75;
  const maxLTC = LTC_LIMITS[inputs.loanPurpose as keyof typeof LTC_LIMITS] || 0.80;
  const maxLoanAmountLTV = propertyValue * maxLTV;
  const maxLoanAmountLTC = totalProjectCost * maxLTC;
  const maxLoanAmount = Math.min(maxLoanAmountLTV, maxLoanAmountLTC);
  
  const minDownPayment = totalProjectCost - maxLoanAmount;
  const maxPropertyValue = loanAmount / maxLTV;
  
  // Generate analysis components
  const exitStrategyAnalysis = `The planned exit strategy is to ${inputs.exitStrategy}. This strategy ${inputs.exitStrategy === 'flip' ? 'offers quick returns but requires careful timing' : inputs.exitStrategy === 'refinance' ? 'provides long-term stability but depends on market conditions' : inputs.exitStrategy === 'sell' ? 'offers flexibility but requires finding a buyer' : 'provides ongoing income but requires property management'}.`;
  
  const timelineAnalysis = inputs.timeline ? `The project timeline of ${inputs.timeline} months is ${inputs.timeline <= loanTerm ? 'feasible within the loan term' : 'longer than the loan term, requiring extension or refinance'}.` : 'No specific timeline provided.';
  
  const marketAnalysis = `The ${inputs.marketType} market conditions in ${inputs.location} area ${inputs.marketType === 'hot' ? 'favor quick sales and appreciation' : inputs.marketType === 'stable' ? 'provide predictable returns' : 'require careful timing and may limit exit options'}.`;
  
  const optimizationOpportunities = `Consider negotiating lower points, extending the loan term for better cash flow, or increasing the down payment to reduce monthly payments.`;
  
  const comparisonAnalysis = `Hard money loans offer speed and flexibility but at higher costs than conventional financing. Compare with private money, portfolio loans, or cash purchases.`;
  
  const sensitivityAnalysis = `Key variables affecting returns: property value appreciation (±10% = ±${Math.round(profitMargin * 0.1)}% profit margin), interest rate changes (±1% = ±${Math.round(cashOnCashReturn * 0.05)}% CoC return), and timeline delays (±3 months = ±${Math.round(profitMargin * 0.05)}% profit margin).`;
  
  const riskFactors = `Primary risks include market downturns, construction delays, cost overruns, and exit strategy failure. Mitigation strategies include thorough due diligence, conservative projections, and having backup exit plans.`;
  
  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost),
    pointsCost: Math.round(pointsCost),
    totalFees: Math.round(totalFees),
    loanToValue: Math.round(loanToValue * 100) / 100,
    loanToCost: Math.round(loanToCost * 100) / 100,
    annualPercentageRate: Math.round(apr * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths * 10) / 10,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    internalRateOfReturn: Math.round(internalRateOfReturn * 100) / 100,
    netPresentValue: Math.round(npv),
    profitMargin: Math.round(profitMargin * 100) / 100,
    riskScore,
    feasibilityScore,
    maxLoanAmount: Math.round(maxLoanAmount),
    minDownPayment: Math.round(minDownPayment),
    maxPropertyValue: Math.round(maxPropertyValue),
    monthlyCashFlow: Math.round(monthlyCashFlow),
    totalCashFlow: Math.round(totalCashFlow),
    equityBuildUp: Math.round(equityBuildUp),
    taxBenefits: Math.round(taxBenefits),
    inflationHedge,
    liquidityScore,
    diversificationScore,
    investmentGrade,
    recommendedAction,
    exitStrategyAnalysis,
    timelineAnalysis,
    riskFactors,
    optimizationOpportunities,
    marketAnalysis,
    comparisonAnalysis,
    sensitivityAnalysis,
    hardMoneyLoanAnalysis: 'Comprehensive hard money loan analysis completed'
  };
}

export { generateHardMoneyLoanAnalysis };
