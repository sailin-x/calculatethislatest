import { Calculator } from '../../engines/CalculatorEngine';
import { pool_maintenance_cost_calculatorCalculatorInputs, pool_maintenance_cost_calculatorCalculatorResults, pool_maintenance_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pool_maintenance_cost_calculatorCalculatorCalculator implements Calculator<pool_maintenance_cost_calculatorCalculatorInputs, pool_maintenance_cost_calculatorCalculatorResults> {
  readonly id = 'pool_maintenance_cost_calculatorCalculator';
  readonly name = 'pool_maintenance_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate pool_maintenance_cost_calculatorCalculator values';

  calculate(inputs: pool_maintenance_cost_calculatorCalculatorInputs): pool_maintenance_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pool_maintenance_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pool_maintenance_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
