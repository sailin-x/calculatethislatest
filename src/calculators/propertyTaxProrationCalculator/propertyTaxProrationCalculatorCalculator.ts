import { Calculator } from '../../engines/CalculatorEngine';
import { propertyTaxProrationCalculatorInputs, propertyTaxProrationCalculatorResults, propertyTaxProrationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class propertyTaxProrationCalculatorCalculator implements Calculator<propertyTaxProrationCalculatorInputs, propertyTaxProrationCalculatorResults> {
  readonly id = 'propertyTaxProrationCalculator';
  readonly name = 'propertyTaxProrationCalculator Calculator';
  readonly description = 'Calculate propertyTaxProrationCalculator values';

  calculate(inputs: propertyTaxProrationCalculatorInputs): propertyTaxProrationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: propertyTaxProrationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: propertyTaxProrationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
