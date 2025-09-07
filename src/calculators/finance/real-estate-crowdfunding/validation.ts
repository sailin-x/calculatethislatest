import { RealEstateCrowdfundingInputs } from './types';

export function validateRealEstateCrowdfundingInputs(inputs: RealEstateCrowdfundingInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Investment Information Validation
  if (!inputs.investmentAmount || inputs.investmentAmount <= 0) {
    errors.push('Investment amount is required and must be greater than 0');
  }

  if (!inputs.totalProjectCost || inputs.totalProjectCost <= 0) {
    errors.push('Total project cost is required and must be greater than 0');
  }

  if (inputs.investmentAmount && inputs.totalProjectCost && inputs.investmentAmount > inputs.totalProjectCost) {
    errors.push('Investment amount cannot exceed total project cost');
  }

  if (!inputs.minimumInvestment || inputs.minimumInvestment <= 0) {
    errors.push('Minimum investment is required and must be greater than 0');
  }

  if (!inputs.maximumInvestment || inputs.maximumInvestment <= 0) {
    errors.push('Maximum investment is required and must be greater than 0');
  }

  if (inputs.minimumInvestment && inputs.maximumInvestment && inputs.minimumInvestment > inputs.maximumInvestment) {
    errors.push('Minimum investment cannot exceed maximum investment');
  }

  if (!inputs.numberOfInvestors || inputs.numberOfInvestors <= 0) {
    errors.push('Number of investors is required and must be greater than 0');
  }

  if (!inputs.investorEquity || inputs.investorEquity <= 0) {
    errors.push('Investor equity is required and must be greater than 0');
  }

  // Project Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value is required and must be greater than 0');
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }

  if (!inputs.propertyLocation || inputs.propertyLocation.trim() === '') {
    errors.push('Property location is required');
  }

  if (!inputs.projectStage) {
    errors.push('Project stage is required');
  }

  if (!inputs.expectedHoldPeriod || inputs.expectedHoldPeriod <= 0) {
    errors.push('Expected hold period is required and must be greater than 0');
  }

  if (!inputs.expectedExitValue || inputs.expectedExitValue <= 0) {
    errors.push('Expected exit value is required and must be greater than 0');
  }

  // Financial Information Validation
  if (inputs.annualRentIncome !== undefined && inputs.annualRentIncome < 0) {
    errors.push('Annual rent income cannot be negative');
  }

  if (inputs.operatingExpenses !== undefined && inputs.operatingExpenses < 0) {
    errors.push('Operating expenses cannot be negative');
  }

  if (inputs.managementFees !== undefined && inputs.managementFees < 0) {
    errors.push('Management fees cannot be negative');
  }

  if (inputs.maintenanceReserve !== undefined && inputs.maintenanceReserve < 0) {
    errors.push('Maintenance reserve cannot be negative');
  }

  if (inputs.insuranceCosts !== undefined && inputs.insuranceCosts < 0) {
    errors.push('Insurance costs cannot be negative');
  }

  if (inputs.propertyTaxes !== undefined && inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }

  // Crowdfunding Platform Fees Validation
  if (inputs.platformFee !== undefined && (inputs.platformFee < 0 || inputs.platformFee > 100)) {
    errors.push('Platform fee must be between 0 and 100 percent');
  }

  if (inputs.transactionFee !== undefined && (inputs.transactionFee < 0 || inputs.transactionFee > 100)) {
    errors.push('Transaction fee must be between 0 and 100 percent');
  }

  if (inputs.servicingFee !== undefined && (inputs.servicingFee < 0 || inputs.servicingFee > 100)) {
    errors.push('Servicing fee must be between 0 and 100 percent');
  }

  if (inputs.exitFee !== undefined && (inputs.exitFee < 0 || inputs.exitFee > 100)) {
    errors.push('Exit fee must be between 0 and 100 percent');
  }

  // Financing Information Validation
  if (inputs.loanToValue !== undefined && (inputs.loanToValue < 0 || inputs.loanToValue > 100)) {
    errors.push('Loan-to-value ratio must be between 0 and 100 percent');
  }

  if (inputs.interestRate !== undefined && (inputs.interestRate < 0 || inputs.interestRate > 30)) {
    errors.push('Interest rate must be between 0 and 30 percent');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term is required and must be greater than 0 months');
  }

  if (inputs.debtServiceCoverage !== undefined && inputs.debtServiceCoverage < 0) {
    errors.push('Debt service coverage ratio cannot be negative');
  }

  // Market Information Validation
  if (inputs.marketRentGrowth !== undefined && (inputs.marketRentGrowth < -50 || inputs.marketRentGrowth > 50)) {
    errors.push('Market rent growth must be between -50% and 50%');
  }

  if (inputs.propertyAppreciation !== undefined && (inputs.propertyAppreciation < -50 || inputs.propertyAppreciation > 50)) {
    errors.push('Property appreciation must be between -50% and 50%');
  }

  if (inputs.capRate !== undefined && (inputs.capRate <= 0 || inputs.capRate > 20)) {
    errors.push('Cap rate must be between 0 and 20 percent');
  }

  if (inputs.marketCapRate !== undefined && (inputs.marketCapRate <= 0 || inputs.marketCapRate > 20)) {
    errors.push('Market cap rate must be between 0 and 20 percent');
  }

  // Risk Factors Validation
  if (inputs.occupancyRate !== undefined && (inputs.occupancyRate < 0 || inputs.occupancyRate > 100)) {
    errors.push('Occupancy rate must be between 0 and 100 percent');
  }

  if (!inputs.tenantQuality) {
    errors.push('Tenant quality is required');
  }

  if (!inputs.locationRisk) {
    errors.push('Location risk is required');
  }

  if (!inputs.marketRisk) {
    errors.push('Market risk is required');
  }

  if (!inputs.regulatoryRisk) {
    errors.push('Regulatory risk is required');
  }

  // Tax Information Validation
  if (!inputs.depreciationSchedule || inputs.depreciationSchedule <= 0) {
    errors.push('Depreciation schedule is required and must be greater than 0 years');
  }

  if (inputs.depreciationBonus !== undefined && (inputs.depreciationBonus < 0 || inputs.depreciationBonus > 100)) {
    errors.push('Depreciation bonus must be between 0 and 100 percent');
  }

  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0 and 50 percent');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period is required and must be greater than 0 years');
  }

  if (inputs.discountRate !== undefined && (inputs.discountRate < 0 || inputs.discountRate > 50)) {
    errors.push('Discount rate must be between 0 and 50 percent');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -10 || inputs.inflationRate > 20)) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  if (!inputs.currency) {
    errors.push('Currency is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateRealEstateCrowdfundingBusinessRules(inputs: RealEstateCrowdfundingInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.investmentAmount && inputs.minimumInvestment && inputs.investmentAmount < inputs.minimumInvestment) {
    warnings.push('Investment amount is below minimum investment requirement');
  }

  if (inputs.investmentAmount && inputs.maximumInvestment && inputs.investmentAmount > inputs.maximumInvestment) {
    warnings.push('Investment amount exceeds maximum investment limit');
  }

  if (inputs.loanToValue && inputs.loanToValue > 80) {
    warnings.push('High loan-to-value ratio may increase risk');
  }

  if (inputs.occupancyRate && inputs.occupancyRate < 90) {
    warnings.push('Low occupancy rate may impact cash flow stability');
  }

  if (inputs.capRate && inputs.marketCapRate && inputs.capRate > inputs.marketCapRate * 1.2) {
    warnings.push('Property cap rate significantly above market may indicate higher risk');
  }

  if (inputs.expectedHoldPeriod && inputs.expectedHoldPeriod < 36) {
    warnings.push('Short hold period may limit appreciation potential');
  }

  if (inputs.platformFee && inputs.platformFee > 5) {
    warnings.push('High platform fee may reduce investor returns');
  }

  if (inputs.interestRate && inputs.interestRate > 8) {
    warnings.push('High interest rate may impact debt service coverage');
  }

  if (inputs.debtServiceCoverage && inputs.debtServiceCoverage < 1.25) {
    warnings.push('Low debt service coverage ratio indicates potential cash flow issues');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}