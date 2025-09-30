import { Calculator } from '../../engines/CalculatorEngine';
import { rental_property_roiCalculatorInputs, rental_property_roiCalculatorResults, rental_property_roiCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rental_property_roiCalculatorCalculator implements Calculator<rental_property_roiCalculatorInputs, rental_property_roiCalculatorResults> {
  readonly id = 'rental_property_roiCalculator';
  readonly name = 'rental_property_roiCalculator Calculator';
  readonly description = 'Calculate rental_property_roiCalculator values';

  calculate(inputs: rental_property_roiCalculatorInputs): rental_property_roiCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rental_property_roiCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rental_property_roiCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
