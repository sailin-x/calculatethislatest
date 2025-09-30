import { Calculator } from '../../engines/CalculatorEngine';
import { chiropractic_care_cost_calculatorCalculatorInputs, chiropractic_care_cost_calculatorCalculatorResults, chiropractic_care_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class chiropractic_care_cost_calculatorCalculatorCalculator implements Calculator<chiropractic_care_cost_calculatorCalculatorInputs, chiropractic_care_cost_calculatorCalculatorResults> {
  readonly id = 'chiropractic_care_cost_calculatorCalculator';
  readonly name = 'chiropractic_care_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate chiropractic_care_cost_calculatorCalculator values';

  calculate(inputs: chiropractic_care_cost_calculatorCalculatorInputs): chiropractic_care_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: chiropractic_care_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: chiropractic_care_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
