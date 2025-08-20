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
 * Calculate principal portion of mortgage payment
 */
function calculatePrincipalPayment(
  totalPayment: number,
  interestPayment: number
): number {
  return totalPayment - interestPayment;
}

/**
 * Calculate net present value
 */
function calculateNPV(
  cashFlows: number[],
  discountRate: number
): number {
  let npv = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + discountRate / 100, i + 1);
  }
  return npv;
}

/**
 * Calculate internal rate of return using iterative method
 */
function calculateIRR(
  initialInvestment: number,
  cashFlows: number[],
  maxIterations: number = 100
): number {
  let lowRate = -50;
  let highRate = 100;
  let midRate: number;
  
  for (let i = 0; i < maxIterations; i++) {
    midRate = (lowRate + highRate) / 2;
    
    let npv = -initialInvestment;
    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + midRate / 100, j + 1);
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
 * Calculate investment score based on multiple factors
 */
function calculateInvestmentScore(
  cashOnCashReturn: number,
  capRate: number,
  debtServiceCoverage: number,
  vacancyRate: number,
  marketConditions: string,
  propertyType: string,
  location: string
): number {
  let score = 0;
  
  // Cash-on-cash return factor (30%)
  let cocFactor = 0;
  if (cashOnCashReturn >= 12) cocFactor = 30;
  else if (cashOnCashReturn >= 8) cocFactor = 25;
  else if (cashOnCashReturn >= 6) cocFactor = 20;
  else if (cashOnCashReturn >= 4) cocFactor = 15;
  else if (cashOnCashReturn >= 2) cocFactor = 10;
  else if (cashOnCashReturn >= 0) cocFactor = 5;
  score += cocFactor;
  
  // Cap rate factor (25%)
  let capRateFactor = 0;
  if (capRate >= 8) capRateFactor = 25;
  else if (capRate >= 6) capRateFactor = 20;
  else if (capRate >= 4) capRateFactor = 15;
  else if (capRate >= 2) capRateFactor = 10;
  else if (capRate >= 0) capRateFactor = 5;
  score += capRateFactor;
  
  // Debt service coverage factor (20%)
  let dscrFactor = 0;
  if (debtServiceCoverage >= 1.5) dscrFactor = 20;
  else if (debtServiceCoverage >= 1.3) dscrFactor = 15;
  else if (debtServiceCoverage >= 1.2) dscrFactor = 10;
  else if (debtServiceCoverage >= 1.1) dscrFactor = 5;
  score += dscrFactor;
  
  // Vacancy rate factor (15%)
  let vacancyFactor = 0;
  if (vacancyRate <= 3) vacancyFactor = 15;
  else if (vacancyRate <= 5) vacancyFactor = 12;
  else if (vacancyRate <= 8) vacancyFactor = 8;
  else if (vacancyRate <= 12) vacancyFactor = 4;
  score += vacancyFactor;
  
  // Market conditions factor (5%)
  let marketFactor = 0;
  if (marketConditions === 'hot') marketFactor = 5;
  else if (marketConditions === 'stable') marketFactor = 4;
  else if (marketConditions === 'cooling') marketFactor = 2;
  else if (marketConditions === 'declining') marketFactor = 1;
  score += marketFactor;
  
  // Property type factor (3%)
  let propertyFactor = 0;
  if (propertyType === 'single-family') propertyFactor = 3;
  else if (propertyType === 'duplex') propertyFactor = 3;
  else if (propertyType === 'condo') propertyFactor = 2;
  else if (propertyType === 'townhouse') propertyFactor = 2;
  score += propertyFactor;
  
  // Location factor (2%)
  let locationFactor = 0;
  if (location === 'suburban') locationFactor = 2;
  else if (location === 'urban') locationFactor = 2;
  else if (location === 'rural') locationFactor = 1;
  score += locationFactor;
  
  return Math.round(Math.min(score, 100));
}

/**
 * Calculate risk score for rental property investment
 */
function calculateRiskScore(
  vacancyRate: number,
  debtServiceCoverage: number,
  marketConditions: string,
  propertyType: string,
  yearBuilt: number,
  location: string,
  cashOnCashReturn: number
): number {
  let riskScore = 0;
  
  // Vacancy risk (25%)
  if (vacancyRate > 15) riskScore += 25;
  else if (vacancyRate > 10) riskScore += 20;
  else if (vacancyRate > 7) riskScore += 15;
  else if (vacancyRate > 5) riskScore += 10;
  else if (vacancyRate > 3) riskScore += 5;
  
  // Debt service risk (25%)
  if (debtServiceCoverage < 1.1) riskScore += 25;
  else if (debtServiceCoverage < 1.2) riskScore += 20;
  else if (debtServiceCoverage < 1.3) riskScore += 15;
  else if (debtServiceCoverage < 1.4) riskScore += 10;
  else if (debtServiceCoverage < 1.5) riskScore += 5;
  
  // Market risk (20%)
  if (marketConditions === 'declining') riskScore += 20;
  else if (marketConditions === 'cooling') riskScore += 15;
  else if (marketConditions === 'stable') riskScore += 10;
  else if (marketConditions === 'hot') riskScore += 5;
  
  // Property age risk (15%)
  const currentYear = new Date().getFullYear();
  const propertyAge = currentYear - yearBuilt;
  if (propertyAge > 50) riskScore += 15;
  else if (propertyAge > 30) riskScore += 12;
  else if (propertyAge > 20) riskScore += 8;
  else if (propertyAge > 10) riskScore += 4;
  
  // Cash flow risk (15%)
  if (cashOnCashReturn < 0) riskScore += 15;
  else if (cashOnCashReturn < 2) riskScore += 12;
  else if (cashOnCashReturn < 4) riskScore += 8;
  else if (cashOnCashReturn < 6) riskScore += 4;
  
  return Math.min(riskScore, 100);
}

/**
 * Calculate cash flow score
 */
function calculateCashFlowScore(
  cashOnCashReturn: number,
  debtServiceCoverage: number,
  monthlyCashFlow: number,
  totalInvestment: number
): number {
  let score = 0;
  
  // Cash-on-cash return factor (40%)
  if (cashOnCashReturn >= 12) score += 40;
  else if (cashOnCashReturn >= 8) score += 35;
  else if (cashOnCashReturn >= 6) score += 30;
  else if (cashOnCashReturn >= 4) score += 25;
  else if (cashOnCashReturn >= 2) score += 20;
  else if (cashOnCashReturn >= 0) score += 15;
  
  // Debt service coverage factor (30%)
  if (debtServiceCoverage >= 1.5) score += 30;
  else if (debtServiceCoverage >= 1.3) score += 25;
  else if (debtServiceCoverage >= 1.2) score += 20;
  else if (debtServiceCoverage >= 1.1) score += 15;
  else if (debtServiceCoverage >= 1.0) score += 10;
  
  // Monthly cash flow factor (20%)
  const cashFlowRatio = monthlyCashFlow / totalInvestment;
  if (cashFlowRatio >= 0.01) score += 20;
  else if (cashFlowRatio >= 0.008) score += 15;
  else if (cashFlowRatio >= 0.006) score += 10;
  else if (cashFlowRatio >= 0.004) score += 5;
  
  // Stability factor (10%)
  if (monthlyCashFlow > 0) score += 10;
  else if (monthlyCashFlow > -500) score += 5;
  
  return Math.min(score, 100);
}

/**
 * Calculate appreciation score
 */
function calculateAppreciationScore(
  appreciationRate: number,
  marketConditions: string,
  location: string,
  propertyType: string
): number {
  let score = 0;
  
  // Appreciation rate factor (40%)
  if (appreciationRate >= 5) score += 40;
  else if (appreciationRate >= 3) score += 35;
  else if (appreciationRate >= 1) score += 30;
  else if (appreciationRate >= 0) score += 25;
  else if (appreciationRate >= -2) score += 20;
  else score += 15;
  
  // Market conditions factor (30%)
  if (marketConditions === 'hot') score += 30;
  else if (marketConditions === 'stable') score += 25;
  else if (marketConditions === 'cooling') score += 20;
  else if (marketConditions === 'declining') score += 15;
  
  // Location factor (20%)
  if (location === 'urban') score += 20;
  else if (location === 'suburban') score += 18;
  else if (location === 'rural') score += 15;
  
  // Property type factor (10%)
  if (propertyType === 'single-family') score += 10;
  else if (propertyType === 'duplex') score += 10;
  else if (propertyType === 'condo') score += 8;
  else if (propertyType === 'townhouse') score += 8;
  
  return Math.min(score, 100);
}

/**
 * Main rental property ROI calculation function
 */
export function calculateRentalPropertyROI(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values with defaults
  const purchasePrice = inputs.purchasePrice || 0;
  const downPayment = inputs.downPayment || 0;
  const closingCosts = inputs.closingCosts || 0;
  const renovationCosts = inputs.renovationCosts || 0;
  const loanAmount = inputs.loanAmount || 0;
  const interestRate = inputs.interestRate || 0;
  const loanTerm = inputs.loanTerm || 30;
  const pmi = inputs.pmi || 0;
  
  const monthlyRent = inputs.monthlyRent || 0;
  const vacancyRate = inputs.vacancyRate || 5;
  const rentGrowthRate = inputs.rentGrowthRate || 3;
  const otherIncome = inputs.otherIncome || 0;
  
  const propertyTaxes = inputs.propertyTaxes || 0;
  const insurance = inputs.insurance || 0;
  const hoaFees = inputs.hoaFees || 0;
  const utilities = inputs.utilities || 0;
  const maintenance = inputs.maintenance || 0;
  const propertyManagement = inputs.propertyManagement || 8;
  const repairs = inputs.repairs || 0;
  const landscaping = inputs.landscaping || 0;
  const pestControl = inputs.pestControl || 0;
  
  const propertyType = inputs.propertyType || 'single-family';
  const yearBuilt = inputs.yearBuilt || 2000;
  const location = inputs.location || 'suburban';
  const appreciationRate = inputs.appreciationRate || 3;
  const inflationRate = inputs.inflationRate || 2.5;
  const marketConditions = inputs.marketConditions || 'stable';
  const holdingPeriod = inputs.holdingPeriod || 10;
  
  const taxRate = inputs.taxRate || 22;
  const depreciationPeriod = inputs.depreciationPeriod || 27.5;
  const exitStrategy = inputs.exitStrategy || 'sell';
  const sellingCosts = inputs.sellingCosts || 6;
  
  // Calculate total investment
  const totalInvestment = downPayment + closingCosts + renovationCosts;
  
  // Calculate mortgage payment
  const monthlyMortgagePayment = calculateMortgagePayment(loanAmount, interestRate, loanTerm);
  const annualMortgagePayment = monthlyMortgagePayment * 12;
  
  // Calculate gross rental income
  const effectiveRent = monthlyRent * (1 - vacancyRate / 100);
  const grossMonthlyIncome = effectiveRent + otherIncome;
  const grossAnnualIncome = grossMonthlyIncome * 12;
  
  // Calculate operating expenses
  const monthlyPropertyTaxes = propertyTaxes / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyPropertyManagement = grossMonthlyIncome * (propertyManagement / 100);
  const totalMonthlyExpenses = monthlyPropertyTaxes + monthlyInsurance + hoaFees + utilities + 
                               maintenance + monthlyPropertyManagement + repairs + landscaping + pestControl;
  const totalAnnualExpenses = totalMonthlyExpenses * 12;
  
  // Calculate net operating income
  const netOperatingIncome = grossAnnualIncome - totalAnnualExpenses;
  
  // Calculate cash flow
  const monthlyCashFlow = grossMonthlyIncome - totalMonthlyExpenses - monthlyMortgagePayment - pmi;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate ROI metrics
  const cashOnCashReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  const capRate = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0;
  const debtServiceCoverage = (monthlyMortgagePayment + pmi) > 0 ? 
    netOperatingIncome / ((monthlyMortgagePayment + pmi) * 12) : 0;
  
  // Calculate break-even analysis
  const breakEvenRent = totalMonthlyExpenses + monthlyMortgagePayment + pmi;
  const breakEvenOccupancy = (breakEvenRent / monthlyRent) * 100;
  
  // Calculate additional metrics
  const grossRentMultiplier = monthlyRent > 0 ? purchasePrice / (monthlyRent * 12) : 0;
  const operatingExpenseRatio = grossAnnualIncome > 0 ? (totalAnnualExpenses / grossAnnualIncome) * 100 : 0;
  const profitMargin = grossAnnualIncome > 0 ? (annualCashFlow / grossAnnualIncome) * 100 : 0;
  
  // Calculate equity build-up
  const totalInterest = calculateTotalInterest(loanAmount, monthlyMortgagePayment, loanTerm);
  const annualInterest = totalInterest / loanTerm;
  const annualPrincipal = annualMortgagePayment - annualInterest;
  const equityBuildUp = annualPrincipal;
  
  // Calculate tax benefits
  const annualDepreciation = purchasePrice / depreciationPeriod;
  const taxBenefits = (annualDepreciation + annualInterest) * (taxRate / 100);
  
  // Calculate appreciation
  const appreciationValue = purchasePrice * (appreciationRate / 100);
  
  // Calculate total return
  const totalReturn = annualCashFlow + equityBuildUp + taxBenefits + appreciationValue;
  const totalROI = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;
  const annualizedROI = holdingPeriod > 0 ? (Math.pow(1 + totalROI / 100, 1 / holdingPeriod) - 1) * 100 : 0;
  
  // Calculate payback period
  const paybackPeriod = annualCashFlow > 0 ? totalInvestment / annualCashFlow : Infinity;
  
  // Calculate IRR and NPV
  const cashFlows = [];
  for (let year = 1; year <= holdingPeriod; year++) {
    const yearCashFlow = annualCashFlow * Math.pow(1 + rentGrowthRate / 100, year - 1);
    cashFlows.push(yearCashFlow);
  }
  
  // Add final sale proceeds
  const finalValue = purchasePrice * Math.pow(1 + appreciationRate / 100, holdingPeriod);
  const saleProceeds = finalValue * (1 - sellingCosts / 100) - loanAmount;
  cashFlows[cashFlows.length - 1] += saleProceeds;
  
  const irr = calculateIRR(totalInvestment, cashFlows);
  const npv = calculateNPV(cashFlows, inflationRate) - totalInvestment;
  
  // Calculate scores
  const investmentScore = calculateInvestmentScore(
    cashOnCashReturn, capRate, debtServiceCoverage, vacancyRate, 
    marketConditions, propertyType, location
  );
  
  const riskScore = calculateRiskScore(
    vacancyRate, debtServiceCoverage, marketConditions, propertyType,
    yearBuilt, location, cashOnCashReturn
  );
  
  const cashFlowScore = calculateCashFlowScore(
    cashOnCashReturn, debtServiceCoverage, monthlyCashFlow, totalInvestment
  );
  
  const appreciationScore = calculateAppreciationScore(
    appreciationRate, marketConditions, location, propertyType
  );
  
  // Generate recommendation
  let recommendation = 'Consider this investment';
  if (investmentScore >= 80) recommendation = 'Strong buy recommendation';
  else if (investmentScore >= 60) recommendation = 'Buy recommendation';
  else if (investmentScore >= 40) recommendation = 'Consider this investment';
  else if (investmentScore >= 20) recommendation = 'Proceed with caution';
  else recommendation = 'Not recommended';
  
  // Generate key strengths
  const keyStrengths = [
    `Cash-on-cash return: ${cashOnCashReturn.toFixed(2)}%`,
    `Cap rate: ${capRate.toFixed(2)}%`,
    `Monthly cash flow: $${monthlyCashFlow.toLocaleString()}`,
    `Debt service coverage: ${debtServiceCoverage.toFixed(2)}`
  ].join(', ');
  
  // Generate key risks
  const keyRisks = [
    `Vacancy rate: ${vacancyRate}%`,
    `Risk score: ${riskScore}/100`,
    `Break-even rent: $${breakEvenRent.toLocaleString()}`,
    `Payback period: ${paybackPeriod.toFixed(1)} years`
  ].join(', ');
  
  return {
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    monthlyCashFlow: Math.round(monthlyCashFlow * 100) / 100,
    annualCashFlow: Math.round(annualCashFlow * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    totalROI: Math.round(totalROI * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 100) / 100,
    breakEvenRent: Math.round(breakEvenRent * 100) / 100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    grossRentMultiplier: Math.round(grossRentMultiplier * 100) / 100,
    netOperatingIncome: Math.round(netOperatingIncome * 100) / 100,
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100,
    equityBuildUp: Math.round(equityBuildUp * 100) / 100,
    taxBenefits: Math.round(taxBenefits * 100) / 100,
    appreciationValue: Math.round(appreciationValue * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    netPresentValue: Math.round(npv * 100) / 100,
    investmentScore,
    riskScore,
    cashFlowScore,
    appreciationScore,
    recommendation,
    keyStrengths,
    keyRisks,
    rentalPropertyAnalysis: 'Comprehensive rental property investment analysis completed'
  };
}

/**
 * Generate comprehensive rental property analysis report
 */
export function generateRentalPropertyAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Rental Property Investment Analysis

## Summary
**Recommendation:** ${outputs.recommendation}
**Investment Score:** ${outputs.investmentScore}/100
**Risk Score:** ${outputs.riskScore}/100
**Cash Flow Score:** ${outputs.cashFlowScore}/100
**Appreciation Score:** ${outputs.appreciationScore}/100

## Investment Overview
- **Total Investment:** $${outputs.totalInvestment.toLocaleString()}
- **Purchase Price:** $${inputs.purchasePrice?.toLocaleString() || '0'}
- **Down Payment:** $${inputs.downPayment?.toLocaleString() || '0'}
- **Loan Amount:** $${inputs.loanAmount?.toLocaleString() || '0'}

## Cash Flow Analysis
- **Monthly Cash Flow:** $${outputs.monthlyCashFlow.toLocaleString()}
- **Annual Cash Flow:** $${outputs.annualCashFlow.toLocaleString()}
- **Cash-on-Cash Return:** ${outputs.cashOnCashReturn}%
- **Break-Even Rent:** $${outputs.breakEvenRent.toLocaleString()}
- **Break-Even Occupancy:** ${outputs.breakEvenOccupancy}%

## ROI Metrics
- **Cap Rate:** ${outputs.capRate}%
- **Total ROI:** ${outputs.totalROI}%
- **Annualized ROI:** ${outputs.annualizedROI}%
- **Gross Rent Multiplier:** ${outputs.grossRentMultiplier}
- **Debt Service Coverage:** ${outputs.debtServiceCoverage}

## Financial Health
- **Net Operating Income:** $${outputs.netOperatingIncome.toLocaleString()}
- **Operating Expense Ratio:** ${outputs.operatingExpenseRatio}%
- **Profit Margin:** ${outputs.profitMargin}%
- **Equity Build-Up:** $${outputs.equityBuildUp.toLocaleString()}
- **Tax Benefits:** $${outputs.taxBenefits.toLocaleString()}

## Investment Returns
- **Appreciation Value:** $${outputs.appreciationValue.toLocaleString()}
- **Total Annual Return:** $${outputs.totalReturn.toLocaleString()}
- **Payback Period:** ${outputs.paybackPeriod} years
- **Internal Rate of Return:** ${outputs.internalRateOfReturn}%
- **Net Present Value:** $${outputs.netPresentValue.toLocaleString()}

## Key Strengths
${outputs.keyStrengths}

## Key Risks
${outputs.keyRisks}

## Recommendations
1. **Cash Flow:** Ensure monthly cash flow covers all expenses
2. **Vacancy:** Plan for ${inputs.vacancyRate || 5}% vacancy rate
3. **Maintenance:** Budget for ongoing maintenance and repairs
4. **Market:** Monitor local market conditions and rent trends
5. **Exit Strategy:** Plan for ${inputs.exitStrategy || 'sell'} exit strategy
6. **Tax Planning:** Consult with tax professional for deductions
7. **Insurance:** Maintain adequate property and liability insurance
8. **Management:** Consider professional property management if needed`;
}
