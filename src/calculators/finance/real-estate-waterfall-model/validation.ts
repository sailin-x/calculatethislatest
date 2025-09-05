import { RealEstateWaterfallModelInputs } from './types';

export function validateRealEstateWaterfallModelInputs(inputs: RealEstateWaterfallModelInputs): string[] {
  const errors: string[] = [];

  // Validate totalInvestment
  if (inputs.totalInvestment <= 0) {
    errors.push('Total investment must be greater than 0');
  }
  if (inputs.totalInvestment > 1000000000) {
    errors.push('Total investment cannot exceed $1,000,000,000');
  }

  // Validate sponsorEquity
  if (inputs.sponsorEquity < 0) {
    errors.push('Sponsor equity cannot be negative');
  }
  if (inputs.sponsorEquity > inputs.totalInvestment) {
    errors.push('Sponsor equity cannot exceed total investment');
  }

  // Validate investorEquity
  if (inputs.investorEquity < 0) {
    errors.push('Investor equity cannot be negative');
  }
  if (inputs.investorEquity > inputs.totalInvestment) {
    errors.push('Investor equity cannot exceed total investment');
  }

  // Validate equity sum
  const totalEquity = inputs.sponsorEquity + inputs.investorEquity;
  if (totalEquity > inputs.totalInvestment) {
    errors.push('Total equity (sponsor + investor) cannot exceed total investment');
  }

  // Validate preferredReturn
  if (inputs.preferredReturn < 0) {
    errors.push('Preferred return cannot be negative');
  }
  if (inputs.preferredReturn > 20) {
    errors.push('Preferred return cannot exceed 20%');
  }

  // Validate catchUpPercentage
  if (inputs.catchUpPercentage < 0) {
    errors.push('Catch-up percentage cannot be negative');
  }
  if (inputs.catchUpPercentage > 50) {
    errors.push('Catch-up percentage cannot exceed 50%');
  }

  // Validate promotePercentage
  if (inputs.promotePercentage < 0) {
    errors.push('Promote percentage cannot be negative');
  }
  if (inputs.promotePercentage > 50) {
    errors.push('Promote percentage cannot exceed 50%');
  }

  // Validate waterfallStructure
  if (!inputs.waterfallStructure || !['simple', 'complex', 'custom'].includes(inputs.waterfallStructure)) {
    errors.push('Waterfall structure must be simple, complex, or custom');
  }

  // Validate holdPeriod
  if (inputs.holdPeriod <= 0) {
    errors.push('Hold period must be greater than 0');
  }
  if (inputs.holdPeriod > 30) {
    errors.push('Hold period cannot exceed 30 years');
  }

  // Validate annualCashFlow
  if (inputs.annualCashFlow < 0) {
    errors.push('Annual cash flow cannot be negative');
  }
  if (inputs.annualCashFlow > 10000000) {
    errors.push('Annual cash flow cannot exceed $10,000,000');
  }

  // Validate exitValue
  if (inputs.exitValue <= 0) {
    errors.push('Exit value must be greater than 0');
  }
  if (inputs.exitValue > 1000000000) {
    errors.push('Exit value cannot exceed $1,000,000,000');
  }

  // Validate fees
  if (inputs.managementFees < 0) {
    errors.push('Management fees cannot be negative');
  }
  if (inputs.managementFees > 1000000) {
    errors.push('Management fees cannot exceed $1,000,000');
  }

  if (inputs.acquisitionFees < 0) {
    errors.push('Acquisition fees cannot be negative');
  }
  if (inputs.acquisitionFees > 1000000) {
    errors.push('Acquisition fees cannot exceed $1,000,000');
  }

  if (inputs.dispositionFees < 0) {
    errors.push('Disposition fees cannot be negative');
  }
  if (inputs.dispositionFees > 1000000) {
    errors.push('Disposition fees cannot exceed $1,000,000');
  }

  // Validate operatingExpenses
  if (inputs.operatingExpenses < 0) {
    errors.push('Operating expenses cannot be negative');
  }
  if (inputs.operatingExpenses > 5000000) {
    errors.push('Operating expenses cannot exceed $5,000,000');
  }

  // Validate debtService
  if (inputs.debtService < 0) {
    errors.push('Debt service cannot be negative');
  }
  if (inputs.debtService > 10000000) {
    errors.push('Debt service cannot exceed $10,000,000');
  }

  // Validate propertyValue
  if (inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }
  if (inputs.propertyValue > 1000000000) {
    errors.push('Property value cannot exceed $1,000,000,000');
  }

  // Validate loanAmount
  if (inputs.loanAmount < 0) {
    errors.push('Loan amount cannot be negative');
  }
  if (inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  // Validate interestRate
  if (inputs.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  }
  if (inputs.interestRate > 20) {
    errors.push('Interest rate cannot exceed 20%');
  }

  // Validate loanTerm
  if (inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }
  if (inputs.loanTerm > 30) {
    errors.push('Loan term cannot exceed 30 years');
  }

  // Validate interestOnlyPeriod
  if (inputs.interestOnlyPeriod < 0) {
    errors.push('Interest-only period cannot be negative');
  }
  if (inputs.interestOnlyPeriod > inputs.loanTerm) {
    errors.push('Interest-only period cannot exceed loan term');
  }

  // Validate depreciation
  if (inputs.depreciation < 0) {
    errors.push('Depreciation cannot be negative');
  }
  if (inputs.depreciation > 1000000) {
    errors.push('Depreciation cannot exceed $1,000,000');
  }

  // Validate taxBenefits
  if (inputs.taxBenefits < 0) {
    errors.push('Tax benefits cannot be negative');
  }
  if (inputs.taxBenefits > 1000000) {
    errors.push('Tax benefits cannot exceed $1,000,000');
  }

  // Validate investorCount
  if (inputs.investorCount <= 0) {
    errors.push('Investor count must be greater than 0');
  }
  if (inputs.investorCount > 1000) {
    errors.push('Investor count cannot exceed 1,000');
  }

  // Validate minimumInvestment
  if (inputs.minimumInvestment <= 0) {
    errors.push('Minimum investment must be greater than 0');
  }
  if (inputs.minimumInvestment > 1000000) {
    errors.push('Minimum investment cannot exceed $1,000,000');
  }

  // Validate maximumInvestment
  if (inputs.maximumInvestment <= 0) {
    errors.push('Maximum investment must be greater than 0');
  }
  if (inputs.maximumInvestment > 10000000) {
    errors.push('Maximum investment cannot exceed $10,000,000');
  }

  // Validate investment range
  if (inputs.minimumInvestment > inputs.maximumInvestment) {
    errors.push('Minimum investment cannot exceed maximum investment');
  }

  // Validate investorType
  if (!inputs.investorType || !['accredited', 'qualified', 'retail'].includes(inputs.investorType)) {
    errors.push('Investor type must be accredited, qualified, or retail');
  }

  // Validate stateRegulations
  if (!Array.isArray(inputs.stateRegulations)) {
    errors.push('State regulations must be an array');
  }
  if (inputs.stateRegulations.length > 50) {
    errors.push('State regulations cannot exceed 50 items');
  }

  // Validate offeringDocument
  if (typeof inputs.offeringDocument !== 'boolean') {
    errors.push('Offering document must be a boolean value');
  }

  // Validate dueDiligence
  if (typeof inputs.dueDiligence !== 'boolean') {
    errors.push('Due diligence must be a boolean value');
  }

  // Validate secCompliance
  if (typeof inputs.secCompliance !== 'boolean') {
    errors.push('SEC compliance must be a boolean value');
  }

  // Business logic validations
  if (inputs.annualCashFlow > inputs.propertyValue * 0.2) {
    errors.push('Annual cash flow seems unusually high relative to property value');
  }

  if (inputs.exitValue < inputs.propertyValue * 0.5) {
    errors.push('Exit value seems unusually low relative to property value');
  }

  if (inputs.exitValue > inputs.propertyValue * 3) {
    errors.push('Exit value seems unusually high relative to property value');
  }

  if (inputs.operatingExpenses > inputs.annualCashFlow * 2) {
    errors.push('Operating expenses seem unusually high relative to annual cash flow');
  }

  if (inputs.debtService > inputs.annualCashFlow * 1.5) {
    errors.push('Debt service seems unusually high relative to annual cash flow');
  }

  if (inputs.loanAmount > inputs.propertyValue * 0.8) {
    errors.push('Loan amount seems unusually high relative to property value (LTV > 80%)');
  }

  if (inputs.investorCount > 100 && inputs.investorType === 'retail') {
    errors.push('Retail investors cannot exceed 100 for SEC compliance');
  }

  if (inputs.investorCount > 35 && inputs.investorType === 'qualified') {
    errors.push('Qualified investors cannot exceed 35 for SEC compliance');
  }

  if (inputs.investorCount > 2000 && inputs.investorType === 'accredited') {
    errors.push('Accredited investors cannot exceed 2,000 for SEC compliance');
  }

  if (inputs.minimumInvestment < 1000 && inputs.investorType === 'accredited') {
    errors.push('Minimum investment for accredited investors should be at least $1,000');
  }

  if (inputs.minimumInvestment < 10000 && inputs.investorType === 'qualified') {
    errors.push('Minimum investment for qualified investors should be at least $10,000');
  }

  if (inputs.minimumInvestment < 100000 && inputs.investorType === 'retail') {
    errors.push('Minimum investment for retail investors should be at least $100,000');
  }

  return errors;
}

export function validateWaterfallStructure(
  preferredReturn: number,
  catchUpPercentage: number,
  promotePercentage: number,
  structure: string
): string[] {
  const errors: string[] = [];

  if (structure === 'simple') {
    if (preferredReturn < 6 || preferredReturn > 12) {
      errors.push('Simple waterfall preferred return should typically be between 6% and 12%');
    }
    if (promotePercentage < 10 || promotePercentage > 30) {
      errors.push('Simple waterfall promote percentage should typically be between 10% and 30%');
    }
  } else if (structure === 'complex') {
    if (preferredReturn < 8 || preferredReturn > 15) {
      errors.push('Complex waterfall preferred return should typically be between 8% and 15%');
    }
    if (catchUpPercentage < 5 || catchUpPercentage > 20) {
      errors.push('Complex waterfall catch-up percentage should typically be between 5% and 20%');
    }
    if (promotePercentage < 15 || promotePercentage > 40) {
      errors.push('Complex waterfall promote percentage should typically be between 15% and 40%');
    }
  }

  if (preferredReturn + catchUpPercentage + promotePercentage > 100) {
    errors.push('Sum of preferred return, catch-up, and promote percentages cannot exceed 100%');
  }

  return errors;
}

export function validateInvestorCompliance(
  investorCount: number,
  investorType: string,
  minimumInvestment: number,
  maximumInvestment: number,
  secCompliance: boolean,
  stateRegulations: string[]
): string[] {
  const errors: string[] = [];

  // SEC compliance validation
  if (investorCount > 35 && !secCompliance && investorType === 'qualified') {
    errors.push('SEC compliance required for more than 35 qualified investors');
  }

  if (investorCount > 100 && !secCompliance && investorType === 'retail') {
    errors.push('SEC compliance required for more than 100 retail investors');
  }

  if (investorCount > 2000 && !secCompliance && investorType === 'accredited') {
    errors.push('SEC compliance required for more than 2,000 accredited investors');
  }

  // State regulation validation
  if (stateRegulations.length > 0 && !secCompliance) {
    errors.push('State regulations require SEC compliance for interstate offerings');
  }

  // Investment amount validation
  if (minimumInvestment < 1000 && investorType === 'accredited') {
    errors.push('Minimum investment for accredited investors should be at least $1,000');
  }

  if (minimumInvestment < 10000 && investorType === 'qualified') {
    errors.push('Minimum investment for qualified investors should be at least $10,000');
  }

  if (minimumInvestment < 100000 && investorType === 'retail') {
    errors.push('Minimum investment for retail investors should be at least $100,000');
  }

  if (maximumInvestment < minimumInvestment * 2) {
    errors.push('Maximum investment should be at least 2x the minimum investment');
  }

  return errors;
}

export function validateFinancialProjections(
  annualCashFlow: number,
  exitValue: number,
  holdPeriod: number,
  propertyValue: number,
  operatingExpenses: number,
  debtService: number
): string[] {
  const errors: string[] = [];

  // Cash flow validation
  if (annualCashFlow < 0) {
    errors.push('Annual cash flow cannot be negative');
  }

  if (annualCashFlow > propertyValue * 0.2) {
    errors.push('Annual cash flow seems unusually high relative to property value');
  }

  // Exit value validation
  if (exitValue < propertyValue * 0.5) {
    errors.push('Exit value seems unusually low relative to property value');
  }

  if (exitValue > propertyValue * 3) {
    errors.push('Exit value seems unusually high relative to property value');
  }

  // Hold period validation
  if (holdPeriod < 1 || holdPeriod > 30) {
    errors.push('Hold period should be between 1 and 30 years');
  }

  // Expense validation
  if (operatingExpenses > annualCashFlow * 2) {
    errors.push('Operating expenses seem unusually high relative to annual cash flow');
  }

  if (debtService > annualCashFlow * 1.5) {
    errors.push('Debt service seems unusually high relative to annual cash flow');
  }

  // Net cash flow validation
  const netCashFlow = annualCashFlow - operatingExpenses - debtService;
  if (netCashFlow < 0) {
    errors.push('Net cash flow (after expenses and debt service) is negative');
  }

  return errors;
}

export function validateRiskParameters(
  loanToValue: number,
  annualCashFlow: number,
  holdPeriod: number,
  secCompliance: boolean,
  stateRegulationCount: number
): string[] {
  const errors: string[] = [];

  // Leverage risk validation
  if (loanToValue > 80) {
    errors.push('Loan-to-value ratio above 80% indicates high leverage risk');
  }

  if (loanToValue > 90) {
    errors.push('Loan-to-value ratio above 90% indicates very high leverage risk');
  }

  // Market risk validation
  if (annualCashFlow < 100000) {
    errors.push('Low annual cash flow indicates high market risk');
  }

  if (holdPeriod > 10) {
    errors.push('Hold period above 10 years indicates high liquidity risk');
  }

  // Regulatory risk validation
  if (!secCompliance && stateRegulationCount > 5) {
    errors.push('Multiple state regulations without SEC compliance indicates high regulatory risk');
  }

  if (stateRegulationCount > 10) {
    errors.push('More than 10 state regulations indicates very high regulatory risk');
  }

  return errors;
}