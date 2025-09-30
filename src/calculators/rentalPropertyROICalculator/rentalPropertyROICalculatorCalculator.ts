import { Calculator } from '../../engines/CalculatorEngine';
import { rentalPropertyROICalculatorInputs, rentalPropertyROICalculatorResults, rentalPropertyROICalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rentalPropertyROICalculatorCalculator implements Calculator<rentalPropertyROICalculatorInputs, rentalPropertyROICalculatorResults> {
  readonly id = 'rentalPropertyROICalculator';
  readonly name = 'rentalPropertyROICalculator Calculator';
  readonly description = 'Calculate rentalPropertyROICalculator values';

  calculate(inputs: rentalPropertyROICalculatorInputs): rentalPropertyROICalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rentalPropertyROICalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rentalPropertyROICalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
