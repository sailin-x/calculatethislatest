import { Calculator } from '../../engines/CalculatorEngine';
import { AttributionModelsCalculatorInputs, AttributionModelsCalculatorResults, AttributionModelsCalculatormetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class AttributionModelsCalculator implements Calculator<AttributionModelsCalculatorInputs, AttributionModelsCalculatorResults> {
  readonly id = 'AttributionModelsCalculator';
  readonly name = 'attribution models calculator Calculator';
  readonly description = 'Calculate attribution models calculator values';

  calculate(inputs: AttributionModelsCalculatorInputs): AttributionModelsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: AttributionModelsCalculatormetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: AttributionModelsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
