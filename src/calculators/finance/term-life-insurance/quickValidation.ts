import { CalculatorInputs } from '../../types/calculator';

// Individual field validation functions
export function validateAge(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Age is required';
  if (value < 18) return 'Age must be at least 18';
  if (value > 85) return 'Age cannot exceed 85';
  return null;
}

export function validateGender(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Gender is required';
  if (!['male', 'female'].includes(value)) {
    return 'Gender must be one of: male, female';
  }
  return null;
}

export function validateCoverageAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Coverage amount is required';
  if (value < 10000) return 'Coverage amount must be at least $10,000';
  if (value > 10000000) return 'Coverage amount cannot exceed $10,000,000';
  return null;
}

export function validateTermLength(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Term length is required';
  if (value < 1) return 'Term length must be at least 1 year';
  if (value > 40) return 'Term length cannot exceed 40 years';
  return null;
}

export function validateFilingStatus(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['non-smoker', 'smoker', 'former-smoker'].includes(value)) {
    return 'Filing status must be one of: non-smoker, smoker, former-smoker';
  }
  return null;
}

export function validateHeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 48) return 'Height must be at least 48 inches';
  if (value > 84) return 'Height cannot exceed 84 inches';
  return null;
}

export function validateWeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 80) return 'Weight must be at least 80 pounds';
  if (value > 400) return 'Weight cannot exceed 400 pounds';
  return null;
}

export function validatePolicyType(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['level-term', 'decreasing-term', 'increasing-term', 'return-of-premium'].includes(value)) {
    return 'Policy type must be one of: level-term, decreasing-term, increasing-term, return-of-premium';
  }
  return null;
}

export function validateRiders(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['none', 'waiver-of-premium', 'accelerated-death-benefit', 'child-rider', 'spouse-rider', 'multiple'].includes(value)) {
    return 'Riders must be one of: none, waiver-of-premium, accelerated-death-benefit, child-rider, spouse-rider, multiple';
  }
  return null;
}

export function validateAnnualIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Annual income cannot be negative';
  if (value > 10000000) return 'Annual income cannot exceed $10,000,000';
  return null;
}

export function validateDebts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Debts cannot be negative';
  if (value > 10000000) return 'Debts cannot exceed $10,000,000';
  return null;
}

export function validateSavings(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Savings cannot be negative';
  if (value > 10000000) return 'Savings cannot exceed $10,000,000';
  return null;
}

export function validateExistingLifeInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Existing life insurance cannot be negative';
  if (value > 10000000) return 'Existing life insurance cannot exceed $10,000,000';
  return null;
}

export function validateFuneralExpenses(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Funeral expenses cannot be negative';
  if (value > 100000) return 'Funeral expenses cannot exceed $100,000';
  return null;
}

export function validateDependents(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Number of dependents cannot be negative';
  if (value > 10) return 'Number of dependents cannot exceed 10';
  return null;
}

export function validateChildrenAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Children age cannot be negative';
  if (value > 25) return 'Children age cannot exceed 25';
  return null;
}

export function validateSpouseIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Spouse income cannot be negative';
  if (value > 10000000) return 'Spouse income cannot exceed $10,000,000';
  return null;
}

export function validateCollegeCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'College costs cannot be negative';
  if (value > 1000000) return 'College costs cannot exceed $1,000,000';
  return null;
}

export function validateHealthRating(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['preferred-plus', 'preferred', 'standard-plus', 'standard', 'substandard'].includes(value)) {
    return 'Health rating must be one of: preferred-plus, preferred, standard-plus, standard, substandard';
  }
  return null;
}

export function validateMedicalConditions(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['none', 'diabetes', 'heart-disease', 'cancer', 'high-blood-pressure', 'multiple'].includes(value)) {
    return 'Medical conditions must be one of: none, diabetes, heart-disease, cancer, high-blood-pressure, multiple';
  }
  return null;
}

export function validateFamilyHistory(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['none', 'heart-disease', 'cancer', 'diabetes', 'multiple'].includes(value)) {
    return 'Family history must be one of: none, heart-disease, cancer, diabetes, multiple';
  }
  return null;
}

export function validateOccupation(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['office', 'manual-labor', 'hazardous', 'military', 'aviation'].includes(value)) {
    return 'Occupation must be one of: office, manual-labor, hazardous, military, aviation';
  }
  return null;
}

export function validateHobbies(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['none', 'scuba-diving', 'skydiving', 'rock-climbing', 'racing', 'multiple'].includes(value)) {
    return 'Hobbies must be one of: none, scuba-diving, skydiving, rock-climbing, racing, multiple';
  }
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

export function validateDiscountRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Discount rate cannot be negative';
  if (value > 15) return 'Discount rate cannot exceed 15%';
  return null;
}

export function validateAnalysisType(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['basic', 'detailed', 'comparison', 'needs-analysis'].includes(value)) {
    return 'Analysis type must be one of: basic, detailed, comparison, needs-analysis';
  }
  return null;
}

export function validateComparisonTerms(value: string, allInputs?: Record<string, any>): string | null {
  if (value && !['10-20-30', '15-25', '20-30', 'custom'].includes(value)) {
    return 'Comparison terms must be one of: 10-20-30, 15-25, 20-30, custom';
  }
  return null;
}

// Consolidated validation function
export function validateAllTermLifeInsuranceInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  const ageError = validateAge(inputs.age);
  if (ageError) errors.push(ageError);

  const genderError = validateGender(inputs.gender);
  if (genderError) errors.push(genderError);

  const coverageAmountError = validateCoverageAmount(inputs.coverageAmount);
  if (coverageAmountError) errors.push(coverageAmountError);

  const termLengthError = validateTermLength(inputs.termLength);
  if (termLengthError) errors.push(termLengthError);

  // Optional fields
  if (inputs.filingStatus !== undefined) {
    const filingStatusError = validateFilingStatus(inputs.filingStatus);
    if (filingStatusError) errors.push(filingStatusError);
  }

  if (inputs.height !== undefined) {
    const heightError = validateHeight(inputs.height);
    if (heightError) errors.push(heightError);
  }

  if (inputs.weight !== undefined) {
    const weightError = validateWeight(inputs.weight);
    if (weightError) errors.push(weightError);
  }

  if (inputs.policyType !== undefined) {
    const policyTypeError = validatePolicyType(inputs.policyType);
    if (policyTypeError) errors.push(policyTypeError);
  }

  if (inputs.riders !== undefined) {
    const ridersError = validateRiders(inputs.riders);
    if (ridersError) errors.push(ridersError);
  }

  if (inputs.annualIncome !== undefined) {
    const annualIncomeError = validateAnnualIncome(inputs.annualIncome);
    if (annualIncomeError) errors.push(annualIncomeError);
  }

  if (inputs.debts !== undefined) {
    const debtsError = validateDebts(inputs.debts);
    if (debtsError) errors.push(debtsError);
  }

  if (inputs.savings !== undefined) {
    const savingsError = validateSavings(inputs.savings);
    if (savingsError) errors.push(savingsError);
  }

  if (inputs.existingLifeInsurance !== undefined) {
    const existingLifeInsuranceError = validateExistingLifeInsurance(inputs.existingLifeInsurance);
    if (existingLifeInsuranceError) errors.push(existingLifeInsuranceError);
  }

  if (inputs.funeralExpenses !== undefined) {
    const funeralExpensesError = validateFuneralExpenses(inputs.funeralExpenses);
    if (funeralExpensesError) errors.push(funeralExpensesError);
  }

  if (inputs.dependents !== undefined) {
    const dependentsError = validateDependents(inputs.dependents);
    if (dependentsError) errors.push(dependentsError);
  }

  if (inputs.childrenAge !== undefined) {
    const childrenAgeError = validateChildrenAge(inputs.childrenAge);
    if (childrenAgeError) errors.push(childrenAgeError);
  }

  if (inputs.spouseIncome !== undefined) {
    const spouseIncomeError = validateSpouseIncome(inputs.spouseIncome);
    if (spouseIncomeError) errors.push(spouseIncomeError);
  }

  if (inputs.collegeCosts !== undefined) {
    const collegeCostsError = validateCollegeCosts(inputs.collegeCosts);
    if (collegeCostsError) errors.push(collegeCostsError);
  }

  if (inputs.healthRating !== undefined) {
    const healthRatingError = validateHealthRating(inputs.healthRating);
    if (healthRatingError) errors.push(healthRatingError);
  }

  if (inputs.medicalConditions !== undefined) {
    const medicalConditionsError = validateMedicalConditions(inputs.medicalConditions);
    if (medicalConditionsError) errors.push(medicalConditionsError);
  }

  if (inputs.familyHistory !== undefined) {
    const familyHistoryError = validateFamilyHistory(inputs.familyHistory);
    if (familyHistoryError) errors.push(familyHistoryError);
  }

  if (inputs.occupation !== undefined) {
    const occupationError = validateOccupation(inputs.occupation);
    if (occupationError) errors.push(occupationError);
  }

  if (inputs.hobbies !== undefined) {
    const hobbiesError = validateHobbies(inputs.hobbies);
    if (hobbiesError) errors.push(hobbiesError);
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateError = validateInflationRate(inputs.inflationRate);
    if (inflationRateError) errors.push(inflationRateError);
  }

  if (inputs.investmentReturn !== undefined) {
    const investmentReturnError = validateInvestmentReturn(inputs.investmentReturn);
    if (investmentReturnError) errors.push(investmentReturnError);
  }

  if (inputs.discountRate !== undefined) {
    const discountRateError = validateDiscountRate(inputs.discountRate);
    if (discountRateError) errors.push(discountRateError);
  }

  if (inputs.analysisType !== undefined) {
    const analysisTypeError = validateAnalysisType(inputs.analysisType);
    if (analysisTypeError) errors.push(analysisTypeError);
  }

  if (inputs.comparisonTerms !== undefined) {
    const comparisonTermsError = validateComparisonTerms(inputs.comparisonTerms);
    if (comparisonTermsError) errors.push(comparisonTermsError);
  }

  // Logical validation warnings
  if (inputs.age && inputs.termLength) {
    if (inputs.age + inputs.termLength > 85) {
      warnings.push('Policy term extends beyond typical maximum age for term life insurance');
    }
  }

  if (inputs.coverageAmount && inputs.annualIncome) {
    const coverageRatio = inputs.coverageAmount / inputs.annualIncome;
    if (coverageRatio < 5) {
      warnings.push('Coverage amount may be insufficient relative to income');
    } else if (coverageRatio > 20) {
      warnings.push('Coverage amount may be excessive relative to income');
    }
  }

  if (inputs.filingStatus === 'smoker') {
    warnings.push('Smoking significantly increases premiums - consider quitting for better rates');
  }

  if (inputs.healthRating === 'substandard') {
    warnings.push('Substandard health rating will result in significantly higher premiums');
  }

  if (inputs.occupation === 'hazardous' || inputs.occupation === 'aviation') {
    warnings.push('Hazardous occupation may limit available policies and increase premiums');
  }

  if (inputs.hobbies === 'skydiving' || inputs.hobbies === 'racing') {
    warnings.push('High-risk hobbies may significantly increase premiums or limit coverage');
  }

  if (inputs.riders === 'multiple') {
    warnings.push('Multiple riders will increase premium costs');
  }

  if (inputs.policyType === 'return-of-premium') {
    warnings.push('Return of premium policies have significantly higher premiums');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
