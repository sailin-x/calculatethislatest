import { AngelInvestmentInputs } from './types';

export function validateAngelInvestmentInputs(inputs: AngelInvestmentInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Investment Details Validation
  if (inputs.investmentAmount <= 0) {
    errors.push('Investment amount must be greater than zero');
  }
  if (inputs.investmentAmount > 10000000) {
    errors.push('Investment amount over $10 million seems high for angel investment');
  }

  // Company Information Validation
  if (!inputs.companyName || inputs.companyName.trim().length === 0) {
    errors.push('Company name is required');
  }
  if (inputs.companyName && inputs.companyName.length > 100) {
    errors.push('Company name must be 100 characters or less');
  }
  
  if (!inputs.industry || inputs.industry.trim().length === 0) {
    errors.push('Industry is required');
  }
  if (inputs.industry && inputs.industry.length > 50) {
    errors.push('Industry must be 50 characters or less');
  }
  
  if (!inputs.sector || inputs.sector.trim().length === 0) {
    errors.push('Sector is required');
  }
  if (inputs.sector && inputs.sector.length > 50) {
    errors.push('Sector must be 50 characters or less');
  }
  
  if (inputs.foundingYear < 1990 || inputs.foundingYear > 2030) {
    errors.push('Founding year must be between 1990 and 2030');
  }
  
  if (inputs.teamSize <= 0) {
    errors.push('Team size must be greater than zero');
  }
  if (inputs.teamSize > 1000) {
    errors.push('Team size over 1,000 seems unrealistic for angel investment');
  }

  // Financial Metrics Validation
  if (inputs.currentRevenue < 0) {
    errors.push('Current revenue cannot be negative');
  }
  if (inputs.currentRevenue > 100000000) {
    errors.push('Current revenue over $100 million seems high for angel investment');
  }
  
  if (inputs.revenueGrowthRate < -50 || inputs.revenueGrowthRate > 200) {
    errors.push('Revenue growth rate must be between -50% and 200%');
  }
  
  if (inputs.burnRate < 0) {
    errors.push('Burn rate cannot be negative');
  }
  if (inputs.burnRate > 10000000) {
    errors.push('Burn rate over $10 million per month seems excessive');
  }
  
  if (inputs.runway < 0) {
    errors.push('Runway cannot be negative');
  }
  if (inputs.runway > 60) {
    errors.push('Runway over 60 months seems unrealistic');
  }
  
  if (inputs.customerCount < 0) {
    errors.push('Customer count cannot be negative');
  }
  if (inputs.customerCount > 1000000) {
    errors.push('Customer count over 1 million seems unrealistic for angel investment');
  }
  
  if (inputs.averageRevenuePerUser < 0) {
    errors.push('Average revenue per user cannot be negative');
  }
  if (inputs.averageRevenuePerUser > 10000) {
    errors.push('Average revenue per user over $10,000 seems unrealistic');
  }

  // Valuation Information Validation
  if (inputs.preMoneyValuation <= 0) {
    errors.push('Pre-money valuation must be greater than zero');
  }
  if (inputs.preMoneyValuation > 1000000000) {
    errors.push('Pre-money valuation over $1 billion seems high for angel investment');
  }
  
  if (inputs.postMoneyValuation && inputs.postMoneyValuation <= 0) {
    errors.push('Post-money valuation must be greater than zero');
  }
  
  if (inputs.revenueMultiple && inputs.revenueMultiple <= 0) {
    errors.push('Revenue multiple must be greater than zero');
  }
  if (inputs.revenueMultiple && inputs.revenueMultiple > 100) {
    errors.push('Revenue multiple over 100x seems unrealistic');
  }

  // Investment Terms Validation
  if (inputs.equityPercentage !== undefined) {
    if (inputs.equityPercentage < 0) {
      errors.push('Equity percentage cannot be negative');
    }
    if (inputs.equityPercentage > 100) {
      errors.push('Equity percentage cannot exceed 100%');
    }
  }

  // Market Analysis Validation
  if (inputs.totalAddressableMarket <= 0) {
    errors.push('Total addressable market must be greater than zero');
  }
  if (inputs.totalAddressableMarket > 1000000000000) {
    errors.push('Total addressable market over $1 trillion seems unrealistic');
  }
  
  if (inputs.serviceableAddressableMarket <= 0) {
    errors.push('Serviceable addressable market must be greater than zero');
  }
  if (inputs.serviceableAddressableMarket > inputs.totalAddressableMarket) {
    errors.push('Serviceable addressable market cannot exceed total addressable market');
  }
  
  if (inputs.serviceableObtainableMarket <= 0) {
    errors.push('Serviceable obtainable market must be greater than zero');
  }
  if (inputs.serviceableObtainableMarket > inputs.serviceableAddressableMarket) {
    errors.push('Serviceable obtainable market cannot exceed serviceable addressable market');
  }
  
  if (inputs.marketGrowthRate < -20 || inputs.marketGrowthRate > 50) {
    errors.push('Market growth rate must be between -20% and 50%');
  }

  // Team Assessment Validation
  if (inputs.founderExperience < 0) {
    errors.push('Founder experience cannot be negative');
  }
  if (inputs.founderExperience > 50) {
    errors.push('Founder experience over 50 years seems unrealistic');
  }

  // Traction Metrics Validation
  if (inputs.customerAcquisitionCost < 0) {
    errors.push('Customer acquisition cost cannot be negative');
  }
  if (inputs.customerAcquisitionCost > 10000) {
    errors.push('Customer acquisition cost over $10,000 seems excessive');
  }
  
  if (inputs.customerLifetimeValue < 0) {
    errors.push('Customer lifetime value cannot be negative');
  }
  if (inputs.customerLifetimeValue > 100000) {
    errors.push('Customer lifetime value over $100,000 seems unrealistic');
  }
  
  if (inputs.churnRate < 0) {
    errors.push('Churn rate cannot be negative');
  }
  if (inputs.churnRate > 50) {
    errors.push('Churn rate over 50% seems excessive');
  }

  // Investment Thesis Validation
  if (!inputs.investmentThesis || inputs.investmentThesis.trim().length === 0) {
    errors.push('Investment thesis is required');
  }
  if (inputs.investmentThesis && inputs.investmentThesis.length > 500) {
    errors.push('Investment thesis must be 500 characters or less');
  }
  
  if (inputs.expectedReturn < 5 || inputs.expectedReturn > 100) {
    errors.push('Expected return must be between 5% and 100%');
  }
  
  if (inputs.expectedTimeline < 1) {
    errors.push('Expected timeline must be at least 1 year');
  }
  if (inputs.expectedTimeline > 20) {
    errors.push('Expected timeline over 20 years seems unrealistic');
  }

  // Analysis Parameters Validation
  if (inputs.analysisPeriod < 1) {
    errors.push('Analysis period must be at least 1 year');
  }
  if (inputs.analysisPeriod > 20) {
    errors.push('Analysis period over 20 years seems excessive');
  }
  
  if (inputs.discountRate < 5 || inputs.discountRate > 100) {
    errors.push('Required rate of return must be between 5% and 100%');
  }
  
  if (inputs.numberOfSimulations !== undefined) {
    if (inputs.numberOfSimulations < 1000) {
      errors.push('Number of simulations must be at least 1,000');
    }
    if (inputs.numberOfSimulations > 100000) {
      errors.push('Number of simulations over 100,000 may be computationally intensive');
    }
  }

  // Business Logic Validation
  const ltvToCacRatio = inputs.customerLifetimeValue / inputs.customerAcquisitionCost;
  if (ltvToCacRatio < 0.1) {
    errors.push('LTV/CAC ratio below 0.1 suggests poor unit economics');
  }
  
  const marketPenetration = (inputs.currentRevenue / inputs.serviceableAddressableMarket) * 100;
  if (marketPenetration > 50) {
    errors.push('Market penetration over 50% suggests limited growth potential');
  }
  
  const impliedEquityPercentage = (inputs.investmentAmount / (inputs.preMoneyValuation + inputs.investmentAmount)) * 100;
  if (impliedEquityPercentage > 50) {
    errors.push('Implied equity percentage over 50% may indicate control issues');
  }

  // Convertible Security Validation
  if (inputs.investmentType === 'convertible_note' || inputs.investmentType === 'safe') {
    if (inputs.conversionPrice && inputs.conversionPrice <= 0) {
      errors.push('Conversion price must be greater than zero');
    }
    
    if (inputs.discountRate !== undefined) {
      if (inputs.discountRate < 0) {
        errors.push('Discount rate cannot be negative');
      }
      if (inputs.discountRate > 50) {
        errors.push('Discount rate over 50% seems excessive');
      }
    }
    
    if (inputs.valuationCap && inputs.valuationCap <= 0) {
      errors.push('Valuation cap must be greater than zero');
    }
    
    if (inputs.interestRate !== undefined) {
      if (inputs.interestRate < 0) {
        errors.push('Interest rate cannot be negative');
      }
      if (inputs.interestRate > 20) {
        errors.push('Interest rate over 20% seems excessive');
      }
    }
  }

  // Anti-Dilution Protection Validation
  if (inputs.antiDilutionProtection && !inputs.antiDilutionType) {
    errors.push('Anti-dilution type must be specified when anti-dilution protection is enabled');
  }

  // Liquidation Preferences Validation
  if (inputs.liquidationPreference < 1) {
    errors.push('Liquidation preference must be at least 1x');
  }
  if (inputs.liquidationPreference > 10) {
    errors.push('Liquidation preference over 10x seems excessive');
  }
  
  if (inputs.dividendRate !== undefined) {
    if (inputs.dividendRate < 0) {
      errors.push('Dividend rate cannot be negative');
    }
    if (inputs.dividendRate > 20) {
      errors.push('Dividend rate over 20% seems excessive');
    }
  }

  // Intellectual Property Validation
  if (inputs.patents !== undefined && inputs.patents < 0) {
    errors.push('Number of patents cannot be negative');
  }
  if (inputs.patents !== undefined && inputs.patents > 1000) {
    errors.push('Number of patents over 1,000 seems unrealistic');
  }
  
  if (inputs.trademarks !== undefined && inputs.trademarks < 0) {
    errors.push('Number of trademarks cannot be negative');
  }
  if (inputs.trademarks !== undefined && inputs.trademarks > 100) {
    errors.push('Number of trademarks over 100 seems unrealistic');
  }

  // Data Quality Checks
  if (inputs.currentRevenue > 0 && inputs.customerCount > 0) {
    const impliedARPU = inputs.currentRevenue / inputs.customerCount;
    if (Math.abs(impliedARPU - inputs.averageRevenuePerUser) > inputs.averageRevenuePerUser * 0.5) {
      errors.push('ARPU calculation suggests data inconsistency');
    }
  }
  
  if (inputs.burnRate > 0 && inputs.runway > 0) {
    const impliedCashBalance = inputs.burnRate * inputs.runway;
    if (impliedCashBalance > inputs.preMoneyValuation * 0.5) {
      errors.push('Cash balance relative to valuation suggests potential data issues');
    }
  }

  // Market Size Logic
  if (inputs.serviceableAddressableMarket > inputs.totalAddressableMarket * 0.5) {
    errors.push('SAM over 50% of TAM suggests market size calculation issues');
  }
  
  if (inputs.serviceableObtainableMarket > inputs.serviceableAddressableMarket * 0.3) {
    errors.push('SOM over 30% of SAM suggests obtainable market calculation issues');
  }

  // Team Size Logic
  if (inputs.teamSize > 0 && inputs.currentRevenue > 0) {
    const revenuePerEmployee = inputs.currentRevenue / inputs.teamSize;
    if (revenuePerEmployee > 1000000) {
      errors.push('Revenue per employee over $1 million suggests data quality issues');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
