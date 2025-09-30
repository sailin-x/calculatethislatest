import { Calculator } from '../../engines/CalculatorEngine';
import { foundation_repair_cost_calculatorCalculatorInputs, foundation_repair_cost_calculatorCalculatorResults, foundation_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class foundation_repair_cost_calculatorCalculatorCalculator implements Calculator<foundation_repair_cost_calculatorCalculatorInputs, foundation_repair_cost_calculatorCalculatorResults> {
  readonly id = 'foundation_repair_cost_calculatorCalculator';
  readonly name = 'foundation_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate foundation_repair_cost_calculatorCalculator values';

  calculate(inputs: foundation_repair_cost_calculatorCalculatorInputs): foundation_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: foundation_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: foundation_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
