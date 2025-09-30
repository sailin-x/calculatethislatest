import { Calculator } from '../../engines/CalculatorEngine';
import { plumbing_repair_cost_calculatorCalculatorInputs, plumbing_repair_cost_calculatorCalculatorResults, plumbing_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class plumbing_repair_cost_calculatorCalculatorCalculator implements Calculator<plumbing_repair_cost_calculatorCalculatorInputs, plumbing_repair_cost_calculatorCalculatorResults> {
  readonly id = 'plumbing_repair_cost_calculatorCalculator';
  readonly name = 'plumbing_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate plumbing_repair_cost_calculatorCalculator values';

  calculate(inputs: plumbing_repair_cost_calculatorCalculatorInputs): plumbing_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: plumbing_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: plumbing_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
