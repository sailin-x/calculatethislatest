import { ValidationRule } from '../../../types/validation';
import { ValidationRuleFactory } from '../../../utils/validation';
import { StockOptionsInputs } from './types';

export const stockOptionsValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('optionType', 'Option type is required'),
  ValidationRuleFactory.required('strikePrice', 'Strike price is required'),
  ValidationRuleFactory.required('currentStockPrice', 'Current stock price is required'),
  ValidationRuleFactory.required('optionPrice', 'Option price is required'),
  ValidationRuleFactory.required('expirationDate', 'Expiration date is required'),
  ValidationRuleFactory.required('numberOfContracts', 'Number of contracts is required'),
  ValidationRuleFactory.required('contractsPerOption', 'Contracts per option is required'),
  ValidationRuleFactory.required('volatility', 'Volatility is required'),
  ValidationRuleFactory.required('riskFreeRate', 'Risk-free rate is required'),
  ValidationRuleFactory.required('dividendYield', 'Dividend yield is required'),
  ValidationRuleFactory.required('strategy', 'Strategy is required'),
  ValidationRuleFactory.required('maxLoss', 'Maximum loss is required'),
  ValidationRuleFactory.required('maxProfit', 'Maximum profit is required'),
  ValidationRuleFactory.required('breakEvenPrice', 'Break-even price is required'),
  ValidationRuleFactory.required('daysToExpiration', 'Days to expiration is required'),
  ValidationRuleFactory.required('timeValue', 'Time value is required'),
  ValidationRuleFactory.required('intrinsicValue', 'Intrinsic value is required'),

  // Numeric validations
  ValidationRuleFactory.range('strikePrice', 0.01, 10000, 'Strike price must be between $0.01 and $10,000'),
  ValidationRuleFactory.range('currentStockPrice', 0.01, 10000, 'Current stock price must be between $0.01 and $10,000'),
  ValidationRuleFactory.range('optionPrice', 0, 1000, 'Option price must be between $0 and $1,000'),
  ValidationRuleFactory.range('numberOfContracts', 1, 10000, 'Number of contracts must be between 1 and 10,000'),
  ValidationRuleFactory.range('contractsPerOption', 1, 1000000, 'Contracts per option must be between 1 and 1,000,000'),
  ValidationRuleFactory.range('volatility', 0.1, 500, 'Volatility must be between 0.1% and 500%'),
  ValidationRuleFactory.range('riskFreeRate', -10, 50, 'Risk-free rate must be between -10% and 50%'),
  ValidationRuleFactory.range('dividendYield', 0, 50, 'Dividend yield must be between 0% and 50%'),
  ValidationRuleFactory.range('maxLoss', -1000000, 0, 'Maximum loss must be between -$1,000,000 and $0'),
  ValidationRuleFactory.range('maxProfit', 0, 1000000, 'Maximum profit must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('breakEvenPrice', 0, 10000, 'Break-even price must be between $0 and $10,000'),
  ValidationRuleFactory.range('daysToExpiration', 0, 3650, 'Days to expiration must be between 0 and 3,650'),
  ValidationRuleFactory.range('timeValue', 0, 1000, 'Time value must be between $0 and $1,000'),
  ValidationRuleFactory.range('intrinsicValue', 0, 10000, 'Intrinsic value must be between $0 and $10,000'),

  // Optional fields with ranges
  ValidationRuleFactory.range('delta', -1, 1, 'Delta must be between -1 and 1'),
  ValidationRuleFactory.range('gamma', 0, 1, 'Gamma must be between 0 and 1'),
  ValidationRuleFactory.range('theta', -1000, 1000, 'Theta must be between -$1,000 and $1,000'),
  ValidationRuleFactory.range('vega', -1000, 1000, 'Vega must be between -$1,000 and $1,000'),
  ValidationRuleFactory.range('rho', -1000, 1000, 'Rho must be between -$1,000 and $1,000'),
  ValidationRuleFactory.range('secondStrikePrice', 0.01, 10000, 'Second strike price must be between $0.01 and $10,000'),
  ValidationRuleFactory.range('secondOptionPrice', 0, 1000, 'Second option price must be between $0 and $1,000'),
  ValidationRuleFactory.range('impliedVolatility', 0.1, 500, 'Implied volatility must be between 0.1% and 500%'),
  ValidationRuleFactory.range('historicalVolatility', 0.1, 500, 'Historical volatility must be between 0.1% and 500%'),
  ValidationRuleFactory.range('beta', -10, 10, 'Beta must be between -10 and 10'),
  ValidationRuleFactory.range('correlation', -1, 1, 'Correlation must be between -1 and 1'),
  ValidationRuleFactory.range('portfolioValue', 0, 100000000, 'Portfolio value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('positionSize', 0, 10000000, 'Position size must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('marginRequirement', 0, 10000000, 'Margin requirement must be between $0 and $10,000,000'),

  // Cross-field validations
  ValidationRuleFactory.createRule('optionPrice', 'Option price should be reasonable relative to stock price', (value: any, allInputs?: Record<string, any>) => {
    const currentStockPrice = allInputs?.currentStockPrice;
    const strikePrice = allInputs?.strikePrice;
    if (!currentStockPrice || !strikePrice || !value) return true;
    
    const maxReasonablePrice = Math.max(currentStockPrice, strikePrice) * 0.5;
    return value <= maxReasonablePrice;
  }),

  ValidationRuleFactory.createRule('strikePrice', 'Strike price should be reasonable relative to stock price', (value: any, allInputs?: Record<string, any>) => {
    const currentStockPrice = allInputs?.currentStockPrice;
    if (!currentStockPrice || !value) return true;
    
    const priceRatio = value / currentStockPrice;
    return priceRatio >= 0.1 && priceRatio <= 10;
  }),

  ValidationRuleFactory.createRule('daysToExpiration', 'Days to expiration should align with option pricing', (value: any, allInputs?: Record<string, any>) => {
    const timeValue = allInputs?.timeValue;
    const optionPrice = allInputs?.optionPrice;
    if (!timeValue || !optionPrice || !value) return true;
    
    // Short-term options should have higher time value relative to price
    if (value < 30 && timeValue < optionPrice * 0.1) return false;
    
    // Long-term options should have substantial time value
    if (value > 365 && timeValue < optionPrice * 0.3) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('volatility', 'Volatility should align with option type and moneyness', (value: any, allInputs?: Record<string, any>) => {
    const currentStockPrice = allInputs?.currentStockPrice;
    const strikePrice = allInputs?.strikePrice;
    const optionType = allInputs?.optionType;
    if (!currentStockPrice || !strikePrice || !optionType || !value) return true;
    
    const moneyness = Math.log(currentStockPrice / strikePrice);
    
    // ATM options should have moderate volatility
    if (Math.abs(moneyness) < 0.1 && (value < 10 || value > 100)) return false;
    
    // OTM options can have higher volatility
    if (optionType === 'call' && moneyness < -0.2 && value < 20) return false;
    if (optionType === 'put' && moneyness > 0.2 && value < 20) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('intrinsicValue', 'Intrinsic value should align with option type and prices', (value: any, allInputs?: Record<string, any>) => {
    const currentStockPrice = allInputs?.currentStockPrice;
    const strikePrice = allInputs?.strikePrice;
    const optionType = allInputs?.optionType;
    const optionPrice = allInputs?.optionPrice;
    if (!currentStockPrice || !strikePrice || !optionType || !optionPrice || !value) return true;
    
    let expectedIntrinsic = 0;
    if (optionType === 'call') {
      expectedIntrinsic = Math.max(0, currentStockPrice - strikePrice);
    } else {
      expectedIntrinsic = Math.max(0, strikePrice - currentStockPrice);
    }
    
    // Allow some tolerance for rounding and market conditions
    const tolerance = Math.max(0.01, expectedIntrinsic * 0.05);
    return Math.abs(value - expectedIntrinsic) <= tolerance;
  }),

  ValidationRuleFactory.createRule('timeValue', 'Time value should be reasonable relative to option price', (value: any, allInputs?: Record<string, any>) => {
    const optionPrice = allInputs?.optionPrice;
    const intrinsicValue = allInputs?.intrinsicValue;
    const daysToExpiration = allInputs?.daysToExpiration;
    if (!optionPrice || !intrinsicValue || !daysToExpiration || !value) return true;
    
    const expectedTimeValue = optionPrice - intrinsicValue;
    const tolerance = Math.max(0.01, expectedTimeValue * 0.1);
    
    return Math.abs(value - expectedTimeValue) <= tolerance;
  }),

  ValidationRuleFactory.createRule('maxLoss', 'Maximum loss should align with strategy type', (value: any, allInputs?: Record<string, any>) => {
    const strategy = allInputs?.strategy;
    const optionPrice = allInputs?.optionPrice;
    const numberOfContracts = allInputs?.numberOfContracts;
    const contractsPerOption = allInputs?.contractsPerOption;
    if (!strategy || !optionPrice || !numberOfContracts || !contractsPerOption || !value) return true;
    
    const positionValue = numberOfContracts * contractsPerOption * optionPrice;
    
    if (strategy.includes('long')) {
      // Long strategies: max loss is typically the premium paid
      return Math.abs(value) <= positionValue * 1.1;
    } else if (strategy.includes('short')) {
      // Short strategies: max loss can be unlimited or strike price
      return value <= 0;
    }
    
    return true;
  }),

  ValidationRuleFactory.createRule('maxProfit', 'Maximum profit should align with strategy type', (value: any, allInputs?: Record<string, any>) => {
    const strategy = allInputs?.strategy;
    const optionPrice = allInputs?.optionPrice;
    const numberOfContracts = allInputs?.numberOfContracts;
    const contractsPerOption = allInputs?.contractsPerOption;
    if (!strategy || !optionPrice || !numberOfContracts || !contractsPerOption || !value) return true;
    
    const positionValue = numberOfContracts * contractsPerOption * optionPrice;
    
    if (strategy.includes('short')) {
      // Short strategies: max profit is typically the premium received
      return value <= positionValue * 1.1;
    } else if (strategy.includes('long')) {
      // Long strategies: max profit can be unlimited or limited
      return value >= 0;
    }
    
    return true;
  }),

  ValidationRuleFactory.createRule('breakEvenPrice', 'Break-even price should align with option type and strategy', (value: any, allInputs?: Record<string, any>) => {
    const optionType = allInputs?.optionType;
    const strikePrice = allInputs?.strikePrice;
    const optionPrice = allInputs?.optionPrice;
    const strategy = allInputs?.strategy;
    if (!optionType || !strikePrice || !optionPrice || !strategy || !value) return true;
    
    let expectedBreakEven = 0;
    if (optionType === 'call') {
      expectedBreakEven = strikePrice + optionPrice;
    } else {
      expectedBreakEven = strikePrice - optionPrice;
    }
    
    // Adjust for strategy type
    if (strategy.includes('covered')) {
      expectedBreakEven = strikePrice - optionPrice;
    }
    
    const tolerance = Math.max(0.01, expectedBreakEven * 0.05);
    return Math.abs(value - expectedBreakEven) <= tolerance;
  }),

  ValidationRuleFactory.createRule('secondStrikePrice', 'Second strike price should be different from first strike', (value: any, allInputs?: Record<string, any>) => {
    const strikePrice = allInputs?.strikePrice;
    const strategy = allInputs?.strategy;
    if (!strikePrice || !strategy || !value) return true;
    
    // Only validate for spread strategies
    if (strategy.includes('spread') || strategy.includes('condor') || strategy.includes('butterfly')) {
      return value !== strikePrice;
    }
    
    return true;
  }),

  ValidationRuleFactory.createRule('portfolioValue', 'Position size should be reasonable relative to portfolio', (value: any, allInputs?: Record<string, any>) => {
    const positionSize = allInputs?.positionSize;
    if (!positionSize || !value) return true;
    
    const positionPercentage = (positionSize / value) * 100;
    return positionPercentage <= 50; // Max 50% of portfolio in single position
  })
];

export function validateStockOptionsInputs(inputs: StockOptionsInputs, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validations
  if (!inputs.optionType) errors.push('Option type is required');
  if (!inputs.strikePrice) errors.push('Strike price is required');
  if (!inputs.currentStockPrice) errors.push('Current stock price is required');
  if (!inputs.optionPrice) errors.push('Option price is required');
  if (!inputs.expirationDate) errors.push('Expiration date is required');
  if (!inputs.numberOfContracts) errors.push('Number of contracts is required');
  if (!inputs.contractsPerOption) errors.push('Contracts per option is required');
  if (!inputs.volatility) errors.push('Volatility is required');
  if (!inputs.riskFreeRate) errors.push('Risk-free rate is required');
  if (!inputs.dividendYield) errors.push('Dividend yield is required');
  if (!inputs.strategy) errors.push('Strategy is required');
  if (!inputs.maxLoss) errors.push('Maximum loss is required');
  if (!inputs.maxProfit) errors.push('Maximum profit is required');
  if (!inputs.breakEvenPrice) errors.push('Break-even price is required');
  if (!inputs.daysToExpiration) errors.push('Days to expiration is required');
  if (!inputs.timeValue) errors.push('Time value is required');
  if (!inputs.intrinsicValue) errors.push('Intrinsic value is required');
  
  // Numeric validations
  if (inputs.strikePrice < 0.01 || inputs.strikePrice > 10000) {
    errors.push('Strike price must be between $0.01 and $10,000');
  }
  
  if (inputs.currentStockPrice < 0.01 || inputs.currentStockPrice > 10000) {
    errors.push('Current stock price must be between $0.01 and $10,000');
  }
  
  if (inputs.optionPrice < 0 || inputs.optionPrice > 1000) {
    errors.push('Option price must be between $0 and $1,000');
  }
  
  if (inputs.numberOfContracts < 1 || inputs.numberOfContracts > 10000) {
    errors.push('Number of contracts must be between 1 and 10,000');
  }
  
  if (inputs.contractsPerOption < 1 || inputs.contractsPerOption > 1000000) {
    errors.push('Contracts per option must be between 1 and 1,000,000');
  }
  
  if (inputs.volatility < 0.1 || inputs.volatility > 500) {
    errors.push('Volatility must be between 0.1% and 500%');
  }
  
  if (inputs.riskFreeRate < -10 || inputs.riskFreeRate > 50) {
    errors.push('Risk-free rate must be between -10% and 50%');
  }
  
  if (inputs.dividendYield < 0 || inputs.dividendYield > 50) {
    errors.push('Dividend yield must be between 0% and 50%');
  }
  
  if (inputs.maxLoss > 0) {
    errors.push('Maximum loss should be negative or zero');
  }
  
  if (inputs.maxProfit < 0) {
    errors.push('Maximum profit should be positive or zero');
  }
  
  if (inputs.breakEvenPrice < 0 || inputs.breakEvenPrice > 10000) {
    errors.push('Break-even price must be between $0 and $10,000');
  }
  
  if (inputs.daysToExpiration < 0 || inputs.daysToExpiration > 3650) {
    errors.push('Days to expiration must be between 0 and 3,650');
  }
  
  if (inputs.timeValue < 0 || inputs.timeValue > 1000) {
    errors.push('Time value must be between $0 and $1,000');
  }
  
  if (inputs.intrinsicValue < 0 || inputs.intrinsicValue > 10000) {
    errors.push('Intrinsic value must be between $0 and $10,000');
  }
  
  // Optional field validations
  if (inputs.delta !== undefined) {
    if (inputs.delta < -1 || inputs.delta > 1) {
      errors.push('Delta must be between -1 and 1');
    }
  }
  
  if (inputs.gamma !== undefined) {
    if (inputs.gamma < 0 || inputs.gamma > 1) {
      errors.push('Gamma must be between 0 and 1');
    }
  }
  
  if (inputs.theta !== undefined) {
    if (inputs.theta < -1000 || inputs.theta > 1000) {
      errors.push('Theta must be between -$1,000 and $1,000');
    }
  }
  
  if (inputs.vega !== undefined) {
    if (inputs.vega < -1000 || inputs.vega > 1000) {
      errors.push('Vega must be between -$1,000 and $1,000');
    }
  }
  
  if (inputs.rho !== undefined) {
    if (inputs.rho < -1000 || inputs.rho > 1000) {
      errors.push('Rho must be between -$1,000 and $1,000');
    }
  }
  
  if (inputs.secondStrikePrice !== undefined) {
    if (inputs.secondStrikePrice < 0.01 || inputs.secondStrikePrice > 10000) {
      errors.push('Second strike price must be between $0.01 and $10,000');
    }
  }
  
  if (inputs.secondOptionPrice !== undefined) {
    if (inputs.secondOptionPrice < 0 || inputs.secondOptionPrice > 1000) {
      errors.push('Second option price must be between $0 and $1,000');
    }
  }
  
  if (inputs.impliedVolatility !== undefined) {
    if (inputs.impliedVolatility < 0.1 || inputs.impliedVolatility > 500) {
      errors.push('Implied volatility must be between 0.1% and 500%');
    }
  }
  
  if (inputs.historicalVolatility !== undefined) {
    if (inputs.historicalVolatility < 0.1 || inputs.historicalVolatility > 500) {
      errors.push('Historical volatility must be between 0.1% and 500%');
    }
  }
  
  if (inputs.beta !== undefined) {
    if (inputs.beta < -10 || inputs.beta > 10) {
      errors.push('Beta must be between -10 and 10');
    }
  }
  
  if (inputs.correlation !== undefined) {
    if (inputs.correlation < -1 || inputs.correlation > 1) {
      errors.push('Correlation must be between -1 and 1');
    }
  }
  
  if (inputs.portfolioValue !== undefined) {
    if (inputs.portfolioValue < 0 || inputs.portfolioValue > 100000000) {
      errors.push('Portfolio value must be between $0 and $100,000,000');
    }
  }
  
  if (inputs.positionSize !== undefined) {
    if (inputs.positionSize < 0 || inputs.positionSize > 10000000) {
      errors.push('Position size must be between $0 and $10,000,000');
    }
  }
  
  if (inputs.marginRequirement !== undefined) {
    if (inputs.marginRequirement < 0 || inputs.marginRequirement > 10000000) {
      errors.push('Margin requirement must be between $0 and $10,000,000');
    }
  }
  
  // Cross-field validations
  const maxReasonablePrice = Math.max(inputs.currentStockPrice, inputs.strikePrice) * 0.5;
  if (inputs.optionPrice > maxReasonablePrice) {
    errors.push('Option price seems unreasonably high relative to stock and strike prices');
  }
  
  const priceRatio = inputs.strikePrice / inputs.currentStockPrice;
  if (priceRatio < 0.1 || priceRatio > 10) {
    errors.push('Strike price seems unreasonable relative to current stock price');
  }
  
  if (inputs.daysToExpiration < 30 && inputs.timeValue < inputs.optionPrice * 0.1) {
    errors.push('Short-term options should have higher time value relative to price');
  }
  
  if (inputs.daysToExpiration > 365 && inputs.timeValue < inputs.optionPrice * 0.3) {
    errors.push('Long-term options should have substantial time value');
  }
  
  const moneyness = Math.log(inputs.currentStockPrice / inputs.strikePrice);
  if (Math.abs(moneyness) < 0.1 && (inputs.volatility < 10 || inputs.volatility > 100)) {
    errors.push('At-the-money options should have moderate volatility');
  }
  
  let expectedIntrinsic = 0;
  if (inputs.optionType === 'call') {
    expectedIntrinsic = Math.max(0, inputs.currentStockPrice - inputs.strikePrice);
  } else {
    expectedIntrinsic = Math.max(0, inputs.strikePrice - inputs.currentStockPrice);
  }
  
  const tolerance = Math.max(0.01, expectedIntrinsic * 0.05);
  if (Math.abs(inputs.intrinsicValue - expectedIntrinsic) > tolerance) {
    errors.push('Intrinsic value seems inconsistent with option type and prices');
  }
  
  const expectedTimeValue = inputs.optionPrice - expectedIntrinsic;
  const timeValueTolerance = Math.max(0.01, expectedTimeValue * 0.1);
  if (Math.abs(inputs.timeValue - expectedTimeValue) > timeValueTolerance) {
    errors.push('Time value seems inconsistent with option price and intrinsic value');
  }
  
  const positionValue = inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
  if (inputs.strategy.includes('long') && Math.abs(inputs.maxLoss) > positionValue * 1.1) {
    errors.push('Maximum loss for long strategy seems too high');
  }
  
  if (inputs.strategy.includes('short') && inputs.maxProfit > positionValue * 1.1) {
    errors.push('Maximum profit for short strategy seems too high');
  }
  
  let expectedBreakEven = 0;
  if (inputs.optionType === 'call') {
    expectedBreakEven = inputs.strikePrice + inputs.optionPrice;
  } else {
    expectedBreakEven = inputs.strikePrice - inputs.optionPrice;
  }
  
  if (inputs.strategy.includes('covered')) {
    expectedBreakEven = inputs.strikePrice - inputs.optionPrice;
  }
  
  const breakEvenTolerance = Math.max(0.01, expectedBreakEven * 0.05);
  if (Math.abs(inputs.breakEvenPrice - expectedBreakEven) > breakEvenTolerance) {
    errors.push('Break-even price seems inconsistent with option type and strategy');
  }
  
  if (inputs.secondStrikePrice && inputs.secondStrikePrice === inputs.strikePrice) {
    errors.push('Second strike price should be different from first strike price for spread strategies');
  }
  
  if (inputs.portfolioValue && inputs.positionSize) {
    const positionPercentage = (inputs.positionSize / inputs.portfolioValue) * 100;
    if (positionPercentage > 50) {
      errors.push('Position size should not exceed 50% of portfolio value');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
