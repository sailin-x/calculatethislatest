import { Calculator } from '../../engines/CalculatorEngine';
import { pilates_studio_cost_calculatorCalculatorInputs, pilates_studio_cost_calculatorCalculatorResults, pilates_studio_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pilates_studio_cost_calculatorCalculatorCalculator implements Calculator<pilates_studio_cost_calculatorCalculatorInputs, pilates_studio_cost_calculatorCalculatorResults> {
  readonly id = 'pilates_studio_cost_calculatorCalculator';
  readonly name = 'pilates_studio_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate pilates_studio_cost_calculatorCalculator values';

  calculate(inputs: pilates_studio_cost_calculatorCalculatorInputs): pilates_studio_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pilates_studio_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pilates_studio_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
