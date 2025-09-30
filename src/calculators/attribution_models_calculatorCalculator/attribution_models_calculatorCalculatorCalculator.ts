import { Calculator } from '../../engines/CalculatorEngine';
import { attribution_models_calculatorCalculatorInputs, attribution_models_calculatorCalculatorResults, attribution_models_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class attribution_models_calculatorCalculatorCalculator implements Calculator<attribution_models_calculatorCalculatorInputs, attribution_models_calculatorCalculatorResults> {
  readonly id = 'attribution_models_calculatorCalculator';
  readonly name = 'attribution_models_calculatorCalculator Calculator';
  readonly description = 'Calculate attribution_models_calculatorCalculator values';

  calculate(inputs: attribution_models_calculatorCalculatorInputs): attribution_models_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: attribution_models_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: attribution_models_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
