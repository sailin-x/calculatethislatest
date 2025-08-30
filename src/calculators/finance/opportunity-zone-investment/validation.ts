import { OpportunityZoneInvestmentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateOpportunityZoneInvestmentInputs(inputs: OpportunityZoneInvestmentInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Investment Information Validation
  if (!inputs.investmentAmount || inputs.investmentAmount <= 0) {
    errors.investmentAmount = 'Investment amount must be greater than 0';
  }
  if (inputs.investmentAmount > 1000000000) {
    errors.investmentAmount = 'Investment amount cannot exceed $1 billion';
  }

  if (!inputs.investmentDate) {
    errors.investmentDate = 'Investment date is required';
  }

  if (!inputs.investmentType || !['real_estate', 'business', 'infrastructure', 'mixed_use', 'development'].includes(inputs.investmentType)) {
    errors.investmentType = 'Valid investment type is required';
  }

  if (!inputs.investmentStructure || !['direct', 'fund', 'partnership', 'syndication'].includes(inputs.investmentStructure)) {
    errors.investmentStructure = 'Valid investment structure is required';
  }

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }
  if (inputs.propertyValue > 1000000000) {
    errors.propertyValue = 'Property value cannot exceed $1 billion';
  }

  if (!inputs.propertyType || !['office', 'retail', 'industrial', 'multifamily', 'hotel', 'mixed_use', 'land', 'other'].includes(inputs.propertyType)) {
    errors.propertyType = 'Valid property type is required';
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  }
  if (inputs.propertySize > 10000000) {
    errors.propertySize = 'Property size cannot exceed 10 million sq ft';
  }

  if (!inputs.numberOfUnits || inputs.numberOfUnits < 0) {
    errors.numberOfUnits = 'Number of units must be 0 or greater';
  }
  if (inputs.numberOfUnits > 10000) {
    errors.numberOfUnits = 'Number of units cannot exceed 10,000';
  }

  // Opportunity Zone Information Validation
  if (!inputs.opportunityZoneLocation || inputs.opportunityZoneLocation.trim().length === 0) {
    errors.opportunityZoneLocation = 'Opportunity zone location is required';
  }

  if (!inputs.opportunityZoneTier || !['tier_1', 'tier_2', 'tier_3'].includes(inputs.opportunityZoneTier)) {
    errors.opportunityZoneTier = 'Valid opportunity zone tier is required';
  }

  if (!inputs.opportunityZoneBenefits || inputs.opportunityZoneBenefits.length === 0) {
    errors.opportunityZoneBenefits = 'At least one opportunity zone benefit must be specified';
  }

  // Tax Information Validation
  if (!inputs.originalGainAmount || inputs.originalGainAmount <= 0) {
    errors.originalGainAmount = 'Original gain amount must be greater than 0';
  }
  if (inputs.originalGainAmount > 1000000000) {
    errors.originalGainAmount = 'Original gain amount cannot exceed $1 billion';
  }

  if (!inputs.originalGainType || !['capital_gain', 'ordinary_income', 'mixed'].includes(inputs.originalGainType)) {
    errors.originalGainType = 'Valid gain type is required';
  }

  if (!inputs.investorTaxRate || inputs.investorTaxRate < 0) {
    errors.investorTaxRate = 'Investor tax rate must be 0 or greater';
  }
  if (inputs.investorTaxRate > 100) {
    errors.investorTaxRate = 'Investor tax rate cannot exceed 100%';
  }

  if (!inputs.stateTaxRate || inputs.stateTaxRate < 0) {
    errors.stateTaxRate = 'State tax rate must be 0 or greater';
  }
  if (inputs.stateTaxRate > 100) {
    errors.stateTaxRate = 'State tax rate cannot exceed 100%';
  }

  if (!inputs.localTaxRate || inputs.localTaxRate < 0) {
    errors.localTaxRate = 'Local tax rate must be 0 or greater';
  }
  if (inputs.localTaxRate > 100) {
    errors.localTaxRate = 'Local tax rate cannot exceed 100%';
  }

  // Investment Timeline Validation
  if (!inputs.investmentPeriod || inputs.investmentPeriod <= 0) {
    errors.investmentPeriod = 'Investment period must be greater than 0';
  }
  if (inputs.investmentPeriod > 30) {
    errors.investmentPeriod = 'Investment period cannot exceed 30 years';
  }

  if (!inputs.deferralPeriod || inputs.deferralPeriod < 0) {
    errors.deferralPeriod = 'Deferral period must be 0 or greater';
  }
  if (inputs.deferralPeriod > inputs.investmentPeriod) {
    errors.deferralPeriod = 'Deferral period cannot exceed investment period';
  }

  if (!inputs.exclusionPeriod || inputs.exclusionPeriod < 0) {
    errors.exclusionPeriod = 'Exclusion period must be 0 or greater';
  }
  if (inputs.exclusionPeriod > inputs.investmentPeriod) {
    errors.exclusionPeriod = 'Exclusion period cannot exceed investment period';
  }

  if (!inputs.basisStepUpPeriod || inputs.basisStepUpPeriod < 0) {
    errors.basisStepUpPeriod = 'Basis step-up period must be 0 or greater';
  }
  if (inputs.basisStepUpPeriod > inputs.investmentPeriod) {
    errors.basisStepUpPeriod = 'Basis step-up period cannot exceed investment period';
  }

  // Revenue Projections Validation
  if (!inputs.revenueProjections || inputs.revenueProjections.length === 0) {
    errors.revenueProjections = 'Revenue projections are required';
  } else {
    inputs.revenueProjections.forEach((projection, index) => {
      if (!projection.year || projection.year <= 0) {
        errors[`revenueProjections.${index}.year`] = 'Year must be greater than 0';
      }
      if (projection.revenue < 0) {
        errors[`revenueProjections.${index}.revenue`] = 'Revenue cannot be negative';
      }
      if (projection.expenses < 0) {
        errors[`revenueProjections.${index}.expenses`] = 'Expenses cannot be negative';
      }
      if (projection.noi < 0) {
        errors[`revenueProjections.${index}.noi`] = 'NOI cannot be negative';
      }
      if (projection.appreciation < -50 || projection.appreciation > 100) {
        errors[`revenueProjections.${index}.appreciation`] = 'Appreciation must be between -50% and 100%';
      }
    });
  }

  // Tax Benefits Validation
  if (typeof inputs.taxDeferral !== 'boolean') {
    errors.taxDeferral = 'Tax deferral must be true or false';
  }

  if (typeof inputs.taxExclusion !== 'boolean') {
    errors.taxExclusion = 'Tax exclusion must be true or false';
  }

  if (typeof inputs.basisStepUp !== 'boolean') {
    errors.basisStepUp = 'Basis step-up must be true or false';
  }

  if (!inputs.deferralPercentage || inputs.deferralPercentage < 0) {
    errors.deferralPercentage = 'Deferral percentage must be 0 or greater';
  }
  if (inputs.deferralPercentage > 100) {
    errors.deferralPercentage = 'Deferral percentage cannot exceed 100%';
  }

  if (!inputs.exclusionPercentage || inputs.exclusionPercentage < 0) {
    errors.exclusionPercentage = 'Exclusion percentage must be 0 or greater';
  }
  if (inputs.exclusionPercentage > 100) {
    errors.exclusionPercentage = 'Exclusion percentage cannot exceed 100%';
  }

  if (!inputs.basisStepUpPercentage || inputs.basisStepUpPercentage < 0) {
    errors.basisStepUpPercentage = 'Basis step-up percentage must be 0 or greater';
  }
  if (inputs.basisStepUpPercentage > 100) {
    errors.basisStepUpPercentage = 'Basis step-up percentage cannot exceed 100%';
  }

  // Investment Returns Validation
  if (!inputs.expectedAnnualReturn || inputs.expectedAnnualReturn < -100) {
    errors.expectedAnnualReturn = 'Expected annual return must be -100% or greater';
  }
  if (inputs.expectedAnnualReturn > 1000) {
    errors.expectedAnnualReturn = 'Expected annual return cannot exceed 1000%';
  }

  if (!inputs.expectedAppreciation || inputs.expectedAppreciation < -100) {
    errors.expectedAppreciation = 'Expected appreciation must be -100% or greater';
  }
  if (inputs.expectedAppreciation > 1000) {
    errors.expectedAppreciation = 'Expected appreciation cannot exceed 1000%';
  }

  if (!inputs.expectedCashFlow || inputs.expectedCashFlow < -100) {
    errors.expectedCashFlow = 'Expected cash flow must be -100% or greater';
  }
  if (inputs.expectedCashFlow > 1000) {
    errors.expectedCashFlow = 'Expected cash flow cannot exceed 1000%';
  }

  if (!inputs.expectedExitValue || inputs.expectedExitValue <= 0) {
    errors.expectedExitValue = 'Expected exit value must be greater than 0';
  }
  if (inputs.expectedExitValue > 1000000000) {
    errors.expectedExitValue = 'Expected exit value cannot exceed $1 billion';
  }

  // Market Information Validation
  if (!inputs.marketLocation || !['urban', 'suburban', 'rural'].includes(inputs.marketLocation)) {
    errors.marketLocation = 'Valid market location is required';
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing'].includes(inputs.marketCondition)) {
    errors.marketCondition = 'Valid market condition is required';
  }

  if (!inputs.marketGrowthRate || inputs.marketGrowthRate < -50) {
    errors.marketGrowthRate = 'Market growth rate must be -50% or greater';
  }
  if (inputs.marketGrowthRate > 100) {
    errors.marketGrowthRate = 'Market growth rate cannot exceed 100%';
  }

  if (!inputs.comparableInvestments || inputs.comparableInvestments.length === 0) {
    errors.comparableInvestments = 'At least one comparable investment is required';
  } else {
    inputs.comparableInvestments.forEach((investment, index) => {
      if (!investment.investment || investment.investment.trim().length === 0) {
        errors[`comparableInvestments.${index}.investment`] = 'Investment name is required';
      }
      if (investment.roi < -100 || investment.roi > 1000) {
        errors[`comparableInvestments.${index}.roi`] = 'ROI must be between -100% and 1000%';
      }
      if (investment.irr < -100 || investment.irr > 1000) {
        errors[`comparableInvestments.${index}.irr`] = 'IRR must be between -100% and 1000%';
      }
      if (investment.capRate < 0 || investment.capRate > 100) {
        errors[`comparableInvestments.${index}.capRate`] = 'Cap rate must be between 0% and 100%';
      }
    });
  }

  // Risk Factors Validation
  if (!inputs.marketRisk || !['low', 'medium', 'high'].includes(inputs.marketRisk)) {
    errors.marketRisk = 'Valid market risk level is required';
  }

  if (!inputs.regulatoryRisk || !['low', 'medium', 'high'].includes(inputs.regulatoryRisk)) {
    errors.regulatoryRisk = 'Valid regulatory risk level is required';
  }

  if (!inputs.liquidityRisk || !['low', 'medium', 'high'].includes(inputs.liquidityRisk)) {
    errors.liquidityRisk = 'Valid liquidity risk level is required';
  }

  if (!inputs.developmentRisk || !['low', 'medium', 'high'].includes(inputs.developmentRisk)) {
    errors.developmentRisk = 'Valid development risk level is required';
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  }
  if (inputs.analysisPeriod > 50) {
    errors.analysisPeriod = 'Analysis period cannot exceed 50 years';
  }

  if (!inputs.inflationRate || inputs.inflationRate < -50) {
    errors.inflationRate = 'Inflation rate must be -50% or greater';
  }
  if (inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate cannot exceed 100%';
  }

  if (!inputs.discountRate || inputs.discountRate < -100) {
    errors.discountRate = 'Discount rate must be -100% or greater';
  }
  if (inputs.discountRate > 1000) {
    errors.discountRate = 'Discount rate cannot exceed 1000%';
  }

  if (!inputs.taxDeductionPeriod || inputs.taxDeductionPeriod < 0) {
    errors.taxDeductionPeriod = 'Tax deduction period must be 0 or greater';
  }
  if (inputs.taxDeductionPeriod > inputs.investmentPeriod) {
    errors.taxDeductionPeriod = 'Tax deduction period cannot exceed investment period';
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Valid currency is required';
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Valid display format is required';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be true or false';
  }

  // Business Logic Validations
  const totalGrossIncome = inputs.revenueProjections.reduce((total, projection) => total + projection.revenue, 0);
  if (totalGrossIncome <= 0) {
    errors.revenueProjections = 'Total gross income must be greater than 0';
  }

  const totalOperatingExpenses = inputs.revenueProjections.reduce((total, projection) => total + projection.expenses, 0);
  if (totalOperatingExpenses > totalGrossIncome) {
    errors.revenueProjections = 'Total operating expenses cannot exceed total gross income';
  }

  // Investment amount vs property value validation
  if (inputs.investmentAmount > inputs.propertyValue * 1.5) {
    errors.investmentAmount = 'Investment amount seems unusually high relative to property value';
  }

  // Tax benefit validation
  if (inputs.taxDeferral && inputs.deferralPercentage === 0) {
    errors.deferralPercentage = 'Deferral percentage must be greater than 0 if tax deferral is enabled';
  }

  if (inputs.taxExclusion && inputs.exclusionPercentage === 0) {
    errors.exclusionPercentage = 'Exclusion percentage must be greater than 0 if tax exclusion is enabled';
  }

  if (inputs.basisStepUp && inputs.basisStepUpPercentage === 0) {
    errors.basisStepUpPercentage = 'Basis step-up percentage must be greater than 0 if basis step-up is enabled';
  }

  // Timeline validation
  if (inputs.exclusionPeriod < inputs.deferralPeriod) {
    errors.exclusionPeriod = 'Exclusion period should typically be longer than deferral period';
  }

  if (inputs.basisStepUpPeriod < inputs.exclusionPeriod) {
    errors.basisStepUpPeriod = 'Basis step-up period should typically be longer than exclusion period';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateOpportunityZoneInvestmentOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate that all required output fields are present and have reasonable values
  if (typeof outputs.totalReturn !== 'number' || isNaN(outputs.totalReturn)) {
    errors.totalReturn = 'Total return must be a valid number';
  }

  if (typeof outputs.afterTaxReturn !== 'number' || isNaN(outputs.afterTaxReturn)) {
    errors.afterTaxReturn = 'After-tax return must be a valid number';
  }

  if (typeof outputs.internalRateOfReturn !== 'number' || isNaN(outputs.internalRateOfReturn)) {
    errors.internalRateOfReturn = 'Internal rate of return must be a valid number';
  }

  if (typeof outputs.totalTaxBenefit !== 'number' || isNaN(outputs.totalTaxBenefit)) {
    errors.totalTaxBenefit = 'Total tax benefit must be a valid number';
  }

  if (typeof outputs.cashOnCashReturn !== 'number' || isNaN(outputs.cashOnCashReturn)) {
    errors.cashOnCashReturn = 'Cash-on-cash return must be a valid number';
  }

  if (typeof outputs.equityMultiple !== 'number' || isNaN(outputs.equityMultiple)) {
    errors.equityMultiple = 'Equity multiple must be a valid number';
  }

  if (typeof outputs.netPresentValue !== 'number' || isNaN(outputs.netPresentValue)) {
    errors.netPresentValue = 'Net present value must be a valid number';
  }

  if (typeof outputs.paybackPeriod !== 'number' || isNaN(outputs.paybackPeriod)) {
    errors.paybackPeriod = 'Payback period must be a valid number';
  }

  if (typeof outputs.effectiveTaxRate !== 'number' || isNaN(outputs.effectiveTaxRate)) {
    errors.effectiveTaxRate = 'Effective tax rate must be a valid number';
  }

  if (typeof outputs.riskScore !== 'number' || isNaN(outputs.riskScore)) {
    errors.riskScore = 'Risk score must be a valid number';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.investmentRating || typeof outputs.analysis.investmentRating !== 'string') {
      errors.analysis = 'Investment rating is required';
    }
    if (!outputs.analysis.recommendation || typeof outputs.analysis.recommendation !== 'string') {
      errors.analysis = 'Recommendation is required';
    }
  }

  // Validate comparison analysis
  if (!outputs.comparisonAnalysis || !Array.isArray(outputs.comparisonAnalysis)) {
    errors.comparisonAnalysis = 'Comparison analysis array is required';
  }

  // Validate metrics object
  if (!outputs.metrics || typeof outputs.metrics !== 'object') {
    errors.metrics = 'Metrics object is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}