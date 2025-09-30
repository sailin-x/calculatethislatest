import { Calculator } from '../../engines/CalculatorEngine';
import { attribution_models_calculatorInputs, attribution_models_calculatorResults, attribution_models_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class attribution_models_calculatorCalculator implements Calculator<attribution_models_calculatorInputs, attribution_models_calculatorResults> {
  readonly id = 'attribution_models_calculator';
  readonly name = 'attribution_models_calculator Calculator';
  readonly description = 'Calculate attribution_models_calculator values';

  calculate(inputs: attribution_models_calculatorInputs): attribution_models_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: attribution_models_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: attribution_models_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
