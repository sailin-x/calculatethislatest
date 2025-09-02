// Export types
export * from './types';

// Export main calculator component
export { default as RealEstate1031ExchangeCalculator } from './RealEstate1031ExchangeCalculator';

// Export calculation functions
export {
  calculateRealEstate1031Exchange,
  calculateRealEstate1031ExchangeMetrics
} from './formulas';

// Export validation functions
export {
  validateRealEstate1031ExchangeInputs,
  validateRealEstate1031ExchangeOutputs,
  type ValidationResult
} from './validation';

// Export quick validation functions
export {
  validateField,
  type QuickValidationResult
} from './quickValidation';