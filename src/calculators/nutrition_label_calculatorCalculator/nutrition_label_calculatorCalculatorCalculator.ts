import { Calculator } from '../../engines/CalculatorEngine';
import { nutrition_label_calculatorCalculatorInputs, nutrition_label_calculatorCalculatorResults, nutrition_label_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class nutrition_label_calculatorCalculatorCalculator implements Calculator<nutrition_label_calculatorCalculatorInputs, nutrition_label_calculatorCalculatorResults> {
  readonly id = 'nutrition_label_calculatorCalculator';
  readonly name = 'nutrition_label_calculatorCalculator Calculator';
  readonly description = 'Calculate nutrition_label_calculatorCalculator values';

  calculate(inputs: nutrition_label_calculatorCalculatorInputs): nutrition_label_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: nutrition_label_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: nutrition_label_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
