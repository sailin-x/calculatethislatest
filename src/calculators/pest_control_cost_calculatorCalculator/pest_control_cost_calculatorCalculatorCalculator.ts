import { Calculator } from '../../engines/CalculatorEngine';
import { pest_control_cost_calculatorCalculatorInputs, pest_control_cost_calculatorCalculatorResults, pest_control_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pest_control_cost_calculatorCalculatorCalculator implements Calculator<pest_control_cost_calculatorCalculatorInputs, pest_control_cost_calculatorCalculatorResults> {
  readonly id = 'pest_control_cost_calculatorCalculator';
  readonly name = 'pest_control_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate pest_control_cost_calculatorCalculator values';

  calculate(inputs: pest_control_cost_calculatorCalculatorInputs): pest_control_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pest_control_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pest_control_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
