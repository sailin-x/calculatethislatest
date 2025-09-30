import { Calculator } from '../../engines/CalculatorEngine';
import { cap_rateCalculatorInputs, cap_rateCalculatorResults, cap_rateCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cap_rateCalculatorCalculator implements Calculator<cap_rateCalculatorInputs, cap_rateCalculatorResults> {
  readonly id = 'cap_rateCalculator';
  readonly name = 'cap_rateCalculator Calculator';
  readonly description = 'Calculate cap_rateCalculator values';

  calculate(inputs: cap_rateCalculatorInputs): cap_rateCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cap_rateCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cap_rateCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
