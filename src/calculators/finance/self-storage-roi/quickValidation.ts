import { CalculatorInputs } from '../../../types/calculator';

export function validateFacilitySize(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Facility size is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Facility size must be a valid number';
  }
  if (value < 1000) {
    return 'Facility size must be at least 1,000 sq ft';
  }
  if (value > 1000000) {
    return 'Facility size cannot exceed 1,000,000 sq ft';
  }
  return null;
}

export function validateUnitCount(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Number of units is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Number of units must be a valid number';
  }
  if (value < 10) {
    return 'Number of units must be at least 10';
  }
  if (value > 10000) {
    return 'Number of units cannot exceed 10,000';
  }
  return null;
}

export function validateAverageUnitSize(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Average unit size is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Average unit size must be a valid number';
  }
  if (value < 25) {
    return 'Average unit size must be at least 25 sq ft';
  }
  if (value > 1000) {
    return 'Average unit size cannot exceed 1,000 sq ft';
  }
  return null;
}

export function validatePurchasePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Purchase price is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Purchase price must be a valid number';
  }
  if (value < 100000) {
    return 'Purchase price must be at least $100,000';
  }
  if (value > 100000000) {
    return 'Purchase price cannot exceed $100,000,000';
  }
  return null;
}

export function validateDownPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Down payment is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Down payment must be a valid number';
  }
  if (value < 20000) {
    return 'Down payment must be at least $20,000';
  }
  if (value > 20000000) {
    return 'Down payment cannot exceed $20,000,000';
  }
  return null;
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Interest rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Interest rate must be a valid number';
  }
  if (value < 1) {
    return 'Interest rate must be at least 1%';
  }
  if (value > 15) {
    return 'Interest rate cannot exceed 15%';
  }
  return null;
}

export function validateLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Loan term is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Loan term must be a valid number';
  }
  if (value < 5) {
    return 'Loan term must be at least 5 years';
  }
  if (value > 30) {
    return 'Loan term cannot exceed 30 years';
  }
  return null;
}

export function validateAverageRentPerSqFt(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Average rent per sq ft is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Average rent per sq ft must be a valid number';
  }
  if (value < 0.5) {
    return 'Average rent per sq ft must be at least $0.50';
  }
  if (value > 5) {
    return 'Average rent per sq ft cannot exceed $5.00';
  }
  return null;
}

export function validateOccupancyRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Occupancy rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Occupancy rate must be a valid number';
  }
  if (value < 50) {
    return 'Occupancy rate must be at least 50%';
  }
  if (value > 100) {
    return 'Occupancy rate cannot exceed 100%';
  }
  return null;
}

export function validateAnnualExpenses(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual operating expenses is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual operating expenses must be a valid number';
  }
  if (value < 10000) {
    return 'Annual operating expenses must be at least $10,000';
  }
  if (value > 5000000) {
    return 'Annual operating expenses cannot exceed $5,000,000';
  }
  return null;
}

export function validatePropertyTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual property taxes is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual property taxes must be a valid number';
  }
  if (value < 1000) {
    return 'Annual property taxes must be at least $1,000';
  }
  if (value > 500000) {
    return 'Annual property taxes cannot exceed $500,000';
  }
  return null;
}

export function validateInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual insurance is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual insurance must be a valid number';
  }
  if (value < 1000) {
    return 'Annual insurance must be at least $1,000';
  }
  if (value > 100000) {
    return 'Annual insurance cannot exceed $100,000';
  }
  return null;
}

export function validateUtilities(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual utilities is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual utilities must be a valid number';
  }
  if (value < 1000) {
    return 'Annual utilities must be at least $1,000';
  }
  if (value > 200000) {
    return 'Annual utilities cannot exceed $200,000';
  }
  return null;
}

export function validateMaintenance(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual maintenance is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual maintenance must be a valid number';
  }
  if (value < 1000) {
    return 'Annual maintenance must be at least $1,000';
  }
  if (value > 300000) {
    return 'Annual maintenance cannot exceed $300,000';
  }
  return null;
}

export function validateManagementFee(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Management fee is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Management fee must be a valid number';
  }
  if (value < 0) {
    return 'Management fee cannot be negative';
  }
  if (value > 15) {
    return 'Management fee cannot exceed 15%';
  }
  return null;
}

export function validateAppreciationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual appreciation rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual appreciation rate must be a valid number';
  }
  if (value < -5) {
    return 'Annual appreciation rate cannot be less than -5%';
  }
  if (value > 10) {
    return 'Annual appreciation rate cannot exceed 10%';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Analysis period is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Analysis period must be a valid number';
  }
  if (value < 1) {
    return 'Analysis period must be at least 1 year';
  }
  if (value > 30) {
    return 'Analysis period cannot exceed 30 years';
  }
  return null;
}

export function validateRentIncreaseRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual rent increase rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual rent increase rate must be a valid number';
  }
  if (value < 0) {
    return 'Annual rent increase rate cannot be negative';
  }
  if (value > 10) {
    return 'Annual rent increase rate cannot exceed 10%';
  }
  return null;
}

export function validateExpenseIncreaseRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Annual expense increase rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Annual expense increase rate must be a valid number';
  }
  if (value < 0) {
    return 'Annual expense increase rate cannot be negative';
  }
  if (value > 10) {
    return 'Annual expense increase rate cannot exceed 10%';
  }
  return null;
}

export function validateVacancyLoss(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Vacancy loss rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Vacancy loss rate must be a valid number';
  }
  if (value < 0) {
    return 'Vacancy loss rate cannot be negative';
  }
  if (value > 20) {
    return 'Vacancy loss rate cannot exceed 20%';
  }
  return null;
}

export function validateAllSelfStorageROIInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate each field
  const validations = [
    { field: 'facilitySize', validator: validateFacilitySize },
    { field: 'unitCount', validator: validateUnitCount },
    { field: 'averageUnitSize', validator: validateAverageUnitSize },
    { field: 'purchasePrice', validator: validatePurchasePrice },
    { field: 'downPayment', validator: validateDownPayment },
    { field: 'interestRate', validator: validateInterestRate },
    { field: 'loanTerm', validator: validateLoanTerm },
    { field: 'averageRentPerSqFt', validator: validateAverageRentPerSqFt },
    { field: 'occupancyRate', validator: validateOccupancyRate },
    { field: 'annualExpenses', validator: validateAnnualExpenses },
    { field: 'propertyTaxes', validator: validatePropertyTaxes },
    { field: 'insurance', validator: validateInsurance },
    { field: 'utilities', validator: validateUtilities },
    { field: 'maintenance', validator: validateMaintenance },
    { field: 'managementFee', validator: validateManagementFee },
    { field: 'appreciationRate', validator: validateAppreciationRate },
    { field: 'analysisPeriod', validator: validateAnalysisPeriod },
    { field: 'rentIncreaseRate', validator: validateRentIncreaseRate },
    { field: 'expenseIncreaseRate', validator: validateExpenseIncreaseRate },
    { field: 'vacancyLoss', validator: validateVacancyLoss }
  ];

  for (const validation of validations) {
    const error = validation.validator(inputs[validation.field] as number, inputs);
    if (error) {
      errors.push(error);
    }
  }

  // Cross-field validations
  if (inputs.downPayment && inputs.purchasePrice && (inputs.downPayment as number) >= (inputs.purchasePrice as number)) {
    errors.push('Down payment cannot be greater than or equal to purchase price');
  }

  // Warnings for business logic
  if (inputs.occupancyRate && (inputs.occupancyRate as number) < 70) {
    warnings.push('Low occupancy rate may indicate market challenges');
  }

  if (inputs.averageRentPerSqFt && (inputs.averageRentPerSqFt as number) < 1.0) {
    warnings.push('Low rent per square foot may indicate poor market conditions');
  }

  if (inputs.managementFee && (inputs.managementFee as number) > 10) {
    warnings.push('High management fee may significantly impact profitability');
  }

  if (inputs.vacancyLoss && (inputs.vacancyLoss as number) > 10) {
    warnings.push('High vacancy loss rate may indicate management issues');
  }

  if (inputs.appreciationRate && (inputs.appreciationRate as number) < 0) {
    warnings.push('Negative appreciation rate may indicate declining market conditions');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
