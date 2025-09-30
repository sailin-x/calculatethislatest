import { Calculator } from '../../engines/CalculatorEngine';
import { capital_call_schedule_plannerCalculatorInputs, capital_call_schedule_plannerCalculatorResults, capital_call_schedule_plannerCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class capital_call_schedule_plannerCalculatorCalculator implements Calculator<capital_call_schedule_plannerCalculatorInputs, capital_call_schedule_plannerCalculatorResults> {
  readonly id = 'capital_call_schedule_plannerCalculator';
  readonly name = 'capital_call_schedule_plannerCalculator Calculator';
  readonly description = 'Calculate capital_call_schedule_plannerCalculator values';

  calculate(inputs: capital_call_schedule_plannerCalculatorInputs): capital_call_schedule_plannerCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: capital_call_schedule_plannerCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: capital_call_schedule_plannerCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
