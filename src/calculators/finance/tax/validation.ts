import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTaxInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.filingStatus) {
    errors.push('Filing status is required');
  } else {
    const validStatuses = ['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household', 'qualifying-widow'];
    if (!validStatuses.includes(inputs.filingStatus)) {
      errors.push('Filing status must be one of: single, married-filing-jointly, married-filing-separately, head-of-household, qualifying-widow');
    }
  }

  if (!inputs.taxYear) {
    errors.push('Tax year is required');
  } else {
    const validYears = ['2024', '2023', '2022'];
    if (!validYears.includes(inputs.taxYear)) {
      errors.push('Tax year must be one of: 2024, 2023, 2022');
    }
  }

  // Optional field validations
  if (inputs.age !== undefined) {
    if (inputs.age < 0) {
      errors.push('Age cannot be negative');
    } else if (inputs.age > 120) {
      errors.push('Age cannot exceed 120');
    }
  }

  // Income validations
  if (inputs.wages !== undefined) {
    if (inputs.wages < 0) {
      errors.push('Wages cannot be negative');
    } else if (inputs.wages > 10000000) {
      errors.push('Wages cannot exceed $10,000,000');
    }
  }

  if (inputs.selfEmployment !== undefined) {
    if (inputs.selfEmployment < 0) {
      errors.push('Self-employment income cannot be negative');
    } else if (inputs.selfEmployment > 10000000) {
      errors.push('Self-employment income cannot exceed $10,000,000');
    }
  }

  if (inputs.interest !== undefined) {
    if (inputs.interest < 0) {
      errors.push('Interest income cannot be negative');
    } else if (inputs.interest > 1000000) {
      errors.push('Interest income cannot exceed $1,000,000');
    }
  }

  if (inputs.dividends !== undefined) {
    if (inputs.dividends < 0) {
      errors.push('Dividend income cannot be negative');
    } else if (inputs.dividends > 1000000) {
      errors.push('Dividend income cannot exceed $1,000,000');
    }
  }

  if (inputs.capitalGains !== undefined) {
    if (inputs.capitalGains < 0) {
      errors.push('Capital gains cannot be negative');
    } else if (inputs.capitalGains > 1000000) {
      errors.push('Capital gains cannot exceed $1,000,000');
    }
  }

  if (inputs.rentalIncome !== undefined) {
    if (inputs.rentalIncome < 0) {
      errors.push('Rental income cannot be negative');
    } else if (inputs.rentalIncome > 1000000) {
      errors.push('Rental income cannot exceed $1,000,000');
    }
  }

  if (inputs.businessIncome !== undefined) {
    if (inputs.businessIncome < 0) {
      errors.push('Business income cannot be negative');
    } else if (inputs.businessIncome > 1000000) {
      errors.push('Business income cannot exceed $1,000,000');
    }
  }

  if (inputs.otherIncome !== undefined) {
    if (inputs.otherIncome < 0) {
      errors.push('Other income cannot be negative');
    } else if (inputs.otherIncome > 1000000) {
      errors.push('Other income cannot exceed $1,000,000');
    }
  }

  // Deduction validations
  if (inputs.standardDeduction !== undefined) {
    const validDeductions = ['standard', 'itemized'];
    if (!validDeductions.includes(inputs.standardDeduction)) {
      errors.push('Standard deduction must be one of: standard, itemized');
    }
  }

  if (inputs.stateLocalTaxes !== undefined) {
    if (inputs.stateLocalTaxes < 0) {
      errors.push('State and local taxes cannot be negative');
    } else if (inputs.stateLocalTaxes > 10000) {
      errors.push('State and local taxes cannot exceed $10,000 (SALT cap)');
    }
  }

  if (inputs.mortgageInterest !== undefined) {
    if (inputs.mortgageInterest < 0) {
      errors.push('Mortgage interest cannot be negative');
    } else if (inputs.mortgageInterest > 100000) {
      errors.push('Mortgage interest cannot exceed $100,000');
    }
  }

  if (inputs.charitableContributions !== undefined) {
    if (inputs.charitableContributions < 0) {
      errors.push('Charitable contributions cannot be negative');
    } else if (inputs.charitableContributions > 100000) {
      errors.push('Charitable contributions cannot exceed $100,000');
    }
  }

  if (inputs.medicalExpenses !== undefined) {
    if (inputs.medicalExpenses < 0) {
      errors.push('Medical expenses cannot be negative');
    } else if (inputs.medicalExpenses > 100000) {
      errors.push('Medical expenses cannot exceed $100,000');
    }
  }

  if (inputs.casualtyLosses !== undefined) {
    if (inputs.casualtyLosses < 0) {
      errors.push('Casualty losses cannot be negative');
    } else if (inputs.casualtyLosses > 100000) {
      errors.push('Casualty losses cannot exceed $100,000');
    }
  }

  if (inputs.miscDeductions !== undefined) {
    if (inputs.miscDeductions < 0) {
      errors.push('Miscellaneous deductions cannot be negative');
    } else if (inputs.miscDeductions > 100000) {
      errors.push('Miscellaneous deductions cannot exceed $100,000');
    }
  }

  // Above-the-line deduction validations
  if (inputs.studentLoanInterest !== undefined) {
    if (inputs.studentLoanInterest < 0) {
      errors.push('Student loan interest cannot be negative');
    } else if (inputs.studentLoanInterest > 2500) {
      errors.push('Student loan interest cannot exceed $2,500');
    }
  }

  if (inputs.iraContribution !== undefined) {
    if (inputs.iraContribution < 0) {
      errors.push('IRA contribution cannot be negative');
    } else if (inputs.iraContribution > 7000) {
      errors.push('IRA contribution cannot exceed $7,000');
    }
  }

  if (inputs.hsaContribution !== undefined) {
    if (inputs.hsaContribution < 0) {
      errors.push('HSA contribution cannot be negative');
    } else if (inputs.hsaContribution > 4150) {
      errors.push('HSA contribution cannot exceed $4,150');
    }
  }

  if (inputs.selfEmploymentTax !== undefined) {
    if (inputs.selfEmploymentTax < 0) {
      errors.push('Self-employment tax cannot be negative');
    } else if (inputs.selfEmploymentTax > 100000) {
      errors.push('Self-employment tax cannot exceed $100,000');
    }
  }

  if (inputs.selfEmploymentHealth !== undefined) {
    if (inputs.selfEmploymentHealth < 0) {
      errors.push('Self-employment health insurance cannot be negative');
    } else if (inputs.selfEmploymentHealth > 100000) {
      errors.push('Self-employment health insurance cannot exceed $100,000');
    }
  }

  if (inputs.alimonyPaid !== undefined) {
    if (inputs.alimonyPaid < 0) {
      errors.push('Alimony paid cannot be negative');
    } else if (inputs.alimonyPaid > 100000) {
      errors.push('Alimony paid cannot exceed $100,000');
    }
  }

  // Credit validations
  if (inputs.childTaxCredit !== undefined) {
    if (inputs.childTaxCredit < 0) {
      errors.push('Child tax credit cannot be negative');
    } else if (inputs.childTaxCredit > 10) {
      errors.push('Child tax credit cannot exceed 10 children');
    }
  }

  if (inputs.childCareCredit !== undefined) {
    if (inputs.childCareCredit < 0) {
      errors.push('Child care credit cannot be negative');
    } else if (inputs.childCareCredit > 10000) {
      errors.push('Child care credit cannot exceed $10,000');
    }
  }

  if (inputs.earnedIncomeCredit !== undefined) {
    const validEIC = ['yes', 'no'];
    if (!validEIC.includes(inputs.earnedIncomeCredit)) {
      errors.push('Earned income credit must be one of: yes, no');
    }
  }

  if (inputs.educationCredits !== undefined) {
    if (inputs.educationCredits < 0) {
      errors.push('Education credits cannot be negative');
    } else if (inputs.educationCredits > 10000) {
      errors.push('Education credits cannot exceed $10,000');
    }
  }

  if (inputs.saversCredit !== undefined) {
    const validSavers = ['yes', 'no'];
    if (!validSavers.includes(inputs.saversCredit)) {
      errors.push('Saver\'s credit must be one of: yes, no');
    }
  }

  if (inputs.adoptionCredit !== undefined) {
    if (inputs.adoptionCredit < 0) {
      errors.push('Adoption credit cannot be negative');
    } else if (inputs.adoptionCredit > 100000) {
      errors.push('Adoption credit cannot exceed $100,000');
    }
  }

  if (inputs.foreignTaxCredit !== undefined) {
    if (inputs.foreignTaxCredit < 0) {
      errors.push('Foreign tax credit cannot be negative');
    } else if (inputs.foreignTaxCredit > 100000) {
      errors.push('Foreign tax credit cannot exceed $100,000');
    }
  }

  // State tax validations
  if (inputs.stateOfResidence !== undefined) {
    const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
    if (!validStates.includes(inputs.stateOfResidence)) {
      errors.push('Invalid state selection');
    }
  }

  if (inputs.stateIncome !== undefined) {
    if (inputs.stateIncome < 0) {
      errors.push('State income cannot be negative');
    } else if (inputs.stateIncome > 10000000) {
      errors.push('State income cannot exceed $10,000,000');
    }
  }

  if (inputs.stateDeductions !== undefined) {
    if (inputs.stateDeductions < 0) {
      errors.push('State deductions cannot be negative');
    } else if (inputs.stateDeductions > 100000) {
      errors.push('State deductions cannot exceed $100,000');
    }
  }

  if (inputs.stateCredits !== undefined) {
    if (inputs.stateCredits < 0) {
      errors.push('State credits cannot be negative');
    } else if (inputs.stateCredits > 10000) {
      errors.push('State credits cannot exceed $10,000');
    }
  }

  // Withholding and payment validations
  if (inputs.federalWithholding !== undefined) {
    if (inputs.federalWithholding < 0) {
      errors.push('Federal withholding cannot be negative');
    } else if (inputs.federalWithholding > 1000000) {
      errors.push('Federal withholding cannot exceed $1,000,000');
    }
  }

  if (inputs.stateWithholding !== undefined) {
    if (inputs.stateWithholding < 0) {
      errors.push('State withholding cannot be negative');
    } else if (inputs.stateWithholding > 1000000) {
      errors.push('State withholding cannot exceed $1,000,000');
    }
  }

  if (inputs.estimatedPayments !== undefined) {
    if (inputs.estimatedPayments < 0) {
      errors.push('Estimated payments cannot be negative');
    } else if (inputs.estimatedPayments > 1000000) {
      errors.push('Estimated payments cannot exceed $1,000,000');
    }
  }

  if (inputs.otherPayments !== undefined) {
    if (inputs.otherPayments < 0) {
      errors.push('Other payments cannot be negative');
    } else if (inputs.otherPayments > 1000000) {
      errors.push('Other payments cannot exceed $1,000,000');
    }
  }

  // AMT validations
  if (inputs.amtIncome !== undefined) {
    if (inputs.amtIncome < 0) {
      errors.push('AMT income cannot be negative');
    } else if (inputs.amtIncome > 10000000) {
      errors.push('AMT income cannot exceed $10,000,000');
    }
  }

  if (inputs.amtPreferences !== undefined) {
    if (inputs.amtPreferences < 0) {
      errors.push('AMT preferences cannot be negative');
    } else if (inputs.amtPreferences > 1000000) {
      errors.push('AMT preferences cannot exceed $1,000,000');
    }
  }

  // Analysis type validation
  if (inputs.analysisType !== undefined) {
    const validTypes = ['basic', 'detailed', 'optimization', 'comparison'];
    if (!validTypes.includes(inputs.analysisType)) {
      errors.push('Analysis type must be one of: basic, detailed, optimization, comparison');
    }
  }

  // Logical validation warnings
  const grossIncome = (inputs.wages || 0) + (inputs.selfEmployment || 0) + 
                     (inputs.interest || 0) + (inputs.dividends || 0) + 
                     (inputs.capitalGains || 0) + (inputs.rentalIncome || 0) + 
                     (inputs.businessIncome || 0) + (inputs.otherIncome || 0);
  
  if (grossIncome === 0) {
    warnings.push('No income sources specified - tax calculation will be zero');
  }

  if (inputs.iraContribution && inputs.iraContribution < 7000) {
    warnings.push('Consider maximizing IRA contribution for additional tax savings');
  }

  if (inputs.hsaContribution && inputs.hsaContribution < 4150) {
    warnings.push('Consider maximizing HSA contribution for additional tax savings');
  }

  if (inputs.stateLocalTaxes && inputs.stateLocalTaxes >= 10000) {
    warnings.push('You have reached the SALT deduction cap of $10,000');
  }

  if (inputs.federalWithholding && inputs.federalWithholding > grossIncome * 0.5) {
    warnings.push('Federal withholding appears unusually high relative to income');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
