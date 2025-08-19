import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgageQualificationInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validate mortgage qualification inputs
 */
export function validateMortgageQualificationInputs(inputs: MortgageQualificationInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required field validations
  if (!inputs.grossMonthlyIncome || inputs.grossMonthlyIncome <= 0) {
    errors.push({ field: 'grossMonthlyIncome', message: 'Gross Monthly Income is required and must be positive', severity: 'error' });
  }

  if (inputs.monthlyDebts === undefined || inputs.monthlyDebts === null || inputs.monthlyDebts < 0) {
    errors.push({ field: 'monthlyDebts', message: 'Monthly Debts must be non-negative', severity: 'error' });
  }

  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down Payment is required and must be non-negative', severity: 'error' });
  }

  if (!inputs.creditScore || inputs.creditScore < 300 || inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit Score must be between 300 and 850', severity: 'error' });
  }

  if (!inputs.interestRate || inputs.interestRate <= 0 || inputs.interestRate > 20) {
    errors.push({ field: 'interestRate', message: 'Interest Rate must be between 0.1% and 20%', severity: 'error' });
  }

  if (!inputs.loanTerm || !['15', '20', '30'].includes(inputs.loanTerm)) {
    errors.push({ field: 'loanTerm', message: 'Loan Term must be 15, 20, or 30 years', severity: 'error' });
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda'].includes(inputs.loanType)) {
    errors.push({ field: 'loanType', message: 'Loan Type must be conventional, fha, va, or usda', severity: 'error' });
  }

  // Range validations
  if (inputs.grossMonthlyIncome && (inputs.grossMonthlyIncome < 1000 || inputs.grossMonthlyIncome > 1000000)) {
    errors.push({ field: 'grossMonthlyIncome', message: 'Gross Monthly Income must be between $1,000 and $1,000,000', severity: 'error' });
  }

  if (inputs.monthlyDebts !== undefined && inputs.monthlyDebts !== null && (inputs.monthlyDebts < 0 || inputs.monthlyDebts > 100000)) {
    errors.push({ field: 'monthlyDebts', message: 'Monthly Debts must be between $0 and $100,000', severity: 'error' });
  }

  if (inputs.downPayment && (inputs.downPayment < 0 || inputs.downPayment > 1000000)) {
    errors.push({ field: 'downPayment', message: 'Down Payment must be between $0 and $1,000,000', severity: 'error' });
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push({ field: 'creditScore', message: 'Credit Score must be between 300 and 850', severity: 'error' });
  }

  if (inputs.interestRate && (inputs.interestRate < 0.1 || inputs.interestRate > 20)) {
    errors.push({ field: 'interestRate', message: 'Interest Rate must be between 0.1% and 20%', severity: 'error' });
  }

  // Loan term validation
  const validLoanTerms = ['15', '20', '30'];
  if (inputs.loanTerm && !validLoanTerms.includes(inputs.loanTerm)) {
    errors.push({
      field: 'loanTerm',
      message: 'Loan term must be 15, 20, or 30 years',
      severity: 'error'
    });
  }

  // Loan type validation
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
  if (inputs.loanType && !validLoanTypes.includes(inputs.loanType)) {
    errors.push({
      field: 'loanType',
      message: 'Loan type must be conventional, fha, va, or usda',
      severity: 'error'
    });
  }

  // Optional field validations
  if (inputs.propertyTaxRate !== undefined && inputs.propertyTaxRate !== null) {
    if (inputs.propertyTaxRate < 0 || inputs.propertyTaxRate > 5) {
      errors.push({ field: 'propertyTaxRate', message: 'Property Tax Rate must be between 0% and 5%', severity: 'error' });
    }
  }

  if (inputs.homeownersInsurance !== undefined && inputs.homeownersInsurance !== null) {
    if (inputs.homeownersInsurance < 0 || inputs.homeownersInsurance > 10000) {
      errors.push({ field: 'homeownersInsurance', message: 'Homeowners Insurance must be between $0 and $10,000', severity: 'error' });
    }
  }

  if (inputs.pmiRate !== undefined && inputs.pmiRate !== null) {
    if (inputs.pmiRate < 0 || inputs.pmiRate > 2) {
      errors.push({ field: 'pmiRate', message: 'PMI Rate must be between 0% and 2%', severity: 'error' });
    }
  }

  if (inputs.dtiRatio !== undefined && inputs.dtiRatio !== null) {
    if (inputs.dtiRatio <= 0 || inputs.dtiRatio > 50) {
      errors.push({ field: 'dtiRatio', message: 'DTI Ratio must be between 20% and 50%', severity: 'error' });
    }
  }

  if (inputs.frontEndRatio !== undefined && inputs.frontEndRatio !== null) {
    if (inputs.frontEndRatio <= 0 || inputs.frontEndRatio > 40) {
      errors.push({ field: 'frontEndRatio', message: 'Front-End Ratio must be between 20% and 40%', severity: 'error' });
    }
  }

  if (inputs.reserves !== undefined && inputs.reserves !== null) {
    if (inputs.reserves < 0 || inputs.reserves > 24) {
      errors.push({ field: 'reserves', message: 'Reserves must be between 0 and 24 months', severity: 'error' });
    }
  }

  if (inputs.incomeStability !== undefined && inputs.incomeStability !== null) {
    if (inputs.incomeStability < 0 || inputs.incomeStability > 20) {
      errors.push({ field: 'incomeStability', message: 'Income Stability must be between 0 and 20 years', severity: 'error' });
    }
  }

  // Employment type validation
  if (inputs.employmentType) {
    const validEmploymentTypes = ['w2', 'self-employed', 'business-owner', 'retired'];
    if (!validEmploymentTypes.includes(inputs.employmentType)) {
      errors.push({
        field: 'employmentType',
        message: 'Employment type must be w2, self-employed, business-owner, or retired',
        severity: 'error'
      });
    }
  }

  // Business logic validations
  const businessLogicErrors = validateBusinessLogic(inputs);
  errors.push(...businessLogicErrors);

  return errors;
}

/**
 * Validate business logic rules
 */
function validateBusinessLogic(inputs: MortgageQualificationInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if monthly debts exceed income
  if (inputs.monthlyDebts >= inputs.grossMonthlyIncome) {
    errors.push({
      field: 'monthlyDebts',
      message: 'Monthly debts cannot exceed or equal gross monthly income',
      severity: 'error'
    });
  }

  // Check if down payment is reasonable for loan type
  if (inputs.loanType === 'fha' && inputs.downPayment < 3500) {
    errors.push({
      field: 'downPayment',
      message: 'FHA loans typically require a minimum down payment of $3,500',
      severity: 'warning'
    });
  }

  // Check credit score requirements for loan types
  if (inputs.loanType === 'conventional' && inputs.creditScore < 620) {
    errors.push({
      field: 'creditScore',
      message: 'Conventional loans typically require a minimum credit score of 620',
      severity: 'warning'
    });
  }

  if (inputs.loanType === 'fha' && inputs.creditScore < 580) {
    errors.push({
      field: 'creditScore',
      message: 'FHA loans typically require a minimum credit score of 580',
      severity: 'warning'
    });
  }

  // Check DTI ratio limits
  if (inputs.dtiRatio && inputs.dtiRatio > 50) {
    errors.push({
      field: 'dtiRatio',
      message: 'DTI ratio above 50% may make qualification difficult',
      severity: 'warning'
    });
  }

  // Check front-end ratio limits
  if (inputs.frontEndRatio && inputs.frontEndRatio > 35) {
    errors.push({
      field: 'frontEndRatio',
      message: 'Front-end ratio above 35% may make qualification difficult',
      severity: 'warning'
    });
  }

  return errors;
}