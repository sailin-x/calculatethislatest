import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// HECM Principal Limit Factors (simplified - in practice these vary by lender and market conditions)
const PRINCIPAL_LIMIT_FACTORS = {
  62: 0.26, 63: 0.27, 64: 0.28, 65: 0.29, 66: 0.30, 67: 0.31, 68: 0.32, 69: 0.33, 70: 0.34,
  71: 0.35, 72: 0.36, 73: 0.37, 74: 0.38, 75: 0.39, 76: 0.40, 77: 0.41, 78: 0.42, 79: 0.43, 80: 0.44,
  81: 0.45, 82: 0.46, 83: 0.47, 84: 0.48, 85: 0.49, 86: 0.50, 87: 0.51, 88: 0.52, 89: 0.53, 90: 0.54,
  91: 0.55, 92: 0.56, 93: 0.57, 94: 0.58, 95: 0.59, 96: 0.60, 97: 0.61, 98: 0.62, 99: 0.63, 100: 0.64
};

// Interest rate adjustments for principal limit factors
const RATE_ADJUSTMENTS = {
  1: 1.0, 1.5: 0.98, 2: 0.96, 2.5: 0.94, 3: 0.92, 3.5: 0.90, 4: 0.88, 4.5: 0.86, 5: 0.84,
  5.5: 0.82, 6: 0.80, 6.5: 0.78, 7: 0.76, 7.5: 0.74, 8: 0.72, 8.5: 0.70, 9: 0.68, 9.5: 0.66, 10: 0.64,
  10.5: 0.62, 11: 0.60, 11.5: 0.58, 12: 0.56, 12.5: 0.54, 13: 0.52, 13.5: 0.50, 14: 0.48, 14.5: 0.46, 15: 0.44
};

// Property type adjustments
const PROPERTY_TYPE_ADJUSTMENTS = {
  'single-family': 1.0,
  'condo': 0.95,
  'townhouse': 0.98,
  'manufactured': 0.90,
  'multi-unit': 0.92
};

// Location adjustments
const LOCATION_ADJUSTMENTS = {
  'urban': 1.0,
  'suburban': 0.98,
  'rural': 0.95
};

// Payment option adjustments
const PAYMENT_OPTION_ADJUSTMENTS = {
  'tenure': 0.85,
  'term': 0.90,
  'line-of-credit': 1.0,
  'modified-tenure': 0.88,
  'modified-term': 0.93
};

export function calculateReverseMortgage(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    borrowerAge = 65,
    spouseAge,
    maritalStatus = 'single',
    occupancyType = 'primary',
    propertyValue = 500000,
    propertyType = 'single-family',
    propertyAge = 25,
    location = 'urban',
    existingMortgage = 0,
    existingPayment = 0,
    otherLiens = 0,
    loanType = 'hecm',
    paymentOption = 'tenure',
    termYears = 10,
    interestRate = 6.5,
    rateType = 'fixed',
    monthlyIncome = 3000,
    monthlyExpenses = 2500,
    savings = 50000,
    otherAssets = 100000,
    originationFee = 2500,
    mortgageInsurance = 5000,
    closingCosts = 3000,
    analysisPeriod = 15,
    propertyAppreciation = 3.0,
    inflationRate = 2.5
  } = inputs;

  // Calculate principal limit factor based on age
  const baseFactor = PRINCIPAL_LIMIT_FACTORS[borrowerAge] || 0.30;
  
  // Apply interest rate adjustment
  const rateAdjustment = RATE_ADJUSTMENTS[Math.round(interestRate * 2) / 2] || 0.80;
  
  // Apply property type adjustment
  const propertyAdjustment = PROPERTY_TYPE_ADJUSTMENTS[propertyType] || 1.0;
  
  // Apply location adjustment
  const locationAdjustment = LOCATION_ADJUSTMENTS[location] || 1.0;
  
  // Apply payment option adjustment
  const paymentAdjustment = PAYMENT_OPTION_ADJUSTMENTS[paymentOption] || 1.0;
  
  // Calculate adjusted principal limit factor
  const adjustedFactor = baseFactor * rateAdjustment * propertyAdjustment * 
                        locationAdjustment * paymentAdjustment;
  
  // Calculate principal limit
  const principalLimit = propertyValue * adjustedFactor;
  
  // Calculate total existing liens
  const totalLiens = existingMortgage + otherLiens;
  
  // Calculate available proceeds
  const availableProceeds = Math.max(0, principalLimit - totalLiens);
  
  // Calculate total closing costs
  const totalCosts = (originationFee || 0) + (mortgageInsurance || 0) + (closingCosts || 0);
  
  // Calculate monthly payment based on payment option
  let monthlyPayment = 0;
  let lineOfCredit = 0;
  
  if (paymentOption === 'tenure') {
    // Lifetime payments
    const netProceeds = availableProceeds - totalCosts;
    const monthlyRate = interestRate / 100 / 12;
    const lifeExpectancy = Math.max(20, 100 - borrowerAge);
    const totalMonths = lifeExpectancy * 12;
    
    if (totalMonths > 0) {
      monthlyPayment = (netProceeds * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  } else if (paymentOption === 'term') {
    // Fixed term payments
    const netProceeds = availableProceeds - totalCosts;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = termYears * 12;
    
    if (totalMonths > 0) {
      monthlyPayment = (netProceeds * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  } else if (paymentOption === 'line-of-credit') {
    // Line of credit
    lineOfCredit = availableProceeds - totalCosts;
  } else if (paymentOption === 'modified-tenure') {
    // Combination of tenure and line of credit
    const tenurePortion = availableProceeds * 0.5;
    const locPortion = availableProceeds * 0.5 - totalCosts;
    
    const netTenureProceeds = tenurePortion - totalCosts * 0.5;
    const monthlyRate = interestRate / 100 / 12;
    const lifeExpectancy = Math.max(20, 100 - borrowerAge);
    const totalMonths = lifeExpectancy * 12;
    
    if (totalMonths > 0) {
      monthlyPayment = (netTenureProceeds * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    
    lineOfCredit = Math.max(0, locPortion);
  } else if (paymentOption === 'modified-term') {
    // Combination of term and line of credit
    const termPortion = availableProceeds * 0.5;
    const locPortion = availableProceeds * 0.5 - totalCosts;
    
    const netTermProceeds = termPortion - totalCosts * 0.5;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = termYears * 12;
    
    if (totalMonths > 0) {
      monthlyPayment = (netTermProceeds * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    
    lineOfCredit = Math.max(0, locPortion);
  }
  
  // Calculate projected loan balance
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = analysisPeriod * 12;
  let loanBalance = 0;
  
  if (paymentOption === 'tenure' || paymentOption === 'term') {
    loanBalance = monthlyPayment * totalMonths;
  } else if (paymentOption === 'line-of-credit') {
    // Assume 50% of line of credit is used
    loanBalance = lineOfCredit * 0.5 * Math.pow(1 + monthlyRate, totalMonths);
  } else {
    // Modified options
    loanBalance = monthlyPayment * totalMonths + lineOfCredit * 0.5 * Math.pow(1 + monthlyRate, totalMonths);
  }
  
  // Calculate projected property value
  const projectedPropertyValue = propertyValue * Math.pow(1 + propertyAppreciation / 100, analysisPeriod);
  
  // Calculate remaining home equity
  const homeEquity = Math.max(0, projectedPropertyValue - loanBalance);
  
  // Calculate debt-to-equity ratio
  const debtToEquity = projectedPropertyValue > 0 ? (loanBalance / projectedPropertyValue) * 100 : 0;
  
  // Calculate break-even years
  let breakEvenYears = 0;
  if (monthlyPayment > 0) {
    const totalPaymentsPerYear = monthlyPayment * 12;
    breakEvenYears = totalCosts / totalPaymentsPerYear;
  }
  
  // Calculate total payments received
  const totalPayments = monthlyPayment * totalMonths;
  
  // Calculate net benefit
  const netBenefit = totalPayments - totalCosts;
  
  // Calculate scores
  const affordabilityScore = calculateAffordabilityScore(inputs, monthlyPayment, totalCosts);
  const suitabilityScore = calculateSuitabilityScore(inputs, availableProceeds, monthlyPayment);
  const riskScore = calculateRiskScore(inputs, loanBalance, projectedPropertyValue);
  const valueScore = calculateValueScore(inputs, netBenefit, totalCosts);
  
  // Generate payment schedule
  const paymentSchedule = generatePaymentSchedule(inputs, monthlyPayment, totalMonths);
  
  // Generate equity projection
  const equityProjection = generateEquityProjection(inputs, propertyValue, loanBalance, analysisPeriod);
  
  // Generate cost breakdown
  const costBreakdown = {
    originationFee: originationFee || 0,
    mortgageInsurance: mortgageInsurance || 0,
    closingCosts: closingCosts || 0,
    totalCosts,
    costPercentage: propertyValue > 0 ? (totalCosts / propertyValue) * 100 : 0
  };
  
  // Generate benefit analysis
  const benefitAnalysis = {
    monthlyPayment,
    totalPayments,
    netBenefit,
    breakEvenYears,
    monthlySavings: existingPayment - monthlyPayment,
    totalSavings: (existingPayment - monthlyPayment) * totalMonths
  };
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, affordabilityScore, suitabilityScore, riskScore, valueScore);
  
  return {
    principalLimit,
    availableProceeds,
    monthlyPayment,
    lineOfCredit,
    totalCosts,
    loanBalance,
    homeEquity,
    debtToEquity,
    breakEvenYears,
    totalPayments,
    netBenefit,
    affordabilityScore,
    suitabilityScore,
    riskScore,
    valueScore,
    paymentSchedule,
    equityProjection,
    costBreakdown,
    benefitAnalysis,
    recommendations
  };
}

function calculateAffordabilityScore(inputs: CalculatorInputs, monthlyPayment: number, totalCosts: number): number {
  const { monthlyIncome = 3000, monthlyExpenses = 2500, savings = 50000 } = inputs;
  
  let score = 100;
  
  // Reduce score if monthly payment is high relative to income
  if (monthlyIncome > 0) {
    const paymentRatio = monthlyPayment / monthlyIncome;
    if (paymentRatio > 0.3) score -= 30;
    else if (paymentRatio > 0.2) score -= 20;
    else if (paymentRatio > 0.1) score -= 10;
  }
  
  // Reduce score if costs are high relative to savings
  if (savings > 0) {
    const costRatio = totalCosts / savings;
    if (costRatio > 0.5) score -= 25;
    else if (costRatio > 0.3) score -= 15;
    else if (costRatio > 0.1) score -= 5;
  }
  
  // Reduce score if expenses are already high
  if (monthlyIncome > 0) {
    const expenseRatio = monthlyExpenses / monthlyIncome;
    if (expenseRatio > 0.8) score -= 20;
    else if (expenseRatio > 0.6) score -= 10;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateSuitabilityScore(inputs: CalculatorInputs, availableProceeds: number, monthlyPayment: number): number {
  const { borrowerAge = 65, propertyValue = 500000, existingMortgage = 0, monthlyIncome = 3000 } = inputs;
  
  let score = 50;
  
  // Increase score for older borrowers
  if (borrowerAge >= 75) score += 20;
  else if (borrowerAge >= 70) score += 15;
  else if (borrowerAge >= 65) score += 10;
  
  // Increase score if there's significant equity
  const equity = propertyValue - existingMortgage;
  if (equity > 0) {
    const equityRatio = equity / propertyValue;
    if (equityRatio > 0.7) score += 20;
    else if (equityRatio > 0.5) score += 15;
    else if (equityRatio > 0.3) score += 10;
  }
  
  // Increase score if proceeds are substantial
  if (availableProceeds > 100000) score += 15;
  else if (availableProceeds > 50000) score += 10;
  else if (availableProceeds > 25000) score += 5;
  
  // Increase score if monthly payment provides significant income
  if (monthlyIncome > 0) {
    const paymentRatio = monthlyPayment / monthlyIncome;
    if (paymentRatio > 0.3) score += 15;
    else if (paymentRatio > 0.2) score += 10;
    else if (paymentRatio > 0.1) score += 5;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateRiskScore(inputs: CalculatorInputs, loanBalance: number, projectedPropertyValue: number): number {
  const { borrowerAge = 65, propertyAge = 25, propertyType = 'single-family', location = 'urban' } = inputs;
  
  let score = 50;
  
  // Increase risk for younger borrowers (longer loan term)
  if (borrowerAge < 70) score += 20;
  else if (borrowerAge < 75) score += 10;
  
  // Increase risk for older properties
  if (propertyAge > 50) score += 15;
  else if (propertyAge > 30) score += 10;
  else if (propertyAge > 15) score += 5;
  
  // Increase risk for certain property types
  if (propertyType === 'manufactured') score += 15;
  else if (propertyType === 'multi-unit') score += 10;
  
  // Increase risk for rural locations
  if (location === 'rural') score += 10;
  
  // Increase risk if loan balance approaches property value
  if (projectedPropertyValue > 0) {
    const debtRatio = loanBalance / projectedPropertyValue;
    if (debtRatio > 0.8) score += 20;
    else if (debtRatio > 0.6) score += 15;
    else if (debtRatio > 0.4) score += 10;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateValueScore(inputs: CalculatorInputs, netBenefit: number, totalCosts: number): number {
  let score = 50;
  
  // Increase score for positive net benefit
  if (netBenefit > 50000) score += 30;
  else if (netBenefit > 25000) score += 20;
  else if (netBenefit > 10000) score += 10;
  else if (netBenefit > 0) score += 5;
  else score -= 20;
  
  // Increase score for reasonable costs
  if (totalCosts < 5000) score += 15;
  else if (totalCosts < 10000) score += 10;
  else if (totalCosts < 15000) score += 5;
  else score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function generatePaymentSchedule(inputs: CalculatorInputs, monthlyPayment: number, totalMonths: number): any[] {
  const schedule = [];
  const { interestRate = 6.5 } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  
  for (let month = 1; month <= Math.min(totalMonths, 360); month++) {
    schedule.push({
      month,
      payment: monthlyPayment,
      interest: monthlyPayment * monthlyRate,
      principal: monthlyPayment * (1 - monthlyRate),
      balance: monthlyPayment * month
    });
  }
  
  return schedule;
}

function generateEquityProjection(inputs: CalculatorInputs, propertyValue: number, loanBalance: number, analysisPeriod: number): any[] {
  const { propertyAppreciation = 3.0 } = inputs;
  const projection = [];
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const projectedValue = propertyValue * Math.pow(1 + propertyAppreciation / 100, year);
    const projectedBalance = loanBalance * (year / analysisPeriod);
    const equity = Math.max(0, projectedValue - projectedBalance);
    
    projection.push({
      year,
      propertyValue: projectedValue,
      loanBalance: projectedBalance,
      equity,
      equityPercentage: projectedValue > 0 ? (equity / projectedValue) * 100 : 0
    });
  }
  
  return projection;
}

function generateRecommendations(inputs: CalculatorInputs, affordabilityScore: number, suitabilityScore: number, riskScore: number, valueScore: number): string {
  const recommendations = [];
  
  if (affordabilityScore < 50) {
    recommendations.push("Consider a smaller loan amount or different payment option to improve affordability.");
  }
  
  if (suitabilityScore < 50) {
    recommendations.push("This may not be the optimal time for a reverse mortgage. Consider waiting or exploring other options.");
  }
  
  if (riskScore > 70) {
    recommendations.push("This reverse mortgage carries significant risks. Consider consulting with a financial advisor.");
  }
  
  if (valueScore < 50) {
    recommendations.push("The costs may outweigh the benefits. Consider alternative financing options.");
  }
  
  if (affordabilityScore >= 70 && suitabilityScore >= 70 && riskScore <= 50 && valueScore >= 70) {
    recommendations.push("This reverse mortgage appears suitable for your situation. Consider proceeding with caution.");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("This reverse mortgage appears reasonable. Consider consulting with a reverse mortgage counselor.");
  }
  
  return recommendations.join(" ");
}

export function generateReverseMortgageAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    borrowerAge = 65,
    propertyValue = 500000,
    loanType = 'hecm',
    paymentOption = 'tenure',
    interestRate = 6.5
  } = inputs;
  
  const {
    principalLimit,
    availableProceeds,
    monthlyPayment,
    lineOfCredit,
    totalCosts,
    loanBalance,
    homeEquity,
    debtToEquity,
    breakEvenYears,
    totalPayments,
    netBenefit,
    affordabilityScore,
    suitabilityScore,
    riskScore,
    valueScore,
    recommendations
  } = outputs;
  
  return `# Reverse Mortgage Analysis Report

## Executive Summary
This analysis evaluates a reverse mortgage for a ${borrowerAge}-year-old borrower with a $${propertyValue.toLocaleString()} property using a ${loanType.toUpperCase()} ${paymentOption} option at ${interestRate}% interest.

## Loan Summary
- **Principal Limit**: $${principalLimit.toLocaleString()}
- **Available Proceeds**: $${availableProceeds.toLocaleString()}
- **Total Closing Costs**: $${totalCosts.toLocaleString()}
- **Monthly Payment**: $${monthlyPayment.toLocaleString()}
- **Line of Credit**: $${lineOfCredit.toLocaleString()}

## Financial Projections
- **Projected Loan Balance**: $${loanBalance.toLocaleString()}
- **Remaining Home Equity**: $${homeEquity.toLocaleString()}
- **Debt-to-Equity Ratio**: ${debtToEquity.toFixed(1)}%
- **Break-Even Years**: ${breakEvenYears.toFixed(1)} years
- **Total Payments Received**: $${totalPayments.toLocaleString()}
- **Net Financial Benefit**: $${netBenefit.toLocaleString()}

## Assessment Scores
- **Affordability Score**: ${affordabilityScore}/100
- **Suitability Score**: ${suitabilityScore}/100
- **Risk Score**: ${riskScore}/100
- **Value Score**: ${valueScore}/100

## Key Considerations
- **Age Factor**: Younger borrowers have lower principal limits but longer payment periods
- **Property Value**: Higher property values generally result in larger available proceeds
- **Interest Rates**: Lower rates increase principal limits and reduce costs
- **Payment Options**: Different options provide varying levels of flexibility and security

## Recommendations
${recommendations}

## Important Notes
- Reverse mortgages are complex financial products requiring careful consideration
- Consult with a reverse mortgage counselor before proceeding
- Consider the impact on heirs and estate planning
- Review all costs and fees carefully
- Understand the loan repayment requirements

*This analysis is for informational purposes only and should not be considered financial advice.*`;
}
