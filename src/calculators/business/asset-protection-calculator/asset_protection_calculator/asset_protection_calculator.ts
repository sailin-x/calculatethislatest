import { Calculator } from '../../engines/CalculatorEngine';
import { asset_protection_calculatorInputs, asset_protection_calculatorResults, asset_protection_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class asset_protection_calculator implements Calculator<asset_protection_calculatorInputs, asset_protection_calculatorResults> {
  readonly id = 'asset_protection_calculator';
  readonly name = 'asset_protection_calculator Calculator';
  readonly description = 'Calculate asset_protection_calculator values';

  calculate(inputs: asset_protection_calculatorInputs): asset_protection_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: asset_protection_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: asset_protection_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
