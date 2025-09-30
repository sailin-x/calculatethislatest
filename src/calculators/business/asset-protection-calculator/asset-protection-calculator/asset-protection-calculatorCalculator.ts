import { Calculator } from '../../engines/CalculatorEngine';
import { asset-protection-calculatorInputs, asset-protection-calculatorResults, asset-protection-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class asset-protection-calculatorCalculator implements Calculator<asset-protection-calculatorInputs, asset-protection-calculatorResults> {
  readonly id = 'asset-protection-calculator';
  readonly name = 'asset protection calculator Calculator';
  readonly description = 'Calculate asset protection calculator values';

  calculate(inputs: asset-protection-calculatorInputs): asset-protection-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: asset-protection-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: asset-protection-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
