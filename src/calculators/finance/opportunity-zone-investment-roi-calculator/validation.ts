import { OpportunityZoneInvestmentRoiInputs } from './types';

export function validateOpportunityZoneInvestmentRoiInputs(inputs: OpportunityZoneInvestmentRoiInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Investment validation
  if (!inputs.initialInvestment || inputs.initialInvestment <= 0) {
    errors.push({ field: 'initialInvestment', message: 'Initial investment must be greater than 0' });
  }
  if (inputs.initialInvestment && inputs.initialInvestment > 10000000) {
    errors.push({ field: 'initialInvestment', message: 'Initial investment cannot exceed $10,000,000' });
  }

  // Date validation
  if (!inputs.investmentDate) {
    errors.push({ field: 'investmentDate', message: 'Investment date is required' });
  } else {
    const investmentDate = new Date(inputs.investmentDate);
    const now = new Date();
    if (investmentDate > now) {
      errors.push({ field: 'investmentDate', message: 'Investment date cannot be in the future' });
    }
  }

  if (!inputs.zoneDesignationDate) {
    errors.push({ field: 'zoneDesignationDate', message: 'Zone designation date is required' });
  }

  // Holding period validation
  if (!inputs.holdingPeriod || inputs.holdingPeriod <= 0) {
    errors.push({ field: 'holdingPeriod', message: 'Holding period must be greater than 0 years' });
  }
  if (inputs.holdingPeriod && inputs.holdingPeriod > 10) {
    errors.push({ field: 'holdingPeriod', message: 'Holding period cannot exceed 10 years' });
  }

  // Property validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Tax benefit validation
  if (inputs.stepUpInBasis < 0 || inputs.stepUpInBasis > 20) {
    errors.push({ field: 'stepUpInBasis', message: 'Step-up in basis must be between 0% and 20%' });
  }

  if (inputs.capitalGainsTaxReduction < 0 || inputs.capitalGainsTaxReduction > 20) {
    errors.push({ field: 'capitalGainsTaxReduction', message: 'Capital gains tax reduction must be between 0% and 20%' });
  }

  // Financial projection validation
  if (inputs.expectedAppreciation < -10 || inputs.expectedAppreciation > 30) {
    errors.push({ field: 'expectedAppreciation', message: 'Expected appreciation must be between -10% and 30%' });
  }

  if (inputs.expectedRentalIncome < 0) {
    errors.push({ field: 'expectedRentalIncome', message: 'Expected rental income cannot be negative' });
  }

  if (inputs.operatingExpenses < 0) {
    errors.push({ field: 'operatingExpenses', message: 'Operating expenses cannot be negative' });
  }

  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 50) {
    errors.push({ field: 'vacancyRate', message: 'Vacancy rate must be between 0% and 50%' });
  }

  // Financing validation
  if (inputs.leverageRatio < 0 || inputs.leverageRatio > 90) {
    errors.push({ field: 'leverageRatio', message: 'Leverage ratio must be between 0% and 90%' });
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0% and 20%' });
  }

  if (inputs.loanTerm <= 0 || inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be between 1 and 50 years' });
  }

  // Exit strategy validation
  if (inputs.exitCapRate <= 0 || inputs.exitCapRate > 20) {
    errors.push({ field: 'exitCapRate', message: 'Exit cap rate must be between 0% and 20%' });
  }

  if (inputs.exitYear <= 0 || inputs.exitYear > 10) {
    errors.push({ field: 'exitYear', message: 'Exit year must be between 1 and 10' });
  }

  // Tax rate validation
  if (inputs.capitalGainsTaxRate < 0 || inputs.capitalGainsTaxRate > 50) {
    errors.push({ field: 'capitalGainsTaxRate', message: 'Capital gains tax rate must be between 0% and 50%' });
  }

  if (inputs.ordinaryIncomeTaxRate < 0 || inputs.ordinaryIncomeTaxRate > 50) {
    errors.push({ field: 'ordinaryIncomeTaxRate', message: 'Ordinary income tax rate must be between 0% and 50%' });
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push({ field: 'stateTaxRate', message: 'State tax rate must be between 0% and 20%' });
  }

  // Cost validation
  if (inputs.acquisitionCosts < 0 || inputs.acquisitionCosts > 10) {
    errors.push({ field: 'acquisitionCosts', message: 'Acquisition costs must be between 0% and 10% of property value' });
  }

  if (inputs.annualManagementFees < 0 || inputs.annualManagementFees > 20) {
    errors.push({ field: 'annualManagementFees', message: 'Annual management fees must be between 0% and 20% of rental income' });
  }

  if (inputs.propertyInsurance < 0) {
    errors.push({ field: 'propertyInsurance', message: 'Property insurance cannot be negative' });
  }

  if (inputs.propertyTaxes < 0) {
    errors.push({ field: 'propertyTaxes', message: 'Property taxes cannot be negative' });
  }

  if (inputs.maintenanceReserves < 0 || inputs.maintenanceReserves > 10) {
    errors.push({ field: 'maintenanceReserves', message: 'Maintenance reserves must be between 0% and 10% of rental income' });
  }

  // Market condition validation
  if (inputs.marketGrowthRate < -10 || inputs.marketGrowthRate > 30) {
    errors.push({ field: 'marketGrowthRate', message: 'Market growth rate must be between -10% and 30%' });
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  return errors;
}

export function validateOpportunityZoneInvestmentRoiBusinessRules(inputs: OpportunityZoneInvestmentRoiInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Compliance warnings
  const investmentDate = new Date(inputs.investmentDate);
  const zoneDesignationDate = new Date(inputs.zoneDesignationDate);
  const fiveYearsLater = new Date(investmentDate);
  fiveYearsLater.setFullYear(fiveYearsLater.getFullYear() + 5);
  const sevenYearsLater = new Date(investmentDate);
  sevenYearsLater.setFullYear(sevenYearsLater.getFullYear() + 7);
  const now = new Date();

  if (zoneDesignationDate > investmentDate) {
    warnings.push({ field: 'zoneDesignationDate', message: 'Zone must be designated before investment date' });
  }

  if (now > sevenYearsLater) {
    warnings.push({ field: 'investmentDate', message: 'Investment exceeds 7-year compliance period - tax benefits may be at risk' });
  } else if (now > fiveYearsLater) {
    warnings.push({ field: 'investmentDate', message: 'Investment exceeds 5-year period - monitor compliance requirements' });
  }

  // Investment amount warnings
  if (inputs.initialInvestment < 100000) {
    warnings.push({ field: 'initialInvestment', message: 'Minimum investment for meaningful tax benefits is typically $100,000' });
  }

  // Holding period warnings
  if (inputs.holdingPeriod < 5) {
    warnings.push({ field: 'holdingPeriod', message: 'Holding period less than 5 years may limit tax benefits' });
  } else if (inputs.holdingPeriod < 7) {
    warnings.push({ field: 'holdingPeriod', message: 'Holding period less than 7 years will limit capital gains tax reduction' });
  }

  // Leverage warnings
  if (inputs.leverageRatio > 75) {
    warnings.push({ field: 'leverageRatio', message: 'High leverage increases risk and may affect tax benefits' });
  }

  // Appreciation warnings
  if (inputs.expectedAppreciation < 3) {
    warnings.push({ field: 'expectedAppreciation', message: 'Low expected appreciation may reduce overall returns' });
  } else if (inputs.expectedAppreciation > 15) {
    warnings.push({ field: 'expectedAppreciation', message: 'Very high appreciation expectations may be unrealistic' });
  }

  // Vacancy rate warnings
  if (inputs.vacancyRate > 10) {
    warnings.push({ field: 'vacancyRate', message: 'High vacancy rate may significantly impact cash flow' });
  }

  // Rent vs expenses warning
  if (inputs.expectedRentalIncome > 0 && inputs.operatingExpenses > 0) {
    const expenseRatio = inputs.operatingExpenses / inputs.expectedRentalIncome;
    if (expenseRatio > 0.6) {
      warnings.push({ field: 'operatingExpenses', message: 'High expense ratio may reduce profitability' });
    }
  }

  // Tax rate warnings
  if (inputs.capitalGainsTaxRate < 10) {
    warnings.push({ field: 'capitalGainsTaxRate', message: 'Low capital gains tax rate reduces value of tax deferral benefits' });
  }

  // Market condition warnings
  if (inputs.marketGrowthRate < 0) {
    warnings.push({ field: 'marketGrowthRate', message: 'Negative market growth may affect property values' });
  }

  // Exit strategy warnings
  if (inputs.exitYear < 5) {
    warnings.push({ field: 'exitYear', message: 'Early exit may limit tax benefits and returns' });
  }

  // Property type considerations
  if (inputs.propertyType === 'Industrial' && inputs.expectedAppreciation < 5) {
    warnings.push({ field: 'expectedAppreciation', message: 'Industrial properties typically have lower appreciation - consider market data' });
  }

  // Acquisition cost warnings
  if (inputs.acquisitionCosts > 5) {
    warnings.push({ field: 'acquisitionCosts', message: 'High acquisition costs may reduce overall returns' });
  }

  // Management fee warnings
  if (inputs.annualManagementFees > 10) {
    warnings.push({ field: 'annualManagementFees', message: 'High management fees may reduce cash flow' });
  }

  // Maintenance reserve warnings
  if (inputs.maintenanceReserves < 1) {
    warnings.push({ field: 'maintenanceReserves', message: 'Low maintenance reserves may lead to unexpected costs' });
  }

  // Inflation consideration
  if (inputs.inflationRate > 5 && inputs.expectedAppreciation < inputs.inflationRate) {
    warnings.push({ field: 'expectedAppreciation', message: 'Appreciation below inflation may result in real losses' });
  }

  // Debt service coverage warning
  if (inputs.leverageRatio > 0 && inputs.expectedRentalIncome > 0) {
    const estimatedNOI = inputs.expectedRentalIncome - inputs.operatingExpenses;
    const estimatedDebtService = (inputs.initialInvestment * inputs.leverageRatio / 100) * (inputs.interestRate / 100);
    const dscr = estimatedNOI / estimatedDebtService;

    if (dscr < 1.1) {
      warnings.push({ field: 'leverageRatio', message: 'Low debt service coverage ratio increases default risk' });
    }
  }

  // Tax benefit optimization
  if (inputs.stepUpInBasis < 10 && inputs.holdingPeriod >= 7) {
    warnings.push({ field: 'stepUpInBasis', message: 'Consider investments that qualify for higher step-up in basis' });
  }

  return warnings;
}