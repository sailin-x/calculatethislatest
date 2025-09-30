import { Calculator } from '../../engines/CalculatorEngine';
import { registerEstateTaxLiabilityCalculatorInputs, registerEstateTaxLiabilityCalculatorResults, registerEstateTaxLiabilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerEstateTaxLiabilityCalculatorCalculator implements Calculator<registerEstateTaxLiabilityCalculatorInputs, registerEstateTaxLiabilityCalculatorResults> {
  readonly id = 'registerEstateTaxLiabilityCalculator';
  readonly name = 'registerEstateTaxLiabilityCalculator Calculator';
  readonly description = 'Calculate registerEstateTaxLiabilityCalculator values';

  calculate(inputs: registerEstateTaxLiabilityCalculatorInputs): registerEstateTaxLiabilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerEstateTaxLiabilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerEstateTaxLiabilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
