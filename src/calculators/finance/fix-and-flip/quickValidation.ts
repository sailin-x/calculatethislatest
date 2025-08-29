import { CalculatorInputs } from '../../../types/calculator';

// Quick validation functions for individual inputs with allInputs parameter

export function validatePropertyAddress(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.length > 200) {
    return 'Property address must be 200 characters or less';
  }
  return null;
}

export function validatePropertyType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['single_family', 'townhouse', 'condo', 'multi_family', 'commercial', 'land'];
  if (!validTypes.includes(value)) {
    return 'Invalid property type selected';
  }
  return null;
}

export function validatePropertySize(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Property size must be greater than zero';
  }
  if (value > 100000) {
    return 'Property size over 100,000 sq ft seems unrealistic';
  }
  return null;
}

export function validateLotSize(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Lot size must be greater than zero';
  }
  if (value > 1000000) {
    return 'Lot size over 1,000,000 sq ft seems unrealistic';
  }
  return null;
}

export function validateBedrooms(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Number of bedrooms cannot be negative';
  }
  if (value > 20) {
    return 'Number of bedrooms over 20 seems unrealistic';
  }
  return null;
}

export function validateBathrooms(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Number of bathrooms cannot be negative';
  }
  if (value > 20) {
    return 'Number of bathrooms over 20 seems unrealistic';
  }
  return null;
}

export function validateYearBuilt(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1800 || value > 2030) {
    return 'Year built must be between 1800 and 2030';
  }
  return null;
}

export function validatePropertyCondition(value: string, allInputs?: Record<string, any>): string | null {
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs_work'];
  if (!validConditions.includes(value)) {
    return 'Invalid property condition selected';
  }
  return null;
}

export function validatePurchasePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Purchase price must be greater than zero';
  }
  if (value > 10000000) {
    return 'Purchase price over $10 million seems high for fix and flip';
  }
  return null;
}

export function validatePurchaseDate(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) {
    return 'Purchase date is required';
  }
  return null;
}

export function validateClosingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Closing costs cannot be negative';
  }
  if (value > 500000) {
    return 'Closing costs over $500,000 seem excessive';
  }
  return null;
}

export function validateInspectionCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Inspection costs cannot be negative';
    }
    if (value > 10000) {
      return 'Inspection costs over $10,000 seem excessive';
    }
  }
  return null;
}

export function validateTitleInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Title insurance cost cannot be negative';
    }
    if (value > 10000) {
      return 'Title insurance cost over $10,000 seems excessive';
    }
  }
  return null;
}

export function validateTransferTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Transfer taxes cannot be negative';
    }
    if (value > 50000) {
      return 'Transfer taxes over $50,000 seem excessive';
    }
  }
  return null;
}

export function validateAttorneyFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Attorney fees cannot be negative';
    }
    if (value > 10000) {
      return 'Attorney fees over $10,000 seem excessive';
    }
  }
  return null;
}

export function validateOtherPurchaseCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Other purchase costs cannot be negative';
    }
    if (value > 50000) {
      return 'Other purchase costs over $50,000 seem excessive';
    }
  }
  return null;
}

export function validateDownPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Down payment cannot be negative';
  }
  if (value > 5000000) {
    return 'Down payment over $5 million seems excessive';
  }
  return null;
}

export function validateLoanAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Loan amount cannot be negative';
  }
  if (value > 10000000) {
    return 'Loan amount over $10 million seems excessive';
  }
  return null;
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Interest rate cannot be negative';
  }
  if (value > 25) {
    return 'Interest rate over 25% seems excessive';
  }
  return null;
}

export function validateLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Loan term must be greater than zero';
  }
  if (value > 360) {
    return 'Loan term over 360 months (30 years) seems excessive for fix and flip';
  }
  return null;
}

export function validateLoanType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['hard_money', 'private_money', 'conventional', 'cash', 'portfolio'];
  if (!validTypes.includes(value)) {
    return 'Invalid loan type selected';
  }
  return null;
}

export function validateOriginationFee(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Origination fee cannot be negative';
    }
    if (value > 100000) {
      return 'Origination fee over $100,000 seems excessive';
    }
  }
  return null;
}

export function validatePoints(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Points cannot be negative';
    }
    if (value > 10) {
      return 'Points over 10 seem excessive';
    }
  }
  return null;
}

export function validateMonthlyPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Monthly payment cannot be negative';
    }
    if (value > 100000) {
      return 'Monthly payment over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateRenovationBudget(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Renovation budget cannot be negative';
  }
  if (value > 1000000) {
    return 'Renovation budget over $1 million seems excessive';
  }
  return null;
}

export function validateRenovationTimeline(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Renovation timeline must be greater than zero';
    }
    if (value > 730) {
      return 'Renovation timeline over 730 days seems excessive';
    }
  }
  return null;
}

export function validateStructuralWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateStructuralWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Structural work cost cannot be negative';
    }
    if (value > 500000) {
      return 'Structural work cost over $500,000 seems excessive';
    }
  }
  return null;
}

export function validateElectricalWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateElectricalWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Electrical work cost cannot be negative';
    }
    if (value > 100000) {
      return 'Electrical work cost over $100,000 seems excessive';
    }
  }
  return null;
}

export function validatePlumbingWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validatePlumbingWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Plumbing work cost cannot be negative';
    }
    if (value > 100000) {
      return 'Plumbing work cost over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateHvacWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateHvacWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'HVAC work cost cannot be negative';
    }
    if (value > 50000) {
      return 'HVAC work cost over $50,000 seems excessive';
    }
  }
  return null;
}

export function validateRoofingWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateRoofingWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Roofing work cost cannot be negative';
    }
    if (value > 100000) {
      return 'Roofing work cost over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateKitchenRemodel(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateKitchenRemodelCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Kitchen remodel cost cannot be negative';
    }
    if (value > 200000) {
      return 'Kitchen remodel cost over $200,000 seems excessive';
    }
  }
  return null;
}

export function validateBathroomRemodel(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateBathroomRemodelCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Bathroom remodel cost cannot be negative';
    }
    if (value > 100000) {
      return 'Bathroom remodel cost over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateFlooringWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateFlooringWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Flooring work cost cannot be negative';
    }
    if (value > 50000) {
      return 'Flooring work cost over $50,000 seems excessive';
    }
  }
  return null;
}

export function validatePaintingWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validatePaintingWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Painting work cost cannot be negative';
    }
    if (value > 30000) {
      return 'Painting work cost over $30,000 seems excessive';
    }
  }
  return null;
}

export function validateLandscapingWork(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateLandscapingWorkCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Landscaping work cost cannot be negative';
    }
    if (value > 50000) {
      return 'Landscaping work cost over $50,000 seems excessive';
    }
  }
  return null;
}

export function validatePermitsAndFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Permits and fees cannot be negative';
    }
    if (value > 20000) {
      return 'Permits and fees over $20,000 seem excessive';
    }
  }
  return null;
}

export function validateContingencyBudget(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Contingency budget cannot be negative';
    }
    if (value > 100000) {
      return 'Contingency budget over $100,000 seems excessive';
    }
  }
  return null;
}

export function validatePropertyTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Property taxes cannot be negative';
  }
  if (value > 10000) {
    return 'Property taxes over $10,000 per month seem excessive';
  }
  return null;
}

export function validateInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Insurance cannot be negative';
  }
  if (value > 5000) {
    return 'Insurance over $5,000 per month seems excessive';
  }
  return null;
}

export function validateUtilities(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Utilities cannot be negative';
    }
    if (value > 2000) {
      return 'Utilities over $2,000 per month seem excessive';
    }
  }
  return null;
}

export function validateHoaFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'HOA fees cannot be negative';
    }
    if (value > 2000) {
      return 'HOA fees over $2,000 per month seem excessive';
    }
  }
  return null;
}

export function validatePropertyManagement(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Property management cost cannot be negative';
    }
    if (value > 5000) {
      return 'Property management cost over $5,000 per month seems excessive';
    }
  }
  return null;
}

export function validateMaintenance(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Maintenance cost cannot be negative';
    }
    if (value > 2000) {
      return 'Maintenance cost over $2,000 per month seems excessive';
    }
  }
  return null;
}

export function validateOtherHoldingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Other holding costs cannot be negative';
    }
    if (value > 2000) {
      return 'Other holding costs over $2,000 per month seem excessive';
    }
  }
  return null;
}

export function validateMarketTrends(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTrends = ['appreciating', 'stable', 'declining'];
    if (!validTrends.includes(value)) {
      return 'Invalid market trends selected';
    }
  }
  return null;
}

export function validateAverageDaysOnMarket(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Average days on market must be greater than zero';
    }
    if (value > 365) {
      return 'Average days on market over 365 days seems excessive';
    }
  }
  return null;
}

export function validateMarketAbsorptionRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Market absorption rate must be greater than zero';
    }
    if (value > 24) {
      return 'Market absorption rate over 24 months seems excessive';
    }
  }
  return null;
}

export function validateTargetSalePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Target sale price must be greater than zero';
  }
  if (value > 10000000) {
    return 'Target sale price over $10 million seems high for fix and flip';
  }
  return null;
}

export function validateTargetSaleDate(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) {
    return 'Target sale date is required';
  }
  return null;
}

export function validateSellingStrategy(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validStrategies = ['mls', 'fsbo', 'wholesale', 'auction', 'investor_network'];
    if (!validStrategies.includes(value)) {
      return 'Invalid selling strategy selected';
    }
  }
  return null;
}

export function validateRealtorCommission(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Realtor commission cannot be negative';
    }
    if (value > 15) {
      return 'Realtor commission over 15% seems excessive';
    }
  }
  return null;
}

export function validateClosingCostsSeller(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Seller closing costs cannot be negative';
    }
    if (value > 100000) {
      return 'Seller closing costs over $100,000 seem excessive';
    }
  }
  return null;
}

export function validateStagingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Staging costs cannot be negative';
    }
    if (value > 50000) {
      return 'Staging costs over $50,000 seem excessive';
    }
  }
  return null;
}

export function validateMarketingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Marketing costs cannot be negative';
    }
    if (value > 20000) {
      return 'Marketing costs over $20,000 seem excessive';
    }
  }
  return null;
}

export function validateAcquisitionTimeline(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Acquisition timeline must be greater than zero';
    }
    if (value > 365) {
      return 'Acquisition timeline over 365 days seems excessive';
    }
  }
  return null;
}

export function validateRenovationTimeline(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Renovation timeline must be greater than zero';
    }
    if (value > 730) {
      return 'Renovation timeline over 730 days seems excessive';
    }
  }
  return null;
}

export function validateMarketingTimeline(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Marketing timeline must be greater than zero';
    }
    if (value > 365) {
      return 'Marketing timeline over 365 days seems excessive';
    }
  }
  return null;
}

export function validateTotalProjectTimeline(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Total project timeline must be greater than zero';
    }
    if (value > 1095) {
      return 'Total project timeline over 1095 days (3 years) seems excessive';
    }
  }
  return null;
}

export function validateMarketRisk(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validRisks = ['low', 'medium', 'high'];
    if (!validRisks.includes(value)) {
      return 'Invalid market risk selected';
    }
  }
  return null;
}

export function validateRenovationRisk(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validRisks = ['low', 'medium', 'high'];
    if (!validRisks.includes(value)) {
      return 'Invalid renovation risk selected';
    }
  }
  return null;
}

export function validateFinancingRisk(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validRisks = ['low', 'medium', 'high'];
    if (!validRisks.includes(value)) {
      return 'Invalid financing risk selected';
    }
  }
  return null;
}

export function validateTimelineRisk(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validRisks = ['low', 'medium', 'high'];
    if (!validRisks.includes(value)) {
      return 'Invalid timeline risk selected';
    }
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Analysis period must be greater than zero';
  }
  if (value > 60) {
    return 'Analysis period over 60 months seems excessive';
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Discount rate cannot be negative';
  }
  if (value > 50) {
    return 'Discount rate over 50% seems excessive';
  }
  return null;
}

export function validateTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Tax rate cannot be negative';
    }
    if (value > 50) {
      return 'Tax rate over 50% seems excessive';
    }
  }
  return null;
}

export function validateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < -10) {
      return 'Inflation rate below -10% seems unrealistic';
    }
    if (value > 20) {
      return 'Inflation rate over 20% seems excessive';
    }
  }
  return null;
}

export function validateAppreciationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < -20) {
      return 'Appreciation rate below -20% seems unrealistic';
    }
    if (value > 20) {
      return 'Appreciation rate over 20% seems excessive';
    }
  }
  return null;
}

export function validateCurrency(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
    if (!validCurrencies.includes(value)) {
      return 'Invalid currency selected';
    }
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validFormats = ['percentage', 'decimal', 'basis-points'];
    if (!validFormats.includes(value)) {
      return 'Invalid display format selected';
    }
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}
