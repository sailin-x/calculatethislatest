import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_paymentCalculatorInputs, mortgage_paymentCalculatorResults, mortgage_paymentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_paymentCalculatorCalculator implements Calculator<mortgage_paymentCalculatorInputs, mortgage_paymentCalculatorResults> {
  readonly id = 'mortgage_paymentCalculator';
  readonly name = 'mortgage_paymentCalculator Calculator';
  readonly description = 'Calculate mortgage_paymentCalculator values';

  calculate(inputs: mortgage_paymentCalculatorInputs): mortgage_paymentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_paymentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_paymentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
