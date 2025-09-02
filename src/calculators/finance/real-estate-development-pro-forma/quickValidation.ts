import { RealEstateDevelopmentProFormaInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof RealEstateDevelopmentProFormaInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'projectName':
      return validateProjectName(value);
    case 'projectType':
      return validateProjectType(value);
    case 'projectPhase':
      return validateProjectPhase(value);
    case 'projectLocation':
      return validateProjectLocation(value);
    case 'projectSize':
      return validateProjectSize(value, allInputs);
    case 'landSize':
      return validateLandSize(value);
    case 'zoningType':
      return validateZoningType(value);
    case 'density':
      return validateDensity(value, allInputs);
    case 'buildingHeight':
      return validateBuildingHeight(value, allInputs);
    case 'parkingRatio':
      return validateParkingRatio(value);
    case 'landCost':
      return validateLandCost(value);
    case 'acquisitionCosts':
      return validateAcquisitionCosts(value);
    case 'constructionCost':
      return validateConstructionCost(value);
    case 'softCosts':
      return validateSoftCosts(value);
    case 'contingency':
      return validateContingency(value);
    case 'financingCosts':
      return validateFinancingCosts(value);
    case 'marketingCosts':
      return validateMarketingCosts(value);
    case 'legalCosts':
      return validateLegalCosts(value);
    case 'insuranceCosts':
      return validateInsuranceCosts(value);
    case 'propertyTaxes':
      return validatePropertyTaxes(value);
    case 'utilities':
      return validateUtilities(value);
    case 'maintenanceCosts':
      return validateMaintenanceCosts(value);
    case 'managementFees':
      return validateManagementFees(value);
    case 'vacancyRate':
      return validateVacancyRate(value);
    case 'rentGrowthRate':
      return validateRentGrowthRate(value);
    case 'expenseGrowthRate':
      return validateExpenseGrowthRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'discountRate':
      return validateDiscountRate(value);
    case 'exitCapRate':
      return validateExitCapRate(value);
    case 'holdPeriod':
      return validateHoldPeriod(value);
    case 'constructionStartDate':
      return validateConstructionStartDate(value);
    case 'constructionDuration':
      return validateConstructionDuration(value);
    case 'leaseUpPeriod':
      return validateLeaseUpPeriod(value);
    case 'stabilizationPeriod':
      return validateStabilizationPeriod(value);
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'loanType':
      return validateLoanType(value);
    case 'interestRate':
      return validateInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'loanToCost':
      return validateLoanToCost(value);
    case 'loanToValue':
      return validateLoanToValue(value);
    case 'debtServiceCoverage':
      return validateDebtServiceCoverage(value);
    case 'interestOnlyPeriod':
      return validateInterestOnlyPeriod(value);
    case 'prepaymentPenalty':
      return validatePrepaymentPenalty(value);
    case 'originationFee':
      return validateOriginationFee(value);
    case 'equityContribution':
      return validateEquityContribution(value, allInputs);
    case 'equityReturn':
      return validateEquityReturn(value);
    case 'marketRent':
      return validateMarketRent(value);
    case 'marketVacancy':
      return validateMarketVacancy(value);
    case 'marketCapRate':
      return validateMarketCapRate(value);
    case 'marketAppreciation':
      return validateMarketAppreciation(value);
    case 'constructionRisk':
      return validateConstructionRisk(value);
    case 'marketRisk':
      return validateMarketRisk(value);
    case 'financingRisk':
      return validateFinancingRisk(value);
    case 'regulatoryRisk':
      return validateRegulatoryRisk(value);
    case 'environmentalRisk':
      return validateEnvironmentalRisk(value);
    case 'weatherRisk':
      return validateWeatherRisk(value);
    case 'laborRisk':
      return validateLaborRisk(value);
    case 'materialRisk':
      return validateMaterialRisk(value);
    case 'depreciationMethod':
      return validateDepreciationMethod(value);
    case 'taxRate':
      return validateTaxRate(value);
    case 'exitStrategy':
      return validateExitStrategy(value);
    case 'exitTiming':
      return validateExitTiming(value);
    case 'exitValue':
      return validateExitValue(value);
    case 'exitCosts':
      return validateExitCosts(value);
    default:
      return { isValid: true };
  }
}

function validateProjectName(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Project name is required' };
  }
  if (value.length > 100) {
    return { isValid: false, error: 'Project name cannot exceed 100 characters' };
  }
  return { isValid: true };
}

function validateProjectType(value: any): ValidationResult {
  const validTypes = ['residential', 'commercial', 'mixed-use', 'industrial', 'retail', 'office', 'hotel', 'multifamily', 'single-family', 'land-development'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid project type' };
  }
  return { isValid: true };
}

function validateProjectPhase(value: any): ValidationResult {
  const validPhases = ['concept', 'feasibility', 'design', 'permitting', 'construction', 'marketing', 'stabilization', 'operation'];
  if (!validPhases.includes(value)) {
    return { isValid: false, error: 'Invalid project phase' };
  }
  return { isValid: true };
}

function validateProjectLocation(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Project location is required' };
  }
  if (value.length > 200) {
    return { isValid: false, error: 'Project location cannot exceed 200 characters' };
  }
  return { isValid: true };
}

function validateProjectSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Project size must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Project size cannot exceed 10,000,000 sq ft' };
  }
  
  // Property type specific validation
  if (allInputs?.projectType === 'residential' && value < 1000) {
    return { isValid: false, error: 'Residential projects should be at least 1,000 sq ft' };
  }
  if (allInputs?.projectType === 'commercial' && value < 5000) {
    return { isValid: false, error: 'Commercial projects should be at least 5,000 sq ft' };
  }
  
  return { isValid: true };
}

function validateLandSize(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Land size must be greater than 0' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Land size cannot exceed 10,000 acres' };
  }
  return { isValid: true };
}

function validateZoningType(value: any): ValidationResult {
  if (value && value.length > 100) {
    return { isValid: false, error: 'Zoning type cannot exceed 100 characters' };
  }
  return { isValid: true };
}

function validateDensity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Density must be greater than 0' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Density cannot exceed 1,000 units per acre' };
  }
  
  // Property type specific validation
  if (allInputs?.projectType === 'multifamily' && value < 10) {
    return { isValid: false, error: 'Multifamily projects should have at least 10 units per acre' };
  }
  
  return { isValid: true };
}

function validateBuildingHeight(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Building height must be greater than 0' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Building height cannot exceed 200 stories' };
  }
  
  // Property type specific validation
  if (allInputs?.projectType === 'hotel' && value < 2) {
    return { isValid: false, error: 'Hotel projects should be at least 2 stories' };
  }
  
  return { isValid: true };
}

function validateParkingRatio(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Parking ratio cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Parking ratio cannot exceed 10 spaces per unit/1000 sqft' };
  }
  return { isValid: true };
}

function validateLandCost(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Land cost cannot be negative' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Land cost cannot exceed $1 billion' };
  }
  return { isValid: true };
}

function validateAcquisitionCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Acquisition costs cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Acquisition costs cannot exceed $100 million' };
  }
  return { isValid: true };
}

function validateConstructionCost(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Construction cost must be greater than 0' };
  }
  if (value > 2000) {
    return { isValid: false, error: 'Construction cost cannot exceed $2,000 per sq ft' };
  }
  return { isValid: true };
}

function validateSoftCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Soft costs cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Soft costs cannot exceed 50% of construction cost' };
  }
  return { isValid: true };
}

function validateContingency(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Contingency cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, error: 'Contingency cannot exceed 30% of total cost' };
  }
  return { isValid: true };
}

function validateFinancingCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Financing costs cannot be negative' };
  }
  return { isValid: true };
}

function validateMarketingCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Marketing costs cannot be negative' };
  }
  return { isValid: true };
}

function validateLegalCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Legal costs cannot be negative' };
  }
  return { isValid: true };
}

function validateInsuranceCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Insurance costs cannot be negative' };
  }
  return { isValid: true };
}

function validatePropertyTaxes(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }
  return { isValid: true };
}

function validateUtilities(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Utilities cannot be negative' };
  }
  return { isValid: true };
}

function validateMaintenanceCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Maintenance costs cannot be negative' };
  }
  return { isValid: true };
}

function validateManagementFees(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Management fees cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Management fees cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateVacancyRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Vacancy rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Vacancy rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateRentGrowthRate(value: any): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Rent growth rate cannot be less than -20%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Rent growth rate cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateExpenseGrowthRate(value: any): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Expense growth rate cannot be less than -20%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Expense growth rate cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): ValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Inflation rate cannot be less than -10%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Inflation rate cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Discount rate must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Discount rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateExitCapRate(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Exit cap rate must be greater than 0' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Exit cap rate cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateHoldPeriod(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Hold period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Hold period cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateConstructionStartDate(value: any): ValidationResult {
  if (!value || !isValidDate(value)) {
    return { isValid: false, error: 'Valid construction start date is required' };
  }
  return { isValid: true };
}

function validateConstructionDuration(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Construction duration must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Construction duration cannot exceed 120 months' };
  }
  if (value < 6) {
    return { isValid: false, error: 'Construction duration should be at least 6 months for most projects' };
  }
  return { isValid: true };
}

function validateLeaseUpPeriod(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Lease-up period cannot be negative' };
  }
  if (value > 60) {
    return { isValid: false, error: 'Lease-up period cannot exceed 60 months' };
  }
  return { isValid: true };
}

function validateStabilizationPeriod(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Stabilization period cannot be negative' };
  }
  if (value > 36) {
    return { isValid: false, error: 'Stabilization period cannot exceed 36 months' };
  }
  return { isValid: true };
}

function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Loan amount cannot be negative' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $1 billion' };
  }
  
  // Cross-field validation with total project cost
  if (allInputs) {
    const totalConstructionCost = (allInputs.projectSize || 0) * (allInputs.constructionCost || 0);
    const softCostsAmount = totalConstructionCost * ((allInputs.softCosts || 0) / 100);
    const totalProjectCost = (allInputs.landCost || 0) + (allInputs.acquisitionCosts || 0) + totalConstructionCost + 
                            softCostsAmount + (allInputs.financingCosts || 0) + (allInputs.marketingCosts || 0) + 
                            (allInputs.legalCosts || 0) + (allInputs.insuranceCosts || 0);
    
    if (value > totalProjectCost * ((allInputs.loanToCost || 0) / 100)) {
      return { isValid: false, error: `Loan amount exceeds ${allInputs.loanToCost || 0}% of total project cost` };
    }
  }
  
  return { isValid: true };
}

function validateLoanType(value: any): ValidationResult {
  const validTypes = ['construction', 'permanent', 'bridge', 'mezzanine', 'equity', 'preferred-equity'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid loan type' };
  }
  return { isValid: true };
}

function validateInterestRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Interest rate cannot be negative' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Interest rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateLoanToCost(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Loan to cost ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Loan to cost ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateLoanToValue(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Loan to value ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Loan to value ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateDebtServiceCoverage(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Debt service coverage must be greater than 0' };
  }
  if (value > 5) {
    return { isValid: false, error: 'Debt service coverage cannot exceed 5.0' };
  }
  return { isValid: true };
}

function validateInterestOnlyPeriod(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Interest only period cannot be negative' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Interest only period cannot exceed 120 months' };
  }
  return { isValid: true };
}

function validatePrepaymentPenalty(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Prepayment penalty cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Prepayment penalty cannot exceed 10%' };
  }
  return { isValid: true };
}

function validateOriginationFee(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Origination fee cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, error: 'Origination fee cannot exceed 5%' };
  }
  return { isValid: true };
}

function validateEquityContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Equity contribution cannot be negative' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Equity contribution cannot exceed $1 billion' };
  }
  
  // Cross-field validation with total project cost and loan amount
  if (allInputs) {
    const totalConstructionCost = (allInputs.projectSize || 0) * (allInputs.constructionCost || 0);
    const softCostsAmount = totalConstructionCost * ((allInputs.softCosts || 0) / 100);
    const totalProjectCost = (allInputs.landCost || 0) + (allInputs.acquisitionCosts || 0) + totalConstructionCost + 
                            softCostsAmount + (allInputs.financingCosts || 0) + (allInputs.marketingCosts || 0) + 
                            (allInputs.legalCosts || 0) + (allInputs.insuranceCosts || 0);
    const requiredEquity = totalProjectCost - (allInputs.loanAmount || 0);
    
    if (value < requiredEquity) {
      return { isValid: false, error: `Equity contribution must be at least $${requiredEquity.toLocaleString()}` };
    }
  }
  
  return { isValid: true };
}

function validateEquityReturn(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Equity return cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Equity return cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateMarketRent(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market rent cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market rent cannot exceed $100 per sq ft' };
  }
  if (value < 0.5) {
    return { isValid: false, error: 'Market rent should be at least $0.50 per sq ft' };
  }
  return { isValid: true };
}

function validateMarketVacancy(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market vacancy cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market vacancy cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateMarketCapRate(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Market cap rate must be greater than 0' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Market cap rate cannot exceed 20%' };
  }
  if (value < 3 || value > 12) {
    return { isValid: false, error: 'Market cap rate should typically be between 3% and 12%' };
  }
  return { isValid: true };
}

function validateMarketAppreciation(value: any): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Market appreciation cannot be less than -20%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Market appreciation cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateConstructionRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Construction risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateMarketRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Market risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateFinancingRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Financing risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateRegulatoryRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Regulatory risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateEnvironmentalRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Environmental risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateWeatherRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Weather risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateLaborRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Labor risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateMaterialRisk(value: any): ValidationResult {
  if (value < 1 || value > 10) {
    return { isValid: false, error: 'Material risk must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateDepreciationMethod(value: any): ValidationResult {
  const validMethods = ['straight-line', 'accelerated', 'bonus'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Invalid depreciation method' };
  }
  return { isValid: true };
}

function validateTaxRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateExitStrategy(value: any): ValidationResult {
  const validStrategies = ['sale', 'refinance', 'hold', 'partial-sale', '1031-exchange'];
  if (!validStrategies.includes(value)) {
    return { isValid: false, error: 'Invalid exit strategy' };
  }
  return { isValid: true };
}

function validateExitTiming(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Exit timing must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Exit timing cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateExitValue(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Exit value cannot be negative' };
  }
  return { isValid: true };
}

function validateExitCosts(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Exit costs cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Exit costs cannot exceed 20%' };
  }
  return { isValid: true };
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}