import { ValidationRuleFactory } from '../../../utils/validation';
import { AIPromptCostInputs } from './types';

export function validateAIPromptCostInputs(inputs: AIPromptCostInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  if (!inputs.tokensPerRequest || inputs.tokensPerRequest <= 0) {
    errors.push('Tokens per request must be a positive number');
  }
  
  if (!inputs.pricePerToken || inputs.pricePerToken <= 0) {
    errors.push('Price per token must be a positive number');
  }
  
  if (!inputs.numberOfRequests || inputs.numberOfRequests <= 0) {
    errors.push('Number of requests must be a positive number');
  }
  
  // Validate ranges
  if (inputs.tokensPerRequest > 100000) {
    errors.push('Tokens per request cannot exceed 100,000');
  }
  
  if (inputs.pricePerToken > 1) {
    errors.push('Price per token cannot exceed $1.00');
  }
  
  if (inputs.numberOfRequests > 10000000) {
    errors.push('Number of requests cannot exceed 10,000,000');
  }
  
  // Validate optional fields if provided
  if (inputs.inputTokens !== undefined) {
    if (inputs.inputTokens < 0 || inputs.inputTokens > 50000) {
      errors.push('Input tokens must be between 0 and 50,000');
    }
  }
  
  if (inputs.outputTokens !== undefined) {
    if (inputs.outputTokens < 0 || inputs.outputTokens > 50000) {
      errors.push('Output tokens must be between 0 and 50,000');
    }
  }
  
  if (inputs.inputPricePerToken !== undefined) {
    if (inputs.inputPricePerToken < 0.000001 || inputs.inputPricePerToken > 1) {
      errors.push('Input token price must be between $0.000001 and $1.00');
    }
  }
  
  if (inputs.outputPricePerToken !== undefined) {
    if (inputs.outputPricePerToken < 0.000001 || inputs.outputPricePerToken > 1) {
      errors.push('Output token price must be between $0.000001 and $1.00');
    }
  }
  
  // Cross-field validation
  const separateInputOutputProvided = inputs.inputTokens && inputs.outputTokens && 
    inputs.inputPricePerToken && inputs.outputPricePerToken;
  
  if (inputs.inputTokens && !separateInputOutputProvided) {
    errors.push('If providing input tokens, you must also provide output tokens and both pricing values');
  }
  
  if (inputs.outputTokens && !separateInputOutputProvided) {
    errors.push('If providing output tokens, you must also provide input tokens and both pricing values');
  }
  
  if (inputs.inputPricePerToken && !separateInputOutputProvided) {
    errors.push('If providing input token price, you must also provide output token price and both token counts');
  }
  
  if (inputs.outputPricePerToken && !separateInputOutputProvided) {
    errors.push('If providing output token price, you must also provide input token price and both token counts');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Individual field validation rules for the ValidationEngine
export const aiPromptCostValidationRules = [
  // Basic Usage
  ValidationRuleFactory.required('tokensPerRequest'),
  ValidationRuleFactory.positive('tokensPerRequest'),
  ValidationRuleFactory.range('tokensPerRequest', 1, 100000),
  
  ValidationRuleFactory.required('pricePerToken'),
  ValidationRuleFactory.positive('pricePerToken'),
  ValidationRuleFactory.range('pricePerToken', 0.000001, 1),
  
  ValidationRuleFactory.required('numberOfRequests'),
  ValidationRuleFactory.positive('numberOfRequests'),
  ValidationRuleFactory.range('numberOfRequests', 1, 10000000),
  
  // Advanced Options
  ValidationRuleFactory.required('modelType'),
  ValidationRuleFactory.required('usagePattern'),
  
  // Optional Parameters
  ValidationRuleFactory.range('inputTokens', 0, 50000),
  ValidationRuleFactory.range('outputTokens', 0, 50000),
  ValidationRuleFactory.range('inputPricePerToken', 0.000001, 1),
  ValidationRuleFactory.range('outputPricePerToken', 0.000001, 1),
  
  // Cross-field validations
  ValidationRuleFactory.businessRule(
    'inputTokens',
    (inputTokens, allInputs) => {
      if (!inputTokens) return true;
      return !!(allInputs?.outputTokens && allInputs?.inputPricePerToken && allInputs?.outputPricePerToken);
    },
    'If providing input tokens, you must also provide output tokens and both pricing values'
  ),
  
  ValidationRuleFactory.businessRule(
    'outputTokens',
    (outputTokens, allInputs) => {
      if (!outputTokens) return true;
      return !!(allInputs?.inputTokens && allInputs?.inputPricePerToken && allInputs?.outputPricePerToken);
    },
    'If providing output tokens, you must also provide input tokens and both pricing values'
  ),
  
  ValidationRuleFactory.businessRule(
    'tokensPerRequest',
    (tokensPerRequest, allInputs) => {
      const modelType = allInputs?.modelType;
      if (modelType === 'gpt-4' && tokensPerRequest > 8192) {
        return false;
      }
      if (modelType === 'gpt-3.5-turbo' && tokensPerRequest > 4096) {
        return false;
      }
      return true;
    },
    'Token count exceeds model context limit'
  ),
  
  ValidationRuleFactory.businessRule(
    'numberOfRequests',
    (numberOfRequests, allInputs) => {
      const tokensPerRequest = allInputs?.tokensPerRequest || 0;
      const totalTokens = numberOfRequests * tokensPerRequest;
      if (totalTokens > 1000000000) { // 1 billion tokens
        return false;
      }
      return true;
    },
    'Total token count (requests × tokens per request) exceeds reasonable limits'
  ),
  
  ValidationRuleFactory.businessRule(
    'pricePerToken',
    (pricePerToken, allInputs) => {
      const modelType = allInputs?.modelType;
      if (modelType === 'custom') return true;
      
      // Warn if custom pricing is significantly different from model presets
      const modelPricing: Record<string, number> = {
        'gpt-4': 0.000045, // Average of input/output
        'gpt-3.5-turbo': 0.00000175,
        'Claude3Opus': 0.000045,
        'Claude3Sonnet': 0.000009,
        'Claude3Haiku': 0.000000875
      };
      
      const expectedPrice = modelPricing[modelType];
      if (expectedPrice && Math.abs(pricePerToken - expectedPrice) > expectedPrice * 0.5) {
        // This is a warning, not an error
        return true;
      }
      return true;
    },
    'Custom pricing differs significantly from selected model preset'
  )
];

export default aiPromptCostValidationRules;
