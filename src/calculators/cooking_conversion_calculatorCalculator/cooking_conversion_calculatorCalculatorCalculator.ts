import { Calculator } from '../../engines/CalculatorEngine';
import { cooking_conversion_calculatorCalculatorInputs, cooking_conversion_calculatorCalculatorResults, cooking_conversion_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cooking_conversion_calculatorCalculatorCalculator implements Calculator<cooking_conversion_calculatorCalculatorInputs, cooking_conversion_calculatorCalculatorResults> {
  readonly id = 'cooking_conversion_calculatorCalculator';
  readonly name = 'cooking_conversion_calculatorCalculator Calculator';
  readonly description = 'Calculate cooking_conversion_calculatorCalculator values';

  calculate(inputs: cooking_conversion_calculatorCalculatorInputs): cooking_conversion_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cooking_conversion_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cooking_conversion_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
