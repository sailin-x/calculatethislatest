import { Calculator } from '../../engines/CalculatorEngine';
import { podcast_sponsorship_calculatorCalculatorInputs, podcast_sponsorship_calculatorCalculatorResults, podcast_sponsorship_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class podcast_sponsorship_calculatorCalculatorCalculator implements Calculator<podcast_sponsorship_calculatorCalculatorInputs, podcast_sponsorship_calculatorCalculatorResults> {
  readonly id = 'podcast_sponsorship_calculatorCalculator';
  readonly name = 'podcast_sponsorship_calculatorCalculator Calculator';
  readonly description = 'Calculate podcast_sponsorship_calculatorCalculator values';

  calculate(inputs: podcast_sponsorship_calculatorCalculatorInputs): podcast_sponsorship_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: podcast_sponsorship_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: podcast_sponsorship_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
