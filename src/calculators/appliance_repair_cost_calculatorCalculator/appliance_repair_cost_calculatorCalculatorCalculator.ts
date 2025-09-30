import { Calculator } from '../../engines/CalculatorEngine';
import { appliance_repair_cost_calculatorCalculatorInputs, appliance_repair_cost_calculatorCalculatorResults, appliance_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class appliance_repair_cost_calculatorCalculatorCalculator implements Calculator<appliance_repair_cost_calculatorCalculatorInputs, appliance_repair_cost_calculatorCalculatorResults> {
  readonly id = 'appliance_repair_cost_calculatorCalculator';
  readonly name = 'appliance_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate appliance_repair_cost_calculatorCalculator values';

  calculate(inputs: appliance_repair_cost_calculatorCalculatorInputs): appliance_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: appliance_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: appliance_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
