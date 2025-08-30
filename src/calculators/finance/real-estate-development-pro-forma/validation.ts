import { RealEstateDevelopmentProFormaInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRealEstateDevelopmentProFormaInputs(inputs: RealEstateDevelopmentProFormaInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Project Information validations
  if (!inputs.projectName || inputs.projectName.trim().length === 0) {
    errors.projectName = 'Project name is required';
  }

  if (!inputs.projectType) {
    errors.projectType = 'Project type is required';
  }

  if (!inputs.projectPhase) {
    errors.projectPhase = 'Project phase is required';
  }

  if (!inputs.projectLocation || inputs.projectLocation.trim().length === 0) {
    errors.projectLocation = 'Project location is required';
  }

  if (inputs.projectSize <= 0) {
    errors.projectSize = 'Project size must be greater than 0';
  }

  if (inputs.projectSize > 10000000) {
    errors.projectSize = 'Project size cannot exceed 10,000,000 sq ft';
  }

  if (inputs.landSize <= 0) {
    errors.landSize = 'Land size must be greater than 0';
  }

  if (inputs.landSize > 10000) {
    errors.landSize = 'Land size cannot exceed 10,000 acres';
  }

  if (inputs.density <= 0) {
    errors.density = 'Density must be greater than 0';
  }

  if (inputs.density > 1000) {
    errors.density = 'Density cannot exceed 1,000 units per acre';
  }

  if (inputs.buildingHeight <= 0) {
    errors.buildingHeight = 'Building height must be greater than 0';
  }

  if (inputs.buildingHeight > 200) {
    errors.buildingHeight = 'Building height cannot exceed 200 stories';
  }

  if (inputs.parkingRatio < 0) {
    errors.parkingRatio = 'Parking ratio cannot be negative';
  }

  if (inputs.parkingRatio > 10) {
    errors.parkingRatio = 'Parking ratio cannot exceed 10 spaces per unit/1000 sqft';
  }

  // Financial Assumptions validations
  if (inputs.landCost < 0) {
    errors.landCost = 'Land cost cannot be negative';
  }

  if (inputs.landCost > 1000000000) {
    errors.landCost = 'Land cost cannot exceed $1 billion';
  }

  if (inputs.acquisitionCosts < 0) {
    errors.acquisitionCosts = 'Acquisition costs cannot be negative';
  }

  if (inputs.acquisitionCosts > 100000000) {
    errors.acquisitionCosts = 'Acquisition costs cannot exceed $100 million';
  }

  if (inputs.constructionCost <= 0) {
    errors.constructionCost = 'Construction cost must be greater than 0';
  }

  if (inputs.constructionCost > 2000) {
    errors.constructionCost = 'Construction cost cannot exceed $2,000 per sq ft';
  }

  if (inputs.softCosts < 0) {
    errors.softCosts = 'Soft costs cannot be negative';
  }

  if (inputs.softCosts > 50) {
    errors.softCosts = 'Soft costs cannot exceed 50% of construction cost';
  }

  if (inputs.contingency < 0) {
    errors.contingency = 'Contingency cannot be negative';
  }

  if (inputs.contingency > 30) {
    errors.contingency = 'Contingency cannot exceed 30% of total cost';
  }

  if (inputs.financingCosts < 0) {
    errors.financingCosts = 'Financing costs cannot be negative';
  }

  if (inputs.marketingCosts < 0) {
    errors.marketingCosts = 'Marketing costs cannot be negative';
  }

  if (inputs.legalCosts < 0) {
    errors.legalCosts = 'Legal costs cannot be negative';
  }

  if (inputs.insuranceCosts < 0) {
    errors.insuranceCosts = 'Insurance costs cannot be negative';
  }

  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  }

  if (inputs.utilities < 0) {
    errors.utilities = 'Utilities cannot be negative';
  }

  if (inputs.maintenanceCosts < 0) {
    errors.maintenanceCosts = 'Maintenance costs cannot be negative';
  }

  if (inputs.managementFees < 0) {
    errors.managementFees = 'Management fees cannot be negative';
  }

  if (inputs.managementFees > 20) {
    errors.managementFees = 'Management fees cannot exceed 20%';
  }

  if (inputs.vacancyRate < 0) {
    errors.vacancyRate = 'Vacancy rate cannot be negative';
  }

  if (inputs.vacancyRate > 50) {
    errors.vacancyRate = 'Vacancy rate cannot exceed 50%';
  }

  if (inputs.rentGrowthRate < -20) {
    errors.rentGrowthRate = 'Rent growth rate cannot be less than -20%';
  }

  if (inputs.rentGrowthRate > 20) {
    errors.rentGrowthRate = 'Rent growth rate cannot exceed 20%';
  }

  if (inputs.expenseGrowthRate < -20) {
    errors.expenseGrowthRate = 'Expense growth rate cannot be less than -20%';
  }

  if (inputs.expenseGrowthRate > 20) {
    errors.expenseGrowthRate = 'Expense growth rate cannot exceed 20%';
  }

  if (inputs.inflationRate < -10) {
    errors.inflationRate = 'Inflation rate cannot be less than -10%';
  }

  if (inputs.inflationRate > 20) {
    errors.inflationRate = 'Inflation rate cannot exceed 20%';
  }

  if (inputs.discountRate <= 0) {
    errors.discountRate = 'Discount rate must be greater than 0';
  }

  if (inputs.discountRate > 50) {
    errors.discountRate = 'Discount rate cannot exceed 50%';
  }

  if (inputs.exitCapRate <= 0) {
    errors.exitCapRate = 'Exit cap rate must be greater than 0';
  }

  if (inputs.exitCapRate > 20) {
    errors.exitCapRate = 'Exit cap rate cannot exceed 20%';
  }

  if (inputs.holdPeriod <= 0) {
    errors.holdPeriod = 'Hold period must be greater than 0';
  }

  if (inputs.holdPeriod > 50) {
    errors.holdPeriod = 'Hold period cannot exceed 50 years';
  }

  // Construction Timeline validations
  if (!inputs.constructionStartDate || !isValidDate(inputs.constructionStartDate)) {
    errors.constructionStartDate = 'Valid construction start date is required';
  }

  if (inputs.constructionDuration <= 0) {
    errors.constructionDuration = 'Construction duration must be greater than 0';
  }

  if (inputs.constructionDuration > 120) {
    errors.constructionDuration = 'Construction duration cannot exceed 120 months';
  }

  if (inputs.leaseUpPeriod < 0) {
    errors.leaseUpPeriod = 'Lease-up period cannot be negative';
  }

  if (inputs.leaseUpPeriod > 60) {
    errors.leaseUpPeriod = 'Lease-up period cannot exceed 60 months';
  }

  if (inputs.stabilizationPeriod < 0) {
    errors.stabilizationPeriod = 'Stabilization period cannot be negative';
  }

  if (inputs.stabilizationPeriod > 36) {
    errors.stabilizationPeriod = 'Stabilization period cannot exceed 36 months';
  }

  // Financing validations
  if (inputs.loanAmount < 0) {
    errors.loanAmount = 'Loan amount cannot be negative';
  }

  if (inputs.loanAmount > 1000000000) {
    errors.loanAmount = 'Loan amount cannot exceed $1 billion';
  }

  if (!inputs.loanType) {
    errors.loanType = 'Loan type is required';
  }

  if (inputs.interestRate < 0) {
    errors.interestRate = 'Interest rate cannot be negative';
  }

  if (inputs.interestRate > 25) {
    errors.interestRate = 'Interest rate cannot exceed 25%';
  }

  if (inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  }

  if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }

  if (inputs.loanToCost < 0) {
    errors.loanToCost = 'Loan to cost ratio cannot be negative';
  }

  if (inputs.loanToCost > 100) {
    errors.loanToCost = 'Loan to cost ratio cannot exceed 100%';
  }

  if (inputs.loanToValue < 0) {
    errors.loanToValue = 'Loan to value ratio cannot be negative';
  }

  if (inputs.loanToValue > 100) {
    errors.loanToValue = 'Loan to value ratio cannot exceed 100%';
  }

  if (inputs.debtServiceCoverage <= 0) {
    errors.debtServiceCoverage = 'Debt service coverage must be greater than 0';
  }

  if (inputs.debtServiceCoverage > 5) {
    errors.debtServiceCoverage = 'Debt service coverage cannot exceed 5.0';
  }

  if (inputs.interestOnlyPeriod < 0) {
    errors.interestOnlyPeriod = 'Interest only period cannot be negative';
  }

  if (inputs.interestOnlyPeriod > 120) {
    errors.interestOnlyPeriod = 'Interest only period cannot exceed 120 months';
  }

  if (inputs.prepaymentPenalty < 0) {
    errors.prepaymentPenalty = 'Prepayment penalty cannot be negative';
  }

  if (inputs.prepaymentPenalty > 10) {
    errors.prepaymentPenalty = 'Prepayment penalty cannot exceed 10%';
  }

  if (inputs.originationFee < 0) {
    errors.originationFee = 'Origination fee cannot be negative';
  }

  if (inputs.originationFee > 5) {
    errors.originationFee = 'Origination fee cannot exceed 5%';
  }

  if (inputs.equityContribution < 0) {
    errors.equityContribution = 'Equity contribution cannot be negative';
  }

  if (inputs.equityContribution > 1000000000) {
    errors.equityContribution = 'Equity contribution cannot exceed $1 billion';
  }

  if (inputs.equityReturn < 0) {
    errors.equityReturn = 'Equity return cannot be negative';
  }

  if (inputs.equityReturn > 100) {
    errors.equityReturn = 'Equity return cannot exceed 100%';
  }

  // Market Analysis validations
  if (inputs.marketRent < 0) {
    errors.marketRent = 'Market rent cannot be negative';
  }

  if (inputs.marketRent > 100) {
    errors.marketRent = 'Market rent cannot exceed $100 per sq ft';
  }

  if (inputs.marketVacancy < 0) {
    errors.marketVacancy = 'Market vacancy cannot be negative';
  }

  if (inputs.marketVacancy > 100) {
    errors.marketVacancy = 'Market vacancy cannot exceed 100%';
  }

  if (inputs.marketCapRate <= 0) {
    errors.marketCapRate = 'Market cap rate must be greater than 0';
  }

  if (inputs.marketCapRate > 20) {
    errors.marketCapRate = 'Market cap rate cannot exceed 20%';
  }

  if (inputs.marketAppreciation < -20) {
    errors.marketAppreciation = 'Market appreciation cannot be less than -20%';
  }

  if (inputs.marketAppreciation > 20) {
    errors.marketAppreciation = 'Market appreciation cannot exceed 20%';
  }

  // Risk Factors validations
  if (inputs.constructionRisk < 1 || inputs.constructionRisk > 10) {
    errors.constructionRisk = 'Construction risk must be between 1 and 10';
  }

  if (inputs.marketRisk < 1 || inputs.marketRisk > 10) {
    errors.marketRisk = 'Market risk must be between 1 and 10';
  }

  if (inputs.financingRisk < 1 || inputs.financingRisk > 10) {
    errors.financingRisk = 'Financing risk must be between 1 and 10';
  }

  if (inputs.regulatoryRisk < 1 || inputs.regulatoryRisk > 10) {
    errors.regulatoryRisk = 'Regulatory risk must be between 1 and 10';
  }

  if (inputs.environmentalRisk < 1 || inputs.environmentalRisk > 10) {
    errors.environmentalRisk = 'Environmental risk must be between 1 and 10';
  }

  if (inputs.weatherRisk < 1 || inputs.weatherRisk > 10) {
    errors.weatherRisk = 'Weather risk must be between 1 and 10';
  }

  if (inputs.laborRisk < 1 || inputs.laborRisk > 10) {
    errors.laborRisk = 'Labor risk must be between 1 and 10';
  }

  if (inputs.materialRisk < 1 || inputs.materialRisk > 10) {
    errors.materialRisk = 'Material risk must be between 1 and 10';
  }

  // Tax Considerations validations
  if (!inputs.depreciationMethod) {
    errors.depreciationMethod = 'Depreciation method is required';
  }

  if (inputs.taxRate < 0) {
    errors.taxRate = 'Tax rate cannot be negative';
  }

  if (inputs.taxRate > 100) {
    errors.taxRate = 'Tax rate cannot exceed 100%';
  }

  // Exit Strategy validations
  if (!inputs.exitStrategy) {
    errors.exitStrategy = 'Exit strategy is required';
  }

  if (inputs.exitTiming <= 0) {
    errors.exitTiming = 'Exit timing must be greater than 0';
  }

  if (inputs.exitTiming > 50) {
    errors.exitTiming = 'Exit timing cannot exceed 50 years';
  }

  if (inputs.exitValue < 0) {
    errors.exitValue = 'Exit value cannot be negative';
  }

  if (inputs.exitCosts < 0) {
    errors.exitCosts = 'Exit costs cannot be negative';
  }

  if (inputs.exitCosts > 20) {
    errors.exitCosts = 'Exit costs cannot exceed 20%';
  }

  // Cross-field validations
  const totalConstructionCost = inputs.projectSize * inputs.constructionCost;
  const softCostsAmount = totalConstructionCost * (inputs.softCosts / 100);
  const totalProjectCost = inputs.landCost + inputs.acquisitionCosts + totalConstructionCost + 
                          softCostsAmount + inputs.financingCosts + inputs.marketingCosts + 
                          inputs.legalCosts + inputs.insuranceCosts;

  if (inputs.loanAmount > totalProjectCost * (inputs.loanToCost / 100)) {
    errors.loanAmount = `Loan amount exceeds ${inputs.loanToCost}% of total project cost`;
  }

  const requiredEquity = totalProjectCost - inputs.loanAmount;
  if (inputs.equityContribution < requiredEquity) {
    errors.equityContribution = `Equity contribution must be at least $${requiredEquity.toLocaleString()}`;
  }

  if (inputs.constructionDuration < 6) {
    errors.constructionDuration = 'Construction duration should be at least 6 months for most projects';
  }

  if (inputs.marketRent < 0.5) {
    errors.marketRent = 'Market rent should be at least $0.50 per sq ft';
  }

  if (inputs.marketCapRate < 3 || inputs.marketCapRate > 12) {
    errors.marketCapRate = 'Market cap rate should typically be between 3% and 12%';
  }

  // Property type specific validations
  if (inputs.projectType === 'residential' && inputs.projectSize < 1000) {
    errors.projectSize = 'Residential projects should be at least 1,000 sq ft';
  }

  if (inputs.projectType === 'commercial' && inputs.projectSize < 5000) {
    errors.projectSize = 'Commercial projects should be at least 5,000 sq ft';
  }

  if (inputs.projectType === 'multifamily' && inputs.density < 10) {
    errors.density = 'Multifamily projects should have at least 10 units per acre';
  }

  if (inputs.projectType === 'hotel' && inputs.buildingHeight < 2) {
    errors.buildingHeight = 'Hotel projects should be at least 2 stories';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRealEstateDevelopmentProFormaOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!outputs || typeof outputs !== 'object') {
    errors.general = 'Invalid output format';
    return { isValid: false, errors };
  }

  if (!outputs.metrics || typeof outputs.metrics !== 'object') {
    errors.metrics = 'Metrics are required';
  }

  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis is required';
  }

  if (!Array.isArray(outputs.cashFlowProjections)) {
    errors.cashFlowProjections = 'Cash flow projections must be an array';
  }

  if (!Array.isArray(outputs.sensitivityResults)) {
    errors.sensitivityResults = 'Sensitivity results must be an array';
  }

  if (!Array.isArray(outputs.stressTestResults)) {
    errors.stressTestResults = 'Stress test results must be an array';
  }

  if (!outputs.breakEvenAnalysis || typeof outputs.breakEvenAnalysis !== 'object') {
    errors.breakEvenAnalysis = 'Break-even analysis is required';
  }

  if (!outputs.investmentSummary || typeof outputs.investmentSummary !== 'object') {
    errors.investmentSummary = 'Investment summary is required';
  }

  if (!outputs.timelineSummary || typeof outputs.timelineSummary !== 'object') {
    errors.timelineSummary = 'Timeline summary is required';
  }

  if (!outputs.riskAssessment || typeof outputs.riskAssessment !== 'object') {
    errors.riskAssessment = 'Risk assessment is required';
  }

  if (!Array.isArray(outputs.recommendations)) {
    errors.recommendations = 'Recommendations must be an array';
  }

  if (!outputs.keyMetrics || typeof outputs.keyMetrics !== 'object') {
    errors.keyMetrics = 'Key metrics are required';
  }

  if (!outputs.assumptions || typeof outputs.assumptions !== 'object') {
    errors.assumptions = 'Assumptions are required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}