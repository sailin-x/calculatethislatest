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
 * Calculate yield score based on multiple factors
 */
function calculateYieldScore(
  grossYield: number,
  netYield: number,
  cashOnCashReturn: number,
  vacancyRate: number,
  marketConditions: string,
  propertyType: string,
  location: string
): number {
  let score = 0;
  
  // Gross yield factor (30%)
  let grossYieldFactor = 0;
  if (grossYield >= 8) grossYieldFactor = 30;
  else if (grossYield >= 6) grossYieldFactor = 25;
  else if (grossYield >= 4) grossYieldFactor = 20;
  else if (grossYield >= 2) grossYieldFactor = 15;
  else if (grossYield >= 0) grossYieldFactor = 10;
  score += grossYieldFactor;
  
  // Net yield factor (25%)
  let netYieldFactor = 0;
  if (netYield >= 6) netYieldFactor = 25;
  else if (netYield >= 4) netYieldFactor = 20;
  else if (netYield >= 2) netYieldFactor = 15;
  else if (netYield >= 0) netYieldFactor = 10;
  score += netYieldFactor;
  
  // Cash-on-cash return factor (20%)
  let cocFactor = 0;
  if (cashOnCashReturn >= 12) cocFactor = 20;
  else if (cashOnCashReturn >= 8) cocFactor = 15;
  else if (cashOnCashReturn >= 6) cocFactor = 10;
  else if (cashOnCashReturn >= 4) cocFactor = 5;
  score += cocFactor;
  
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
 * Calculate risk score for rental yield investment
 */
function calculateRiskScore(
  vacancyRate: number,
  debtServiceCoverage: number,
  marketConditions: string,
  propertyType: string,
  yearBuilt: number,
  location: string,
  grossYield: number
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
  
  // Yield risk (15%)
  if (grossYield < 2) riskScore += 15;
  else if (grossYield < 4) riskScore += 12;
  else if (grossYield < 6) riskScore += 8;
  else if (grossYield < 8) riskScore += 4;
  
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
 * Calculate market score
 */
function calculateMarketScore(
  marketConditions: string,
  appreciationRate: number,
  location: string,
  rentGrowthRate: number
): number {
  let score = 0;
  
  // Market conditions factor (40%)
  if (marketConditions === 'hot') score += 40;
  else if (marketConditions === 'stable') score += 35;
  else if (marketConditions === 'cooling') score += 25;
  else if (marketConditions === 'declining') score += 15;
  
  // Appreciation rate factor (30%)
  if (appreciationRate >= 5) score += 30;
  else if (appreciationRate >= 3) score += 25;
  else if (appreciationRate >= 1) score += 20;
  else if (appreciationRate >= 0) score += 15;
  else if (appreciationRate >= -2) score += 10;
  else score += 5;
  
  // Location factor (20%)
  if (location === 'urban') score += 20;
  else if (location === 'suburban') score += 18;
  else if (location === 'rural') score += 15;
  
  // Rent growth factor (10%)
  if (rentGrowthRate >= 5) score += 10;
  else if (rentGrowthRate >= 3) score += 8;
  else if (rentGrowthRate >= 1) score += 6;
  else if (rentGrowthRate >= 0) score += 4;
  else if (rentGrowthRate >= -2) score += 2;
  
  return Math.min(score, 100);
}

/**
 * Main rental yield calculation function
 */
export function calculateRentalYield(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values with defaults
  const propertyValue = inputs.propertyValue || 0;
  const purchasePrice = inputs.purchasePrice || propertyValue;
  const downPayment = inputs.downPayment || 0;
  const closingCosts = inputs.closingCosts || 0;
  const renovationCosts = inputs.renovationCosts || 0;
  
  const monthlyRent = inputs.monthlyRent || 0;
  const annualRent = inputs.annualRent || (monthlyRent * 12);
  const vacancyRate = inputs.vacancyRate || 5;
  const rentGrowthRate = inputs.rentGrowthRate || 3;
  const otherIncome = inputs.otherIncome || 0;
  const lateFees = inputs.lateFees || 0;
  
  const propertyTaxes = inputs.propertyTaxes || 0;
  const insurance = inputs.insurance || 0;
  const hoaFees = inputs.hoaFees || 0;
  const utilities = inputs.utilities || 0;
  const maintenance = inputs.maintenance || 0;
  const propertyManagement = inputs.propertyManagement || 8;
  const repairs = inputs.repairs || 0;
  const landscaping = inputs.landscaping || 0;
  const pestControl = inputs.pestControl || 0;
  const advertising = inputs.advertising || 0;
  const legalFees = inputs.legalFees || 0;
  const accountingFees = inputs.accountingFees || 0;
  
  const loanAmount = inputs.loanAmount || 0;
  const interestRate = inputs.interestRate || 0;
  const loanTerm = inputs.loanTerm || 30;
  const pmi = inputs.pmi || 0;
  
  const propertyType = inputs.propertyType || 'single-family';
  const yearBuilt = inputs.yearBuilt || 2000;
  const location = inputs.location || 'suburban';
  const appreciationRate = inputs.appreciationRate || 3;
  const inflationRate = inputs.inflationRate || 2.5;
  const marketConditions = inputs.marketConditions || 'stable';
  const holdingPeriod = inputs.holdingPeriod || 10;
  
  const taxRate = inputs.taxRate || 22;
  const depreciationPeriod = inputs.depreciationPeriod || 27.5;
  
  // Calculate total investment
  const totalInvestment = downPayment + closingCosts + renovationCosts;
  
  // Calculate gross annual income
  const effectiveRent = monthlyRent * (1 - vacancyRate / 100);
  const grossMonthlyIncome = effectiveRent + otherIncome + lateFees;
  const grossAnnualIncome = grossMonthlyIncome * 12;
  
  // Calculate operating expenses
  const monthlyPropertyTaxes = propertyTaxes / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyLegalFees = legalFees / 12;
  const monthlyAccountingFees = accountingFees / 12;
  const monthlyPropertyManagement = grossMonthlyIncome * (propertyManagement / 100);
  
  const totalMonthlyExpenses = monthlyPropertyTaxes + monthlyInsurance + hoaFees + utilities + 
                               maintenance + monthlyPropertyManagement + repairs + landscaping + 
                               pestControl + advertising + monthlyLegalFees + monthlyAccountingFees;
  const totalAnnualExpenses = totalMonthlyExpenses * 12;
  
  // Calculate net operating income
  const netOperatingIncome = grossAnnualIncome - totalAnnualExpenses;
  const netAnnualIncome = netOperatingIncome;
  
  // Calculate mortgage payment
  const monthlyMortgagePayment = loanAmount > 0 ? calculateMortgagePayment(loanAmount, interestRate, loanTerm) : 0;
  const annualMortgagePayment = monthlyMortgagePayment * 12;
  
  // Calculate cash flow
  const monthlyCashFlow = grossMonthlyIncome - totalMonthlyExpenses - monthlyMortgagePayment - pmi;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate yield metrics
  const grossYield = propertyValue > 0 ? (grossAnnualIncome / propertyValue) * 100 : 0;
  const netYield = propertyValue > 0 ? (netOperatingIncome / propertyValue) * 100 : 0;
  const cashOnCashReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  
  // Calculate ratios
  const operatingExpenseRatio = grossAnnualIncome > 0 ? (totalAnnualExpenses / grossAnnualIncome) * 100 : 0;
  const debtServiceCoverage = (monthlyMortgagePayment + pmi) > 0 ? 
    netOperatingIncome / ((monthlyMortgagePayment + pmi) * 12) : 0;
  const rentToPriceRatio = propertyValue > 0 ? grossAnnualIncome / propertyValue : 0;
  const priceToRentRatio = grossAnnualIncome > 0 ? propertyValue / grossAnnualIncome : 0;
  
  // Calculate break-even analysis
  const breakEvenRent = totalMonthlyExpenses + monthlyMortgagePayment + pmi;
  const breakEvenOccupancy = monthlyRent > 0 ? (breakEvenRent / monthlyRent) * 100 : 0;
  
  // Calculate cap rate
  const capRate = propertyValue > 0 ? (netOperatingIncome / propertyValue) * 100 : 0;
  
  // Calculate ROI metrics
  const totalROI = totalInvestment > 0 ? ((annualCashFlow + (propertyValue * appreciationRate / 100)) / totalInvestment) * 100 : 0;
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
  const finalValue = propertyValue * Math.pow(1 + appreciationRate / 100, holdingPeriod);
  const saleProceeds = finalValue - loanAmount;
  cashFlows[cashFlows.length - 1] += saleProceeds;
  
  const irr = calculateIRR(totalInvestment, cashFlows);
  const npv = calculateNPV(cashFlows, inflationRate) - totalInvestment;
  
  // Calculate scores
  const yieldScore = calculateYieldScore(
    grossYield, netYield, cashOnCashReturn, vacancyRate, 
    marketConditions, propertyType, location
  );
  
  const riskScore = calculateRiskScore(
    vacancyRate, debtServiceCoverage, marketConditions, propertyType,
    yearBuilt, location, grossYield
  );
  
  const cashFlowScore = calculateCashFlowScore(
    cashOnCashReturn, debtServiceCoverage, monthlyCashFlow, totalInvestment
  );
  
  const marketScore = calculateMarketScore(
    marketConditions, appreciationRate, location, rentGrowthRate
  );
  
  // Generate recommendation
  let recommendation = 'Consider this investment';
  if (yieldScore >= 80) recommendation = 'Strong buy recommendation';
  else if (yieldScore >= 60) recommendation = 'Buy recommendation';
  else if (yieldScore >= 40) recommendation = 'Consider this investment';
  else if (yieldScore >= 20) recommendation = 'Proceed with caution';
  else recommendation = 'Not recommended';
  
  // Generate key strengths
  const keyStrengths = [
    `Gross yield: ${grossYield.toFixed(2)}%`,
    `Net yield: ${netYield.toFixed(2)}%`,
    `Cash-on-cash return: ${cashOnCashReturn.toFixed(2)}%`,
    `Monthly cash flow: $${monthlyCashFlow.toLocaleString()}`
  ].join(', ');
  
  // Generate key risks
  const keyRisks = [
    `Vacancy rate: ${vacancyRate}%`,
    `Risk score: ${riskScore}/100`,
    `Break-even rent: $${breakEvenRent.toLocaleString()}`,
    `Payback period: ${paybackPeriod.toFixed(1)} years`
  ].join(', ');
  
  return {
    grossYield: Math.round(grossYield * 100) / 100,
    netYield: Math.round(netYield * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    monthlyCashFlow: Math.round(monthlyCashFlow * 100) / 100,
    annualCashFlow: Math.round(annualCashFlow * 100) / 100,
    grossAnnualIncome: Math.round(grossAnnualIncome * 100) / 100,
    netAnnualIncome: Math.round(netAnnualIncome * 100) / 100,
    totalAnnualExpenses: Math.round(totalAnnualExpenses * 100) / 100,
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    breakEvenRent: Math.round(breakEvenRent * 100) / 100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
    rentToPriceRatio: Math.round(rentToPriceRatio * 100) / 100,
    priceToRentRatio: Math.round(priceToRentRatio * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    totalROI: Math.round(totalROI * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    netPresentValue: Math.round(npv * 100) / 100,
    yieldScore,
    riskScore,
    cashFlowScore,
    marketScore,
    recommendation,
    keyStrengths,
    keyRisks,
    rentalYieldAnalysis: 'Comprehensive rental yield analysis completed'
  };
}

/**
 * Generate comprehensive rental yield analysis report
 */
export function generateRentalYieldAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Rental Yield Analysis Report

## Summary
**Recommendation:** ${outputs.recommendation}
**Yield Score:** ${outputs.yieldScore}/100
**Risk Score:** ${outputs.riskScore}/100
**Cash Flow Score:** ${outputs.cashFlowScore}/100
**Market Score:** ${outputs.marketScore}/100

## Yield Metrics
- **Gross Yield:** ${outputs.grossYield}%
- **Net Yield:** ${outputs.netYield}%
- **Cash-on-Cash Return:** ${outputs.cashOnCashReturn}%
- **Cap Rate:** ${outputs.capRate}%

## Investment Overview
- **Property Value:** $${inputs.propertyValue?.toLocaleString() || '0'}
- **Total Investment:** $${outputs.totalInvestment.toLocaleString()}
- **Purchase Price:** $${inputs.purchasePrice?.toLocaleString() || '0'}
- **Down Payment:** $${inputs.downPayment?.toLocaleString() || '0'}

## Income Analysis
- **Gross Annual Income:** $${outputs.grossAnnualIncome.toLocaleString()}
- **Net Annual Income:** $${outputs.netAnnualIncome.toLocaleString()}
- **Total Annual Expenses:** $${outputs.totalAnnualExpenses.toLocaleString()}
- **Operating Expense Ratio:** ${outputs.operatingExpenseRatio}%

## Cash Flow Analysis
- **Monthly Cash Flow:** $${outputs.monthlyCashFlow.toLocaleString()}
- **Annual Cash Flow:** $${outputs.annualCashFlow.toLocaleString()}
- **Break-Even Rent:** $${outputs.breakEvenRent.toLocaleString()}
- **Break-Even Occupancy:** ${outputs.breakEvenOccupancy}%

## Financial Ratios
- **Rent-to-Price Ratio:** ${outputs.rentToPriceRatio}
- **Price-to-Rent Ratio:** ${outputs.priceToRentRatio}
- **Debt Service Coverage:** ${outputs.debtServiceCoverage}
- **Payback Period:** ${outputs.paybackPeriod} years

## Investment Returns
- **Total ROI:** ${outputs.totalROI}%
- **Annualized ROI:** ${outputs.annualizedROI}%
- **Internal Rate of Return:** ${outputs.internalRateOfReturn}%
- **Net Present Value:** $${outputs.netPresentValue.toLocaleString()}

## Key Strengths
${outputs.keyStrengths}

## Key Risks
${outputs.keyRisks}

## Recommendations
1. **Yield Analysis:** Monitor yield trends in the local market
2. **Cash Flow:** Ensure positive cash flow covers all expenses
3. **Vacancy:** Plan for ${inputs.vacancyRate || 5}% vacancy rate
4. **Expenses:** Budget for ongoing maintenance and property management
5. **Market:** Monitor local market conditions and rent trends
6. **Financing:** Consider refinancing opportunities for better rates
7. **Tax Planning:** Consult with tax professional for deductions
8. **Insurance:** Maintain adequate property and liability insurance`;
}
