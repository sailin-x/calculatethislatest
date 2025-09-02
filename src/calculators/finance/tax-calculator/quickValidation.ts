import { TaxInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: keyof TaxInputs,
  value: any,
  allInputs: TaxInputs
): QuickValidationResult {
  switch (fieldName) {
    case 'filingStatus':
      return validateFilingStatus(value);
    case 'taxYear':
      return validateTaxYear(value);
    case 'dependents':
      return validateDependents(value);
    case 'wages':
      return validateWages(value);
    case 'selfEmploymentIncome':
      return validateSelfEmploymentIncome(value);
    case 'interestIncome':
      return validateInterestIncome(value);
    case 'dividendIncome':
      return validateDividendIncome(value);
    case 'capitalGains':
      return validateCapitalGains(value);
    case 'rentalIncome':
      return validateRentalIncome(value);
    case 'businessIncome':
      return validateBusinessIncome(value);
    case 'otherIncome':
      return validateOtherIncome(value);
    case 'standardDeduction':
      return validateStandardDeduction(value);
    case 'itemizedDeductions':
      return validateItemizedDeductions(value, allInputs);
    case 'stateLocalTaxes':
      return validateStateLocalTaxes(value, allInputs);
    case 'mortgageInterest':
      return validateMortgageInterest(value, allInputs);
    case 'charitableContributions':
      return validateCharitableContributions(value, allInputs);
    case 'medicalExpenses':
      return validateMedicalExpenses(value, allInputs);
    case 'otherItemizedDeductions':
      return validateOtherItemizedDeductions(value, allInputs);
    case 'childTaxCredit':
      return validateChildTaxCredit(value, allInputs);
    case 'earnedIncomeCredit':
      return validateEarnedIncomeCredit(value, allInputs);
    case 'educationCredits':
      return validateEducationCredits(value);
    case 'retirementSavingsCredit':
      return validateRetirementSavingsCredit(value, allInputs);
    case 'otherCredits':
      return validateOtherCredits(value);
    case 'federalWithholding':
      return validateFederalWithholding(value);
    case 'estimatedTaxPayments':
      return validateEstimatedTaxPayments(value);
    case 'priorYearOverpayment':
      return validatePriorYearOverpayment(value);
    case 'otherPayments':
      return validateOtherPayments(value);
    case 'stateWithholding':
      return validateStateWithholding(value);
    case 'stateTaxRate':
      return validateStateTaxRate(value);
    case 'retirementContribution':
      return validateRetirementContribution(value);
    case 'hsaContribution':
      return validateHSAContribution(value, allInputs);
    case 'useStandardDeduction':
      return validateUseStandardDeduction(value, allInputs);
    case 'hasHSAAccount':
      return validateHasHSAAccount(value, allInputs);
    default:
      return { isValid: true };
  }
}

function validateFilingStatus(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Filing status is required' };
  }
  
  const validStatuses = ['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household', 'qualifying-widow'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, error: 'Invalid filing status' };
  }
  
  return { isValid: true };
}

function validateTaxYear(value: number): QuickValidationResult {
  if (!value || value < 2020 || value > 2030) {
    return { isValid: false, error: 'Tax year must be between 2020 and 2030' };
  }
  
  return { isValid: true };
}

function validateDependents(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Number of dependents cannot be negative' };
  }
  
  if (value > 20) {
    return { isValid: false, error: 'Number of dependents cannot exceed 20' };
  }
  
  return { isValid: true };
}

function validateWages(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Wages cannot be negative' };
  }
  
  if (value > 1000000) {
    return { isValid: true, warning: 'Wages seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateSelfEmploymentIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Self-employment income cannot be negative' };
  }
  
  if (value > 1000000) {
    return { isValid: true, warning: 'Self-employment income seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateInterestIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Interest income cannot be negative' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Interest income seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateDividendIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Dividend income cannot be negative' };
  }
  
  if (value > 500000) {
    return { isValid: true, warning: 'Dividend income seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateCapitalGains(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Capital gains cannot be negative' };
  }
  
  if (value > 1000000) {
    return { isValid: true, warning: 'Capital gains seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateRentalIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Rental income cannot be negative' };
  }
  
  if (value > 500000) {
    return { isValid: true, warning: 'Rental income seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateBusinessIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Business income cannot be negative' };
  }
  
  if (value > 1000000) {
    return { isValid: true, warning: 'Business income seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateOtherIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other income cannot be negative' };
  }
  
  if (value > 500000) {
    return { isValid: true, warning: 'Other income seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateStandardDeduction(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Standard deduction cannot be negative' };
  }
  
  if (value > 50000) {
    return { isValid: true, warning: 'Standard deduction seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateItemizedDeductions(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Itemized deductions cannot be negative' };
  }
  
  if (allInputs.useStandardDeduction && value > 0) {
    return { isValid: false, error: 'Cannot have itemized deductions when using standard deduction' };
  }
  
  if (!allInputs.useStandardDeduction && value === 0) {
    return { isValid: false, error: 'Itemized deductions must be greater than 0 when not using standard deduction' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Itemized deductions seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateStateLocalTaxes(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (allInputs.useStandardDeduction) {
    return { isValid: true };
  }
  
  if (value < 0) {
    return { isValid: false, error: 'State and local taxes cannot be negative' };
  }
  
  if (value > 10000) {
    return { isValid: false, error: 'State and local taxes are limited to $10,000' };
  }
  
  return { isValid: true };
}

function validateMortgageInterest(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (allInputs.useStandardDeduction) {
    return { isValid: true };
  }
  
  if (value < 0) {
    return { isValid: false, error: 'Mortgage interest cannot be negative' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Mortgage interest seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateCharitableContributions(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (allInputs.useStandardDeduction) {
    return { isValid: true };
  }
  
  if (value < 0) {
    return { isValid: false, error: 'Charitable contributions cannot be negative' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Charitable contributions seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateMedicalExpenses(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (allInputs.useStandardDeduction) {
    return { isValid: true };
  }
  
  if (value < 0) {
    return { isValid: false, error: 'Medical expenses cannot be negative' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Medical expenses seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateOtherItemizedDeductions(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (allInputs.useStandardDeduction) {
    return { isValid: true };
  }
  
  if (value < 0) {
    return { isValid: false, error: 'Other itemized deductions cannot be negative' };
  }
  
  if (value > 50000) {
    return { isValid: true, warning: 'Other itemized deductions seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateChildTaxCredit(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Child tax credit cannot be negative' };
  }
  
  if (value > 0 && allInputs.dependents === 0) {
    return { isValid: false, error: 'Cannot claim child tax credit without dependents' };
  }
  
  if (value > 2000 * allInputs.dependents) {
    return { isValid: true, warning: 'Child tax credit seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateEarnedIncomeCredit(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Earned income credit cannot be negative' };
  }
  
  const totalIncome = allInputs.wages + allInputs.selfEmploymentIncome + allInputs.interestIncome + 
                     allInputs.dividendIncome + allInputs.capitalGains + allInputs.rentalIncome + 
                     allInputs.businessIncome + allInputs.otherIncome;
  
  if (value > 0 && totalIncome > 60000) {
    return { isValid: false, error: 'Earned income credit not available for high-income taxpayers' };
  }
  
  if (value > 7000) {
    return { isValid: true, warning: 'Earned income credit seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateEducationCredits(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Education credits cannot be negative' };
  }
  
  if (value > 5000) {
    return { isValid: true, warning: 'Education credits seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateRetirementSavingsCredit(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement savings credit cannot be negative' };
  }
  
  const totalIncome = allInputs.wages + allInputs.selfEmploymentIncome + allInputs.interestIncome + 
                     allInputs.dividendIncome + allInputs.capitalGains + allInputs.rentalIncome + 
                     allInputs.businessIncome + allInputs.otherIncome;
  
  if (value > 0 && totalIncome > 40000) {
    return { isValid: false, error: 'Retirement savings credit not available for high-income taxpayers' };
  }
  
  if (value > 2000) {
    return { isValid: true, warning: 'Retirement savings credit seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateOtherCredits(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other credits cannot be negative' };
  }
  
  if (value > 10000) {
    return { isValid: true, warning: 'Other credits seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateFederalWithholding(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Federal withholding cannot be negative' };
  }
  
  if (value > 1000000) {
    return { isValid: true, warning: 'Federal withholding seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateEstimatedTaxPayments(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Estimated tax payments cannot be negative' };
  }
  
  if (value > 1000000) {
    return { isValid: true, warning: 'Estimated tax payments seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validatePriorYearOverpayment(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Prior year overpayment cannot be negative' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Prior year overpayment seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateOtherPayments(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other payments cannot be negative' };
  }
  
  if (value > 100000) {
    return { isValid: true, warning: 'Other payments seem unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateStateWithholding(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'State withholding cannot be negative' };
  }
  
  if (value > 500000) {
    return { isValid: true, warning: 'State withholding seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateStateTaxRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'State tax rate cannot be negative' };
  }
  
  if (value > 15) {
    return { isValid: false, error: 'State tax rate cannot exceed 15%' };
  }
  
  return { isValid: true };
}

function validateRetirementContribution(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement contribution cannot be negative' };
  }
  
  if (value > 7000) {
    return { isValid: false, error: 'Retirement contribution exceeds maximum limit' };
  }
  
  return { isValid: true };
}

function validateHSAContribution(value: number, allInputs: TaxInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'HSA contribution cannot be negative' };
  }
  
  if (value > 4150) {
    return { isValid: false, error: 'HSA contribution exceeds maximum limit' };
  }
  
  if (allInputs.hasHSAAccount && value === 0) {
    return { isValid: true, warning: 'Consider contributing to your HSA for tax savings' };
  }
  
  if (!allInputs.hasHSAAccount && value > 0) {
    return { isValid: false, error: 'Cannot contribute to HSA without an HSA account' };
  }
  
  return { isValid: true };
}

function validateUseStandardDeduction(value: boolean, allInputs: TaxInputs): QuickValidationResult {
  if (value && allInputs.itemizedDeductions > allInputs.standardDeduction) {
    return { isValid: true, warning: 'Consider itemizing deductions for greater tax savings' };
  }
  
  if (!value && allInputs.itemizedDeductions <= allInputs.standardDeduction) {
    return { isValid: true, warning: 'Standard deduction may provide greater tax savings' };
  }
  
  return { isValid: true };
}

function validateHasHSAAccount(value: boolean, allInputs: TaxInputs): QuickValidationResult {
  if (value && allInputs.hsaContribution === 0) {
    return { isValid: true, warning: 'Consider contributing to your HSA for tax savings' };
  }
  
  if (!value && allInputs.hsaContribution > 0) {
    return { isValid: false, error: 'Cannot contribute to HSA without an HSA account' };
  }
  
  return { isValid: true };
}