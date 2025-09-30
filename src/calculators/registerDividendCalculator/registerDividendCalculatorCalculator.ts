import { Calculator } from '../../engines/CalculatorEngine';
import { registerDividendCalculatorInputs, registerDividendCalculatorResults, registerDividendCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDividendCalculatorCalculator implements Calculator<registerDividendCalculatorInputs, registerDividendCalculatorResults> {
  readonly id = 'registerDividendCalculator';
  readonly name = 'registerDividendCalculator Calculator';
  readonly description = 'Calculate registerDividendCalculator values';

  calculate(inputs: registerDividendCalculatorInputs): registerDividendCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDividendCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDividendCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
