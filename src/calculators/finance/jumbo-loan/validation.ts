import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateJumboLoanInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount) {
    errors.push('Loan amount is required');
  } else if (typeof inputs.loanAmount !== 'number' || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be a positive number');
  } else if (inputs.loanAmount < 548250) {
    errors.push('Loan amount must be at least $548,250 for jumbo loans');
  } else if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount must be $10,000,000 or less');
  }

  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  } else if (typeof inputs.interestRate !== 'number' || inputs.interestRate <= 0) {
    errors.push('Interest rate must be a positive number');
  } else if (inputs.interestRate < 0.1 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0.1% and 20%');
  }

  if (!inputs.loanTerm) {
    errors.push('Loan term is required');
  } else if (typeof inputs.loanTerm !== 'number' || inputs.loanTerm <= 0) {
    errors.push('Loan term must be a positive number');
  } else if (inputs.loanTerm < 5 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 5 and 50 years');
  }

  if (!inputs.downPayment) {
    errors.push('Down payment is required');
  } else if (typeof inputs.downPayment !== 'number' || inputs.downPayment < 0) {
    errors.push('Down payment must be a non-negative number');
  } else if (inputs.downPayment > 5000000) {
    errors.push('Down payment must be $5,000,000 or less');
  }

  // Property value validation
  if (inputs.propertyValue) {
    if (typeof inputs.propertyValue !== 'number' || inputs.propertyValue <= 0) {
      errors.push('Property value must be a positive number');
    } else if (inputs.propertyValue < 100000 || inputs.propertyValue > 20000000) {
      errors.push('Property value must be between $100,000 and $20,000,000');
    }
  }

  // Income validation
  if (inputs.annualIncome) {
    if (typeof inputs.annualIncome !== 'number' || inputs.annualIncome <= 0) {
      errors.push('Annual income must be a positive number');
    } else if (inputs.annualIncome < 50000 || inputs.annualIncome > 5000000) {
      errors.push('Annual income must be between $50,000 and $5,000,000');
    }
  }

  // Monthly debts validation
  if (inputs.monthlyDebts) {
    if (typeof inputs.monthlyDebts !== 'number' || inputs.monthlyDebts < 0) {
      errors.push('Monthly debts must be a non-negative number');
    } else if (inputs.monthlyDebts > 50000) {
      errors.push('Monthly debts must be $50,000 or less');
    }
  }

  // Credit score validation
  if (inputs.creditScore) {
    if (typeof inputs.creditScore !== 'number' || inputs.creditScore <= 0) {
      errors.push('Credit score must be a positive number');
    } else if (inputs.creditScore < 300 || inputs.creditScore > 850) {
      errors.push('Credit score must be between 300 and 850');
    }
  }

  // Reserves validation
  if (inputs.reserves) {
    if (typeof inputs.reserves !== 'number' || inputs.reserves < 0) {
      errors.push('Reserves must be a non-negative number');
    } else if (inputs.reserves > 10000000) {
      errors.push('Reserves must be $10,000,000 or less');
    }
  }

  // ARM period validation
  if (inputs.armPeriod) {
    if (typeof inputs.armPeriod !== 'number' || inputs.armPeriod <= 0) {
      errors.push('ARM period must be a positive number');
    } else if (inputs.armPeriod < 1 || inputs.armPeriod > 30) {
      errors.push('ARM period must be between 1 and 30 years');
    }
  }

  // Points validation
  if (inputs.points) {
    if (typeof inputs.points !== 'number' || inputs.points < 0) {
      errors.push('Points must be a non-negative number');
    } else if (inputs.points > 5) {
      errors.push('Points must be 5 or less');
    }
  }

  // Closing costs validation
  if (inputs.closingCosts) {
    if (typeof inputs.closingCosts !== 'number' || inputs.closingCosts < 0) {
      errors.push('Closing costs must be a non-negative number');
    } else if (inputs.closingCosts > 100000) {
      errors.push('Closing costs must be $100,000 or less');
    }
  }

  // Property taxes validation
  if (inputs.propertyTaxes) {
    if (typeof inputs.propertyTaxes !== 'number' || inputs.propertyTaxes < 0) {
      errors.push('Property taxes must be a non-negative number');
    } else if (inputs.propertyTaxes > 100000) {
      errors.push('Property taxes must be $100,000 or less');
    }
  }

  // Home insurance validation
  if (inputs.homeInsurance) {
    if (typeof inputs.homeInsurance !== 'number' || inputs.homeInsurance < 0) {
      errors.push('Home insurance must be a non-negative number');
    } else if (inputs.homeInsurance > 50000) {
      errors.push('Home insurance must be $50,000 or less');
    }
  }

  // PMI validation
  if (inputs.pmi) {
    if (typeof inputs.pmi !== 'number' || inputs.pmi < 0) {
      errors.push('PMI must be a non-negative number');
    } else if (inputs.pmi > 1000) {
      errors.push('PMI must be $1,000 or less');
    }
  }

  // HOA fees validation
  if (inputs.hoaFees) {
    if (typeof inputs.hoaFees !== 'number' || inputs.hoaFees < 0) {
      errors.push('HOA fees must be a non-negative number');
    } else if (inputs.hoaFees > 2000) {
      errors.push('HOA fees must be $2,000 or less');
    }
  }

  // Years employed validation
  if (inputs.yearsEmployed) {
    if (typeof inputs.yearsEmployed !== 'number' || inputs.yearsEmployed < 0) {
      errors.push('Years employed must be a non-negative number');
    } else if (inputs.yearsEmployed > 50) {
      errors.push('Years employed must be 50 or less');
    }
  }

  // Liquid assets validation
  if (inputs.liquidAssets) {
    if (typeof inputs.liquidAssets !== 'number' || inputs.liquidAssets < 0) {
      errors.push('Liquid assets must be a non-negative number');
    } else if (inputs.liquidAssets > 10000000) {
      errors.push('Liquid assets must be $10,000,000 or less');
    }
  }

  // Investment assets validation
  if (inputs.investmentAssets) {
    if (typeof inputs.investmentAssets !== 'number' || inputs.investmentAssets < 0) {
      errors.push('Investment assets must be a non-negative number');
    } else if (inputs.investmentAssets > 10000000) {
      errors.push('Investment assets must be $10,000,000 or less');
    }
  }

  // Target DTI validation
  if (inputs.debtToIncomeRatio) {
    if (typeof inputs.debtToIncomeRatio !== 'number' || inputs.debtToIncomeRatio <= 0) {
      errors.push('Target DTI ratio must be a positive number');
    } else if (inputs.debtToIncomeRatio < 20 || inputs.debtToIncomeRatio > 50) {
      errors.push('Target DTI ratio must be between 20% and 50%');
    }
  }

  // Target LTV validation
  if (inputs.loanToValueRatio) {
    if (typeof inputs.loanToValueRatio !== 'number' || inputs.loanToValueRatio <= 0) {
      errors.push('Target LTV ratio must be a positive number');
    } else if (inputs.loanToValueRatio < 50 || inputs.loanToValueRatio > 95) {
      errors.push('Target LTV ratio must be between 50% and 95%');
    }
  }

  // Enum validation
  const validPropertyTypes = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Investment Property'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Property type must be one of: ' + validPropertyTypes.join(', '));
  }

  const validOccupancyTypes = ['Primary Residence', 'Second Home', 'Investment Property'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Occupancy type must be one of: ' + validOccupancyTypes.join(', '));
  }

  const validLoanTypes = ['Fixed Rate', 'Adjustable Rate', 'Interest Only', 'Hybrid ARM'];
  if (inputs.loanType && !validLoanTypes.includes(inputs.loanType)) {
    errors.push('Loan type must be one of: ' + validLoanTypes.join(', '));
  }

  const validIncomeVerifications = ['Full Documentation', 'Stated Income', 'Bank Statement', 'Asset Depletion'];
  if (inputs.incomeVerification && !validIncomeVerifications.includes(inputs.incomeVerification)) {
    errors.push('Income verification must be one of: ' + validIncomeVerifications.join(', '));
  }

  const validEmploymentTypes = ['W-2 Employee', 'Self-Employed', 'Business Owner', 'Retired', 'Other'];
  if (inputs.employmentType && !validEmploymentTypes.includes(inputs.employmentType)) {
    errors.push('Employment type must be one of: ' + validEmploymentTypes.join(', '));
  }

  const validMarketConditions = ['Favorable', 'Normal', 'Tight', 'Very Tight'];
  if (inputs.marketConditions && !validMarketConditions.includes(inputs.marketConditions)) {
    errors.push('Market conditions must be one of: ' + validMarketConditions.join(', '));
  }

  const validLenderTypes = ['Traditional Bank', 'Credit Union', 'Mortgage Banker', 'Portfolio Lender', 'Private Lender'];
  if (inputs.lenderType && !validLenderTypes.includes(inputs.lenderType)) {
    errors.push('Lender type must be one of: ' + validLenderTypes.join(', '));
  }

  // Logical validation
  if (inputs.loanAmount && inputs.downPayment && inputs.propertyValue) {
    const calculatedLTV = ((inputs.loanAmount + inputs.downPayment) / inputs.propertyValue) * 100;
    if (calculatedLTV > 100) {
      errors.push('Loan amount plus down payment cannot exceed property value');
    }
  }

  if (inputs.loanAmount && inputs.downPayment) {
    const totalCost = inputs.loanAmount + inputs.downPayment;
    if (inputs.propertyValue && totalCost > inputs.propertyValue * 1.05) {
      errors.push('Total loan cost should not significantly exceed property value');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateJumboLoanInput(field: string, value: any): string | null {
  switch (field) {
    case 'loanAmount':
      if (!value) return 'Loan amount is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 548250) return 'Must be at least $548,250 for jumbo loans';
      if (value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 0.1 || value > 20) return 'Must be between 0.1% and 20%';
      break;

    case 'loanTerm':
      if (!value) return 'Loan term is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 5 || value > 50) return 'Must be between 5 and 50 years';
      break;

    case 'downPayment':
      if (!value) return 'Down payment is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'propertyValue':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 100000 || value > 20000000)) return 'Must be between $100,000 and $20,000,000';
      break;

    case 'annualIncome':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 50000 || value > 5000000)) return 'Must be between $50,000 and $5,000,000';
      break;

    case 'monthlyDebts':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 50000) return 'Must be $50,000 or less';
      break;

    case 'creditScore':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 300 || value > 850)) return 'Must be between 300 and 850';
      break;

    case 'reserves':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'armPeriod':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 1 || value > 30)) return 'Must be between 1 and 30 years';
      break;

    case 'points':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 5) return 'Must be 5 or less';
      break;

    case 'closingCosts':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 100000) return 'Must be $100,000 or less';
      break;

    case 'propertyTaxes':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 100000) return 'Must be $100,000 or less';
      break;

    case 'homeInsurance':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 50000) return 'Must be $50,000 or less';
      break;

    case 'pmi':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 1000) return 'Must be $1,000 or less';
      break;

    case 'hoaFees':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 2000) return 'Must be $2,000 or less';
      break;

    case 'yearsEmployed':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 50) return 'Must be 50 or less';
      break;

    case 'liquidAssets':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'investmentAssets':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'debtToIncomeRatio':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 20 || value > 50)) return 'Must be between 20% and 50%';
      break;

    case 'loanToValueRatio':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 50 || value > 95)) return 'Must be between 50% and 95%';
      break;
  }

  return null;
}
