import { Calculator, CalculatorInput, CalculatorOutput, Formula, ValidationRule, CalculatorExample } from '../../types/calculator';
import { AIPromptCostInputs, AIPromptCostOutputs } from './types';
import { validateAIPromptCostInputs } from './validation';
import {
  calculateAIPromptCostMetrics,
  generateAIPromptCostReport
} from './formulas';

export class AIPromptCostCalculator implements Calculator {
  readonly id = 'ai-prompt-cost';
  readonly title = 'AI Prompt Cost & Token Estimator';
  readonly description = 'Calculate costs for AI API usage including tokens, requests, and pricing models';
  readonly category = 'business';
  readonly subcategory = 'Technology';
  readonly usageInstructions = [
    'Enter your expected token usage per request',
    'Specify the price per token or select a model for preset pricing',
    'Choose your expected number of API requests',
    'Select usage pattern for cost projections',
    'Review the detailed cost analysis and recommendations'
  ];
  readonly tags = ['ai', 'api', 'tokens', 'cost', 'gpt', 'llm'];

  readonly inputs: CalculatorInput[] = [
    // Basic Usage
    {
      id: 'tokensPerRequest',
      label: 'Tokens per Request',
      type: 'number',
      required: true,
      min: 1,
      max: 100000,
      step: 1,
      placeholder: 'e.g., 1500',
      tooltip: 'Average number of tokens consumed per API request'
    },

    {
      id: 'pricePerToken',
      label: 'Price per Token',
      type: 'number',
      required: true,
      min: 0.000001,
      max: 1,
      step: 0.000001,
      placeholder: 'e.g., 0.00003',
      tooltip: 'Cost per token in USD (e.g., GPT-4: $0.00003)'
    },

    {
      id: 'numberOfRequests',
      label: 'Number of Requests',
      type: 'number',
      required: true,
      min: 1,
      max: 10000000,
      step: 1,
      placeholder: 'e.g., 1000',
      tooltip: 'Total number of API requests planned'
    },

    // Advanced Options
    {
      id: 'modelType',
      label: 'AI Model Type',
      type: 'select',
      required: false,
      options: [
        { value: 'custom', label: 'Custom Pricing' },
        { value: 'gpt-4', label: 'GPT-4 ($0.00003/token)' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo ($0.0000015/token)' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus ($0.000015/token)' },
        { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet ($0.000003/token)' },
        { value: 'claude-3-haiku', label: 'Claude 3 Haiku ($0.00000025/token)' }
      ],
      defaultValue: 'custom',
      tooltip: 'Select the AI model for preset pricing'
    },

    {
      id: 'usagePattern',
      label: 'Usage Pattern',
      type: 'select',
      required: false,
      options: [
        { value: 'one-time', label: 'One-time Usage' },
        { value: 'daily', label: 'Daily Usage' },
        { value: 'weekly', label: 'Weekly Usage' },
        { value: 'monthly', label: 'Monthly Usage' }
      ],
      defaultValue: 'one-time',
      tooltip: 'Expected usage frequency'
    },

    // Optional Parameters
    {
      id: 'inputTokens',
      label: 'Input Tokens (Optional)',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 1,
      placeholder: 'e.g., 800',
      tooltip: 'Number of input tokens if different pricing applies'
    },

    {
      id: 'outputTokens',
      label: 'Output Tokens (Optional)',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 1,
      placeholder: 'e.g., 700',
      tooltip: 'Number of output tokens if different pricing applies'
    },

    {
      id: 'inputPricePerToken',
      label: 'Input Token Price (Optional)',
      type: 'number',
      required: false,
      min: 0.000001,
      max: 1,
      step: 0.000001,
      placeholder: 'e.g., 0.000015',
      tooltip: 'Price per input token if different from output'
    },

    {
      id: 'outputPricePerToken',
      label: 'Output Token Price (Optional)',
      type: 'number',
      required: false,
      min: 0.000001,
      max: 1,
      step: 0.000001,
      placeholder: 'e.g., 0.00006',
      tooltip: 'Price per output token if different from input'
    }
  ];

  readonly outputs: CalculatorOutput[] = [
    // Cost Breakdown
    {
      id: 'totalCost',
      label: 'Total Cost',
      type: 'currency',
      explanation: 'Total cost for all API requests'
    },

    {
      id: 'costPerRequest',
      label: 'Cost per Request',
      type: 'currency',
      explanation: 'Average cost per individual API request'
    },

    {
      id: 'costPerToken',
      label: 'Effective Cost per Token',
      type: 'currency',
      explanation: 'Actual cost per token including all factors'
    },

    // Usage Metrics
    {
      id: 'totalTokens',
      label: 'Total Tokens',
      type: 'number',
      explanation: 'Total number of tokens that will be consumed'
    },

    // Time-based Projections
    {
      id: 'dailyCost',
      label: 'Daily Cost',
      type: 'currency',
      explanation: 'Projected daily cost based on usage pattern'
    },

    {
      id: 'monthlyCost',
      label: 'Monthly Cost',
      type: 'currency',
      explanation: 'Projected monthly cost based on usage pattern'
    },

    {
      id: 'yearlyCost',
      label: 'Yearly Cost',
      type: 'currency',
      explanation: 'Projected yearly cost based on usage pattern'
    },

    // Budget Analysis
    {
      id: 'costEfficiency',
      label: 'Cost Efficiency Rating',
      type: 'text',
      explanation: 'Assessment of cost efficiency for the selected model'
    },

    {
      id: 'budgetRecommendation',
      label: 'Budget Recommendation',
      type: 'text',
      explanation: 'Recommended budget allocation and optimization tips'
    },

    {
      id: 'report',
      label: 'Detailed Cost Analysis',
      type: 'text',
      explanation: 'Comprehensive AI usage cost analysis and recommendations'
    }
  ];

  readonly formulas: Formula[] = [
    {
      id: 'ai-cost-calculation',
      name: 'AI Cost Calculation',
      description: 'Calculate total cost for AI API usage based on tokens and pricing',
      calculate: (inputs: Record<string, any>) => {
        const metrics = calculateAIPromptCostMetrics(inputs as AIPromptCostInputs);
        return {
          outputs: metrics
        };
      }
    }
  ];

  readonly validationRules: ValidationRule[] = [
    {
      field: 'tokensPerRequest',
      type: 'range',
      message: 'Tokens per request must be between 1 and 100,000',
      validator: (value: any) => typeof value === 'number' && value >= 1 && value <= 100000
    },
    {
      field: 'pricePerToken',
      type: 'range',
      message: 'Price per token must be between $0.000001 and $1.00',
      validator: (value: any) => typeof value === 'number' && value >= 0.000001 && value <= 1
    },
    {
      field: 'numberOfRequests',
      type: 'range',
      message: 'Number of requests must be between 1 and 10,000,000',
      validator: (value: any) => typeof value === 'number' && value >= 1 && value <= 10000000
    }
  ];

  readonly examples: CalculatorExample[] = [
    {
      title: 'GPT-4 Monthly Usage',
      description: 'Calculate monthly cost for GPT-4 API usage',
      inputs: {
        tokensPerRequest: 1500,
        pricePerToken: 0.00003,
        numberOfRequests: 10000,
        usagePattern: 'monthly'
      },
      expectedOutputs: {
        totalCost: 450,
        monthlyCost: 450,
        costEfficiency: 'High efficiency for GPT-4 usage'
      }
    },
    {
      title: 'Small Business Chatbot',
      description: 'Cost analysis for a small business chatbot',
      inputs: {
        tokensPerRequest: 800,
        pricePerToken: 0.0000015,
        numberOfRequests: 50000,
        usagePattern: 'monthly'
      },
      expectedOutputs: {
        totalCost: 60,
        monthlyCost: 60,
        costEfficiency: 'Cost-effective for GPT-3.5 Turbo'
      }
    }
  ];

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
