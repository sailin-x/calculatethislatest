// Quick validation functions for individual inputs with allInputs parameter

export function validateInvestmentAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Investment amount must be greater than zero';
  }
  if (value > 10000000) {
    return 'Investment amount over $10 million seems high for angel investment';
  }
  return null;
}

export function validateInvestmentType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['equity', 'convertible_note', 'safe', 'preferred_stock', 'debt'];
  if (!validTypes.includes(value)) {
    return 'Invalid investment type selected';
  }
  return null;
}

export function validateInvestmentStage(value: string, allInputs?: Record<string, any>): string | null {
  const validStages = ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth'];
  if (!validStages.includes(value)) {
    return 'Invalid investment stage selected';
  }
  return null;
}

export function validateCompanyName(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Company name is required';
  }
  if (value.length > 100) {
    return 'Company name must be 100 characters or less';
  }
  return null;
}

export function validateIndustry(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Industry is required';
  }
  if (value.length > 50) {
    return 'Industry must be 50 characters or less';
  }
  return null;
}

export function validateSector(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Sector is required';
  }
  if (value.length > 50) {
    return 'Sector must be 50 characters or less';
  }
  return null;
}

export function validateCompanyStage(value: string, allInputs?: Record<string, any>): string | null {
  const validStages = ['idea', 'mvp', 'early_traction', 'product_market_fit', 'scaling', 'mature'];
  if (!validStages.includes(value)) {
    return 'Invalid company stage selected';
  }
  return null;
}

export function validateFoundingYear(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1990 || value > 2030) {
    return 'Founding year must be between 1990 and 2030';
  }
  return null;
}

export function validateTeamSize(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Team size must be greater than zero';
  }
  if (value > 1000) {
    return 'Team size over 1,000 seems unrealistic for angel investment';
  }
  return null;
}

export function validateCurrentRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Current revenue cannot be negative';
  }
  if (value > 100000000) {
    return 'Current revenue over $100 million seems high for angel investment';
  }
  return null;
}

export function validateRevenueGrowthRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -50 || value > 200) {
    return 'Revenue growth rate must be between -50% and 200%';
  }
  return null;
}

export function validateBurnRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Burn rate cannot be negative';
  }
  if (value > 10000000) {
    return 'Burn rate over $10 million per month seems excessive';
  }
  return null;
}

export function validateRunway(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Runway cannot be negative';
  }
  if (value > 60) {
    return 'Runway over 60 months seems unrealistic';
  }
  return null;
}

export function validateCustomerCount(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Customer count cannot be negative';
  }
  if (value > 1000000) {
    return 'Customer count over 1 million seems unrealistic for angel investment';
  }
  return null;
}

export function validateAverageRevenuePerUser(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Average revenue per user cannot be negative';
  }
  if (value > 10000) {
    return 'Average revenue per user over $10,000 seems unrealistic';
  }
  return null;
}

export function validatePreMoneyValuation(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Pre-money valuation must be greater than zero';
  }
  if (value > 1000000000) {
    return 'Pre-money valuation over $1 billion seems high for angel investment';
  }
  return null;
}

export function validatePostMoneyValuation(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Post-money valuation must be greater than zero';
    }
    if (allInputs?.preMoneyValuation && value <= allInputs.preMoneyValuation) {
      return 'Post-money valuation must be greater than pre-money valuation';
    }
  }
  return null;
}

export function validateValuationMethod(value: string, allInputs?: Record<string, any>): string | null {
  const validMethods = ['revenue_multiple', 'comparable_companies', 'discounted_cash_flow', 'asset_based', 'market_size'];
  if (!validMethods.includes(value)) {
    return 'Invalid valuation method selected';
  }
  return null;
}

export function validateRevenueMultiple(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Revenue multiple must be greater than zero';
    }
    if (value > 100) {
      return 'Revenue multiple over 100x seems unrealistic';
    }
  }
  return null;
}

export function validateEquityPercentage(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Equity percentage cannot be negative';
    }
    if (value > 100) {
      return 'Equity percentage cannot exceed 100%';
    }
  }
  return null;
}

export function validateBoardSeat(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateVotingRights(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateInformationRights(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateTotalAddressableMarket(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Total addressable market must be greater than zero';
  }
  if (value > 1000000000000) {
    return 'Total addressable market over $1 trillion seems unrealistic';
  }
  return null;
}

export function validateServiceableAddressableMarket(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Serviceable addressable market must be greater than zero';
  }
  if (allInputs?.totalAddressableMarket && value > allInputs.totalAddressableMarket) {
    return 'Serviceable addressable market cannot exceed total addressable market';
  }
  return null;
}

export function validateServiceableObtainableMarket(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Serviceable obtainable market must be greater than zero';
  }
  if (allInputs?.serviceableAddressableMarket && value > allInputs.serviceableAddressableMarket) {
    return 'Serviceable obtainable market cannot exceed serviceable addressable market';
  }
  return null;
}

export function validateMarketGrowthRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -20 || value > 50) {
    return 'Market growth rate must be between -20% and 50%';
  }
  return null;
}

export function validateFounderExperience(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Founder experience cannot be negative';
  }
  if (value > 50) {
    return 'Founder experience over 50 years seems unrealistic';
  }
  return null;
}

export function validateTechnicalTeam(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateSalesTeam(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateMarketingTeam(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateAdvisoryBoard(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateProductType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['saas', 'marketplace', 'ecommerce', 'mobile_app', 'hardware', 'biotech', 'fintech', 'other'];
  if (!validTypes.includes(value)) {
    return 'Invalid product type selected';
  }
  return null;
}

export function validateProductStage(value: string, allInputs?: Record<string, any>): string | null {
  const validStages = ['concept', 'development', 'beta', 'launched', 'scaling', 'mature'];
  if (!validStages.includes(value)) {
    return 'Invalid product stage selected';
  }
  return null;
}

export function validateIntellectualProperty(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validatePatents(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Number of patents cannot be negative';
    }
    if (value > 1000) {
      return 'Number of patents over 1,000 seems unrealistic';
    }
  }
  return null;
}

export function validateTrademarks(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Number of trademarks cannot be negative';
    }
    if (value > 100) {
      return 'Number of trademarks over 100 seems unrealistic';
    }
  }
  return null;
}

export function validateCustomerAcquisitionCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Customer acquisition cost cannot be negative';
  }
  if (value > 10000) {
    return 'Customer acquisition cost over $10,000 seems excessive';
  }
  return null;
}

export function validateCustomerLifetimeValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Customer lifetime value cannot be negative';
  }
  if (value > 100000) {
    return 'Customer lifetime value over $100,000 seems unrealistic';
  }
  return null;
}

export function validateChurnRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Churn rate cannot be negative';
  }
  if (value > 50) {
    return 'Churn rate over 50% seems excessive';
  }
  return null;
}

export function validateMarketConditions(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validConditions = ['bull', 'bear', 'neutral'];
    if (!validConditions.includes(value)) {
      return 'Invalid market conditions selected';
    }
  }
  return null;
}

export function validateSectorTrends(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTrends = ['growing', 'stable', 'declining'];
    if (!validTrends.includes(value)) {
      return 'Invalid sector trends selected';
    }
  }
  return null;
}

export function validateRegulatoryEnvironment(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validEnvironments = ['favorable', 'neutral', 'unfavorable'];
    if (!validEnvironments.includes(value)) {
      return 'Invalid regulatory environment selected';
    }
  }
  return null;
}

export function validateInvestmentThesis(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Investment thesis is required';
  }
  if (value.length > 500) {
    return 'Investment thesis must be 500 characters or less';
  }
  return null;
}

export function validateExpectedReturn(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 5 || value > 100) {
    return 'Expected return must be between 5% and 100%';
  }
  return null;
}

export function validateExpectedTimeline(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) {
    return 'Expected timeline must be at least 1 year';
  }
  if (value > 20) {
    return 'Expected timeline over 20 years seems unrealistic';
  }
  return null;
}

export function validateFinancialDueDiligence(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateLegalDueDiligence(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateTechnicalDueDiligence(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateMarketDueDiligence(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validatePortfolioFit(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validFits = ['strategic', 'financial', 'both'];
    if (!validFits.includes(value)) {
      return 'Invalid portfolio fit selected';
    }
  }
  return null;
}

export function validateSectorDiversification(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateStageDiversification(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) {
    return 'Analysis period must be at least 1 year';
  }
  if (value > 20) {
    return 'Analysis period over 20 years seems excessive';
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 5 || value > 100) {
    return 'Required rate of return must be between 5% and 100%';
  }
  return null;
}

export function validateSensitivityAnalysis(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateMonteCarloSimulation(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateNumberOfSimulations(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 1000) {
      return 'Number of simulations must be at least 1,000';
    }
    if (value > 100000) {
      return 'Number of simulations over 100,000 may be computationally intensive';
    }
  }
  return null;
}

export function validateCurrency(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
    if (!validCurrencies.includes(value)) {
      return 'Invalid currency selected';
    }
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validFormats = ['percentage', 'decimal', 'basis-points'];
    if (!validFormats.includes(value)) {
      return 'Invalid display format selected';
    }
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}
