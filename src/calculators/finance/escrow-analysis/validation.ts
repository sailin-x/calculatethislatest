import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEscrowAnalysisInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'propertyValue', 'loanAmount', 'interestRate', 'loanTerm', 'monthlyPayment',
    'currentEscrowBalance', 'annualPropertyTax', 'annualHomeInsurance',
    'propertyTaxPaymentFrequency', 'insurancePaymentFrequency', 'escrowCushion',
    'taxAssessmentIncrease', 'insuranceRateIncrease', 'analysisPeriod',
    'paymentHistory', 'escrowAccountType'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate property value
  const propertyValue = Number(inputs.propertyValue);
  if (isNaN(propertyValue) || propertyValue < 50000 || propertyValue > 10000000) {
    errors.push('Property value must be between $50,000 and $10,000,000');
  }

  // Validate loan amount
  const loanAmount = Number(inputs.loanAmount);
  if (isNaN(loanAmount) || loanAmount < 10000 || loanAmount > 10000000) {
    errors.push('Loan amount must be between $10,000 and $10,000,000');
  }

  // Validate interest rate
  const interestRate = Number(inputs.interestRate);
  if (isNaN(interestRate) || interestRate < 1 || interestRate > 20) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  // Validate loan term
  const loanTerm = Number(inputs.loanTerm);
  if (isNaN(loanTerm) || loanTerm < 10 || loanTerm > 50) {
    errors.push('Loan term must be between 10 and 50 years');
  }

  // Validate monthly payment
  const monthlyPayment = Number(inputs.monthlyPayment);
  if (isNaN(monthlyPayment) || monthlyPayment < 100 || monthlyPayment > 50000) {
    errors.push('Monthly payment must be between $100 and $50,000');
  }

  // Validate current escrow balance
  const currentEscrowBalance = Number(inputs.currentEscrowBalance);
  if (isNaN(currentEscrowBalance) || currentEscrowBalance < 0 || currentEscrowBalance > 100000) {
    errors.push('Current escrow balance must be between $0 and $100,000');
  }

  // Validate annual property tax
  const annualPropertyTax = Number(inputs.annualPropertyTax);
  if (isNaN(annualPropertyTax) || annualPropertyTax < 0 || annualPropertyTax > 100000) {
    errors.push('Annual property tax must be between $0 and $100,000');
  }

  // Validate annual home insurance
  const annualHomeInsurance = Number(inputs.annualHomeInsurance);
  if (isNaN(annualHomeInsurance) || annualHomeInsurance < 0 || annualHomeInsurance > 50000) {
    errors.push('Annual home insurance must be between $0 and $50,000');
  }

  // Validate property tax payment frequency
  const validTaxFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validTaxFrequencies.includes(inputs.propertyTaxPaymentFrequency)) {
    errors.push('Invalid property tax payment frequency');
  }

  // Validate insurance payment frequency
  const validInsuranceFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validInsuranceFrequencies.includes(inputs.insurancePaymentFrequency)) {
    errors.push('Invalid insurance payment frequency');
  }

  // Validate annual PMI if provided
  if (inputs.annualPMI !== undefined && inputs.annualPMI !== null) {
    const annualPMI = Number(inputs.annualPMI);
    if (isNaN(annualPMI) || annualPMI < 0 || annualPMI > 10000) {
      errors.push('Annual PMI must be between $0 and $10,000');
    }

    // Validate PMI payment frequency if PMI is provided
    if (inputs.pmiPaymentFrequency) {
      const validPMIFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
      if (!validPMIFrequencies.includes(inputs.pmiPaymentFrequency)) {
        errors.push('Invalid PMI payment frequency');
      }
    }
  }

  // Validate annual flood insurance if provided
  if (inputs.annualFloodInsurance !== undefined && inputs.annualFloodInsurance !== null) {
    const annualFloodInsurance = Number(inputs.annualFloodInsurance);
    if (isNaN(annualFloodInsurance) || annualFloodInsurance < 0 || annualFloodInsurance > 10000) {
      errors.push('Annual flood insurance must be between $0 and $10,000');
    }

    // Validate flood insurance payment frequency if flood insurance is provided
    if (inputs.floodInsurancePaymentFrequency) {
      const validFloodFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
      if (!validFloodFrequencies.includes(inputs.floodInsurancePaymentFrequency)) {
        errors.push('Invalid flood insurance payment frequency');
      }
    }
  }

  // Validate escrow cushion
  const escrowCushion = Number(inputs.escrowCushion);
  if (isNaN(escrowCushion) || escrowCushion < 0 || escrowCushion > 10000) {
    errors.push('Escrow cushion must be between $0 and $10,000');
  }

  // Validate tax assessment increase
  const taxAssessmentIncrease = Number(inputs.taxAssessmentIncrease);
  if (isNaN(taxAssessmentIncrease) || taxAssessmentIncrease < 0 || taxAssessmentIncrease > 20) {
    errors.push('Tax assessment increase must be between 0% and 20%');
  }

  // Validate insurance rate increase
  const insuranceRateIncrease = Number(inputs.insuranceRateIncrease);
  if (isNaN(insuranceRateIncrease) || insuranceRateIncrease < 0 || insuranceRateIncrease > 30) {
    errors.push('Insurance rate increase must be between 0% and 30%');
  }

  // Validate analysis period
  const analysisPeriod = Number(inputs.analysisPeriod);
  if (isNaN(analysisPeriod) || analysisPeriod < 1 || analysisPeriod > 60) {
    errors.push('Analysis period must be between 1 and 60 months');
  }

  // Validate payment history
  const validPaymentHistory = ['current', 'late-30', 'late-60', 'late-90'];
  if (!validPaymentHistory.includes(inputs.paymentHistory)) {
    errors.push('Invalid payment history status');
  }

  // Validate escrow account type
  const validEscrowAccountTypes = ['required', 'voluntary', 'waived'];
  if (!validEscrowAccountTypes.includes(inputs.escrowAccountType)) {
    errors.push('Invalid escrow account type');
  }

  // Logical consistency checks
  if (propertyValue && loanAmount) {
    if (loanAmount > propertyValue) {
      errors.push('Loan amount cannot exceed property value');
    }
    if (loanAmount > propertyValue * 0.95) {
      errors.push('Loan amount is very high relative to property value - verify accuracy');
    }
  }

  if (monthlyPayment && loanAmount && interestRate && loanTerm) {
    // Rough estimate of monthly payment for validation
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    const estimatedPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    if (Math.abs(monthlyPayment - estimatedPayment) > estimatedPayment * 0.5) {
      errors.push('Monthly payment seems inconsistent with loan terms - verify accuracy');
    }
  }

  if (annualPropertyTax && propertyValue) {
    const taxRate = (annualPropertyTax / propertyValue) * 100;
    if (taxRate > 5) {
      errors.push('Property tax rate seems unusually high - verify accuracy');
    }
    if (taxRate < 0.1) {
      errors.push('Property tax rate seems unusually low - verify accuracy');
    }
  }

  if (annualHomeInsurance && propertyValue) {
    const insuranceRate = (annualHomeInsurance / propertyValue) * 100;
    if (insuranceRate > 2) {
      errors.push('Home insurance rate seems unusually high - verify accuracy');
    }
    if (insuranceRate < 0.1) {
      errors.push('Home insurance rate seems unusually low - verify accuracy');
    }
  }

  if (currentEscrowBalance && escrowCushion) {
    if (currentEscrowBalance < escrowCushion * 0.5) {
      errors.push('Current escrow balance is very low relative to required cushion');
    }
  }

  if (inputs.escrowAccountType === 'waived' && (annualPropertyTax > 0 || annualHomeInsurance > 0)) {
    errors.push('Escrow is waived but property taxes and insurance are still required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateEscrowAnalysisInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      const propertyValue = Number(value);
      if (isNaN(propertyValue)) return 'Property value must be a number';
      if (propertyValue < 50000) return 'Property value must be at least $50,000';
      if (propertyValue > 10000000) return 'Property value cannot exceed $10,000,000';
      break;

    case 'loanAmount':
      const loanAmount = Number(value);
      if (isNaN(loanAmount)) return 'Loan amount must be a number';
      if (loanAmount < 10000) return 'Loan amount must be at least $10,000';
      if (loanAmount > 10000000) return 'Loan amount cannot exceed $10,000,000';
      break;

    case 'interestRate':
      const interestRate = Number(value);
      if (isNaN(interestRate)) return 'Interest rate must be a number';
      if (interestRate < 1) return 'Interest rate must be at least 1%';
      if (interestRate > 20) return 'Interest rate cannot exceed 20%';
      break;

    case 'loanTerm':
      const loanTerm = Number(value);
      if (isNaN(loanTerm)) return 'Loan term must be a number';
      if (loanTerm < 10) return 'Loan term must be at least 10 years';
      if (loanTerm > 50) return 'Loan term cannot exceed 50 years';
      break;

    case 'monthlyPayment':
      const monthlyPayment = Number(value);
      if (isNaN(monthlyPayment)) return 'Monthly payment must be a number';
      if (monthlyPayment < 100) return 'Monthly payment must be at least $100';
      if (monthlyPayment > 50000) return 'Monthly payment cannot exceed $50,000';
      break;

    case 'currentEscrowBalance':
      const currentEscrowBalance = Number(value);
      if (isNaN(currentEscrowBalance)) return 'Current escrow balance must be a number';
      if (currentEscrowBalance < 0) return 'Current escrow balance cannot be negative';
      if (currentEscrowBalance > 100000) return 'Current escrow balance cannot exceed $100,000';
      break;

    case 'annualPropertyTax':
      const annualPropertyTax = Number(value);
      if (isNaN(annualPropertyTax)) return 'Annual property tax must be a number';
      if (annualPropertyTax < 0) return 'Annual property tax cannot be negative';
      if (annualPropertyTax > 100000) return 'Annual property tax cannot exceed $100,000';
      break;

    case 'annualHomeInsurance':
      const annualHomeInsurance = Number(value);
      if (isNaN(annualHomeInsurance)) return 'Annual home insurance must be a number';
      if (annualHomeInsurance < 0) return 'Annual home insurance cannot be negative';
      if (annualHomeInsurance > 50000) return 'Annual home insurance cannot exceed $50,000';
      break;

    case 'annualPMI':
      const annualPMI = Number(value);
      if (isNaN(annualPMI)) return 'Annual PMI must be a number';
      if (annualPMI < 0) return 'Annual PMI cannot be negative';
      if (annualPMI > 10000) return 'Annual PMI cannot exceed $10,000';
      break;

    case 'annualFloodInsurance':
      const annualFloodInsurance = Number(value);
      if (isNaN(annualFloodInsurance)) return 'Annual flood insurance must be a number';
      if (annualFloodInsurance < 0) return 'Annual flood insurance cannot be negative';
      if (annualFloodInsurance > 10000) return 'Annual flood insurance cannot exceed $10,000';
      break;

    case 'escrowCushion':
      const escrowCushion = Number(value);
      if (isNaN(escrowCushion)) return 'Escrow cushion must be a number';
      if (escrowCushion < 0) return 'Escrow cushion cannot be negative';
      if (escrowCushion > 10000) return 'Escrow cushion cannot exceed $10,000';
      break;

    case 'taxAssessmentIncrease':
      const taxAssessmentIncrease = Number(value);
      if (isNaN(taxAssessmentIncrease)) return 'Tax assessment increase must be a number';
      if (taxAssessmentIncrease < 0) return 'Tax assessment increase cannot be negative';
      if (taxAssessmentIncrease > 20) return 'Tax assessment increase cannot exceed 20%';
      break;

    case 'insuranceRateIncrease':
      const insuranceRateIncrease = Number(value);
      if (isNaN(insuranceRateIncrease)) return 'Insurance rate increase must be a number';
      if (insuranceRateIncrease < 0) return 'Insurance rate increase cannot be negative';
      if (insuranceRateIncrease > 30) return 'Insurance rate increase cannot exceed 30%';
      break;

    case 'analysisPeriod':
      const analysisPeriod = Number(value);
      if (isNaN(analysisPeriod)) return 'Analysis period must be a number';
      if (analysisPeriod < 1) return 'Analysis period must be at least 1 month';
      if (analysisPeriod > 60) return 'Analysis period cannot exceed 60 months';
      break;
  }

  return null;
}
