import { RealEstateSyndicationInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof RealEstateSyndicationInputs, value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  switch (field) {
    case 'projectName':
      return validateProjectName(value);
    case 'projectType':
      return validateProjectType(value);
    case 'projectAddress':
      return validateProjectAddress(value);
    case 'acquisitionDate':
      return validateAcquisitionDate(value);
    case 'projectedHoldPeriod':
      return validateProjectedHoldPeriod(value);
    case 'exitStrategy':
      return validateExitStrategy(value);
    case 'totalAcquisitionCost':
      return validateTotalAcquisitionCost(value, allInputs);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'landValue':
      return validateLandValue(value, allInputs);
    case 'buildingValue':
      return validateBuildingValue(value, allInputs);
    case 'squareFootage':
      return validateSquareFootage(value);
    case 'numberOfUnits':
      return validateNumberOfUnits(value);
    case 'occupancyRate':
      return validateOccupancyRate(value);
    case 'currentRentRoll':
      return validateCurrentRentRoll(value, allInputs);
    case 'projectedRentGrowth':
      return validateProjectedRentGrowth(value);
    case 'operatingExpenses':
      return validateOperatingExpenses(value, allInputs);
    case 'operatingExpenseRatio':
      return validateOperatingExpenseRatio(value);
    case 'totalEquityNeeded':
      return validateTotalEquityNeeded(value, allInputs);
    case 'sponsorEquity':
      return validateSponsorEquity(value, allInputs);
    case 'investorEquity':
      return validateInvestorEquity(value, allInputs);
    case 'debtFinancing':
      return validateDebtFinancing(value, allInputs);
    case 'loanType':
      return validateLoanType(value);
    case 'interestRate':
      return validateInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'amortizationPeriod':
      return validateAmortizationPeriod(value);
    case 'loanPoints':
      return validateLoanPoints(value);
    case 'loanFees':
      return validateLoanFees(value);
    case 'syndicationType':
      return validateSyndicationType(value);
    case 'minimumInvestment':
      return validateMinimumInvestment(value, allInputs);
    case 'maximumInvestors':
      return validateMaximumInvestors(value);
    case 'sponsorPromote':
      return validateSponsorPromote(value);
    case 'managementFee':
      return validateManagementFee(value);
    case 'acquisitionFee':
      return validateAcquisitionFee(value);
    case 'dispositionFee':
      return validateDispositionFee(value);
    case 'refinanceFee':
      return validateRefinanceFee(value);
    case 'preferredReturn':
      return validatePreferredReturn(value);
    case 'catchUpPercentage':
      return validateCatchUpPercentage(value);
    case 'promoteTier1':
      return validatePromoteTier1(value);
    case 'promoteTier2':
      return validatePromoteTier2(value);
    case 'promoteTier3':
      return validatePromoteTier3(value);
    case 'tier1Threshold':
      return validateTier1Threshold(value, allInputs);
    case 'tier2Threshold':
      return validateTier2Threshold(value, allInputs);
    case 'tier3Threshold':
      return validateTier3Threshold(value, allInputs);
    case 'grossRentMultiplier':
      return validateGrossRentMultiplier(value);
    case 'capRate':
      return validateCapRate(value);
    case 'exitCapRate':
      return validateExitCapRate(value);
    case 'appreciationRate':
      return validateAppreciationRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'vacancyRate':
      return validateVacancyRate(value);
    case 'collectionLossRate':
      return validateCollectionLossRate(value);
    case 'maintenanceReserve':
      return validateMaintenanceReserve(value);
    case 'capitalExpenditureReserve':
      return validateCapitalExpenditureReserve(value);
    case 'taxRate':
      return validateTaxRate(value, allInputs);
    case 'stateTaxRate':
      return validateStateTaxRate(value, allInputs);
    case 'localTaxRate':
      return validateLocalTaxRate(value, allInputs);
    case 'depreciationMethod':
      return validateDepreciationMethod(value);
    case 'recoveryPeriod':
      return validateRecoveryPeriod(value);
    case 'bonusDepreciationPercentage':
      return validateBonusDepreciationPercentage(value);
    case 'exitYear':
      return validateExitYear(value, allInputs);
    case 'exitValue':
      return validateExitValue(value);
    case 'sellingCosts':
      return validateSellingCosts(value);
    case 'refinanceAmount':
      return validateRefinanceAmount(value);
    case 'refinanceCosts':
      return validateRefinanceCosts(value);
    case 'investorCount':
      return validateInvestorCount(value, allInputs);
    case 'averageInvestment':
      return validateAverageInvestment(value);
    case 'legalFees':
      return validateLegalFees(value);
    case 'accountingFees':
      return validateAccountingFees(value);
    case 'complianceFees':
      return validateComplianceFees(value);
    case 'reportFormat':
      return validateReportFormat(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validateProjectName(value: any): QuickValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Project name is required' };
  }
  if (value.length > 100) {
    return { isValid: false, error: 'Project name must be 100 characters or less' };
  }
  return { isValid: true };
}

function validateProjectType(value: any): QuickValidationResult {
  const validTypes = ['residential', 'commercial', 'mixed-use', 'industrial', 'retail', 'office', 'hotel', 'multifamily', 'single-family', 'land-development'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid project type' };
  }
  return { isValid: true };
}

function validateProjectAddress(value: any): QuickValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Project address is required' };
  }
  return { isValid: true };
}

function validateAcquisitionDate(value: any): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Acquisition date is required' };
  }
  const acquisitionDate = new Date(value);
  const today = new Date();
  if (acquisitionDate > today) {
    return { isValid: false, error: 'Acquisition date cannot be in the future' };
  }
  return { isValid: true };
}

function validateProjectedHoldPeriod(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 30) {
    return { isValid: false, error: 'Projected hold period must be between 1 and 30 years' };
  }
  return { isValid: true };
}

function validateExitStrategy(value: any): QuickValidationResult {
  const validStrategies = ['sale', 'refinance', '1031-exchange', 'hold', 'partial-sale'];
  if (!validStrategies.includes(value)) {
    return { isValid: false, error: 'Invalid exit strategy' };
  }
  return { isValid: true };
}

function validateTotalAcquisitionCost(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Total acquisition cost must be greater than 0' };
  }
  
  // Cross-field validation with equity and debt
  const totalFinancing = allInputs.totalEquityNeeded + allInputs.debtFinancing;
  if (Math.abs(totalFinancing - numValue) > 1) {
    return { isValid: false, error: 'Total equity + Debt financing must equal Total acquisition cost' };
  }
  
  return { isValid: true };
}

function validatePropertyValue(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  
  // Cross-field validation with land and building values
  const totalComponents = allInputs.landValue + allInputs.buildingValue;
  if (totalComponents > numValue * 1.1) {
    return { isValid: false, error: 'Land + Building value cannot exceed property value by more than 10%' };
  }
  
  return { isValid: true };
}

function validateLandValue(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Land value cannot be negative' };
  }
  return { isValid: true };
}

function validateBuildingValue(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Building value cannot be negative' };
  }
  
  // Cross-field validation with property value
  const totalComponents = allInputs.landValue + numValue;
  if (totalComponents > allInputs.propertyValue * 1.1) {
    return { isValid: false, error: 'Land + Building value cannot exceed property value by more than 10%' };
  }
  
  return { isValid: true };
}

function validateSquareFootage(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Square footage must be greater than 0' };
  }
  return { isValid: true };
}

function validateNumberOfUnits(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Number of units must be greater than 0' };
  }
  return { isValid: true };
}

function validateOccupancyRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Occupancy rate must be between 0 and 100%' };
  }
  return { isValid: true };
}

function validateCurrentRentRoll(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Current rent roll must be greater than 0' };
  }
  
  // Cross-field validation with operating expenses
  if (numValue <= allInputs.operatingExpenses) {
    return { isValid: false, error: 'Operating expenses cannot exceed current rent roll' };
  }
  
  return { isValid: true };
}

function validateProjectedRentGrowth(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < -10 || numValue > 20) {
    return { isValid: false, error: 'Projected rent growth must be between -10% and 20%' };
  }
  return { isValid: true };
}

function validateOperatingExpenses(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Operating expenses cannot be negative' };
  }
  
  // Cross-field validation with rent roll
  if (allInputs.currentRentRoll <= numValue) {
    return { isValid: false, error: 'Operating expenses cannot exceed current rent roll' };
  }
  
  return { isValid: true };
}

function validateOperatingExpenseRatio(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Operating expense ratio must be between 0 and 100%' };
  }
  return { isValid: true };
}

function validateTotalEquityNeeded(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Total equity needed must be greater than 0' };
  }
  
  // Cross-field validation with sponsor and investor equity
  const totalEquity = allInputs.sponsorEquity + allInputs.investorEquity;
  if (Math.abs(totalEquity - numValue) > 1) {
    return { isValid: false, error: 'Sponsor equity + Investor equity must equal Total equity needed' };
  }
  
  return { isValid: true };
}

function validateSponsorEquity(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Sponsor equity cannot be negative' };
  }
  
  // Cross-field validation with total equity
  const totalEquity = numValue + allInputs.investorEquity;
  if (Math.abs(totalEquity - allInputs.totalEquityNeeded) > 1) {
    return { isValid: false, error: 'Sponsor equity + Investor equity must equal Total equity needed' };
  }
  
  return { isValid: true };
}

function validateInvestorEquity(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Investor equity cannot be negative' };
  }
  
  // Cross-field validation with total equity
  const totalEquity = allInputs.sponsorEquity + numValue;
  if (Math.abs(totalEquity - allInputs.totalEquityNeeded) > 1) {
    return { isValid: false, error: 'Sponsor equity + Investor equity must equal Total equity needed' };
  }
  
  return { isValid: true };
}

function validateDebtFinancing(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Debt financing cannot be negative' };
  }
  
  // Cross-field validation with total acquisition cost
  const totalFinancing = allInputs.totalEquityNeeded + numValue;
  if (Math.abs(totalFinancing - allInputs.totalAcquisitionCost) > 1) {
    return { isValid: false, error: 'Total equity + Debt financing must equal Total acquisition cost' };
  }
  
  return { isValid: true };
}

function validateLoanType(value: any): QuickValidationResult {
  const validTypes = ['conventional', 'fha', 'usda', 'va', 'hard-money', 'bridge', 'construction', 'permanent'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid loan type' };
  }
  return { isValid: true };
}

function validateInterestRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 25) {
    return { isValid: false, error: 'Interest rate must be between 0% and 25%' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, error: 'Loan term must be between 1 and 50 years' };
  }
  return { isValid: true };
}

function validateAmortizationPeriod(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, error: 'Amortization period must be between 1 and 50 years' };
  }
  return { isValid: true };
}

function validateLoanPoints(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Loan points must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validateLoanFees(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Loan fees cannot be negative' };
  }
  return { isValid: true };
}

function validateSyndicationType(value: any): QuickValidationResult {
  const validTypes = ['506(b)', '506(c)', 'crowdfunding', 'private-placement', 'reit', 'direct-investment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid syndication type' };
  }
  return { isValid: true };
}

function validateMinimumInvestment(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Minimum investment must be greater than 0' };
  }
  
  // Cross-field validation with investor equity
  if (numValue > allInputs.investorEquity) {
    return { isValid: false, error: 'Minimum investment cannot exceed total investor equity' };
  }
  
  return { isValid: true };
}

function validateMaximumInvestors(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 2000) {
    return { isValid: false, error: 'Maximum investors must be between 1 and 2000' };
  }
  return { isValid: true };
}

function validateSponsorPromote(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Sponsor promote must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateManagementFee(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 20) {
    return { isValid: false, error: 'Management fee must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateAcquisitionFee(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Acquisition fee must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validateDispositionFee(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Disposition fee must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validateRefinanceFee(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 5) {
    return { isValid: false, error: 'Refinance fee must be between 0% and 5%' };
  }
  return { isValid: true };
}

function validatePreferredReturn(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 20) {
    return { isValid: false, error: 'Preferred return must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateCatchUpPercentage(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Catch-up percentage must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validatePromoteTier1(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'First promote tier must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validatePromoteTier2(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Second promote tier must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validatePromoteTier3(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Third promote tier must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateTier1Threshold(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 30) {
    return { isValid: false, error: 'First tier threshold must be between 0% and 30%' };
  }
  
  // Cross-field validation with tier2 threshold
  if (numValue >= allInputs.tier2Threshold) {
    return { isValid: false, error: 'First tier threshold must be lower than second tier threshold' };
  }
  
  return { isValid: true };
}

function validateTier2Threshold(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 30) {
    return { isValid: false, error: 'Second tier threshold must be between 0% and 30%' };
  }
  
  // Cross-field validation with tier1 and tier3 thresholds
  if (numValue <= allInputs.tier1Threshold) {
    return { isValid: false, error: 'Second tier threshold must be higher than first tier threshold' };
  }
  if (numValue >= allInputs.tier3Threshold) {
    return { isValid: false, error: 'Second tier threshold must be lower than third tier threshold' };
  }
  
  return { isValid: true };
}

function validateTier3Threshold(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 30) {
    return { isValid: false, error: 'Third tier threshold must be between 0% and 30%' };
  }
  
  // Cross-field validation with tier2 threshold
  if (numValue <= allInputs.tier2Threshold) {
    return { isValid: false, error: 'Third tier threshold must be higher than second tier threshold' };
  }
  
  return { isValid: true };
}

function validateGrossRentMultiplier(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, error: 'Gross rent multiplier must be between 1 and 50' };
  }
  return { isValid: true };
}

function validateCapRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 20) {
    return { isValid: false, error: 'Cap rate must be between 1% and 20%' };
  }
  return { isValid: true };
}

function validateExitCapRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 20) {
    return { isValid: false, error: 'Exit cap rate must be between 1% and 20%' };
  }
  return { isValid: true };
}

function validateAppreciationRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < -10 || numValue > 20) {
    return { isValid: false, error: 'Appreciation rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < -5 || numValue > 15) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }
  return { isValid: true };
}

function validateVacancyRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Vacancy rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateCollectionLossRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 20) {
    return { isValid: false, error: 'Collection loss rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateMaintenanceReserve(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 1000) {
    return { isValid: false, error: 'Maintenance reserve must be between $0 and $1,000 per unit' };
  }
  return { isValid: true };
}

function validateCapitalExpenditureReserve(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 20) {
    return { isValid: false, error: 'Capital expenditure reserve must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateTaxRate(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Tax rate must be between 0% and 50%' };
  }
  
  // Cross-field validation with combined tax rate
  const combinedTaxRate = numValue + allInputs.stateTaxRate + allInputs.localTaxRate;
  if (combinedTaxRate > 60) {
    return { isValid: false, error: 'Combined tax rate cannot exceed 60%' };
  }
  
  return { isValid: true };
}

function validateStateTaxRate(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 15) {
    return { isValid: false, error: 'State tax rate must be between 0% and 15%' };
  }
  
  // Cross-field validation with combined tax rate
  const combinedTaxRate = allInputs.taxRate + numValue + allInputs.localTaxRate;
  if (combinedTaxRate > 60) {
    return { isValid: false, error: 'Combined tax rate cannot exceed 60%' };
  }
  
  return { isValid: true };
}

function validateLocalTaxRate(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Local tax rate must be between 0% and 10%' };
  }
  
  // Cross-field validation with combined tax rate
  const combinedTaxRate = allInputs.taxRate + allInputs.stateTaxRate + numValue;
  if (combinedTaxRate > 60) {
    return { isValid: false, error: 'Combined tax rate cannot exceed 60%' };
  }
  
  return { isValid: true };
}

function validateDepreciationMethod(value: any): QuickValidationResult {
  const validMethods = ['straight-line', 'declining-balance', 'sum-of-years-digits', 'units-of-production'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Invalid depreciation method' };
  }
  return { isValid: true };
}

function validateRecoveryPeriod(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, error: 'Recovery period must be between 1 and 50 years' };
  }
  return { isValid: true };
}

function validateBonusDepreciationPercentage(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Bonus depreciation percentage must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validateExitYear(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 30) {
    return { isValid: false, error: 'Exit year must be between 1 and 30' };
  }
  
  // Cross-field validation with projected hold period
  if (numValue > allInputs.projectedHoldPeriod) {
    return { isValid: false, error: 'Exit year cannot exceed projected hold period' };
  }
  
  return { isValid: true };
}

function validateExitValue(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Exit value must be greater than 0' };
  }
  return { isValid: true };
}

function validateSellingCosts(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 20) {
    return { isValid: false, error: 'Selling costs must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateRefinanceAmount(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Refinance amount cannot be negative' };
  }
  return { isValid: true };
}

function validateRefinanceCosts(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Refinance costs must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validateInvestorCount(value: any, allInputs: RealEstateSyndicationInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 2000) {
    return { isValid: false, error: 'Investor count must be between 1 and 2000' };
  }
  
  // Cross-field validation with maximum investors
  if (numValue > allInputs.maximumInvestors) {
    return { isValid: false, error: 'Investor count cannot exceed maximum investors' };
  }
  
  return { isValid: true };
}

function validateAverageInvestment(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Average investment must be greater than 0' };
  }
  return { isValid: true };
}

function validateLegalFees(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Legal fees cannot be negative' };
  }
  return { isValid: true };
}

function validateAccountingFees(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Accounting fees cannot be negative' };
  }
  return { isValid: true };
}

function validateComplianceFees(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Compliance fees cannot be negative' };
  }
  return { isValid: true };
}

function validateReportFormat(value: any): QuickValidationResult {
  const validFormats = ['detailed', 'summary', 'executive'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid report format' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): QuickValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): QuickValidationResult {
  const validFormats = ['currency', 'percentage', 'decimal'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}