import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateStudentLoanInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount is required and must be greater than 0');
  } else if (inputs.loanAmount > 1000000) {
    errors.push('Loan amount must be between $0 and $1,000,000');
  }

  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.push('Interest rate is required and cannot be negative');
  } else if (inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push('Loan term is required and must be at least 1 year');
  } else if (inputs.loanTerm > 30) {
    errors.push('Loan term must be between 1 and 30 years');
  }

  // Optional field validations
  if (inputs.loanType !== undefined) {
    const validTypes = ['federal-subsidized', 'federal-unsubsidized', 'federal-plus', 'private', 'consolidated'];
    if (!validTypes.includes(inputs.loanType)) {
      errors.push('Loan type must be one of: federal-subsidized, federal-unsubsidized, federal-plus, private, consolidated');
    }
  }

  if (inputs.gracePeriod !== undefined) {
    if (inputs.gracePeriod < 0) {
      errors.push('Grace period cannot be negative');
    } else if (inputs.gracePeriod > 60) {
      errors.push('Grace period cannot exceed 60 months');
    }
  }

  if (inputs.repaymentPlan !== undefined) {
    const validPlans = ['standard', 'extended', 'graduated', 'income-based', 'pay-as-you-earn', 'revised-pay-as-you-earn', 'income-contingent', 'income-sensitive'];
    if (!validPlans.includes(inputs.repaymentPlan)) {
      errors.push('Repayment plan must be one of: standard, extended, graduated, income-based, pay-as-you-earn, revised-pay-as-you-earn, income-contingent, income-sensitive');
    }
  }

  if (inputs.monthlyPayment !== undefined) {
    if (inputs.monthlyPayment < 0) {
      errors.push('Monthly payment cannot be negative');
    } else if (inputs.monthlyPayment > 10000) {
      errors.push('Monthly payment cannot exceed $10,000');
    }
  }

  if (inputs.annualIncome !== undefined) {
    if (inputs.annualIncome < 0) {
      errors.push('Annual income cannot be negative');
    } else if (inputs.annualIncome > 1000000) {
      errors.push('Annual income cannot exceed $1,000,000');
    }
  }

  if (inputs.familySize !== undefined) {
    if (inputs.familySize < 1) {
      errors.push('Family size must be at least 1');
    } else if (inputs.familySize > 10) {
      errors.push('Family size cannot exceed 10');
    }
  }

  if (inputs.filingStatus !== undefined) {
    const validStatuses = ['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household'];
    if (!validStatuses.includes(inputs.filingStatus)) {
      errors.push('Filing status must be one of: single, married-filing-jointly, married-filing-separately, head-of-household');
    }
  }

  if (inputs.stateOfResidence !== undefined) {
    const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
    if (!validStates.includes(inputs.stateOfResidence)) {
      errors.push('Invalid state selection');
    }
  }

  if (inputs.otherDebts !== undefined) {
    if (inputs.otherDebts < 0) {
      errors.push('Other debts cannot be negative');
    } else if (inputs.otherDebts > 10000) {
      errors.push('Other debts cannot exceed $10,000');
    }
  }

  if (inputs.monthlyExpenses !== undefined) {
    if (inputs.monthlyExpenses < 0) {
      errors.push('Monthly expenses cannot be negative');
    } else if (inputs.monthlyExpenses > 50000) {
      errors.push('Monthly expenses cannot exceed $50,000');
    }
  }

  if (inputs.emergencyFund !== undefined) {
    if (inputs.emergencyFund < 0) {
      errors.push('Emergency fund cannot be negative');
    } else if (inputs.emergencyFund > 100000) {
      errors.push('Emergency fund cannot exceed $100,000');
    }
  }

  if (inputs.monthlySavings !== undefined) {
    if (inputs.monthlySavings < 0) {
      errors.push('Monthly savings cannot be negative');
    } else if (inputs.monthlySavings > 10000) {
      errors.push('Monthly savings cannot exceed $10,000');
    }
  }

  if (inputs.repaymentStrategy !== undefined) {
    const validStrategies = ['minimum-payments', 'debt-snowball', 'debt-avalanche', 'aggressive-payoff', 'income-based'];
    if (!validStrategies.includes(inputs.repaymentStrategy)) {
      errors.push('Repayment strategy must be one of: minimum-payments, debt-snowball, debt-avalanche, aggressive-payoff, income-based');
    }
  }

  if (inputs.extraPayment !== undefined) {
    if (inputs.extraPayment < 0) {
      errors.push('Extra payment cannot be negative');
    } else if (inputs.extraPayment > 10000) {
      errors.push('Extra payment cannot exceed $10,000');
    }
  }

  if (inputs.lumpSumPayment !== undefined) {
    if (inputs.lumpSumPayment < 0) {
      errors.push('Lump sum payment cannot be negative');
    } else if (inputs.lumpSumPayment > 100000) {
      errors.push('Lump sum payment cannot exceed $100,000');
    }
  }

  if (inputs.refinanceRate !== undefined) {
    if (inputs.refinanceRate < 0) {
      errors.push('Refinance rate cannot be negative');
    } else if (inputs.refinanceRate > 20) {
      errors.push('Refinance rate must be between 0% and 20%');
    }
  }

  if (inputs.refinanceTerm !== undefined) {
    if (inputs.refinanceTerm < 1) {
      errors.push('Refinance term must be at least 1 year');
    } else if (inputs.refinanceTerm > 30) {
      errors.push('Refinance term must be between 1 and 30 years');
    }
  }

  if (inputs.refinanceFees !== undefined) {
    if (inputs.refinanceFees < 0) {
      errors.push('Refinance fees cannot be negative');
    } else if (inputs.refinanceFees > 10000) {
      errors.push('Refinance fees cannot exceed $10,000');
    }
  }

  if (inputs.analysisPeriod !== undefined) {
    const validPeriods = ['1-year', '5-year', '10-year', 'full-term'];
    if (!validPeriods.includes(inputs.analysisPeriod)) {
      errors.push('Analysis period must be one of: 1-year, 5-year, 10-year, full-term');
    }
  }

  // Logical validation warnings
  if (inputs.loanAmount && inputs.lumpSumPayment && inputs.lumpSumPayment > inputs.loanAmount) {
    warnings.push('Lump sum payment cannot exceed loan amount');
  }

  if (inputs.annualIncome && inputs.monthlyExpenses) {
    const monthlyIncome = inputs.annualIncome / 12;
    const totalExpenses = inputs.monthlyExpenses + (inputs.monthlyPayment || 0) + (inputs.otherDebts || 0);
    if (totalExpenses > monthlyIncome) {
      warnings.push('Total monthly expenses exceed monthly income');
    }
  }

  if (inputs.interestRate && inputs.interestRate > 10) {
    warnings.push('High interest rate - consider refinancing or income-based repayment');
  }

  if (inputs.loanAmount && inputs.loanAmount > 100000) {
    warnings.push('Large loan amount - consider income-based repayment or extended terms');
  }

  if (inputs.annualIncome && inputs.annualIncome < 30000) {
    warnings.push('Low income - income-based repayment may be beneficial');
  }

  if (inputs.emergencyFund && inputs.emergencyFund < 3000) {
    warnings.push('Emergency fund is low - prioritize building emergency savings');
  }

  if (inputs.monthlyPayment && inputs.annualIncome) {
    const debtToIncomeRatio = (inputs.monthlyPayment + (inputs.otherDebts || 0)) / (inputs.annualIncome / 12);
    if (debtToIncomeRatio > 0.43) {
      warnings.push('High debt-to-income ratio - consider income-based repayment');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
