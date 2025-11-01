import { ValidationResult } from '../../../types/calculator';

/**
 * Validate biweekly mortgage calculator inputs
 */
export function validateBiweeklyMortgageInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = ['loanAmount', 'interestRate', 'loanTerm', 'startDate'];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Loan amount validation
  if (inputs.loanAmount < 10000) {
    errors.push('Loan amount must be at least $10,000');
  } else if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount cannot exceed $10 million');
  }

  // Interest rate validation
  if (inputs.interestRate < 0.1) {
    errors.push('Interest rate must be at least 0.1%');
  } else if (inputs.interestRate > 20) {
    errors.push('Interest rate cannot exceed 20%');
  }

  // Loan term validation
  if (inputs.loanTerm < 1) {
    errors.push('Loan term must be at least 1 year');
  } else if (inputs.loanTerm > 50) {
    errors.push('Loan term cannot exceed 50 years');
  }

  // Start date validation
  if (inputs.startDate) {
    const startDate = new Date(inputs.startDate);
    if (isNaN(startDate.getTime())) {
      errors.push('Start date must be a valid date');
    } else {
      const today = new Date();
      if (startDate < today) {
        warnings.push('Start date is in the past - using current date for calculations');
      }
    }
  }

  // Optional field validation
  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  } else if (inputs.propertyTax > 100000) {
    errors.push('Property tax cannot exceed $100,000');
  }

  if (inputs.homeInsurance !== undefined && inputs.homeInsurance < 0) {
    errors.push('Home insurance cannot be negative');
  } else if (inputs.homeInsurance > 10000) {
    errors.push('Home insurance cannot exceed $10,000');
  }

  if (inputs.pmi !== undefined && inputs.pmi < 0) {
    errors.push('PMI cannot be negative');
  } else if (inputs.pmi > 500) {
    errors.push('PMI cannot exceed $500 per month');
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  } else if (inputs.hoaFees > 1000) {
    errors.push('HOA fees cannot exceed $1,000 per month');
  }

  // Business rule validation
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  // Check if loan is feasible
  if (monthlyRate > 0) {
    const maxPayment = inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const maxAffordablePayment = inputs.loanAmount * 0.1; // 10% of loan amount as max payment
    
    if (maxPayment > maxAffordablePayment) {
      warnings.push('Monthly payment may be very high relative to loan amount');
    }
  }

  // Property tax validation
  if (inputs.propertyTax > 0) {
    const propertyTaxRate = (inputs.propertyTax / inputs.loanAmount) * 100;
    if (propertyTaxRate > 5) {
      warnings.push('Property tax rate appears very high (>5% of loan amount)');
    } else if (propertyTaxRate < 0.1) {
      warnings.push('Property tax rate appears very low (<0.1% of loan amount)');
    }
  }

  // Insurance validation
  if (inputs.homeInsurance > 0) {
    const insuranceRate = (inputs.homeInsurance / inputs.loanAmount) * 100;
    if (insuranceRate > 2) {
      warnings.push('Home insurance rate appears very high (>2% of loan amount)');
    } else if (insuranceRate < 0.1) {
      warnings.push('Home insurance rate appears very low (<0.1% of loan amount)');
    }
  }

  // PMI validation
  if (inputs.pmi > 0) {
    const pmiRate = (inputs.pmi * 12 / inputs.loanAmount) * 100;
    if (pmiRate > 1) {
      warnings.push('PMI rate appears very high (>1% of loan amount)');
    }
  }

  // HOA fees validation
  if (inputs.hoaFees > 0) {
    const hoaRate = (inputs.hoaFees * 12 / inputs.loanAmount) * 100;
    if (hoaRate > 2) {
      warnings.push('HOA fees appear very high (>2% of loan amount)');
    }
  }

  // Loan term business rules
  if (inputs.loanTerm < 5) {
    warnings.push('Very short loan terms may have higher interest rates');
  }

  if (inputs.loanTerm > 30) {
    warnings.push('Very long loan terms may result in higher total interest costs');
  }

  // Interest rate business rules
  if (inputs.interestRate < 2) {
    warnings.push('Very low interest rates may indicate special financing or promotional rates');
  }

  if (inputs.interestRate > 10) {
    warnings.push('High interest rates may indicate subprime lending or special circumstances');
  }

  // Cross-field validation
  const totalMonthlyObligations = calculateTotalMonthlyObligations(inputs);
  const estimatedMonthlyPayment = estimateMonthlyPayment(inputs);
  
  if (totalMonthlyObligations > estimatedMonthlyPayment * 0.5) {
    warnings.push('Total monthly obligations (taxes, insurance, PMI, HOA) represent a significant portion of estimated mortgage payment');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Calculate total monthly obligations
 */
function calculateTotalMonthlyObligations(inputs: Record<string, any>): number {
  const propertyTax = (inputs.propertyTax || 0) / 12;
  const homeInsurance = (inputs.homeInsurance || 0) / 12;
  const pmi = inputs.pmi || 0;
  const hoaFees = inputs.hoaFees || 0;
  
  return propertyTax + homeInsurance + pmi + hoaFees;
}

/**
 * Estimate monthly mortgage payment
 */
function estimateMonthlyPayment(inputs: Record<string, any>): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  if (monthlyRate === 0) {
    return inputs.loanAmount / totalPayments;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, totalPayments);
  return inputs.loanAmount * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Validate biweekly payment feasibility
 */
export function validateBiweeklyPaymentFeasibility(
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  monthlyIncome: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = estimateMonthlyPayment({ loanAmount, interestRate, loanTerm });
  const biweeklyPayment = monthlyPayment / 2;

  // DebtToIncome ratio check
  const debtToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;
  
  if (debtToIncomeRatio > 43) {
    errors.push('DebtToIncome ratio exceeds recommended 43% limit');
  } else if (debtToIncomeRatio > 28) {
    warnings.push('DebtToIncome ratio is above recommended 28% limit');
  }

  // Biweekly payment affordability check
  const biweeklyIncome = monthlyIncome / 2;
  const biweeklyPaymentRatio = (biweeklyPayment / biweeklyIncome) * 100;
  
  if (biweeklyPaymentRatio > 50) {
    warnings.push('Biweekly payment represents more than 50% of biweekly income');
  }

  // Emergency fund consideration
  const annualPayment = monthlyPayment * 12;
  const recommendedEmergencyFund = annualPayment * 0.25; // 3 months of payments
  
  if (monthlyIncome * 3 < recommendedEmergencyFund) {
    warnings.push('Consider building emergency fund before switching to biweekly payments');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate loan payoff acceleration
 */
export function validateLoanPayoffAcceleration(
  currentBalance: number,
  monthlyPayment: number,
  interestRate: number,
  extraPayment: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Extra payment validation
  if (extraPayment < 0) {
    errors.push('Extra payment cannot be negative');
  }

  if (extraPayment > monthlyPayment * 0.5) {
    warnings.push('Extra payment is more than 50% of regular payment - consider refinancing');
  }

  // Prepayment penalty check
  const monthlyRate = interestRate / 100 / 12;
  const remainingPayments = Math.log(monthlyPayment / (monthlyPayment - currentBalance * monthlyRate)) / Math.log(1 + monthlyRate);
  
  if (remainingPayments < 60) {
    warnings.push('Loan has less than 5 years remaining - extra payments may have limited impact');
  }

  // Interest rate consideration
  if (interestRate < 4) {
    warnings.push('Low interest rate - consider investing extra payments instead');
  }

  if (interestRate > 8) {
    warnings.push('High interest rate - extra payments will provide significant savings');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate escrow account requirements
 */
export function validateEscrowRequirements(
  loanAmount: number,
  downPayment: number,
  propertyTax: number,
  homeInsurance: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const downPaymentPercent = (downPayment / loanAmount) * 100;
  
  // Escrow requirements based on down payment
  if (downPaymentPercent < 20) {
    warnings.push('Down payment less than 20% - escrow account likely required');
  }

  // Property tax escrow validation
  if (propertyTax > 0) {
    const monthlyTax = propertyTax / 12;
    if (monthlyTax > 500) {
      warnings.push('High property taxes - ensure escrow account is properly funded');
    }
  }

  // Insurance escrow validation
  if (homeInsurance > 0) {
    const monthlyInsurance = homeInsurance / 12;
    if (monthlyInsurance > 200) {
      warnings.push('High insurance costs - ensure escrow account is properly funded');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
