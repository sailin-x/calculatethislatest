import { Calculator } from '../../engines/CalculatorEngine';
import { rental_property_roi_calculatorCalculatorInputs, rental_property_roi_calculatorCalculatorResults, rental_property_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rental_property_roi_calculatorCalculatorCalculator implements Calculator<rental_property_roi_calculatorCalculatorInputs, rental_property_roi_calculatorCalculatorResults> {
  readonly id = 'rental_property_roi_calculatorCalculator';
  readonly name = 'rental_property_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate rental_property_roi_calculatorCalculator values';

  calculate(inputs: rental_property_roi_calculatorCalculatorInputs): rental_property_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rental_property_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rental_property_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
