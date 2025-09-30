import { Calculator } from '../../engines/CalculatorEngine';
import { guidebook_cost_calculatorCalculatorInputs, guidebook_cost_calculatorCalculatorResults, guidebook_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class guidebook_cost_calculatorCalculatorCalculator implements Calculator<guidebook_cost_calculatorCalculatorInputs, guidebook_cost_calculatorCalculatorResults> {
  readonly id = 'guidebook_cost_calculatorCalculator';
  readonly name = 'guidebook_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate guidebook_cost_calculatorCalculator values';

  calculate(inputs: guidebook_cost_calculatorCalculatorInputs): guidebook_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: guidebook_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: guidebook_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
