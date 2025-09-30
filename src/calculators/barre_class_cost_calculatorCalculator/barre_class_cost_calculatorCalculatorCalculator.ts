import { Calculator } from '../../engines/CalculatorEngine';
import { barre_class_cost_calculatorCalculatorInputs, barre_class_cost_calculatorCalculatorResults, barre_class_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class barre_class_cost_calculatorCalculatorCalculator implements Calculator<barre_class_cost_calculatorCalculatorInputs, barre_class_cost_calculatorCalculatorResults> {
  readonly id = 'barre_class_cost_calculatorCalculator';
  readonly name = 'barre_class_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate barre_class_cost_calculatorCalculator values';

  calculate(inputs: barre_class_cost_calculatorCalculatorInputs): barre_class_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: barre_class_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: barre_class_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
