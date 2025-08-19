import { ValidationError } from '../../types/ValidationError';
import { MortgageRefinanceInputs } from './formulas';

export function validateMortgageRefinanceInputs(inputs: MortgageRefinanceInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields validation
  if (!inputs.currentLoanAmount || inputs.currentLoanAmount <= 0) {
    errors.push({
      field: 'currentLoanAmount',
      message: 'Current loan amount is required and must be greater than 0'
    });
  }

  if (!inputs.currentInterestRate || inputs.currentInterestRate <= 0) {
    errors.push({
      field: 'currentInterestRate',
      message: 'Current interest rate is required and must be greater than 0'
    });
  }

  if (!inputs.currentLoanTerm) {
    errors.push({
      field: 'currentLoanTerm',
      message: 'Current loan term is required'
    });
  }

  if (!inputs.remainingYears || inputs.remainingYears <= 0) {
    errors.push({
      field: 'remainingYears',
      message: 'Remaining years is required and must be greater than 0'
    });
  }

  if (!inputs.newLoanAmount || inputs.newLoanAmount <= 0) {
    errors.push({
      field: 'newLoanAmount',
      message: 'New loan amount is required and must be greater than 0'
    });
  }

  if (!inputs.newInterestRate || inputs.newInterestRate <= 0) {
    errors.push({
      field: 'newInterestRate',
      message: 'New interest rate is required and must be greater than 0'
    });
  }

  if (!inputs.newLoanTerm) {
    errors.push({
      field: 'newLoanTerm',
      message: 'New loan term is required'
    });
  }

  if (!inputs.closingCosts || inputs.closingCosts < 0) {
    errors.push({
      field: 'closingCosts',
      message: 'Closing costs are required and must be non-negative'
    });
  }

  if (!inputs.refinancePurpose) {
    errors.push({
      field: 'refinancePurpose',
      message: 'Refinance purpose is required'
    });
  }

  // Range validations
  if (inputs.currentLoanAmount && (inputs.currentLoanAmount < 1000 || inputs.currentLoanAmount > 10000000)) {
    errors.push({
      field: 'currentLoanAmount',
      message: 'Current loan amount must be between $1,000 and $10,000,000'
    });
  }

  if (inputs.currentInterestRate && (inputs.currentInterestRate < 0.1 || inputs.currentInterestRate > 20)) {
    errors.push({
      field: 'currentInterestRate',
      message: 'Current interest rate must be between 0.1% and 20%'
    });
  }

  if (inputs.remainingYears && (inputs.remainingYears < 1 || inputs.remainingYears > 50)) {
    errors.push({
      field: 'remainingYears',
      message: 'Remaining years must be between 1 and 50'
    });
  }

  if (inputs.newLoanAmount && (inputs.newLoanAmount < 1000 || inputs.newLoanAmount > 10000000)) {
    errors.push({
      field: 'newLoanAmount',
      message: 'New loan amount must be between $1,000 and $10,000,000'
    });
  }

  if (inputs.newInterestRate && (inputs.newInterestRate < 0.1 || inputs.newInterestRate > 20)) {
    errors.push({
      field: 'newInterestRate',
      message: 'New interest rate must be between 0.1% and 20%'
    });
  }

  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 50000)) {
    errors.push({
      field: 'closingCosts',
      message: 'Closing costs must be between $0 and $50,000'
    });
  }

  if (inputs.prepaymentPenalty && (inputs.prepaymentPenalty < 0 || inputs.prepaymentPenalty > 50000)) {
    errors.push({
      field: 'prepaymentPenalty',
      message: 'Prepayment penalty must be between $0 and $50,000'
    });
  }

  if (inputs.propertyValue && (inputs.propertyValue < 1000 || inputs.propertyValue > 10000000)) {
    errors.push({
      field: 'propertyValue',
      message: 'Property value must be between $1,000 and $10,000,000'
    });
  }

  if (inputs.cashOutAmount && (inputs.cashOutAmount < 0 || inputs.cashOutAmount > 1000000)) {
    errors.push({
      field: 'cashOutAmount',
      message: 'Cash out amount must be between $0 and $1,000,000'
    });
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push({
      field: 'taxRate',
      message: 'Tax rate must be between 0% and 50%'
    });
  }

  // Loan term validations
  const validLoanTerms = ['10', '15', '20', '30'];
  if (inputs.currentLoanTerm && !validLoanTerms.includes(inputs.currentLoanTerm)) {
    errors.push({
      field: 'currentLoanTerm',
      message: 'Current loan term must be 10, 15, 20, or 30 years'
    });
  }

  if (inputs.newLoanTerm && !validLoanTerms.includes(inputs.newLoanTerm)) {
    errors.push({
      field: 'newLoanTerm',
      message: 'New loan term must be 10, 15, 20, or 30 years'
    });
  }

  // Refinance purpose validation
  const validPurposes = ['lower_rate', 'shorter_term', 'cash_out', 'debt_consolidation', 'remove_pmi'];
  if (inputs.refinancePurpose && !validPurposes.includes(inputs.refinancePurpose)) {
    errors.push({
      field: 'refinancePurpose',
      message: 'Invalid refinance purpose selected'
    });
  }

  // Plan to move validation
  const validMovePlans = ['1', '3', '5', '7', '10', 'never'];
  if (inputs.planToMove && !validMovePlans.includes(inputs.planToMove)) {
    errors.push({
      field: 'planToMove',
      message: 'Invalid move plan selected'
    });
  }

  // Business logic validations
  if (inputs.remainingYears && inputs.currentLoanTerm) {
    const currentTermYears = parseInt(inputs.currentLoanTerm);
    if (inputs.remainingYears > currentTermYears) {
      errors.push({
        field: 'remainingYears',
        message: `Remaining years (${inputs.remainingYears}) cannot exceed current loan term (${currentTermYears} years)`
      });
    }
  }

  if (inputs.cashOutAmount && inputs.cashOutAmount > 0) {
    if (inputs.refinancePurpose !== 'cash_out') {
      errors.push({
        field: 'cashOutAmount',
        message: 'Cash out amount should only be specified when refinance purpose is "Cash Out"'
      });
    }

    if (inputs.newLoanAmount && inputs.currentLoanAmount) {
      const maxCashOut = inputs.newLoanAmount - inputs.currentLoanAmount;
      if (inputs.cashOutAmount > maxCashOut) {
        errors.push({
          field: 'cashOutAmount',
          message: `Cash out amount ($${inputs.cashOutAmount.toLocaleString()}) cannot exceed the difference between new and current loan amounts ($${maxCashOut.toLocaleString()})`
        });
      }
    }
  }

  if (inputs.propertyValue && inputs.newLoanAmount) {
    const ltv = (inputs.newLoanAmount / inputs.propertyValue) * 100;
    if (ltv > 100) {
      errors.push({
        field: 'newLoanAmount',
        message: `New loan amount results in LTV of ${ltv.toFixed(1)}%, which exceeds 100%`
      });
    }
  }

  if (inputs.planToMove && inputs.planToMove !== 'never') {
    const moveYears = parseInt(inputs.planToMove);
    if (inputs.remainingYears && inputs.remainingYears < moveYears) {
      errors.push({
        field: 'planToMove',
        message: `Plan to move in ${moveYears} years, but current loan will be paid off in ${inputs.remainingYears} years`
      });
    }
  }

  // Rate comparison validation
  if (inputs.currentInterestRate && inputs.newInterestRate) {
    if (inputs.refinancePurpose === 'lower_rate' && inputs.newInterestRate >= inputs.currentInterestRate) {
      errors.push({
        field: 'newInterestRate',
        message: 'New interest rate should be lower than current rate for rate reduction refinance'
      });
    }
  }

  // Term comparison validation
  if (inputs.currentLoanTerm && inputs.newLoanTerm) {
    const currentTerm = parseInt(inputs.currentLoanTerm);
    const newTerm = parseInt(inputs.newLoanTerm);
    
    if (inputs.refinancePurpose === 'shorter_term' && newTerm >= currentTerm) {
      errors.push({
        field: 'newLoanTerm',
        message: 'New loan term should be shorter than current term for term reduction refinance'
      });
    }
  }

  return errors;
}