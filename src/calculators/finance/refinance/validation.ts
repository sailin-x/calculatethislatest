import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateRefinanceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.push('Current loan balance is required and must be greater than 0');
  }

  if (!inputs.currentInterestRate || inputs.currentInterestRate < 0) {
    errors.push('Current interest rate is required and must be non-negative');
  }

  if (!inputs.currentMonthlyPayment || inputs.currentMonthlyPayment <= 0) {
    errors.push('Current monthly payment is required and must be greater than 0');
  }

  if (!inputs.currentLoanTerm || inputs.currentLoanTerm <= 0) {
    errors.push('Current loan term is required and must be greater than 0');
  }

  if (!inputs.newLoanAmount || inputs.newLoanAmount <= 0) {
    errors.push('New loan amount is required and must be greater than 0');
  }

  if (!inputs.newInterestRate || inputs.newInterestRate < 0) {
    errors.push('New interest rate is required and must be non-negative');
  }

  if (!inputs.newLoanTerm || inputs.newLoanTerm <= 0) {
    errors.push('New loan term is required and must be greater than 0');
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value is required and must be greater than 0');
  }

  if (!inputs.closingCosts || inputs.closingCosts < 0) {
    errors.push('Closing costs are required and must be non-negative');
  }

  // Data type validation
  if (typeof inputs.currentLoanBalance !== 'number') {
    errors.push('Current loan balance must be a number');
  }

  if (typeof inputs.currentInterestRate !== 'number') {
    errors.push('Current interest rate must be a number');
  }

  if (typeof inputs.currentMonthlyPayment !== 'number') {
    errors.push('Current monthly payment must be a number');
  }

  if (typeof inputs.currentLoanTerm !== 'number') {
    errors.push('Current loan term must be a number');
  }

  if (typeof inputs.newLoanAmount !== 'number') {
    errors.push('New loan amount must be a number');
  }

  if (typeof inputs.newInterestRate !== 'number') {
    errors.push('New interest rate must be a number');
  }

  if (typeof inputs.newLoanTerm !== 'number') {
    errors.push('New loan term must be a number');
  }

  if (typeof inputs.propertyValue !== 'number') {
    errors.push('Property value must be a number');
  }

  if (typeof inputs.closingCosts !== 'number') {
    errors.push('Closing costs must be a number');
  }

  // Range validation
  if (inputs.currentInterestRate && (inputs.currentInterestRate < 0 || inputs.currentInterestRate > 20)) {
    errors.push('Current interest rate must be between 0% and 20%');
  }

  if (inputs.newInterestRate && (inputs.newInterestRate < 0 || inputs.newInterestRate > 20)) {
    errors.push('New interest rate must be between 0% and 20%');
  }

  if (inputs.currentLoanTerm && (inputs.currentLoanTerm < 1 || inputs.currentLoanTerm > 50)) {
    errors.push('Current loan term must be between 1 and 50 years');
  }

  if (inputs.newLoanTerm && (inputs.newLoanTerm < 1 || inputs.newLoanTerm > 50)) {
    errors.push('New loan term must be between 1 and 50 years');
  }

  if (inputs.currentLoanBalance && (inputs.currentLoanBalance < 0 || inputs.currentLoanBalance > 10000000)) {
    errors.push('Current loan balance must be between $0 and $10,000,000');
  }

  if (inputs.newLoanAmount && (inputs.newLoanAmount < 0 || inputs.newLoanAmount > 10000000)) {
    errors.push('New loan amount must be between $0 and $10,000,000');
  }

  if (inputs.propertyValue && (inputs.propertyValue < 0 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $0 and $10,000,000');
  }

  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 50000)) {
    errors.push('Closing costs must be between $0 and $50,000');
  }

  if (inputs.currentPMI && (inputs.currentPMI < 0 || inputs.currentPMI > 1000)) {
    errors.push('Current PMI must be between $0 and $1,000');
  }

  if (inputs.newPMI && (inputs.newPMI < 0 || inputs.newPMI > 1000)) {
    errors.push('New PMI must be between $0 and $1,000');
  }

  if (inputs.currentPropertyTaxes && (inputs.currentPropertyTaxes < 0 || inputs.currentPropertyTaxes > 5000)) {
    errors.push('Current property taxes must be between $0 and $5,000');
  }

  if (inputs.newPropertyTaxes && (inputs.newPropertyTaxes < 0 || inputs.newPropertyTaxes > 5000)) {
    errors.push('New property taxes must be between $0 and $5,000');
  }

  if (inputs.currentInsurance && (inputs.currentInsurance < 0 || inputs.currentInsurance > 2000)) {
    errors.push('Current insurance must be between $0 and $2,000');
  }

  if (inputs.newInsurance && (inputs.newInsurance < 0 || inputs.newInsurance > 2000)) {
    errors.push('New insurance must be between $0 and $2,000');
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.investmentReturn && (inputs.investmentReturn < 0 || inputs.investmentReturn > 20)) {
    errors.push('Investment return must be between 0% and 20%');
  }

  if (inputs.plannedOwnershipYears && (inputs.plannedOwnershipYears < 1 || inputs.plannedOwnershipYears > 50)) {
    errors.push('Planned ownership years must be between 1 and 50');
  }

  if (inputs.monthlyIncome && (inputs.monthlyIncome < 0 || inputs.monthlyIncome > 1000000)) {
    errors.push('Monthly income must be between $0 and $1,000,000');
  }

  if (inputs.monthlyDebts && (inputs.monthlyDebts < 0 || inputs.monthlyDebts > 100000)) {
    errors.push('Monthly debts must be between $0 and $100,000');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  if (inputs.cashOutAmount && (inputs.cashOutAmount < 0 || inputs.cashOutAmount > 1000000)) {
    errors.push('Cash out amount must be between $0 and $1,000,000');
  }

  // Logical validation
  if (inputs.currentLoanBalance && inputs.newLoanAmount && inputs.newLoanAmount < inputs.currentLoanBalance * 0.8) {
    warnings.push('New loan amount is significantly lower than current balance - consider if this is intentional');
  }

  if (inputs.currentLoanBalance && inputs.newLoanAmount && inputs.newLoanAmount > inputs.currentLoanBalance * 1.5) {
    warnings.push('New loan amount is significantly higher than current balance - verify cash-out amount');
  }

  if (inputs.currentInterestRate && inputs.newInterestRate && inputs.newInterestRate >= inputs.currentInterestRate) {
    warnings.push('New interest rate is not lower than current rate - refinancing may not be beneficial');
  }

  if (inputs.propertyValue && inputs.newLoanAmount && (inputs.newLoanAmount / inputs.propertyValue) > 0.97) {
    warnings.push('Loan-to-value ratio is very high - may affect approval and rates');
  }

  if (inputs.closingCosts && inputs.monthlyIncome && inputs.closingCosts > inputs.monthlyIncome * 2) {
    warnings.push('Closing costs are high relative to monthly income');
  }

  if (inputs.plannedOwnershipYears && inputs.closingCosts && inputs.monthlyIncome) {
    const monthlySavings = (inputs.currentMonthlyPayment || 0) - (inputs.newLoanAmount ? inputs.newLoanAmount * 0.005 : 0);
    const breakEvenMonths = monthlySavings > 0 ? inputs.closingCosts / monthlySavings : Infinity;
    if (inputs.plannedOwnershipYears * 12 < breakEvenMonths) {
      warnings.push('Planned ownership period may be shorter than break-even period');
    }
  }

  // Enum validation
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
  if (inputs.currentLoanType && !validLoanTypes.includes(inputs.currentLoanType)) {
    errors.push('Current loan type must be one of: conventional, fha, va, usda');
  }

  if (inputs.newLoanType && !validLoanTypes.includes(inputs.newLoanType)) {
    errors.push('New loan type must be one of: conventional, fha, va, usda');
  }

  const validOccupancyTypes = ['primary-residence', 'second-home', 'investment'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Occupancy type must be one of: primary-residence, second-home, investment');
  }

  const validRefinancePurposes = ['lower-rate', 'lower-payment', 'cash-out', 'shorter-term', 'remove-pmi', 'debt-consolidation'];
  if (inputs.refinancePurpose && !validRefinancePurposes.includes(inputs.refinancePurpose)) {
    errors.push('Refinance purpose must be one of: lower-rate, lower-payment, cash-out, shorter-term, remove-pmi, debt-consolidation');
  }

  const validMarketConditions = ['declining', 'stable', 'rising'];
  if (inputs.marketConditions && !validMarketConditions.includes(inputs.marketConditions)) {
    errors.push('Market conditions must be one of: declining, stable, rising');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
