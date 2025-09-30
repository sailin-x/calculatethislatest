import { Calculator } from '../../engines/CalculatorEngine';
import { electrical_repair_cost_calculatorCalculatorInputs, electrical_repair_cost_calculatorCalculatorResults, electrical_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class electrical_repair_cost_calculatorCalculatorCalculator implements Calculator<electrical_repair_cost_calculatorCalculatorInputs, electrical_repair_cost_calculatorCalculatorResults> {
  readonly id = 'electrical_repair_cost_calculatorCalculator';
  readonly name = 'electrical_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate electrical_repair_cost_calculatorCalculator values';

  calculate(inputs: electrical_repair_cost_calculatorCalculatorInputs): electrical_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: electrical_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: electrical_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
