import { Calculator } from '../../engines/CalculatorEngine';
import { camping_cost_calculatorCalculatorInputs, camping_cost_calculatorCalculatorResults, camping_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class camping_cost_calculatorCalculatorCalculator implements Calculator<camping_cost_calculatorCalculatorInputs, camping_cost_calculatorCalculatorResults> {
  readonly id = 'camping_cost_calculatorCalculator';
  readonly name = 'camping_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate camping_cost_calculatorCalculator values';

  calculate(inputs: camping_cost_calculatorCalculatorInputs): camping_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: camping_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: camping_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
