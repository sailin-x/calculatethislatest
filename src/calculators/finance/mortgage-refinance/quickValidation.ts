import { QuickValidationResult } from '../../types/QuickValidationResult';
import { MortgageRefinanceInputs } from './formulas';

export function quickValidateCurrentLoanAmount(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Current loan amount must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1000) {
    return {
      isValid: false,
      message: 'Current loan amount should be at least $1,000',
      severity: 'warning'
    };
  }
  
  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Current loan amount should not exceed $10,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateCurrentInterestRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Current interest rate must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 0.1) {
    return {
      isValid: false,
      message: 'Current interest rate should be at least 0.1%',
      severity: 'warning'
    };
  }
  
  if (value > 20) {
    return {
      isValid: false,
      message: 'Current interest rate should not exceed 20%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateCurrentLoanTerm(value: string): QuickValidationResult {
  if (!value) {
    return {
      isValid: false,
      message: 'Current loan term is required',
      severity: 'error'
    };
  }
  
  const validTerms = ['10', '15', '20', '30'];
  if (!validTerms.includes(value)) {
    return {
      isValid: false,
      message: 'Current loan term must be 10, 15, 20, or 30 years',
      severity: 'error'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateRemainingYears(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Remaining years must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1) {
    return {
      isValid: false,
      message: 'Remaining years should be at least 1 year',
      severity: 'warning'
    };
  }
  
  if (value > 50) {
    return {
      isValid: false,
      message: 'Remaining years should not exceed 50 years',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateNewLoanAmount(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'New loan amount must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1000) {
    return {
      isValid: false,
      message: 'New loan amount should be at least $1,000',
      severity: 'warning'
    };
  }
  
  if (value > 10000000) {
    return {
      isValid: false,
      message: 'New loan amount should not exceed $10,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateNewInterestRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'New interest rate must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 0.1) {
    return {
      isValid: false,
      message: 'New interest rate should be at least 0.1%',
      severity: 'warning'
    };
  }
  
  if (value > 20) {
    return {
      isValid: false,
      message: 'New interest rate should not exceed 20%',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateNewLoanTerm(value: string): QuickValidationResult {
  if (!value) {
    return {
      isValid: false,
      message: 'New loan term is required',
      severity: 'error'
    };
  }
  
  const validTerms = ['10', '15', '20', '30'];
  if (!validTerms.includes(value)) {
    return {
      isValid: false,
      message: 'New loan term must be 10, 15, 20, or 30 years',
      severity: 'error'
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

export function quickValidatePrepaymentPenalty(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Prepayment penalty cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 50000) {
    return {
      isValid: false,
      message: 'Prepayment penalty should not exceed $50,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value <= 0) {
    return {
      isValid: false,
      message: 'Property value must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1000) {
    return {
      isValid: false,
      message: 'Property value should be at least $1,000',
      severity: 'warning'
    };
  }
  
  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Property value should not exceed $10,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateRefinancePurpose(value: string): QuickValidationResult {
  if (!value) {
    return {
      isValid: false,
      message: 'Refinance purpose is required',
      severity: 'error'
    };
  }
  
  const validPurposes = ['lower_rate', 'shorter_term', 'cash_out', 'debt_consolidation', 'remove_pmi'];
  if (!validPurposes.includes(value)) {
    return {
      isValid: false,
      message: 'Invalid refinance purpose selected',
      severity: 'error'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateCashOutAmount(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Cash out amount cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 1000000) {
    return {
      isValid: false,
      message: 'Cash out amount should not exceed $1,000,000',
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

export function quickValidatePlanToMove(value: string): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  const validPlans = ['1', '3', '5', '7', '10', 'never'];
  if (!validPlans.includes(value)) {
    return {
      isValid: false,
      message: 'Invalid move plan selected',
      severity: 'error'
    };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAllInputs(inputs: Partial<MortgageRefinanceInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  if (inputs.currentLoanAmount !== undefined) {
    results.push(quickValidateCurrentLoanAmount(inputs.currentLoanAmount));
  }
  
  if (inputs.currentInterestRate !== undefined) {
    results.push(quickValidateCurrentInterestRate(inputs.currentInterestRate));
  }
  
  if (inputs.currentLoanTerm !== undefined) {
    results.push(quickValidateCurrentLoanTerm(inputs.currentLoanTerm));
  }
  
  if (inputs.remainingYears !== undefined) {
    results.push(quickValidateRemainingYears(inputs.remainingYears));
  }
  
  if (inputs.newLoanAmount !== undefined) {
    results.push(quickValidateNewLoanAmount(inputs.newLoanAmount));
  }
  
  if (inputs.newInterestRate !== undefined) {
    results.push(quickValidateNewInterestRate(inputs.newInterestRate));
  }
  
  if (inputs.newLoanTerm !== undefined) {
    results.push(quickValidateNewLoanTerm(inputs.newLoanTerm));
  }
  
  if (inputs.closingCosts !== undefined) {
    results.push(quickValidateClosingCosts(inputs.closingCosts));
  }
  
  if (inputs.prepaymentPenalty !== undefined) {
    results.push(quickValidatePrepaymentPenalty(inputs.prepaymentPenalty));
  }
  
  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  }
  
  if (inputs.refinancePurpose !== undefined) {
    results.push(quickValidateRefinancePurpose(inputs.refinancePurpose));
  }
  
  if (inputs.cashOutAmount !== undefined) {
    results.push(quickValidateCashOutAmount(inputs.cashOutAmount));
  }
  
  if (inputs.taxRate !== undefined) {
    results.push(quickValidateTaxRate(inputs.taxRate));
  }
  
  if (inputs.planToMove !== undefined) {
    results.push(quickValidatePlanToMove(inputs.planToMove));
  }
  
  return results;
}