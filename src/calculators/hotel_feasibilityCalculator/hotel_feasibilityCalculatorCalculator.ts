import { Calculator } from '../../engines/CalculatorEngine';
import { hotel_feasibilityCalculatorInputs, hotel_feasibilityCalculatorResults, hotel_feasibilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hotel_feasibilityCalculatorCalculator implements Calculator<hotel_feasibilityCalculatorInputs, hotel_feasibilityCalculatorResults> {
  readonly id = 'hotel_feasibilityCalculator';
  readonly name = 'hotel_feasibilityCalculator Calculator';
  readonly description = 'Calculate hotel_feasibilityCalculator values';

  calculate(inputs: hotel_feasibilityCalculatorInputs): hotel_feasibilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hotel_feasibilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hotel_feasibilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
