import { FourOhThreeBInputs } from './types';

export function validateFourOhThreeBInputs(inputs: FourOhThreeBInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate ages
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge) {
    errors.push({ field: 'retirementAge', message: 'Retirement age must be greater than current age' });
  }
  if (inputs.retirementAge && inputs.retirementAge > 100) {
    errors.push({ field: 'retirementAge', message: 'Retirement age cannot exceed 100' });
  }

  // Validate salary
  if (!inputs.currentSalary || inputs.currentSalary <= 0) {
    errors.push({ field: 'currentSalary', message: 'Current salary must be greater than 0' });
  }
  if (inputs.currentSalary && inputs.currentSalary > 10000000) {
    errors.push({ field: 'currentSalary', message: 'Current salary seems unusually high' });
  }

  // Validate contribution percentages
  if (inputs.employeeContributionPercent === undefined || inputs.employeeContributionPercent < 0) {
    errors.push({ field: 'employeeContributionPercent', message: 'Employee contribution percentage cannot be negative' });
  }
  if (inputs.employeeContributionPercent && inputs.employeeContributionPercent > 100) {
    errors.push({ field: 'employeeContributionPercent', message: 'Employee contribution percentage cannot exceed 100%' });
  }

  if (inputs.employerMatchPercent === undefined || inputs.employerMatchPercent < 0) {
    errors.push({ field: 'employerMatchPercent', message: 'Employer match percentage cannot be negative' });
  }
  if (inputs.employerMatchPercent && inputs.employerMatchPercent > 200) {
    errors.push({ field: 'employerMatchPercent', message: 'Employer match percentage seems unusually high' });
  }

  if (inputs.employerMatchLimitPercent === undefined || inputs.employerMatchLimitPercent < 0) {
    errors.push({ field: 'employerMatchLimitPercent', message: 'Employer match limit percentage cannot be negative' });
  }
  if (inputs.employerMatchLimitPercent && inputs.employerMatchLimitPercent > 100) {
    errors.push({ field: 'employerMatchLimitPercent', message: 'Employer match limit percentage cannot exceed 100%' });
  }

  // Validate salary increase
  if (inputs.expectedAnnualSalaryIncrease === undefined || inputs.expectedAnnualSalaryIncrease < -10) {
    errors.push({ field: 'expectedAnnualSalaryIncrease', message: 'Expected salary increase cannot be less than -10%' });
  }
  if (inputs.expectedAnnualSalaryIncrease && inputs.expectedAnnualSalaryIncrease > 20) {
    errors.push({ field: 'expectedAnnualSalaryIncrease', message: 'Expected salary increase seems unusually high (>20%)' });
  }

  // Validate current balance
  if (inputs.currentBalance === undefined || inputs.currentBalance < 0) {
    errors.push({ field: 'currentBalance', message: 'Current balance cannot be negative' });
  }

  // Validate investment return
  if (inputs.expectedAnnualReturn === undefined || inputs.expectedAnnualReturn < -10) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected annual return cannot be less than -10%' });
  }
  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn > 30) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected annual return seems unusually high (>30%)' });
  }

  // Validate fees
  if (inputs.investmentFees === undefined || inputs.investmentFees < 0) {
    errors.push({ field: 'investmentFees', message: 'Investment fees cannot be negative' });
  }
  if (inputs.investmentFees && inputs.investmentFees > 5) {
    errors.push({ field: 'investmentFees', message: 'Investment fees seem unusually high (>5%)' });
  }

  // Validate tax rates
  if (inputs.currentTaxRate === undefined || inputs.currentTaxRate < 0) {
    errors.push({ field: 'currentTaxRate', message: 'Current tax rate cannot be negative' });
  }
  if (inputs.currentTaxRate && inputs.currentTaxRate > 50) {
    errors.push({ field: 'currentTaxRate', message: 'Current tax rate cannot exceed 50%' });
  }

  if (inputs.retirementTaxRate === undefined || inputs.retirementTaxRate < 0) {
    errors.push({ field: 'retirementTaxRate', message: 'Retirement tax rate cannot be negative' });
  }
  if (inputs.retirementTaxRate && inputs.retirementTaxRate > 50) {
    errors.push({ field: 'retirementTaxRate', message: 'Retirement tax rate cannot exceed 50%' });
  }

  // Validate catch-up contribution
  if (inputs.catchUpContribution !== undefined && inputs.catchUpContribution < 0) {
    errors.push({ field: 'catchUpContribution', message: 'Catch-up contribution cannot be negative' });
  }

  return errors;
}

export function validateFourOhThreeBBusinessRules(inputs: FourOhThreeBInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge;

  if (yearsToRetirement < 10) {
    warnings.push({
      field: 'retirementAge',
      message: 'Short time to retirement - consider delaying retirement or reducing contribution expectations'
    });
  }

  if (inputs.employeeContributionPercent < 5) {
    warnings.push({
      field: 'employeeContributionPercent',
      message: 'Low contribution percentage may result in insufficient retirement savings'
    });
  }

  if (inputs.expectedAnnualReturn < 4) {
    warnings.push({
      field: 'expectedAnnualReturn',
      message: 'Low expected return may not keep pace with inflation'
    });
  }

  if (inputs.investmentFees > 1.5) {
    warnings.push({
      field: 'investmentFees',
      message: 'High investment fees will significantly reduce retirement savings'
    });
  }

  if (inputs.employerMatchPercent > 0 && inputs.employeeContributionPercent < inputs.employerMatchLimitPercent) {
    warnings.push({
      field: 'employeeContributionPercent',
      message: 'You may not be maximizing free employer matching contributions'
    });
  }

  if (inputs.currentAge >= 50 && !inputs.includeCatchUpContributions) {
    warnings.push({
      field: 'includeCatchUpContributions',
      message: 'Consider catch-up contributions now that you are 50 or older'
    });
  }

  if (inputs.expectedAnnualSalaryIncrease < 2) {
    warnings.push({
      field: 'expectedAnnualSalaryIncrease',
      message: 'Low salary increase assumptions may understate future contributions'
    });
  }

  return warnings;
}