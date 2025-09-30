import { Calculator } from '../../engines/CalculatorEngine';
import { baking_calculatorCalculatorInputs, baking_calculatorCalculatorResults, baking_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class baking_calculatorCalculatorCalculator implements Calculator<baking_calculatorCalculatorInputs, baking_calculatorCalculatorResults> {
  readonly id = 'baking_calculatorCalculator';
  readonly name = 'baking_calculatorCalculator Calculator';
  readonly description = 'Calculate baking_calculatorCalculator values';

  calculate(inputs: baking_calculatorCalculatorInputs): baking_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: baking_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: baking_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
