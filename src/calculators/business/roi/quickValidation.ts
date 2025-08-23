export function quickValidateInitialInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Initial investment is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Initial investment must be a valid number' };
  }
  
  if (numValue < 0.01) {
    return { isValid: false, message: 'Initial investment must be at least $0.01' };
  }
  
  if (numValue > 1000000000) {
    return { isValid: false, message: 'Initial investment cannot exceed $1 billion' };
  }
  
  return { isValid: true };
}

export function quickValidateFinalValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Final value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Final value must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Final value cannot be negative' };
  }
  
  if (numValue > 1000000000) {
    return { isValid: false, message: 'Final value cannot exceed $1 billion' };
  }
  
  const initialInvestment = allInputs?.initialInvestment;
  if (initialInvestment && numValue > 0) {
    const ratio = numValue / initialInvestment;
    if (ratio < 0.1) {
      return { isValid: false, message: 'Final value seems too low relative to initial investment' };
    }
    if (ratio > 100) {
      return { isValid: false, message: 'Final value seems too high relative to initial investment' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateTotalReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Total return is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Total return must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Total return cannot be negative' };
  }
  
  if (numValue > 1000000000) {
    return { isValid: false, message: 'Total return cannot exceed $1 billion' };
  }
  
  const initialInvestment = allInputs?.initialInvestment;
  const finalValue = allInputs?.finalValue;
  
  if (initialInvestment && finalValue) {
    const expectedReturn = finalValue - initialInvestment;
    const tolerance = Math.abs(expectedReturn) * 0.1;
    if (Math.abs(numValue - expectedReturn) > tolerance) {
      return { isValid: false, message: 'Total return should be consistent with final value and initial investment' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateInvestmentPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Investment period is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Investment period must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Investment period must be at least 1 month' };
  }
  
  if (numValue > 600) {
    return { isValid: false, message: 'Investment period cannot exceed 600 months (50 years)' };
  }
  
  const investmentType = allInputs?.investmentType;
  if (investmentType) {
    const maxPeriods: Record<string, number> = {
      'marketing': 12,
      'advertising': 6,
      'software': 36,
      'equipment': 60,
      'real-estate': 300,
      'startup': 120,
      'business': 240,
      'stocks': 120,
      'crypto': 60,
      'other': 120
    };
    
    const maxPeriod = maxPeriods[investmentType] || 120;
    if (numValue > maxPeriod) {
      return { isValid: false, message: `Investment period seems too long for ${investmentType} investments` };
    }
  }
  
  return { isValid: true };
}

export function quickValidateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Discount rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Discount rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Discount rate cannot be negative' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Discount rate cannot exceed 100%' };
  }
  
  const investmentType = allInputs?.investmentType;
  const marketConditions = allInputs?.marketConditions;
  
  let maxRate = 20; // Default max 20%
  
  if (investmentType === 'crypto' || investmentType === 'startup') {
    maxRate = 50; // Higher risk investments
  } else if (investmentType === 'real-estate') {
    maxRate = 15; // Lower risk investments
  }
  
  if (marketConditions === 'recession') {
    maxRate += 10; // Higher rates in recession
  }
  
  if (numValue > maxRate) {
    return { isValid: false, message: `Discount rate seems too high for ${investmentType} investments in ${marketConditions} market conditions` };
  }
  
  return { isValid: true };
}

export function quickValidateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Tax rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Tax rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Tax rate cannot be negative' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Tax rate cannot exceed 100%' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Tax rate seems unusually high' };
  }
  
  return { isValid: true };
}

export function quickValidateCompetitivePressure(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Competitive pressure is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Competitive pressure must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Competitive pressure must be at least 1' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Competitive pressure cannot exceed 10' };
  }
  
  return { isValid: true };
}

export function quickValidateRegulatoryRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Regulatory risk is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Regulatory risk must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Regulatory risk must be at least 1' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Regulatory risk cannot exceed 10' };
  }
  
  return { isValid: true };
}

export function quickValidateStrategicValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Strategic value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Strategic value must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Strategic value must be at least 1' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Strategic value cannot exceed 10' };
  }
  
  const businessStage = allInputs?.businessStage;
  if (businessStage === 'startup' && numValue < 7) {
    return { isValid: false, message: 'Startups typically have high strategic value' };
  }
  
  return { isValid: true };
}

export function quickValidateScalability(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Scalability is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Scalability must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Scalability must be at least 1' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Scalability cannot exceed 10' };
  }
  
  const businessStage = allInputs?.businessStage;
  if (businessStage === 'startup' && numValue < 7) {
    return { isValid: false, message: 'Startups typically have high scalability potential' };
  }
  
  return { isValid: true };
}

export function quickValidateBestCaseScenario(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Best case scenario is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Best case scenario must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Best case scenario cannot be negative' };
  }
  
  if (numValue > 1000) {
    return { isValid: false, message: 'Best case scenario cannot exceed 1000%' };
  }
  
  const worstCase = allInputs?.worstCaseScenario;
  const mostLikely = allInputs?.mostLikelyScenario;
  
  if (worstCase && numValue < worstCase) {
    return { isValid: false, message: 'Best case scenario should be higher than worst case scenario' };
  }
  
  if (mostLikely && numValue < mostLikely) {
    return { isValid: false, message: 'Best case scenario should be higher than most likely scenario' };
  }
  
  return { isValid: true };
}

export function quickValidateWorstCaseScenario(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Worst case scenario is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Worst case scenario must be a valid number' };
  }
  
  if (numValue < -100) {
    return { isValid: false, message: 'Worst case scenario cannot be below -100%' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Worst case scenario cannot exceed 100%' };
  }
  
  const bestCase = allInputs?.bestCaseScenario;
  const mostLikely = allInputs?.mostLikelyScenario;
  
  if (bestCase && numValue > bestCase) {
    return { isValid: false, message: 'Worst case scenario should be lower than best case scenario' };
  }
  
  if (mostLikely && numValue > mostLikely) {
    return { isValid: false, message: 'Worst case scenario should be lower than most likely scenario' };
  }
  
  return { isValid: true };
}

export function quickValidateMostLikelyScenario(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Most likely scenario is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Most likely scenario must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Most likely scenario cannot be negative' };
  }
  
  if (numValue > 500) {
    return { isValid: false, message: 'Most likely scenario cannot exceed 500%' };
  }
  
  const bestCase = allInputs?.bestCaseScenario;
  const worstCase = allInputs?.worstCaseScenario;
  
  if (bestCase && numValue > bestCase) {
    return { isValid: false, message: 'Most likely scenario should be lower than best case scenario' };
  }
  
  if (worstCase && numValue < worstCase) {
    return { isValid: false, message: 'Most likely scenario should be higher than worst case scenario' };
  }
  
  return { isValid: true };
}
