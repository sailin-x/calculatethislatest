import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingValidation } from './types';

export function validateRealEstateCrowdfundingInputs(inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingValidation {
  return {
    investmentAmount: validateInvestmentAmount(inputs.investmentAmount),
    projectValue: validateProjectValue(inputs.projectValue),
    expectedHoldPeriod: validateHoldPeriod(inputs.expectedHoldPeriod),
    expectedAnnualReturn: validateAnnualReturn(inputs.expectedAnnualReturn),
    managementFees: validateFees(inputs.managementFees),
    platformFees: validateFees(inputs.platformFees),
    exitFees: validateFees(inputs.exitFees),
    minimumInvestment: validateInvestmentAmount(inputs.minimumInvestment),
    maximumInvestment: validateInvestmentAmount(inputs.maximumInvestment),
    projectType: validateProjectType(inputs.projectType),
    location: validateLocation(inputs.location),
    expectedAppreciation: validateAppreciation(inputs.expectedAppreciation),
    expectedCashFlow: validateCashFlow(inputs.expectedCashFlow),
    taxBenefits: validateTaxBenefits(inputs.taxBenefits),
    liquidityPeriod: validateLiquidityPeriod(inputs.liquidityPeriod)
  };
}

export function validateInvestmentAmount(amount: number): boolean {
  return amount > 0 && amount <= 10000000; // Max $10 million
}

export function validateProjectValue(value: number): boolean {
  return value > 0 && value <= 1000000000; // Max $1 billion
}

export function validateHoldPeriod(period: number): boolean {
  return period >= 1 && period <= 20; // 1 to 20 years
}

export function validateAnnualReturn(returnRate: number): boolean {
  return returnRate >= 0 && returnRate <= 50; // 0% to 50%
}

export function validateFees(fees: number): boolean {
  return fees >= 0 && fees <= 20; // 0% to 20%
}

export function validateProjectType(type: string): boolean {
  return ['residential', 'commercial', 'industrial', 'retail', 'mixed-use'].includes(type);
}

export function validateLocation(location: string): boolean {
  return location.length > 0 && location.length <= 100;
}

export function validateAppreciation(appreciation: number): boolean {
  return appreciation >= -10 && appreciation <= 20; // -10% to 20%
}

export function validateCashFlow(cashFlow: number): boolean {
  return cashFlow >= 0 && cashFlow <= 10000000; // Max $10 million
}

export function validateTaxBenefits(benefits: number): boolean {
  return benefits >= 0 && benefits <= 1000000; // Max $1 million
}

export function validateLiquidityPeriod(period: number): boolean {
  return period >= 0 && period <= 10; // 0 to 10 years
}

export function getValidationErrors(inputs: RealEstateCrowdfundingInputs): string[] {
  const errors: string[] = [];
  const validation = validateRealEstateCrowdfundingInputs(inputs);

  if (!validation.investmentAmount) {
    errors.push('Investment amount must be greater than $0 and less than $10 million');
  }

  if (!validation.projectValue) {
    errors.push('Project value must be greater than $0 and less than $1 billion');
  }

  if (!validation.expectedHoldPeriod) {
    errors.push('Expected hold period must be between 1 and 20 years');
  }

  if (!validation.expectedAnnualReturn) {
    errors.push('Expected annual return must be between 0% and 50%');
  }

  if (!validation.managementFees) {
    errors.push('Management fees must be between 0% and 20%');
  }

  if (!validation.platformFees) {
    errors.push('Platform fees must be between 0% and 20%');
  }

  if (!validation.exitFees) {
    errors.push('Exit fees must be between 0% and 20%');
  }

  if (!validation.minimumInvestment) {
    errors.push('Minimum investment must be greater than $0 and less than $10 million');
  }

  if (!validation.maximumInvestment) {
    errors.push('Maximum investment must be greater than $0 and less than $10 million');
  }

  if (!validation.projectType) {
    errors.push('Project type must be residential, commercial, industrial, retail, or mixed-use');
  }

  if (!validation.location) {
    errors.push('Location must be between 1 and 100 characters');
  }

  if (!validation.expectedAppreciation) {
    errors.push('Expected appreciation must be between -10% and 20%');
  }

  if (!validation.expectedCashFlow) {
    errors.push('Expected cash flow must be between $0 and $10 million');
  }

  if (!validation.taxBenefits) {
    errors.push('Tax benefits must be between $0 and $1 million');
  }

  if (!validation.liquidityPeriod) {
    errors.push('Liquidity period must be between 0 and 10 years');
  }

  // Additional business logic validations
  if (inputs.investmentAmount < inputs.minimumInvestment) {
    errors.push('Investment amount must be at least the minimum investment amount');
  }

  if (inputs.investmentAmount > inputs.maximumInvestment) {
    errors.push('Investment amount cannot exceed the maximum investment amount');
  }

  if (inputs.investmentAmount > inputs.projectValue) {
    errors.push('Investment amount cannot exceed the total project value');
  }

  return errors;
}

export function validateRealEstateCrowdfundingCalculation(inputs: RealEstateCrowdfundingInputs): boolean {
  const validation = validateRealEstateCrowdfundingInputs(inputs);
  return Object.values(validation).every(Boolean);
}