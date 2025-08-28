import { AlphaBetaInputs } from './types';

export function validateAlphaBetaInputs(inputs: AlphaBetaInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Portfolio Data Validation
  if (!inputs.portfolioReturns || inputs.portfolioReturns.length === 0) {
    errors.push('Portfolio returns array cannot be empty');
  }
  
  if (!inputs.benchmarkReturns || inputs.benchmarkReturns.length === 0) {
    errors.push('Benchmark returns array cannot be empty');
  }
  
  if (inputs.portfolioReturns && inputs.benchmarkReturns && 
      inputs.portfolioReturns.length !== inputs.benchmarkReturns.length) {
    errors.push('Portfolio and benchmark returns must have the same length');
  }
  
  if (inputs.portfolioReturns && inputs.portfolioReturns.length < 12) {
    errors.push('At least 12 periods of data required for meaningful analysis');
  }
  
  // Check for extreme values in returns
  if (inputs.portfolioReturns) {
    const extremeValues = inputs.portfolioReturns.filter(r => Math.abs(r) > 100);
    if (extremeValues.length > 0) {
      errors.push('Portfolio returns contain extreme values (>100%)');
    }
  }
  
  if (inputs.benchmarkReturns) {
    const extremeValues = inputs.benchmarkReturns.filter(r => Math.abs(r) > 100);
    if (extremeValues.length > 0) {
      errors.push('Benchmark returns contain extreme values (>100%)');
    }
  }

  // Risk-Free Rate Validation
  if (inputs.riskFreeRate < 0) {
    errors.push('Risk-free rate cannot be negative');
  }
  if (inputs.riskFreeRate > 20) {
    errors.push('Risk-free rate over 20% seems unrealistic');
  }

  // Analysis Parameters Validation
  if (inputs.confidenceLevel < 80 || inputs.confidenceLevel > 99.9) {
    errors.push('Confidence level must be between 80% and 99.9%');
  }
  
  if (inputs.lookbackPeriod < 12) {
    errors.push('Lookback period must be at least 12 periods');
  }
  if (inputs.lookbackPeriod > 500) {
    errors.push('Lookback period over 500 periods may reduce accuracy');
  }

  // Portfolio Information Validation
  if (inputs.portfolioValue <= 0) {
    errors.push('Portfolio value must be greater than zero');
  }
  if (inputs.portfolioValue > 10000000000) {
    errors.push('Portfolio value over $10 billion seems unrealistic');
  }
  
  if (inputs.benchmarkName && inputs.benchmarkName.length > 50) {
    errors.push('Benchmark name must be 50 characters or less');
  }
  
  if (inputs.portfolioName && inputs.portfolioName.length > 50) {
    errors.push('Portfolio name must be 50 characters or less');
  }

  // Market Data Validation
  if (inputs.marketReturns && inputs.marketReturns.length > 0) {
    if (inputs.marketReturns.length !== inputs.portfolioReturns.length) {
      errors.push('Market returns must have same length as portfolio returns');
    }
    
    const extremeValues = inputs.marketReturns.filter(r => Math.abs(r) > 100);
    if (extremeValues.length > 0) {
      errors.push('Market returns contain extreme values (>100%)');
    }
  }
  
  if (inputs.marketVolatility !== undefined) {
    if (inputs.marketVolatility < 0) {
      errors.push('Market volatility cannot be negative');
    }
    if (inputs.marketVolatility > 100) {
      errors.push('Market volatility over 100% seems unrealistic');
    }
  }

  // Risk Metrics Validation
  if (inputs.targetVolatility !== undefined) {
    if (inputs.targetVolatility < 0) {
      errors.push('Target volatility cannot be negative');
    }
    if (inputs.targetVolatility > 50) {
      errors.push('Target volatility over 50% seems unrealistic');
    }
  }
  
  if (inputs.maxDrawdown !== undefined) {
    if (inputs.maxDrawdown < 0) {
      errors.push('Maximum drawdown cannot be negative');
    }
    if (inputs.maxDrawdown > 100) {
      errors.push('Maximum drawdown over 100% seems unrealistic');
    }
  }

  // Transaction Costs Validation
  if (inputs.tradingCosts !== undefined) {
    if (inputs.tradingCosts < 0) {
      errors.push('Trading costs cannot be negative');
    }
    if (inputs.tradingCosts > 5) {
      errors.push('Trading costs over 5% seem excessive');
    }
  }
  
  if (inputs.managementFees !== undefined) {
    if (inputs.managementFees < 0) {
      errors.push('Management fees cannot be negative');
    }
    if (inputs.managementFees > 10) {
      errors.push('Management fees over 10% seem excessive');
    }
  }
  
  if (inputs.performanceFees !== undefined) {
    if (inputs.performanceFees < 0) {
      errors.push('Performance fees cannot be negative');
    }
    if (inputs.performanceFees > 50) {
      errors.push('Performance fees over 50% seem excessive');
    }
  }

  // Rebalancing Validation
  if (inputs.rebalancingThreshold !== undefined) {
    if (inputs.rebalancingThreshold < 0) {
      errors.push('Rebalancing threshold cannot be negative');
    }
    if (inputs.rebalancingThreshold > 20) {
      errors.push('Rebalancing threshold over 20% seems excessive');
    }
  }

  // Advanced Parameters Validation
  if (inputs.rollingWindow !== undefined) {
    if (inputs.rollingWindow < 6) {
      errors.push('Rolling window must be at least 6 periods');
    }
    if (inputs.rollingWindow > 120) {
      errors.push('Rolling window over 120 periods may reduce responsiveness');
    }
  }

  // Risk Management Validation
  if (inputs.varConfidence !== undefined) {
    if (inputs.varConfidence < 80 || inputs.varConfidence > 99.9) {
      errors.push('VaR confidence level must be between 80% and 99.9%');
    }
  }

  // Data Quality Checks
  if (inputs.portfolioReturns) {
    // Check for missing or invalid data
    const invalidData = inputs.portfolioReturns.filter(r => r === null || r === undefined || isNaN(r));
    if (invalidData.length > 0) {
      errors.push('Portfolio returns contain missing or invalid data');
    }
    
    // Check for too many identical values (potential data quality issue)
    const uniqueValues = new Set(inputs.portfolioReturns);
    if (uniqueValues.size < inputs.portfolioReturns.length * 0.1) {
      errors.push('Portfolio returns show limited variation (potential data quality issue)');
    }
  }
  
  if (inputs.benchmarkReturns) {
    // Check for missing or invalid data
    const invalidData = inputs.benchmarkReturns.filter(r => r === null || r === undefined || isNaN(r));
    if (invalidData.length > 0) {
      errors.push('Benchmark returns contain missing or invalid data');
    }
  }

  // Business Logic Validation
  if (inputs.portfolioReturns && inputs.benchmarkReturns) {
    // Check for reasonable correlation
    const portfolioMean = inputs.portfolioReturns.reduce((sum, r) => sum + r, 0) / inputs.portfolioReturns.length;
    const benchmarkMean = inputs.benchmarkReturns.reduce((sum, r) => sum + r, 0) / inputs.benchmarkReturns.length;
    
    // Calculate simple correlation check
    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
    
    for (let i = 0; i < inputs.portfolioReturns.length; i++) {
      const portfolioDiff = inputs.portfolioReturns[i] - portfolioMean;
      const benchmarkDiff = inputs.benchmarkReturns[i] - benchmarkMean;
      numerator += portfolioDiff * benchmarkDiff;
      denominator1 += portfolioDiff * portfolioDiff;
      denominator2 += benchmarkDiff * benchmarkDiff;
    }
    
    const correlation = numerator / Math.sqrt(denominator1 * denominator2);
    
    if (Math.abs(correlation) < 0.1) {
      errors.push('Portfolio and benchmark show very low correlation (<0.1) - verify benchmark selection');
    }
    
    if (Math.abs(correlation) > 0.99) {
      errors.push('Portfolio and benchmark show nearly perfect correlation (>0.99) - verify data accuracy');
    }
  }

  // Performance Fee Logic
  if (inputs.performanceFees !== undefined && inputs.performanceFees > 0) {
    if (inputs.managementFees === undefined || inputs.managementFees === 0) {
      errors.push('Performance fees typically require management fees');
    }
  }

  // Rolling Window Logic
  if (inputs.rollingWindow !== undefined && inputs.portfolioReturns) {
    if (inputs.rollingWindow >= inputs.portfolioReturns.length) {
      errors.push('Rolling window size must be less than total data length');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
