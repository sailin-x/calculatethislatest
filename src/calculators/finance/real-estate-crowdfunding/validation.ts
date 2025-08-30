import { RealEstateCrowdfundingInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRealEstateCrowdfundingInputs(inputs: RealEstateCrowdfundingInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Investment Information validation
  if (inputs.investmentAmount <= 0) {
    errors.investmentAmount = 'Investment amount must be greater than 0';
  }
  if (inputs.investmentAmount < inputs.minimumInvestment) {
    errors.investmentAmount = `Investment amount must be at least $${inputs.minimumInvestment.toLocaleString()}`;
  }
  if (inputs.investmentAmount > inputs.maximumInvestment) {
    errors.investmentAmount = `Investment amount cannot exceed $${inputs.maximumInvestment.toLocaleString()}`;
  }
  if (inputs.minimumInvestment <= 0) {
    errors.minimumInvestment = 'Minimum investment must be greater than 0';
  }
  if (inputs.maximumInvestment <= 0) {
    errors.maximumInvestment = 'Maximum investment must be greater than 0';
  }
  if (inputs.maximumInvestment < inputs.minimumInvestment) {
    errors.maximumInvestment = 'Maximum investment must be greater than minimum investment';
  }
  if (!['equity', 'debt', 'hybrid', 'preferred_equity', 'mezzanine'].includes(inputs.investmentType)) {
    errors.investmentType = 'Invalid investment type';
  }
  if (inputs.investmentTerm <= 0) {
    errors.investmentTerm = 'Investment term must be greater than 0';
  }
  if (inputs.investmentTerm > 120) {
    errors.investmentTerm = 'Investment term cannot exceed 120 months (10 years)';
  }
  if (inputs.targetIRR < 0 || inputs.targetIRR > 50) {
    errors.targetIRR = 'Target IRR must be between 0% and 50%';
  }
  if (inputs.targetCashOnCash < 0 || inputs.targetCashOnCash > 30) {
    errors.targetCashOnCash = 'Target cash-on-cash return must be between 0% and 30%';
  }
  if (inputs.targetEquityMultiple < 1 || inputs.targetEquityMultiple > 5) {
    errors.targetEquityMultiple = 'Target equity multiple must be between 1.0x and 5.0x';
  }

  // Property Information validation
  if (inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }
  if (!['residential', 'commercial', 'industrial', 'retail', 'office', 'multifamily', 'hotel', 'land', 'mixed_use'].includes(inputs.propertyType)) {
    errors.propertyType = 'Invalid property type';
  }
  if (inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  }
  if (inputs.propertySize > 1000000) {
    errors.propertySize = 'Property size cannot exceed 1,000,000 square feet';
  }
  if (inputs.propertyCondition && !['excellent', 'good', 'fair', 'poor', 'needs_repair'].includes(inputs.propertyCondition)) {
    errors.propertyCondition = 'Invalid property condition';
  }
  if (inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age cannot be negative';
  }
  if (inputs.propertyAge > 100) {
    errors.propertyAge = 'Property age cannot exceed 100 years';
  }
  if (inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
    errors.occupancyRate = 'Occupancy rate must be between 0% and 100%';
  }
  if (inputs.capRate < 0 || inputs.capRate > 20) {
    errors.capRate = 'Cap rate must be between 0% and 20%';
  }

  // Financial Metrics validation
  if (inputs.purchasePrice <= 0) {
    errors.purchasePrice = 'Purchase price must be greater than 0';
  }
  if (inputs.purchasePrice !== inputs.propertyValue) {
    errors.purchasePrice = 'Purchase price should equal property value for consistency';
  }
  if (inputs.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  }
  if (inputs.downPayment > inputs.purchasePrice) {
    errors.downPayment = 'Down payment cannot exceed purchase price';
  }
  if (inputs.loanAmount < 0) {
    errors.loanAmount = 'Loan amount cannot be negative';
  }
  if (inputs.loanAmount > inputs.purchasePrice) {
    errors.loanAmount = 'Loan amount cannot exceed purchase price';
  }
  if (inputs.downPayment + inputs.loanAmount !== inputs.purchasePrice) {
    errors.loanAmount = 'Down payment + loan amount must equal purchase price';
  }
  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.interestRate = 'Interest rate must be between 0% and 20%';
  }
  if (inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  }
  if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }
  if (inputs.monthlyRent < 0) {
    errors.monthlyRent = 'Monthly rent cannot be negative';
  }
  if (inputs.annualRent < 0) {
    errors.annualRent = 'Annual rent cannot be negative';
  }
  if (Math.abs(inputs.monthlyRent * 12 - inputs.annualRent) > 100) {
    errors.annualRent = 'Annual rent should equal monthly rent × 12';
  }
  if (inputs.operatingExpenses < 0) {
    errors.operatingExpenses = 'Operating expenses cannot be negative';
  }
  if (inputs.operatingExpenses > inputs.annualRent) {
    errors.operatingExpenses = 'Operating expenses cannot exceed annual rent';
  }
  if (inputs.propertyManagementFee < 0 || inputs.propertyManagementFee > 20) {
    errors.propertyManagementFee = 'Property management fee must be between 0% and 20%';
  }
  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 50) {
    errors.vacancyRate = 'Vacancy rate must be between 0% and 50%';
  }
  if (inputs.maintenanceReserve < 0) {
    errors.maintenanceReserve = 'Maintenance reserve cannot be negative';
  }
  if (inputs.insuranceCost < 0) {
    errors.insuranceCost = 'Insurance cost cannot be negative';
  }
  if (inputs.propertyTaxRate < 0 || inputs.propertyTaxRate > 10) {
    errors.propertyTaxRate = 'Property tax rate must be between 0% and 10%';
  }

  // Crowdfunding Platform Information validation
  if (inputs.platformFee < 0 || inputs.platformFee > 10) {
    errors.platformFee = 'Platform fee must be between 0% and 10%';
  }
  if (!['percentage', 'flat', 'tiered'].includes(inputs.platformFeeType)) {
    errors.platformFeeType = 'Invalid platform fee type';
  }
  if (inputs.minimumHoldPeriod < 0) {
    errors.minimumHoldPeriod = 'Minimum hold period cannot be negative';
  }
  if (inputs.minimumHoldPeriod > inputs.investmentTerm) {
    errors.minimumHoldPeriod = 'Minimum hold period cannot exceed investment term';
  }
  if (!['none', 'secondary_market', 'buyback_program', 'periodic_redemption'].includes(inputs.liquidityOptions)) {
    errors.liquidityOptions = 'Invalid liquidity options';
  }
  if (inputs.secondaryMarketFee < 0 || inputs.secondaryMarketFee > 10) {
    errors.secondaryMarketFee = 'Secondary market fee must be between 0% and 10%';
  }
  if (inputs.earlyExitPenalty < 0 || inputs.earlyExitPenalty > 20) {
    errors.earlyExitPenalty = 'Early exit penalty must be between 0% and 20%';
  }

  // Market and Economic Factors validation
  if (inputs.marketAppreciationRate < -10 || inputs.marketAppreciationRate > 20) {
    errors.marketAppreciationRate = 'Market appreciation rate must be between -10% and 20%';
  }
  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.inflationRate = 'Inflation rate must be between -5% and 15%';
  }
  if (inputs.localEconomicGrowth < -10 || inputs.localEconomicGrowth > 15) {
    errors.localEconomicGrowth = 'Local economic growth must be between -10% and 15%';
  }
  if (!['low', 'moderate', 'high', 'rising', 'falling'].includes(inputs.interestRateEnvironment)) {
    errors.interestRateEnvironment = 'Invalid interest rate environment';
  }
  if (!['low', 'medium', 'high'].includes(inputs.marketVolatility)) {
    errors.marketVolatility = 'Invalid market volatility';
  }

  // Risk Factors validation
  if (!['low', 'medium', 'high'].includes(inputs.propertyMarketRisk)) {
    errors.propertyMarketRisk = 'Invalid property market risk';
  }
  if (!['low', 'medium', 'high'].includes(inputs.tenantCreditRisk)) {
    errors.tenantCreditRisk = 'Invalid tenant credit risk';
  }
  if (!['low', 'medium', 'high'].includes(inputs.interestRateRisk)) {
    errors.interestRateRisk = 'Invalid interest rate risk';
  }
  if (!['low', 'medium', 'high'].includes(inputs.liquidityRisk)) {
    errors.liquidityRisk = 'Invalid liquidity risk';
  }
  if (!['low', 'medium', 'high'].includes(inputs.regulatoryRisk)) {
    errors.regulatoryRisk = 'Invalid regulatory risk';
  }
  if (!['excellent', 'good', 'fair', 'poor'].includes(inputs.sponsorTrackRecord)) {
    errors.sponsorTrackRecord = 'Invalid sponsor track record';
  }

  // Tax Considerations validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.taxBracket = 'Tax bracket must be between 0% and 50%';
  }
  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 15) {
    errors.stateTaxRate = 'State tax rate must be between 0% and 15%';
  }
  if (inputs.localTaxRate < 0 || inputs.localTaxRate > 10) {
    errors.localTaxRate = 'Local tax rate must be between 0% and 10%';
  }
  if (typeof inputs.depreciationRecapture !== 'boolean') {
    errors.depreciationRecapture = 'Depreciation recapture must be true or false';
  }
  if (typeof inputs.section1031Eligible !== 'boolean') {
    errors.section1031Eligible = 'Section 1031 eligible must be true or false';
  }
  if (typeof inputs.qualifiedBusinessIncome !== 'boolean') {
    errors.qualifiedBusinessIncome = 'Qualified business income must be true or false';
  }

  // Exit Strategy validation
  if (!['sale', 'refinance', 'ipo', 'merger', 'hold'].includes(inputs.exitStrategy)) {
    errors.exitStrategy = 'Invalid exit strategy';
  }
  if (inputs.projectedExitValue <= 0) {
    errors.projectedExitValue = 'Projected exit value must be greater than 0';
  }
  if (inputs.projectedExitValue < inputs.propertyValue * 0.5) {
    errors.projectedExitValue = 'Projected exit value seems too low relative to property value';
  }
  if (inputs.projectedExitValue > inputs.propertyValue * 3) {
    errors.projectedExitValue = 'Projected exit value seems too high relative to property value';
  }
  if (inputs.projectedExitYear < 1) {
    errors.projectedExitYear = 'Projected exit year must be at least 1';
  }
  if (inputs.projectedExitYear > 20) {
    errors.projectedExitYear = 'Projected exit year cannot exceed 20 years';
  }
  if (inputs.projectedExitYear > inputs.investmentTerm / 12) {
    errors.projectedExitYear = 'Projected exit year cannot exceed investment term';
  }
  if (inputs.exitCosts < 0) {
    errors.exitCosts = 'Exit costs cannot be negative';
  }
  if (inputs.exitCosts > inputs.projectedExitValue * 0.1) {
    errors.exitCosts = 'Exit costs seem too high relative to exit value';
  }

  // Additional Investment Options validation
  if (inputs.leverageRatio < 0 || inputs.leverageRatio > 95) {
    errors.leverageRatio = 'Leverage ratio must be between 0% and 95%';
  }
  if (inputs.preferredReturn < 0 || inputs.preferredReturn > 20) {
    errors.preferredReturn = 'Preferred return must be between 0% and 20%';
  }
  if (typeof inputs.promoteStructure !== 'boolean') {
    errors.promoteStructure = 'Promote structure must be true or false';
  }
  if (inputs.promotePercentage < 0 || inputs.promotePercentage > 50) {
    errors.promotePercentage = 'Promote percentage must be between 0% and 50%';
  }
  if (!['simple', 'complex', 'custom'].includes(inputs.waterfallStructure)) {
    errors.waterfallStructure = 'Invalid waterfall structure';
  }

  // Analysis Parameters validation
  if (typeof inputs.includeTaxes !== 'boolean') {
    errors.includeTaxes = 'Include taxes must be true or false';
  }
  if (typeof inputs.includeInflation !== 'boolean') {
    errors.includeInflation = 'Include inflation must be true or false';
  }
  if (typeof inputs.includeAppreciation !== 'boolean') {
    errors.includeAppreciation = 'Include appreciation must be true or false';
  }
  if (typeof inputs.includeLiquidity !== 'boolean') {
    errors.includeLiquidity = 'Include liquidity must be true or false';
  }
  if (typeof inputs.riskAdjustment !== 'boolean') {
    errors.riskAdjustment = 'Risk adjustment must be true or false';
  }
  if (typeof inputs.scenarioAnalysis !== 'boolean') {
    errors.scenarioAnalysis = 'Scenario analysis must be true or false';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }
  if (!['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }
  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be true or false';
  }
  if (typeof inputs.includeComparisons !== 'boolean') {
    errors.includeComparisons = 'Include comparisons must be true or false';
  }
  if (typeof inputs.includeTimeline !== 'boolean') {
    errors.includeTimeline = 'Include timeline must be true or false';
  }

  // Business logic validations
  if (inputs.propertyLocation && inputs.propertyLocation.length > 100) {
    errors.propertyLocation = 'Property location cannot exceed 100 characters';
  }

  // Cross-field validations
  if (inputs.loanAmount > 0 && inputs.interestRate === 0) {
    errors.interestRate = 'Interest rate must be greater than 0 when loan amount is specified';
  }

  if (inputs.loanAmount > 0 && inputs.loanTerm === 0) {
    errors.loanTerm = 'Loan term must be greater than 0 when loan amount is specified';
  }

  if (inputs.platformFeeType === 'flat' && inputs.platformFee > inputs.investmentAmount) {
    errors.platformFee = 'Flat platform fee cannot exceed investment amount';
  }

  if (inputs.liquidityOptions === 'none' && inputs.secondaryMarketFee > 0) {
    errors.secondaryMarketFee = 'Secondary market fee should be 0 when no liquidity options are available';
  }

  if (inputs.liquidityOptions === 'none' && inputs.earlyExitPenalty > 0) {
    errors.earlyExitPenalty = 'Early exit penalty should be 0 when no liquidity options are available';
  }

  // Validate property size vs property type
  if (inputs.propertyType === 'land' && inputs.propertySize < 1000) {
    errors.propertySize = 'Land properties should typically be at least 1,000 square feet';
  }

  if (inputs.propertyType === 'multifamily' && inputs.propertySize < 5000) {
    errors.propertySize = 'Multifamily properties should typically be at least 5,000 square feet';
  }

  if (inputs.propertyType === 'hotel' && inputs.propertySize < 10000) {
    errors.propertySize = 'Hotel properties should typically be at least 10,000 square feet';
  }

  // Validate occupancy rate vs property type
  if (inputs.propertyType === 'land' && inputs.occupancyRate > 0) {
    errors.occupancyRate = 'Land properties should have 0% occupancy rate';
  }

  // Validate cap rate vs property type
  if (inputs.propertyType === 'land' && inputs.capRate > 0) {
    errors.capRate = 'Land properties should have 0% cap rate (no income)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRealEstateCrowdfundingOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Basic validation for required fields
  if (typeof outputs.investmentAmount !== 'number' || outputs.investmentAmount <= 0) {
    errors.investmentAmount = 'Invalid investment amount';
  }

  if (typeof outputs.effectiveInvestment !== 'number' || outputs.effectiveInvestment <= 0) {
    errors.effectiveInvestment = 'Invalid effective investment';
  }

  if (typeof outputs.totalReturn !== 'number') {
    errors.totalReturn = 'Invalid total return';
  }

  if (typeof outputs.annualizedReturn !== 'number') {
    errors.annualizedReturn = 'Invalid annualized return';
  }

  if (typeof outputs.irr !== 'number') {
    errors.irr = 'Invalid IRR';
  }

  if (typeof outputs.equityMultiple !== 'number' || outputs.equityMultiple < 0) {
    errors.equityMultiple = 'Invalid equity multiple';
  }

  if (typeof outputs.cashOnCashReturn !== 'number') {
    errors.cashOnCashReturn = 'Invalid cash-on-cash return';
  }

  if (typeof outputs.riskAdjustedReturn !== 'number') {
    errors.riskAdjustedReturn = 'Invalid risk adjusted return';
  }

  if (typeof outputs.sharpeRatio !== 'number') {
    errors.sharpeRatio = 'Invalid Sharpe ratio';
  }

  if (typeof outputs.maximumDrawdown !== 'number' || outputs.maximumDrawdown < 0) {
    errors.maximumDrawdown = 'Invalid maximum drawdown';
  }

  if (typeof outputs.valueAtRisk !== 'number' || outputs.valueAtRisk < 0) {
    errors.valueAtRisk = 'Invalid value at risk';
  }

  if (typeof outputs.monthlyCashFlow !== 'number') {
    errors.monthlyCashFlow = 'Invalid monthly cash flow';
  }

  if (typeof outputs.annualCashFlow !== 'number') {
    errors.annualCashFlow = 'Invalid annual cash flow';
  }

  if (typeof outputs.totalCashFlow !== 'number') {
    errors.totalCashFlow = 'Invalid total cash flow';
  }

  if (typeof outputs.cashFlowYield !== 'number') {
    errors.cashFlowYield = 'Invalid cash flow yield';
  }

  if (typeof outputs.taxableIncome !== 'number' || outputs.taxableIncome < 0) {
    errors.taxableIncome = 'Invalid taxable income';
  }

  if (typeof outputs.taxLiability !== 'number' || outputs.taxLiability < 0) {
    errors.taxLiability = 'Invalid tax liability';
  }

  if (typeof outputs.afterTaxReturn !== 'number') {
    errors.afterTaxReturn = 'Invalid after-tax return';
  }

  if (typeof outputs.taxEfficiency !== 'number' || outputs.taxEfficiency < 0 || outputs.taxEfficiency > 100) {
    errors.taxEfficiency = 'Invalid tax efficiency';
  }

  if (typeof outputs.platformFees !== 'number' || outputs.platformFees < 0) {
    errors.platformFees = 'Invalid platform fees';
  }

  if (typeof outputs.totalFees !== 'number' || outputs.totalFees < 0) {
    errors.totalFees = 'Invalid total fees';
  }

  if (typeof outputs.netInvestment !== 'number' || outputs.netInvestment <= 0) {
    errors.netInvestment = 'Invalid net investment';
  }

  if (typeof outputs.feeImpact !== 'number' || outputs.feeImpact < 0) {
    errors.feeImpact = 'Invalid fee impact';
  }

  if (typeof outputs.liquidityScore !== 'number' || outputs.liquidityScore < 0 || outputs.liquidityScore > 100) {
    errors.liquidityScore = 'Invalid liquidity score';
  }

  if (typeof outputs.timeToLiquidity !== 'number' || outputs.timeToLiquidity < 0) {
    errors.timeToLiquidity = 'Invalid time to liquidity';
  }

  if (typeof outputs.secondaryMarketValue !== 'number' || outputs.secondaryMarketValue < 0) {
    errors.secondaryMarketValue = 'Invalid secondary market value';
  }

  if (typeof outputs.propertyAppreciation !== 'number') {
    errors.propertyAppreciation = 'Invalid property appreciation';
  }

  if (typeof outputs.rentalGrowth !== 'number') {
    errors.rentalGrowth = 'Invalid rental growth';
  }

  if (typeof outputs.marketValueGrowth !== 'number') {
    errors.marketValueGrowth = 'Invalid market value growth';
  }

  // Validate arrays
  if (!Array.isArray(outputs.cashFlowProjections)) {
    errors.cashFlowProjections = 'Invalid cash flow projections';
  }

  if (!Array.isArray(outputs.exitScenarios)) {
    errors.exitScenarios = 'Invalid exit scenarios';
  }

  if (!Array.isArray(outputs.riskScenarios)) {
    errors.riskScenarios = 'Invalid risk scenarios';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Invalid analysis object';
  }

  // Validate investment summary
  if (!outputs.investmentSummary || typeof outputs.investmentSummary !== 'object') {
    errors.investmentSummary = 'Invalid investment summary';
  }

  // Validate string fields
  if (typeof outputs.investmentType !== 'string' || outputs.investmentType.length === 0) {
    errors.investmentType = 'Invalid investment type';
  }

  if (typeof outputs.propertyType !== 'string' || outputs.propertyType.length === 0) {
    errors.propertyType = 'Invalid property type';
  }

  if (typeof outputs.investmentRating !== 'string' || outputs.investmentRating.length === 0) {
    errors.investmentRating = 'Invalid investment rating';
  }

  if (typeof outputs.riskRating !== 'string' || outputs.riskRating.length === 0) {
    errors.riskRating = 'Invalid risk rating';
  }

  if (typeof outputs.liquidityRating !== 'string' || outputs.liquidityRating.length === 0) {
    errors.liquidityRating = 'Invalid liquidity rating';
  }

  if (typeof outputs.taxEfficiencyRating !== 'string' || outputs.taxEfficiencyRating.length === 0) {
    errors.taxEfficiencyRating = 'Invalid tax efficiency rating';
  }

  // Validate additional metrics
  if (typeof outputs.investmentMultiple !== 'number' || outputs.investmentMultiple < 0) {
    errors.investmentMultiple = 'Invalid investment multiple';
  }

  if (typeof outputs.modifiedIRR !== 'number') {
    errors.modifiedIRR = 'Invalid modified IRR';
  }

  if (typeof outputs.sortinoRatio !== 'number') {
    errors.sortinoRatio = 'Invalid Sortino ratio';
  }

  if (typeof outputs.beta !== 'number' || outputs.beta < 0) {
    errors.beta = 'Invalid beta';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

// Helper function for date validation
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}