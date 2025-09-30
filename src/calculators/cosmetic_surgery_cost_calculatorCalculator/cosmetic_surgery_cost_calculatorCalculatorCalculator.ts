import { Calculator } from '../../engines/CalculatorEngine';
import { cosmetic_surgery_cost_calculatorCalculatorInputs, cosmetic_surgery_cost_calculatorCalculatorResults, cosmetic_surgery_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cosmetic_surgery_cost_calculatorCalculatorCalculator implements Calculator<cosmetic_surgery_cost_calculatorCalculatorInputs, cosmetic_surgery_cost_calculatorCalculatorResults> {
  readonly id = 'cosmetic_surgery_cost_calculatorCalculator';
  readonly name = 'cosmetic_surgery_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate cosmetic_surgery_cost_calculatorCalculator values';

  calculate(inputs: cosmetic_surgery_cost_calculatorCalculatorInputs): cosmetic_surgery_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cosmetic_surgery_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cosmetic_surgery_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
