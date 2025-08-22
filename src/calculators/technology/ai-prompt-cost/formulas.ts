import { AIPromptCostInputs, AIPromptCostMetrics } from './types';

// Model pricing presets (as of 2024)
const MODEL_PRICING = {
  'gpt-4': { input: 0.00003, output: 0.00006 },
  'gpt-3.5-turbo': { input: 0.0000015, output: 0.000002 },
  'claude-3-opus': { input: 0.000015, output: 0.000075 },
  'claude-3-sonnet': { input: 0.000003, output: 0.000015 },
  'claude-3-haiku': { input: 0.00000025, output: 0.00000125 }
};

export function calculateAIPromptCostMetrics(inputs: AIPromptCostInputs): AIPromptCostMetrics {
  const {
    tokensPerRequest,
    pricePerToken,
    numberOfRequests,
    modelType,
    usagePattern,
    inputTokens,
    outputTokens,
    inputPricePerToken,
    outputPricePerToken
  } = inputs;

  // Determine if using separate input/output pricing
  const separateInputOutputPricing = !!(inputTokens && outputTokens && inputPricePerToken && outputPricePerToken);
  const modelPresetUsed = modelType !== 'custom' && MODEL_PRICING[modelType as keyof typeof MODEL_PRICING];

  let effectiveInputPrice = pricePerToken;
  let effectiveOutputPrice = pricePerToken;
  let effectiveInputTokens = tokensPerRequest;
  let effectiveOutputTokens = 0;

  // Apply model presets if selected
  if (modelPresetUsed) {
    const preset = MODEL_PRICING[modelType as keyof typeof MODEL_PRICING];
    effectiveInputPrice = preset.input;
    effectiveOutputPrice = preset.output;
    
    // If separate tokens provided, use them; otherwise split evenly
    if (separateInputOutputPricing) {
      effectiveInputTokens = inputTokens!;
      effectiveOutputTokens = outputTokens!;
    } else {
      effectiveInputTokens = Math.ceil(tokensPerRequest * 0.6); // Assume 60% input
      effectiveOutputTokens = Math.floor(tokensPerRequest * 0.4); // Assume 40% output
    }
  } else if (separateInputOutputPricing) {
    effectiveInputPrice = inputPricePerToken!;
    effectiveOutputPrice = outputPricePerToken!;
    effectiveInputTokens = inputTokens!;
    effectiveOutputTokens = outputTokens!;
  }

  // Calculate costs
  const inputCost = effectiveInputTokens * effectiveInputPrice * numberOfRequests;
  const outputCost = effectiveOutputTokens * effectiveOutputPrice * numberOfRequests;
  const totalCost = separateInputOutputPricing || modelPresetUsed ? 
    inputCost + outputCost : 
    tokensPerRequest * pricePerToken * numberOfRequests;

  const costPerRequest = totalCost / numberOfRequests;
  const totalTokens = separateInputOutputPricing || modelPresetUsed ?
    (effectiveInputTokens + effectiveOutputTokens) * numberOfRequests :
    tokensPerRequest * numberOfRequests;
  const costPerToken = totalCost / totalTokens;
  const effectiveTokenPrice = costPerToken;

  // Usage pattern multipliers for projections
  const usageMultipliers = {
    'one-time': { daily: 0, monthly: 0, yearly: 0 },
    'daily': { daily: 1, monthly: 30, yearly: 365 },
    'weekly': { daily: 1/7, monthly: 30/7, yearly: 52 },
    'monthly': { daily: 1/30, monthly: 1, yearly: 12 }
  };

  const multiplier = usageMultipliers[usagePattern];
  const usageMultiplierValue = multiplier.daily;

  const dailyCost = totalCost * multiplier.daily;
  const monthlyCost = totalCost * multiplier.monthly;
  const yearlyCost = totalCost * multiplier.yearly;

  // Cost efficiency assessment
  const costEfficiency = assessCostEfficiency(costPerToken, modelType, totalTokens);
  const budgetRecommendation = generateBudgetRecommendation(inputs, {
    totalCost,
    dailyCost,
    monthlyCost,
    yearlyCost,
    costPerToken
  });

  return {
    totalCost,
    costPerRequest,
    costPerToken,
    totalTokens,
    dailyCost,
    monthlyCost,
    yearlyCost,
    costEfficiency,
    budgetRecommendation,
    effectiveTokenPrice,
    usageMultiplier: usageMultiplierValue,
    separateInputOutputPricing,
    inputCost,
    outputCost,
    modelPresetUsed
  };
}

function assessCostEfficiency(costPerToken: number, modelType: string, totalTokens: number): string {
  if (modelType === 'claude-3-haiku' || costPerToken < 0.000005) {
    return 'Excellent - Very cost-effective for high-volume usage';
  } else if (modelType === 'gpt-3.5-turbo' || costPerToken < 0.000015) {
    return 'Good - Balanced cost and performance';
  } else if (modelType === 'claude-3-sonnet' || costPerToken < 0.00003) {
    return 'Moderate - Higher cost but better quality';
  } else if (modelType === 'gpt-4' || costPerToken < 0.00006) {
    return 'Premium - High cost but top-tier performance';
  } else {
    return 'Expensive - Consider optimizing token usage or switching models';
  }
}

function generateBudgetRecommendation(inputs: AIPromptCostInputs, costs: any): string {
  const { numberOfRequests, usagePattern, modelType } = inputs;
  const { monthlyCost, costPerToken } = costs;

  let recommendations = [];

  // Volume-based recommendations
  if (numberOfRequests > 10000) {
    recommendations.push('Consider negotiating enterprise pricing for high-volume usage');
  }

  // Cost optimization recommendations
  if (costPerToken > 0.00003) {
    recommendations.push('Consider using a more cost-effective model like GPT-3.5 Turbo or Claude Haiku for routine tasks');
  }

  // Usage pattern recommendations
  if (usagePattern === 'daily' && monthlyCost > 1000) {
    recommendations.push('Implement token optimization strategies to reduce monthly costs');
  }

  // Model-specific recommendations
  if (modelType === 'custom' && costPerToken > 0.00005) {
    recommendations.push('Your custom pricing is higher than premium models - verify pricing accuracy');
  }

  return recommendations.length > 0 ? recommendations.join('. ') : 'Current usage appears cost-optimized for your requirements';
}

export function generateAIPromptCostReport(
  inputs: AIPromptCostInputs,
  metrics: AIPromptCostMetrics
): string {
  const {
    tokensPerRequest,
    pricePerToken,
    numberOfRequests,
    modelType,
    usagePattern
  } = inputs;

  const {
    totalCost,
    costPerRequest,
    costPerToken,
    totalTokens,
    dailyCost,
    monthlyCost,
    yearlyCost,
    costEfficiency,
    budgetRecommendation,
    separateInputOutputPricing,
    inputCost,
    outputCost,
    modelPresetUsed
  } = metrics;

  return `# AI Prompt Cost & Token Analysis Report

## Executive Summary

**Total Cost:** $${totalCost.toFixed(6)}
**Cost per Request:** $${costPerRequest.toFixed(6)}
**Cost Efficiency:** ${costEfficiency}
**Usage Pattern:** ${usagePattern.charAt(0).toUpperCase() + usagePattern.slice(1)}

## Configuration Details

### Model Configuration
- **Model:** ${modelPresetUsed ? modelType.toUpperCase() : 'Custom Pricing'}
- **Tokens per Request:** ${tokensPerRequest.toLocaleString()}
- **Total Requests:** ${numberOfRequests.toLocaleString()}
- **Total Tokens:** ${totalTokens.toLocaleString()}

### Pricing Structure
${separateInputOutputPricing ? `
- **Input Cost:** $${inputCost.toFixed(6)} (${Math.round((inputCost/totalCost)*100)}% of total)
- **Output Cost:** $${outputCost.toFixed(6)} (${Math.round((outputCost/totalCost)*100)}% of total)
- **Blended Rate:** $${costPerToken.toFixed(8)} per token
` : `
- **Price per Token:** $${pricePerToken.toFixed(8)}
- **Effective Rate:** $${costPerToken.toFixed(8)} per token
`}

## Cost Projections

### Usage-Based Projections
- **One-time Cost:** $${totalCost.toFixed(6)}
- **Daily Cost:** $${dailyCost.toFixed(4)}
- **Monthly Cost:** $${monthlyCost.toFixed(2)}
- **Yearly Cost:** $${yearlyCost.toFixed(2)}

### Volume Analysis
- **Cost per 1K tokens:** $${(costPerToken * 1000).toFixed(6)}
- **Cost per 10K tokens:** $${(costPerToken * 10000).toFixed(4)}
- **Cost per 100K tokens:** $${(costPerToken * 100000).toFixed(2)}

## Budget Recommendations

### Optimization Strategies
${budgetRecommendation}

### Cost Comparison
${getModelComparison(inputs, metrics)}

### Budget Planning
${getBudgetPlanningAdvice(metrics)}

## Risk Assessment

### Cost Volatility
- **Price Stability:** ${modelPresetUsed ? 'Stable (using standard model pricing)' : 'Variable (custom pricing)'}
- **Volume Risk:** ${numberOfRequests > 100000 ? 'High volume - monitor usage closely' : 'Standard volume'}

### Recommendations
${getUsageRecommendations(inputs, metrics)}

---

*This analysis is based on current pricing and usage patterns. Actual costs may vary based on API changes, usage spikes, and model updates.*`;
}

function getModelComparison(inputs: AIPromptCostInputs, metrics: AIPromptCostMetrics): string {
  const { tokensPerRequest, numberOfRequests } = inputs;
  const { costPerToken } = metrics;
  
  const comparisons = [];
  
  for (const [model, pricing] of Object.entries(MODEL_PRICING)) {
    const avgPrice = (pricing.input + pricing.output) / 2;
    const modelCost = tokensPerRequest * numberOfRequests * avgPrice;
    const savings = ((costPerToken - avgPrice) / costPerToken) * 100;
    
    if (Math.abs(savings) > 5) {
      comparisons.push(`- **${model.toUpperCase()}:** $${modelCost.toFixed(6)} (${savings > 0 ? savings.toFixed(1) + '% cheaper' : Math.abs(savings).toFixed(1) + '% more expensive'})`);
    }
  }
  
  return comparisons.length > 0 ? 
    'Alternative model costs:\n' + comparisons.slice(0, 3).join('\n') :
    'Current pricing is competitive with standard models';
}

function getBudgetPlanningAdvice(metrics: AIPromptCostMetrics): string {
  const { monthlyCost, yearlyCost } = metrics;
  
  if (monthlyCost < 10) {
    return 'Low-cost usage - minimal budget impact';
  } else if (monthlyCost < 100) {
    return 'Moderate usage - consider setting monthly spending alerts';
  } else if (monthlyCost < 1000) {
    return 'Significant usage - implement cost monitoring and optimization strategies';
  } else {
    return 'High-volume usage - consider enterprise pricing and dedicated cost management';
  }
}

function getUsageRecommendations(inputs: AIPromptCostInputs, metrics: AIPromptCostMetrics): string {
  const { usagePattern, numberOfRequests } = inputs;
  const { costPerToken } = metrics;
  
  const recommendations = [];
  
  if (usagePattern === 'daily' && numberOfRequests > 1000) {
    recommendations.push('Consider batch processing to optimize API calls');
  }
  
  if (costPerToken > 0.00005) {
    recommendations.push('Implement prompt optimization to reduce token usage');
  }
  
  if (numberOfRequests > 50000) {
    recommendations.push('Monitor usage patterns for potential cost optimization opportunities');
  }
  
  return recommendations.length > 0 ? recommendations.join('\n- ') : 'Current usage pattern appears optimized';
}
