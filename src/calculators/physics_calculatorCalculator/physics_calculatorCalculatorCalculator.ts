import { Calculator } from '../../engines/CalculatorEngine';
import { physics_calculatorCalculatorInputs, physics_calculatorCalculatorResults, physics_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class physics_calculatorCalculatorCalculator implements Calculator<physics_calculatorCalculatorInputs, physics_calculatorCalculatorResults> {
  readonly id = 'physics_calculatorCalculator';
  readonly name = 'physics_calculatorCalculator Calculator';
  readonly description = 'Calculate physics_calculatorCalculator values';

  calculate(inputs: physics_calculatorCalculatorInputs): physics_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: physics_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: physics_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
