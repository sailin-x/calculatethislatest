// Quick validation functions for individual inputs with allInputs parameter

export function validateCompanyName(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Company name is required';
  }
  if (value.length > 100) {
    return 'Company name must be 100 characters or less';
  }
  return null;
}

export function validateCurrentValuation(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Pre-money valuation must be greater than zero';
  }
  if (value > 1000000000) {
    return 'Pre-money valuation over $1 billion seems unrealistic for angel investment';
  }
  return null;
}

export function validateTotalSharesOutstanding(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Total shares outstanding must be greater than zero';
  }
  if (value > 1000000000) {
    return 'Total shares outstanding over 1 billion seems unrealistic';
  }
  return null;
}

export function validateInvestmentAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Investment amount must be greater than zero';
  }
  if (value > 10000000) {
    return 'Investment amount over $10 million seems high for angel investment';
  }
  
  if (allInputs?.currentValuation && value > allInputs.currentValuation * 0.5) {
    return 'Investment amount should not exceed 50% of pre-money valuation';
  }
  return null;
}

export function validateInvestmentType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['equity', 'convertible_note', 'safe', 'preferred_stock'];
  if (!validTypes.includes(value)) {
    return 'Invalid investment type selected';
  }
  return null;
}

export function validateConversionPrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Conversion price must be greater than zero';
    }
    if (value > 1000) {
      return 'Conversion price over $1,000 seems unrealistic';
    }
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Discount rate cannot be negative';
    }
    if (value > 50) {
      return 'Discount rate over 50% seems excessive';
    }
  }
  return null;
}

export function validateCap(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Valuation cap must be greater than zero';
    }
    if (allInputs?.currentValuation && value < allInputs.currentValuation) {
      return 'Valuation cap should not be lower than current valuation';
    }
  }
  return null;
}

export function validateAntiDilutionProtection(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateAntiDilutionType(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTypes = ['full_ratchet', 'weighted_average', 'broad_based', 'narrow_based'];
    if (!validTypes.includes(value)) {
      return 'Invalid anti-dilution type selected';
    }
  }
  return null;
}

export function validateParticipationRights(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateLiquidationPreference(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) {
    return 'Liquidation preference must be at least 1x';
  }
  if (value > 10) {
    return 'Liquidation preference over 10x seems excessive';
  }
  return null;
}

export function validateDividendRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Dividend rate cannot be negative';
    }
    if (value > 20) {
      return 'Dividend rate over 20% seems excessive';
    }
    
    if (value > 0 && allInputs?.investmentType === 'safe') {
      return 'SAFEs typically do not include dividend provisions';
    }
  }
  return null;
}

export function validateOptionPoolSize(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Option pool size cannot be negative';
  }
  if (allInputs?.totalSharesOutstanding && value > allInputs.totalSharesOutstanding) {
    return 'Option pool size cannot exceed total shares outstanding';
  }
  return null;
}

export function validateOptionPoolPercentage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Option pool percentage cannot be negative';
  }
  if (value > 50) {
    return 'Option pool percentage over 50% seems excessive';
  }
  return null;
}

export function validateVestingSchedule(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validSchedules = ['standard', 'accelerated', 'custom'];
    if (!validSchedules.includes(value)) {
      return 'Invalid vesting schedule selected';
    }
  }
  return null;
}

export function validateVestingPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 12) {
    return 'Vesting period must be at least 12 months';
  }
  if (value > 120) {
    return 'Vesting period over 120 months seems excessive';
  }
  return null;
}

export function validateCliffPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Cliff period cannot be negative';
  }
  if (allInputs?.vestingPeriod && value > allInputs.vestingPeriod) {
    return 'Cliff period cannot exceed vesting period';
  }
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

export function validateDiscountRateAnalysis(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 5) {
    return 'Required rate of return below 5% seems too low for angel investment';
  }
  if (value > 100) {
    return 'Required rate of return over 100% seems unrealistic';
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

export function validateMarketConditions(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validConditions = ['bull', 'bear', 'neutral'];
    if (!validConditions.includes(value)) {
      return 'Invalid market conditions selected';
    }
  }
  return null;
}

export function validateRegulatoryCompliance(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateSecuritiesLawCompliance(value: boolean, allInputs?: Record<string, any>): string | null {
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
