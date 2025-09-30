import { Calculator } from '../../engines/CalculatorEngine';
import { car_accident_pain_calculatorCalculatorInputs, car_accident_pain_calculatorCalculatorResults, car_accident_pain_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class car_accident_pain_calculatorCalculatorCalculator implements Calculator<car_accident_pain_calculatorCalculatorInputs, car_accident_pain_calculatorCalculatorResults> {
  readonly id = 'car_accident_pain_calculatorCalculator';
  readonly name = 'car_accident_pain_calculatorCalculator Calculator';
  readonly description = 'Calculate car_accident_pain_calculatorCalculator values';

  calculate(inputs: car_accident_pain_calculatorCalculatorInputs): car_accident_pain_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: car_accident_pain_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: car_accident_pain_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
