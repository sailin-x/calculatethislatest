import { Calculator } from '../../engines/CalculatorEngine';
import { EbitdaCalculatorInputs, EbitdaCalculatorResults, EbitdaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class EbitdaCalculatorCalculator implements Calculator<EbitdaCalculatorInputs, EbitdaCalculatorResults> {
  readonly id = 'EbitdaCalculator';
  readonly name = 'EbitdaCalculator Calculator';
  readonly description = 'Calculate EbitdaCalculator values';

  calculate(inputs: EbitdaCalculatorInputs): EbitdaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: EbitdaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: EbitdaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
