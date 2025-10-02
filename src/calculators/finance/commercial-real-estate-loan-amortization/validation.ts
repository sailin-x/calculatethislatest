import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateAmortizationInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyType', 'loanAmount', 'interestRate', 'loanTerm', 'paymentFrequency',
    'startDate', 'balloonPayment', 'prepaymentPenalty', 'originationFee', 'closingCosts',
    'propertyValue', 'loanToValue', 'debtServiceCoverage', 'annualNOI', 'taxRate',
    'inflationRate', 'appreciationRate'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Loan amount validation
  const loanAmount = inputs.loanAmount as number;
  if (typeof loanAmount !== 'number' || isNaN(loanAmount)) {
    errors.push('Loan amount must be a valid number');
  } else if (loanAmount < 100000 || loanAmount > 100000000) {
    errors.push('Loan amount must be between $100,000 and $100,000,000');
  }

  // Interest rate validation
  const interestRate = inputs.interestRate as number;
  if (typeof interestRate !== 'number' || isNaN(interestRate)) {
    errors.push('Interest rate must be a valid number');
  } else if (interestRate < 1 || interestRate > 20) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  // Loan term validation
  const loanTerm = inputs.loanTerm as number;
  if (typeof loanTerm !== 'number' || isNaN(loanTerm)) {
    errors.push('Loan term must be a valid number');
  } else if (loanTerm < 5 || loanTerm > 30) {
    errors.push('Loan term must be between 5 and 30 years');
  }

  // Balloon payment validation
  const balloonPayment = inputs.balloonPayment as number;
  if (typeof balloonPayment !== 'number' || isNaN(balloonPayment)) {
    errors.push('Balloon payment must be a valid number');
  } else if (balloonPayment < 0 || balloonPayment > 100000000) {
    errors.push('Balloon payment must be between $0 and $100,000,000');
  }

  // Prepayment penalty validation
  const prepaymentPenalty = inputs.prepaymentPenalty as number;
  if (typeof prepaymentPenalty !== 'number' || isNaN(prepaymentPenalty)) {
    errors.push('Prepayment penalty must be a valid number');
  } else if (prepaymentPenalty < 0 || prepaymentPenalty > 10) {
    errors.push('Prepayment penalty must be between 0% and 10%');
  }

  // Origination fee validation
  const originationFee = inputs.originationFee as number;
  if (typeof originationFee !== 'number' || isNaN(originationFee)) {
    errors.push('Origination fee must be a valid number');
  } else if (originationFee < 0 || originationFee > 100000) {
    errors.push('Origination fee must be between $0 and $100,000');
  }

  // Closing costs validation
  const closingCosts = inputs.closingCosts as number;
  if (typeof closingCosts !== 'number' || isNaN(closingCosts)) {
    errors.push('Closing costs must be a valid number');
  } else if (closingCosts < 0 || closingCosts > 500000) {
    errors.push('Closing costs must be between $0 and $500,000');
  }

  // Property value validation
  const propertyValue = inputs.propertyValue as number;
  if (typeof propertyValue !== 'number' || isNaN(propertyValue)) {
    errors.push('Property value must be a valid number');
  } else if (propertyValue < 100000 || propertyValue > 100000000) {
    errors.push('Property value must be between $100,000 and $100,000,000');
  }

  // Loan-to-value validation
  const loanToValue = inputs.loanToValue as number;
  if (typeof loanToValue !== 'number' || isNaN(loanToValue)) {
    errors.push('Loan-to-value ratio must be a valid number');
  } else if (loanToValue < 10 || loanToValue > 95) {
    errors.push('Loan-to-value ratio must be between 10% and 95%');
  }

  // Debt service coverage validation
  const debtServiceCoverage = inputs.debtServiceCoverage as number;
  if (typeof debtServiceCoverage !== 'number' || isNaN(debtServiceCoverage)) {
    errors.push('Debt service coverage ratio must be a valid number');
  } else if (debtServiceCoverage < 1.0 || debtServiceCoverage > 3.0) {
    errors.push('Debt service coverage ratio must be between 1.0 and 3.0');
  }

  // Annual NOI validation
  const annualNOI = inputs.annualNOI as number;
  if (typeof annualNOI !== 'number' || isNaN(annualNOI)) {
    errors.push('Annual NOI must be a valid number');
  } else if (annualNOI < 0 || annualNOI > 10000000) {
    errors.push('Annual NOI must be between $0 and $10,000,000');
  }

  // Tax rate validation
  const taxRate = inputs.taxRate as number;
  if (typeof taxRate !== 'number' || isNaN(taxRate)) {
    errors.push('Tax rate must be a valid number');
  } else if (taxRate < 0 || taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  // Inflation rate validation
  const inflationRate = inputs.inflationRate as number;
  if (typeof inflationRate !== 'number' || isNaN(inflationRate)) {
    errors.push('Inflation rate must be a valid number');
  } else if (inflationRate < 0 || inflationRate > 10) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  // Appreciation rate validation
  const appreciationRate = inputs.appreciationRate as number;
  if (typeof appreciationRate !== 'number' || isNaN(appreciationRate)) {
    errors.push('Appreciation rate must be a valid number');
  } else if (appreciationRate < -10 || appreciationRate > 15) {
    errors.push('Appreciation rate must be between -10% and 15%');
  }

  // Property type validation
  const validPropertyTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use', 'apartment', 'self-storage'];
  const propertyType = inputs.propertyType as string;
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Payment frequency validation
  const validPaymentFrequencies = ['weekly', 'biweekly', 'monthly', 'quarterly', 'annually'];
  const paymentFrequency = inputs.paymentFrequency as string;
  if (!validPaymentFrequencies.includes(paymentFrequency)) {
    errors.push('Invalid payment frequency selected');
  }

  // Start date validation
  const startDate = inputs.startDate as string;
  if (!startDate || typeof startDate !== 'string') {
    errors.push('Start date is required');
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate)) {
      errors.push('Start date must be in YYYY-MM-DD format');
    } else {
      const date = new Date(startDate);
      if (isNaN(date.getTime())) {
        errors.push('Start date must be a valid date');
      }
    }
  }

  // Logical validation
  if (balloonPayment > loanAmount) {
    errors.push('Balloon payment cannot exceed loan amount');
  }

  if (loanAmount > propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  const calculatedLTV = (loanAmount / propertyValue) * 100;
  if (Math.abs(calculatedLTV - loanToValue) > 1) {
    errors.push('Loan-to-value ratio does not match loan amount and property value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Quick validation for real-time input checking
export function quickValidateAmortizationInput(field: string, value: any): string | null {
  switch (field) {
    case 'loanAmount':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Loan amount must be a valid number';
      }
      if (value < 100000 || value > 100000000) {
        return 'Loan amount must be between $100,000 and $100,000,000';
      }
      break;

    case 'interestRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Interest rate must be a valid number';
      }
      if (value < 1 || value > 20) {
        return 'Interest rate must be between 1% and 20%';
      }
      break;

    case 'loanTerm':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Loan term must be a valid number';
      }
      if (value < 5 || value > 30) {
        return 'Loan term must be between 5 and 30 years';
      }
      break;

    case 'balloonPayment':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Balloon payment must be a valid number';
      }
      if (value < 0 || value > 100000000) {
        return 'Balloon payment must be between $0 and $100,000,000';
      }
      break;

    case 'prepaymentPenalty':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Prepayment penalty must be a valid number';
      }
      if (value < 0 || value > 10) {
        return 'Prepayment penalty must be between 0% and 10%';
      }
      break;

    case 'propertyValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Property value must be a valid number';
      }
      if (value < 100000 || value > 100000000) {
        return 'Property value must be between $100,000 and $100,000,000';
      }
      break;

    case 'loanToValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Loan-to-value ratio must be a valid number';
      }
      if (value < 10 || value > 95) {
        return 'Loan-to-value ratio must be between 10% and 95%';
      }
      break;

    case 'debtServiceCoverage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Debt service coverage ratio must be a valid number';
      }
      if (value < 1.0 || value > 3.0) {
        return 'Debt service coverage ratio must be between 1.0 and 3.0';
      }
      break;

    case 'annualNOI':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Annual NOI must be a valid number';
      }
      if (value < 0 || value > 10000000) {
        return 'Annual NOI must be between $0 and $10,000,000';
      }
      break;

    case 'taxRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Tax rate must be a valid number';
      }
      if (value < 0 || value > 50) {
        return 'Tax rate must be between 0% and 50%';
      }
      break;

    case 'inflationRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Inflation rate must be a valid number';
      }
      if (value < 0 || value > 10) {
        return 'Inflation rate must be between 0% and 10%';
      }
      break;

    case 'appreciationRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Appreciation rate must be a valid number';
      }
      if (value < -10 || value > 15) {
        return 'Appreciation rate must be between -10% and 15%';
      }
      break;
  }

  return null;
}
