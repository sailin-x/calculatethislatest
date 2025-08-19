import { ValidationError } from '../../types/ValidationError';
import { MortgageVsRentInputs } from './formulas';

export function validateMortgageVsRentInputs(inputs: MortgageVsRentInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields validation
  if (!inputs.currentRent || inputs.currentRent <= 0) {
    errors.push({
      field: 'currentRent',
      message: 'Current rent is required and must be greater than 0'
    });
  }

  if (!inputs.rentIncreaseRate || inputs.rentIncreaseRate < 0) {
    errors.push({
      field: 'rentIncreaseRate',
      message: 'Rent increase rate is required and must be non-negative'
    });
  }

  if (!inputs.homePrice || inputs.homePrice <= 0) {
    errors.push({
      field: 'homePrice',
      message: 'Home price is required and must be greater than 0'
    });
  }

  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.push({
      field: 'downPayment',
      message: 'Down payment is required and must be non-negative'
    });
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate is required and must be greater than 0'
    });
  }

  if (!inputs.loanTerm) {
    errors.push({
      field: 'loanTerm',
      message: 'Loan term is required'
    });
  }

  if (!inputs.propertyTaxRate || inputs.propertyTaxRate < 0) {
    errors.push({
      field: 'propertyTaxRate',
      message: 'Property tax rate is required and must be non-negative'
    });
  }

  if (!inputs.homeownersInsurance || inputs.homeownersInsurance < 0) {
    errors.push({
      field: 'homeownersInsurance',
      message: 'Homeowners insurance is required and must be non-negative'
    });
  }

  if (!inputs.maintenanceCost || inputs.maintenanceCost < 0) {
    errors.push({
      field: 'maintenanceCost',
      message: 'Maintenance cost is required and must be non-negative'
    });
  }

  if (!inputs.utilities || inputs.utilities < 0) {
    errors.push({
      field: 'utilities',
      message: 'Utilities cost is required and must be non-negative'
    });
  }

  if (!inputs.utilitiesHome || inputs.utilitiesHome < 0) {
    errors.push({
      field: 'utilitiesHome',
      message: 'Home utilities cost is required and must be non-negative'
    });
  }

  if (!inputs.closingCosts || inputs.closingCosts < 0) {
    errors.push({
      field: 'closingCosts',
      message: 'Closing costs are required and must be non-negative'
    });
  }

  if (!inputs.homeAppreciation) {
    errors.push({
      field: 'homeAppreciation',
      message: 'Home appreciation rate is required'
    });
  }

  if (!inputs.investmentReturn || inputs.investmentReturn < 0) {
    errors.push({
      field: 'investmentReturn',
      message: 'Investment return rate is required and must be non-negative'
    });
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push({
      field: 'analysisPeriod',
      message: 'Analysis period is required and must be greater than 0'
    });
  }

  // Range validations
  if (inputs.currentRent && (inputs.currentRent < 100 || inputs.currentRent > 10000)) {
    errors.push({
      field: 'currentRent',
      message: 'Current rent must be between $100 and $10,000'
    });
  }

  if (inputs.rentIncreaseRate && (inputs.rentIncreaseRate < 0 || inputs.rentIncreaseRate > 20)) {
    errors.push({
      field: 'rentIncreaseRate',
      message: 'Rent increase rate must be between 0% and 20%'
    });
  }

  if (inputs.homePrice && (inputs.homePrice < 50000 || inputs.homePrice > 5000000)) {
    errors.push({
      field: 'homePrice',
      message: 'Home price must be between $50,000 and $5,000,000'
    });
  }

  if (inputs.downPayment && (inputs.downPayment < 0 || inputs.downPayment > 1000000)) {
    errors.push({
      field: 'downPayment',
      message: 'Down payment must be between $0 and $1,000,000'
    });
  }

  if (inputs.interestRate && (inputs.interestRate < 0.1 || inputs.interestRate > 20)) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate must be between 0.1% and 20%'
    });
  }

  if (inputs.propertyTaxRate && (inputs.propertyTaxRate < 0 || inputs.propertyTaxRate > 5)) {
    errors.push({
      field: 'propertyTaxRate',
      message: 'Property tax rate must be between 0% and 5%'
    });
  }

  if (inputs.homeownersInsurance && (inputs.homeownersInsurance < 0 || inputs.homeownersInsurance > 10000)) {
    errors.push({
      field: 'homeownersInsurance',
      message: 'Homeowners insurance must be between $0 and $10,000'
    });
  }

  if (inputs.pmiRate && (inputs.pmiRate < 0 || inputs.pmiRate > 2)) {
    errors.push({
      field: 'pmiRate',
      message: 'PMI rate must be between 0% and 2%'
    });
  }

  if (inputs.maintenanceCost && (inputs.maintenanceCost < 0 || inputs.maintenanceCost > 50000)) {
    errors.push({
      field: 'maintenanceCost',
      message: 'Maintenance cost must be between $0 and $50,000'
    });
  }

  if (inputs.utilities && (inputs.utilities < 0 || inputs.utilities > 2000)) {
    errors.push({
      field: 'utilities',
      message: 'Utilities cost must be between $0 and $2,000'
    });
  }

  if (inputs.utilitiesHome && (inputs.utilitiesHome < 0 || inputs.utilitiesHome > 2000)) {
    errors.push({
      field: 'utilitiesHome',
      message: 'Home utilities cost must be between $0 and $2,000'
    });
  }

  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 50000)) {
    errors.push({
      field: 'closingCosts',
      message: 'Closing costs must be between $0 and $50,000'
    });
  }

  if (inputs.homeAppreciation && (inputs.homeAppreciation < -10 || inputs.homeAppreciation > 20)) {
    errors.push({
      field: 'homeAppreciation',
      message: 'Home appreciation rate must be between -10% and 20%'
    });
  }

  if (inputs.investmentReturn && (inputs.investmentReturn < 0 || inputs.investmentReturn > 20)) {
    errors.push({
      field: 'investmentReturn',
      message: 'Investment return rate must be between 0% and 20%'
    });
  }

  if (inputs.analysisPeriod && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30)) {
    errors.push({
      field: 'analysisPeriod',
      message: 'Analysis period must be between 1 and 30 years'
    });
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push({
      field: 'taxRate',
      message: 'Tax rate must be between 0% and 50%'
    });
  }

  if (inputs.rentersInsurance && (inputs.rentersInsurance < 0 || inputs.rentersInsurance > 500)) {
    errors.push({
      field: 'rentersInsurance',
      message: 'Renters insurance must be between $0 and $500'
    });
  }

  if (inputs.hoaFees && (inputs.hoaFees < 0 || inputs.hoaFees > 2000)) {
    errors.push({
      field: 'hoaFees',
      message: 'HOA fees must be between $0 and $2,000'
    });
  }

  // Loan term validation
  const validLoanTerms = ['15', '20', '30'];
  if (inputs.loanTerm && !validLoanTerms.includes(inputs.loanTerm)) {
    errors.push({
      field: 'loanTerm',
      message: 'Loan term must be 15, 20, or 30 years'
    });
  }

  // Business logic validations
  if (inputs.downPayment && inputs.homePrice && inputs.downPayment > inputs.homePrice) {
    errors.push({
      field: 'downPayment',
      message: 'Down payment cannot exceed home price'
    });
  }

  if (inputs.downPayment && inputs.homePrice) {
    const downPaymentPercentage = (inputs.downPayment / inputs.homePrice) * 100;
    if (downPaymentPercentage > 100) {
      errors.push({
        field: 'downPayment',
        message: 'Down payment percentage cannot exceed 100%'
      });
    }
  }

  if (inputs.pmiRate && inputs.pmiRate > 0 && inputs.downPayment && inputs.homePrice) {
    const downPaymentPercentage = (inputs.downPayment / inputs.homePrice) * 100;
    if (downPaymentPercentage >= 20) {
      errors.push({
        field: 'pmiRate',
        message: 'PMI is not required when down payment is 20% or more'
      });
    }
  }

  if (inputs.analysisPeriod && inputs.loanTerm) {
    const loanTermYears = parseInt(inputs.loanTerm);
    if (inputs.analysisPeriod > loanTermYears) {
      errors.push({
        field: 'analysisPeriod',
        message: `Analysis period (${inputs.analysisPeriod} years) cannot exceed loan term (${loanTermYears} years)`
      });
    }
  }

  // Reasonableness checks
  if (inputs.maintenanceCost && inputs.homePrice) {
    const maintenancePercentage = (inputs.maintenanceCost / inputs.homePrice) * 100;
    if (maintenancePercentage > 5) {
      errors.push({
        field: 'maintenanceCost',
        message: 'Annual maintenance cost seems unusually high (>5% of home price)'
      });
    }
  }

  if (inputs.closingCosts && inputs.homePrice) {
    const closingCostPercentage = (inputs.closingCosts / inputs.homePrice) * 100;
    if (closingCostPercentage > 10) {
      errors.push({
        field: 'closingCosts',
        message: 'Closing costs seem unusually high (>10% of home price)'
      });
    }
  }

  if (inputs.homeownersInsurance && inputs.homePrice) {
    const insurancePercentage = (inputs.homeownersInsurance / inputs.homePrice) * 100;
    if (insurancePercentage > 2) {
      errors.push({
        field: 'homeownersInsurance',
        message: 'Homeowners insurance seems unusually high (>2% of home price)'
      });
    }
  }

  return errors;
}