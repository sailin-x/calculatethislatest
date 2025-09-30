import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_payoffCalculatorInputs, mortgage_payoffCalculatorResults, mortgage_payoffCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_payoffCalculatorCalculator implements Calculator<mortgage_payoffCalculatorInputs, mortgage_payoffCalculatorResults> {
  readonly id = 'mortgage_payoffCalculator';
  readonly name = 'mortgage_payoffCalculator Calculator';
  readonly description = 'Calculate mortgage_payoffCalculator values';

  calculate(inputs: mortgage_payoffCalculatorInputs): mortgage_payoffCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_payoffCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_payoffCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
