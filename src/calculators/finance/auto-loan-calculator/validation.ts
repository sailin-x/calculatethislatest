import { AutoLoanCalculatorInputs } from './types';

export function validateAutoLoanCalculatorInputs(inputs: AutoLoanCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Required field validations
  if (inputs.vehiclePrice <= 0) {
    errors.push({ field: 'vehiclePrice', message: 'Vehicle price must be greater than $0' });
  }

  if (inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }

  if (inputs.tradeInValue < 0) {
    errors.push({ field: 'tradeInValue', message: 'Trade-in value cannot be negative' });
  }

  if (inputs.loanTermYears < 1 || inputs.loanTermYears > 10) {
    errors.push({ field: 'loanTermYears', message: 'Loan term must be between 1 and 10 years' });
  }

  if (inputs.interestRate <= 0 || inputs.interestRate > 25) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0.01% and 25%' });
  }

  if (inputs.vehicleYear < 1990 || inputs.vehicleYear > new Date().getFullYear() + 1) {
    errors.push({ field: 'vehicleYear', message: 'Vehicle year must be between 1990 and next year' });
  }

  if (!inputs.vehicleMake?.trim()) {
    errors.push({ field: 'vehicleMake', message: 'Vehicle make is required' });
  }

  if (!inputs.vehicleModel?.trim()) {
    errors.push({ field: 'vehicleModel', message: 'Vehicle model is required' });
  }

  if (inputs.fuelEfficiency < 10 || inputs.fuelEfficiency > 150) {
    errors.push({ field: 'fuelEfficiency', message: 'Fuel efficiency must be between 10 and 150 MPG' });
  }

  if (inputs.annualMileage < 1000 || inputs.annualMileage > 50000) {
    errors.push({ field: 'annualMileage', message: 'Annual mileage must be between 1,000 and 50,000 miles' });
  }

  if (inputs.fuelPricePerGallon <= 0 || inputs.fuelPricePerGallon > 10) {
    errors.push({ field: 'fuelPricePerGallon', message: 'Fuel price must be between $0.01 and $10 per gallon' });
  }

  if (inputs.extendedWarrantyCost < 0) {
    errors.push({ field: 'extendedWarrantyCost', message: 'Extended warranty cost cannot be negative' });
  }

  if (inputs.extendedWarrantyYears < 0 || inputs.extendedWarrantyYears > 10) {
    errors.push({ field: 'extendedWarrantyYears', message: 'Extended warranty years must be between 0 and 10' });
  }

  if (inputs.salesTaxRate < 0 || inputs.salesTaxRate > 20) {
    errors.push({ field: 'salesTaxRate', message: 'Sales tax rate must be between 0% and 20%' });
  }

  if (inputs.otherFees < 0) {
    errors.push({ field: 'otherFees', message: 'Other fees cannot be negative' });
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push({ field: 'creditScore', message: 'Credit score must be between 300 and 850' });
  }

  // Business logic validations
  const loanAmount = inputs.vehiclePrice - inputs.downPayment - inputs.tradeInValue;
  if (loanAmount <= 0) {
    errors.push({ field: 'downPayment', message: 'Down payment and trade-in value cannot exceed vehicle price' });
  }

  if (inputs.downPayment > inputs.vehiclePrice) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot exceed vehicle price' });
  }

  return errors;
}

export function validateAutoLoanCalculatorBusinessRules(inputs: AutoLoanCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Auto loan-specific interest rate validation based on credit score
  if (inputs.creditScore) {
    const recommendedRate = getRecommendedInterestRate(inputs.creditScore);

    if (inputs.interestRate < recommendedRate.min) {
      warnings.push({
        field: 'interestRate',
        message: `Interest rate seems low for credit score ${inputs.creditScore}. Typical range: ${recommendedRate.min}% - ${recommendedRate.max}%`
      });
    } else if (inputs.interestRate > recommendedRate.max) {
      warnings.push({
        field: 'interestRate',
        message: `Interest rate seems high for credit score ${inputs.creditScore}. Typical range: ${recommendedRate.min}% - ${recommendedRate.max}%`
      });
    }
  }

  // Loan-to-value ratio warning
  const loanAmount = inputs.vehiclePrice - inputs.downPayment - inputs.tradeInValue;
  const ltvRatio = (loanAmount / inputs.vehiclePrice) * 100;

  if (ltvRatio > 90) {
    warnings.push({
      field: 'downPayment',
      message: `High loan-to-value ratio (${ltvRatio.toFixed(1)}%). Consider increasing down payment to reduce risk.`
    });
  }

  // Fuel efficiency warnings
  if (inputs.fuelEfficiency < 20) {
    warnings.push({
      field: 'fuelEfficiency',
      message: 'Low fuel efficiency may result in high ownership costs. Consider fuel-efficient alternatives.'
    });
  }

  // Extended warranty analysis
  if (inputs.extendedWarrantyCost > 0 && inputs.extendedWarrantyYears > 0) {
    const monthlyWarrantyCost = inputs.extendedWarrantyCost / (inputs.extendedWarrantyYears * 12);
    if (monthlyWarrantyCost > 50) {
      warnings.push({
        field: 'extendedWarrantyCost',
        message: `Extended warranty costs $${monthlyWarrantyCost.toFixed(0)}/month. Evaluate if coverage justifies the expense.`
      });
    }
  }

  // High mileage warning
  if (inputs.annualMileage > 15000) {
    warnings.push({
      field: 'annualMileage',
      message: 'High annual mileage may increase depreciation and maintenance costs.'
    });
  }

  return warnings;
}

// Helper function to get recommended interest rate range based on credit score
function getRecommendedInterestRate(creditScore: number): { min: number; max: number } {
  if (creditScore >= 800) {
    return { min: 3.0, max: 5.5 };
  } else if (creditScore >= 740) {
    return { min: 4.0, max: 6.5 };
  } else if (creditScore >= 670) {
    return { min: 5.0, max: 8.0 };
  } else if (creditScore >= 580) {
    return { min: 7.0, max: 12.0 };
  } else {
    return { min: 10.0, max: 20.0 };
  }
}
