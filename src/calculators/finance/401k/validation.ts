import { CalculatorInputs } from '../../types/calculator';

export interface FourZeroOneKValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export function validateFourZeroOneKInputs(inputs: CalculatorInputs): FourZeroOneKValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // Current Age validation
  if (!inputs.currentAge || typeof inputs.currentAge !== 'number') {
    errors.currentAge = 'Current age is required and must be a number';
  } else if (inputs.currentAge < 18) {
    errors.currentAge = 'Current age must be at least 18 years';
  } else if (inputs.currentAge > 80) {
    errors.currentAge = 'Current age cannot exceed 80 years';
  }

  // Retirement Age validation
  if (!inputs.retirementAge || typeof inputs.retirementAge !== 'number') {
    errors.retirementAge = 'Retirement age is required and must be a number';
  } else if (inputs.retirementAge < 45) {
    errors.retirementAge = 'Retirement age must be at least 45 years';
  } else if (inputs.retirementAge > 85) {
    errors.retirementAge = 'Retirement age cannot exceed 85 years';
  }

  // Cross-validation: Retirement age must be greater than current age
  if (inputs.currentAge && inputs.retirementAge && (inputs.retirementAge as number) <= (inputs.currentAge as number)) {
    errors.retirementAge = 'Retirement age must be greater than current age';
  }

  // Current Salary validation
  if (!inputs.currentSalary || typeof inputs.currentSalary !== 'number') {
    errors.currentSalary = 'Current salary is required and must be a number';
  } else if (inputs.currentSalary < 10000) {
    errors.currentSalary = 'Current salary must be at least $10,000';
  } else if (inputs.currentSalary > 1000000) {
    errors.currentSalary = 'Current salary cannot exceed $1,000,000';
  }

  // Current 401(k) Balance validation
  if (!inputs.current401kBalance || typeof inputs.current401kBalance !== 'number') {
    errors.current401kBalance = 'Current 401(k) balance is required and must be a number';
  } else if (inputs.current401kBalance < 0) {
    errors.current401kBalance = 'Current 401(k) balance cannot be negative';
  } else if (inputs.current401kBalance > 10000000) {
    errors.current401kBalance = 'Current 401(k) balance cannot exceed $10,000,000';
  }

  // Employee Contribution validation
  if (!inputs.employeeContribution || typeof inputs.employeeContribution !== 'number') {
    errors.employeeContribution = 'Employee contribution percentage is required and must be a number';
  } else if (inputs.employeeContribution < 0) {
    errors.employeeContribution = 'Employee contribution percentage cannot be negative';
  } else if (inputs.employeeContribution > 100) {
    errors.employeeContribution = 'Employee contribution percentage cannot exceed 100%';
  }

  // Employer Match validation
  if (!inputs.employerMatch || typeof inputs.employerMatch !== 'number') {
    errors.employerMatch = 'Employer match percentage is required and must be a number';
  } else if (inputs.employerMatch < 0) {
    errors.employerMatch = 'Employer match percentage cannot be negative';
  } else if (inputs.employerMatch > 100) {
    errors.employerMatch = 'Employer match percentage cannot exceed 100%';
  }

  // Employer Match Limit validation
  if (!inputs.employerMatchLimit || typeof inputs.employerMatchLimit !== 'number') {
    errors.employerMatchLimit = 'Employer match limit percentage is required and must be a number';
  } else if (inputs.employerMatchLimit < 0) {
    errors.employerMatchLimit = 'Employer match limit percentage cannot be negative';
  } else if (inputs.employerMatchLimit > 100) {
    errors.employerMatchLimit = 'Employer match limit percentage cannot exceed 100%';
  }

  // Salary Growth Rate validation
  if (!inputs.salaryGrowthRate || typeof inputs.salaryGrowthRate !== 'number') {
    errors.salaryGrowthRate = 'Salary growth rate is required and must be a number';
  } else if (inputs.salaryGrowthRate < 0) {
    errors.salaryGrowthRate = 'Salary growth rate cannot be negative';
  } else if (inputs.salaryGrowthRate > 20) {
    errors.salaryGrowthRate = 'Salary growth rate cannot exceed 20%';
  }

  // Investment Return validation
  if (!inputs.investmentReturn || typeof inputs.investmentReturn !== 'number') {
    errors.investmentReturn = 'Expected investment return is required and must be a number';
  } else if (inputs.investmentReturn < 1) {
    errors.investmentReturn = 'Expected investment return must be at least 1%';
  } else if (inputs.investmentReturn > 15) {
    errors.investmentReturn = 'Expected investment return cannot exceed 15%';
  }

  // Inflation Rate validation
  if (!inputs.inflationRate || typeof inputs.inflationRate !== 'number') {
    errors.inflationRate = 'Expected inflation rate is required and must be a number';
  } else if (inputs.inflationRate < 0) {
    errors.inflationRate = 'Expected inflation rate cannot be negative';
  } else if (inputs.inflationRate > 10) {
    errors.inflationRate = 'Expected inflation rate cannot exceed 10%';
  }

  // Contribution Increase validation
  if (!inputs.contributionIncrease || typeof inputs.contributionIncrease !== 'number') {
    errors.contributionIncrease = 'Annual contribution increase is required and must be a number';
  } else if (inputs.contributionIncrease < 0) {
    errors.contributionIncrease = 'Annual contribution increase cannot be negative';
  } else if (inputs.contributionIncrease > 5) {
    errors.contributionIncrease = 'Annual contribution increase cannot exceed 5%';
  }

  // Catch-up Contribution validation
  if (inputs.catchUpContribution === undefined || inputs.catchUpContribution === null) {
    errors.catchUpContribution = 'Catch-up contribution preference is required';
  } else if (typeof inputs.catchUpContribution !== 'boolean') {
    errors.catchUpContribution = 'Catch-up contribution must be true or false';
  }

  // Tax Rate validation
  if (!inputs.taxRate || typeof inputs.taxRate !== 'number') {
    errors.taxRate = 'Current tax rate is required and must be a number';
  } else if (inputs.taxRate < 10) {
    errors.taxRate = 'Current tax rate must be at least 10%';
  } else if (inputs.taxRate > 50) {
    errors.taxRate = 'Current tax rate cannot exceed 50%';
  }

  // Retirement Tax Rate validation
  if (!inputs.retirementTaxRate || typeof inputs.retirementTaxRate !== 'number') {
    errors.retirementTaxRate = 'Expected retirement tax rate is required and must be a number';
  } else if (inputs.retirementTaxRate < 10) {
    errors.retirementTaxRate = 'Expected retirement tax rate must be at least 10%';
  } else if (inputs.retirementTaxRate > 50) {
    errors.retirementTaxRate = 'Expected retirement tax rate cannot exceed 50%';
  }

  // Life Expectancy validation
  if (!inputs.lifeExpectancy || typeof inputs.lifeExpectancy !== 'number') {
    errors.lifeExpectancy = 'Life expectancy is required and must be a number';
  } else if (inputs.lifeExpectancy < 70) {
    errors.lifeExpectancy = 'Life expectancy must be at least 70 years';
  } else if (inputs.lifeExpectancy > 100) {
    errors.lifeExpectancy = 'Life expectancy cannot exceed 100 years';
  }

  // Social Security Income validation
  if (!inputs.socialSecurityIncome || typeof inputs.socialSecurityIncome !== 'number') {
    errors.socialSecurityIncome = 'Expected Social Security income is required and must be a number';
  } else if (inputs.socialSecurityIncome < 0) {
    errors.socialSecurityIncome = 'Expected Social Security income cannot be negative';
  } else if (inputs.socialSecurityIncome > 100000) {
    errors.socialSecurityIncome = 'Expected Social Security income cannot exceed $100,000';
  }

  // Other Retirement Income validation
  if (!inputs.otherRetirementIncome || typeof inputs.otherRetirementIncome !== 'number') {
    errors.otherRetirementIncome = 'Other retirement income is required and must be a number';
  } else if (inputs.otherRetirementIncome < 0) {
    errors.otherRetirementIncome = 'Other retirement income cannot be negative';
  } else if (inputs.otherRetirementIncome > 500000) {
    errors.otherRetirementIncome = 'Other retirement income cannot exceed $500,000';
  }

  // Cross-field validations
  if (inputs.currentAge && inputs.retirementAge && inputs.lifeExpectancy) {
    const yearsToRetirement = (inputs.retirementAge as number) - (inputs.currentAge as number);
    const yearsInRetirement = (inputs.lifeExpectancy as number) - (inputs.retirementAge as number);
    
    if (yearsToRetirement < 5) {
      warnings.retirementAge = 'Very short time to retirement - consider extending retirement age';
    }
    
    if (yearsInRetirement < 10) {
      warnings.lifeExpectancy = 'Short retirement period - consider longer life expectancy';
    }
  }

  // Business logic warnings
  if (inputs.employeeContribution && (inputs.employeeContribution as number) < 6) {
    warnings.employeeContribution = 'Low contribution rate - consider increasing to at least 6%';
  }

  if (inputs.employerMatch && (inputs.employerMatch as number) === 0) {
    warnings.employerMatch = 'No employer match - consider negotiating for better benefits';
  }

  if (inputs.investmentReturn && (inputs.investmentReturn as number) < 5) {
    warnings.investmentReturn = 'Low expected return - consider reviewing investment strategy';
  }

  if (inputs.investmentReturn && (inputs.investmentReturn as number) > 12) {
    warnings.investmentReturn = 'Very high expected return - consider more conservative estimate';
  }

  if (inputs.currentAge && inputs.currentAge >= 50 && !(inputs.catchUpContribution as boolean)) {
    warnings.catchUpContribution = 'Consider catch-up contributions to maximize retirement savings';
  }

  // Contribution limit warnings
  if (inputs.currentSalary && inputs.employeeContribution) {
    const annualContribution = (inputs.currentSalary as number) * ((inputs.employeeContribution as number) / 100);
    const maxContribution = (inputs.currentAge as number) >= 50 ? 30000 : 22500; // 2024 limits
    
    if (annualContribution > maxContribution) {
      warnings.employeeContribution = `Contribution exceeds IRS limit of $${maxContribution.toLocaleString()}`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
