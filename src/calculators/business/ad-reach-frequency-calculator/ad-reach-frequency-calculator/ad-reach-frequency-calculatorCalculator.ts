import { Calculator } from '../../engines/CalculatorEngine';
import { ad-reach-frequency-calculatorInputs, ad-reach-frequency-calculatorResults, ad-reach-frequency-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad-reach-frequency-calculatorCalculator implements Calculator<ad-reach-frequency-calculatorInputs, ad-reach-frequency-calculatorResults> {
  readonly id = 'ad-reach-frequency-calculator';
  readonly name = 'ad reach frequency calculator Calculator';
  readonly description = 'Calculate ad reach frequency calculator values';

  calculate(inputs: ad-reach-frequency-calculatorInputs): ad-reach-frequency-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad-reach-frequency-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad-reach-frequency-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
