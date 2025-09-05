import { RealEstateSyndicationInputs, RealEstateSyndicationValidation } from './types';

export function validateRealEstateSyndicationInputs(inputs: RealEstateSyndicationInputs): RealEstateSyndicationValidation {
  return {
    totalInvestment: validateTotalInvestment(inputs.totalInvestment),
    sponsorEquity: validateEquity(inputs.sponsorEquity),
    investorEquity: validateEquity(inputs.investorEquity),
    preferredReturn: validatePreferredReturn(inputs.preferredReturn),
    promotePercentage: validatePromotePercentage(inputs.promotePercentage),
    waterfallStructure: validateWaterfallStructure(inputs.waterfallStructure),
    holdPeriod: validateHoldPeriod(inputs.holdPeriod),
    expectedIRR: validateExpectedIRR(inputs.expectedIRR),
    expectedMultiple: validateExpectedMultiple(inputs.expectedMultiple),
    managementFees: validateFees(inputs.managementFees),
    acquisitionFees: validateFees(inputs.acquisitionFees),
    dispositionFees: validateFees(inputs.dispositionFees),
    operatingExpenses: validateExpenses(inputs.operatingExpenses),
    debtService: validateDebtService(inputs.debtService),
    propertyValue: validatePropertyValue(inputs.propertyValue),
    exitValue: validateExitValue(inputs.exitValue),
    depreciation: validateDepreciation(inputs.depreciation),
    taxBenefits: validateTaxBenefits(inputs.taxBenefits),
    investorCount: validateInvestorCount(inputs.investorCount),
    minimumInvestment: validateMinimumInvestment(inputs.minimumInvestment),
    maximumInvestment: validateMaximumInvestment(inputs.maximumInvestment),
    investorType: validateInvestorType(inputs.investorType),
    stateRegulations: validateStateRegulations(inputs.stateRegulations),
    secCompliance: validateSecCompliance(inputs.secCompliance),
    offeringDocument: validateOfferingDocument(inputs.offeringDocument),
    dueDiligence: validateDueDiligence(inputs.dueDiligence)
  };
}

export function validateTotalInvestment(investment: number): boolean {
  return investment > 0 && investment <= 1000000000; // Max $1 billion
}

export function validateEquity(equity: number): boolean {
  return equity >= 0 && equity <= 1000000000; // Max $1 billion
}

export function validatePreferredReturn(returnRate: number): boolean {
  return returnRate >= 0 && returnRate <= 20; // 0% to 20%
}

export function validatePromotePercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 50; // 0% to 50%
}

export function validateWaterfallStructure(structure: string): boolean {
  return ['simple', 'complex', 'custom'].includes(structure);
}

export function validateHoldPeriod(period: number): boolean {
  return period >= 1 && period <= 20; // 1 to 20 years
}

export function validateExpectedIRR(irr: number): boolean {
  return irr >= 0 && irr <= 50; // 0% to 50%
}

export function validateExpectedMultiple(multiple: number): boolean {
  return multiple >= 1 && multiple <= 10; // 1x to 10x
}

export function validateFees(fees: number): boolean {
  return fees >= 0 && fees <= 10000000; // Max $10 million
}

export function validateExpenses(expenses: number): boolean {
  return expenses >= 0 && expenses <= 100000000; // Max $100 million
}

export function validateDebtService(service: number): boolean {
  return service >= 0 && service <= 100000000; // Max $100 million
}

export function validatePropertyValue(value: number): boolean {
  return value > 0 && value <= 1000000000; // Max $1 billion
}

export function validateExitValue(value: number): boolean {
  return value > 0 && value <= 1000000000; // Max $1 billion
}

export function validateDepreciation(depreciation: number): boolean {
  return depreciation >= 0 && depreciation <= 100000000; // Max $100 million
}

export function validateTaxBenefits(benefits: number): boolean {
  return benefits >= 0 && benefits <= 100000000; // Max $100 million
}

export function validateInvestorCount(count: number): boolean {
  return count >= 1 && count <= 1000; // 1 to 1000 investors
}

export function validateMinimumInvestment(investment: number): boolean {
  return investment > 0 && investment <= 10000000; // Max $10 million
}

export function validateMaximumInvestment(investment: number): boolean {
  return investment > 0 && investment <= 10000000; // Max $10 million
}

export function validateInvestorType(type: string): boolean {
  return ['accredited', 'non-accredited', 'both'].includes(type);
}

export function validateStateRegulations(regulations: string[]): boolean {
  return Array.isArray(regulations) && regulations.length <= 50; // Max 50 states
}

export function validateSecCompliance(compliance: boolean): boolean {
  return typeof compliance === 'boolean';
}

export function validateOfferingDocument(document: boolean): boolean {
  return typeof document === 'boolean';
}

export function validateDueDiligence(diligence: boolean): boolean {
  return typeof diligence === 'boolean';
}

export function getValidationErrors(inputs: RealEstateSyndicationInputs): string[] {
  const errors: string[] = [];
  const validation = validateRealEstateSyndicationInputs(inputs);

  if (!validation.totalInvestment) {
    errors.push('Total investment must be greater than $0 and less than $1 billion');
  }

  if (!validation.sponsorEquity) {
    errors.push('Sponsor equity must be between $0 and $1 billion');
  }

  if (!validation.investorEquity) {
    errors.push('Investor equity must be between $0 and $1 billion');
  }

  if (!validation.preferredReturn) {
    errors.push('Preferred return must be between 0% and 20%');
  }

  if (!validation.promotePercentage) {
    errors.push('Promote percentage must be between 0% and 50%');
  }

  if (!validation.waterfallStructure) {
    errors.push('Waterfall structure must be simple, complex, or custom');
  }

  if (!validation.holdPeriod) {
    errors.push('Hold period must be between 1 and 20 years');
  }

  if (!validation.expectedIRR) {
    errors.push('Expected IRR must be between 0% and 50%');
  }

  if (!validation.expectedMultiple) {
    errors.push('Expected multiple must be between 1x and 10x');
  }

  if (!validation.managementFees) {
    errors.push('Management fees must be between $0 and $10 million');
  }

  if (!validation.acquisitionFees) {
    errors.push('Acquisition fees must be between $0 and $10 million');
  }

  if (!validation.dispositionFees) {
    errors.push('Disposition fees must be between $0 and $10 million');
  }

  if (!validation.operatingExpenses) {
    errors.push('Operating expenses must be between $0 and $100 million');
  }

  if (!validation.debtService) {
    errors.push('Debt service must be between $0 and $100 million');
  }

  if (!validation.propertyValue) {
    errors.push('Property value must be greater than $0 and less than $1 billion');
  }

  if (!validation.exitValue) {
    errors.push('Exit value must be greater than $0 and less than $1 billion');
  }

  if (!validation.depreciation) {
    errors.push('Depreciation must be between $0 and $100 million');
  }

  if (!validation.taxBenefits) {
    errors.push('Tax benefits must be between $0 and $100 million');
  }

  if (!validation.investorCount) {
    errors.push('Investor count must be between 1 and 1000');
  }

  if (!validation.minimumInvestment) {
    errors.push('Minimum investment must be between $1 and $10 million');
  }

  if (!validation.maximumInvestment) {
    errors.push('Maximum investment must be between $1 and $10 million');
  }

  if (!validation.investorType) {
    errors.push('Investor type must be accredited, non-accredited, or both');
  }

  if (!validation.stateRegulations) {
    errors.push('State regulations must be an array with no more than 50 items');
  }

  if (!validation.secCompliance) {
    errors.push('SEC compliance must be a boolean value');
  }

  if (!validation.offeringDocument) {
    errors.push('Offering document must be a boolean value');
  }

  if (!validation.dueDiligence) {
    errors.push('Due diligence must be a boolean value');
  }

  // Additional business logic validations
  if (inputs.sponsorEquity + inputs.investorEquity > inputs.totalInvestment) {
    errors.push('Total equity cannot exceed total investment');
  }

  if (inputs.minimumInvestment > inputs.maximumInvestment) {
    errors.push('Minimum investment cannot exceed maximum investment');
  }

  if (inputs.minimumInvestment * inputs.investorCount > inputs.investorEquity) {
    errors.push('Minimum investment times investor count cannot exceed investor equity');
  }

  if (inputs.maximumInvestment * inputs.investorCount < inputs.investorEquity) {
    errors.push('Maximum investment times investor count must be at least investor equity');
  }

  return errors;
}

export function validateRealEstateSyndicationCalculation(inputs: RealEstateSyndicationInputs): boolean {
  const validation = validateRealEstateSyndicationInputs(inputs);
  return Object.values(validation).every(Boolean);
}