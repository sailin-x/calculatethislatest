import { RentalYieldInputs, RentalYieldResults } from './types';

/**
 * Calculate rental yield and investment metrics
 */
export function calculateRentalYield(inputs: RentalYieldInputs): RentalYieldResults {
  const {
    propertyPrice,
    monthlyRent,
    vacancyRate,
    annualOperatingExpenses,
    annualPropertyTaxes,
    annualInsurance,
    annualMaintenance,
    annualManagementFees,
    otherAnnualCosts,
    financingType,
    downPaymentPercentage,
    interestRate,
    loanTerm
  } = inputs;

  // Calculate annual gross rent
  const annualGrossRent = monthlyRent * 12;

  // Calculate vacancy loss
  const vacancyLoss = annualGrossRent * (vacancyRate / 100);
  const effectiveGrossIncome = annualGrossRent - vacancyLoss;

  // Calculate total annual expenses
  const totalAnnualExpenses = annualOperatingExpenses + annualPropertyTaxes +
                             annualInsurance + annualMaintenance +
                             annualManagementFees + otherAnnualCosts;

  // Calculate net operating income
  const netOperatingIncome = effectiveGrossIncome - totalAnnualExpenses;

  // Calculate gross rental yield
  const grossRentalYield = propertyPrice > 0 ? (annualGrossRent / propertyPrice) * 100 : 0;

  // Calculate net rental yield (cap rate)
  const capRate = propertyPrice > 0 ? (netOperatingIncome / propertyPrice) * 100 : 0;

  // Calculate financing details
  let totalInvestment = propertyPrice;
  let loanPayment = 0;
  let financingCosts = 0;
  let equityPercentage = 100;

  if (financingType === 'financed') {
    const downPayment = propertyPrice * (downPaymentPercentage / 100);
    const loanAmount = propertyPrice - downPayment;
    totalInvestment = downPayment;
    equityPercentage = downPaymentPercentage;

    // Calculate monthly loan payment
    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTerm * 12;
      loanPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    financingCosts = loanPayment * 12; // Annual loan payment
  }

  // Calculate cash flow
  const annualCashFlow = netOperatingIncome - financingCosts;
  const monthlyCashFlow = annualCashFlow / 12;

  // Calculate cash-on-cash return
  const cashOnCashReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;

  // Calculate net rental yield (after financing)
  const netRentalYield = propertyPrice > 0 ? (annualCashFlow / propertyPrice) * 100 : 0;

  // Calculate break-even ratio
  const breakEvenRatio = effectiveGrossIncome > 0 ? (totalAnnualExpenses / effectiveGrossIncome) * 100 : 0;

  // Calculate debt service coverage ratio
  const debtServiceCoverageRatio = financingCosts > 0 ? netOperatingIncome / financingCosts : 0;

  // Calculate ROI (simplified - assuming 1 year hold)
  const returnOnInvestment = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;

  // Calculate IRR (simplified approximation)
  const internalRateOfReturn = calculateSimpleIRR(totalInvestment, annualCashFlow, 1);

  return {
    grossRentalYield,
    netRentalYield,
    cashOnCashReturn,
    capRate,
    totalAnnualIncome: effectiveGrossIncome,
    totalAnnualExpenses,
    netOperatingIncome,
    monthlyCashFlow,
    annualCashFlow,
    breakEvenRatio,
    debtServiceCoverageRatio,
    returnOnInvestment,
    internalRateOfReturn,
    totalInvestment,
    financingCosts,
    loanPayment,
    equityPercentage
  };
}

/**
 * Calculate simple IRR approximation
 */
function calculateSimpleIRR(initialInvestment: number, annualCashFlow: number, years: number): number {
  if (initialInvestment <= 0 || years <= 0) return 0;

  const totalReturn = annualCashFlow * years;
  if (totalReturn <= 0) return 0;

  // Simple IRR approximation using compound growth formula
  const multiple = totalReturn / initialInvestment;
  const irr = Math.pow(multiple, 1 / years) - 1;
  return Math.round(irr * 10000) / 100; // Return as percentage with 2 decimal places
}

/**
 * Validate rental yield inputs
 */
export function validateRentalYieldInputs(inputs: RentalYieldInputs): string[] {
  const errors: string[] = [];

  if (inputs.propertyPrice <= 0) {
    errors.push('Property price must be greater than 0');
  }

  if (inputs.monthlyRent <= 0) {
    errors.push('Monthly rent must be greater than 0');
  }

  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 100) {
    errors.push('Vacancy rate must be between 0% and 100%');
  }

  if (inputs.annualOperatingExpenses < 0) {
    errors.push('Annual operating expenses cannot be negative');
  }

  if (inputs.annualPropertyTaxes < 0) {
    errors.push('Annual property taxes cannot be negative');
  }

  if (inputs.annualInsurance < 0) {
    errors.push('Annual insurance cannot be negative');
  }

  if (inputs.annualMaintenance < 0) {
    errors.push('Annual maintenance cannot be negative');
  }

  if (inputs.annualManagementFees < 0) {
    errors.push('Annual management fees cannot be negative');
  }

  if (inputs.otherAnnualCosts < 0) {
    errors.push('Other annual costs cannot be negative');
  }

  if (inputs.financingType === 'financed') {
    if (inputs.downPaymentPercentage <= 0 || inputs.downPaymentPercentage >= 100) {
      errors.push('Down payment percentage must be between 0% and 100%');
    }

    if (inputs.interestRate < 0 || inputs.interestRate > 20) {
      errors.push('Interest rate must be between 0% and 20%');
    }

    if (inputs.loanTerm <= 0 || inputs.loanTerm > 50) {
      errors.push('Loan term must be between 1 and 50 years');
    }
  }

  return errors;
}