/**
 * Quick validation functions for Breakeven Point Calculator
 * All functions include the allInputs parameter to prevent runtime errors
 */

export const validateSellingPrice = (value: number, allInputs?: Record<string, any>): string | null => {
  if (value <= 0) return 'Selling price must be greater than zero';
  if (value > 1000000) return 'Selling price seems unusually high';
  return null;
};

export const validateVariableCostPerUnit = (value: number, allInputs?: Record<string, any>): string | null => {
  if (value < 0) return 'Variable cost per unit cannot be negative';
  if (value > 100000) return 'Variable cost per unit seems unusually high';
  if (allInputs?.sellingPrice && value >= allInputs.sellingPrice) {
    return 'Variable cost per unit must be less than selling price';
  }
  return null;
};

export const validateFixedCosts = (value: number, allInputs?: Record<string, any>): string | null => {
  if (value < 0) return 'Fixed costs cannot be negative';
  if (value > 10000000) return 'Fixed costs seem unusually high';
  return null;
};

export const validateTargetProfit = (value: number, allInputs?: Record<string, any>): string | null => {
  if (value < 0) return 'Target profit cannot be negative';
  if (value > 10000000) return 'Target profit seems unusually high';
  return null;
};

export const validateCostStructure = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Cost structure is required';
  
  const requiredFields = [
    'directMaterials', 'directLabor', 'variableOverhead', 'fixedOverhead',
    'sellingExpenses', 'administrativeExpenses', 'depreciation', 'interest', 'taxes'
  ];
  
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || value[field] < 0) {
      return `${field} must be a non-negative number`;
    }
  }
  
  return null;
};

export const validateRevenueAnalysis = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Revenue analysis is required';
  
  if (typeof value.expectedSalesVolume !== 'number' || value.expectedSalesVolume <= 0) {
    return 'Expected sales volume must be a positive number';
  }
  
  if (typeof value.growthRate !== 'number' || value.growthRate < -100 || value.growthRate > 1000) {
    return 'Growth rate must be between -100% and 1000%';
  }
  
  return null;
};

export const validateProductionAnalysis = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Production analysis is required';
  
  if (typeof value.productionCapacity !== 'number' || value.productionCapacity <= 0) {
    return 'Production capacity must be a positive number';
  }
  
  if (typeof value.utilizationRate !== 'number' || value.utilizationRate < 0 || value.utilizationRate > 100) {
    return 'Utilization rate must be between 0% and 100%';
  }
  
  if (typeof value.efficiencyRate !== 'number' || value.efficiencyRate < 0 || value.efficiencyRate > 100) {
    return 'Efficiency rate must be between 0% and 100%';
  }
  
  return null;
};

export const validateMarketAnalysis = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Market analysis is required';
  
  if (typeof value.marketSize !== 'number' || value.marketSize <= 0) {
    return 'Market size must be a positive number';
  }
  
  if (typeof value.marketShare !== 'number' || value.marketShare < 0 || value.marketShare > 100) {
    return 'Market share must be between 0% and 100%';
  }
  
  if (typeof value.competitionLevel !== 'number' || value.competitionLevel < 1 || value.competitionLevel > 10) {
    return 'Competition level must be between 1 and 10';
  }
  
  return null;
};

export const validateFinancialParameters = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Financial parameters are required';
  
  if (typeof value.discountRate !== 'number' || value.discountRate < 0 || value.discountRate > 100) {
    return 'Discount rate must be between 0% and 100%';
  }
  
  if (typeof value.taxRate !== 'number' || value.taxRate < 0 || value.taxRate > 100) {
    return 'Tax rate must be between 0% and 100%';
  }
  
  if (typeof value.inflationRate !== 'number' || value.inflationRate < -50 || value.inflationRate > 100) {
    return 'Inflation rate must be between -50% and 100%';
  }
  
  if (!value.currency || typeof value.currency !== 'string') {
    return 'Currency is required and must be a string';
  }
  
  return null;
};

export const validateAnalysisOptions = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Analysis options are required';
  
  const booleanFields = [
    'includeSensitivityAnalysis', 'includeScenarioAnalysis', 'includeRiskAssessment',
    'includeCashFlowAnalysis', 'includeROIAnalysis', 'includeMonteCarloSimulation'
  ];
  
  for (const field of booleanFields) {
    if (typeof value[field] !== 'boolean') {
      return `${field} must be a boolean value`;
    }
  }
  
  return null;
};

export const validateSimulationParameters = (value: any, allInputs?: Record<string, any>): string | null => {
  if (!value) return 'Simulation parameters are required';
  
  if (typeof value.monteCarloSamples !== 'number' || value.monteCarloSamples < 1000 || value.monteCarloSamples > 100000) {
    return 'Monte Carlo samples must be between 1,000 and 100,000';
  }
  
  if (typeof value.confidenceLevel !== 'number' || value.confidenceLevel < 0.8 || value.confidenceLevel > 0.99) {
    return 'Confidence level must be between 80% and 99%';
  }
  
  if (!Array.isArray(value.scenarios) || value.scenarios.length === 0) {
    return 'At least one scenario is required';
  }
  
  for (const scenario of value.scenarios) {
    if (!scenario.name || typeof scenario.name !== 'string') {
      return 'Each scenario must have a name';
    }
    
    if (typeof scenario.probability !== 'number' || scenario.probability < 0 || scenario.probability > 1) {
      return 'Scenario probability must be between 0 and 1';
    }
    
    if (typeof scenario.sellingPriceVariation !== 'number' || scenario.sellingPriceVariation < -100 || scenario.sellingPriceVariation > 100) {
      return 'Selling price variation must be between -100% and 100%';
    }
    
    if (typeof scenario.costVariation !== 'number' || scenario.costVariation < -100 || scenario.costVariation > 100) {
      return 'Cost variation must be between -100% and 100%';
    }
    
    if (typeof scenario.volumeVariation !== 'number' || scenario.volumeVariation < -100 || scenario.volumeVariation > 100) {
      return 'Volume variation must be between -100% and 100%';
    }
  }
  
  return null;
};

export const validateProductName = (value: string, allInputs?: Record<string, any>): string | null => {
  if (!value || value.trim().length === 0) return 'Product name is required';
  if (value.length > 100) return 'Product name must be 100 characters or less';
  return null;
};

export const validateProductDescription = (value: string, allInputs?: Record<string, any>): string | null => {
  if (!value || value.trim().length === 0) return 'Product description is required';
  if (value.length > 500) return 'Product description must be 500 characters or less';
  return null;
};

export const validateCurrency = (value: string, allInputs?: Record<string, any>): string | null => {
  if (!value || value.trim().length === 0) return 'Currency is required';
  if (value.length > 10) return 'Currency code must be 10 characters or less';
  return null;
};
