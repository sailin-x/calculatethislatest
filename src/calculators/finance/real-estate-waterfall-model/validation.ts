import { RealEstateWaterfallModelInputs } from './formulas';

export function validateRealEstateWaterfallModelInputs(inputs: RealEstateWaterfallModelInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!inputs.totalEquity) errors.push('Total equity is required');
  if (!inputs.investorEquity) errors.push('Investor equity is required');
  if (!inputs.sponsorEquity) errors.push('Sponsor equity is required');
  if (inputs.totalCashFlow === undefined || inputs.totalCashFlow === null) errors.push('Total cash flow is required');
  if (!inputs.preferredReturn) errors.push('Preferred return is required');
  if (!inputs.holdingPeriod) errors.push('Holding period is required');
  if (inputs.catchUpPercentage === undefined || inputs.catchUpPercentage === null) errors.push('Catch-up percentage is required');
  if (inputs.promotePercentage === undefined || inputs.promotePercentage === null) errors.push('Promote percentage is required');
  if (!inputs.hurdleRate) errors.push('Hurdle rate is required');
  if (!inputs.waterfallType) errors.push('Waterfall type is required');
  if (!inputs.clawbackProvision) errors.push('Clawback provision is required');
  if (inputs.clawbackPercentage === undefined || inputs.clawbackPercentage === null) errors.push('Clawback percentage is required');
  if (inputs.managementFee === undefined || inputs.managementFee === null) errors.push('Management fee is required');
  if (inputs.acquisitionFee === undefined || inputs.acquisitionFee === null) errors.push('Acquisition fee is required');
  if (inputs.dispositionFee === undefined || inputs.dispositionFee === null) errors.push('Disposition fee is required');
  if (inputs.operatingExpenses === undefined || inputs.operatingExpenses === null) errors.push('Operating expenses is required');
  if (inputs.debtService === undefined || inputs.debtService === null) errors.push('Debt service is required');
  if (!inputs.taxRate) errors.push('Tax rate is required');
  if (inputs.inflationRate === undefined || inputs.inflationRate === null) errors.push('Inflation rate is required');
  if (!inputs.exitValue) errors.push('Exit value is required');
  if (inputs.remainingDebt === undefined || inputs.remainingDebt === null) errors.push('Remaining debt is required');

  // Range validations
  if (inputs.totalEquity < 0 || inputs.totalEquity > 1000000000) errors.push('Total equity must be between $0 and $1 billion');
  if (inputs.investorEquity < 0 || inputs.investorEquity > 1000000000) errors.push('Investor equity must be between $0 and $1 billion');
  if (inputs.sponsorEquity < 0 || inputs.sponsorEquity > 1000000000) errors.push('Sponsor equity must be between $0 and $1 billion');
  if (inputs.totalCashFlow < -1000000000 || inputs.totalCashFlow > 1000000000) errors.push('Total cash flow must be between -$1 billion and $1 billion');
  if (inputs.preferredReturn < 0 || inputs.preferredReturn > 25) errors.push('Preferred return must be between 0% and 25%');
  if (inputs.holdingPeriod < 1 || inputs.holdingPeriod > 30) errors.push('Holding period must be between 1 and 30 years');
  if (inputs.catchUpPercentage < 0 || inputs.catchUpPercentage > 100) errors.push('Catch-up percentage must be between 0% and 100%');
  if (inputs.promotePercentage < 0 || inputs.promotePercentage > 50) errors.push('Promote percentage must be between 0% and 50%');
  if (inputs.hurdleRate < 0 || inputs.hurdleRate > 50) errors.push('Hurdle rate must be between 0% and 50%');
  if (inputs.clawbackPercentage < 0 || inputs.clawbackPercentage > 100) errors.push('Clawback percentage must be between 0% and 100%');
  if (inputs.managementFee < 0 || inputs.managementFee > 5) errors.push('Management fee must be between 0% and 5%');
  if (inputs.acquisitionFee < 0 || inputs.acquisitionFee > 5) errors.push('Acquisition fee must be between 0% and 5%');
  if (inputs.dispositionFee < 0 || inputs.dispositionFee > 5) errors.push('Disposition fee must be between 0% and 5%');
  if (inputs.operatingExpenses < 0 || inputs.operatingExpenses > 100000000) errors.push('Operating expenses must be between $0 and $100 million');
  if (inputs.debtService < 0 || inputs.debtService > 100000000) errors.push('Debt service must be between $0 and $100 million');
  if (inputs.taxRate < 0 || inputs.taxRate > 50) errors.push('Tax rate must be between 0% and 50%');
  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) errors.push('Inflation rate must be between -5% and 15%');
  if (inputs.exitValue < 0 || inputs.exitValue > 1000000000) errors.push('Exit value must be between $0 and $1 billion');
  if (inputs.remainingDebt < 0 || inputs.remainingDebt > 1000000000) errors.push('Remaining debt must be between $0 and $1 billion');

  // Business logic validations
  validateBusinessLogic(inputs, errors);

  return errors;
}

function validateBusinessLogic(inputs: RealEstateWaterfallModelInputs, errors: string[]): void {
  // Equity validation
  const calculatedTotalEquity = inputs.investorEquity + inputs.sponsorEquity;
  if (Math.abs(calculatedTotalEquity - inputs.totalEquity) > inputs.totalEquity * 0.01) {
    errors.push('Total equity should equal investor equity plus sponsor equity');
  }

  // Equity split validation
  const investorEquityPercentage = inputs.investorEquity / inputs.totalEquity;
  const sponsorEquityPercentage = inputs.sponsorEquity / inputs.totalEquity;
  
  if (investorEquityPercentage < 0.5) {
    errors.push('Investor equity should typically be at least 50% of total equity');
  }
  
  if (sponsorEquityPercentage < 0.05) {
    errors.push('Sponsor equity should typically be at least 5% of total equity');
  }
  
  if (sponsorEquityPercentage > 0.5) {
    errors.push('Sponsor equity percentage seems unusually high');
  }

  // Return rate validation
  if (inputs.preferredReturn > inputs.hurdleRate) {
    errors.push('Preferred return should typically be less than hurdle rate');
  }

  if (inputs.hurdleRate > 25) {
    errors.push('Hurdle rate seems unusually high');
  }

  // Fee validation
  if (inputs.managementFee > 3) {
    errors.push('Management fee seems unusually high');
  }

  if (inputs.acquisitionFee > 3) {
    errors.push('Acquisition fee seems unusually high');
  }

  if (inputs.dispositionFee > 3) {
    errors.push('Disposition fee seems unusually high');
  }

  // Promote validation
  if (inputs.promotePercentage > 40) {
    errors.push('Promote percentage seems unusually high');
  }

  // Catch-up validation
  if (inputs.catchUpPercentage > 90) {
    errors.push('Catch-up percentage seems unusually high');
  }

  // Clawback validation
  if (inputs.clawbackProvision === 'yes' && inputs.clawbackPercentage === 0) {
    errors.push('Clawback percentage should be greater than 0 if clawback provision is enabled');
  }

  if (inputs.clawbackProvision === 'no' && inputs.clawbackPercentage > 0) {
    errors.push('Clawback percentage should be 0 if clawback provision is disabled');
  }

  // Cash flow validation
  if (inputs.totalCashFlow < 0 && Math.abs(inputs.totalCashFlow) > inputs.totalEquity * 2) {
    errors.push('Negative cash flow seems unusually high');
  }

  // Exit value validation
  if (inputs.exitValue < inputs.totalEquity * 0.5) {
    errors.push('Exit value seems unusually low relative to total equity');
  }

  if (inputs.exitValue > inputs.totalEquity * 5) {
    errors.push('Exit value seems unusually high relative to total equity');
  }

  // Debt validation
  if (inputs.remainingDebt > inputs.exitValue) {
    errors.push('Remaining debt cannot exceed exit value');
  }

  // Waterfall type validation
  const validWaterfallTypes = ['american', 'european', 'hybrid'];
  if (!validWaterfallTypes.includes(inputs.waterfallType)) {
    errors.push('Invalid waterfall type');
  }

  // Clawback provision validation
  const validClawbackOptions = ['yes', 'no'];
  if (!validClawbackOptions.includes(inputs.clawbackProvision)) {
    errors.push('Invalid clawback provision value');
  }

  // Tax rate validation
  if (inputs.taxRate < 10) {
    errors.push('Tax rate seems unusually low');
  }

  if (inputs.taxRate > 40) {
    errors.push('Tax rate seems unusually high');
  }

  // Inflation rate validation
  if (Math.abs(inputs.inflationRate) > 10) {
    errors.push('Inflation rate seems unusually high or low');
  }

  // Holding period validation
  if (inputs.holdingPeriod < 2) {
    errors.push('Holding period seems unusually short for real estate investment');
  }

  if (inputs.holdingPeriod > 20) {
    errors.push('Holding period seems unusually long');
  }
}