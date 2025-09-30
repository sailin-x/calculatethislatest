import { daily_calorie_calculatorCalculatorInputs, daily_calorie_calculatorCalculatorMetrics, daily_calorie_calculatorCalculatorAnalysis } from './types';


// Calorie Calculator - Nutrition calculations
export function calculateTDEE(bmr: number, activityLevel: number): number {
  const multipliers = {
    1: 1.2,   // Sedentary
    2: 1.375, // Lightly active
    3: 1.55,  // Moderately active
    4: 1.725, // Very active
    5: 1.9    // Extremely active
  };
  return bmr * (multipliers[activityLevel] || 1.2);
}

export function calculateCalorieDeficit(currentCalories: number, targetCalories: number): number {
  return currentCalories - targetCalories;
}

export function calculateWeightLossRate(calorieDeficit: number): number {
  // 1 pound = 3500 calories
  return calorieDeficit * 7 / 3500; // pounds per week
}

export function calculateResult(inputs: daily_calorie_calculatorCalculatorInputs): number {
  // Use domain-specific calculations based on input properties
  try {
    // Try to match inputs to appropriate calculation
    if ('principal' in inputs && 'annualRate' in inputs && 'years' in inputs) {
      return calculateMonthlyPayment(inputs.principal, inputs.annualRate, inputs.years);
    }
    if ('initialInvestment' in inputs && 'finalValue' in inputs) {
      return calculateROI(inputs.initialInvestment, inputs.finalValue);
    }
    if ('weightKg' in inputs && 'heightCm' in inputs) {
      return calculateBMI(inputs.weightKg, inputs.heightCm);
    }
    if ('value' in inputs && 'percentage' in inputs) {
      return calculatePercentage(inputs.value, inputs.percentage);
    }
    // Fallback to basic calculation
    return inputs.value || inputs.amount || inputs.principal || 0;
  } catch (error) {
    console.warn('Calculation error:', error);
    return 0;
  }
}

export function generateAnalysis(inputs: daily_calorie_calculatorCalculatorInputs, metrics: daily_calorie_calculatorCalculatorMetrics): daily_calorie_calculatorCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}
