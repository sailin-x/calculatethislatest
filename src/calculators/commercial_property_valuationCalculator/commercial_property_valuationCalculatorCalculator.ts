import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_property_valuationCalculatorInputs, commercial_property_valuationCalculatorResults, commercial_property_valuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_property_valuationCalculatorCalculator implements Calculator<commercial_property_valuationCalculatorInputs, commercial_property_valuationCalculatorResults> {
  readonly id = 'commercial_property_valuationCalculator';
  readonly name = 'commercial_property_valuationCalculator Calculator';
  readonly description = 'Calculate commercial_property_valuationCalculator values';

  calculate(inputs: commercial_property_valuationCalculatorInputs): commercial_property_valuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_property_valuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_property_valuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
