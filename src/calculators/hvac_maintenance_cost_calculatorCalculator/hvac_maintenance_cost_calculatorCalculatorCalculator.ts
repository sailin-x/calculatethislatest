import { Calculator } from '../../engines/CalculatorEngine';
import { hvac_maintenance_cost_calculatorCalculatorInputs, hvac_maintenance_cost_calculatorCalculatorResults, hvac_maintenance_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hvac_maintenance_cost_calculatorCalculatorCalculator implements Calculator<hvac_maintenance_cost_calculatorCalculatorInputs, hvac_maintenance_cost_calculatorCalculatorResults> {
  readonly id = 'hvac_maintenance_cost_calculatorCalculator';
  readonly name = 'hvac_maintenance_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate hvac_maintenance_cost_calculatorCalculator values';

  calculate(inputs: hvac_maintenance_cost_calculatorCalculatorInputs): hvac_maintenance_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hvac_maintenance_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hvac_maintenance_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
