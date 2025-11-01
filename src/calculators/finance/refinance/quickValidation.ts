import { CalculatorInputs } from '../../types/calculator';

// Individual field validation functions
export function validateCurrentLoanBalance(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Current loan balance must be greater than 0';
  if (value > 10000000) return 'Current loan balance cannot exceed $10,000,000';
  return null;
}

export function validateCurrentInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 0) return 'Current interest rate must be non-negative';
  if (value > 20) return 'Current interest rate cannot exceed 20%';
  return null;
}

export function validateCurrentMonthlyPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Current monthly payment must be greater than 0';
  if (value > 50000) return 'Current monthly payment cannot exceed $50,000';
  return null;
}

export function validateCurrentLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Current loan term must be greater than 0';
  if (value > 50) return 'Current loan term cannot exceed 50 years';
  return null;
}

export function validateCurrentLoanType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['conventional', 'fha', 'va', 'usda'];
  if (!value) return 'Current loan type is required';
  if (!validTypes.includes(value)) return 'Invalid current loan type';
  return null;
}

export function validateCurrentPMI(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Current PMI cannot be negative';
  if (value > 1000) return 'Current PMI cannot exceed $1,000';
  return null;
}

export function validateCurrentPropertyTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Current property taxes cannot be negative';
  if (value > 5000) return 'Current property taxes cannot exceed $5,000';
  return null;
}

export function validateCurrentInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Current insurance cannot be negative';
  if (value > 2000) return 'Current insurance cannot exceed $2,000';
  return null;
}

export function validateNewLoanAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'New loan amount must be greater than 0';
  if (value > 10000000) return 'New loan amount cannot exceed $10,000,000';
  return null;
}

export function validateNewInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 0) return 'New interest rate must be non-negative';
  if (value > 20) return 'New interest rate cannot exceed 20%';
  return null;
}

export function validateNewLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'New loan term must be greater than 0';
  if (value > 50) return 'New loan term cannot exceed 50 years';
  return null;
}

export function validateNewLoanType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['conventional', 'fha', 'va', 'usda'];
  if (!value) return 'New loan type is required';
  if (!validTypes.includes(value)) return 'Invalid new loan type';
  return null;
}

export function validateNewPMI(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'New PMI cannot be negative';
  if (value > 1000) return 'New PMI cannot exceed $1,000';
  return null;
}

export function validateNewPropertyTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'New property taxes cannot be negative';
  if (value > 5000) return 'New property taxes cannot exceed $5,000';
  return null;
}

export function validateNewInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'New insurance cannot be negative';
  if (value > 2000) return 'New insurance cannot exceed $2,000';
  return null;
}

export function validatePropertyValue(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Property value must be greater than 0';
  if (value > 10000000) return 'Property value cannot exceed $10,000,000';
  return null;
}

export function validateClosingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 0) return 'Closing costs must be non-negative';
  if (value > 50000) return 'Closing costs cannot exceed $50,000';
  return null;
}

export function validateAppraisalFee(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Appraisal fee cannot be negative';
  if (value > 2000) return 'Appraisal fee cannot exceed $2,000';
  return null;
}

export function validateTitleInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Title insurance cannot be negative';
  if (value > 5000) return 'Title insurance cannot exceed $5,000';
  return null;
}

export function validateEscrowFunding(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Escrow funding cannot be negative';
  if (value > 10000) return 'Escrow funding cannot exceed $10,000';
  return null;
}

export function validatePrepaidInterest(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Prepaid interest cannot be negative';
  if (value > 5000) return 'Prepaid interest cannot exceed $5,000';
  return null;
}

export function validateLenderCredits(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -10000) return 'Lender credits cannot be less than -$10,000';
  if (value > 10000) return 'Lender credits cannot exceed $10,000';
  return null;
}

export function validateSellerCredits(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -10000) return 'Seller credits cannot be less than -$10,000';
  if (value > 10000) return 'Seller credits cannot exceed $10,000';
  return null;
}

export function validateTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Tax rate cannot be negative';
  if (value > 50) return 'Tax rate cannot exceed 50%';
  return null;
}

export function validateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Inflation rate cannot be negative';
  if (value > 10) return 'Inflation rate cannot exceed 10%';
  return null;
}

export function validateInvestmentReturn(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Investment return cannot be negative';
  if (value > 20) return 'Investment return cannot exceed 20%';
  return null;
}

export function validatePlannedOwnershipYears(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Planned ownership years must be at least 1';
  if (value > 50) return 'Planned ownership years cannot exceed 50';
  return null;
}

export function validateMonthlyIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly income cannot be negative';
  if (value > 1000000) return 'Monthly income cannot exceed $1,000,000';
  return null;
}

export function validateMonthlyDebts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly debts cannot be negative';
  if (value > 100000) return 'Monthly debts cannot exceed $100,000';
  return null;
}

export function validateCreditScore(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 300) return 'Credit score must be at least 300';
  if (value > 850) return 'Credit score cannot exceed 850';
  return null;
}

export function validateOccupancyType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['primary-residence', 'second-home', 'investment'];
  if (!value) return 'Occupancy type is required';
  if (!validTypes.includes(value)) return 'Invalid occupancy type';
  return null;
}

export function validateRefinancePurpose(value: string, allInputs?: Record<string, any>): string | null {
  const validPurposes = ['lower-rate', 'lower-payment', 'cash-out', 'shorter-term', 'remove-pmi', 'debt-consolidation'];
  if (!value) return 'Refinance purpose is required';
  if (!validPurposes.includes(value)) return 'Invalid refinance purpose';
  return null;
}

export function validateCashOutAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Cash out amount cannot be negative';
  if (value > 1000000) return 'Cash out amount cannot exceed $1,000,000';
  return null;
}

export function validateMarketConditions(value: string, allInputs?: Record<string, any>): string | null {
  const validConditions = ['declining', 'stable', 'rising'];
  if (!value) return 'Market conditions is required';
  if (!validConditions.includes(value)) return 'Invalid market conditions';
  return null;
}

// Consolidated validation function
export function validateAllRefinanceInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  const currentLoanBalanceError = validateCurrentLoanBalance(inputs.currentLoanBalance);
  if (currentLoanBalanceError) errors.push(currentLoanBalanceError);

  const currentInterestRateError = validateCurrentInterestRate(inputs.currentInterestRate);
  if (currentInterestRateError) errors.push(currentInterestRateError);

  const currentMonthlyPaymentError = validateCurrentMonthlyPayment(inputs.currentMonthlyPayment);
  if (currentMonthlyPaymentError) errors.push(currentMonthlyPaymentError);

  const currentLoanTermError = validateCurrentLoanTerm(inputs.currentLoanTerm);
  if (currentLoanTermError) errors.push(currentLoanTermError);

  const currentLoanTypeError = validateCurrentLoanType(inputs.currentLoanType);
  if (currentLoanTypeError) errors.push(currentLoanTypeError);

  const newLoanAmountError = validateNewLoanAmount(inputs.newLoanAmount);
  if (newLoanAmountError) errors.push(newLoanAmountError);

  const newInterestRateError = validateNewInterestRate(inputs.newInterestRate);
  if (newInterestRateError) errors.push(newInterestRateError);

  const newLoanTermError = validateNewLoanTerm(inputs.newLoanTerm);
  if (newLoanTermError) errors.push(newLoanTermError);

  const newLoanTypeError = validateNewLoanType(inputs.newLoanType);
  if (newLoanTypeError) errors.push(newLoanTypeError);

  const propertyValueError = validatePropertyValue(inputs.propertyValue);
  if (propertyValueError) errors.push(propertyValueError);

  const closingCostsError = validateClosingCosts(inputs.closingCosts);
  if (closingCostsError) errors.push(closingCostsError);

  // Optional field validations
  if (inputs.currentPMI !== undefined) {
    const currentPMIError = validateCurrentPMI(inputs.currentPMI);
    if (currentPMIError) errors.push(currentPMIError);
  }

  if (inputs.currentPropertyTaxes !== undefined) {
    const currentPropertyTaxesError = validateCurrentPropertyTaxes(inputs.currentPropertyTaxes);
    if (currentPropertyTaxesError) errors.push(currentPropertyTaxesError);
  }

  if (inputs.currentInsurance !== undefined) {
    const currentInsuranceError = validateCurrentInsurance(inputs.currentInsurance);
    if (currentInsuranceError) errors.push(currentInsuranceError);
  }

  if (inputs.newPMI !== undefined) {
    const newPMIError = validateNewPMI(inputs.newPMI);
    if (newPMIError) errors.push(newPMIError);
  }

  if (inputs.newPropertyTaxes !== undefined) {
    const newPropertyTaxesError = validateNewPropertyTaxes(inputs.newPropertyTaxes);
    if (newPropertyTaxesError) errors.push(newPropertyTaxesError);
  }

  if (inputs.newInsurance !== undefined) {
    const newInsuranceError = validateNewInsurance(inputs.newInsurance);
    if (newInsuranceError) errors.push(newInsuranceError);
  }

  if (inputs.appraisalFee !== undefined) {
    const appraisalFeeError = validateAppraisalFee(inputs.appraisalFee);
    if (appraisalFeeError) errors.push(appraisalFeeError);
  }

  if (inputs.titleInsurance !== undefined) {
    const titleInsuranceError = validateTitleInsurance(inputs.titleInsurance);
    if (titleInsuranceError) errors.push(titleInsuranceError);
  }

  if (inputs.escrowFunding !== undefined) {
    const escrowFundingError = validateEscrowFunding(inputs.escrowFunding);
    if (escrowFundingError) errors.push(escrowFundingError);
  }

  if (inputs.prepaidInterest !== undefined) {
    const prepaidInterestError = validatePrepaidInterest(inputs.prepaidInterest);
    if (prepaidInterestError) errors.push(prepaidInterestError);
  }

  if (inputs.lenderCredits !== undefined) {
    const lenderCreditsError = validateLenderCredits(inputs.lenderCredits);
    if (lenderCreditsError) errors.push(lenderCreditsError);
  }

  if (inputs.sellerCredits !== undefined) {
    const sellerCreditsError = validateSellerCredits(inputs.sellerCredits);
    if (sellerCreditsError) errors.push(sellerCreditsError);
  }

  if (inputs.taxRate !== undefined) {
    const taxRateError = validateTaxRate(inputs.taxRate);
    if (taxRateError) errors.push(taxRateError);
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateError = validateInflationRate(inputs.inflationRate);
    if (inflationRateError) errors.push(inflationRateError);
  }

  if (inputs.investmentReturn !== undefined) {
    const investmentReturnError = validateInvestmentReturn(inputs.investmentReturn);
    if (investmentReturnError) errors.push(investmentReturnError);
  }

  if (inputs.plannedOwnershipYears !== undefined) {
    const plannedOwnershipYearsError = validatePlannedOwnershipYears(inputs.plannedOwnershipYears);
    if (plannedOwnershipYearsError) errors.push(plannedOwnershipYearsError);
  }

  if (inputs.monthlyIncome !== undefined) {
    const monthlyIncomeError = validateMonthlyIncome(inputs.monthlyIncome);
    if (monthlyIncomeError) errors.push(monthlyIncomeError);
  }

  if (inputs.monthlyDebts !== undefined) {
    const monthlyDebtsError = validateMonthlyDebts(inputs.monthlyDebts);
    if (monthlyDebtsError) errors.push(monthlyDebtsError);
  }

  if (inputs.creditScore !== undefined) {
    const creditScoreError = validateCreditScore(inputs.creditScore);
    if (creditScoreError) errors.push(creditScoreError);
  }

  if (inputs.occupancyType !== undefined) {
    const occupancyTypeError = validateOccupancyType(inputs.occupancyType);
    if (occupancyTypeError) errors.push(occupancyTypeError);
  }

  if (inputs.refinancePurpose !== undefined) {
    const refinancePurposeError = validateRefinancePurpose(inputs.refinancePurpose);
    if (refinancePurposeError) errors.push(refinancePurposeError);
  }

  if (inputs.cashOutAmount !== undefined) {
    const cashOutAmountError = validateCashOutAmount(inputs.cashOutAmount);
    if (cashOutAmountError) errors.push(cashOutAmountError);
  }

  if (inputs.marketConditions !== undefined) {
    const marketConditionsError = validateMarketConditions(inputs.marketConditions);
    if (marketConditionsError) errors.push(marketConditionsError);
  }

  // Logical validation warnings
  if (inputs.currentLoanBalance && inputs.newLoanAmount && inputs.newLoanAmount < inputs.currentLoanBalance * 0.8) {
    warnings.push('New loan amount is significantly lower than current balance');
  }

  if (inputs.currentLoanBalance && inputs.newLoanAmount && inputs.newLoanAmount > inputs.currentLoanBalance * 1.5) {
    warnings.push('New loan amount is significantly higher than current balance');
  }

  if (inputs.currentInterestRate && inputs.newInterestRate && inputs.newInterestRate >= inputs.currentInterestRate) {
    warnings.push('New interest rate is not lower than current rate');
  }

  if (inputs.propertyValue && inputs.newLoanAmount && (inputs.newLoanAmount / inputs.propertyValue) > 0.97) {
    warnings.push('LoanToValue ratio is very high');
  }

  if (inputs.closingCosts && inputs.monthlyIncome && inputs.closingCosts > inputs.monthlyIncome * 2) {
    warnings.push('Closing costs are high relative to monthly income');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
