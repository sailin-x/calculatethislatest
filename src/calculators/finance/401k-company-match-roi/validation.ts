import { CalculatorInputs } from '../../../types/calculator';

export interface FourZeroOneKCompanyMatchROIValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export function validateFourZeroOneKCompanyMatchROIInputs(inputs: CalculatorInputs): FourZeroOneKCompanyMatchROIValidationResult {
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

  // Match Vesting Schedule validation
  if (!inputs.matchVestingSchedule) {
    errors.matchVestingSchedule = 'Vesting schedule is required';
  } else if (typeof inputs.matchVestingSchedule !== 'string') {
    errors.matchVestingSchedule = 'Vesting schedule must be a valid option';
  }

  // Years of Service validation
  if (!inputs.yearsOfService || typeof inputs.yearsOfService !== 'number') {
    errors.yearsOfService = 'Years of service is required and must be a number';
  } else if (inputs.yearsOfService < 0) {
    errors.yearsOfService = 'Years of service cannot be negative';
  } else if (inputs.yearsOfService > 50) {
    errors.yearsOfService = 'Years of service cannot exceed 50 years';
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

  // Alternative Investment Return validation
  if (!inputs.alternativeInvestmentReturn || typeof inputs.alternativeInvestmentReturn !== 'number') {
    errors.alternativeInvestmentReturn = 'Alternative investment return is required and must be a number';
  } else if (inputs.alternativeInvestmentReturn < 1) {
    errors.alternativeInvestmentReturn = 'Alternative investment return must be at least 1%';
  } else if (inputs.alternativeInvestmentReturn > 15) {
    errors.alternativeInvestmentReturn = 'Alternative investment return cannot exceed 15%';
  }

  // Plan to Stay validation
  if (inputs.planToStay === undefined || inputs.planToStay === null) {
    errors.planToStay = 'Plan to stay preference is required';
  } else if (typeof inputs.planToStay !== 'boolean') {
    errors.planToStay = 'Plan to stay must be true or false';
  }

  // Company Stability validation
  if (!inputs.companyStability) {
    errors.companyStability = 'Company stability rating is required';
  } else if (typeof inputs.companyStability !== 'string') {
    errors.companyStability = 'Company stability must be a valid option';
  }

  // Job Satisfaction validation
  if (!inputs.jobSatisfaction) {
    errors.jobSatisfaction = 'Job satisfaction level is required';
  } else if (typeof inputs.jobSatisfaction !== 'string') {
    errors.jobSatisfaction = 'Job satisfaction must be a valid option';
  }

  // Market Conditions validation
  if (!inputs.marketConditions) {
    errors.marketConditions = 'Market conditions is required';
  } else if (typeof inputs.marketConditions !== 'string') {
    errors.marketConditions = 'Market conditions must be a valid option';
  }

  // Cross-field validations
  if (inputs.currentAge && inputs.retirementAge) {
    const yearsToRetirement = (inputs.retirementAge as number) - (inputs.currentAge as number);
    
    if (yearsToRetirement < 5) {
      warnings.retirementAge = 'Very short time to retirement - consider extending retirement age';
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

  // Vesting schedule warnings
  if (inputs.matchVestingSchedule && inputs.yearsOfService) {
    const vestingSchedule = inputs.matchVestingSchedule as string;
    const yearsOfService = inputs.yearsOfService as number;
    
    if (vestingSchedule.includes('cliff-5') && yearsOfService < 5) {
      warnings.matchVestingSchedule = 'Long vesting schedule - significant value at risk if you leave early';
    }
    
    if (vestingSchedule.includes('graded-6') && yearsOfService < 6) {
      warnings.matchVestingSchedule = 'Extended vesting schedule - consider the long-term commitment';
    }
  }

  // Company stability warnings
  if (inputs.companyStability === 'very-risky' || inputs.companyStability === 'risky') {
    warnings.companyStability = 'High company risk - factor this into your vesting decisions';
  }

  // Job satisfaction warnings
  if (inputs.jobSatisfaction === 'very-low' || inputs.jobSatisfaction === 'low') {
    warnings.jobSatisfaction = 'Low job satisfaction - consider this against financial benefits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
