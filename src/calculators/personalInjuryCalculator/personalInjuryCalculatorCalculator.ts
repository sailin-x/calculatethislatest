import { Calculator } from '../../engines/CalculatorEngine';
import { personalInjuryCalculatorInputs, personalInjuryCalculatorResults, personalInjuryCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class personalInjuryCalculatorCalculator implements Calculator<personalInjuryCalculatorInputs, personalInjuryCalculatorResults> {
  readonly id = 'personalInjuryCalculator';
  readonly name = 'personalInjuryCalculator Calculator';
  readonly description = 'Calculate personalInjuryCalculator values';

  calculate(inputs: personalInjuryCalculatorInputs): personalInjuryCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: personalInjuryCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: personalInjuryCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
