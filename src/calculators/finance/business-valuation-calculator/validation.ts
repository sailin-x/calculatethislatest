import { BusinessValuationCalculatorInputs, BusinessValuationCalculatorOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateBusinessValuationCalculatorInputs(inputs: BusinessValuationCalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate business information
  validateBusinessInfo(inputs.businessInfo, errors);
  
  // Validate financial information
  validateFinancialInfo(inputs.financialInfo, errors);
  
  // Validate asset analysis
  validateAssetAnalysis(inputs.assetAnalysis, errors);
  
  // Validate valuation methods
  validateValuationMethods(inputs.valuationMethods, errors);
  
  // Validate risk analysis
  validateRiskAnalysis(inputs.riskAnalysis, errors);
  
  // Validate discount rates
  validateDiscountRates(inputs.discountRates, errors);
  
  // Validate valuation planning
  validateValuationPlanning(inputs.valuationPlanning, errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateBusinessValuationCalculatorOutputs(outputs: BusinessValuationCalculatorOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core valuation results
  if (outputs.enterpriseValue < 0) {
    errors.enterpriseValue = 'Enterprise value cannot be negative';
  }

  if (outputs.equityValue < 0) {
    errors.equityValue = 'Equity value cannot be negative';
  }

  if (outputs.valuePerShare < 0) {
    errors.valuePerShare = 'Value per share cannot be negative';
  }

  if (outputs.valuationMultiple < 0) {
    errors.valuationMultiple = 'Valuation multiple cannot be negative';
  }

  if (outputs.discountRate < 0 || outputs.discountRate > 1) {
    errors.discountRate = 'Discount rate must be between 0 and 1';
  }

  // Validate valuation methods
  if (outputs.incomeApproach < 0) {
    errors.incomeApproach = 'Income approach value cannot be negative';
  }

  if (outputs.marketApproach < 0) {
    errors.marketApproach = 'Market approach value cannot be negative';
  }

  if (outputs.assetApproach < 0) {
    errors.assetApproach = 'Asset approach value cannot be negative';
  }

  // Validate risk assessment
  if (outputs.riskAssessment.businessRisk < 0 || outputs.riskAssessment.businessRisk > 1) {
    errors.businessRisk = 'Business risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.financialRisk < 0 || outputs.riskAssessment.financialRisk > 1) {
    errors.financialRisk = 'Financial risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.marketRisk < 0 || outputs.riskAssessment.marketRisk > 1) {
    errors.marketRisk = 'Market risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.totalRisk < 0 || outputs.riskAssessment.totalRisk > 1) {
    errors.totalRisk = 'Total risk must be between 0 and 1';
  }

  // Validate key metrics
  if (outputs.keyMetrics.returnOnEquity < -1 || outputs.keyMetrics.returnOnEquity > 1) {
    errors.returnOnEquity = 'Return on equity must be between -100% and 100%';
  }

  if (outputs.keyMetrics.returnOnAssets < -1 || outputs.keyMetrics.returnOnAssets > 1) {
    errors.returnOnAssets = 'Return on assets must be between -100% and 100%';
  }

  if (outputs.keyMetrics.profitMargin < -1 || outputs.keyMetrics.profitMargin > 1) {
    errors.profitMargin = 'Profit margin must be between -100% and 100%';
  }

  if (outputs.keyMetrics.debtToEquity < 0) {
    errors.debtToEquity = 'Debt to equity ratio cannot be negative';
  }

  if (outputs.keyMetrics.currentRatio < 0) {
    errors.currentRatio = 'Current ratio cannot be negative';
  }

  if (outputs.keyMetrics.quickRatio < 0) {
    errors.quickRatio = 'Quick ratio cannot be negative';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

function validateBusinessInfo(businessInfo: any, errors: Record<string, string>): void {
  // Validate basic info
  if (!businessInfo.basicInfo.businessName || businessInfo.basicInfo.businessName.trim().length === 0) {
    errors.businessName = 'Business name is required';
  }

  if (businessInfo.basicInfo.businessName && businessInfo.basicInfo.businessName.length > 100) {
    errors.businessName = 'Business name cannot exceed 100 characters';
  }

  if (!businessInfo.basicInfo.businessType) {
    errors.businessType = 'Business type is required';
  }

  const validBusinessTypes = ['sole_proprietorship', 'partnership', 'corporation', 's_corporation', 'llc', 'other'];
  if (businessInfo.basicInfo.businessType && !validBusinessTypes.includes(businessInfo.basicInfo.businessType)) {
    errors.businessType = 'Invalid business type';
  }

  if (businessInfo.basicInfo.yearEstablished < 1800 || businessInfo.basicInfo.yearEstablished > new Date().getFullYear()) {
    errors.yearEstablished = 'Year established must be between 1800 and current year';
  }

  if (businessInfo.basicInfo.yearsInOperation < 0) {
    errors.yearsInOperation = 'Years in operation cannot be negative';
  }

  // Validate ownership info
  if (businessInfo.ownershipInfo.totalOwnership < 0 || businessInfo.ownershipInfo.totalOwnership > 100) {
    errors.totalOwnership = 'Total ownership must be between 0% and 100%';
  }

  if (businessInfo.ownershipInfo.minorityDiscount < 0 || businessInfo.ownershipInfo.minorityDiscount > 100) {
    errors.minorityDiscount = 'Minority discount must be between 0% and 100%';
  }

  if (businessInfo.ownershipInfo.controlPremium < 0 || businessInfo.ownershipInfo.controlPremium > 100) {
    errors.controlPremium = 'Control premium must be between 0% and 100%';
  }

  if (businessInfo.ownershipInfo.marketabilityDiscount < 0 || businessInfo.ownershipInfo.marketabilityDiscount > 100) {
    errors.marketabilityDiscount = 'Marketability discount must be between 0% and 100%';
  }

  // Validate market info
  if (businessInfo.marketInfo.marketSize < 0) {
    errors.marketSize = 'Market size cannot be negative';
  }

  if (businessInfo.marketInfo.marketGrowth < -1 || businessInfo.marketInfo.marketGrowth > 1) {
    errors.marketGrowth = 'Market growth must be between -100% and 100%';
  }

  if (businessInfo.marketInfo.marketShare < 0 || businessInfo.marketInfo.marketShare > 1) {
    errors.marketShare = 'Market share must be between 0% and 100%';
  }

  // Validate customer base
  if (businessInfo.marketInfo.customerBase.totalCustomers < 0) {
    errors.totalCustomers = 'Total customers cannot be negative';
  }

  if (businessInfo.marketInfo.customerBase.repeatCustomers < 0) {
    errors.repeatCustomers = 'Repeat customers cannot be negative';
  }

  if (businessInfo.marketInfo.customerBase.customerRetention < 0 || businessInfo.marketInfo.customerBase.customerRetention > 1) {
    errors.customerRetention = 'Customer retention must be between 0% and 100%';
  }

  if (businessInfo.marketInfo.customerBase.averageCustomerValue < 0) {
    errors.averageCustomerValue = 'Average customer value cannot be negative';
  }

  if (businessInfo.marketInfo.customerBase.customerConcentration < 0 || businessInfo.marketInfo.customerBase.customerConcentration > 1) {
    errors.customerConcentration = 'Customer concentration must be between 0% and 100%';
  }
}

function validateFinancialInfo(financialInfo: any, errors: Record<string, string>): void {
  // Validate historical financials
  if (financialInfo.historicalFinancials.length > 0) {
    financialInfo.historicalFinancials.forEach((financial: any, index: number) => {
      if (financial.revenue < 0) {
        errors[`historicalFinancials[${index}].revenue`] = 'Revenue cannot be negative';
      }

      if (financial.costOfGoodsSold < 0) {
        errors[`historicalFinancials[${index}].costOfGoodsSold`] = 'Cost of goods sold cannot be negative';
      }

      if (financial.operatingExpenses && financial.operatingExpenses.totalOperatingExpenses < 0) {
        errors[`historicalFinancials[${index}].totalOperatingExpenses`] = 'Total operating expenses cannot be negative';
      }

      if (financial.netIncome !== undefined && financial.netIncome < -1000000000) {
        errors[`historicalFinancials[${index}].netIncome`] = 'Net income cannot be less than -$1 billion';
      }

      if (financial.ebitda !== undefined && financial.ebitda < -1000000000) {
        errors[`historicalFinancials[${index}].ebitda`] = 'EBITDA cannot be less than -$1 billion';
      }
    });
  }

  // Validate normalization adjustments
  if (financialInfo.normalizationAdjustments.ownerCompensation.adjustment < -10000000) {
    errors.ownerCompensationAdjustment = 'Owner compensation adjustment cannot be less than -$10 million';
  }

  if (financialInfo.normalizationAdjustments.ownerCompensation.adjustment > 10000000) {
    errors.ownerCompensationAdjustment = 'Owner compensation adjustment cannot exceed $10 million';
  }

  // Validate working capital analysis
  if (financialInfo.workingCapitalAnalysis.currentAssets.cash < 0) {
    errors.cash = 'Cash cannot be negative';
  }

  if (financialInfo.workingCapitalAnalysis.currentAssets.accountsReceivable < 0) {
    errors.accountsReceivable = 'Accounts receivable cannot be negative';
  }

  if (financialInfo.workingCapitalAnalysis.currentAssets.inventory < 0) {
    errors.inventory = 'Inventory cannot be negative';
  }

  if (financialInfo.workingCapitalAnalysis.currentLiabilities.accountsPayable < 0) {
    errors.accountsPayable = 'Accounts payable cannot be negative';
  }

  if (financialInfo.workingCapitalAnalysis.currentLiabilities.shortTermDebt < 0) {
    errors.shortTermDebt = 'Short-term debt cannot be negative';
  }

  // Validate capital structure
  if (financialInfo.capitalStructure.debt.shortTermDebt < 0) {
    errors.shortTermDebt = 'Short-term debt cannot be negative';
  }

  if (financialInfo.capitalStructure.debt.longTermDebt < 0) {
    errors.longTermDebt = 'Long-term debt cannot be negative';
  }

  if (financialInfo.capitalStructure.debt.interestRate < 0 || financialInfo.capitalStructure.debt.interestRate > 1) {
    errors.interestRate = 'Interest rate must be between 0% and 100%';
  }

  if (financialInfo.capitalStructure.equity.commonStock < 0) {
    errors.commonStock = 'Common stock cannot be negative';
  }

  if (financialInfo.capitalStructure.equity.preferredStock < 0) {
    errors.preferredStock = 'Preferred stock cannot be negative';
  }

  if (financialInfo.capitalStructure.equity.retainedEarnings < -1000000000) {
    errors.retainedEarnings = 'Retained earnings cannot be less than -$1 billion';
  }
}

function validateAssetAnalysis(assetAnalysis: any, errors: Record<string, string>): void {
  if (assetAnalysis.totalAssets < 0) {
    errors.totalAssets = 'Total assets cannot be negative';
  }

  if (assetAnalysis.tangibleAssets.totalTangibleAssets < 0) {
    errors.totalTangibleAssets = 'Total tangible assets cannot be negative';
  }

  if (assetAnalysis.intangibleAssets.totalIntangibleAssets < 0) {
    errors.totalIntangibleAssets = 'Total intangible assets cannot be negative';
  }

  // Validate inventory
  if (assetAnalysis.tangibleAssets.inventory.bookValue < 0) {
    errors.inventoryBookValue = 'Inventory book value cannot be negative';
  }

  if (assetAnalysis.tangibleAssets.inventory.fairMarketValue < 0) {
    errors.inventoryFairMarketValue = 'Inventory fair market value cannot be negative';
  }

  if (assetAnalysis.tangibleAssets.inventory.turnoverRate < 0) {
    errors.inventoryTurnoverRate = 'Inventory turnover rate cannot be negative';
  }

  if (assetAnalysis.tangibleAssets.inventory.obsolescence < 0 || assetAnalysis.tangibleAssets.inventory.obsolescence > 1) {
    errors.inventoryObsolescence = 'Inventory obsolescence must be between 0% and 100%';
  }

  // Validate real estate
  if (assetAnalysis.tangibleAssets.realEstate.length > 0) {
    assetAnalysis.tangibleAssets.realEstate.forEach((property: any, index: number) => {
      if (property.bookValue < 0) {
        errors[`realEstate[${index}].bookValue`] = 'Property book value cannot be negative';
      }

      if (property.fairMarketValue < 0) {
        errors[`realEstate[${index}].fairMarketValue`] = 'Property fair market value cannot be negative';
      }

      if (property.mortgage < 0) {
        errors[`realEstate[${index}].mortgage`] = 'Property mortgage cannot be negative';
      }

      if (property.equity < 0) {
        errors[`realEstate[${index}].equity`] = 'Property equity cannot be negative';
      }
    });
  }

  // Validate equipment
  if (assetAnalysis.tangibleAssets.equipment.length > 0) {
    assetAnalysis.tangibleAssets.equipment.forEach((equipment: any, index: number) => {
      if (equipment.originalCost < 0) {
        errors[`equipment[${index}].originalCost`] = 'Equipment original cost cannot be negative';
      }

      if (equipment.bookValue < 0) {
        errors[`equipment[${index}].bookValue`] = 'Equipment book value cannot be negative';
      }

      if (equipment.fairMarketValue < 0) {
        errors[`equipment[${index}].fairMarketValue`] = 'Equipment fair market value cannot be negative';
      }

      if (equipment.usefulLife < 0) {
        errors[`equipment[${index}].usefulLife`] = 'Equipment useful life cannot be negative';
      }
    });
  }
}

function validateValuationMethods(valuationMethods: any, errors: Record<string, string>): void {
  // Validate income approach
  if (valuationMethods.incomeApproach.discountedCashFlow.projectionPeriod < 1 || valuationMethods.incomeApproach.discountedCashFlow.projectionPeriod > 20) {
    errors.projectionPeriod = 'Projection period must be between 1 and 20 years';
  }

  if (valuationMethods.incomeApproach.discountedCashFlow.terminalGrowthRate < -0.1 || valuationMethods.incomeApproach.discountedCashFlow.terminalGrowthRate > 0.1) {
    errors.terminalGrowthRate = 'Terminal growth rate must be between -10% and 10%';
  }

  if (valuationMethods.incomeApproach.discountedCashFlow.discountRate < 0.05 || valuationMethods.incomeApproach.discountedCashFlow.discountRate > 0.5) {
    errors.discountRate = 'Discount rate must be between 5% and 50%';
  }

  if (valuationMethods.incomeApproach.capitalizationOfEarnings.capitalizationRate < 0.05 || valuationMethods.incomeApproach.capitalizationOfEarnings.capitalizationRate > 0.5) {
    errors.capitalizationRate = 'Capitalization rate must be between 5% and 50%';
  }

  // Validate market approach multiples
  if (valuationMethods.marketApproach.multiples.priceToEarnings < 0) {
    errors.priceToEarnings = 'Price to earnings ratio cannot be negative';
  }

  if (valuationMethods.marketApproach.multiples.priceToBook < 0) {
    errors.priceToBook = 'Price to book ratio cannot be negative';
  }

  if (valuationMethods.marketApproach.multiples.priceToSales < 0) {
    errors.priceToSales = 'Price to sales ratio cannot be negative';
  }

  if (valuationMethods.marketApproach.multiples.evToEbitda < 0) {
    errors.evToEbitda = 'EV to EBITDA ratio cannot be negative';
  }

  if (valuationMethods.marketApproach.multiples.evToEbit < 0) {
    errors.evToEbit = 'EV to EBIT ratio cannot be negative';
  }

  // Validate asset approach
  if (valuationMethods.assetApproach.adjustedBookValue < 0) {
    errors.adjustedBookValue = 'Adjusted book value cannot be negative';
  }

  if (valuationMethods.assetApproach.liquidationValue < 0) {
    errors.liquidationValue = 'Liquidation value cannot be negative';
  }

  if (valuationMethods.assetApproach.replacementCost < 0) {
    errors.replacementCost = 'Replacement cost cannot be negative';
  }
}

function validateRiskAnalysis(riskAnalysis: any, errors: Record<string, string>): void {
  if (riskAnalysis.businessRisk < 0 || riskAnalysis.businessRisk > 1) {
    errors.businessRisk = 'Business risk must be between 0 and 1';
  }

  if (riskAnalysis.financialRisk < 0 || riskAnalysis.financialRisk > 1) {
    errors.financialRisk = 'Financial risk must be between 0 and 1';
  }

  if (riskAnalysis.marketRisk < 0 || riskAnalysis.marketRisk > 1) {
    errors.marketRisk = 'Market risk must be between 0 and 1';
  }

  if (riskAnalysis.regulatoryRisk < 0 || riskAnalysis.regulatoryRisk > 1) {
    errors.regulatoryRisk = 'Regulatory risk must be between 0 and 1';
  }

  if (riskAnalysis.operationalRisk < 0 || riskAnalysis.operationalRisk > 1) {
    errors.operationalRisk = 'Operational risk must be between 0 and 1';
  }

  if (riskAnalysis.totalRisk < 0 || riskAnalysis.totalRisk > 1) {
    errors.totalRisk = 'Total risk must be between 0 and 1';
  }
}

function validateDiscountRates(discountRates: any, errors: Record<string, string>): void {
  if (discountRates.costOfEquity < 0 || discountRates.costOfEquity > 1) {
    errors.costOfEquity = 'Cost of equity must be between 0% and 100%';
  }

  if (discountRates.costOfDebt < 0 || discountRates.costOfDebt > 1) {
    errors.costOfDebt = 'Cost of debt must be between 0% and 100%';
  }

  if (discountRates.weightedAverageCostOfCapital < 0 || discountRates.weightedAverageCostOfCapital > 1) {
    errors.weightedAverageCostOfCapital = 'WACC must be between 0% and 100%';
  }

  if (discountRates.riskFreeRate < 0 || discountRates.riskFreeRate > 1) {
    errors.riskFreeRate = 'Risk-free rate must be between 0% and 100%';
  }

  if (discountRates.marketRiskPremium < 0 || discountRates.marketRiskPremium > 1) {
    errors.marketRiskPremium = 'Market risk premium must be between 0% and 100%';
  }

  if (discountRates.beta < -5 || discountRates.beta > 5) {
    errors.beta = 'Beta must be between -5 and 5';
  }

  if (discountRates.sizeRiskPremium < 0 || discountRates.sizeRiskPremium > 1) {
    errors.sizeRiskPremium = 'Size risk premium must be between 0% and 100%';
  }

  if (discountRates.companySpecificRisk < 0 || discountRates.companySpecificRisk > 1) {
    errors.companySpecificRisk = 'Company-specific risk must be between 0% and 100%';
  }
}

function validateValuationPlanning(valuationPlanning: any, errors: Record<string, string>): void {
  const validPurposes = ['sale', 'purchase', 'estate_planning', 'divorce', 'partnership_dissolution', 'financing', 'insurance', 'tax', 'litigation', 'other'];
  if (!validPurposes.includes(valuationPlanning.purpose)) {
    errors.purpose = 'Invalid valuation purpose';
  }

  const validStandards = ['fair_market_value', 'fair_value', 'investment_value', 'liquidation_value'];
  if (!validStandards.includes(valuationPlanning.standardOfValue)) {
    errors.standardOfValue = 'Invalid standard of value';
  }

  const validPremises = ['going_concern', 'liquidation', 'orderly_liquidation', 'forced_liquidation'];
  if (!validPremises.includes(valuationPlanning.premiseOfValue)) {
    errors.premiseOfValue = 'Invalid premise of value';
  }

  const validReportTypes = ['detailed', 'summary', 'calculation', 'oral'];
  if (!validReportTypes.includes(valuationPlanning.reportType)) {
    errors.reportType = 'Invalid report type';
  }

  // Validate effective date
  const effectiveDate = new Date(valuationPlanning.effectiveDate);
  if (isNaN(effectiveDate.getTime())) {
    errors.effectiveDate = 'Invalid effective date';
  }

  const currentDate = new Date();
  if (effectiveDate > currentDate) {
    errors.effectiveDate = 'Effective date cannot be in the future';
  }
}