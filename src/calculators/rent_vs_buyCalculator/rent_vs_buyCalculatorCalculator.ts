import { Calculator } from '../../engines/CalculatorEngine';
import { rent_vs_buyCalculatorInputs, rent_vs_buyCalculatorResults, rent_vs_buyCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rent_vs_buyCalculatorCalculator implements Calculator<rent_vs_buyCalculatorInputs, rent_vs_buyCalculatorResults> {
  readonly id = 'rent_vs_buyCalculator';
  readonly name = 'rent_vs_buyCalculator Calculator';
  readonly description = 'Calculate rent_vs_buyCalculator values';

  calculate(inputs: rent_vs_buyCalculatorInputs): rent_vs_buyCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rent_vs_buyCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rent_vs_buyCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
