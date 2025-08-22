import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageVsRentInputs extends CalculatorInputs {
  // Property Information
  homePrice: number;
  downPayment: number;
  
  // Mortgage Information
  interestRate: number;
  loanTerm: number;
  
  // Rent Information
  monthlyRent: number;
  rentIncreaseRate?: number;
  
  // Property Costs
  propertyTax: number;
  homeInsurance: number;
  hoaFees?: number;
  maintenanceCosts?: number;
  closingCosts: number;
  
  // Market Assumptions
  homeAppreciationRate?: number;
  investmentReturn?: number;
  taxRate?: number;
  analysisPeriod?: number;
  
  // Insurance and Fees
  includePMI?: boolean;
  pmiRate?: number;
  
  // Utilities
  includeUtilities?: boolean;
  buyerUtilities?: number;
  renterUtilities?: number;
  
  // Analysis Options
  includeTaxBenefits?: boolean;
  includeOpportunityCost?: boolean;
  includeLiquidity?: boolean;
  includeFlexibility?: boolean;
}

export const validateMortgageVsRentInputs = (inputs: Partial<MortgageVsRentInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!inputs.homePrice && inputs.homePrice !== 0) {
    errors.push('Home price is required');
  }
  if (!inputs.downPayment && inputs.downPayment !== 0) {
    errors.push('Down payment is required');
  }
  if (!inputs.interestRate && inputs.interestRate !== 0) {
    errors.push('Interest rate is required');
  }
  if (!inputs.loanTerm && inputs.loanTerm !== 0) {
    errors.push('Loan term is required');
  }
  if (!inputs.monthlyRent && inputs.monthlyRent !== 0) {
    errors.push('Monthly rent is required');
  }
  if (!inputs.propertyTax && inputs.propertyTax !== 0) {
    errors.push('Property tax is required');
  }
  if (!inputs.homeInsurance && inputs.homeInsurance !== 0) {
    errors.push('Home insurance is required');
  }
  if (!inputs.closingCosts && inputs.closingCosts !== 0) {
    errors.push('Closing costs are required');
  }

  // Home price validation
  if (inputs.homePrice !== undefined && (inputs.homePrice < 50000 || inputs.homePrice > 10000000)) {
    errors.push('Home price must be between $50,000 and $10,000,000');
  }

  // Down payment validation
  if (inputs.downPayment !== undefined && (inputs.downPayment < 0 || inputs.downPayment > 1000000)) {
    errors.push('Down payment must be between $0 and $1,000,000');
  }

  // Rate validation
  if (inputs.interestRate !== undefined && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  // Loan term validation
  if (inputs.loanTerm !== undefined && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  // Rent validation
  if (inputs.monthlyRent !== undefined && (inputs.monthlyRent < 100 || inputs.monthlyRent > 50000)) {
    errors.push('Monthly rent must be between $100 and $50,000');
  }

  // Rent increase rate validation
  if (inputs.rentIncreaseRate !== undefined && (inputs.rentIncreaseRate < 0 || inputs.rentIncreaseRate > 20)) {
    errors.push('Rent increase rate must be between 0% and 20%');
  }

  // Property tax validation
  if (inputs.propertyTax !== undefined && (inputs.propertyTax < 0 || inputs.propertyTax > 100000)) {
    errors.push('Property tax must be between $0 and $100,000');
  }

  // Home insurance validation
  if (inputs.homeInsurance !== undefined && (inputs.homeInsurance < 0 || inputs.homeInsurance > 10000)) {
    errors.push('Home insurance must be between $0 and $10,000');
  }

  // HOA fees validation
  if (inputs.hoaFees !== undefined && (inputs.hoaFees < 0 || inputs.hoaFees > 5000)) {
    errors.push('HOA fees must be between $0 and $5,000');
  }

  // Maintenance costs validation
  if (inputs.maintenanceCosts !== undefined && (inputs.maintenanceCosts < 0 || inputs.maintenanceCosts > 50000)) {
    errors.push('Maintenance costs must be between $0 and $50,000');
  }

  // Closing costs validation
  if (inputs.closingCosts !== undefined && (inputs.closingCosts < 0 || inputs.closingCosts > 50000)) {
    errors.push('Closing costs must be between $0 and $50,000');
  }

  // Home appreciation rate validation
  if (inputs.homeAppreciationRate !== undefined && (inputs.homeAppreciationRate < -20 || inputs.homeAppreciationRate > 20)) {
    errors.push('Home appreciation rate must be between -20% and 20%');
  }

  // Investment return validation
  if (inputs.investmentReturn !== undefined && (inputs.investmentReturn < 0 || inputs.investmentReturn > 20)) {
    errors.push('Investment return rate must be between 0% and 20%');
  }

  // Tax rate validation
  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  // Analysis period validation
  if (inputs.analysisPeriod !== undefined && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  // PMI rate validation
  if (inputs.pmiRate !== undefined && (inputs.pmiRate < 0 || inputs.pmiRate > 5)) {
    errors.push('PMI rate must be between 0% and 5%');
  }

  // Utilities validation
  if (inputs.buyerUtilities !== undefined && (inputs.buyerUtilities < 0 || inputs.buyerUtilities > 2000)) {
    errors.push('Buyer utilities must be between $0 and $2,000');
  }
  if (inputs.renterUtilities !== undefined && (inputs.renterUtilities < 0 || inputs.renterUtilities > 2000)) {
    errors.push('Renter utilities must be between $0 and $2,000');
  }

  // Logical consistency checks
  if (inputs.downPayment !== undefined && inputs.homePrice !== undefined) {
    if (inputs.downPayment > inputs.homePrice) {
      errors.push('Down payment cannot exceed home price');
    }
    if (inputs.downPayment < inputs.homePrice * 0.05) {
      errors.push('Down payment should be at least 5% of home price');
    }
  }

  if (inputs.homePrice !== undefined && inputs.monthlyRent !== undefined) {
    const priceToRentRatio = inputs.homePrice / (inputs.monthlyRent * 12);
    if (priceToRentRatio > 50) {
      errors.push('Price-to-rent ratio is unusually high - consider market conditions');
    }
    if (priceToRentRatio < 5) {
      errors.push('Price-to-rent ratio is unusually low - verify inputs');
    }
  }

  if (inputs.interestRate !== undefined && inputs.investmentReturn !== undefined) {
    if (inputs.investmentReturn < inputs.interestRate) {
      errors.push('Investment return should typically exceed mortgage interest rate');
    }
  }

  if (inputs.homeAppreciationRate !== undefined && inputs.rentIncreaseRate !== undefined) {
    if (Math.abs(inputs.homeAppreciationRate - inputs.rentIncreaseRate) > 10) {
      errors.push('Large difference between home appreciation and rent increase rates');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};