import { Calculator } from '../../engines/CalculatorEngine';
import { asset_protection_trust_apt_value_calculatorCalculatorInputs, asset_protection_trust_apt_value_calculatorCalculatorResults, asset_protection_trust_apt_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class asset_protection_trust_apt_value_calculatorCalculatorCalculator implements Calculator<asset_protection_trust_apt_value_calculatorCalculatorInputs, asset_protection_trust_apt_value_calculatorCalculatorResults> {
  readonly id = 'asset_protection_trust_apt_value_calculatorCalculator';
  readonly name = 'asset_protection_trust_apt_value_calculatorCalculator Calculator';
  readonly description = 'Calculate asset_protection_trust_apt_value_calculatorCalculator values';

  calculate(inputs: asset_protection_trust_apt_value_calculatorCalculatorInputs): asset_protection_trust_apt_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: asset_protection_trust_apt_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: asset_protection_trust_apt_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
