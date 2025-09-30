import { Calculator } from '../../engines/CalculatorEngine';
import { hotel_feasibility_adrCalculatorInputs, hotel_feasibility_adrCalculatorResults, hotel_feasibility_adrCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hotel_feasibility_adrCalculatorCalculator implements Calculator<hotel_feasibility_adrCalculatorInputs, hotel_feasibility_adrCalculatorResults> {
  readonly id = 'hotel_feasibility_adrCalculator';
  readonly name = 'hotel_feasibility_adrCalculator Calculator';
  readonly description = 'Calculate hotel_feasibility_adrCalculator values';

  calculate(inputs: hotel_feasibility_adrCalculatorInputs): hotel_feasibility_adrCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hotel_feasibility_adrCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hotel_feasibility_adrCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
