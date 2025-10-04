```typescript
import { HomeImprovementCalculatorInputs, HomeImprovementCalculatorMetrics, HomeImprovementCalculatorAnalysis } from './types';

function getBaseCostPerSqFt(projectType: string): number {
  const type = projectType.toLowerCase().trim();
  switch (type) {
    case 'kitchen remodel':
      return 150; // Average base cost per sq ft for kitchen remodel
    case 'bathroom remodel':
      return 100; // Average base cost per sq ft for bathroom remodel
    case 'roof replacement':
      return 400; // Average base cost per sq ft for roofing (note: often calculated in "squares" of 100 sq ft, but normalized here)
    case 'deck addition':
      return 50; // Average base cost per sq ft for deck addition
    default:
      return 75; // Generic fallback for other projects
  }
}

function getQualityMultiplier(qualityLevel: 'Low' | 'Medium' | 'High'): number {
  switch (qualityLevel) {
    case 'Low':
      return 0.8; // Basic materials and finishes
    case 'Medium':
      return 1.0; // Standard quality
    case 'High':
      return 1.3; // Premium materials and custom features
    default:
      return 1.0;
  }
}

export function calculateResult(inputs: HomeImprovementCalculatorInputs): number {
  const baseCostPerSqFt = getBaseCostPerSqFt(inputs.projectType);
  const qualityMultiplier = getQualityMultiplier(inputs.qualityLevel);
  const locationMultiplier = inputs.locationMultiplier ?? 1.0; // Default to 1.0 if not provided (national average)

  // Core formula: Total Cost = (Base Cost per Sq Ft × Square Footage × Quality Multiplier × Location Multiplier) + Fixed Costs
  // Fixed costs include permits, design fees, and contingencies (realistic estimate: $1,000–$5,000; using $1,500 average)
  const variableCost = baseCostPerSqFt * inputs.squareFootage * qualityMultiplier * locationMultiplier;
  const fixedCosts = 1500;

  return variableCost + fixedCosts;
}

export function generateAnalysis(
  inputs: HomeImprovementCalculatorInputs,
  metrics: HomeImprovementCalculatorMetrics
): HomeImprovementCalculatorAnalysis {
  const result = metrics.result; // Total estimated cost
  const homeValue = inputs.homeValue ?? 300000; // Fallback to average US home value if not provided
  const costToValueRatio = result / homeValue;

  // Risk assessment: Based on cost as percentage of home value
  // - Low: <5% (typical for minor improvements)
  // - Medium: 5–10% (major but manageable)
  // - High: >10% (potential financial strain; consult advisor)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (costToValueRatio > 0.10) {
    riskLevel = 'High';
  } else if (costToValueRatio > 0.05) {
    riskLevel = 'Medium';
  }

  // Generate recommendation based on risk level and key metrics
  let recommendation: string;
  const percentageOfHomeValue = (costToValueRatio * 100);
  switch (riskLevel) {
    case 'Low':
      recommendation = `The estimated cost of $${result.toFixed(0)} is a low-risk investment at ${percentageOfHomeValue.toFixed(1)}% of your home value. This project could enhance livability without significant financial strain. Proceed with local contractor quotes for accuracy.`;
      break;
    case 'Medium':
      recommendation = `The estimated cost of $${result.toFixed(0)} represents ${percentageOfHomeValue.toFixed(1)}% of your home value, indicating medium risk. Focus on high-ROI aspects like energy-efficient materials to maximize value. Get multiple bids and consider financing options.`;
      break;
    case 'High':
      recommendation = `The estimated cost of $${result.toFixed(0)} is ${percentageOfHomeValue.toFixed(1)}% of your home value, posing high financial risk. Reassess project scope, prioritize essentials, or phase the work. Consult a financial advisor before committing.`;
      break;
    default:
      recommendation = 'Review your inputs and recalculate for a personalized analysis.';
  }

  return { recommendation, riskLevel };
}
```