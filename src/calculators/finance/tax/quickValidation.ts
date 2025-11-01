import { CalculatorInputs } from '../../types/calculator';

// Individual field validation functions
export function validateFilingStatus(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Filing status is required';
  const validStatuses = ['single', 'MarriedFilingJointly', 'MarriedFilingSeparately', 'HeadOfHousehold', 'qualifying-widow'];
  if (!validStatuses.includes(value)) {
    return 'Filing status must be one of: single, MarriedFilingJointly, MarriedFilingSeparately, HeadOfHousehold, qualifying-widow';
  }
  return null;
}

export function validateTaxYear(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Tax year is required';
  const validYears = ['2024', '2023', '2022'];
  if (!validYears.includes(value)) {
    return 'Tax year must be one of: 2024, 2023, 2022';
  }
  return null;
}

export function validateAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Age cannot be negative';
  if (value > 120) return 'Age cannot exceed 120';
  return null;
}

export function validateWages(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Wages cannot be negative';
  if (value > 10000000) return 'Wages cannot exceed $10,000,000';
  return null;
}

export function validateSelfEmployment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Self-employment income cannot be negative';
  if (value > 10000000) return 'Self-employment income cannot exceed $10,000,000';
  return null;
}

export function validateInterest(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Interest income cannot be negative';
  if (value > 1000000) return 'Interest income cannot exceed $1,000,000';
  return null;
}

export function validateDividends(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Dividend income cannot be negative';
  if (value > 1000000) return 'Dividend income cannot exceed $1,000,000';
  return null;
}

export function validateCapitalGains(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Capital gains cannot be negative';
  if (value > 1000000) return 'Capital gains cannot exceed $1,000,000';
  return null;
}

export function validateRentalIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Rental income cannot be negative';
  if (value > 1000000) return 'Rental income cannot exceed $1,000,000';
  return null;
}

export function validateBusinessIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Business income cannot be negative';
  if (value > 1000000) return 'Business income cannot exceed $1,000,000';
  return null;
}

export function validateOtherIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Other income cannot be negative';
  if (value > 1000000) return 'Other income cannot exceed $1,000,000';
  return null;
}

export function validateStandardDeduction(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['standard', 'itemized'].includes(value)) {
    return 'Standard deduction must be one of: standard, itemized';
  }
  return null;
}

export function validateStateLocalTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'State and local taxes cannot be negative';
  if (value > 10000) return 'State and local taxes cannot exceed $10,000 (SALT cap)';
  return null;
}

export function validateMortgageInterest(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Mortgage interest cannot be negative';
  if (value > 100000) return 'Mortgage interest cannot exceed $100,000';
  return null;
}

export function validateCharitableContributions(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Charitable contributions cannot be negative';
  if (value > 100000) return 'Charitable contributions cannot exceed $100,000';
  return null;
}

export function validateMedicalExpenses(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Medical expenses cannot be negative';
  if (value > 100000) return 'Medical expenses cannot exceed $100,000';
  return null;
}

export function validateCasualtyLosses(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Casualty losses cannot be negative';
  if (value > 100000) return 'Casualty losses cannot exceed $100,000';
  return null;
}

export function validateMiscDeductions(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Miscellaneous deductions cannot be negative';
  if (value > 100000) return 'Miscellaneous deductions cannot exceed $100,000';
  return null;
}

export function validateStudentLoanInterest(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Student loan interest cannot be negative';
  if (value > 2500) return 'Student loan interest cannot exceed $2,500';
  return null;
}

export function validateIraContribution(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'IRA contribution cannot be negative';
  if (value > 7000) return 'IRA contribution cannot exceed $7,000';
  return null;
}

export function validateHsaContribution(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'HSA contribution cannot be negative';
  if (value > 4150) return 'HSA contribution cannot exceed $4,150';
  return null;
}

export function validateSelfEmploymentTax(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Self-employment tax cannot be negative';
  if (value > 100000) return 'Self-employment tax cannot exceed $100,000';
  return null;
}

export function validateSelfEmploymentHealth(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Self-employment health insurance cannot be negative';
  if (value > 100000) return 'Self-employment health insurance cannot exceed $100,000';
  return null;
}

export function validateAlimonyPaid(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Alimony paid cannot be negative';
  if (value > 100000) return 'Alimony paid cannot exceed $100,000';
  return null;
}

export function validateChildTaxCredit(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Child tax credit cannot be negative';
  if (value > 10) return 'Child tax credit cannot exceed 10 children';
  return null;
}

export function validateChildCareCredit(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Child care credit cannot be negative';
  if (value > 10000) return 'Child care credit cannot exceed $10,000';
  return null;
}

export function validateEarnedIncomeCredit(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['yes', 'no'].includes(value)) {
    return 'Earned income credit must be one of: yes, no';
  }
  return null;
}

export function validateEducationCredits(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Education credits cannot be negative';
  if (value > 10000) return 'Education credits cannot exceed $10,000';
  return null;
}

export function validateSaversCredit(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['yes', 'no'].includes(value)) {
    return 'Saver\'s credit must be one of: yes, no';
  }
  return null;
}

export function validateAdoptionCredit(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Adoption credit cannot be negative';
  if (value > 100000) return 'Adoption credit cannot exceed $100,000';
  return null;
}

export function validateForeignTaxCredit(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Foreign tax credit cannot be negative';
  if (value > 100000) return 'Foreign tax credit cannot exceed $100,000';
  return null;
}

export function validateStateOfResidence(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
    if (!validStates.includes(value)) {
      return 'Invalid state selection';
    }
  }
  return null;
}

export function validateStateIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'State income cannot be negative';
  if (value > 10000000) return 'State income cannot exceed $10,000,000';
  return null;
}

export function validateStateDeductions(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'State deductions cannot be negative';
  if (value > 100000) return 'State deductions cannot exceed $100,000';
  return null;
}

export function validateStateCredits(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'State credits cannot be negative';
  if (value > 10000) return 'State credits cannot exceed $10,000';
  return null;
}

export function validateFederalWithholding(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Federal withholding cannot be negative';
  if (value > 1000000) return 'Federal withholding cannot exceed $1,000,000';
  return null;
}

export function validateStateWithholding(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'State withholding cannot be negative';
  if (value > 1000000) return 'State withholding cannot exceed $1,000,000';
  return null;
}

export function validateEstimatedPayments(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Estimated payments cannot be negative';
  if (value > 1000000) return 'Estimated payments cannot exceed $1,000,000';
  return null;
}

export function validateOtherPayments(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Other payments cannot be negative';
  if (value > 1000000) return 'Other payments cannot exceed $1,000,000';
  return null;
}

export function validateAmtIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'AMT income cannot be negative';
  if (value > 10000000) return 'AMT income cannot exceed $10,000,000';
  return null;
}

export function validateAmtPreferences(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'AMT preferences cannot be negative';
  if (value > 1000000) return 'AMT preferences cannot exceed $1,000,000';
  return null;
}

export function validateAnalysisType(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['basic', 'detailed', 'optimization', 'comparison'].includes(value)) {
    return 'Analysis type must be one of: basic, detailed, optimization, comparison';
  }
  return null;
}

// Consolidated validation function
export function validateAllTaxInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  const filingStatusError = validateFilingStatus(inputs.filingStatus);
  if (filingStatusError) errors.push(filingStatusError);

  const taxYearError = validateTaxYear(inputs.taxYear);
  if (taxYearError) errors.push(taxYearError);

  // Optional fields
  if (inputs.age !== undefined) {
    const ageError = validateAge(inputs.age);
    if (ageError) errors.push(ageError);
  }

  if (inputs.wages !== undefined) {
    const wagesError = validateWages(inputs.wages);
    if (wagesError) errors.push(wagesError);
  }

  if (inputs.selfEmployment !== undefined) {
    const selfEmploymentError = validateSelfEmployment(inputs.selfEmployment);
    if (selfEmploymentError) errors.push(selfEmploymentError);
  }

  if (inputs.interest !== undefined) {
    const interestError = validateInterest(inputs.interest);
    if (interestError) errors.push(interestError);
  }

  if (inputs.dividends !== undefined) {
    const dividendsError = validateDividends(inputs.dividends);
    if (dividendsError) errors.push(dividendsError);
  }

  if (inputs.capitalGains !== undefined) {
    const capitalGainsError = validateCapitalGains(inputs.capitalGains);
    if (capitalGainsError) errors.push(capitalGainsError);
  }

  if (inputs.rentalIncome !== undefined) {
    const rentalIncomeError = validateRentalIncome(inputs.rentalIncome);
    if (rentalIncomeError) errors.push(rentalIncomeError);
  }

  if (inputs.businessIncome !== undefined) {
    const businessIncomeError = validateBusinessIncome(inputs.businessIncome);
    if (businessIncomeError) errors.push(businessIncomeError);
  }

  if (inputs.otherIncome !== undefined) {
    const otherIncomeError = validateOtherIncome(inputs.otherIncome);
    if (otherIncomeError) errors.push(otherIncomeError);
  }

  if (inputs.standardDeduction !== undefined) {
    const standardDeductionError = validateStandardDeduction(inputs.standardDeduction);
    if (standardDeductionError) errors.push(standardDeductionError);
  }

  if (inputs.stateLocalTaxes !== undefined) {
    const stateLocalTaxesError = validateStateLocalTaxes(inputs.stateLocalTaxes);
    if (stateLocalTaxesError) errors.push(stateLocalTaxesError);
  }

  if (inputs.mortgageInterest !== undefined) {
    const mortgageInterestError = validateMortgageInterest(inputs.mortgageInterest);
    if (mortgageInterestError) errors.push(mortgageInterestError);
  }

  if (inputs.charitableContributions !== undefined) {
    const charitableContributionsError = validateCharitableContributions(inputs.charitableContributions);
    if (charitableContributionsError) errors.push(charitableContributionsError);
  }

  if (inputs.medicalExpenses !== undefined) {
    const medicalExpensesError = validateMedicalExpenses(inputs.medicalExpenses);
    if (medicalExpensesError) errors.push(medicalExpensesError);
  }

  if (inputs.casualtyLosses !== undefined) {
    const casualtyLossesError = validateCasualtyLosses(inputs.casualtyLosses);
    if (casualtyLossesError) errors.push(casualtyLossesError);
  }

  if (inputs.miscDeductions !== undefined) {
    const miscDeductionsError = validateMiscDeductions(inputs.miscDeductions);
    if (miscDeductionsError) errors.push(miscDeductionsError);
  }

  if (inputs.studentLoanInterest !== undefined) {
    const studentLoanInterestError = validateStudentLoanInterest(inputs.studentLoanInterest);
    if (studentLoanInterestError) errors.push(studentLoanInterestError);
  }

  if (inputs.iraContribution !== undefined) {
    const iraContributionError = validateIraContribution(inputs.iraContribution);
    if (iraContributionError) errors.push(iraContributionError);
  }

  if (inputs.hsaContribution !== undefined) {
    const hsaContributionError = validateHsaContribution(inputs.hsaContribution);
    if (hsaContributionError) errors.push(hsaContributionError);
  }

  if (inputs.selfEmploymentTax !== undefined) {
    const selfEmploymentTaxError = validateSelfEmploymentTax(inputs.selfEmploymentTax);
    if (selfEmploymentTaxError) errors.push(selfEmploymentTaxError);
  }

  if (inputs.selfEmploymentHealth !== undefined) {
    const selfEmploymentHealthError = validateSelfEmploymentHealth(inputs.selfEmploymentHealth);
    if (selfEmploymentHealthError) errors.push(selfEmploymentHealthError);
  }

  if (inputs.alimonyPaid !== undefined) {
    const alimonyPaidError = validateAlimonyPaid(inputs.alimonyPaid);
    if (alimonyPaidError) errors.push(alimonyPaidError);
  }

  if (inputs.childTaxCredit !== undefined) {
    const childTaxCreditError = validateChildTaxCredit(inputs.childTaxCredit);
    if (childTaxCreditError) errors.push(childTaxCreditError);
  }

  if (inputs.childCareCredit !== undefined) {
    const childCareCreditError = validateChildCareCredit(inputs.childCareCredit);
    if (childCareCreditError) errors.push(childCareCreditError);
  }

  if (inputs.earnedIncomeCredit !== undefined) {
    const earnedIncomeCreditError = validateEarnedIncomeCredit(inputs.earnedIncomeCredit);
    if (earnedIncomeCreditError) errors.push(earnedIncomeCreditError);
  }

  if (inputs.educationCredits !== undefined) {
    const educationCreditsError = validateEducationCredits(inputs.educationCredits);
    if (educationCreditsError) errors.push(educationCreditsError);
  }

  if (inputs.saversCredit !== undefined) {
    const saversCreditError = validateSaversCredit(inputs.saversCredit);
    if (saversCreditError) errors.push(saversCreditError);
  }

  if (inputs.adoptionCredit !== undefined) {
    const adoptionCreditError = validateAdoptionCredit(inputs.adoptionCredit);
    if (adoptionCreditError) errors.push(adoptionCreditError);
  }

  if (inputs.foreignTaxCredit !== undefined) {
    const foreignTaxCreditError = validateForeignTaxCredit(inputs.foreignTaxCredit);
    if (foreignTaxCreditError) errors.push(foreignTaxCreditError);
  }

  if (inputs.stateOfResidence !== undefined) {
    const stateOfResidenceError = validateStateOfResidence(inputs.stateOfResidence);
    if (stateOfResidenceError) errors.push(stateOfResidenceError);
  }

  if (inputs.stateIncome !== undefined) {
    const stateIncomeError = validateStateIncome(inputs.stateIncome);
    if (stateIncomeError) errors.push(stateIncomeError);
  }

  if (inputs.stateDeductions !== undefined) {
    const stateDeductionsError = validateStateDeductions(inputs.stateDeductions);
    if (stateDeductionsError) errors.push(stateDeductionsError);
  }

  if (inputs.stateCredits !== undefined) {
    const stateCreditsError = validateStateCredits(inputs.stateCredits);
    if (stateCreditsError) errors.push(stateCreditsError);
  }

  if (inputs.federalWithholding !== undefined) {
    const federalWithholdingError = validateFederalWithholding(inputs.federalWithholding);
    if (federalWithholdingError) errors.push(federalWithholdingError);
  }

  if (inputs.stateWithholding !== undefined) {
    const stateWithholdingError = validateStateWithholding(inputs.stateWithholding);
    if (stateWithholdingError) errors.push(stateWithholdingError);
  }

  if (inputs.estimatedPayments !== undefined) {
    const estimatedPaymentsError = validateEstimatedPayments(inputs.estimatedPayments);
    if (estimatedPaymentsError) errors.push(estimatedPaymentsError);
  }

  if (inputs.otherPayments !== undefined) {
    const otherPaymentsError = validateOtherPayments(inputs.otherPayments);
    if (otherPaymentsError) errors.push(otherPaymentsError);
  }

  if (inputs.amtIncome !== undefined) {
    const amtIncomeError = validateAmtIncome(inputs.amtIncome);
    if (amtIncomeError) errors.push(amtIncomeError);
  }

  if (inputs.amtPreferences !== undefined) {
    const amtPreferencesError = validateAmtPreferences(inputs.amtPreferences);
    if (amtPreferencesError) errors.push(amtPreferencesError);
  }

  if (inputs.analysisType !== undefined) {
    const analysisTypeError = validateAnalysisType(inputs.analysisType);
    if (analysisTypeError) errors.push(analysisTypeError);
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
