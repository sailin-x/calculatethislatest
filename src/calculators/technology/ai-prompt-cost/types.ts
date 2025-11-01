export interface AIPromptCostInputs {
  // Basic Usage
  tokensPerRequest: number;
  pricePerToken: number;
  numberOfRequests: number;
  
  // Advanced Options
  modelType: 'custom' | 'gpt-4' | 'gpt-3.5-turbo' | 'Claude3Opus' | 'Claude3Sonnet' | 'Claude3Haiku';
  usagePattern: 'one-time' | 'daily' | 'weekly' | 'monthly';
  
  // Optional Parameters
  inputTokens?: number;
  outputTokens?: number;
  inputPricePerToken?: number;
  outputPricePerToken?: number;
}

export interface AIPromptCostOutputs {
  // Cost Breakdown
  totalCost: number;
  costPerRequest: number;
  costPerToken: number;
  
  // Usage Metrics
  totalTokens: number;
  
  // Time-based Projections
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  
  // Budget Analysis
  costEfficiency: string;
  budgetRecommendation: string;
  report: string;
}

export interface AIPromptCostMetrics {
  // Cost Breakdown
  totalCost: number;
  costPerRequest: number;
  costPerToken: number;
  
  // Usage Metrics
  totalTokens: number;
  
  // Time-based Projections
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  
  // Budget Analysis
  costEfficiency: string;
  budgetRecommendation: string;
  
  // Additional calculations
  effectiveTokenPrice: number;
  usageMultiplier: number;
  separateInputOutputPricing: boolean;
  inputCost: number;
  outputCost: number;
  modelPresetUsed: boolean;
}
