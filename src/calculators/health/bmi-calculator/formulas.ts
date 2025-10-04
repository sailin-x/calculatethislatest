```typescript
import { BMICalculatorInputs, BMICalculatorMetrics, BMICalculatorAnalysis } from './types';

/**
 * Calculates the Body Mass Index (BMI) using the standard formula:
 * BMI = weight (kg) / (height (m) ^ 2)
 * 
 * This is the World Health Organization (WHO) standard formula for adults.
 * Assumes inputs are provided in kg and meters.
 * 
 * @param inputs - The BMI calculator inputs containing weight and height.
 * @returns The calculated BMI as a number (typically rounded to 2 decimal places in display, but raw here).
 */
export function calculateResult(inputs: BMICalculatorInputs): number {
  const { weight, height } = inputs;
  
  // Validate inputs (basic production-ready checks)
  if (weight <= 0 || height <= 0) {
    throw new Error('Weight and height must be positive values.');
  }
  
  // Core BMI formula
  return weight / (height * height);
}

/**
 * Generates a health analysis based on the BMI result, including risk level and recommendation.
 * Uses WHO BMI categories for adults (18+ years):
 * - Underweight: < 18.5
 * - Normal: 18.5 - 24.9
 * - Overweight: 25 - 29.9
 * - Obese: >= 30
 * 
 * Risk levels are assigned as follows:
 * - Low: Normal weight
 * - Medium: Underweight or Overweight
 * - High: Obese
 * 
 * Recommendations are tailored to the category and include general advice.
 * Note: This is not medical advice; users should consult professionals.
 * 
 * @param inputs - The original inputs for context (e.g., weight, height).
 * @param metrics - The metrics containing the calculated BMI result.
 * @returns An analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: BMICalculatorInputs, 
  metrics: BMICalculatorMetrics
): BMICalculatorAnalysis {
  const bmi = metrics.result;
  const { weight, height } = inputs;
  
  let category: string;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation: string;

  if (bmi < 18.5) {
    category = 'Underweight';
    riskLevel = 'Medium';
    recommendation = `Your BMI of ${bmi.toFixed(1)} indicates you are underweight. This may increase risks for nutritional deficiencies, osteoporosis, or weakened immunity. Consider consulting a healthcare professional or nutritionist to develop a plan for healthy weight gain through balanced diet and exercise.`;
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    riskLevel = 'Low';
    recommendation = `Your BMI of ${bmi.toFixed(1)} falls within the normal weight range. This is associated with the lowest risk of health issues. Maintain this by continuing a balanced diet, regular physical activity, and routine health check-ups.`;
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    riskLevel = 'Medium';
    recommendation = `Your BMI of ${bmi.toFixed(1)} indicates you are overweight. This may elevate risks for conditions like type 2 diabetes, heart disease, or hypertension. Aim for gradual weight loss through a calorie-controlled diet, increased physical activity (e.g., 150 minutes/week), and professional guidance if needed.`;
  } else {
    category = 'Obese';
    riskLevel = 'High';
    recommendation = `Your BMI of ${bmi.toFixed(1)} classifies you as obese. This is linked to higher risks of serious conditions such as cardiovascular disease, stroke, or certain cancers. Seek immediate advice from a doctor or specialist for a personalized management plan, including diet, exercise, and possibly medical interventions.`;
  }

  return {
    recommendation,
    riskLevel,
    // Optional: Include category for UI display if needed in types
    category,
  };
}
```