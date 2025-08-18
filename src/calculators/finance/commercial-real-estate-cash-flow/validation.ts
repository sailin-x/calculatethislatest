import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCashFlowInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyType', 'totalUnits', 'occupiedUnits', 'averageRent', 'otherIncome',
    'propertyTax', 'insurance', 'utilities', 'maintenance', 'propertyManagement',
    'hoaFees', 'otherExpenses', 'purchasePrice', 'downPayment', 'loanAmount',
    'interestRate', 'loanTerm', 'closingCosts', 'renovationCosts', 'appreciationRate',
    'inflationRate', 'taxRate', 'depreciationPeriod'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Total units validation
  const totalUnits = inputs.totalUnits as number;
  if (typeof totalUnits !== 'number' || isNaN(totalUnits)) {
    errors.push('Total units must be a valid number');
  } else if (totalUnits < 1 || totalUnits > 10000) {
    errors.push('Total units must be between 1 and 10,000');
  }

  // Occupied units validation
  const occupiedUnits = inputs.occupiedUnits as number;
  if (typeof occupiedUnits !== 'number' || isNaN(occupiedUnits)) {
    errors.push('Occupied units must be a valid number');
  } else if (occupiedUnits < 0 || occupiedUnits > 10000) {
    errors.push('Occupied units must be between 0 and 10,000');
  }

  // Average rent validation
  const averageRent = inputs.averageRent as number;
  if (typeof averageRent !== 'number' || isNaN(averageRent)) {
    errors.push('Average rent must be a valid number');
  } else if (averageRent < 100 || averageRent > 50000) {
    errors.push('Average rent must be between $100 and $50,000 per month');
  }

  // Other income validation
  const otherIncome = inputs.otherIncome as number;
  if (typeof otherIncome !== 'number' || isNaN(otherIncome)) {
    errors.push('Other income must be a valid number');
  } else if (otherIncome < 0 || otherIncome > 100000) {
    errors.push('Other income must be between $0 and $100,000 per month');
  }

  // Property tax validation
  const propertyTax = inputs.propertyTax as number;
  if (typeof propertyTax !== 'number' || isNaN(propertyTax)) {
    errors.push('Property tax must be a valid number');
  } else if (propertyTax < 0 || propertyTax > 1000000) {
    errors.push('Property tax must be between $0 and $1,000,000 per year');
  }

  // Insurance validation
  const insurance = inputs.insurance as number;
  if (typeof insurance !== 'number' || isNaN(insurance)) {
    errors.push('Insurance must be a valid number');
  } else if (insurance < 0 || insurance > 500000) {
    errors.push('Insurance must be between $0 and $500,000 per year');
  }

  // Utilities validation
  const utilities = inputs.utilities as number;
  if (typeof utilities !== 'number' || isNaN(utilities)) {
    errors.push('Utilities must be a valid number');
  } else if (utilities < 0 || utilities > 100000) {
    errors.push('Utilities must be between $0 and $100,000 per month');
  }

  // Maintenance validation
  const maintenance = inputs.maintenance as number;
  if (typeof maintenance !== 'number' || isNaN(maintenance)) {
    errors.push('Maintenance must be a valid number');
  } else if (maintenance < 0 || maintenance > 100000) {
    errors.push('Maintenance must be between $0 and $100,000 per month');
  }

  // Property management validation
  const propertyManagement = inputs.propertyManagement as number;
  if (typeof propertyManagement !== 'number' || isNaN(propertyManagement)) {
    errors.push('Property management must be a valid number');
  } else if (propertyManagement < 0 || propertyManagement > 20) {
    errors.push('Property management must be between 0% and 20%');
  }

  // HOA fees validation
  const hoaFees = inputs.hoaFees as number;
  if (typeof hoaFees !== 'number' || isNaN(hoaFees)) {
    errors.push('HOA fees must be a valid number');
  } else if (hoaFees < 0 || hoaFees > 50000) {
    errors.push('HOA fees must be between $0 and $50,000 per month');
  }

  // Other expenses validation
  const otherExpenses = inputs.otherExpenses as number;
  if (typeof otherExpenses !== 'number' || isNaN(otherExpenses)) {
    errors.push('Other expenses must be a valid number');
  } else if (otherExpenses < 0 || otherExpenses > 100000) {
    errors.push('Other expenses must be between $0 and $100,000 per month');
  }

  // Purchase price validation
  const purchasePrice = inputs.purchasePrice as number;
  if (typeof purchasePrice !== 'number' || isNaN(purchasePrice)) {
    errors.push('Purchase price must be a valid number');
  } else if (purchasePrice < 100000 || purchasePrice > 100000000) {
    errors.push('Purchase price must be between $100,000 and $100,000,000');
  }

  // Down payment validation
  const downPayment = inputs.downPayment as number;
  if (typeof downPayment !== 'number' || isNaN(downPayment)) {
    errors.push('Down payment must be a valid number');
  } else if (downPayment < 20000 || downPayment > 20000000) {
    errors.push('Down payment must be between $20,000 and $20,000,000');
  }

  // Loan amount validation
  const loanAmount = inputs.loanAmount as number;
  if (typeof loanAmount !== 'number' || isNaN(loanAmount)) {
    errors.push('Loan amount must be a valid number');
  } else if (loanAmount < 0 || loanAmount > 80000000) {
    errors.push('Loan amount must be between $0 and $80,000,000');
  }

  // Interest rate validation
  const interestRate = inputs.interestRate as number;
  if (typeof interestRate !== 'number' || isNaN(interestRate)) {
    errors.push('Interest rate must be a valid number');
  } else if (interestRate < 1 || interestRate > 15) {
    errors.push('Interest rate must be between 1% and 15%');
  }

  // Loan term validation
  const loanTerm = inputs.loanTerm as number;
  if (typeof loanTerm !== 'number' || isNaN(loanTerm)) {
    errors.push('Loan term must be a valid number');
  } else if (loanTerm < 5 || loanTerm > 30) {
    errors.push('Loan term must be between 5 and 30 years');
  }

  // Closing costs validation
  const closingCosts = inputs.closingCosts as number;
  if (typeof closingCosts !== 'number' || isNaN(closingCosts)) {
    errors.push('Closing costs must be a valid number');
  } else if (closingCosts < 0 || closingCosts > 1000000) {
    errors.push('Closing costs must be between $0 and $1,000,000');
  }

  // Renovation costs validation
  const renovationCosts = inputs.renovationCosts as number;
  if (typeof renovationCosts !== 'number' || isNaN(renovationCosts)) {
    errors.push('Renovation costs must be a valid number');
  } else if (renovationCosts < 0 || renovationCosts > 5000000) {
    errors.push('Renovation costs must be between $0 and $5,000,000');
  }

  // Appreciation rate validation
  const appreciationRate = inputs.appreciationRate as number;
  if (typeof appreciationRate !== 'number' || isNaN(appreciationRate)) {
    errors.push('Appreciation rate must be a valid number');
  } else if (appreciationRate < -10 || appreciationRate > 15) {
    errors.push('Appreciation rate must be between -10% and 15%');
  }

  // Inflation rate validation
  const inflationRate = inputs.inflationRate as number;
  if (typeof inflationRate !== 'number' || isNaN(inflationRate)) {
    errors.push('Inflation rate must be a valid number');
  } else if (inflationRate < 0 || inflationRate > 10) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  // Tax rate validation
  const taxRate = inputs.taxRate as number;
  if (typeof taxRate !== 'number' || isNaN(taxRate)) {
    errors.push('Tax rate must be a valid number');
  } else if (taxRate < 0 || taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  // Depreciation period validation
  const depreciationPeriod = inputs.depreciationPeriod as number;
  if (typeof depreciationPeriod !== 'number' || isNaN(depreciationPeriod)) {
    errors.push('Depreciation period must be a valid number');
  } else if (depreciationPeriod < 15 || depreciationPeriod > 39) {
    errors.push('Depreciation period must be between 15 and 39 years');
  }

  // Property type validation
  const validPropertyTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use', 'apartment', 'self-storage'];
  const propertyType = inputs.propertyType as string;
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Logical validation
  if (occupiedUnits > totalUnits) {
    errors.push('Occupied units cannot exceed total units');
  }

  if (downPayment + loanAmount !== purchasePrice) {
    errors.push('Down payment plus loan amount should equal purchase price');
  }

  if (downPayment > purchasePrice) {
    errors.push('Down payment cannot exceed purchase price');
  }

  if (loanAmount > purchasePrice) {
    errors.push('Loan amount cannot exceed purchase price');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Quick validation for real-time input checking
export function quickValidateCashFlowInput(field: string, value: any): string | null {
  switch (field) {
    case 'totalUnits':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Total units must be a valid number';
      }
      if (value < 1 || value > 10000) {
        return 'Total units must be between 1 and 10,000';
      }
      break;

    case 'occupiedUnits':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Occupied units must be a valid number';
      }
      if (value < 0 || value > 10000) {
        return 'Occupied units must be between 0 and 10,000';
      }
      break;

    case 'averageRent':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Average rent must be a valid number';
      }
      if (value < 100 || value > 50000) {
        return 'Average rent must be between $100 and $50,000 per month';
      }
      break;

    case 'purchasePrice':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Purchase price must be a valid number';
      }
      if (value < 100000 || value > 100000000) {
        return 'Purchase price must be between $100,000 and $100,000,000';
      }
      break;

    case 'downPayment':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Down payment must be a valid number';
      }
      if (value < 20000 || value > 20000000) {
        return 'Down payment must be between $20,000 and $20,000,000';
      }
      break;

    case 'loanAmount':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Loan amount must be a valid number';
      }
      if (value < 0 || value > 80000000) {
        return 'Loan amount must be between $0 and $80,000,000';
      }
      break;

    case 'interestRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Interest rate must be a valid number';
      }
      if (value < 1 || value > 15) {
        return 'Interest rate must be between 1% and 15%';
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
  }

  return null;
}
