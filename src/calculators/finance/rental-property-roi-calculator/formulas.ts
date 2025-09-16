import { RentalPropertyROIInputs, RentalPropertyROIResults } from './types';

/**
 * Calculate rental property ROI and investment metrics
 */
export function calculateRentalPropertyROI(inputs: RentalPropertyROIInputs): RentalPropertyROIResults {
  const {
    propertyPrice,
    downPayment,
    loanAmount,
    interestRate,
    loanTerm,
    monthlyRent,
    vacancyRate,
    propertyManagementFee,
    maintenanceCost,
    propertyTaxes,
    insurance,
    hoaFees,
    otherExpenses,
    appreciationRate,
    holdingPeriod,
    sellingCosts
  } = inputs;

  // Calculate monthly income
  const vacancyLoss = monthlyRent * (vacancyRate / 100);
  const monthlyIncome = monthlyRent - vacancyLoss;

  // Calculate monthly expenses
  const managementFee = monthlyIncome * (propertyManagementFee / 100);
  const monthlyExpenses = managementFee + maintenanceCost + propertyTaxes + insurance + hoaFees + otherExpenses;

  // Calculate cash flow
  const monthlyCashFlow = monthlyIncome - monthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;

  // Calculate loan payment if financed
  let monthlyLoanPayment = 0;
  if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    monthlyLoanPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  // Adjust cash flow for loan payment
  const monthlyCashFlowAfterLoan = monthlyCashFlow - monthlyLoanPayment;
  const annualCashFlowAfterLoan = monthlyCashFlowAfterLoan * 12;

  // Calculate total investment
  const totalInvestment = downPayment;

  // Calculate cap rate
  const annualGrossRent = monthlyRent * 12;
  const effectiveGrossIncome = annualGrossRent * (1 - vacancyRate / 100);
  const annualOperatingExpenses = (managementFee + maintenanceCost + propertyTaxes + insurance + hoaFees + otherExpenses) * 12;
  const netOperatingIncome = effectiveGrossIncome - annualOperatingExpenses;
  const capRate = propertyPrice > 0 ? (netOperatingIncome / propertyPrice) * 100 : 0;

  // Calculate cash-on-cash return
  const cashOnCashReturn = totalInvestment > 0 ? (annualCashFlowAfterLoan / totalInvestment) * 100 : 0;

  // Calculate appreciation and equity build-up
  const futureValue = propertyPrice * Math.pow(1 + appreciationRate / 100, holdingPeriod);
  const appreciation = futureValue - propertyPrice;
  const sellingCostsAmount = futureValue * (sellingCosts / 100);
  const netProceeds = futureValue - sellingCostsAmount;

  // Calculate loan payoff
  let remainingLoanBalance = loanAmount;
  if (loanAmount > 0 && monthlyLoanPayment > 0) {
    // Simplified loan balance calculation
    const monthlyRate = interestRate / 100 / 12;
    for (let year = 0; year < holdingPeriod; year++) {
      for (let month = 0; month < 12; month++) {
        const interestPayment = remainingLoanBalance * monthlyRate;
        const principalPayment = monthlyLoanPayment - interestPayment;
        remainingLoanBalance -= principalPayment;
        if (remainingLoanBalance < 0) remainingLoanBalance = 0;
      }
    }
  }

  const equityBuildUp = loanAmount - remainingLoanBalance;
  const totalCashFromSale = netProceeds - remainingLoanBalance;
  const totalReturn = (annualCashFlowAfterLoan * holdingPeriod) + totalCashFromSale;
  const totalProfit = totalReturn - totalInvestment;

  // Calculate ROI
  const roiPercentage = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

  // Calculate annualized return
  const annualizedReturn = holdingPeriod > 0 ? Math.pow(1 + (totalReturn / totalInvestment), 1 / holdingPeriod) - 1 : 0;
  const annualizedReturnPercent = annualizedReturn * 100;

  // Calculate IRR (simplified approximation)
  const irr = calculateSimpleIRR(totalInvestment, totalReturn, holdingPeriod);

  // Calculate debt service coverage ratio
  const annualDebtService = monthlyLoanPayment * 12;
  const debtServiceCoverageRatio = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 0;

  // Calculate break-even ratio
  const breakEvenRatio = annualOperatingExpenses > 0 ? (annualOperatingExpenses / effectiveGrossIncome) * 100 : 0;

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlyCashFlow: monthlyCashFlowAfterLoan,
    annualCashFlow: annualCashFlowAfterLoan,
    capRate,
    cashOnCashReturn,
    totalReturn,
    annualizedReturn: annualizedReturnPercent,
    irr,
    netOperatingIncome,
    debtServiceCoverageRatio,
    breakEvenRatio,
    totalInvestment,
    equityBuildUp,
    totalProfit,
    roiPercentage
  };
}

/**
 * Calculate simple IRR approximation
 */
function calculateSimpleIRR(initialInvestment: number, totalReturn: number, years: number): number {
  if (initialInvestment <= 0 || years <= 0) return 0;

  const multiple = totalReturn / initialInvestment;
  if (multiple <= 1) return 0;

  // Simple IRR approximation using compound growth formula
  const irr = Math.pow(multiple, 1 / years) - 1;
  return Math.round(irr * 10000) / 100; // Return as percentage with 2 decimal places
}

/**
 * Validate rental property ROI inputs
 */
export function validateRentalPropertyROIInputs(inputs: RentalPropertyROIInputs): string[] {
  const errors: string[] = [];

  if (inputs.propertyPrice <= 0) {
    errors.push('Property price must be greater than 0');
  }

  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.downPayment > inputs.propertyPrice) {
    errors.push('Down payment cannot exceed property price');
  }

  if (inputs.loanAmount < 0) {
    errors.push('Loan amount cannot be negative');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.loanTerm < 0 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 0 and 50 years');
  }

  if (inputs.monthlyRent <= 0) {
    errors.push('Monthly rent must be greater than 0');
  }

  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 100) {
    errors.push('Vacancy rate must be between 0% and 100%');
  }

  if (inputs.propertyManagementFee < 0 || inputs.propertyManagementFee > 50) {
    errors.push('Property management fee must be between 0% and 50%');
  }

  if (inputs.maintenanceCost < 0) {
    errors.push('Maintenance cost cannot be negative');
  }

  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }

  if (inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  }

  if (inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }

  if (inputs.otherExpenses < 0) {
    errors.push('Other expenses cannot be negative');
  }

  if (inputs.appreciationRate < -10 || inputs.appreciationRate > 20) {
    errors.push('Appreciation rate must be between -10% and 20%');
  }

  if (inputs.holdingPeriod <= 0 || inputs.holdingPeriod > 50) {
    errors.push('Holding period must be between 1 and 50 years');
  }

  if (inputs.sellingCosts < 0 || inputs.sellingCosts > 20) {
    errors.push('Selling costs must be between 0% and 20%');
  }

  return errors;
}