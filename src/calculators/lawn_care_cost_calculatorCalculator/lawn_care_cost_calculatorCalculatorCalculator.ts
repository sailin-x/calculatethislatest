import { Calculator } from '../../engines/CalculatorEngine';
import { lawn_care_cost_calculatorCalculatorInputs, lawn_care_cost_calculatorCalculatorResults, lawn_care_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class lawn_care_cost_calculatorCalculatorCalculator implements Calculator<lawn_care_cost_calculatorCalculatorInputs, lawn_care_cost_calculatorCalculatorResults> {
  readonly id = 'lawn_care_cost_calculatorCalculator';
  readonly name = 'lawn_care_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate lawn_care_cost_calculatorCalculator values';

  calculate(inputs: lawn_care_cost_calculatorCalculatorInputs): lawn_care_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: lawn_care_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: lawn_care_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
