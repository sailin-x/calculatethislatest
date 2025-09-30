import { Calculator } from '../../engines/CalculatorEngine';
import { executive_deferred_compensation_plan_calculatorCalculatorInputs, executive_deferred_compensation_plan_calculatorCalculatorResults, executive_deferred_compensation_plan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class executive_deferred_compensation_plan_calculatorCalculatorCalculator implements Calculator<executive_deferred_compensation_plan_calculatorCalculatorInputs, executive_deferred_compensation_plan_calculatorCalculatorResults> {
  readonly id = 'executive_deferred_compensation_plan_calculatorCalculator';
  readonly name = 'executive_deferred_compensation_plan_calculatorCalculator Calculator';
  readonly description = 'Calculate executive_deferred_compensation_plan_calculatorCalculator values';

  calculate(inputs: executive_deferred_compensation_plan_calculatorCalculatorInputs): executive_deferred_compensation_plan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: executive_deferred_compensation_plan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: executive_deferred_compensation_plan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
