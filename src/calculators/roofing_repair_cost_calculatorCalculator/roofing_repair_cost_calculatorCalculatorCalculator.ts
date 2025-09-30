import { Calculator } from '../../engines/CalculatorEngine';
import { roofing_repair_cost_calculatorCalculatorInputs, roofing_repair_cost_calculatorCalculatorResults, roofing_repair_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roofing_repair_cost_calculatorCalculatorCalculator implements Calculator<roofing_repair_cost_calculatorCalculatorInputs, roofing_repair_cost_calculatorCalculatorResults> {
  readonly id = 'roofing_repair_cost_calculatorCalculator';
  readonly name = 'roofing_repair_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate roofing_repair_cost_calculatorCalculator values';

  calculate(inputs: roofing_repair_cost_calculatorCalculatorInputs): roofing_repair_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roofing_repair_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roofing_repair_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
