import { calorie-calculatorInputs, calorie-calculatorMetrics, calorie-calculatorAnalysis } from './types';

// Calorie Calculator - BMR and TDEE
export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: string): number {
  // Mifflin-St Jeor Equation
  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9
  };
  return bmr * (multipliers[activityLevel] || 1.2);
}

export function calculateDailyCalories(tdee: number, goal: string): number {
  switch (goal) {
    case 'lose_weight': return tdee - 500;
    case 'gain_weight': return tdee + 500;
    default: return tdee;
  }
}

export function calculateResult(inputs: calorie-calculatorInputs): number {
  if ('weightKg' in inputs && 'heightCm' in inputs && 'age' in inputs && 'gender' in inputs) {
    const bmr = calculateBMR(inputs.weightKg, inputs.heightCm, inputs.age, inputs.gender);
    return calculateTDEE(bmr, inputs.activityLevel || 'sedentary');
  }
  return 0;
}

export function generateAnalysis(inputs: calorie-calculatorInputs, metrics: calorie-calculatorMetrics): calorie-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 1200 || result > 4000) riskLevel = 'High';
  else if (result < 1500 || result > 3000) riskLevel = 'Medium';

  const recommendation = 'Daily calorie needs calculated. Adjust based on specific health goals and consult nutritionist.';

  return { recommendation, riskLevel };
}