import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_property_insuranceCalculatorInputs, commercial_property_insuranceCalculatorResults, commercial_property_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_property_insuranceCalculatorCalculator implements Calculator<commercial_property_insuranceCalculatorInputs, commercial_property_insuranceCalculatorResults> {
  readonly id = 'commercial_property_insuranceCalculator';
  readonly name = 'commercial_property_insuranceCalculator Calculator';
  readonly description = 'Calculate commercial_property_insuranceCalculator values';

  calculate(inputs: commercial_property_insuranceCalculatorInputs): commercial_property_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_property_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_property_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
