import { Calculator } from '../../engines/CalculatorEngine';
import { fire_damage_repair_cost_calculatorCalculatorInputs, fire_damage_repair_cost_calculatorCalculatorResults, fire_damage_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fire_damage_repair_cost_calculatorCalculatorCalculator implements Calculator<fire_damage_repair_cost_calculatorCalculatorInputs, fire_damage_repair_cost_calculatorCalculatorResults> {
  readonly id = 'fire_damage_repair_cost_calculatorCalculator';
  readonly name = 'fire_damage_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate fire_damage_repair_cost_calculatorCalculator values';

  calculate(inputs: fire_damage_repair_cost_calculatorCalculatorInputs): fire_damage_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fire_damage_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fire_damage_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
