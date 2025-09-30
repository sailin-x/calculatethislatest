import { Calculator } from '../../engines/CalculatorEngine';
import { bmr_tdeeCalculatorInputs, bmr_tdeeCalculatorResults, bmr_tdeeCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bmr_tdeeCalculatorCalculator implements Calculator<bmr_tdeeCalculatorInputs, bmr_tdeeCalculatorResults> {
  readonly id = 'bmr_tdeeCalculator';
  readonly name = 'bmr_tdeeCalculator Calculator';
  readonly description = 'Calculate bmr_tdeeCalculator values';

  calculate(inputs: bmr_tdeeCalculatorInputs): bmr_tdeeCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bmr_tdeeCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bmr_tdeeCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
