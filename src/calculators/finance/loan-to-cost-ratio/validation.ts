import { LoanToCostRatioInputs, ValidationResult } from './types';

export function validateLoanToCostRatioInputs(inputs: LoanToCostRatioInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Project Information Validation
  if (!inputs.projectInformation.projectName.trim()) {
    errors.push('Project name is required');
  }

  if (inputs.projectInformation.totalProjectCost <= 0) {
    errors.push('Total project cost must be greater than 0');
  }

  if (inputs.projectInformation.landCost < 0) {
    errors.push('Land cost cannot be negative');
  }

  if (inputs.projectInformation.constructionCost <= 0) {
    errors.push('Construction cost must be greater than 0');
  }

  if (inputs.projectInformation.softCosts < 0) {
    errors.push('Soft costs cannot be negative');
  }

  if (inputs.projectInformation.contingency < 0) {
    errors.push('Contingency cannot be negative');
  }

  if (inputs.projectInformation.developerProfit < 0) {
    errors.push('Developer profit cannot be negative');
  }

  // Validate total project cost calculation
  const calculatedTotalCost = inputs.projectInformation.landCost + 
                             inputs.projectInformation.constructionCost + 
                             inputs.projectInformation.softCosts + 
                             inputs.projectInformation.contingency + 
                             inputs.projectInformation.developerProfit;
  
  if (Math.abs(calculatedTotalCost - inputs.projectInformation.totalProjectCost) > 1) {
    warnings.push(`Total project cost (${inputs.projectInformation.totalProjectCost.toLocaleString()}) doesn't match sum of components (${calculatedTotalCost.toLocaleString()})`);
  }

  // Financing Details Validation
  if (inputs.financingDetails.requestedLoanAmount <= 0) {
    errors.push('Requested loan amount must be greater than 0');
  }

  if (inputs.financingDetails.requestedLoanAmount > inputs.projectInformation.totalProjectCost) {
    errors.push('Requested loan amount cannot exceed total project cost');
  }

  if (inputs.financingDetails.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  }

  if (inputs.financingDetails.interestRate > 25) {
    warnings.push('Interest rate seems unusually high (>25%)');
  }

  if (inputs.financingDetails.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (inputs.financingDetails.loanTerm > 360) {
    warnings.push('Loan term seems unusually long (>30 years)');
  }

  if (inputs.financingDetails.interestOnlyPeriod < 0) {
    errors.push('Interest-only period cannot be negative');
  }

  if (inputs.financingDetails.interestOnlyPeriod > inputs.financingDetails.loanTerm) {
    errors.push('Interest-only period cannot exceed loan term');
  }

  if (inputs.financingDetails.originationFee < 0) {
    errors.push('Origination fee cannot be negative');
  }

  if (inputs.financingDetails.otherFees < 0) {
    errors.push('Other fees cannot be negative');
  }

  // Project Timeline Validation
  if (inputs.projectTimeline.constructionStartDate && inputs.projectTimeline.estimatedCompletionDate) {
    const startDate = new Date(inputs.projectTimeline.constructionStartDate);
    const endDate = new Date(inputs.projectTimeline.estimatedCompletionDate);
    
    if (startDate >= endDate) {
      errors.push('Construction start date must be before estimated completion date');
    }
  }

  if (inputs.projectTimeline.constructionDuration <= 0) {
    errors.push('Construction duration must be greater than 0');
  }

  if (inputs.projectTimeline.constructionDuration > 60) {
    warnings.push('Construction duration seems unusually long (>5 years)');
  }

  if (inputs.projectTimeline.stabilizationPeriod < 0) {
    errors.push('Stabilization period cannot be negative');
  }

  if (inputs.projectTimeline.stabilizationPeriod > 36) {
    warnings.push('Stabilization period seems unusually long (>3 years)');
  }

  // Market Assumptions Validation
  if (inputs.marketAssumptions.projectedRentalIncome < 0) {
    errors.push('Projected rental income cannot be negative');
  }

  if (inputs.marketAssumptions.projectedOperatingExpenses < 0) {
    errors.push('Projected operating expenses cannot be negative');
  }

  if (inputs.marketAssumptions.projectedPropertyValue <= 0) {
    errors.push('Projected property value must be greater than 0');
  }

  if (inputs.marketAssumptions.marketGrowthRate < -10) {
    warnings.push('Market growth rate seems unusually low (<-10%)');
  }

  if (inputs.marketAssumptions.marketGrowthRate > 20) {
    warnings.push('Market growth rate seems unusually high (>20%)');
  }

  if (inputs.marketAssumptions.capRate <= 0) {
    errors.push('Cap rate must be greater than 0');
  }

  if (inputs.marketAssumptions.capRate > 15) {
    warnings.push('Cap rate seems unusually high (>15%)');
  }

  // LTC Ratio Validation
  const ltcRatio = (inputs.financingDetails.requestedLoanAmount / inputs.projectInformation.totalProjectCost) * 100;
  
  if (ltcRatio > 95) {
    errors.push('LTC ratio cannot exceed 95%');
  }

  if (ltcRatio > 85) {
    warnings.push('LTC ratio is very high (>85%), which may limit lender options');
  }

  // Business Logic Validation
  if (inputs.marketAssumptions.projectedRentalIncome > 0 && inputs.marketAssumptions.projectedOperatingExpenses > 0) {
    const netOperatingIncome = inputs.marketAssumptions.projectedRentalIncome - inputs.marketAssumptions.projectedOperatingExpenses;
    if (netOperatingIncome <= 0) {
      warnings.push('Projected operating expenses exceed projected rental income');
    }
  }

  // Risk Factor Validation
  const validRiskLevels = ['low', 'medium', 'high'];
  if (!validRiskLevels.includes(inputs.riskFactors.marketRisk)) {
    errors.push('Market risk must be low, medium, or high');
  }

  if (!validRiskLevels.includes(inputs.riskFactors.constructionRisk)) {
    errors.push('Construction risk must be low, medium, or high');
  }

  if (!validRiskLevels.includes(inputs.riskFactors.leasingRisk)) {
    errors.push('Leasing risk must be low, medium, or high');
  }

  if (!validRiskLevels.includes(inputs.riskFactors.interestRateRisk)) {
    errors.push('Interest rate risk must be low, medium, or high');
  }

  // Additional Business Logic Checks
  if (inputs.projectInformation.landCost > inputs.projectInformation.totalProjectCost * 0.5) {
    warnings.push('Land cost represents more than 50% of total project cost, which may indicate overvaluation');
  }

  if (inputs.projectInformation.contingency < inputs.projectInformation.totalProjectCost * 0.05) {
    warnings.push('Contingency is less than 5% of total project cost, which may be insufficient');
  }

  if (inputs.projectInformation.contingency > inputs.projectInformation.totalProjectCost * 0.25) {
    warnings.push('Contingency is more than 25% of total project cost, which may indicate high uncertainty');
  }

  // Return validation result
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function quickValidateLoanToCostRatioInput(field: string, value: any): string | null {
  switch (field) {
    case 'landCost':
      if (!value) return 'Land cost is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 10000000) return 'Must be between $10,000 and $10,000,000';
      break;

    case 'constructionCost':
      if (!value) return 'Construction cost is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 50000000) return 'Must be between $10,000 and $50,000,000';
      break;

    case 'softCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'furnitureFixturesEquipment':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'contingency':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'ltcRatio':
      if (!value) return 'LTC ratio is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 50 || value > 95) return 'Must be between 50% and 95%';
      break;

    case 'borrowerCreditScore':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 300 || value > 850)) return 'Must be between 300 and 850';
      break;

    case 'projectTimeline':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 3 || value > 60)) return 'Must be between 3 and 60 months';
      break;

    case 'preLeasingPercentage':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100) return 'Must be 100% or less';
      break;

    case 'projectType':
      if (value && !['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Hospitality', 'Healthcare', 'Educational', 'Retail', 'Office', 'Warehouse'].includes(value)) {
        return 'Invalid project type';
      }
      break;

    case 'propertyType':
      if (value && !['Single Family', 'Multi-Family', 'Apartment', 'Condominium', 'Townhouse', 'Office Building', 'Shopping Center', 'Hotel', 'Hospital', 'School', 'Factory', 'Warehouse', 'Mixed-Use Building'].includes(value)) {
        return 'Invalid property type';
      }
      break;

    case 'location':
      if (value && !['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone'].includes(value)) {
        return 'Invalid location';
      }
      break;

    case 'marketCondition':
      if (value && !['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'].includes(value)) {
        return 'Invalid market condition';
      }
      break;

    case 'lenderType':
      if (value && !['Commercial Bank', 'Credit Union', 'Private Lender', 'Hard Money Lender', 'CMBS Lender', 'Life Insurance Company', 'Government Agency', 'Regional Bank', 'National Bank', 'Investment Fund'].includes(value)) {
        return 'Invalid lender type';
      }
      break;

    case 'borrowerExperience':
      if (value && !['Novice', 'Experienced', 'Expert', 'Institutional'].includes(value)) {
        return 'Invalid borrower experience';
      }
      break;

    case 'preLeasing':
      if (value && !['None', 'Partial', 'Substantial', 'Fully Leased'].includes(value)) {
        return 'Invalid pre-leasing status';
      }
      break;

    case 'environmentalIssues':
      if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Unknown'].includes(value)) {
        return 'Invalid environmental issues';
      }
      break;

    case 'zoningIssues':
      if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Pending Approval'].includes(value)) {
        return 'Invalid zoning issues';
      }
      break;

    case 'constructionRisk':
      if (value && !['Low', 'Moderate', 'High', 'Very High'].includes(value)) {
        return 'Invalid construction risk';
      }
      break;

    case 'marketRisk':
      if (value && !['Low', 'Moderate', 'High', 'Very High'].includes(value)) {
        return 'Invalid market risk';
      }
      break;
  }

  return null;
}
