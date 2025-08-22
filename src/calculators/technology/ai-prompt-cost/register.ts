import { aiPromptCostCalculator } from './AIPromptCostCalculator';
import { aiPromptCostValidationRules } from './validation';
import * as quickValidation from './quickValidation';

// Register the calculator with the system
export const calculator = aiPromptCostCalculator;
export const validationRules = aiPromptCostValidationRules;
export const quickValidationFunctions = quickValidation;

// Export for calculator registry
export default {
  calculator: aiPromptCostCalculator,
  validationRules: aiPromptCostValidationRules,
  quickValidation
};
