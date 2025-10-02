import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSelfStorageROIInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'facilitySize', 'unitCount', 'averageUnitSize', 'purchasePrice', 'downPayment',
    'interestRate', 'loanTerm', 'averageRentPerSqFt', 'occupancyRate', 'annualExpenses',
    'propertyTaxes', 'insurance', 'utilities', 'maintenance', 'managementFee',
    'appreciationRate', 'analysisPeriod', 'rentIncreaseRate', 'expenseIncreaseRate', 'vacancyLoss'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Type validation
  const numericFields = [
    'facilitySize', 'unitCount', 'averageUnitSize', 'purchasePrice', 'downPayment',
    'interestRate', 'loanTerm', 'averageRentPerSqFt', 'occupancyRate', 'annualExpenses',
    'propertyTaxes', 'insurance', 'utilities', 'maintenance', 'managementFee',
    'appreciationRate', 'analysisPeriod', 'rentIncreaseRate', 'expenseIncreaseRate', 'vacancyLoss'
  ];

  for (const field of numericFields) {
    const value = inputs[field];
    if (typeof value !== 'number' || isNaN(value)) {
      errors.push(`${field} must be a valid number`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Extract values for validation
  const facilitySize = inputs.facilitySize as number;
  const unitCount = inputs.unitCount as number;
  const averageUnitSize = inputs.averageUnitSize as number;
  const purchasePrice = inputs.purchasePrice as number;
  const downPayment = inputs.downPayment as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const averageRentPerSqFt = inputs.averageRentPerSqFt as number;
  const occupancyRate = inputs.occupancyRate as number;
  const annualExpenses = inputs.annualExpenses as number;
  const propertyTaxes = inputs.propertyTaxes as number;
  const insurance = inputs.insurance as number;
  const utilities = inputs.utilities as number;
  const maintenance = inputs.maintenance as number;
  const managementFee = inputs.managementFee as number;
  const appreciationRate = inputs.appreciationRate as number;
  const analysisPeriod = inputs.analysisPeriod as number;
  const rentIncreaseRate = inputs.rentIncreaseRate as number;
  const expenseIncreaseRate = inputs.expenseIncreaseRate as number;
  const vacancyLoss = inputs.vacancyLoss as number;

  // Range validation
  if (facilitySize < 1000 || facilitySize > 1000000) {
    errors.push('Facility size must be between 1,000 and 1,000,000 sq ft');
  }

  if (unitCount < 10 || unitCount > 10000) {
    errors.push('Number of units must be between 10 and 10,000');
  }

  if (averageUnitSize < 25 || averageUnitSize > 1000) {
    errors.push('Average unit size must be between 25 and 1,000 sq ft');
  }

  if (purchasePrice < 100000 || purchasePrice > 100000000) {
    errors.push('Purchase price must be between $100,000 and $100,000,000');
  }

  if (downPayment < 20000 || downPayment > 20000000) {
    errors.push('Down payment must be between $20,000 and $20,000,000');
  }

  if (interestRate < 1 || interestRate > 15) {
    errors.push('Interest rate must be between 1% and 15%');
  }

  if (loanTerm < 5 || loanTerm > 30) {
    errors.push('Loan term must be between 5 and 30 years');
  }

  if (averageRentPerSqFt < 0.5 || averageRentPerSqFt > 5) {
    errors.push('Average rent per sq ft must be between $0.50 and $5.00');
  }

  if (occupancyRate < 50 || occupancyRate > 100) {
    errors.push('Occupancy rate must be between 50% and 100%');
  }

  if (annualExpenses < 10000 || annualExpenses > 5000000) {
    errors.push('Annual operating expenses must be between $10,000 and $5,000,000');
  }

  if (propertyTaxes < 1000 || propertyTaxes > 500000) {
    errors.push('Annual property taxes must be between $1,000 and $500,000');
  }

  if (insurance < 1000 || insurance > 100000) {
    errors.push('Annual insurance must be between $1,000 and $100,000');
  }

  if (utilities < 1000 || utilities > 200000) {
    errors.push('Annual utilities must be between $1,000 and $200,000');
  }

  if (maintenance < 1000 || maintenance > 300000) {
    errors.push('Annual maintenance must be between $1,000 and $300,000');
  }

  if (managementFee < 0 || managementFee > 15) {
    errors.push('Management fee must be between 0% and 15%');
  }

  if (appreciationRate < -5 || appreciationRate > 10) {
    errors.push('Annual appreciation rate must be between -5% and 10%');
  }

  if (analysisPeriod < 1 || analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  if (rentIncreaseRate < 0 || rentIncreaseRate > 10) {
    errors.push('Annual rent increase rate must be between 0% and 10%');
  }

  if (expenseIncreaseRate < 0 || expenseIncreaseRate > 10) {
    errors.push('Annual expense increase rate must be between 0% and 10%');
  }

  if (vacancyLoss < 0 || vacancyLoss > 20) {
    errors.push('Vacancy loss rate must be between 0% and 20%');
  }

  // Logical validation
  if (downPayment >= purchasePrice) {
    errors.push('Down payment cannot be greater than or equal to purchase price');
  }

  const calculatedTotalSize = unitCount * averageUnitSize;
  const sizeDifference = Math.abs(calculatedTotalSize - facilitySize) / facilitySize;
  if (sizeDifference > 0.1) {
    warnings.push(`Unit count × average unit size (${calculatedTotalSize.toLocaleString()} sq ft) differs significantly from facility size (${facilitySize.toLocaleString()} sq ft). Please verify these values.`);
  }

  const totalExpenses = annualExpenses + propertyTaxes + insurance + utilities + maintenance;
  const potentialIncome = facilitySize * averageRentPerSqFt * 12 * (occupancyRate / 100);
  if (totalExpenses > potentialIncome * 0.8) {
    warnings.push('Total operating expenses are very high relative to potential income. This may indicate low profitability.');
  }

  const loanAmount = purchasePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const annualDebtService = monthlyPayment * 12;
  const netOperatingIncome = potentialIncome - totalExpenses;
  
  if (annualDebtService > netOperatingIncome) {
    warnings.push('Annual debt service exceeds net operating income. This will result in negative cash flow.');
  }

  if (occupancyRate < 70) {
    warnings.push('Low occupancy rate may indicate market challenges or management issues.');
  }

  if (averageRentPerSqFt < 1.0) {
    warnings.push('Low rent per square foot may indicate poor market conditions or facility quality issues.');
  }

  if (managementFee > 10) {
    warnings.push('High management fee may significantly impact profitability.');
  }

  if (vacancyLoss > 10) {
    warnings.push('High vacancy loss rate may indicate management or market issues.');
  }

  if (appreciationRate < 0) {
    warnings.push('Negative appreciation rate may indicate declining market conditions.');
  }

  // Business logic validation
  const effectiveOccupancyRate = occupancyRate / 100 * (1 - vacancyLoss / 100);
  if (effectiveOccupancyRate < 0.4) {
    warnings.push('Very low effective occupancy rate may make the investment unprofitable.');
  }

  const breakEvenOccupancy = ((totalExpenses + annualDebtService) / (facilitySize * averageRentPerSqFt * 12)) * 100;
  if (breakEvenOccupancy > 95) {
    warnings.push('Break-even occupancy rate is very high, indicating high risk.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

function calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}
