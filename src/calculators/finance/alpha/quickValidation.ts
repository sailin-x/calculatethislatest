// Quick validation functions for individual inputs with allInputs parameter

export function validatePortfolioReturns(value: number[], allInputs?: Record<string, any>): string | null {
  if (!value || value.length === 0) {
    return 'Portfolio returns array cannot be empty';
  }
  
  if (value.length < 12) {
    return 'At least 12 periods of data required for meaningful analysis';
  }
  
  const extremeValues = value.filter(r => Math.abs(r) > 100);
  if (extremeValues.length > 0) {
    return 'Portfolio returns contain extreme values (>100%)';
  }
  
  const invalidData = value.filter(r => r === null || r === undefined || isNaN(r));
  if (invalidData.length > 0) {
    return 'Portfolio returns contain missing or invalid data';
  }
  
  return null;
}

export function validateBenchmarkReturns(value: number[], allInputs?: Record<string, any>): string | null {
  if (!value || value.length === 0) {
    return 'Benchmark returns array cannot be empty';
  }
  
  if (allInputs?.portfolioReturns && value.length !== allInputs.portfolioReturns.length) {
    return 'Benchmark returns must have same length as portfolio returns';
  }
  
  const extremeValues = value.filter(r => Math.abs(r) > 100);
  if (extremeValues.length > 0) {
    return 'Benchmark returns contain extreme values (>100%)';
  }
  
  const invalidData = value.filter(r => r === null || r === undefined || isNaN(r));
  if (invalidData.length > 0) {
    return 'Benchmark returns contain missing or invalid data';
  }
  
  return null;
}

export function validateRiskFreeRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Risk-free rate cannot be negative';
  }
  if (value > 20) {
    return 'Risk-free rate over 20% seems unrealistic';
  }
  return null;
}

export function validateAnalysisPeriod(value: string, allInputs?: Record<string, any>): string | null {
  const validPeriods = ['monthly', 'quarterly', 'yearly'];
  if (!validPeriods.includes(value)) {
    return 'Invalid analysis period selected';
  }
  return null;
}

export function validateConfidenceLevel(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 80 || value > 99.9) {
    return 'Confidence level must be between 80% and 99.9%';
  }
  return null;
}

export function validateLookbackPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 12) {
    return 'Lookback period must be at least 12 periods';
  }
  if (value > 500) {
    return 'Lookback period over 500 periods may reduce accuracy';
  }
  
  if (allInputs?.portfolioReturns && value > allInputs.portfolioReturns.length) {
    return 'Lookback period cannot exceed available data length';
  }
  
  return null;
}

export function validatePortfolioValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Portfolio value must be greater than zero';
  }
  if (value > 10000000000) {
    return 'Portfolio value over $10 billion seems unrealistic';
  }
  return null;
}

export function validateBenchmarkName(value: string, allInputs?: Record<string, any>): string | null {
  if (value && value.length > 50) {
    return 'Benchmark name must be 50 characters or less';
  }
  return null;
}

export function validatePortfolioName(value: string, allInputs?: Record<string, any>): string | null {
  if (value && value.length > 50) {
    return 'Portfolio name must be 50 characters or less';
  }
  return null;
}

export function validateMarketReturns(value: number[], allInputs?: Record<string, any>): string | null {
  if (value && value.length > 0) {
    if (allInputs?.portfolioReturns && value.length !== allInputs.portfolioReturns.length) {
      return 'Market returns must have same length as portfolio returns';
    }
    
    const extremeValues = value.filter(r => Math.abs(r) > 100);
    if (extremeValues.length > 0) {
      return 'Market returns contain extreme values (>100%)';
    }
  }
  return null;
}

export function validateTargetAlpha(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < -10 || value > 20) {
      return 'Target alpha must be between -10% and 20%';
    }
  }
  return null;
}

export function validateMaxTrackingError(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Maximum tracking error cannot be negative';
    }
    if (value > 20) {
      return 'Maximum tracking error over 20% seems excessive';
    }
  }
  return null;
}

export function validateTradingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Trading costs cannot be negative';
    }
    if (value > 5) {
      return 'Trading costs over 5% seem excessive';
    }
  }
  return null;
}

export function validateManagementFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Management fees cannot be negative';
    }
    if (value > 10) {
      return 'Management fees over 10% seem excessive';
    }
  }
  return null;
}

export function validatePerformanceFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Performance fees cannot be negative';
    }
    if (value > 50) {
      return 'Performance fees over 50% seem excessive';
    }
    
    if (value > 0 && (!allInputs?.managementFees || allInputs.managementFees === 0)) {
      return 'Performance fees typically require management fees';
    }
  }
  return null;
}

export function validateRebalancingFrequency(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
    if (!validFrequencies.includes(value)) {
      return 'Invalid rebalancing frequency selected';
    }
  }
  return null;
}

export function validateRebalancingThreshold(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Rebalancing threshold cannot be negative';
    }
    if (value > 20) {
      return 'Rebalancing threshold over 20% seems excessive';
    }
  }
  return null;
}

export function validateRegressionMethod(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validMethods = ['ols', 'robust', 'rolling'];
    if (!validMethods.includes(value)) {
      return 'Invalid regression method selected';
    }
  }
  return null;
}

export function validateRollingWindow(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 6) {
      return 'Rolling window must be at least 6 periods';
    }
    if (value > 120) {
      return 'Rolling window over 120 periods may reduce responsiveness';
    }
    
    if (allInputs?.portfolioReturns && value >= allInputs.portfolioReturns.length) {
      return 'Rolling window size must be less than total data length';
    }
  }
  return null;
}

export function validateOutlierTreatment(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTreatments = ['include', 'exclude', 'winsorize'];
    if (!validTreatments.includes(value)) {
      return 'Invalid outlier treatment selected';
    }
  }
  return null;
}

export function validateVarConfidence(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 80 || value > 99.9) {
      return 'VaR confidence level must be between 80% and 99.9%';
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

export function validateDataStartDate(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Invalid start date format';
    }
    
    if (allInputs?.dataEndDate) {
      const endDate = new Date(allInputs.dataEndDate);
      if (date >= endDate) {
        return 'Start date must be before end date';
      }
    }
  }
  return null;
}

export function validateDataEndDate(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Invalid end date format';
    }
    
    if (allInputs?.dataStartDate) {
      const startDate = new Date(allInputs.dataStartDate);
      if (date <= startDate) {
        return 'End date must be after start date';
      }
    }
  }
  return null;
}

export function validateDataFrequency(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validFrequencies = ['daily', 'weekly', 'monthly', 'quarterly'];
    if (!validFrequencies.includes(value)) {
      return 'Invalid data frequency selected';
    }
  }
  return null;
}

export function validateMissingDataTreatment(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTreatments = ['interpolate', 'exclude', 'forward-fill'];
    if (!validTreatments.includes(value)) {
      return 'Invalid missing data treatment selected';
    }
  }
  return null;
}
