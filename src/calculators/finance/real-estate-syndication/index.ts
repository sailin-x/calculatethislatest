export { RealEstateSyndicationCalculator } from './RealEstateSyndicationCalculator';
export { calculateRealEstateSyndication, calculateRealEstateSyndicationMetrics } from './formulas';
export { validateRealEstateSyndicationInputs, validateRealEstateSyndicationOutputs } from './validation';
export { validateField } from './quickValidation';
export { realEstateSyndicationCalculator } from './register';
export type {
  RealEstateSyndicationInputs,
  RealEstateSyndicationOutputs,
  RealEstateSyndicationMetrics,
  RealEstateSyndicationAnalysis,
  CashFlowProjection,
  WaterfallCalculation,
  InvestorSummary,
  SponsorSummary,
  TaxAnalysis,
  SensitivityAnalysis,
  StressTestResult
} from './types';