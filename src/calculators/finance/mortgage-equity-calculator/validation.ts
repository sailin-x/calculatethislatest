import { MortgageEquityInputs } from './types';

export function validateMortgageEquityInputs(inputs: MortgageEquityInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Loan Balance Validation
  if (inputs.loanBalance < 0) {
    errors.push({ field: 'loanBalance', message: 'Loan balance cannot be negative' });
  }
  if (inputs.loanBalance > inputs.propertyValue) {
    errors.push({ field: 'loanBalance', message: 'Loan balance cannot exceed property value' });
  }

  // Original Loan Amount Validation
  if (!inputs.originalLoanAmount || inputs.originalLoanAmount <= 0) {
    errors.push({ field: 'originalLoanAmount', message: 'Original loan amount must be greater than 0' });
  }

  // Monthly Payment Validation
  if (!inputs.monthlyPayment || inputs.monthlyPayment <= 0) {
    errors.push({ field: 'monthlyPayment', message: 'Monthly payment must be greater than 0' });
  }

  // Interest Rate Validation
  if (inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate > 30) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 30%' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Months Paid Validation
  if (inputs.monthsPaid < 0) {
    errors.push({ field: 'monthsPaid', message: 'Months paid cannot be negative' });
  }
  if (inputs.monthsPaid > inputs.loanTerm * 12) {
    errors.push({ field: 'monthsPaid', message: 'Months paid cannot exceed total loan term' });
  }

  // Appreciation Rate Validation
  if (inputs.propertyAppreciationRate < -20) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate cannot be less than -20%' });
  }
  if (inputs.propertyAppreciationRate > 50) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate cannot exceed 50%' });
  }

  // Market Growth Rate Validation
  if (inputs.marketGrowthRate < -20) {
    errors.push({ field: 'marketGrowthRate', message: 'Market growth rate cannot be less than -20%' });
  }
  if (inputs.marketGrowthRate > 50) {
    errors.push({ field: 'marketGrowthRate', message: 'Market growth rate cannot exceed 50%' });
  }

  // Analysis Period Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period must be at least 1 year' });
  }
  if (inputs.analysisPeriod > 30) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period cannot exceed 30 years' });
  }

  // Cost Validations
  const costFields = ['propertyTaxes', 'homeownersInsurance', 'hoaFees', 'maintenanceCosts', 'rentalIncome'];
  costFields.forEach(field => {
    const value = inputs[field as keyof MortgageEquityInputs];
    if (typeof value === 'number' && value < 0) {
      errors.push({ field, message: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} cannot be negative` });
    }
  });

  // Vacancy Rate Validation
  if (inputs.vacancyRate < 0) {
    errors.push({ field: 'vacancyRate', message: 'Vacancy rate cannot be negative' });
  }
  if (inputs.vacancyRate > 100) {
    errors.push({ field: 'vacancyRate', message: 'Vacancy rate cannot exceed 100%' });
  }

  // Property Management Fee Validation
  if (inputs.propertyManagementFee < 0) {
    errors.push({ field: 'propertyManagementFee', message: 'Property management fee cannot be negative' });
  }
  if (inputs.propertyManagementFee > 100) {
    errors.push({ field: 'propertyManagementFee', message: 'Property management fee cannot exceed 100%' });
  }

  return errors;
}

export function validateMortgageEquityBusinessRules(inputs: MortgageEquityInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // High LTV Ratio Warning
  const ltvRatio = calculateLoanToValueRatio(inputs.loanBalance, inputs.propertyValue);
  if (ltvRatio > 90) {
    warnings.push({ field: 'loanBalance', message: 'High loan-to-value ratio may increase financial risk' });
  } else if (ltvRatio > 80) {
    warnings.push({ field: 'loanBalance', message: 'Loan-to-value ratio above 80% may limit refinance options' });
  }

  // Low Equity Warning
  const equityPercentage = calculateEquityPercentage(inputs.propertyValue, inputs.loanBalance);
  if (equityPercentage < 10) {
    warnings.push({ field: 'loanBalance', message: 'Low equity position may require PMI and limit options' });
  }

  // Negative Cash Flow Warning
  const monthlyIncome = inputs.rentalIncome;
  const monthlyExpenses = inputs.monthlyPayment +
                         (inputs.propertyTaxes / 12) +
                         (inputs.homeownersInsurance / 12) +
                         inputs.hoaFees +
                         inputs.maintenanceCosts +
                         (inputs.rentalIncome * inputs.vacancyRate / 100) +
                         (inputs.rentalIncome * inputs.propertyManagementFee / 100);

  if (monthlyIncome < monthlyExpenses) {
    warnings.push({ field: 'rentalIncome', message: 'Negative cash flow may impact investment viability' });
  }

  // High Vacancy Rate Warning
  if (inputs.vacancyRate > 10) {
    warnings.push({ field: 'vacancyRate', message: 'High vacancy rate may reduce rental income stability' });
  }

  // High Maintenance Costs Warning
  const maintenanceRatio = inputs.maintenanceCosts / inputs.propertyValue;
  if (maintenanceRatio > 0.02) { // More than 2% of property value annually
    warnings.push({ field: 'maintenanceCosts', message: 'High maintenance costs may reduce profitability' });
  }

  // Low Appreciation Rate Warning
  if (inputs.propertyAppreciationRate < 2) {
    warnings.push({ field: 'propertyAppreciationRate', message: 'Low appreciation rate may slow equity growth' });
  }

  // Long Analysis Period Warning
  if (inputs.analysisPeriod > 20) {
    warnings.push({ field: 'analysisPeriod', message: 'Long analysis periods increase uncertainty in projections' });
  }

  return warnings;
}

// Helper functions for validation
function calculateLoanToValueRatio(loanBalance: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanBalance / propertyValue) * 100;
}

function calculateEquityPercentage(propertyValue: number, loanBalance: number): number {
  if (propertyValue <= 0) return 0;
  return ((propertyValue - loanBalance) / propertyValue) * 100;
}