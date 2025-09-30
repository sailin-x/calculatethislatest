import { Calculator } from '../../engines/CalculatorEngine';
import { storm_damage_repair_cost_calculatorCalculatorInputs, storm_damage_repair_cost_calculatorCalculatorResults, storm_damage_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class storm_damage_repair_cost_calculatorCalculatorCalculator implements Calculator<storm_damage_repair_cost_calculatorCalculatorInputs, storm_damage_repair_cost_calculatorCalculatorResults> {
  readonly id = 'storm_damage_repair_cost_calculatorCalculator';
  readonly name = 'storm_damage_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate storm_damage_repair_cost_calculatorCalculator values';

  calculate(inputs: storm_damage_repair_cost_calculatorCalculatorInputs): storm_damage_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: storm_damage_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: storm_damage_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
