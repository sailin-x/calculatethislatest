import { Calculator } from '../../engines/CalculatorEngine';
import { property_taxCalculatorInputs, property_taxCalculatorResults, property_taxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class property_taxCalculatorCalculator implements Calculator<property_taxCalculatorInputs, property_taxCalculatorResults> {
  readonly id = 'property_taxCalculator';
  readonly name = 'property_taxCalculator Calculator';
  readonly description = 'Calculate property_taxCalculator values';

  calculate(inputs: property_taxCalculatorInputs): property_taxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: property_taxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: property_taxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
