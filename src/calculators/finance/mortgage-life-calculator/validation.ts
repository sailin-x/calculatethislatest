import { MortgageLifeInputs } from './types';

export function validateMortgageLifeInputs(inputs: MortgageLifeInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Interest Rate Validation
  if (inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate > 30) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 30%' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Borrower Age Validation
  if (!inputs.borrowerAge || inputs.borrowerAge < 18) {
    errors.push({ field: 'borrowerAge', message: 'Borrower must be at least 18 years old' });
  }
  if (inputs.borrowerAge > 100) {
    errors.push({ field: 'borrowerAge', message: 'Borrower age cannot exceed 100 years' });
  }

  // Life Expectancy Validation
  if (!inputs.borrowerLifeExpectancy || inputs.borrowerLifeExpectancy <= inputs.borrowerAge) {
    errors.push({ field: 'borrowerLifeExpectancy', message: 'Life expectancy must be greater than current age' });
  }
  if (inputs.borrowerLifeExpectancy > 120) {
    errors.push({ field: 'borrowerLifeExpectancy', message: 'Life expectancy cannot exceed 120 years' });
  }

  // Spouse Age Validation
  if (inputs.includeSpouse && inputs.spouseAge) {
    if (inputs.spouseAge < 18) {
      errors.push({ field: 'spouseAge', message: 'Spouse must be at least 18 years old' });
    }
    if (inputs.spouseAge > 100) {
      errors.push({ field: 'spouseAge', message: 'Spouse age cannot exceed 100 years' });
    }
  }

  // Spouse Life Expectancy Validation
  if (inputs.includeSpouse && inputs.spouseLifeExpectancy) {
    if (inputs.spouseLifeExpectancy <= (inputs.spouseAge || 0)) {
      errors.push({ field: 'spouseLifeExpectancy', message: 'Spouse life expectancy must be greater than current age' });
    }
    if (inputs.spouseLifeExpectancy > 120) {
      errors.push({ field: 'spouseLifeExpectancy', message: 'Spouse life expectancy cannot exceed 120 years' });
    }
  }

  // Monthly Payment Validation
  if (!inputs.monthlyPayment || inputs.monthlyPayment <= 0) {
    errors.push({ field: 'monthlyPayment', message: 'Monthly payment must be greater than 0' });
  }

  // Appreciation Rate Validation
  if (inputs.propertyAppreciationRate < -20) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate cannot be less than -20%' });
  }
  if (inputs.propertyAppreciationRate > 50) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate cannot exceed 50%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate cannot be less than -5%' });
  }
  if (inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate cannot exceed 20%' });
  }

  // Discount Rate Validation
  if (inputs.discountRate < 0) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be 0 or greater' });
  }
  if (inputs.discountRate > 25) {
    errors.push({ field: 'discountRate', message: 'Discount rate cannot exceed 25%' });
  }

  // Analysis Period Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period must be at least 1 year' });
  }
  if (inputs.analysisPeriod > 50) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period cannot exceed 50 years' });
  }

  // Financial Validation
  if (inputs.monthlyIncome < 0) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income cannot be negative' });
  }
  if (inputs.monthlyExpenses < 0) {
    errors.push({ field: 'monthlyExpenses', message: 'Monthly expenses cannot be negative' });
  }
  if (inputs.otherDebts < 0) {
    errors.push({ field: 'otherDebts', message: 'Other debts cannot be negative' });
  }

  // Children Validation
  if (inputs.childrenCount < 0) {
    errors.push({ field: 'childrenCount', message: 'Children count cannot be negative' });
  }
  if (inputs.childrenAges && inputs.childrenAges.length !== inputs.childrenCount) {
    errors.push({ field: 'childrenAges', message: 'Number of children ages must match children count' });
  }
  if (inputs.childrenAges) {
    inputs.childrenAges.forEach((age, index) => {
      if (age < 0 || age > 30) {
        errors.push({ field: 'childrenAges', message: `Child ${index + 1} age must be between 0 and 30` });
      }
    });
  }

  // College Fund Validation
  if (inputs.collegeFundNeeded < 0) {
    errors.push({ field: 'collegeFundNeeded', message: 'College fund needed cannot be negative' });
  }

  // Retirement Savings Validation
  if (inputs.retirementSavings < 0) {
    errors.push({ field: 'retirementSavings', message: 'Retirement savings cannot be negative' });
  }

  // Life Insurance Coverage Validation
  if (inputs.lifeInsuranceCoverage && inputs.lifeInsuranceCoverage < 0) {
    errors.push({ field: 'lifeInsuranceCoverage', message: 'Life insurance coverage cannot be negative' });
  }

  return errors;
}

export function validateMortgageLifeBusinessRules(inputs: MortgageLifeInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Age and Life Expectancy Warnings
  const loanPayoffAge = inputs.borrowerAge + inputs.loanTerm;
  if (inputs.borrowerLifeExpectancy > loanPayoffAge + 15) {
    warnings.push({ field: 'borrowerLifeExpectancy', message: 'Long life expectancy may leave mortgage debt for heirs' });
  }

  // Spouse Age Difference Warning
  if (inputs.includeSpouse && inputs.spouseAge && Math.abs(inputs.borrowerAge - inputs.spouseAge) > 10) {
    warnings.push({ field: 'spouseAge', message: 'Large age difference may affect survivor benefits and planning' });
  }

  // High Loan-to-Value Warning
  const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltv > 90) {
    warnings.push({ field: 'loanAmount', message: 'High loan-to-value ratio increases estate risk' });
  }

  // Low Appreciation Rate Warning
  if (inputs.propertyAppreciationRate < 2) {
    warnings.push({ field: 'propertyAppreciationRate', message: 'Low appreciation may not keep pace with inflation' });
  }

  // High Inflation Rate Warning
  if (inputs.inflationRate > 4) {
    warnings.push({ field: 'inflationRate', message: 'High inflation may erode purchasing power' });
  }

  // Income vs Expenses Warning
  if (inputs.monthlyIncome < inputs.monthlyExpenses * 1.25) {
    warnings.push({ field: 'monthlyIncome', message: 'Income may not adequately cover expenses in survivor scenarios' });
  }

  // Children Planning Warning
  if (inputs.childrenCount > 0 && inputs.collegeFundNeeded > inputs.retirementSavings) {
    warnings.push({ field: 'collegeFundNeeded', message: 'College fund needs may exceed retirement savings' });
  }

  // Debt Load Warning
  const totalDebts = inputs.loanAmount + inputs.otherDebts;
  const debtToIncomeRatio = totalDebts / (inputs.monthlyIncome * 12);
  if (debtToIncomeRatio > 5) {
    warnings.push({ field: 'otherDebts', message: 'High debt load may complicate estate settlement' });
  }

  // Life Insurance Coverage Warning
  if (inputs.lifeInsuranceCoverage) {
    const recommendedCoverage = inputs.loanAmount + (inputs.monthlyIncome * 12 * 3);
    if (inputs.lifeInsuranceCoverage < recommendedCoverage * 0.5) {
      warnings.push({ field: 'lifeInsuranceCoverage', message: 'Life insurance coverage may be insufficient' });
    }
  }

  // Analysis Period Warning
  if (inputs.analysisPeriod < 10) {
    warnings.push({ field: 'analysisPeriod', message: 'Short analysis period may not capture long-term risks' });
  }

  return warnings;
}