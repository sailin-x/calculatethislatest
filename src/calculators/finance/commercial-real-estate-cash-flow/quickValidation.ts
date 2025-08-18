import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateTotalUnits(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Total units is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Total units must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Total units must be at least 1' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Total units cannot exceed 10,000' };
  }
  
  return { isValid: true };
}

export function validateOccupiedUnits(value: any, totalUnits?: number): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Occupied units is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Occupied units must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Occupied units cannot be negative' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Occupied units cannot exceed 10,000' };
  }
  
  if (totalUnits && numValue > totalUnits) {
    return { isValid: false, message: 'Occupied units cannot exceed total units' };
  }
  
  return { isValid: true };
}

export function validateAverageRent(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Average rent is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Average rent must be a valid number' };
  }
  
  if (numValue < 100) {
    return { isValid: false, message: 'Average rent must be at least $100 per month' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'Average rent cannot exceed $50,000 per month' };
  }
  
  return { isValid: true };
}

export function validateOtherIncome(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Other income is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Other income must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Other income cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Other income cannot exceed $100,000 per month' };
  }
  
  return { isValid: true };
}

export function validatePropertyTax(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property tax is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property tax must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Property tax cannot be negative' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Property tax cannot exceed $1,000,000 per year' };
  }
  
  return { isValid: true };
}

export function validateInsurance(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Insurance is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Insurance must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Insurance cannot be negative' };
  }
  
  if (numValue > 500000) {
    return { isValid: false, message: 'Insurance cannot exceed $500,000 per year' };
  }
  
  return { isValid: true };
}

export function validateUtilities(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Utilities is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Utilities must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Utilities cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Utilities cannot exceed $100,000 per month' };
  }
  
  return { isValid: true };
}

export function validateMaintenance(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Maintenance is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Maintenance must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Maintenance cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Maintenance cannot exceed $100,000 per month' };
  }
  
  return { isValid: true };
}

export function validatePropertyManagement(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property management is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property management must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Property management cannot be negative' };
  }
  
  if (numValue > 20) {
    return { isValid: false, message: 'Property management cannot exceed 20%' };
  }
  
  return { isValid: true };
}

export function validateHOAFees(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'HOA fees is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'HOA fees must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'HOA fees cannot be negative' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'HOA fees cannot exceed $50,000 per month' };
  }
  
  return { isValid: true };
}

export function validateOtherExpenses(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Other expenses is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Other expenses must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Other expenses cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Other expenses cannot exceed $100,000 per month' };
  }
  
  return { isValid: true };
}

export function validatePurchasePrice(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Purchase price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Purchase price must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Purchase price must be at least $100,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Purchase price cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateDownPayment(value: any, purchasePrice?: number): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Down payment is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Down payment must be a valid number' };
  }
  
  if (numValue < 20000) {
    return { isValid: false, message: 'Down payment must be at least $20,000' };
  }
  
  if (numValue > 20000000) {
    return { isValid: false, message: 'Down payment cannot exceed $20,000,000' };
  }
  
  if (purchasePrice && numValue > purchasePrice) {
    return { isValid: false, message: 'Down payment cannot exceed purchase price' };
  }
  
  return { isValid: true };
}

export function validateLoanAmount(value: any, purchasePrice?: number, downPayment?: number): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan amount is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan amount must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Loan amount cannot be negative' };
  }
  
  if (numValue > 80000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $80,000,000' };
  }
  
  if (purchasePrice && numValue > purchasePrice) {
    return { isValid: false, message: 'Loan amount cannot exceed purchase price' };
  }
  
  if (purchasePrice && downPayment && numValue + downPayment !== purchasePrice) {
    return { isValid: false, message: 'Loan amount plus down payment should equal purchase price' };
  }
  
  return { isValid: true };
}

export function validateInterestRate(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Interest rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  
  if (numValue > 15) {
    return { isValid: false, message: 'Interest rate cannot exceed 15%' };
  }
  
  return { isValid: true };
}

export function validateLoanTerm(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan term is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  
  if (numValue < 5) {
    return { isValid: false, message: 'Loan term must be at least 5 years' };
  }
  
  if (numValue > 30) {
    return { isValid: false, message: 'Loan term cannot exceed 30 years' };
  }
  
  return { isValid: true };
}

export function validateClosingCosts(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Closing costs is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Closing costs must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Closing costs cannot exceed $1,000,000' };
  }
  
  return { isValid: true };
}

export function validateRenovationCosts(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Renovation costs is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Renovation costs must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Renovation costs cannot be negative' };
  }
  
  if (numValue > 5000000) {
    return { isValid: false, message: 'Renovation costs cannot exceed $5,000,000' };
  }
  
  return { isValid: true };
}

export function validateAppreciationRate(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Appreciation rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Appreciation rate must be a valid number' };
  }
  
  if (numValue < -10) {
    return { isValid: false, message: 'Appreciation rate cannot be less than -10%' };
  }
  
  if (numValue > 15) {
    return { isValid: false, message: 'Appreciation rate cannot exceed 15%' };
  }
  
  return { isValid: true };
}

export function validateInflationRate(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Inflation rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Inflation rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Inflation rate cannot be negative' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Inflation rate cannot exceed 10%' };
  }
  
  return { isValid: true };
}

export function validateTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Tax rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Tax rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Tax rate cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Tax rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

export function validateDepreciationPeriod(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Depreciation period is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Depreciation period must be a valid number' };
  }
  
  if (numValue < 15) {
    return { isValid: false, message: 'Depreciation period must be at least 15 years' };
  }
  
  if (numValue > 39) {
    return { isValid: false, message: 'Depreciation period cannot exceed 39 years' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use', 'apartment', 'self-storage'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllCashFlowInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const totalUnitsValidation = validateTotalUnits(inputs.totalUnits);
  if (!totalUnitsValidation.isValid) {
    errors.push(totalUnitsValidation.message!);
  }
  
  const occupiedUnitsValidation = validateOccupiedUnits(inputs.occupiedUnits, inputs.totalUnits as number);
  if (!occupiedUnitsValidation.isValid) {
    errors.push(occupiedUnitsValidation.message!);
  }
  
  const averageRentValidation = validateAverageRent(inputs.averageRent);
  if (!averageRentValidation.isValid) {
    errors.push(averageRentValidation.message!);
  }
  
  const otherIncomeValidation = validateOtherIncome(inputs.otherIncome);
  if (!otherIncomeValidation.isValid) {
    errors.push(otherIncomeValidation.message!);
  }
  
  const propertyTaxValidation = validatePropertyTax(inputs.propertyTax);
  if (!propertyTaxValidation.isValid) {
    errors.push(propertyTaxValidation.message!);
  }
  
  const insuranceValidation = validateInsurance(inputs.insurance);
  if (!insuranceValidation.isValid) {
    errors.push(insuranceValidation.message!);
  }
  
  const utilitiesValidation = validateUtilities(inputs.utilities);
  if (!utilitiesValidation.isValid) {
    errors.push(utilitiesValidation.message!);
  }
  
  const maintenanceValidation = validateMaintenance(inputs.maintenance);
  if (!maintenanceValidation.isValid) {
    errors.push(maintenanceValidation.message!);
  }
  
  const propertyManagementValidation = validatePropertyManagement(inputs.propertyManagement);
  if (!propertyManagementValidation.isValid) {
    errors.push(propertyManagementValidation.message!);
  }
  
  const hoaFeesValidation = validateHOAFees(inputs.hoaFees);
  if (!hoaFeesValidation.isValid) {
    errors.push(hoaFeesValidation.message!);
  }
  
  const otherExpensesValidation = validateOtherExpenses(inputs.otherExpenses);
  if (!otherExpensesValidation.isValid) {
    errors.push(otherExpensesValidation.message!);
  }
  
  const purchasePriceValidation = validatePurchasePrice(inputs.purchasePrice);
  if (!purchasePriceValidation.isValid) {
    errors.push(purchasePriceValidation.message!);
  }
  
  const downPaymentValidation = validateDownPayment(inputs.downPayment, inputs.purchasePrice as number);
  if (!downPaymentValidation.isValid) {
    errors.push(downPaymentValidation.message!);
  }
  
  const loanAmountValidation = validateLoanAmount(inputs.loanAmount, inputs.purchasePrice as number, inputs.downPayment as number);
  if (!loanAmountValidation.isValid) {
    errors.push(loanAmountValidation.message!);
  }
  
  const interestRateValidation = validateInterestRate(inputs.interestRate);
  if (!interestRateValidation.isValid) {
    errors.push(interestRateValidation.message!);
  }
  
  const loanTermValidation = validateLoanTerm(inputs.loanTerm);
  if (!loanTermValidation.isValid) {
    errors.push(loanTermValidation.message!);
  }
  
  const closingCostsValidation = validateClosingCosts(inputs.closingCosts);
  if (!closingCostsValidation.isValid) {
    errors.push(closingCostsValidation.message!);
  }
  
  const renovationCostsValidation = validateRenovationCosts(inputs.renovationCosts);
  if (!renovationCostsValidation.isValid) {
    errors.push(renovationCostsValidation.message!);
  }
  
  const appreciationRateValidation = validateAppreciationRate(inputs.appreciationRate);
  if (!appreciationRateValidation.isValid) {
    errors.push(appreciationRateValidation.message!);
  }
  
  const inflationRateValidation = validateInflationRate(inputs.inflationRate);
  if (!inflationRateValidation.isValid) {
    errors.push(inflationRateValidation.message!);
  }
  
  const taxRateValidation = validateTaxRate(inputs.taxRate);
  if (!taxRateValidation.isValid) {
    errors.push(taxRateValidation.message!);
  }
  
  const depreciationPeriodValidation = validateDepreciationPeriod(inputs.depreciationPeriod);
  if (!depreciationPeriodValidation.isValid) {
    errors.push(depreciationPeriodValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
