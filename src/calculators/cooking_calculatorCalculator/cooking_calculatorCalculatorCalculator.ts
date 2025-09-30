import { Calculator } from '../../engines/CalculatorEngine';
import { cooking_calculatorCalculatorInputs, cooking_calculatorCalculatorResults, cooking_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cooking_calculatorCalculatorCalculator implements Calculator<cooking_calculatorCalculatorInputs, cooking_calculatorCalculatorResults> {
  readonly id = 'cooking_calculatorCalculator';
  readonly name = 'cooking_calculatorCalculator Calculator';
  readonly description = 'Calculate cooking_calculatorCalculator values';

  calculate(inputs: cooking_calculatorCalculatorInputs): cooking_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cooking_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cooking_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
