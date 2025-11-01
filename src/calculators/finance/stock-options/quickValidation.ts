export function quickValidateStrikePrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Strike price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Strike price must be a valid number' };
  }
  
  if (numValue < 0.01) {
    return { isValid: false, message: 'Strike price must be at least $0.01' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Strike price cannot exceed $10,000' };
  }
  
  // Cross-validation with current stock price
  const currentStockPrice = allInputs?.currentStockPrice;
  if (currentStockPrice) {
    const priceRatio = numValue / currentStockPrice;
    if (priceRatio < 0.1) {
      return { isValid: false, message: 'Strike price seems too low relative to stock price' };
    }
    if (priceRatio > 10) {
      return { isValid: false, message: 'Strike price seems too high relative to stock price' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateCurrentStockPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Current stock price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Current stock price must be a valid number' };
  }
  
  if (numValue < 0.01) {
    return { isValid: false, message: 'Current stock price must be at least $0.01' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Current stock price cannot exceed $10,000' };
  }
  
  return { isValid: true };
}

export function quickValidateOptionPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Option price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Option price must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Option price cannot be negative' };
  }
  
  if (numValue > 1000) {
    return { isValid: false, message: 'Option price cannot exceed $1,000' };
  }
  
  // Cross-validation with stock and strike prices
  const currentStockPrice = allInputs?.currentStockPrice;
  const strikePrice = allInputs?.strikePrice;
  if (currentStockPrice && strikePrice) {
    const maxReasonablePrice = Math.max(currentStockPrice, strikePrice) * 0.5;
    if (numValue > maxReasonablePrice) {
      return { isValid: false, message: 'Option price seems unreasonably high' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateVolatility(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Volatility is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Volatility must be a valid number' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'Volatility must be at least 0.1%' };
  }
  
  if (numValue > 500) {
    return { isValid: false, message: 'Volatility cannot exceed 500%' };
  }
  
  // Cross-validation with option type and moneyness
  const currentStockPrice = allInputs?.currentStockPrice;
  const strikePrice = allInputs?.strikePrice;
  const optionType = allInputs?.optionType;
  if (currentStockPrice && strikePrice && optionType) {
    const moneyness = Math.log(currentStockPrice / strikePrice);
    
    // ATM options should have moderate volatility
    if (Math.abs(moneyness) < 0.1 && (numValue < 10 || numValue > 100)) {
      return { isValid: false, message: 'AtTheMoney options should have moderate volatility (10-100%)' };
    }
    
    // OTM options can have higher volatility
    if (optionType === 'call' && moneyness < -0.2 && numValue < 20) {
      return { isValid: false, message: 'OutOfThe-money calls typically have higher volatility' };
    }
    if (optionType === 'put' && moneyness > 0.2 && numValue < 20) {
      return { isValid: false, message: 'OutOfThe-money puts typically have higher volatility' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateDaysToExpiration(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Days to expiration is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Days to expiration must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Days to expiration cannot be negative' };
  }
  
  if (numValue > 3650) {
    return { isValid: false, message: 'Days to expiration cannot exceed 3,650 (10 years)' };
  }
  
  // Cross-validation with time value
  const timeValue = allInputs?.timeValue;
  const optionPrice = allInputs?.optionPrice;
  if (timeValue !== undefined && optionPrice) {
    if (numValue < 30 && timeValue < optionPrice * 0.1) {
      return { isValid: false, message: 'Short-term options should have higher time value' };
    }
    if (numValue > 365 && timeValue < optionPrice * 0.3) {
      return { isValid: false, message: 'Long-term options should have substantial time value' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateNumberOfContracts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Number of contracts is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Number of contracts must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Number of contracts must be at least 1' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Number of contracts cannot exceed 10,000' };
  }
  
  // Cross-validation with portfolio size
  const portfolioValue = allInputs?.portfolioValue;
  const optionPrice = allInputs?.optionPrice;
  const contractsPerOption = allInputs?.contractsPerOption;
  if (portfolioValue && optionPrice && contractsPerOption) {
    const positionSize = numValue * contractsPerOption * optionPrice;
    const positionPercentage = (positionSize / portfolioValue) * 100;
    if (positionPercentage > 50) {
      return { isValid: false, message: 'Position size should not exceed 50% of portfolio' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateIntrinsicValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Intrinsic value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Intrinsic value must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Intrinsic value cannot be negative' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Intrinsic value cannot exceed $10,000' };
  }
  
  // Cross-validation with option type and prices
  const currentStockPrice = allInputs?.currentStockPrice;
  const strikePrice = allInputs?.strikePrice;
  const optionType = allInputs?.optionType;
  if (currentStockPrice && strikePrice && optionType) {
    let expectedIntrinsic = 0;
    if (optionType === 'call') {
      expectedIntrinsic = Math.max(0, currentStockPrice - strikePrice);
    } else {
      expectedIntrinsic = Math.max(0, strikePrice - currentStockPrice);
    }
    
    const tolerance = Math.max(0.01, expectedIntrinsic * 0.05);
    if (Math.abs(numValue - expectedIntrinsic) > tolerance) {
      return { isValid: false, message: 'Intrinsic value seems inconsistent with option type and prices' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateTimeValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Time value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Time value must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Time value cannot be negative' };
  }
  
  if (numValue > 1000) {
    return { isValid: false, message: 'Time value cannot exceed $1,000' };
  }
  
  // Cross-validation with option price and intrinsic value
  const optionPrice = allInputs?.optionPrice;
  const intrinsicValue = allInputs?.intrinsicValue;
  if (optionPrice !== undefined && intrinsicValue !== undefined) {
    const expectedTimeValue = optionPrice - intrinsicValue;
    const tolerance = Math.max(0.01, expectedTimeValue * 0.1);
    if (Math.abs(numValue - expectedTimeValue) > tolerance) {
      return { isValid: false, message: 'Time value seems inconsistent with option price and intrinsic value' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateMaxLoss(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Maximum loss is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Maximum loss must be a valid number' };
  }
  
  if (numValue > 0) {
    return { isValid: false, message: 'Maximum loss should be negative or zero' };
  }
  
  if (numValue < -1000000) {
    return { isValid: false, message: 'Maximum loss cannot exceed -$1,000,000' };
  }
  
  // Cross-validation with strategy type
  const strategy = allInputs?.strategy;
  const optionPrice = allInputs?.optionPrice;
  const numberOfContracts = allInputs?.numberOfContracts;
  const contractsPerOption = allInputs?.contractsPerOption;
  if (strategy && optionPrice && numberOfContracts && contractsPerOption) {
    const positionValue = numberOfContracts * contractsPerOption * optionPrice;
    
    if (strategy.includes('long') && Math.abs(numValue) > positionValue * 1.1) {
      return { isValid: false, message: 'Maximum loss for long strategy seems too high' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateMaxProfit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Maximum profit is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Maximum profit must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Maximum profit should be positive or zero' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Maximum profit cannot exceed $1,000,000' };
  }
  
  // Cross-validation with strategy type
  const strategy = allInputs?.strategy;
  const optionPrice = allInputs?.optionPrice;
  const numberOfContracts = allInputs?.numberOfContracts;
  const contractsPerOption = allInputs?.contractsPerOption;
  if (strategy && optionPrice && numberOfContracts && contractsPerOption) {
    const positionValue = numberOfContracts * contractsPerOption * optionPrice;
    
    if (strategy.includes('short') && numValue > positionValue * 1.1) {
      return { isValid: false, message: 'Maximum profit for short strategy seems too high' };
    }
  }
  
  return { isValid: true };
}
