import { SelfStorageFacilityROIInputs, SelfStorageFacilityROIResults } from './types';

/**
 * Calculate self-storage facility ROI and financial metrics
 */
export function calculateSelfStorageFacilityROI(inputs: SelfStorageFacilityROIInputs): SelfStorageFacilityROIResults {
  const {
    totalUnits,
    averageUnitSize,
    totalSquareFootage,
    occupancyRate,
    acquisitionCost,
    landCost,
    constructionCost,
    softCosts,
    financingAmount,
    interestRate,
    loanTerm,
    averageMonthlyRent,
    annualRentIncrease,
    otherIncome,
    propertyTaxes,
    insurance,
    maintenance,
    utilities,
    managementFees,
    marketing,
    supplies,
    security,
    analysisPeriod,
    exitCapRate,
    discountRate,
    terminalValue
  } = inputs;

  // Calculate total investment
  const totalInvestment = acquisitionCost + landCost + constructionCost + softCosts;

  // Calculate annual revenue
  const occupiedUnits = totalUnits * (occupancyRate / 100);
  const annualRevenue = (occupiedUnits * averageMonthlyRent * 12) + otherIncome;

  // Calculate annual expenses
  const annualExpenses = propertyTaxes + insurance + maintenance + utilities +
                        managementFees + marketing + supplies + security;

  // Calculate NOI (Net Operating Income)
  const netOperatingIncome = annualRevenue - annualExpenses;

  // Calculate debt service
  const annualDebtService = financingAmount > 0 ?
    calculateAnnualDebtService(financingAmount, interestRate, loanTerm) : 0;

  // Calculate cash flow
  const cashFlow = netOperatingIncome - annualDebtService;

  // Calculate financial metrics
  const capRate = totalInvestment > 0 ? (netOperatingIncome / totalInvestment) * 100 : 0;
  const cashOnCashReturn = financingAmount > 0 ? (cashFlow / financingAmount) * 100 : 0;

  // Calculate IRR and NPV
  const { irr, npv } = calculateIRRAndNPV(totalInvestment, financingAmount, analysisPeriod, discountRate, terminalValue, cashFlow);

  // Calculate unit economics
  const revenuePerSquareFoot = totalSquareFootage > 0 ? annualRevenue / totalSquareFootage : 0;
  const expenseRatio = annualRevenue > 0 ? (annualExpenses / annualRevenue) * 100 : 0;
  const breakEvenOccupancy = calculateBreakEvenOccupancy(inputs);
  const averageRentPerUnit = occupiedUnits > 0 ? (annualRevenue - otherIncome) / (occupiedUnits * 12) : 0;

  // Calculate investment analysis
  const paybackPeriod = totalInvestment > 0 ? totalInvestment / cashFlow : 0;
  const totalReturn = cashFlow * analysisPeriod;
  const roiPercentage = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;
  const profitMargin = annualRevenue > 0 ? (netOperatingIncome / annualRevenue) * 100 : 0;

  // Calculate risk metrics
  const dscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 0;
  const riskAssessment = generateRiskAssessment(dscr, occupancyRate, paybackPeriod);
  const recommendation = generateRecommendation(roiPercentage, paybackPeriod);

  return {
    totalInvestment,
    annualRevenue,
    annualExpenses,
    netOperatingIncome,
    cashFlow,
    capRate,
    cashOnCashReturn,
    irr,
    npv,
    revenuePerSquareFoot,
    expenseRatio,
    breakEvenOccupancy,
    averageRentPerUnit,
    paybackPeriod,
    totalReturn,
    roiPercentage,
    profitMargin,
    dscr,
    riskAssessment,
    recommendation
  };
}

/**
 * Calculate annual debt service
 */
function calculateAnnualDebtService(loanAmount: number, interestRate: number, loanTerm: number): number {
  if (loanAmount <= 0 || loanTerm <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment * 12;
}

/**
 * Calculate IRR and NPV
 */
function calculateIRRAndNPV(
  totalInvestment: number,
  financingAmount: number,
  analysisPeriod: number,
  discountRate: number,
  terminalValue: number,
  annualCashFlow: number
): { irr: number; npv: number } {
  // Simplified IRR calculation
  const initialInvestment = totalInvestment - financingAmount;
  const totalCashFlows = annualCashFlow * analysisPeriod + terminalValue;
  const irr = totalCashFlows > 0 ? ((totalCashFlows / initialInvestment) ** (1 / analysisPeriod) - 1) * 100 : 0;

  // Calculate NPV
  let npv = -initialInvestment;
  const discountFactor = discountRate / 100;

  for (let year = 1; year <= analysisPeriod; year++) {
    npv += annualCashFlow / Math.pow(1 + discountFactor, year);
  }

  // Add terminal value
  npv += terminalValue / Math.pow(1 + discountFactor, analysisPeriod);

  return { irr, npv };
}

/**
 * Calculate break-even occupancy rate
 */
function calculateBreakEvenOccupancy(inputs: SelfStorageFacilityROIInputs): number {
  const {
    totalUnits,
    averageMonthlyRent,
    propertyTaxes,
    insurance,
    maintenance,
    utilities,
    managementFees,
    marketing,
    supplies,
    security
  } = inputs;

  const annualExpenses = propertyTaxes + insurance + maintenance + utilities +
                        managementFees + marketing + supplies + security;

  const annualRevenueNeeded = annualExpenses;
  const monthlyRevenueNeeded = annualRevenueNeeded / 12;
  const unitsNeeded = monthlyRevenueNeeded / averageMonthlyRent;

  return totalUnits > 0 ? (unitsNeeded / totalUnits) * 100 : 0;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(
  dscr: number,
  occupancyRate: number,
  paybackPeriod: number
): string {
  let riskLevel = 'Low';
  let concerns: string[] = [];

  if (dscr < 1.25) {
    riskLevel = 'High';
    concerns.push('Low debt service coverage ratio increases default risk');
  } else if (dscr < 1.5) {
    riskLevel = 'Medium';
    concerns.push('Moderate debt service coverage ratio');
  }

  if (occupancyRate < 70) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
    concerns.push('Low occupancy rate increases revenue risk');
  }

  if (paybackPeriod > 10) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
    concerns.push('Long payback period increases investment risk');
  }

  if (concerns.length === 0) {
    concerns.push('Generally favorable risk profile');
  }

  return `${riskLevel} Risk: ${concerns.join(', ')}`;
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  roiPercentage: number,
  paybackPeriod: number
): string {
  if (roiPercentage > 15 && paybackPeriod < 7) {
    return 'Strong investment opportunity - high returns with reasonable payback period';
  }

  if (roiPercentage > 10 && paybackPeriod < 10) {
    return 'Good investment opportunity - solid returns with acceptable payback period';
  }

  if (roiPercentage > 8) {
    return 'Moderate investment opportunity - acceptable returns but longer payback period';
  }

  if (roiPercentage > 5) {
    return 'Consider carefully - marginal returns may not justify investment risk';
  }

  return 'Poor investment opportunity - low returns and high risk';
}

/**
 * Validate self-storage facility ROI inputs
 */
export function validateSelfStorageFacilityROIInputs(inputs: SelfStorageFacilityROIInputs): string[] {
  const errors: string[] = [];

  if (inputs.totalUnits <= 0) {
    errors.push('Total units must be greater than 0');
  }

  if (inputs.averageUnitSize <= 0) {
    errors.push('Average unit size must be greater than 0');
  }

  if (inputs.totalSquareFootage <= 0) {
    errors.push('Total square footage must be greater than 0');
  }

  if (inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
    errors.push('Occupancy rate must be between 0% and 100%');
  }

  if (inputs.acquisitionCost < 0) {
    errors.push('Acquisition cost cannot be negative');
  }

  if (inputs.landCost < 0) {
    errors.push('Land cost cannot be negative');
  }

  if (inputs.constructionCost < 0) {
    errors.push('Construction cost cannot be negative');
  }

  if (inputs.softCosts < 0) {
    errors.push('Soft costs cannot be negative');
  }

  if (inputs.financingAmount < 0) {
    errors.push('Financing amount cannot be negative');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.loanTerm < 0 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 0 and 50 years');
  }

  if (inputs.averageMonthlyRent <= 0) {
    errors.push('Average monthly rent must be greater than 0');
  }

  if (inputs.annualRentIncrease < -10 || inputs.annualRentIncrease > 20) {
    errors.push('Annual rent increase must be between -10% and 20%');
  }

  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.exitCapRate < 0 || inputs.exitCapRate > 20) {
    errors.push('Exit cap rate must be between 0% and 20%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  return errors;
}