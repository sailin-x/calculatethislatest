import { Calculator } from '../../engines/CalculatorEngine';
import { herbal_medicine_cost_calculatorCalculatorInputs, herbal_medicine_cost_calculatorCalculatorResults, herbal_medicine_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class herbal_medicine_cost_calculatorCalculatorCalculator implements Calculator<herbal_medicine_cost_calculatorCalculatorInputs, herbal_medicine_cost_calculatorCalculatorResults> {
  readonly id = 'herbal_medicine_cost_calculatorCalculator';
  readonly name = 'herbal_medicine_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate herbal_medicine_cost_calculatorCalculator values';

  calculate(inputs: herbal_medicine_cost_calculatorCalculatorInputs): herbal_medicine_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: herbal_medicine_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: herbal_medicine_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
