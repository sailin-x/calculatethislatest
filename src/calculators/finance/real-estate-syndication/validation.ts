import { RealEstateSyndicationInputs } from './formulas';

export function validateRealEstateSyndicationInputs(inputs: RealEstateSyndicationInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!inputs.propertyType) errors.push('Property type is required');
  if (!inputs.totalProjectCost) errors.push('Total project cost is required');
  if (!inputs.sponsorEquity) errors.push('Sponsor equity is required');
  if (!inputs.investorEquity) errors.push('Investor equity is required');
  if (!inputs.debtAmount) errors.push('Debt amount is required');
  if (!inputs.debtRate) errors.push('Debt rate is required');
  if (!inputs.debtTerm) errors.push('Debt term is required');
  if (!inputs.holdingPeriod) errors.push('Holding period is required');
  if (inputs.annualNOI === undefined || inputs.annualNOI === null) errors.push('Annual NOI is required');
  if (inputs.noiGrowthRate === undefined || inputs.noiGrowthRate === null) errors.push('NOI growth rate is required');
  if (!inputs.exitCapRate) errors.push('Exit cap rate is required');
  if (inputs.sponsorPromote === undefined || inputs.sponsorPromote === null) errors.push('Sponsor promote is required');
  if (inputs.investorPreferredReturn === undefined || inputs.investorPreferredReturn === null) errors.push('Investor preferred return is required');
  if (inputs.sponsorManagementFee === undefined || inputs.sponsorManagementFee === null) errors.push('Sponsor management fee is required');
  if (inputs.acquisitionFee === undefined || inputs.acquisitionFee === null) errors.push('Acquisition fee is required');
  if (inputs.dispositionFee === undefined || inputs.dispositionFee === null) errors.push('Disposition fee is required');
  if (inputs.operatingExpenses === undefined || inputs.operatingExpenses === null) errors.push('Operating expenses is required');
  if (!inputs.taxRate) errors.push('Tax rate is required');

  // Range validations
  if (inputs.totalProjectCost < 0 || inputs.totalProjectCost > 1000000000) errors.push('Total project cost must be between $0 and $1 billion');
  if (inputs.sponsorEquity < 0 || inputs.sponsorEquity > 1000000000) errors.push('Sponsor equity must be between $0 and $1 billion');
  if (inputs.investorEquity < 0 || inputs.investorEquity > 1000000000) errors.push('Investor equity must be between $0 and $1 billion');
  if (inputs.debtAmount < 0 || inputs.debtAmount > 1000000000) errors.push('Debt amount must be between $0 and $1 billion');
  if (inputs.debtRate < 0 || inputs.debtRate > 20) errors.push('Debt rate must be between 0% and 20%');
  if (inputs.debtTerm < 1 || inputs.debtTerm > 30) errors.push('Debt term must be between 1 and 30 years');
  if (inputs.holdingPeriod < 1 || inputs.holdingPeriod > 20) errors.push('Holding period must be between 1 and 20 years');
  if (inputs.annualNOI < 0 || inputs.annualNOI > 100000000) errors.push('Annual NOI must be between $0 and $100 million');
  if (inputs.noiGrowthRate < -10 || inputs.noiGrowthRate > 20) errors.push('NOI growth rate must be between -10% and 20%');
  if (inputs.exitCapRate < 1 || inputs.exitCapRate > 15) errors.push('Exit cap rate must be between 1% and 15%');
  if (inputs.sponsorPromote < 0 || inputs.sponsorPromote > 50) errors.push('Sponsor promote must be between 0% and 50%');
  if (inputs.investorPreferredReturn < 0 || inputs.investorPreferredReturn > 20) errors.push('Investor preferred return must be between 0% and 20%');
  if (inputs.sponsorManagementFee < 0 || inputs.sponsorManagementFee > 5) errors.push('Sponsor management fee must be between 0% and 5%');
  if (inputs.acquisitionFee < 0 || inputs.acquisitionFee > 5) errors.push('Acquisition fee must be between 0% and 5%');
  if (inputs.dispositionFee < 0 || inputs.dispositionFee > 5) errors.push('Disposition fee must be between 0% and 5%');
  if (inputs.operatingExpenses < 0 || inputs.operatingExpenses > 100) errors.push('Operating expenses must be between 0% and 100%');
  if (inputs.taxRate < 0 || inputs.taxRate > 50) errors.push('Tax rate must be between 0% and 50%');

  // Business logic validations
  validateBusinessLogic(inputs, errors);

  return errors;
}

function validateBusinessLogic(inputs: RealEstateSyndicationInputs, errors: string[]): void {
  // Capital structure validation
  const totalEquity = inputs.sponsorEquity + inputs.investorEquity;
  const totalCapital = totalEquity + inputs.debtAmount;
  
  if (Math.abs(totalCapital - inputs.totalProjectCost) > inputs.totalProjectCost * 0.05) {
    errors.push('Total capital (equity + debt) should approximately equal total project cost');
  }

  // Leverage validation
  const leverageRatio = inputs.debtAmount / inputs.totalProjectCost;
  if (leverageRatio > 0.85) {
    errors.push('Leverage ratio should typically be less than 85%');
  }

  if (leverageRatio < 0.1) {
    errors.push('Leverage ratio seems unusually low');
  }

  // Equity split validation
  const sponsorEquityPercentage = inputs.sponsorEquity / totalEquity;
  if (sponsorEquityPercentage < 0.05) {
    errors.push('Sponsor equity should typically be at least 5% of total equity');
  }

  if (sponsorEquityPercentage > 0.5) {
    errors.push('Sponsor equity percentage seems unusually high');
  }

  // Fee validation
  if (inputs.sponsorManagementFee > 3) {
    errors.push('Management fee seems unusually high');
  }

  if (inputs.acquisitionFee > 3) {
    errors.push('Acquisition fee seems unusually high');
  }

  if (inputs.dispositionFee > 3) {
    errors.push('Disposition fee seems unusually high');
  }

  // Return validation
  if (inputs.investorPreferredReturn > 15) {
    errors.push('Preferred return rate seems unusually high');
  }

  if (inputs.sponsorPromote > 40) {
    errors.push('Sponsor promote percentage seems unusually high');
  }

  // Property type specific validations
  if (inputs.propertyType === 'land' && inputs.annualNOI > 0) {
    errors.push('Land development projects typically have zero NOI during development');
  }

  if (inputs.propertyType === 'hotel' && inputs.operatingExpenses < 50) {
    errors.push('Hotel properties typically have higher operating expenses');
  }

  // Timeline validation
  if (inputs.holdingPeriod > inputs.debtTerm) {
    errors.push('Holding period should typically not exceed debt term');
  }

  if (inputs.holdingPeriod < 2) {
    errors.push('Holding period seems unusually short for syndication');
  }

  // NOI validation
  if (inputs.annualNOI > 0) {
    const initialCapRate = inputs.annualNOI / inputs.totalProjectCost;
    if (initialCapRate < 0.02) {
      errors.push('Initial cap rate seems unusually low');
    }
    
    if (initialCapRate > 0.15) {
      errors.push('Initial cap rate seems unusually high');
    }
  }

  // Growth rate validation
  if (Math.abs(inputs.noiGrowthRate) > 15) {
    errors.push('NOI growth rate seems unusually high or low');
  }

  // Exit cap rate validation
  if (inputs.exitCapRate < 0.03) {
    errors.push('Exit cap rate seems unusually low');
  }

  if (inputs.exitCapRate > 0.12) {
    errors.push('Exit cap rate seems unusually high');
  }

  // Tax rate validation
  if (inputs.taxRate < 10) {
    errors.push('Tax rate seems unusually low');
  }

  if (inputs.taxRate > 40) {
    errors.push('Tax rate seems unusually high');
  }

  // Debt validation
  if (inputs.debtRate < 3) {
    errors.push('Debt rate seems unusually low');
  }

  if (inputs.debtRate > 15) {
    errors.push('Debt rate seems unusually high');
  }

  // Property type validation
  const validTypes = ['multifamily', 'office', 'retail', 'industrial', 'hotel', 'mixed_use', 'land', 'self_storage'];
  if (!validTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }
}