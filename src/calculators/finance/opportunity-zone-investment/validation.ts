import { ValidationRule } from '../../../types/calculator';

export const opportunityZoneInvestmentValidationRules: ValidationRule[] = [
  // Required field validations
  {
    type: 'required',
    field: 'initialInvestment',
    message: 'Initial investment amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'investmentTimeline',
    message: 'Investment timeline is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'annualAppreciationRate',
    message: 'Annual appreciation rate is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    type: 'required',
    field: 'currentTaxBracket',
    message: 'Current tax bracket is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'capitalGainsTaxRate',
    message: 'Capital gains tax rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'deferralPeriod',
    message: 'Tax deferral period is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 5
  },
  {
    type: 'required',
    field: 'alternativeInvestmentReturn',
    message: 'Alternative investment return rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'inflationRate',
    message: 'Inflation rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },

  // Range validations
  {
    type: 'range',
    field: 'initialInvestment',
    message: 'Initial investment must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    type: 'range',
    field: 'investmentTimeline',
    message: 'Investment timeline must be between 5 and 30 years',
    validator: (value: any) => value >= 5 && value <= 30
  },
  {
    type: 'range',
    field: 'annualAppreciationRate',
    message: 'Annual appreciation rate must be between 0% and 25%',
    validator: (value: any) => value >= 0 && value <= 25
  },
  {
    type: 'range',
    field: 'annualRentalIncome',
    message: 'Annual rental income must be between $0 and $500,000',
    validator: (value: any) => value >= 0 && value <= 500000
  },
  {
    type: 'range',
    field: 'rentalIncomeGrowthRate',
    message: 'Rental income growth rate must be between 0% and 15%',
    validator: (value: any) => value >= 0 && value <= 15
  },
  {
    type: 'range',
    field: 'currentTaxBracket',
    message: 'Current tax bracket must be between 10% and 37%',
    validator: (value: any) => value >= 10 && value <= 37
  },
  {
    type: 'range',
    field: 'capitalGainsTaxRate',
    message: 'Capital gains tax rate must be between 0% and 25%',
    validator: (value: any) => value >= 0 && value <= 25
  },
  {
    type: 'range',
    field: 'deferralPeriod',
    message: 'Tax deferral period must be between 5 and 10 years',
    validator: (value: any) => value >= 5 && value <= 10
  },
  {
    type: 'range',
    field: 'annualOperatingExpenses',
    message: 'Annual operating expenses must be between $0 and $100,000',
    validator: (value: any) => value >= 0 && value <= 100000
  },
  {
    type: 'range',
    field: 'annualPropertyTaxes',
    message: 'Annual property taxes must be between $0 and $50,000',
    validator: (value: any) => value >= 0 && value <= 50000
  },
  {
    type: 'range',
    field: 'annualInsurance',
    message: 'Annual insurance must be between $0 and $25,000',
    validator: (value: any) => value >= 0 && value <= 25000
  },
  {
    type: 'range',
    field: 'acquisitionCosts',
    message: 'Acquisition costs must be between $0 and $500,000',
    validator: (value: any) => value >= 0 && value <= 500000
  },
  {
    type: 'range',
    field: 'exitCosts',
    message: 'Exit costs must be between $0 and $500,000',
    validator: (value: any) => value >= 0 && value <= 500000
  },
  {
    type: 'range',
    field: 'alternativeInvestmentReturn',
    message: 'Alternative investment return must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    type: 'range',
    field: 'inflationRate',
    message: 'Inflation rate must be between 0% and 10%',
    validator: (value: any) => value >= 0 && value <= 10
  },

  // Business rule validations
  {
    type: 'business',
    field: 'investmentTimeline',
    message: 'Opportunity Zone investments typically require 10+ years for maximum tax benefits',
    validator: (value: any) => value >= 10
  },
  {
    type: 'business',
    field: 'deferralPeriod',
    message: 'Tax deferral period should align with your investment timeline',
    validator: (value: any, allInputs: Record<string, any>) => {
      const investmentTimeline = allInputs.investmentTimeline || 10;
      return value <= investmentTimeline;
    }
  },
  {
    type: 'business',
    field: 'annualRentalIncome',
    message: 'Rental income should be reasonable relative to property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const initialInvestment = allInputs.initialInvestment || 0;
      if (initialInvestment === 0) return true;
      const grossRentMultiplier = initialInvestment / value;
      return grossRentMultiplier >= 8 && grossRentMultiplier <= 25; // Typical GRM range
    }
  },
  {
    type: 'business',
    field: 'annualOperatingExpenses',
    message: 'Operating expenses should not exceed rental income significantly',
    validator: (value: any, allInputs: Record<string, any>) => {
      const annualRentalIncome = allInputs.annualRentalIncome || 0;
      if (annualRentalIncome === 0) return true;
      return value <= annualRentalIncome * 1.5; // Allow some flexibility for high-value properties
    }
  },
  {
    type: 'business',
    field: 'acquisitionCosts',
    message: 'Acquisition costs should typically be 2-8% of property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const initialInvestment = allInputs.initialInvestment || 0;
      if (initialInvestment === 0) return true;
      const costPercentage = (value / initialInvestment) * 100;
      return costPercentage >= 2 && costPercentage <= 8;
    }
  },
  {
    type: 'business',
    field: 'exitCosts',
    message: 'Exit costs should typically be 3-10% of property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const initialInvestment = allInputs.initialInvestment || 0;
      if (initialInvestment === 0) return true;
      const costPercentage = (value / initialInvestment) * 100;
      return costPercentage >= 3 && costPercentage <= 10;
    }
  },
  {
    type: 'business',
    field: 'capitalGainsTaxRate',
    message: 'Capital gains tax rate should be lower than current tax bracket for OZ benefits',
    validator: (value: any, allInputs: Record<string, any>) => {
      const currentTaxBracket = allInputs.currentTaxBracket || 0;
      return value < currentTaxBracket;
    }
  },
  {
    type: 'business',
    field: 'alternativeInvestmentReturn',
    message: 'Alternative investment return should be realistic for comparison',
    validator: (value: any) => {
      // Typical returns for diversified portfolios
      return value >= 3 && value <= 15;
    }
  },
  {
    type: 'business',
    field: 'inflationRate',
    message: 'Inflation rate should be realistic for long-term planning',
    validator: (value: any) => {
      // Historical inflation rates and reasonable projections
      return value >= 1 && value <= 8;
    }
  }
];