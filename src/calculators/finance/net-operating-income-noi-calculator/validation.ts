import { NetOperatingIncomeNoiInputs } from './types';

export function validateNetOperatingIncomeNoiInputs(inputs: NetOperatingIncomeNoiInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Income validation
  if (!inputs.grossRentalIncome || inputs.grossRentalIncome <= 0) {
    errors.push({ field: 'grossRentalIncome', message: 'Gross rental income must be greater than 0' });
  }
  if (inputs.grossRentalIncome && inputs.grossRentalIncome > 10000000) {
    errors.push({ field: 'grossRentalIncome', message: 'Gross rental income cannot exceed $10,000,000' });
  }

  if (inputs.otherIncome < 0) {
    errors.push({ field: 'otherIncome', message: 'Other income cannot be negative' });
  }

  // Expense validation
  if (inputs.propertyManagement < 0 || inputs.propertyManagement > 20) {
    errors.push({ field: 'propertyManagement', message: 'Property management fee must be between 0% and 20%' });
  }

  if (inputs.maintenance < 0 || inputs.maintenance > 10) {
    errors.push({ field: 'maintenance', message: 'Maintenance expense must be between 0% and 10% of gross income' });
  }

  if (inputs.utilities < 0) {
    errors.push({ field: 'utilities', message: 'Utilities cannot be negative' });
  }

  if (inputs.insurance < 0) {
    errors.push({ field: 'insurance', message: 'Insurance cannot be negative' });
  }

  if (inputs.propertyTaxes < 0) {
    errors.push({ field: 'propertyTaxes', message: 'Property taxes cannot be negative' });
  }

  if (inputs.legalFees < 0) {
    errors.push({ field: 'legalFees', message: 'Legal fees cannot be negative' });
  }

  if (inputs.accountingFees < 0) {
    errors.push({ field: 'accountingFees', message: 'Accounting fees cannot be negative' });
  }

  if (inputs.advertising < 0) {
    errors.push({ field: 'advertising', message: 'Advertising cannot be negative' });
  }

  if (inputs.supplies < 0) {
    errors.push({ field: 'supplies', message: 'Supplies cannot be negative' });
  }

  if (inputs.otherExpenses < 0) {
    errors.push({ field: 'otherExpenses', message: 'Other expenses cannot be negative' });
  }

  // Property details validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }
  if (inputs.propertyValue && inputs.propertyValue > 50000000) {
    errors.push({ field: 'propertyValue', message: 'Property value cannot exceed $50,000,000' });
  }

  if (!inputs.squareFootage || inputs.squareFootage <= 0) {
    errors.push({ field: 'squareFootage', message: 'Square footage must be greater than 0' });
  }

  if (!inputs.numberOfUnits || inputs.numberOfUnits <= 0) {
    errors.push({ field: 'numberOfUnits', message: 'Number of units must be greater than 0' });
  }

  // Analysis parameters validation
  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 50) {
    errors.push({ field: 'vacancyRate', message: 'Vacancy rate must be between 0% and 50%' });
  }

  if (inputs.marketRentPerSqFt < 0) {
    errors.push({ field: 'marketRentPerSqFt', message: 'Market rent per square foot cannot be negative' });
  }

  if (inputs.expenseGrowthRate < -10 || inputs.expenseGrowthRate > 20) {
    errors.push({ field: 'expenseGrowthRate', message: 'Expense growth rate must be between -10% and 20%' });
  }

  if (inputs.incomeGrowthRate < -10 || inputs.incomeGrowthRate > 20) {
    errors.push({ field: 'incomeGrowthRate', message: 'Income growth rate must be between -10% and 20%' });
  }

  // Cap rate validation
  if (inputs.marketCapRate <= 0 || inputs.marketCapRate > 20) {
    errors.push({ field: 'marketCapRate', message: 'Market cap rate must be between 0% and 20%' });
  }

  if (inputs.targetCapRate <= 0 || inputs.targetCapRate > 20) {
    errors.push({ field: 'targetCapRate', message: 'Target cap rate must be between 0% and 20%' });
  }

  // Loan validation
  if (inputs.loanAmount < 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot be negative' });
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0% and 20%' });
  }

  if (inputs.loanTerm <= 0 || inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be between 1 and 50 years' });
  }

  if (inputs.downPayment < 0 || inputs.downPayment > 100) {
    errors.push({ field: 'downPayment', message: 'Down payment must be between 0% and 100%' });
  }

  // Tax validation
  if (inputs.depreciationYears <= 0 || inputs.depreciationYears > 50) {
    errors.push({ field: 'depreciationYears', message: 'Depreciation years must be between 1 and 50' });
  }

  if (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50) {
    errors.push({ field: 'marginalTaxRate', message: 'Marginal tax rate must be between 0% and 50%' });
  }

  return errors;
}

export function validateNetOperatingIncomeNoiBusinessRules(inputs: NetOperatingIncomeNoiInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // NOI margin warnings
  const grossIncome = inputs.grossRentalIncome + inputs.otherIncome;
  const effectiveGrossIncome = grossIncome * (1 - inputs.vacancyRate / 100);
  const estimatedExpenses = inputs.grossRentalIncome * (inputs.propertyManagement / 100) +
                           inputs.grossRentalIncome * (inputs.maintenance / 100) +
                           inputs.utilities + inputs.insurance + inputs.propertyTaxes +
                           inputs.legalFees + inputs.accountingFees + inputs.advertising +
                           inputs.supplies + inputs.otherExpenses;
  const estimatedNoi = effectiveGrossIncome - estimatedExpenses;
  const noiMargin = effectiveGrossIncome > 0 ? (estimatedNoi / effectiveGrossIncome) * 100 : 0;

  if (noiMargin < 40) {
    warnings.push({ field: 'noiMargin', message: 'NOI margin below 40% - review expenses and vacancy' });
  } else if (noiMargin > 80) {
    warnings.push({ field: 'noiMargin', message: 'Very high NOI margin - verify expense estimates' });
  }

  // Vacancy rate warnings
  if (inputs.vacancyRate > 10) {
    warnings.push({ field: 'vacancyRate', message: 'High vacancy rate may indicate property issues' });
  } else if (inputs.vacancyRate > 5) {
    warnings.push({ field: 'vacancyRate', message: 'Moderate vacancy rate - monitor market conditions' });
  }

  // Cap rate warnings
  if (inputs.marketCapRate < 3) {
    warnings.push({ field: 'marketCapRate', message: 'Very low market cap rate - verify market data' });
  } else if (inputs.marketCapRate > 15) {
    warnings.push({ field: 'marketCapRate', message: 'High market cap rate may indicate higher risk' });
  }

  // Loan-to-value warnings
  if (inputs.loanAmount > 0 && inputs.propertyValue > 0) {
    const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltv > 85) {
      warnings.push({ field: 'loanAmount', message: 'High loan-to-value ratio increases risk' });
    }
  }

  // Expense ratio warnings
  const expenseRatio = effectiveGrossIncome > 0 ? (estimatedExpenses / effectiveGrossIncome) * 100 : 0;
  if (expenseRatio > 50) {
    warnings.push({ field: 'totalOperatingExpenses', message: 'High expense ratio reduces profitability' });
  }

  // Rent vs market warnings
  if (inputs.marketRentPerSqFt > 0 && inputs.squareFootage > 0) {
    const marketRent = inputs.marketRentPerSqFt * inputs.squareFootage * 12;
    const currentRent = inputs.grossRentalIncome;
    const rentRatio = currentRent / marketRent;

    if (rentRatio < 0.9) {
      warnings.push({ field: 'grossRentalIncome', message: 'Rent significantly below market - opportunity for increases' });
    } else if (rentRatio > 1.1) {
      warnings.push({ field: 'grossRentalIncome', message: 'Rent above market - monitor for turnover' });
    }
  }

  // Property management fee warnings
  if (inputs.propertyManagement > 12) {
    warnings.push({ field: 'propertyManagement', message: 'High property management fee - consider self-management or alternative providers' });
  }

  // Maintenance expense warnings
  if (inputs.maintenance > 3) {
    warnings.push({ field: 'maintenance', message: 'High maintenance expense - review property condition and preventive maintenance' });
  }

  // Growth rate warnings
  if (Math.abs(inputs.expenseGrowthRate) > 10) {
    warnings.push({ field: 'expenseGrowthRate', message: 'Extreme expense growth rate - consider historical trends' });
  }

  if (Math.abs(inputs.incomeGrowthRate) > 10) {
    warnings.push({ field: 'incomeGrowthRate', message: 'Extreme income growth rate - consider market conditions' });
  }

  // Tax rate warnings
  if (inputs.marginalTaxRate > 40) {
    warnings.push({ field: 'marginalTaxRate', message: 'High tax rate reduces after-tax cash flow' });
  }

  // Down payment warnings
  if (inputs.downPayment < 20) {
    warnings.push({ field: 'downPayment', message: 'Low down payment increases financing risk' });
  }

  // Interest rate warnings
  if (inputs.interestRate > 8) {
    warnings.push({ field: 'interestRate', message: 'High interest rate reduces cash flow' });
  }

  // Loan term warnings
  if (inputs.loanTerm < 10) {
    warnings.push({ field: 'loanTerm', message: 'Short loan term increases refinancing risk' });
  }

  return warnings;
}