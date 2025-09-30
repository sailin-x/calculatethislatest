import { Calculator } from '../../engines/CalculatorEngine';
import { acupuncture_cost_calculatorCalculatorInputs, acupuncture_cost_calculatorCalculatorResults, acupuncture_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class acupuncture_cost_calculatorCalculatorCalculator implements Calculator<acupuncture_cost_calculatorCalculatorInputs, acupuncture_cost_calculatorCalculatorResults> {
  readonly id = 'acupuncture_cost_calculatorCalculator';
  readonly name = 'acupuncture_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate acupuncture_cost_calculatorCalculator values';

  calculate(inputs: acupuncture_cost_calculatorCalculatorInputs): acupuncture_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: acupuncture_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: acupuncture_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
