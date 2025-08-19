import { QuickValidationResult } from '../../types/QuickValidationResult';
import { MortgageVsRentInputs } from './formulas';

export function quickValidateCurrentRent(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Current rent must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 100) {
    return {
      isValid: false,
      message: 'Current rent should be at least $100',
      severity: 'warning'
    };
  }
  
  if (value > 10000) {
    return {
      isValid: false,
      message: 'Current rent should not exceed $10,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateRentIncreaseRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Rent increase rate is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Rent increase rate cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 20) {
    return {
      isValid: false,
      message: 'Rent increase rate should not exceed 20%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateHomePrice(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Home price must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 50000) {
    return {
      isValid: false,
      message: 'Home price should be at least $50,000',
      severity: 'warning'
    };
  }
  
  if (value > 5000000) {
    return {
      isValid: false,
      message: 'Home price should not exceed $5,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateDownPayment(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Down payment is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Down payment cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 1000000) {
    return {
      isValid: false,
      message: 'Down payment should not exceed $1,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateInterestRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Interest rate must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 0.1) {
    return {
      isValid: false,
      message: 'Interest rate should be at least 0.1%',
      severity: 'warning'
    };
  }
  
  if (value > 20) {
    return {
      isValid: false,
      message: 'Interest rate should not exceed 20%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLoanTerm(value: string): QuickValidationResult {
  if (!value) {
    return {
      isValid: false,
      message: 'Loan term is required',
      severity: 'error'
    };
  }
  
  const validTerms = ['15', '20', '30'];
  if (!validTerms.includes(value)) {
    return {
      isValid: false,
      message: 'Loan term must be 15, 20, or 30 years',
      severity: 'error'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePropertyTaxRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Property tax rate is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Property tax rate cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 5) {
    return {
      isValid: false,
      message: 'Property tax rate should not exceed 5%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateHomeownersInsurance(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Homeowners insurance is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Homeowners insurance cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 10000) {
    return {
      isValid: false,
      message: 'Homeowners insurance should not exceed $10,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePmiRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'PMI rate cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 2) {
    return {
      isValid: false,
      message: 'PMI rate should not exceed 2%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateMaintenanceCost(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Maintenance cost is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Maintenance cost cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 50000) {
    return {
      isValid: false,
      message: 'Maintenance cost should not exceed $50,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateUtilities(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Utilities cost is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Utilities cost cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 2000) {
    return {
      isValid: false,
      message: 'Utilities cost should not exceed $2,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateUtilitiesHome(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Home utilities cost is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Home utilities cost cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 2000) {
    return {
      isValid: false,
      message: 'Home utilities cost should not exceed $2,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateClosingCosts(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Closing costs are required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Closing costs cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 50000) {
    return {
      isValid: false,
      message: 'Closing costs should not exceed $50,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateHomeAppreciation(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Home appreciation rate is required',
      severity: 'error'
    };
  }
  
  if (value < -10) {
    return {
      isValid: false,
      message: 'Home appreciation rate should not be less than -10%',
      severity: 'warning'
    };
  }
  
  if (value > 20) {
    return {
      isValid: false,
      message: 'Home appreciation rate should not exceed 20%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateInvestmentReturn(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      message: 'Investment return rate is required',
      severity: 'error'
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Investment return rate cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 20) {
    return {
      isValid: false,
      message: 'Investment return rate should not exceed 20%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAnalysisPeriod(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Analysis period must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1) {
    return {
      isValid: false,
      message: 'Analysis period should be at least 1 year',
      severity: 'warning'
    };
  }
  
  if (value > 30) {
    return {
      isValid: false,
      message: 'Analysis period should not exceed 30 years',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateTaxRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Tax rate cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 50) {
    return {
      isValid: false,
      message: 'Tax rate should not exceed 50%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateRentersInsurance(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Renters insurance cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 500) {
    return {
      isValid: false,
      message: 'Renters insurance should not exceed $500',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateHoaFees(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'HOA fees cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 2000) {
    return {
      isValid: false,
      message: 'HOA fees should not exceed $2,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAllInputs(inputs: Partial<MortgageVsRentInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  if (inputs.currentRent !== undefined) {
    results.push(quickValidateCurrentRent(inputs.currentRent));
  }
  
  if (inputs.rentIncreaseRate !== undefined) {
    results.push(quickValidateRentIncreaseRate(inputs.rentIncreaseRate));
  }
  
  if (inputs.homePrice !== undefined) {
    results.push(quickValidateHomePrice(inputs.homePrice));
  }
  
  if (inputs.downPayment !== undefined) {
    results.push(quickValidateDownPayment(inputs.downPayment));
  }
  
  if (inputs.interestRate !== undefined) {
    results.push(quickValidateInterestRate(inputs.interestRate));
  }
  
  if (inputs.loanTerm !== undefined) {
    results.push(quickValidateLoanTerm(inputs.loanTerm));
  }
  
  if (inputs.propertyTaxRate !== undefined) {
    results.push(quickValidatePropertyTaxRate(inputs.propertyTaxRate));
  }
  
  if (inputs.homeownersInsurance !== undefined) {
    results.push(quickValidateHomeownersInsurance(inputs.homeownersInsurance));
  }
  
  if (inputs.pmiRate !== undefined) {
    results.push(quickValidatePmiRate(inputs.pmiRate));
  }
  
  if (inputs.maintenanceCost !== undefined) {
    results.push(quickValidateMaintenanceCost(inputs.maintenanceCost));
  }
  
  if (inputs.utilities !== undefined) {
    results.push(quickValidateUtilities(inputs.utilities));
  }
  
  if (inputs.utilitiesHome !== undefined) {
    results.push(quickValidateUtilitiesHome(inputs.utilitiesHome));
  }
  
  if (inputs.closingCosts !== undefined) {
    results.push(quickValidateClosingCosts(inputs.closingCosts));
  }
  
  if (inputs.homeAppreciation !== undefined) {
    results.push(quickValidateHomeAppreciation(inputs.homeAppreciation));
  }
  
  if (inputs.investmentReturn !== undefined) {
    results.push(quickValidateInvestmentReturn(inputs.investmentReturn));
  }
  
  if (inputs.analysisPeriod !== undefined) {
    results.push(quickValidateAnalysisPeriod(inputs.analysisPeriod));
  }
  
  if (inputs.taxRate !== undefined) {
    results.push(quickValidateTaxRate(inputs.taxRate));
  }
  
  if (inputs.rentersInsurance !== undefined) {
    results.push(quickValidateRentersInsurance(inputs.rentersInsurance));
  }
  
  if (inputs.hoaFees !== undefined) {
    results.push(quickValidateHoaFees(inputs.hoaFees));
  }
  
  return results;
}