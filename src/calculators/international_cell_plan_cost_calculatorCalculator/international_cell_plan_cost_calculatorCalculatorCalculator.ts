import { Calculator } from '../../engines/CalculatorEngine';
import { international_cell_plan_cost_calculatorCalculatorInputs, international_cell_plan_cost_calculatorCalculatorResults, international_cell_plan_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class international_cell_plan_cost_calculatorCalculatorCalculator implements Calculator<international_cell_plan_cost_calculatorCalculatorInputs, international_cell_plan_cost_calculatorCalculatorResults> {
  readonly id = 'international_cell_plan_cost_calculatorCalculator';
  readonly name = 'international_cell_plan_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate international_cell_plan_cost_calculatorCalculator values';

  calculate(inputs: international_cell_plan_cost_calculatorCalculatorInputs): international_cell_plan_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: international_cell_plan_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: international_cell_plan_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
