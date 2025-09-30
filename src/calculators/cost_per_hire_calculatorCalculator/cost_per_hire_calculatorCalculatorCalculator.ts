import { Calculator } from '../../engines/CalculatorEngine';
import { cost_per_hire_calculatorCalculatorInputs, cost_per_hire_calculatorCalculatorResults, cost_per_hire_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cost_per_hire_calculatorCalculatorCalculator implements Calculator<cost_per_hire_calculatorCalculatorInputs, cost_per_hire_calculatorCalculatorResults> {
  readonly id = 'cost_per_hire_calculatorCalculator';
  readonly name = 'cost_per_hire_calculatorCalculator Calculator';
  readonly description = 'Calculate cost_per_hire_calculatorCalculator values';

  calculate(inputs: cost_per_hire_calculatorCalculatorInputs): cost_per_hire_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cost_per_hire_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cost_per_hire_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
