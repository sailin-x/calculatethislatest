// Quick validation functions for real-time field validation
// CRITICAL: All validation functions MUST include allInputs parameter to prevent runtime errors

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateTokensPerRequest(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Tokens per request must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Tokens per request must be positive' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Tokens per request cannot exceed 100,000' };
  }
  
  // Model-specific validation
  if (allInputs?.modelType === 'gpt-4' && value > 8192) {
    return { isValid: false, message: 'GPT-4 has a maximum context of 8,192 tokens' };
  }
  if (allInputs?.modelType === 'gpt-3.5-turbo' && value > 4096) {
    return { isValid: false, message: 'GPT-3.5 Turbo has a maximum context of 4,096 tokens' };
  }
  
  return { isValid: true };
}

export function validatePricePerToken(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Price per token must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Price per token must be positive' };
  }
  if (value > 1) {
    return { isValid: false, message: 'Price per token cannot exceed $1.00' };
  }
  if (value < 0.000001) {
    return { isValid: false, message: 'Price per token must be at least $0.000001' };
  }
  
  // Model preset warning
  if (allInputs?.modelType && allInputs.modelType !== 'custom') {
    const modelPricing: Record<string, number> = {
      'gpt-4': 0.000045,
      'gpt-3.5-turbo': 0.00000175,
      'claude-3-opus': 0.000045,
      'claude-3-sonnet': 0.000009,
      'claude-3-haiku': 0.000000875
    };
    
    const expectedPrice = modelPricing[allInputs.modelType];
    if (expectedPrice && Math.abs(value - expectedPrice) > expectedPrice * 0.3) {
      return { isValid: true, message: `Warning: Price differs from ${allInputs.modelType} standard pricing` };
    }
  }
  
  return { isValid: true };
}

export function validateNumberOfRequests(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Number of requests must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Number of requests must be positive' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Number of requests cannot exceed 10,000,000' };
  }
  
  // Total token validation
  if (allInputs?.tokensPerRequest) {
    const totalTokens = value * allInputs.tokensPerRequest;
    if (totalTokens > 1000000000) {
      return { isValid: false, message: 'Total tokens would exceed 1 billion - reduce requests or tokens per request' };
    }
    if (totalTokens > 100000000) {
      return { isValid: true, message: 'Warning: High token volume - consider cost implications' };
    }
  }
  
  return { isValid: true };
}

export function validateInputTokens(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true }; // Optional field
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Input tokens must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Input tokens cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Input tokens cannot exceed 50,000' };
  }
  
  // Require complete separate pricing setup
  if (value > 0 && (!allInputs?.outputTokens || !allInputs?.inputPricePerToken || !allInputs?.outputPricePerToken)) {
    return { isValid: false, message: 'Separate input/output pricing requires all four fields' };
  }
  
  return { isValid: true };
}

export function validateOutputTokens(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true }; // Optional field
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Output tokens must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Output tokens cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Output tokens cannot exceed 50,000' };
  }
  
  // Require complete separate pricing setup
  if (value > 0 && (!allInputs?.inputTokens || !allInputs?.inputPricePerToken || !allInputs?.outputPricePerToken)) {
    return { isValid: false, message: 'Separate input/output pricing requires all four fields' };
  }
  
  return { isValid: true };
}

export function validateInputPricePerToken(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true }; // Optional field
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Input price per token must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Input price per token must be positive' };
  }
  if (value > 1) {
    return { isValid: false, message: 'Input price per token cannot exceed $1.00' };
  }
  if (value < 0.000001) {
    return { isValid: false, message: 'Input price per token must be at least $0.000001' };
  }
  
  // Require complete separate pricing setup
  if (value > 0 && (!allInputs?.inputTokens || !allInputs?.outputTokens || !allInputs?.outputPricePerToken)) {
    return { isValid: false, message: 'Separate input/output pricing requires all four fields' };
  }
  
  return { isValid: true };
}

export function validateOutputPricePerToken(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true }; // Optional field
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Output price per token must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Output price per token must be positive' };
  }
  if (value > 1) {
    return { isValid: false, message: 'Output price per token cannot exceed $1.00' };
  }
  if (value < 0.000001) {
    return { isValid: false, message: 'Output price per token must be at least $0.000001' };
  }
  
  // Require complete separate pricing setup
  if (value > 0 && (!allInputs?.inputTokens || !allInputs?.outputTokens || !allInputs?.inputPricePerToken)) {
    return { isValid: false, message: 'Separate input/output pricing requires all four fields' };
  }
  
  // Validate that output pricing is typically higher than input
  if (allInputs?.inputPricePerToken && value < allInputs.inputPricePerToken) {
    return { isValid: true, message: 'Note: Output tokens are typically more expensive than input tokens' };
  }
  
  return { isValid: true };
}

export function validateModelType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validModels = ['custom', 'gpt-4', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'];
  
  if (!value || !validModels.includes(value)) {
    return { isValid: false, message: 'Please select a valid model type' };
  }
  
  return { isValid: true };
}

export function validateUsagePattern(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validPatterns = ['one-time', 'daily', 'weekly', 'monthly'];
  
  if (!value || !validPatterns.includes(value)) {
    return { isValid: false, message: 'Please select a valid usage pattern' };
  }
  
  return { isValid: true };
}
