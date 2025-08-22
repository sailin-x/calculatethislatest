import { Calculator } from '../../../types/calculator';
import { AIPromptCostInputs, AIPromptCostOutputs } from './types';
import { validateAIPromptCostInputs } from './validation';
import { 
  calculateAIPromptCostMetrics,
  generateAIPromptCostReport
} from './formulas';

export class AIPromptCostCalculator implements Calculator<AIPromptCostInputs, AIPromptCostOutputs> {
  readonly id = 'ai-prompt-cost';
  readonly name = 'AI Prompt Cost & Token Estimator';
  readonly description = 'Calculate costs for AI API usage including tokens, requests, and pricing models';
  readonly category = 'technology';
  readonly tags = ['ai', 'api', 'tokens', 'cost', 'gpt', 'llm'];

  readonly inputs = {
    // Basic Usage
    tokensPerRequest: {
      type: 'number' as const,
      label: 'Tokens per Request',
      description: 'Average number of tokens consumed per API request',
      min: 1,
      max: 100000,
      step: 1,
      placeholder: 'e.g., 1500',
      unit: 'tokens',
      category: 'Basic Usage'
    },
    
    pricePerToken: {
      type: 'number' as const,
      label: 'Price per Token',
      description: 'Cost per token in USD (e.g., GPT-4: $0.00003)',
      min: 0.000001,
      max: 1,
      step: 0.000001,
      placeholder: 'e.g., 0.00003',
      unit: '$',
      category: 'Basic Usage'
    },

    numberOfRequests: {
      type: 'number' as const,
      label: 'Number of Requests',
      description: 'Total number of API requests planned',
      min: 1,
      max: 10000000,
      step: 1,
      placeholder: 'e.g., 1000',
      unit: 'requests',
      category: 'Basic Usage'
    },

    // Advanced Options
    modelType: {
      type: 'select' as const,
      label: 'AI Model Type',
      description: 'Select the AI model for preset pricing',
      options: [
        { value: 'custom', label: 'Custom Pricing' },
        { value: 'gpt-4', label: 'GPT-4 ($0.00003/token)' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo ($0.0000015/token)' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus ($0.000015/token)' },
        { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet ($0.000003/token)' },
        { value: 'claude-3-haiku', label: 'Claude 3 Haiku ($0.00000025/token)' }
      ],
      defaultValue: 'custom',
      category: 'Advanced Options'
    },

    usagePattern: {
      type: 'select' as const,
      label: 'Usage Pattern',
      description: 'Expected usage frequency',
      options: [
        { value: 'one-time', label: 'One-time Usage' },
        { value: 'daily', label: 'Daily Usage' },
        { value: 'weekly', label: 'Weekly Usage' },
        { value: 'monthly', label: 'Monthly Usage' }
      ],
      defaultValue: 'one-time',
      category: 'Advanced Options'
    },

    // Optional Parameters
    inputTokens: {
      type: 'number' as const,
      label: 'Input Tokens (Optional)',
      description: 'Number of input tokens if different pricing applies',
      min: 0,
      max: 50000,
      step: 1,
      placeholder: 'e.g., 800',
      unit: 'tokens',
      category: 'Advanced Options',
      isOptional: true
    },

    outputTokens: {
      type: 'number' as const,
      label: 'Output Tokens (Optional)',
      description: 'Number of output tokens if different pricing applies',
      min: 0,
      max: 50000,
      step: 1,
      placeholder: 'e.g., 700',
      unit: 'tokens',
      category: 'Advanced Options',
      isOptional: true
    },

    inputPricePerToken: {
      type: 'number' as const,
      label: 'Input Token Price (Optional)',
      description: 'Price per input token if different from output',
      min: 0.000001,
      max: 1,
      step: 0.000001,
      placeholder: 'e.g., 0.000015',
      unit: '$',
      category: 'Advanced Options',
      isOptional: true
    },

    outputPricePerToken: {
      type: 'number' as const,
      label: 'Output Token Price (Optional)',
      description: 'Price per output token if different from input',
      min: 0.000001,
      max: 1,
      step: 0.000001,
      placeholder: 'e.g., 0.00006',
      unit: '$',
      category: 'Advanced Options',
      isOptional: true
    }
  };

  readonly outputs = {
    // Cost Breakdown
    totalCost: {
      type: 'number' as const,
      label: 'Total Cost',
      description: 'Total cost for all API requests',
      unit: '$',
      precision: 6
    },

    costPerRequest: {
      type: 'number' as const,
      label: 'Cost per Request',
      description: 'Average cost per individual API request',
      unit: '$',
      precision: 6
    },

    costPerToken: {
      type: 'number' as const,
      label: 'Effective Cost per Token',
      description: 'Actual cost per token including all factors',
      unit: '$',
      precision: 8
    },

    // Usage Metrics
    totalTokens: {
      type: 'number' as const,
      label: 'Total Tokens',
      description: 'Total number of tokens that will be consumed',
      unit: 'tokens',
      precision: 0
    },

    // Time-based Projections
    dailyCost: {
      type: 'number' as const,
      label: 'Daily Cost',
      description: 'Projected daily cost based on usage pattern',
      unit: '$',
      precision: 4
    },

    monthlyCost: {
      type: 'number' as const,
      label: 'Monthly Cost',
      description: 'Projected monthly cost based on usage pattern',
      unit: '$',
      precision: 2
    },

    yearlyCost: {
      type: 'number' as const,
      label: 'Yearly Cost',
      description: 'Projected yearly cost based on usage pattern',
      unit: '$',
      precision: 2
    },

    // Budget Analysis
    costEfficiency: {
      type: 'text' as const,
      label: 'Cost Efficiency Rating',
      description: 'Assessment of cost efficiency for the selected model'
    },

    budgetRecommendation: {
      type: 'text' as const,
      label: 'Budget Recommendation',
      description: 'Recommended budget allocation and optimization tips'
    },

    report: {
      type: 'text' as const,
      label: 'Detailed Cost Analysis',
      description: 'Comprehensive AI usage cost analysis and recommendations'
    }
  };

  calculate(inputs: AIPromptCostInputs): AIPromptCostOutputs {
    const validation = validateAIPromptCostInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    const metrics = calculateAIPromptCostMetrics(inputs);
    const report = generateAIPromptCostReport(inputs, metrics);

    return {
      ...metrics,
      report
    };
  }
}

export const aiPromptCostCalculator = new AIPromptCostCalculator();
