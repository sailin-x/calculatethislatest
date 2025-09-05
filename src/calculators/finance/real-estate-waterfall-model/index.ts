export { realEstateWaterfallModelCalculator } from './RealEstateWaterfallModelCalculator';
export { calculateRealEstateWaterfallModel, calculateWaterfallComparison, calculateOptimizedWaterfall } from './formulas';
export { validateRealEstateWaterfallModelInputs, validateWaterfallStructure, validateInvestorCompliance, validateFinancialProjections, validateRiskParameters } from './validation';
export { 
  validateTotalInvestment,
  validateSponsorEquity,
  validateInvestorEquity,
  validatePreferredReturn,
  validateCatchUpPercentage,
  validatePromotePercentage,
  validateWaterfallStructure as validateWaterfallStructureQuick,
  validateHoldPeriod,
  validateAnnualCashFlow,
  validateExitValue,
  validateManagementFees,
  validateAcquisitionFees,
  validateDispositionFees,
  validateOperatingExpenses,
  validateDebtService,
  validatePropertyValue,
  validateLoanAmount,
  validateInterestRate,
  validateLoanTerm,
  validateInterestOnlyPeriod,
  validateDepreciation,
  validateTaxBenefits,
  validateInvestorCount,
  validateMinimumInvestment,
  validateMaximumInvestment,
  validateInvestorType,
  validateStateRegulations,
  validateOfferingDocument,
  validateDueDiligence,
  validateSecCompliance
} from './quickValidation';
export type { RealEstateWaterfallModelInputs, RealEstateWaterfallModelOutputs } from './types';