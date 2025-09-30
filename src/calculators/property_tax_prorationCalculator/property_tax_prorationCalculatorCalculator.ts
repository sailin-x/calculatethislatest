import { Calculator } from '../../engines/CalculatorEngine';
import { property_tax_prorationCalculatorInputs, property_tax_prorationCalculatorResults, property_tax_prorationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class property_tax_prorationCalculatorCalculator implements Calculator<property_tax_prorationCalculatorInputs, property_tax_prorationCalculatorResults> {
  readonly id = 'property_tax_prorationCalculator';
  readonly name = 'property_tax_prorationCalculator Calculator';
  readonly description = 'Calculate property_tax_prorationCalculator values';

  calculate(inputs: property_tax_prorationCalculatorInputs): property_tax_prorationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: property_tax_prorationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: property_tax_prorationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
