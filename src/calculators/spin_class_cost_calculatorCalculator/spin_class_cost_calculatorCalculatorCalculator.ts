import { Calculator } from '../../engines/CalculatorEngine';
import { spin_class_cost_calculatorCalculatorInputs, spin_class_cost_calculatorCalculatorResults, spin_class_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class spin_class_cost_calculatorCalculatorCalculator implements Calculator<spin_class_cost_calculatorCalculatorInputs, spin_class_cost_calculatorCalculatorResults> {
  readonly id = 'spin_class_cost_calculatorCalculator';
  readonly name = 'spin_class_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate spin_class_cost_calculatorCalculator values';

  calculate(inputs: spin_class_cost_calculatorCalculatorInputs): spin_class_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: spin_class_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: spin_class_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
