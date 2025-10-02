import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateDSCRInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'propertyType', 'grossRentalIncome', 'otherIncome', 'vacancyRate',
    'operatingExpenses', 'propertyManagementFee', 'maintenanceCosts',
    'insuranceCosts', 'propertyTaxes', 'utilities', 'repairs',
    'landscaping', 'security', 'advertising', 'legalFees',
    'accountingFees', 'loanAmount', 'interestRate', 'loanTerm',
    'paymentFrequency', 'propertyValue', 'requiredDSCR',
    'marketCapRate', 'propertyAge', 'occupancyRate', 'leaseType',
    'tenantCreditRating', 'marketConditions'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const {
    grossRentalIncome,
    otherIncome,
    vacancyRate,
    operatingExpenses,
    propertyManagementFee,
    maintenanceCosts,
    insuranceCosts,
    propertyTaxes,
    utilities,
    repairs,
    landscaping,
    security,
    advertising,
    legalFees,
    accountingFees,
    loanAmount,
    interestRate,
    loanTerm,
    paymentFrequency,
    propertyValue,
    requiredDSCR,
    marketCapRate,
    propertyAge,
    occupancyRate
  } = inputs;

  // Validate income inputs
  if (grossRentalIncome < 0) {
    errors.push('Gross rental income cannot be negative');
  }
  if (grossRentalIncome > 100000000) {
    errors.push('Gross rental income cannot exceed $100,000,000');
  }

  if (otherIncome < 0) {
    errors.push('Other income cannot be negative');
  }
  if (otherIncome > 50000000) {
    errors.push('Other income cannot exceed $50,000,000');
  }

  // Validate vacancy rate
  if (vacancyRate < 0 || vacancyRate > 100) {
    errors.push('Vacancy rate must be between 0% and 100%');
  }

  // Validate expense inputs
  if (operatingExpenses < 0) {
    errors.push('Operating expenses cannot be negative');
  }
  if (operatingExpenses > 50000000) {
    errors.push('Operating expenses cannot exceed $50,000,000');
  }

  if (propertyManagementFee < 0) {
    errors.push('Property management fee cannot be negative');
  }
  if (propertyManagementFee > 5000000) {
    errors.push('Property management fee cannot exceed $5,000,000');
  }

  if (maintenanceCosts < 0) {
    errors.push('Maintenance costs cannot be negative');
  }
  if (maintenanceCosts > 10000000) {
    errors.push('Maintenance costs cannot exceed $10,000,000');
  }

  if (insuranceCosts < 0) {
    errors.push('Insurance costs cannot be negative');
  }
  if (insuranceCosts > 5000000) {
    errors.push('Insurance costs cannot exceed $5,000,000');
  }

  if (propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }
  if (propertyTaxes > 10000000) {
    errors.push('Property taxes cannot exceed $10,000,000');
  }

  if (utilities < 0) {
    errors.push('Utilities cannot be negative');
  }
  if (utilities > 5000000) {
    errors.push('Utilities cannot exceed $5,000,000');
  }

  if (repairs < 0) {
    errors.push('Repairs cannot be negative');
  }
  if (repairs > 5000000) {
    errors.push('Repairs cannot exceed $5,000,000');
  }

  if (landscaping < 0) {
    errors.push('Landscaping cannot be negative');
  }
  if (landscaping > 2000000) {
    errors.push('Landscaping cannot exceed $2,000,000');
  }

  if (security < 0) {
    errors.push('Security cannot be negative');
  }
  if (security > 2000000) {
    errors.push('Security cannot exceed $2,000,000');
  }

  if (advertising < 0) {
    errors.push('Advertising cannot be negative');
  }
  if (advertising > 1000000) {
    errors.push('Advertising cannot exceed $1,000,000');
  }

  if (legalFees < 0) {
    errors.push('Legal fees cannot be negative');
  }
  if (legalFees > 1000000) {
    errors.push('Legal fees cannot exceed $1,000,000');
  }

  if (accountingFees < 0) {
    errors.push('Accounting fees cannot be negative');
  }
  if (accountingFees > 500000) {
    errors.push('Accounting fees cannot exceed $500,000');
  }

  // Validate loan inputs
  if (loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }
  if (loanAmount > 100000000) {
    errors.push('Loan amount cannot exceed $100,000,000');
  }

  if (interestRate < 0 || interestRate > 25) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  if (loanTerm < 1 || loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (!['monthly', 'quarterly', 'annually'].includes(paymentFrequency)) {
    errors.push('Payment frequency must be monthly, quarterly, or annually');
  }

  // Validate property inputs
  if (propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }
  if (propertyValue > 500000000) {
    errors.push('Property value cannot exceed $500,000,000');
  }

  if (requiredDSCR < 1.0 || requiredDSCR > 3.0) {
    errors.push('Required DSCR must be between 1.0 and 3.0');
  }

  if (marketCapRate < 0 || marketCapRate > 20) {
    errors.push('Market cap rate must be between 0% and 20%');
  }

  if (propertyAge < 0 || propertyAge > 100) {
    errors.push('Property age must be between 0 and 100 years');
  }

  if (occupancyRate < 0 || occupancyRate > 100) {
    errors.push('Occupancy rate must be between 0% and 100%');
  }

  // Logical validation
  if (loanAmount > propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  const totalIncome = grossRentalIncome + otherIncome;
  const totalExpenses = operatingExpenses + propertyManagementFee + maintenanceCosts +
                       insuranceCosts + propertyTaxes + utilities + repairs + landscaping +
                       security + advertising + legalFees + accountingFees;

  if (totalExpenses > totalIncome) {
    errors.push('Total expenses cannot exceed total income');
  }

  if (vacancyRate + occupancyRate > 100) {
    errors.push('Vacancy rate plus occupancy rate cannot exceed 100%');
  }

  // Validate that NOI would be positive
  const vacancyLoss = totalIncome * (vacancyRate / 100);
  const effectiveGrossIncome = totalIncome - vacancyLoss;
  const noi = effectiveGrossIncome - totalExpenses;

  if (noi <= 0) {
    errors.push('Net Operating Income (NOI) must be positive');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateDSCRInput(field: string, value: any): string | null {
  switch (field) {
    case 'grossRentalIncome':
      if (value === undefined || value === null || value === '') {
        return 'Gross rental income is required';
      }
      const grossRental = Number(value);
      if (isNaN(grossRental)) {
        return 'Gross rental income must be a valid number';
      }
      if (grossRental < 0) {
        return 'Gross rental income cannot be negative';
      }
      if (grossRental > 100000000) {
        return 'Gross rental income cannot exceed $100,000,000';
      }
      break;

    case 'otherIncome':
      if (value === undefined || value === null || value === '') {
        return 'Other income is required';
      }
      const otherInc = Number(value);
      if (isNaN(otherInc)) {
        return 'Other income must be a valid number';
      }
      if (otherInc < 0) {
        return 'Other income cannot be negative';
      }
      if (otherInc > 50000000) {
        return 'Other income cannot exceed $50,000,000';
      }
      break;

    case 'vacancyRate':
      if (value === undefined || value === null || value === '') {
        return 'Vacancy rate is required';
      }
      const vacancy = Number(value);
      if (isNaN(vacancy)) {
        return 'Vacancy rate must be a valid number';
      }
      if (vacancy < 0 || vacancy > 100) {
        return 'Vacancy rate must be between 0% and 100%';
      }
      break;

    case 'loanAmount':
      if (value === undefined || value === null || value === '') {
        return 'Loan amount is required';
      }
      const loan = Number(value);
      if (isNaN(loan)) {
        return 'Loan amount must be a valid number';
      }
      if (loan <= 0) {
        return 'Loan amount must be greater than 0';
      }
      if (loan > 100000000) {
        return 'Loan amount cannot exceed $100,000,000';
      }
      break;

    case 'interestRate':
      if (value === undefined || value === null || value === '') {
        return 'Interest rate is required';
      }
      const rate = Number(value);
      if (isNaN(rate)) {
        return 'Interest rate must be a valid number';
      }
      if (rate < 0 || rate > 25) {
        return 'Interest rate must be between 0% and 25%';
      }
      break;

    case 'loanTerm':
      if (value === undefined || value === null || value === '') {
        return 'Loan term is required';
      }
      const term = Number(value);
      if (isNaN(term)) {
        return 'Loan term must be a valid number';
      }
      if (term < 1 || term > 50) {
        return 'Loan term must be between 1 and 50 years';
      }
      break;

    case 'propertyValue':
      if (value === undefined || value === null || value === '') {
        return 'Property value is required';
      }
      const value_ = Number(value);
      if (isNaN(value_)) {
        return 'Property value must be a valid number';
      }
      if (value_ <= 0) {
        return 'Property value must be greater than 0';
      }
      if (value_ > 500000000) {
        return 'Property value cannot exceed $500,000,000';
      }
      break;

    case 'requiredDSCR':
      if (value === undefined || value === null || value === '') {
        return 'Required DSCR is required';
      }
      const dscr = Number(value);
      if (isNaN(dscr)) {
        return 'Required DSCR must be a valid number';
      }
      if (dscr < 1.0 || dscr > 3.0) {
        return 'Required DSCR must be between 1.0 and 3.0';
      }
      break;

    case 'marketCapRate':
      if (value === undefined || value === null || value === '') {
        return 'Market cap rate is required';
      }
      const capRate = Number(value);
      if (isNaN(capRate)) {
        return 'Market cap rate must be a valid number';
      }
      if (capRate < 0 || capRate > 20) {
        return 'Market cap rate must be between 0% and 20%';
      }
      break;

    case 'propertyAge':
      if (value === undefined || value === null || value === '') {
        return 'Property age is required';
      }
      const age = Number(value);
      if (isNaN(age)) {
        return 'Property age must be a valid number';
      }
      if (age < 0 || age > 100) {
        return 'Property age must be between 0 and 100 years';
      }
      break;

    case 'occupancyRate':
      if (value === undefined || value === null || value === '') {
        return 'Occupancy rate is required';
      }
      const occupancy = Number(value);
      if (isNaN(occupancy)) {
        return 'Occupancy rate must be a valid number';
      }
      if (occupancy < 0 || occupancy > 100) {
        return 'Occupancy rate must be between 0% and 100%';
      }
      break;
  }

  return null;
}
