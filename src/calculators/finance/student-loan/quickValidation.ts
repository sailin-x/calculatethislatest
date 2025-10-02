import { CalculatorInputs } from '../../types/calculator';

// Individual field validation functions
export function validateLoanAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Loan amount must be greater than 0';
  if (value > 1000000) return 'Loan amount cannot exceed $1,000,000';
  return null;
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 0) return 'Interest rate must be greater than or equal to 0';
  if (value > 20) return 'Interest rate cannot exceed 20%';
  return null;
}

export function validateLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 1) return 'Loan term must be at least 1 year';
  if (value > 30) return 'Loan term cannot exceed 30 years';
  return null;
}

export function validateLoanType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['federal-subsidized', 'federal-unsubsidized', 'federal-plus', 'private', 'consolidated'];
  if (!value) return 'Loan type is required';
  if (!validTypes.includes(value)) return 'Invalid loan type';
  return null;
}

export function validateGracePeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Grace period cannot be negative';
  if (value > 60) return 'Grace period cannot exceed 60 months';
  return null;
}

export function validateRepaymentPlan(value: string, allInputs?: Record<string, any>): string | null {
  const validPlans = ['standard', 'extended', 'graduated', 'income-based', 'pay-as-you-earn', 'revised-pay-as-you-earn', 'income-contingent', 'income-sensitive'];
  if (!value) return 'Repayment plan is required';
  if (!validPlans.includes(value)) return 'Invalid repayment plan';
  return null;
}

export function validateMonthlyPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly payment cannot be negative';
  if (value > 10000) return 'Monthly payment cannot exceed $10,000';
  return null;
}

export function validateAnnualIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Annual income cannot be negative';
  if (value > 1000000) return 'Annual income cannot exceed $1,000,000';
  return null;
}

export function validateFamilySize(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Family size must be at least 1';
  if (value > 10) return 'Family size cannot exceed 10';
  return null;
}

export function validateFilingStatus(value: string, allInputs?: Record<string, any>): string | null {
  const validStatuses = ['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household'];
  if (!value) return 'Filing status is required';
  if (!validStatuses.includes(value)) return 'Invalid filing status';
  return null;
}

export function validateStateOfResidence(value: string, allInputs?: Record<string, any>): string | null {
  const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
  if (!value) return 'State of residence is required';
  if (!validStates.includes(value)) return 'Invalid state';
  return null;
}

export function validateOtherDebts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Other debts cannot be negative';
  if (value > 10000) return 'Other debts cannot exceed $10,000';
  return null;
}

export function validateMonthlyExpenses(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly expenses cannot be negative';
  if (value > 50000) return 'Monthly expenses cannot exceed $50,000';
  return null;
}

export function validateEmergencyFund(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Emergency fund cannot be negative';
  if (value > 100000) return 'Emergency fund cannot exceed $100,000';
  return null;
}

export function validateMonthlySavings(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly savings cannot be negative';
  if (value > 10000) return 'Monthly savings cannot exceed $10,000';
  return null;
}

export function validateRepaymentStrategy(value: string, allInputs?: Record<string, any>): string | null {
  const validStrategies = ['minimum-payments', 'debt-snowball', 'debt-avalanche', 'aggressive-payoff', 'income-based'];
  if (!value) return 'Repayment strategy is required';
  if (!validStrategies.includes(value)) return 'Invalid repayment strategy';
  return null;
}

export function validateExtraPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Extra payment cannot be negative';
  if (value > 10000) return 'Extra payment cannot exceed $10,000';
  return null;
}

export function validateLumpSumPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Lump sum payment cannot be negative';
  if (value > 100000) return 'Lump sum payment cannot exceed $100,000';
  return null;
}

export function validateRefinanceRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Refinance rate cannot be negative';
  if (value > 20) return 'Refinance rate cannot exceed 20%';
  return null;
}

export function validateRefinanceTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Refinance term must be at least 1 year';
  if (value > 30) return 'Refinance term cannot exceed 30 years';
  return null;
}

export function validateRefinanceFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Refinance fees cannot be negative';
  if (value > 10000) return 'Refinance fees cannot exceed $10,000';
  return null;
}

export function validateAnalysisPeriod(value: string, allInputs?: Record<string, any>): string | null {
  const validPeriods = ['1-year', '5-year', '10-year', 'full-term'];
  if (!value) return 'Analysis period is required';
  if (!validPeriods.includes(value)) return 'Invalid analysis period';
  return null;
}

// Consolidated validation function
export function validateAllStudentLoanInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  const loanAmountError = validateLoanAmount(inputs.loanAmount);
  if (loanAmountError) errors.push(loanAmountError);

  const interestRateError = validateInterestRate(inputs.interestRate);
  if (interestRateError) errors.push(interestRateError);

  const loanTermError = validateLoanTerm(inputs.loanTerm);
  if (loanTermError) errors.push(loanTermError);

  // Optional field validations
  if (inputs.loanType !== undefined) {
    const loanTypeError = validateLoanType(inputs.loanType);
    if (loanTypeError) errors.push(loanTypeError);
  }

  if (inputs.gracePeriod !== undefined) {
    const gracePeriodError = validateGracePeriod(inputs.gracePeriod);
    if (gracePeriodError) errors.push(gracePeriodError);
  }

  if (inputs.repaymentPlan !== undefined) {
    const repaymentPlanError = validateRepaymentPlan(inputs.repaymentPlan);
    if (repaymentPlanError) errors.push(repaymentPlanError);
  }

  if (inputs.monthlyPayment !== undefined) {
    const monthlyPaymentError = validateMonthlyPayment(inputs.monthlyPayment);
    if (monthlyPaymentError) errors.push(monthlyPaymentError);
  }

  if (inputs.annualIncome !== undefined) {
    const annualIncomeError = validateAnnualIncome(inputs.annualIncome);
    if (annualIncomeError) errors.push(annualIncomeError);
  }

  if (inputs.familySize !== undefined) {
    const familySizeError = validateFamilySize(inputs.familySize);
    if (familySizeError) errors.push(familySizeError);
  }

  if (inputs.filingStatus !== undefined) {
    const filingStatusError = validateFilingStatus(inputs.filingStatus);
    if (filingStatusError) errors.push(filingStatusError);
  }

  if (inputs.stateOfResidence !== undefined) {
    const stateOfResidenceError = validateStateOfResidence(inputs.stateOfResidence);
    if (stateOfResidenceError) errors.push(stateOfResidenceError);
  }

  if (inputs.otherDebts !== undefined) {
    const otherDebtsError = validateOtherDebts(inputs.otherDebts);
    if (otherDebtsError) errors.push(otherDebtsError);
  }

  if (inputs.monthlyExpenses !== undefined) {
    const monthlyExpensesError = validateMonthlyExpenses(inputs.monthlyExpenses);
    if (monthlyExpensesError) errors.push(monthlyExpensesError);
  }

  if (inputs.emergencyFund !== undefined) {
    const emergencyFundError = validateEmergencyFund(inputs.emergencyFund);
    if (emergencyFundError) errors.push(emergencyFundError);
  }

  if (inputs.monthlySavings !== undefined) {
    const monthlySavingsError = validateMonthlySavings(inputs.monthlySavings);
    if (monthlySavingsError) errors.push(monthlySavingsError);
  }

  if (inputs.repaymentStrategy !== undefined) {
    const repaymentStrategyError = validateRepaymentStrategy(inputs.repaymentStrategy);
    if (repaymentStrategyError) errors.push(repaymentStrategyError);
  }

  if (inputs.extraPayment !== undefined) {
    const extraPaymentError = validateExtraPayment(inputs.extraPayment);
    if (extraPaymentError) errors.push(extraPaymentError);
  }

  if (inputs.lumpSumPayment !== undefined) {
    const lumpSumPaymentError = validateLumpSumPayment(inputs.lumpSumPayment);
    if (lumpSumPaymentError) errors.push(lumpSumPaymentError);
  }

  if (inputs.refinanceRate !== undefined) {
    const refinanceRateError = validateRefinanceRate(inputs.refinanceRate);
    if (refinanceRateError) errors.push(refinanceRateError);
  }

  if (inputs.refinanceTerm !== undefined) {
    const refinanceTermError = validateRefinanceTerm(inputs.refinanceTerm);
    if (refinanceTermError) errors.push(refinanceTermError);
  }

  if (inputs.refinanceFees !== undefined) {
    const refinanceFeesError = validateRefinanceFees(inputs.refinanceFees);
    if (refinanceFeesError) errors.push(refinanceFeesError);
  }

  if (inputs.analysisPeriod !== undefined) {
    const analysisPeriodError = validateAnalysisPeriod(inputs.analysisPeriod);
    if (analysisPeriodError) errors.push(analysisPeriodError);
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
