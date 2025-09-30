import { Calculator } from '../../engines/CalculatorEngine';
import { total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorInputs, total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorResults, total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorCalculator implements Calculator<total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorInputs, total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorResults> {
  readonly id = 'total_cost_of_ownership_for_commercial_fleet_calculatorCalculator';
  readonly name = 'total_cost_of_ownership_for_commercial_fleet_calculatorCalculator Calculator';
  readonly description = 'Calculate total_cost_of_ownership_for_commercial_fleet_calculatorCalculator values';

  calculate(inputs: total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorInputs): total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: total_cost_of_ownership_for_commercial_fleet_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
