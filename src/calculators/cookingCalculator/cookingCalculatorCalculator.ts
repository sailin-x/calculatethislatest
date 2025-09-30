import { Calculator } from '../../engines/CalculatorEngine';
import { cookingCalculatorInputs, cookingCalculatorResults, cookingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cookingCalculatorCalculator implements Calculator<cookingCalculatorInputs, cookingCalculatorResults> {
  readonly id = 'cookingCalculator';
  readonly name = 'cookingCalculator Calculator';
  readonly description = 'Calculate cookingCalculator values';

  calculate(inputs: cookingCalculatorInputs): cookingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cookingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cookingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
