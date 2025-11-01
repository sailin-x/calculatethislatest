// import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCapitalStructureOptimizationInputs(inputs: any): ValidationResult {
  const errors: string[] = [];

  // Total assets validation
  if (!inputs.totalAssets || typeof inputs.totalAssets !== 'number' || inputs.totalAssets <= 0) {
    errors.push('Total assets must be a positive number');
  } else if (inputs.totalAssets < 100000 || inputs.totalAssets > 100000000000) {
    errors.push('Total assets must be between $100,000 and $100,000,000,000');
  }

  // Total debt validation
  if (inputs.totalDebt === undefined || inputs.totalDebt === null || typeof inputs.totalDebt !== 'number' || inputs.totalDebt < 0) {
    errors.push('Total debt must be a non-negative number');
  } else if (inputs.totalDebt > inputs.totalAssets) {
    errors.push('Total debt cannot exceed total assets');
  }

  // Total equity validation
  if (!inputs.totalEquity || typeof inputs.totalEquity !== 'number' || inputs.totalEquity <= 0) {
    errors.push('Total equity must be a positive number');
  } else if (inputs.totalEquity > inputs.totalAssets) {
    errors.push('Total equity cannot exceed total assets');
  }

  // Cost of debt validation
  if (inputs.costOfDebt === undefined || inputs.costOfDebt === null || typeof inputs.costOfDebt !== 'number' || inputs.costOfDebt < 0) {
    errors.push('Cost of debt must be a non-negative number');
  } else if (inputs.costOfDebt > 0.5) {
    errors.push('Cost of debt must be less than 50%');
  }

  // Cost of equity validation
  if (inputs.costOfEquity === undefined || inputs.costOfEquity === null || typeof inputs.costOfEquity !== 'number' || inputs.costOfEquity < 0) {
    errors.push('Cost of equity must be a non-negative number');
  } else if (inputs.costOfEquity > 0.5) {
    errors.push('Cost of equity must be less than 50%');
  }

  // Tax rate validation
  if (inputs.taxRate === undefined || inputs.taxRate === null || typeof inputs.taxRate !== 'number' || inputs.taxRate < 0) {
    errors.push('Tax rate must be a non-negative number');
  } else if (inputs.taxRate > 1) {
    errors.push('Tax rate must be less than or equal to 100%');
  }

  // Risk-free rate validation
  if (inputs.riskFreeRate === undefined || inputs.riskFreeRate === null || typeof inputs.riskFreeRate !== 'number' || inputs.riskFreeRate < 0) {
    errors.push('Risk-free rate must be a non-negative number');
  } else if (inputs.riskFreeRate > 0.2) {
    errors.push('Risk-free rate must be less than 20%');
  }

  // Market risk premium validation
  if (inputs.marketRiskPremium === undefined || inputs.marketRiskPremium === null || typeof inputs.marketRiskPremium !== 'number' || inputs.marketRiskPremium < 0) {
    errors.push('Market risk premium must be a non-negative number');
  } else if (inputs.marketRiskPremium > 0.2) {
    errors.push('Market risk premium must be less than 20%');
  }

  // Beta validation
  if (inputs.beta === undefined || inputs.beta === null || typeof inputs.beta !== 'number' || inputs.beta < 0) {
    errors.push('Beta must be a non-negative number');
  } else if (inputs.beta > 5) {
    errors.push('Beta must be less than or equal to 5');
  }

  // Target debt ratio validation
  if (inputs.targetDebtRatio === undefined || inputs.targetDebtRatio === null || typeof inputs.targetDebtRatio !== 'number' || inputs.targetDebtRatio < 0) {
    errors.push('Target debt ratio must be a non-negative number');
  } else if (inputs.targetDebtRatio > 1) {
    errors.push('Target debt ratio must be less than or equal to 100%');
  }

  // Current debt ratio validation
  if (inputs.currentDebtRatio === undefined || inputs.currentDebtRatio === null || typeof inputs.currentDebtRatio !== 'number' || inputs.currentDebtRatio < 0) {
    errors.push('Current debt ratio must be a non-negative number');
  } else if (inputs.currentDebtRatio > 1) {
    errors.push('Current debt ratio must be less than or equal to 100%');
  }

  // Analysis period validation
  if (!inputs.analysisPeriod || typeof inputs.analysisPeriod !== 'number' || inputs.analysisPeriod < 1) {
    errors.push('Analysis period must be at least 1 year');
  } else if (inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be 50 years or less');
  }

  // Inflation rate validation
  if (inputs.inflationRate === undefined || inputs.inflationRate === null || typeof inputs.inflationRate !== 'number' || inputs.inflationRate < -0.1) {
    errors.push('Inflation rate must be -10% or higher');
  } else if (inputs.inflationRate > 0.2) {
    errors.push('Inflation rate must be 20% or less');
  }

  // Growth rate validation
  if (inputs.growthRate === undefined || inputs.growthRate === null || typeof inputs.growthRate !== 'number' || inputs.growthRate < -0.1) {
    errors.push('Growth rate must be -10% or higher');
  } else if (inputs.growthRate > 0.2) {
    errors.push('Growth rate must be 20% or less');
  }

  // Company type validation
  if (!inputs.companyType || typeof inputs.companyType !== 'string' || inputs.companyType.trim().length === 0) {
    errors.push('Company type is required');
  } else if (!['public', 'private', 'startup', 'mature'].includes(inputs.companyType)) {
    errors.push('Invalid company type');
  }

  // Industry validation
  if (!inputs.industry || typeof inputs.industry !== 'string' || inputs.industry.trim().length === 0) {
    errors.push('Industry is required');
  }

  // Credit rating validation
  if (!inputs.creditRating || typeof inputs.creditRating !== 'string' || inputs.creditRating.trim().length === 0) {
    errors.push('Credit rating is required');
  } else if (!['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'].includes(inputs.creditRating)) {
    errors.push('Invalid credit rating');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateCapitalStructureOptimizationInput(field: string, value: any): string | null {
  switch (field) {
    case 'totalAssets':
      if (!value) return 'Total assets is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 100000 || value > 100000000000) return 'Must be between $100,000 and $100,000,000,000';
      break;

    case 'totalDebt':
      if (value === undefined || value === null) return 'Total debt is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      break;

    case 'totalEquity':
      if (!value) return 'Total equity is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      break;

    case 'costOfDebt':
      if (value === undefined || value === null) return 'Cost of debt is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.5) return 'Must be less than 50%';
      break;

    case 'costOfEquity':
      if (value === undefined || value === null) return 'Cost of equity is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.5) return 'Must be less than 50%';
      break;

    case 'taxRate':
      if (value === undefined || value === null) return 'Tax rate is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1) return 'Must be less than or equal to 100%';
      break;

    case 'riskFreeRate':
      if (value === undefined || value === null) return 'Risk-free rate is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.2) return 'Must be less than 20%';
      break;

    case 'marketRiskPremium':
      if (value === undefined || value === null) return 'Market risk premium is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.2) return 'Must be less than 20%';
      break;

    case 'beta':
      if (value === undefined || value === null) return 'Beta is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5) return 'Must be less than or equal to 5';
      break;

    case 'targetDebtRatio':
      if (value === undefined || value === null) return 'Target debt ratio is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1) return 'Must be less than or equal to 100%';
      break;

    case 'currentDebtRatio':
      if (value === undefined || value === null) return 'Current debt ratio is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1) return 'Must be less than or equal to 100%';
      break;

    case 'analysisPeriod':
      if (!value) return 'Analysis period is required';
      if (typeof value !== 'number' || value < 1) return 'Must be at least 1 year';
      if (value > 50) return 'Must be 50 years or less';
      break;

    case 'inflationRate':
      if (value === undefined || value === null) return 'Inflation rate is required';
      if (typeof value !== 'number' || value < -0.1) return 'Must be -10% or higher';
      if (value > 0.2) return 'Must be 20% or less';
      break;

    case 'growthRate':
      if (value === undefined || value === null) return 'Growth rate is required';
      if (typeof value !== 'number' || value < -0.1) return 'Must be -10% or higher';
      if (value > 0.2) return 'Must be 20% or less';
      break;

    case 'companyType':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Company type is required';
      if (!['public', 'private', 'startup', 'mature'].includes(value)) return 'Invalid company type';
      break;

    case 'industry':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Industry is required';
      break;

    case 'creditRating':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Credit rating is required';
      if (!['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'].includes(value)) return 'Invalid credit rating';
      break;
  }

  return null;
}