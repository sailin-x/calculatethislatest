import { Calculator } from '../../engines/CalculatorEngine';
import { crypto_stakingCalculatorInputs, crypto_stakingCalculatorResults, crypto_stakingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crypto_stakingCalculatorCalculator implements Calculator<crypto_stakingCalculatorInputs, crypto_stakingCalculatorResults> {
  readonly id = 'crypto_stakingCalculator';
  readonly name = 'crypto_stakingCalculator Calculator';
  readonly description = 'Calculate crypto_stakingCalculator values';

  calculate(inputs: crypto_stakingCalculatorInputs): crypto_stakingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crypto_stakingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crypto_stakingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
