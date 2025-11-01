import { MortgageQualificationInputs } from './types';

export function validateMortgageQualificationInputs(inputs: MortgageQualificationInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Annual Income Validation
  if (!inputs.annualIncome || inputs.annualIncome <= 0) {
    errors.push({ field: 'annualIncome', message: 'Annual income must be greater than 0' });
  }
  if (inputs.annualIncome && inputs.annualIncome > 10000000) {
    errors.push({ field: 'annualIncome', message: 'Annual income cannot exceed $10,000,000' });
  }

  // Monthly Income Validation
  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income must be greater than 0' });
  }

  // Monthly Debts Validation
  if (inputs.monthlyDebts < 0) {
    errors.push({ field: 'monthlyDebts', message: 'Monthly debts cannot be negative' });
  }

  // Down Payment Validation
  if (inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }

  // Credit Score Validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
  }

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Interest Rate Validation
  if (inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate > 30) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 30%' });
  }

  // Employment Length Validation
  if (inputs.employmentLength < 0) {
    errors.push({ field: 'employmentLength', message: 'Employment length cannot be negative' });
  }

  // Late Payments Validation
  if (inputs.latePayments < 0) {
    errors.push({ field: 'latePayments', message: 'Late payments count cannot be negative' });
  }

  // Gift Funds Validation
  if (inputs.giftFunds < 0) {
    errors.push({ field: 'giftFunds', message: 'Gift funds cannot be negative' });
  }

  // Co-Signer Validation
  if (inputs.coSigner && inputs.coSignerIncome) {
    if (inputs.coSignerIncome <= 0) {
      errors.push({ field: 'coSignerIncome', message: 'Co-signer income must be greater than 0' });
    }
  }

  if (inputs.coSigner && inputs.coSignerCreditScore) {
    if (inputs.coSignerCreditScore < 300 || inputs.coSignerCreditScore > 850) {
      errors.push({ field: 'coSignerCreditScore', message: 'Co-signer credit score must be between 300 and 850' });
    }
  }

  // Income Sources Validation
  const incomeFields = ['rentalIncome', 'alimonyIncome', 'childSupportIncome', 'commissionIncome', 'bonusIncome', 'overtimeIncome', 'otherIncome'];
  incomeFields.forEach(field => {
    const value = (inputs as any)[field];
    if (value < 0) {
      errors.push({ field, message: `${field} cannot be negative` });
    }
  });

  // Expense Validation
  const expenseFields = ['monthlyRent', 'hoaFees', 'propertyTaxes', 'homeownersInsurance', 'floodInsurance', 'mortgageInsurance',
                        'childCareExpenses', 'educationExpenses', 'medicalExpenses', 'transportationExpenses',
                        'foodExpenses', 'utilitiesExpenses', 'entertainmentExpenses', 'otherExpenses'];
  expenseFields.forEach(field => {
    const value = (inputs as any)[field];
    if (value < 0) {
      errors.push({ field, message: `${field} cannot be negative` });
    }
  });

  // Number of Dependents Validation
  if (inputs.numberOfDependents < 0) {
    errors.push({ field: 'numberOfDependents', message: 'Number of dependents cannot be negative' });
  }

  // Number of Dependents Validation
  if (inputs.numberOfDependents < 0) {
    errors.push({ field: 'numberOfDependents', message: 'Number of dependents cannot be negative' });
  }

  // Assets Validation
  const assetFields = ['checking', 'savings', 'investments', 'retirement', 'other'];
  assetFields.forEach(field => {
    const value = inputs.assets[field as keyof typeof inputs.assets];
    if (value < 0) {
      errors.push({ field: `assets.${field}`, message: `${field} balance cannot be negative` });
    }
  });

  // Debts Validation
  const debtFields = ['creditCards', 'carLoans', 'studentLoans', 'personalLoans', 'other'];
  debtFields.forEach(field => {
    const value = inputs.debts[field as keyof typeof inputs.debts];
    if (value < 0) {
      errors.push({ field: `debts.${field}`, message: `${field} balance cannot be negative` });
    }
  });

  return errors;
}

export function validateMortgageQualificationBusinessRules(inputs: MortgageQualificationInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // DTI Ratio Warnings
  const dti = (inputs.monthlyDebts / inputs.monthlyIncome) * 100;
  if (dti > 43) {
    warnings.push({ field: 'monthlyDebts', message: 'DTI ratio above 43% may limit loan approval' });
  }
  if (dti > 50) {
    warnings.push({ field: 'monthlyDebts', message: 'DTI ratio above 50% is very high - consider debt reduction' });
  }

  // Credit Score Warnings
  if (inputs.creditScore < 620) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 620 may result in higher rates or denial' });
  }
  if (inputs.creditScore < 740) {
    warnings.push({ field: 'creditScore', message: 'Higher credit scores typically qualify for better rates' });
  }

  // Down Payment Warnings
  const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
  if (downPaymentPercent < 3) {
    warnings.push({ field: 'downPayment', message: 'Down payment below 3% may require PMI and higher rates' });
  }
  if (downPaymentPercent < 20) {
    warnings.push({ field: 'downPayment', message: 'Down payment below 20% will require PMI' });
  }

  // Employment Stability Warnings
  if (inputs.employmentLength < 24) {
    warnings.push({ field: 'employmentLength', message: 'Less than 2 years employment may affect qualification' });
  }

  // Credit History Warnings
  if (inputs.latePayments > 2) {
    warnings.push({ field: 'latePayments', message: 'Multiple late payments may affect approval' });
  }
  if (inputs.bankruptcyHistory) {
    warnings.push({ field: 'bankruptcyHistory', message: 'Bankruptcy may affect qualification for several years' });
  }
  if (inputs.foreclosureHistory) {
    warnings.push({ field: 'foreclosureHistory', message: 'Foreclosure may affect qualification for several years' });
  }

  // Asset Sufficiency Warnings
  const liquidAssets = inputs.assets.checking + inputs.assets.savings;
  const estimatedPayment = inputs.monthlyIncome * 0.28;
  const requiredReserves = estimatedPayment * 6;

  if (liquidAssets < requiredReserves) {
    warnings.push({ field: 'assets', message: 'Insufficient reserves may affect qualification' });
  }

  // Debt Composition Warnings
  const highInterestDebt = inputs.debts.creditCards + inputs.debts.personalLoans;
  if (highInterestDebt > inputs.monthlyIncome * 0.2) {
    warnings.push({ field: 'debts', message: 'High credit card debt may affect qualification' });
  }

  // Income Stability Warnings
  if (inputs.employmentType === 'self_employed' && inputs.employmentLength < 24) {
    warnings.push({ field: 'employmentType', message: 'Self-employed borrowers typically need 2+ years history' });
  }

  // Loan Type Specific Warnings
  if (inputs.loanType === 'fha' && inputs.creditScore < 580) {
    warnings.push({ field: 'creditScore', message: 'FHA loans require minimum 580 credit score' });
  }

  if (inputs.loanType === 'conventional' && downPaymentPercent < 3) {
    warnings.push({ field: 'downPayment', message: 'Conventional loans require minimum 3% down payment' });
  }

  // Interest Rate Warnings
  if (inputs.interestRate > 8) {
    warnings.push({ field: 'interestRate', message: 'High interest rate may indicate qualification challenges' });
  }

  // Property Value vs Loan Amount Warning
  const maxLoanAmount = inputs.propertyValue * 0.97; // 97% LTV max
  const requestedLoanAmount = inputs.propertyValue - inputs.downPayment;

  if (requestedLoanAmount > maxLoanAmount) {
    warnings.push({ field: 'downPayment', message: 'Requested loan amount exceeds typical LTV limits' });
  }

  return warnings;
}