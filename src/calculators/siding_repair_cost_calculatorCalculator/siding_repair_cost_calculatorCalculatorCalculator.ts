import { Calculator } from '../../engines/CalculatorEngine';
import { siding_repair_cost_calculatorCalculatorInputs, siding_repair_cost_calculatorCalculatorResults, siding_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class siding_repair_cost_calculatorCalculatorCalculator implements Calculator<siding_repair_cost_calculatorCalculatorInputs, siding_repair_cost_calculatorCalculatorResults> {
  readonly id = 'siding_repair_cost_calculatorCalculator';
  readonly name = 'siding_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate siding_repair_cost_calculatorCalculator values';

  calculate(inputs: siding_repair_cost_calculatorCalculatorInputs): siding_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: siding_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: siding_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
