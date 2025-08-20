import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

/**
 * Calculate mortgage payment using PMT formula
 */
function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (annualRate === 0) {
    return principal / (termYears * 12);
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  
  return principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Calculate total interest paid over loan term
 */
function calculateTotalInterest(
  principal: number,
  monthlyPayment: number,
  termYears: number
): number {
  return (monthlyPayment * termYears * 12) - principal;
}

/**
 * Calculate break-even point in months
 */
function calculateBreakEvenMonths(
  closingCosts: number,
  monthlySavings: number
): number {
  if (monthlySavings <= 0) return Infinity;
  return Math.ceil(closingCosts / monthlySavings);
}

/**
 * Calculate net present value of refinance
 */
function calculateNPV(
  monthlySavings: number,
  closingCosts: number,
  discountRate: number,
  years: number
): number {
  let npv = -closingCosts; // Initial cost
  
  for (let year = 1; year <= years; year++) {
    const annualSavings = monthlySavings * 12;
    const presentValue = annualSavings / Math.pow(1 + discountRate / 100, year);
    npv += presentValue;
  }
  
  return npv;
}

/**
 * Calculate internal rate of return using iterative method
 */
function calculateIRR(
  closingCosts: number,
  monthlySavings: number,
  years: number
): number {
  if (monthlySavings <= 0) return -100;
  
  const annualSavings = monthlySavings * 12;
  let lowRate = -50;
  let highRate = 100;
  let midRate: number;
  
  for (let i = 0; i < 100; i++) {
    midRate = (lowRate + highRate) / 2;
    
    let npv = -closingCosts;
    for (let year = 1; year <= years; year++) {
      npv += annualSavings / Math.pow(1 + midRate / 100, year);
    }
    
    if (Math.abs(npv) < 0.01) break;
    
    if (npv > 0) {
      lowRate = midRate;
    } else {
      highRate = midRate;
    }
  }
  
  return midRate;
}

/**
 * Calculate refinance score based on multiple factors
 */
function calculateRefinanceScore(
  monthlySavings: number,
  breakEvenMonths: number,
  interestRateReduction: number,
  plannedOwnershipYears: number,
  creditScore: number,
  marketConditions: string,
  refinancePurpose: string
): number {
  let score = 0;
  
  // Monthly savings factor (30%)
  const savingsFactor = Math.min(monthlySavings / 500, 1) * 30;
  score += savingsFactor;
  
  // Break-even factor (25%)
  let breakEvenFactor = 0;
  if (breakEvenMonths <= 12) breakEvenFactor = 25;
  else if (breakEvenMonths <= 24) breakEvenFactor = 20;
  else if (breakEvenMonths <= 36) breakEvenFactor = 15;
  else if (breakEvenMonths <= 60) breakEvenFactor = 10;
  else if (breakEvenMonths <= 120) breakEvenFactor = 5;
  score += breakEvenFactor;
  
  // Interest rate reduction factor (20%)
  const rateFactor = Math.min(interestRateReduction / 2, 1) * 20;
  score += rateFactor;
  
  // Ownership duration factor (15%)
  let ownershipFactor = 0;
  if (plannedOwnershipYears >= breakEvenMonths / 12) ownershipFactor = 15;
  else if (plannedOwnershipYears >= breakEvenMonths / 12 * 0.8) ownershipFactor = 10;
  else if (plannedOwnershipYears >= breakEvenMonths / 12 * 0.6) ownershipFactor = 5;
  score += ownershipFactor;
  
  // Credit score factor (5%)
  let creditFactor = 0;
  if (creditScore >= 750) creditFactor = 5;
  else if (creditScore >= 700) creditFactor = 3;
  else if (creditScore >= 650) creditFactor = 1;
  score += creditFactor;
  
  // Market conditions factor (3%)
  let marketFactor = 0;
  if (marketConditions === 'declining') marketFactor = 3;
  else if (marketConditions === 'stable') marketFactor = 2;
  else if (marketConditions === 'rising') marketFactor = 1;
  score += marketFactor;
  
  // Purpose factor (2%)
  let purposeFactor = 0;
  if (refinancePurpose === 'lower-rate') purposeFactor = 2;
  else if (refinancePurpose === 'lower-payment') purposeFactor = 2;
  else if (refinancePurpose === 'remove-pmi') purposeFactor = 2;
  else if (refinancePurpose === 'shorter-term') purposeFactor = 1;
  else if (refinancePurpose === 'cash-out') purposeFactor = 1;
  score += purposeFactor;
  
  return Math.round(Math.min(score, 100));
}

/**
 * Calculate risk score for refinance
 */
function calculateRiskScore(
  breakEvenMonths: number,
  plannedOwnershipYears: number,
  creditScore: number,
  monthlyIncome: number,
  monthlySavings: number,
  marketConditions: string,
  occupancyType: string
): number {
  let riskScore = 0;
  
  // Break-even risk (30%)
  if (breakEvenMonths > 60) riskScore += 30;
  else if (breakEvenMonths > 36) riskScore += 20;
  else if (breakEvenMonths > 24) riskScore += 10;
  
  // Ownership duration risk (25%)
  const ownershipRisk = plannedOwnershipYears < breakEvenMonths / 12;
  if (ownershipRisk) riskScore += 25;
  
  // Credit risk (20%)
  if (creditScore < 650) riskScore += 20;
  else if (creditScore < 700) riskScore += 15;
  else if (creditScore < 750) riskScore += 10;
  
  // Income risk (15%)
  const savingsRatio = monthlySavings / monthlyIncome;
  if (savingsRatio < 0.05) riskScore += 15;
  else if (savingsRatio < 0.1) riskScore += 10;
  else if (savingsRatio < 0.15) riskScore += 5;
  
  // Market risk (10%)
  if (marketConditions === 'rising') riskScore += 10;
  else if (marketConditions === 'stable') riskScore += 5;
  
  return Math.min(riskScore, 100);
}

/**
 * Calculate feasibility score
 */
function calculateFeasibilityScore(
  creditScore: number,
  monthlyIncome: number,
  monthlyDebts: number,
  newLoanAmount: number,
  propertyValue: number,
  occupancyType: string
): number {
  let feasibilityScore = 0;
  
  // Credit score factor (30%)
  if (creditScore >= 750) feasibilityScore += 30;
  else if (creditScore >= 700) feasibilityScore += 25;
  else if (creditScore >= 650) feasibilityScore += 20;
  else if (creditScore >= 620) feasibilityScore += 15;
  else feasibilityScore += 10;
  
  // DTI factor (25%)
  const totalMonthlyPayment = newLoanAmount * 0.005; // Rough estimate
  const dti = (totalMonthlyPayment + monthlyDebts) / monthlyIncome;
  if (dti <= 0.28) feasibilityScore += 25;
  else if (dti <= 0.36) feasibilityScore += 20;
  else if (dti <= 0.43) feasibilityScore += 15;
  else if (dti <= 0.50) feasibilityScore += 10;
  else feasibilityScore += 5;
  
  // LTV factor (25%)
  const ltv = (newLoanAmount / propertyValue) * 100;
  if (ltv <= 80) feasibilityScore += 25;
  else if (ltv <= 90) feasibilityScore += 20;
  else if (ltv <= 95) feasibilityScore += 15;
  else if (ltv <= 97) feasibilityScore += 10;
  else feasibilityScore += 5;
  
  // Occupancy factor (20%)
  if (occupancyType === 'primary-residence') feasibilityScore += 20;
  else if (occupancyType === 'second-home') feasibilityScore += 15;
  else if (occupancyType === 'investment') feasibilityScore += 10;
  
  return Math.min(feasibilityScore, 100);
}

/**
 * Main refinance calculation function
 */
export function calculateRefinance(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values with defaults
  const currentLoanBalance = inputs.currentLoanBalance || 0;
  const currentInterestRate = inputs.currentInterestRate || 0;
  const currentMonthlyPayment = inputs.currentMonthlyPayment || 0;
  const currentLoanTerm = inputs.currentLoanTerm || 30;
  const currentPMI = inputs.currentPMI || 0;
  const currentPropertyTaxes = inputs.currentPropertyTaxes || 0;
  const currentInsurance = inputs.currentInsurance || 0;
  
  const newLoanAmount = inputs.newLoanAmount || 0;
  const newInterestRate = inputs.newInterestRate || 0;
  const newLoanTerm = inputs.newLoanTerm || 30;
  const newPMI = inputs.newPMI || 0;
  const newPropertyTaxes = inputs.newPropertyTaxes || 0;
  const newInsurance = inputs.newInsurance || 0;
  
  const propertyValue = inputs.propertyValue || 0;
  const closingCosts = inputs.closingCosts || 0;
  const taxRate = inputs.taxRate || 22;
  const inflationRate = inputs.inflationRate || 2.5;
  const investmentReturn = inputs.investmentReturn || 7;
  const plannedOwnershipYears = inputs.plannedOwnershipYears || 10;
  const monthlyIncome = inputs.monthlyIncome || 8000;
  const monthlyDebts = inputs.monthlyDebts || 0;
  const creditScore = inputs.creditScore || 750;
  const occupancyType = inputs.occupancyType || 'primary-residence';
  const refinancePurpose = inputs.refinancePurpose || 'lower-rate';
  const marketConditions = inputs.marketConditions || 'stable';
  
  // Calculate new monthly payment
  const newMonthlyPayment = calculateMortgagePayment(newLoanAmount, newInterestRate, newLoanTerm);
  
  // Calculate total monthly payments
  const currentTotalMonthlyPayment = currentMonthlyPayment + currentPMI + currentPropertyTaxes + currentInsurance;
  const newTotalMonthlyPayment = newMonthlyPayment + newPMI + newPropertyTaxes + newInsurance;
  
  // Calculate savings
  const monthlySavings = currentTotalMonthlyPayment - newTotalMonthlyPayment;
  const annualSavings = monthlySavings * 12;
  
  // Calculate break-even
  const breakEvenMonths = calculateBreakEvenMonths(closingCosts, monthlySavings);
  const breakEvenYears = breakEvenMonths / 12;
  
  // Calculate total savings over different periods
  const totalSavings5Years = Math.max(0, annualSavings * 5 - closingCosts);
  const totalSavings10Years = Math.max(0, annualSavings * 10 - closingCosts);
  const totalSavingsLife = Math.max(0, annualSavings * newLoanTerm - closingCosts);
  
  // Calculate interest savings
  const currentTotalInterest = calculateTotalInterest(currentLoanBalance, currentMonthlyPayment, currentLoanTerm);
  const newTotalInterest = calculateTotalInterest(newLoanAmount, newMonthlyPayment, newLoanTerm);
  const interestSavings = currentTotalInterest - newTotalInterest;
  
  // Calculate principal increase (if any)
  const principalIncrease = Math.max(0, newLoanAmount - currentLoanBalance);
  
  // Calculate NPV and IRR
  const npv = calculateNPV(monthlySavings, closingCosts, investmentReturn, plannedOwnershipYears);
  const irr = calculateIRR(closingCosts, monthlySavings, plannedOwnershipYears);
  
  // Calculate payback period
  const paybackPeriod = breakEvenYears;
  
  // Calculate scores
  const interestRateReduction = currentInterestRate - newInterestRate;
  const refinanceScore = calculateRefinanceScore(
    monthlySavings, breakEvenMonths, interestRateReduction, plannedOwnershipYears,
    creditScore, marketConditions, refinancePurpose
  );
  
  const riskScore = calculateRiskScore(
    breakEvenMonths, plannedOwnershipYears, creditScore, monthlyIncome,
    monthlySavings, marketConditions, occupancyType
  );
  
  const feasibilityScore = calculateFeasibilityScore(
    creditScore, monthlyIncome, monthlyDebts, newLoanAmount,
    propertyValue, occupancyType
  );
  
  // Generate recommendation
  let recommendation = 'Consider refinancing';
  if (refinanceScore >= 80) recommendation = 'Strongly recommend refinancing';
  else if (refinanceScore >= 60) recommendation = 'Recommend refinancing';
  else if (refinanceScore >= 40) recommendation = 'Consider refinancing';
  else if (refinanceScore >= 20) recommendation = 'Refinancing may not be beneficial';
  else recommendation = 'Do not recommend refinancing';
  
  // Generate key benefits
  const keyBenefits = [
    `Monthly savings of $${Math.abs(monthlySavings).toLocaleString()}`,
    `Break-even in ${breakEvenMonths} months`,
    `Interest rate reduction of ${interestRateReduction.toFixed(2)}%`,
    `Total savings over ${plannedOwnershipYears} years: $${(annualSavings * plannedOwnershipYears - closingCosts).toLocaleString()}`
  ].join(', ');
  
  // Generate key risks
  const keyRisks = [
    `Closing costs of $${closingCosts.toLocaleString()}`,
    `Risk score of ${riskScore}/100`,
    `Must own property for ${breakEvenMonths} months to break even`
  ].join(', ');
  
  return {
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths),
    breakEvenYears: Math.round(breakEvenYears * 100) / 100,
    totalSavings5Years: Math.round(totalSavings5Years * 100) / 100,
    totalSavings10Years: Math.round(totalSavings10Years * 100) / 100,
    totalSavingsLife: Math.round(totalSavingsLife * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    newTotalMonthlyPayment: Math.round(newTotalMonthlyPayment * 100) / 100,
    currentTotalMonthlyPayment: Math.round(currentTotalMonthlyPayment * 100) / 100,
    interestSavings: Math.round(interestSavings * 100) / 100,
    principalIncrease: Math.round(principalIncrease * 100) / 100,
    netPresentValue: Math.round(npv * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    refinanceScore,
    riskScore,
    feasibilityScore,
    recommendation,
    keyBenefits,
    keyRisks,
    refinanceAnalysis: 'Comprehensive refinance analysis completed'
  };
}

/**
 * Generate comprehensive refinance analysis report
 */
export function generateRefinanceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Refinance Analysis Report

## Summary
**Recommendation:** ${outputs.recommendation}
**Refinance Score:** ${outputs.refinanceScore}/100
**Risk Score:** ${outputs.riskScore}/100
**Feasibility Score:** ${outputs.feasibilityScore}/100

## Financial Impact
- **Monthly Savings:** $${outputs.monthlySavings.toLocaleString()}
- **Annual Savings:** $${outputs.annualSavings.toLocaleString()}
- **Break-Even Period:** ${outputs.breakEvenMonths} months (${outputs.breakEvenYears} years)
- **Closing Costs:** $${inputs.closingCosts?.toLocaleString() || '0'}

## Payment Comparison
- **Current Total Payment:** $${outputs.currentTotalMonthlyPayment.toLocaleString()}/month
- **New Total Payment:** $${outputs.newTotalMonthlyPayment.toLocaleString()}/month
- **Monthly Reduction:** $${outputs.monthlySavings.toLocaleString()}

## Long-Term Savings
- **5-Year Savings:** $${outputs.totalSavings5Years.toLocaleString()}
- **10-Year Savings:** $${outputs.totalSavings10Years.toLocaleString()}
- **Life of Loan Savings:** $${outputs.totalSavingsLife.toLocaleString()}
- **Interest Savings:** $${outputs.interestSavings.toLocaleString()}

## Investment Analysis
- **Net Present Value:** $${outputs.netPresentValue.toLocaleString()}
- **Internal Rate of Return:** ${outputs.internalRateOfReturn}%
- **Payback Period:** ${outputs.paybackPeriod} years

## Key Benefits
${outputs.keyBenefits}

## Key Risks
${outputs.keyRisks}

## Recommendations
1. **Timing:** Consider refinancing if you plan to own the property for at least ${outputs.breakEvenMonths} months
2. **Costs:** Factor in all closing costs when evaluating the refinance
3. **Rates:** Monitor interest rate trends for optimal timing
4. **Credit:** Maintain good credit score for best rates
5. **Comparison:** Shop multiple lenders for competitive rates and terms`;
}
