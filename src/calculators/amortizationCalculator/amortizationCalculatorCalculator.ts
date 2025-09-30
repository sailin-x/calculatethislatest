import { Calculator } from '../../engines/CalculatorEngine';
import { amortizationCalculatorInputs, amortizationCalculatorResults, amortizationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class amortizationCalculatorCalculator implements Calculator<amortizationCalculatorInputs, amortizationCalculatorResults> {
  readonly id = 'amortizationCalculator';
  readonly name = 'amortizationCalculator Calculator';
  readonly description = 'Calculate amortizationCalculator values';

  calculate(inputs: amortizationCalculatorInputs): amortizationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: amortizationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: amortizationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
