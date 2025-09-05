import { OpportunityZoneInvestmentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateOpportunityZoneInvestmentInputs(inputs: OpportunityZoneInvestmentInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Investment Information Validation
  if (!inputs.investmentAmount || inputs.investmentAmount <= 0) {
    errors.push('Investment amount must be greater than 0');
  }

  if (!inputs.investmentDate) {
    errors.push('Investment date is required');
  } else {
    const investmentDate = new Date(inputs.investmentDate);
    if (isNaN(investmentDate.getTime())) {
      errors.push('Investment date must be a valid date');
    }
  }

  if (!inputs.investmentType || !['real_estate', 'business', 'infrastructure', 'mixed_use', 'development'].includes(inputs.investmentType)) {
    errors.push('Investment type must be one of: real_estate, business, infrastructure, mixed_use, development');
  }

  if (!inputs.investmentStructure || !['direct', 'fund', 'partnership', 'syndication'].includes(inputs.investmentStructure)) {
    errors.push('Investment structure must be one of: direct, fund, partnership, syndication');
  }

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType || !['office', 'retail', 'industrial', 'multifamily', 'hotel', 'mixed_use', 'land', 'other'].includes(inputs.propertyType)) {
    errors.push('Property type must be one of: office, retail, industrial, multifamily, hotel, mixed_use, land, other');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }

  if (inputs.numberOfUnits < 0) {
    errors.push('Number of units cannot be negative');
  }

  // Opportunity Zone Information Validation
  if (!inputs.opportunityZoneLocation || inputs.opportunityZoneLocation.trim().length === 0) {
    errors.push('Opportunity Zone location is required');
  }

  if (!inputs.opportunityZoneDesignation || inputs.opportunityZoneDesignation.trim().length === 0) {
    errors.push('Opportunity Zone designation is required');
  }

  if (!inputs.opportunityZoneTier || !['tier_1', 'tier_2', 'tier_3'].includes(inputs.opportunityZoneTier)) {
    errors.push('Opportunity Zone tier must be one of: tier_1, tier_2, tier_3');
  }

  if (!inputs.opportunityZoneBenefits || !Array.isArray(inputs.opportunityZoneBenefits)) {
    errors.push('Opportunity Zone benefits must be an array');
  }

  // Tax Information Validation
  if (!inputs.originalGainAmount || inputs.originalGainAmount <= 0) {
    errors.push('Original gain amount must be greater than 0');
  }

  if (!inputs.originalGainDate) {
    errors.push('Original gain date is required');
  } else {
    const gainDate = new Date(inputs.originalGainDate);
    if (isNaN(gainDate.getTime())) {
      errors.push('Original gain date must be a valid date');
    }
  }

  if (!inputs.originalGainType || !['capital_gain', 'ordinary_income', 'mixed'].includes(inputs.originalGainType)) {
    errors.push('Original gain type must be one of: capital_gain, ordinary_income, mixed');
  }

  if (inputs.investorTaxRate < 0 || inputs.investorTaxRate > 1) {
    errors.push('Investor tax rate must be between 0 and 1');
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 1) {
    errors.push('State tax rate must be between 0 and 1');
  }

  if (inputs.localTaxRate < 0 || inputs.localTaxRate > 1) {
    errors.push('Local tax rate must be between 0 and 1');
  }

  // Investment Timeline Validation
  if (!inputs.investmentPeriod || inputs.investmentPeriod <= 0) {
    errors.push('Investment period must be greater than 0');
  }

  if (inputs.investmentPeriod < 5) {
    warnings.push('Investment period less than 5 years may not qualify for basis step-up benefits');
  }

  if (inputs.investmentPeriod < 10) {
    warnings.push('Investment period less than 10 years may not qualify for full tax exclusion benefits');
  }

  if (!inputs.deferralPeriod || inputs.deferralPeriod <= 0) {
    errors.push('Deferral period must be greater than 0');
  }

  if (!inputs.exclusionPeriod || inputs.exclusionPeriod <= 0) {
    errors.push('Exclusion period must be greater than 0');
  }

  if (!inputs.basisStepUpPeriod || inputs.basisStepUpPeriod <= 0) {
    errors.push('Basis step-up period must be greater than 0');
  }

  if (!inputs.exitDate) {
    errors.push('Exit date is required');
  } else {
    const exitDate = new Date(inputs.exitDate);
    if (isNaN(exitDate.getTime())) {
      errors.push('Exit date must be a valid date');
    }
  }

  // Revenue Projections Validation
  if (!inputs.revenueProjections || !Array.isArray(inputs.revenueProjections)) {
    errors.push('Revenue projections must be an array');
  } else {
    inputs.revenueProjections.forEach((projection, index) => {
      if (!projection.year || projection.year <= 0) {
        errors.push(`Revenue projection ${index + 1}: year must be greater than 0`);
      }
      if (projection.revenue < 0) {
        errors.push(`Revenue projection ${index + 1}: revenue cannot be negative`);
      }
      if (projection.expenses < 0) {
        errors.push(`Revenue projection ${index + 1}: expenses cannot be negative`);
      }
      if (projection.appreciation < 0) {
        errors.push(`Revenue projection ${index + 1}: appreciation cannot be negative`);
      }
    });
  }

  // Tax Benefits Validation
  if (inputs.deferralPercentage < 0 || inputs.deferralPercentage > 1) {
    errors.push('Deferral percentage must be between 0 and 1');
  }

  if (inputs.exclusionPercentage < 0 || inputs.exclusionPercentage > 1) {
    errors.push('Exclusion percentage must be between 0 and 1');
  }

  if (inputs.basisStepUpPercentage < 0 || inputs.basisStepUpPercentage > 1) {
    errors.push('Basis step-up percentage must be between 0 and 1');
  }

  // Investment Returns Validation
  if (inputs.expectedAnnualReturn < 0) {
    errors.push('Expected annual return cannot be negative');
  }

  if (inputs.expectedAppreciation < 0) {
    errors.push('Expected appreciation cannot be negative');
  }

  if (inputs.expectedCashFlow < 0) {
    warnings.push('Expected cash flow is negative, which may indicate a challenging investment');
  }

  if (!inputs.expectedExitValue || inputs.expectedExitValue <= 0) {
    errors.push('Expected exit value must be greater than 0');
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.push('Market location is required');
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.push('Market condition must be one of: declining, stable, growing, hot');
  }

  if (inputs.marketGrowthRate < 0) {
    errors.push('Market growth rate cannot be negative');
  }

  if (!inputs.comparableInvestments || !Array.isArray(inputs.comparableInvestments)) {
    errors.push('Comparable investments must be an array');
  } else {
    inputs.comparableInvestments.forEach((investment, index) => {
      if (!investment.investment || investment.investment.trim().length === 0) {
        errors.push(`Comparable investment ${index + 1}: investment name is required`);
      }
      if (investment.roi < 0) {
        errors.push(`Comparable investment ${index + 1}: ROI cannot be negative`);
      }
      if (investment.irr < 0) {
        errors.push(`Comparable investment ${index + 1}: IRR cannot be negative`);
      }
      if (investment.capRate < 0) {
        errors.push(`Comparable investment ${index + 1}: cap rate cannot be negative`);
      }
    });
  }

  // Risk Factors Validation
  if (!inputs.marketRisk || !['low', 'medium', 'high'].includes(inputs.marketRisk)) {
    errors.push('Market risk must be one of: low, medium, high');
  }

  if (!inputs.regulatoryRisk || !['low', 'medium', 'high'].includes(inputs.regulatoryRisk)) {
    errors.push('Regulatory risk must be one of: low, medium, high');
  }

  if (!inputs.liquidityRisk || !['low', 'medium', 'high'].includes(inputs.liquidityRisk)) {
    errors.push('Liquidity risk must be one of: low, medium, high');
  }

  if (!inputs.developmentRisk || !['low', 'medium', 'high'].includes(inputs.developmentRisk)) {
    errors.push('Development risk must be one of: low, medium, high');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.inflationRate < 0) {
    errors.push('Inflation rate cannot be negative');
  }

  if (inputs.discountRate < 0) {
    errors.push('Discount rate cannot be negative');
  }

  if (inputs.taxDeductionPeriod < 0) {
    errors.push('Tax deduction period cannot be negative');
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.push('Currency must be one of: USD, EUR, GBP, CAD, AUD');
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.push('Display format must be one of: percentage, decimal, currency');
  }

  // Cross-field Validation
  if (inputs.investmentAmount > inputs.propertyValue) {
    warnings.push('Investment amount exceeds property value, which may indicate leverage or additional costs');
  }

  if (inputs.expectedExitValue < inputs.investmentAmount) {
    warnings.push('Expected exit value is less than investment amount, indicating potential loss');
  }

  if (inputs.investmentPeriod < inputs.exclusionPeriod) {
    warnings.push('Investment period is less than exclusion period, may not qualify for full tax benefits');
  }

  if (inputs.investmentPeriod < inputs.basisStepUpPeriod) {
    warnings.push('Investment period is less than basis step-up period, may not qualify for basis step-up benefits');
  }

  // Date Validation
  if (inputs.investmentDate && inputs.originalGainDate) {
    const investmentDate = new Date(inputs.investmentDate);
    const gainDate = new Date(inputs.originalGainDate);
    
    if (investmentDate < gainDate) {
      errors.push('Investment date cannot be before original gain date');
    }
    
    const daysDifference = (investmentDate.getTime() - gainDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDifference > 180) {
      errors.push('Investment must be made within 180 days of original gain recognition');
    }
  }

  if (inputs.exitDate && inputs.investmentDate) {
    const exitDate = new Date(inputs.exitDate);
    const investmentDate = new Date(inputs.investmentDate);
    
    if (exitDate <= investmentDate) {
      errors.push('Exit date must be after investment date');
    }
  }

  // Tax Rate Validation
  const totalTaxRate = inputs.investorTaxRate + inputs.stateTaxRate + inputs.localTaxRate;
  if (totalTaxRate > 1) {
    errors.push('Total tax rate (federal + state + local) cannot exceed 100%');
  }

  if (totalTaxRate > 0.8) {
    warnings.push('Total tax rate is very high, which may impact investment attractiveness');
  }

  // Market Growth Rate Validation
  if (inputs.marketGrowthRate > 0.5) {
    warnings.push('Market growth rate is very high, which may be unrealistic');
  }

  if (inputs.marketGrowthRate < 0 && inputs.marketCondition !== 'declining') {
    warnings.push('Negative market growth rate may not align with market condition');
  }

  // Expected Returns Validation
  if (inputs.expectedAnnualReturn > 0.5) {
    warnings.push('Expected annual return is very high, which may be unrealistic');
  }

  if (inputs.expectedAppreciation > 0.3) {
    warnings.push('Expected appreciation is very high, which may be unrealistic');
  }

  // Risk Assessment Validation
  const highRiskCount = [inputs.marketRisk, inputs.regulatoryRisk, inputs.liquidityRisk, inputs.developmentRisk]
    .filter(risk => risk === 'high').length;
  
  if (highRiskCount >= 3) {
    warnings.push('Multiple high-risk factors identified, investment may be very risky');
  }

  // Revenue Projections Consistency Validation
  if (inputs.revenueProjections && inputs.revenueProjections.length > 0) {
    const firstYear = Math.min(...inputs.revenueProjections.map(p => p.year));
    const lastYear = Math.max(...inputs.revenueProjections.map(p => p.year));
    
    if (lastYear - firstYear + 1 !== inputs.revenueProjections.length) {
      warnings.push('Revenue projections may have gaps or duplicates in years');
    }
    
    if (lastYear - firstYear + 1 !== inputs.investmentPeriod) {
      warnings.push('Revenue projections period does not match investment period');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}