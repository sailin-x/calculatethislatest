import { Calculator } from '../../engines/CalculatorEngine';
import { food_waste_calculatorCalculatorInputs, food_waste_calculatorCalculatorResults, food_waste_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class food_waste_calculatorCalculatorCalculator implements Calculator<food_waste_calculatorCalculatorInputs, food_waste_calculatorCalculatorResults> {
  readonly id = 'food_waste_calculatorCalculator';
  readonly name = 'food_waste_calculatorCalculator Calculator';
  readonly description = 'Calculate food_waste_calculatorCalculator values';

  calculate(inputs: food_waste_calculatorCalculatorInputs): food_waste_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: food_waste_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: food_waste_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
