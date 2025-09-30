import { Calculator } from '../../engines/CalculatorEngine';
import { registerRentalPropertyROICalculatorInputs, registerRentalPropertyROICalculatorResults, registerRentalPropertyROICalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRentalPropertyROICalculatorCalculator implements Calculator<registerRentalPropertyROICalculatorInputs, registerRentalPropertyROICalculatorResults> {
  readonly id = 'registerRentalPropertyROICalculator';
  readonly name = 'registerRentalPropertyROICalculator Calculator';
  readonly description = 'Calculate registerRentalPropertyROICalculator values';

  calculate(inputs: registerRentalPropertyROICalculatorInputs): registerRentalPropertyROICalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRentalPropertyROICalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRentalPropertyROICalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
